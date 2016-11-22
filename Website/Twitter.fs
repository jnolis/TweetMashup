namespace Backend

open Tweetinvi
open System
open System.Text.RegularExpressions
open Newtonsoft.Json

type SmallUser = {
    Username: string;
    FullName: string;
    Image: string
    }

type Mashup =
    {
    Combined: string
    CombinedWithContext: string option
    User1: SmallUser
    User2: SmallUser
    }

type CacheSet<'a> = {DateTime: System.DateTime; Value: 'a}

type TweetWordData = {
    Word: string
    Tweet:int64
    CharactersBeforeWord: int
    CharactersAfterWord: int
    }

type UserTweetsInfo = {
    User: SmallUser
    Tweets: Map<int64,string>
    WordLookup: Map<string,TweetWordData array>
    }

type AsyncReturnInfo = 
    | TweetInfo of (Map<int64,string>*Map<string,TweetWordData array>) option
    | UserInfo of SmallUser option


module Twitter =
    let mutable lastClean = System.DateTime.Now
    let daysBetweenClean = 1
    let getCredentials () = 
        let consumerKey = System.Configuration.ConfigurationManager.AppSettings.["consumerKey"]
        let consumerSecret = System.Configuration.ConfigurationManager.AppSettings.["consumerSecret"]
        let accessToken = System.Configuration.ConfigurationManager.AppSettings.["accessToken"]
        let accessTokenSecret = System.Configuration.ConfigurationManager.AppSettings.["accessTokenSecret"]
        Auth.CreateCredentials(consumerKey,consumerSecret,accessToken,accessTokenSecret)

    let userTweetCacheLocation = System.Configuration.ConfigurationManager.AppSettings.["storeLocation"]
    let random = new System.Random()

    let tooOld (dt:System.DateTime) = System.DateTime.Now.Subtract(dt).Days > 7

    let concatenate (s: string array) =
        match Array.length s with
        | 0 -> ""
        | 1 -> Array.exactlyOne s
        | _ -> Array.fold (fun x y -> x + " " + y) (Array.head s) (Array.skip 1 s)

    let arrayRandom (s: 'a array) : 'a =
        let length = Array.length s
        match length with
        | 0 -> failwith "arrayRandom requires array to have length at least 1"
        | _ ->
            let choice = random.Next(0,length-1)
            Array.item choice s

    let removeSpecialCharacters (str:string) = 
        let sb = new System.Text.StringBuilder()
        for c in str do
            if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')) then
                sb.Append(c) |> ignore
            else ()
        sb.ToString()

    let removeFirstAndLast (x : 'a array) =
        if Array.length x >= 2 then 
            x
            |> Array.take (Array.length x - 1)
            |> Array.skip 1
        else
            Array.empty<'a>

    let groupAndMap (x: ('a*'b) array) =
        x
        |> Array.groupBy fst
        |> Array.map (fun (key,s) -> (key,Array.map (fun (key, value) -> value) s))
        |> Map.ofArray

    let userToSmallUser (u:Models.IUser) : SmallUser option =
        try 
        Some {Username = u.ScreenName; FullName = u.Name; Image = u.ProfileImageUrl400x400}
        with
        | _ -> None

    let getTweetFromID (tweetID: int64) =
        Tweet.GetTweet tweetID

    let substitute (pattern:string) (replacement:string) (input:string) =
        let rgx = new Regex(pattern)
        rgx.Replace(input,replacement)

    let tweetText (x:Models.ITweet) = 
        x.Text
        |> System.Web.HttpUtility.HtmlDecode 
        |> (substitute "\\s+" " ")
        |> (substitute "https{0,1}://t.co/\\S*" "")
        |> (fun y -> y.Trim(' ').TrimEnd(' '))


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

    let getUser (username) =
        try 
            TweetinviEvents.QueryBeforeExecute.Add( fun a -> a.TwitterQuery.Timeout <- TimeSpan.FromSeconds(30.0))
            User.GetUserFromScreenName username
            |> userToSmallUser
        with 
        | exn -> 
            do System.Diagnostics.Debug.WriteLine("Couldn't pull user " + (ExceptionHandler.GetLastException()).TwitterDescription) 
            None

    let getTweetsAndUserInfo (username:string) = 
        let getTweetMap (username:string) = 
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
            seq [(fun x -> AsyncReturnInfo.UserInfo (getUser x));
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




    let tweetWithContext (username1:string) (username2:string) (text:string) : string*int =
        let url =
            "http://tweetmashup.com"
        let adjustUsername (username:string) =
            "@" + username.TrimStart('@')
        let tweet = sprintf "%s %s - %s: %s" (adjustUsername username1) (adjustUsername username2) url text 
        let length = tweet.Length + 2
        (tweet,length)

    let getMaxTweetLength (username1:string) (username2:string): int =
        let (tweet,length) = (tweetWithContext username1 username2 "")
        140 - length
        |> max 0

    let canMakeTweet (word: string) (maxTweetLength: int) (otherUserMins: int*int) (userWord: TweetWordData) =
        userWord.CharactersBeforeWord + (snd otherUserMins) + word.Length <= maxTweetLength ||
        userWord.CharactersAfterWord + (fst otherUserMins) + word.Length <= maxTweetLength

    let generateCombinedTweet (user1TweetsInfo: UserTweetsInfo) (user2TweetsInfo: UserTweetsInfo) =
        let maxTweetLength = getMaxTweetLength user1TweetsInfo.User.Username user2TweetsInfo.User.Username
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

        let combineTwoWordSets (user1TweetsInfo: UserTweetsInfo) (user2TweetsInfo: UserTweetsInfo) (word, user1Words, user2Words) =
            let chooseWords word userAWords userBWords =
                let userAWord = arrayRandom userAWords
                let userBWord = 
                    userBWords
                    |> Array.filter (canMakeTweet word maxTweetLength (userAWord.CharactersBeforeWord, userAWord.CharactersAfterWord))
                    |> arrayRandom
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
        | 0 -> None
        | _ ->
            validWordInfoJoined
            |> arrayRandom
            |> combineTwoWordSets user1TweetsInfo user2TweetsInfo
            |> Some
        

    let mashup (username1unfiltered: string) (username2unfiltered: string) =
        let username1 = username1unfiltered.ToLower().Replace("@","")
        let username2 = username2unfiltered.ToLower().Replace("@","")
        let (user1InfoOption,user2InfoOption) =             
            seq [username1;username2]
            |> Seq.map (fun user ->
                async {
                    return getTweetsAndUserInfo user
                    }
                )
            |> Async.Parallel
            |> Async.RunSynchronously
            |> (fun x -> (Array.item 0 x, Array.item 1 x))

        match (user1InfoOption,user2InfoOption) with
        | (Some user1TweetsInfo, Some user2TweetsInfo) -> 
            match generateCombinedTweet user1TweetsInfo user2TweetsInfo with
            | Some tweet ->
                Some {
                    Combined = tweet;
                    CombinedWithContext = 
                        tweet
                        |> tweetWithContext user1TweetsInfo.User.Username user2TweetsInfo.User.Username
                        |> fst
                        |> System.Web.HttpUtility.UrlEncode
                        |> Some;
                    User1 = user1TweetsInfo.User;
                    User2 = user2TweetsInfo.User;
                }
            | _ -> None
        | _ -> None
                
                
            


