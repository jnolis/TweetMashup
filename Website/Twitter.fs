namespace Website

open Tweetinvi
open System
open System.Text.RegularExpressions
open Newtonsoft.Json


///The information that stores a twitter user
type SmallUser = {
    ///The username of the twitter user
    Username: string;
    ///Their full name (used in output)
    FullName: string;
    ///The URL of their profile image
    Image: string
    }

///A full tweet mashup.
type Combined =
    {
    ///The text of the mashed up tweet
    Tweet: string
    ///The text to use for the "tweet this button." It has the added usernames and url, as well as being in the proper HTTP format.
    TweetWithContext: string
    }

///A set of data that gets returned when the system asks for some mashups
type Mashup =
    {
    ///An array of combined tweet mashups. This is an array because rather than querying the server each time a tweet is needed, we generate them n at a time (where n is currently 10)
    Combined: Combined array
    ///The first user that was mashed
    User1: SmallUser
    ///The second user that was mashed
    User2: SmallUser
    }

///<summary>Sometimes we need to cache information (for instance, when storing some partial credentials to authenticate).
/// A cache set contains a datetime (so we could in theory delete data that was too old), and the value that is cached.</summary>
type CacheSet<'a> = {DateTime: System.DateTime; Value: 'a}

///Data on a word that a person has used in a particular tweet
type TweetWordData = {
    ///The word itself
    Word: string
    ///The ID of the tweet that contains it
    Tweet:int64
    ///The number of characters before the word (used to keep the mashed up tweet <140 characters)
    CharactersBeforeWord: int
    ///The number of characters after the word (used to keep the mashed up tweet <140 characters)
    CharactersAfterWord: int
    }

///Information on a user and their tweets. I cache these so we don't have to repeatedly query the API for common accounts
type UserTweetsInfo = {
    ///The user information
    User: SmallUser
    ///The users tweets (the ID and the text the contain)
    Tweets: Map<int64,string>
    ///A map of the words across all tweets, and for each word which tweets they are containing in
    WordLookup: Map<string,TweetWordData array>
    }

///This is a maybe hackish way I was able to pull users and their tweets all concurrently with an async
type AsyncReturnInfo = 
    | TweetInfo of (Map<int64,string>*Map<string,TweetWordData array>) option
    | UserInfo of SmallUser option

///A users credentials. I use this instead of the tweetinvi interfaces because records can be stored in json by Newtonsoft
type SimpleCredentials = {
    ConsumerKey: string
    ConsumerSecret: string
    AccessToken: string
    AccessTokenSecret: string
    }

type CredentialSet =
    | Credentials of SimpleCredentials
    | LoginUrl of string
    | CredentialError

///<summary>This module does the work involved with generating a tweet and interfacing with the tweetinvi API.</summary>
module Twitter =
    ///The location on the hard drive where we save the user and their tweets. (it's a single folder)
    let userTweetCacheLocation = System.Configuration.ConfigurationManager.AppSettings.["storeLocation"]
    ///The location on the hard drive where we store twitter api credentials
    let credentialCacheLocation = System.Configuration.ConfigurationManager.AppSettings.["credentialLocation"]

    ///The cache that stores the login credentials in progress
    let partialCredentialCache = new System.Collections.Concurrent.ConcurrentDictionary<string,Models.IAuthenticationContext>()

    ///This function takes a set of SimpleCredentials and turns it into something Tweetinvi can use
    let simpleCredentialsToCredentials (c:SimpleCredentials) = 
        Auth.CreateCredentials(c.ConsumerKey,c.ConsumerSecret,c.AccessToken,c.AccessTokenSecret)

    ///<summary>
    ///TweetInvi user authentication is a two step process. Step one generates a URL for the person to click to get authenticated.
    ///This function does that (and caches the user info), then returns the URL. Whoops side effects in functional programming.
    ///Here, login is a GUID that gets stored in a user cookie</summary>
    let initAuthentication (login) =
        let context = Tweetinvi.AuthFlow.InitAuthentication(Tweetinvi.Auth.ApplicationCredentials,System.Web.HttpContext.Current.Request.Url.AbsoluteUri + "/Login")
        if partialCredentialCache.ContainsKey login then
            partialCredentialCache.TryRemove(login) |> ignore
        partialCredentialCache.TryAdd(login, context) |> ignore
        context.AuthorizationURL  

    ///This function finishes the authentication, using the verifierCode returned from the twitter site, and the cached user info from before, again using the login from the cookie
    let finishAuthentication (verifierCode:string) (login) =
        let location = credentialCacheLocation + "/" + login
        let contextOption =
            if partialCredentialCache.ContainsKey login then
                Some (partialCredentialCache.Item login)
            else None
        match contextOption with
        | Some context ->
            let credentials = AuthFlow.CreateCredentialsFromVerifierCode(verifierCode, context)
            if System.IO.File.Exists location then System.IO.File.Delete location
            credentials
            |> (fun c -> {ConsumerKey= c.ConsumerKey; ConsumerSecret= c.ConsumerSecret; AccessToken = c.AccessToken; AccessTokenSecret = c.AccessTokenSecret})
            |> JsonConvert.SerializeObject
            |> (fun x -> System.IO.File.WriteAllText(location,x))

            partialCredentialCache.TryRemove(login) |> ignore
            Some credentials
        | None -> None

    ///Check to see if the login is already authenticated.
    let getCredentials (login) = 
        try
            let location = credentialCacheLocation + "/" + login
            if System.IO.File.Exists location then
                location
                |> System.IO.File.ReadAllText
                |> (fun x -> JsonConvert.DeserializeObject<SimpleCredentials>(x))
                |> Some
            else None
        with 
        | _ -> None


    ///Get the app credentials from the config file
    let getAppCredentials () = 
        let consumerKey = System.Configuration.ConfigurationManager.AppSettings.["consumerKey"]
        let consumerSecret = System.Configuration.ConfigurationManager.AppSettings.["consumerSecret"]
        let accessToken = System.Configuration.ConfigurationManager.AppSettings.["accessToken"]
        let accessTokenSecret = System.Configuration.ConfigurationManager.AppSettings.["accessTokenSecret"]
        Auth.CreateCredentials(consumerKey,consumerSecret,accessToken,accessTokenSecret)

    ///Check to see if the cached user info is too old and needs to be refreshed 
    let tooOld (dt:System.DateTime) = System.DateTime.Now.Subtract(dt).Days > 7

    ///Convenience function to take an array of strings and concatenate them with spaces
    let concatenate (s: string array) =
        match Array.length s with
        | 0 -> ""
        | 1 -> Array.exactlyOne s
        | _ -> Array.fold (fun x y -> x + " " + y) (Array.head s) (Array.skip 1 s)

    ///A convenience function to draw a single random sample from an array
    let arrayRandom (random: Random) (s: 'a array) : 'a =
        let length = Array.length s
        match length with
        | 0 -> failwith "arrayRandom requires array to have length at least 1"
        | _ ->
            let choice = random.Next(0,length-1)
            Array.item choice s

    ///A convenience function to draw a random sample from an array (with replacement)
    let arrayRandomMultiple (random: Random) (amountToReturn: int) (s: 'a array) : 'a array =
        let length = Array.length s
        match length with
        | 0 -> failwith "arrayRandom requires array to have length at least 1"
        | _ ->
            [|1..amountToReturn|] 
            |> Array.map (fun x -> random.Next(0,length-1))
            |> Array.map (fun choice -> Array.item choice s)

    ///A function to remove special characters from a string
    let removeSpecialCharacters (str:string) = 
        let sb = new System.Text.StringBuilder()
        for c in str do
            if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')) then
                sb.Append(c) |> ignore
            else ()
        sb.ToString()

    ///A function that removes the first and last elements from a string
    let removeFirstAndLast (x : 'a array) =
        if Array.length x >= 2 then 
            x
            |> Array.take (Array.length x - 1)
            |> Array.skip 1
        else
            Array.empty<'a>

    ///A function that, given an array of generic type 'a*'b, will group the elements by the first element of the tuple.
    let groupAndMap (x: ('a*'b) array) =
        x
        |> Array.groupBy fst
        |> Array.map (fun (key,s) -> (key,Array.map (fun (key, value) -> value) s))
        |> Map.ofArray

    ///A function that takes a user from TweetInvi and converts it to a SmallUser that can be stored or sent to the client
    let userToSmallUser (u:Models.IUser) : SmallUser option =
        try 
        Some {Username = u.ScreenName; FullName = u.Name; Image = u.ProfileImageUrl400x400}
        with
        | _ -> None

    ///A convenience function for doing regex substitutions
    let substitute (pattern:string) (replacement:string) (input:string) =
        let rgx = new Regex(pattern)
        rgx.Replace(input,replacement)

    ///A function that takes a tweet and strips out the urls and any multiple spaces (this is needed because otherwise any media creates urls
    let tweetText (x:Models.ITweet) = 
        x.Text
        |> System.Web.HttpUtility.HtmlDecode 
        |> (substitute "\\s+" " ")
        |> (substitute "https{0,1}://t.co/\\S*" "")
        |> (fun y -> y.Trim(' ').TrimEnd(' '))

    ///A function that checks if the data is stored locally in a folder in JSON and if it's sufficiently fresh, otherwise will pull the data from the server.
    let getFromCache (cacheLocation: string) (getValue: 'a -> 'b option) (key: 'a) =
        let location = (cacheLocation + "/" + key.ToString())
        let value =
            try
                let storedValue =
                    if System.IO.File.Exists location then
                        let value = 
                            location
                            |> System.IO.File.ReadAllText
                            |> (fun x -> JsonConvert.DeserializeObject<CacheSet<'b>>(x))
                        if tooOld value.DateTime then
                            System.IO.File.Delete location
                            None
                        else
                            Some value
                    else None
                match storedValue with 
                    | Some x -> Some x.Value 
                    | None ->
                        let dateTime = System.DateTime.Now
                        let newValue = getValue key
                        match newValue with
                        | Some nv -> 
                            {DateTime = dateTime; Value = nv}
                            |> JsonConvert.SerializeObject
                            |> (fun x -> System.IO.File.WriteAllText(location,x))

                            Some nv
                        | None -> None
            with
              | _ -> None
        value
    
    ///A function to get a user from the Twitter API using Tweetinvi. If no credentials are provided then the app credentials are used
    let getUser (credentials: Models.ITwitterCredentials option) (username) =
        try 
            match credentials with
            | Some c ->
                Tweetinvi.Auth.SetCredentials c
            | None ->
                Tweetinvi.Auth.SetCredentials Tweetinvi.Auth.ApplicationCredentials
            TweetinviEvents.QueryBeforeExecute.Add( fun a -> a.TwitterQuery.Timeout <- TimeSpan.FromSeconds(30.0))
            let fullUser = User.GetUserFromScreenName username
            if fullUser <> null && not fullUser.Protected then  userToSmallUser fullUser else None

        with 
        | exn -> 
            do System.Diagnostics.Debug.WriteLine("Couldn't pull user " + (ExceptionHandler.GetLastException()).TwitterDescription) 
            None

    ///A function to get a user _and their tweets_ from the Twitter API using Tweetinvi. If no credentials are provided then the app credentials are used. Also uses a cache
    let getTweetsAndUserInfo (credentials: Models.ITwitterCredentials option) (username:string) = 
        let getTweetMap (username:string) = 
                match credentials with
                | Some c ->
                    Tweetinvi.Auth.SetCredentials c
                | None ->
                    Tweetinvi.Auth.SetCredentials Tweetinvi.Auth.ApplicationCredentials
                let parameters = 
                    let temp = new Parameters.UserTimelineParameters()
                    temp.IncludeRTS <- false
                    temp.IncludeContributorDetails <- false
                    temp.ExcludeReplies <- true
                    temp.TrimUser <- true
                    temp.MaximumNumberOfTweetsToRetrieve <- 300
                    temp
                TweetinviEvents.QueryBeforeExecute.Add( fun a -> a.TwitterQuery.Timeout <- TimeSpan.FromSeconds(60.0))
                try Timeline.GetUserTimeline(username, parameters)
                    |> Seq.map (fun tweet -> (tweet.Id, tweetText tweet))
                    |> Map.ofSeq
                    |> Some
                with
                | exn -> None
        let getTweetWordMaps (tweets:Map<int64,string>) =
            tweets
            |> Map.toArray
            |> Array.map (fun (num,tweet) ->
                tweet.Split(' ')
                |> (fun words -> Array.mapFold (fun (startIdx:int) (word:string) -> ((startIdx+1,word),startIdx+word.Length+1)) (-1) words)
                |> fst
                |> (fun words -> Array.mapFoldBack (fun (startIdx:int,word:string) (endIdx:int) -> 
                    ((word,{TweetWordData.Tweet = num; 
                        TweetWordData.CharactersBeforeWord = startIdx;
                        TweetWordData.Word = word;
                        TweetWordData.CharactersAfterWord = endIdx+1})),endIdx+word.Length+1) words (-1))
                |> fst
                |> Array.map (fun (word,wordInfo) -> (removeSpecialCharacters (word.ToLowerInvariant()),wordInfo))
                |> Array.filter (fun (word,_) -> word.Length > 0)
                |> removeFirstAndLast
                )
            |> Array.concat
            |> groupAndMap
        let getTweets username = 
            let tweetMap = getTweetMap username
            match tweetMap with
                | Some x -> Some (x, getTweetWordMaps x)
                | None -> None
        let getCombinedInfo (username) =
            seq [(fun x -> AsyncReturnInfo.UserInfo (getUser credentials x));
                (fun x -> AsyncReturnInfo.TweetInfo (getTweets x))]
                |> Seq.map (fun getFunction ->
                    async {
                        return getFunction username
                        }
                    )
                |> Async.Parallel
                |> Async.RunSynchronously
                |> (fun results ->
                        let userInfo = match Array.item 0 results with
                                        | AsyncReturnInfo.UserInfo x -> x
                                        | _ -> failwith "Aysnc operation failed"
                        let tweetInfo = match Array.item 1 results with
                                        | AsyncReturnInfo.TweetInfo x -> x
                                        | _ -> failwith "Aysnc operation failed"
                        match (userInfo, tweetInfo) with
                        | (Some u, Some t) -> 
                            Some {
                                User = u
                                Tweets = fst t
                                WordLookup = snd t
                                }
                        | _ -> None
                        )
        getFromCache userTweetCacheLocation getCombinedInfo username


        
    ///Takes a tweet and makes it good for the "tweet this!" button. (adds usernames and a link)
    let tweetWithContext (username1:string) (username2:string) (text:string) : string*int =
        let url =
            "http://tweetmashup.com"
        let adjustUsername (username:string) =
            "@" + username.TrimStart('@')
        let tweet = sprintf "%s %s - %s: %s" (adjustUsername username1) (adjustUsername username2) url text 
        let length = tweet.Length + 2
        (tweet,length)


    ///Generate mashed up tweets out of two users info. 
    let generateCombinedTweet (tweetsToGenerate: int) (user1TweetsInfo: UserTweetsInfo) (user2TweetsInfo: UserTweetsInfo) =
        ///Determines the maximum length we could use for a tweet by passing adding context to an empty tweet and counting the remaining characters. Used to limit which tweets we generate.
        let getMaxTweetLength (username1:string) (username2:string): int =
            let (tweet,length) = (tweetWithContext username1 username2 "")
            140 - length
            |> max 0

        ///Checks if a tweet could be made using the selected word.
        let canMakeTweet (word: string) (maxTweetLength: int) (otherUserMins: int*int) (userWord: TweetWordData) =
            userWord.CharactersBeforeWord + (snd otherUserMins) + word.Length <= maxTweetLength ||
            userWord.CharactersAfterWord + (fst otherUserMins) + word.Length <= maxTweetLength

        let random = new System.Random()
        let maxTweetLength = getMaxTweetLength user1TweetsInfo.User.Username user2TweetsInfo.User.Username

        ///an array of words, and the tweet word data arrays from the two users for that word. This is our set of possible words to mash on
        let validWordInfoJoined =
            let wordsInBoth = 
                let words (uti: UserTweetsInfo) =
                    uti.WordLookup
                    |> Map.toSeq
                    |> Seq.map fst
                    |> Set.ofSeq
                [words user1TweetsInfo; words user2TweetsInfo]
                |> Set.intersectMany
            wordsInBoth
            |> Set.toArray
            |> Array.map (fun (word:string) ->
                            (word, Map.find word user1TweetsInfo.WordLookup, Map.find word user2TweetsInfo.WordLookup))
            |> Array.map 
                (fun (word, user1Words, user2Words) ->
                    let getMins (userWords: TweetWordData array) = 
                        let minUserBefore = userWords |> Array.map (fun x -> x.CharactersBeforeWord)  |> Array.min
                        let minUserAfter = userWords |> Array.map (fun x -> x.CharactersAfterWord)  |> Array.min
                        (minUserBefore,minUserAfter)
                    let user1Mins = getMins user1Words
                    let user2Mins = getMins user2Words
                    (word, 
                        user1Words |> Array.filter (canMakeTweet word maxTweetLength user2Mins),
                        user2Words |> Array.filter (canMakeTweet word maxTweetLength user1Mins))
                    )
            |> Array.filter (fun (word, user1words, user2words) -> not (Array.isEmpty user1words || Array.isEmpty user2words))

        ///A function that takes a particular word and the tweet word data arrays for each user and makes a combined set of tweets from it
        let combineTwoWordSets (user1TweetsInfo: UserTweetsInfo) (user2TweetsInfo: UserTweetsInfo) (word, user1Words, user2Words) =
            let chooseWords word userAWords userBWords =
                let userAWord = arrayRandom random userAWords
                let userBWord = 
                    userBWords
                    |> Array.filter (canMakeTweet word maxTweetLength (userAWord.CharactersBeforeWord, userAWord.CharactersAfterWord))
                    |> (arrayRandom random)
                let aBeforeBAllowed = (userAWord.CharactersBeforeWord + userAWord.Word.Length + userBWord.CharactersAfterWord) <= maxTweetLength
                let bBeforeAAllowed = (userBWord.CharactersBeforeWord + userBWord.Word.Length + userAWord.CharactersAfterWord) <= maxTweetLength
                let isABeforeB =
                    if aBeforeBAllowed && bBeforeAAllowed then
                        (random.NextDouble() > 0.5)
                    else aBeforeBAllowed
                (userAWord,userBWord,isABeforeB)

            let (user1Word,user2Word,is1Before2) =
                if random.NextDouble() > 0.5 then
                    chooseWords word user1Words user2Words
                else
                    chooseWords word user2Words user1Words
                    |> (fun (x,y,z) -> (y,x, (not z)))


            let leftTweet = 
                if is1Before2 then
                    (Map.find user1Word.Tweet user1TweetsInfo.Tweets).Substring(0,user1Word.CharactersBeforeWord)
                else
                    (Map.find user2Word.Tweet user2TweetsInfo.Tweets).Substring(0,user2Word.CharactersBeforeWord)
            let finalWord =
                if is1Before2 then user2Word.Word else user1Word.Word           
            let rightTweet = 
                if is1Before2 then
                    (Map.find user2Word.Tweet user2TweetsInfo.Tweets).Substring(user2Word.CharactersBeforeWord+finalWord.Length,user2Word.CharactersAfterWord)
                else
                    (Map.find user1Word.Tweet user1TweetsInfo.Tweets).Substring(user1Word.CharactersBeforeWord+finalWord.Length,user1Word.CharactersAfterWord)      
            leftTweet + finalWord + rightTweet                     

        match Array.length validWordInfoJoined with
        | 0 -> None //If there are no words that could work to mash up on, return nothing
        | _ ->
            validWordInfoJoined //take the valid words to mash up on...
            |> arrayRandomMultiple random tweetsToGenerate //and select a random sample of them
            |> Array.map (combineTwoWordSets user1TweetsInfo user2TweetsInfo) //Then generate a tweet from each word
            |> Some
        
    ///This is the function that puts the mashing up all together. Given credentials, a number of tweets to generate, and two user names, returns a set of mashups!
    let mashup (credentialsInput: SimpleCredentials option) (tweetsToGenerate: int) (username1unfiltered: string) (username2unfiltered: string) =
        let credentials = 
            match credentialsInput with
            | Some c ->
                let credentials = 
                    c
                    |> simpleCredentialsToCredentials
                Tweetinvi.Auth.SetCredentials credentials
                Some credentials
            | None -> None
        let username1 = username1unfiltered.ToLower().Replace("@","").Replace(" ","") //filter the garbage out of the usernames
        let username2 = username2unfiltered.ToLower().Replace("@","").Replace(" ","") 
        let (user1InfoOption,user2InfoOption) = //pull information about the two users  
            seq [username1;username2] //This is a little bit of fluff to make pulling the users work concurrently
            |> Seq.map (fun user ->
                async {
                    return getTweetsAndUserInfo credentials user
                    }
                )
            |> Async.Parallel
            |> Async.RunSynchronously
            |> (fun x -> (Array.item 0 x, Array.item 1 x))

        match (user1InfoOption,user2InfoOption) with
        | (Some user1TweetsInfo, Some user2TweetsInfo) -> //If we successfully pull two users, make the mashup
            match generateCombinedTweet tweetsToGenerate user1TweetsInfo user2TweetsInfo with
            | Some tweets ->
                let tweetsWithContext =
                    tweets
                    |> Array.map (fun tweet ->
                        let combinedWithContext =
                            tweet
                            |> tweetWithContext user1TweetsInfo.User.Username user2TweetsInfo.User.Username
                            |> fst
                            |> System.Web.HttpUtility.UrlEncode
                        {Tweet=tweet;TweetWithContext=combinedWithContext})
                Some {
                    Combined = tweetsWithContext;
                    User1 = user1TweetsInfo.User;
                    User2 = user2TweetsInfo.User;
                }
            | _ -> None
        | _ -> None
                
                
            


