namespace Backend

open Tweetinvi
open System
open System.Text.RegularExpressions

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
    WordLookup: Map<string,seq<TweetWordData>>
    }

type AsyncReturnInfo = 
    | TweetInfo of (Map<int64,string>*Map<string,seq<TweetWordData>>) option
    | UserInfo of SmallUser option

type Cache<'a,'b> =
    {
    mutable Data: System.Collections.Generic.Dictionary<'a,CacheSet<'b>>
    mutable LastCleaned: System.DateTime
    }
module Twitter =
    let mutable lastClean = System.DateTime.Now
    let daysBetweenClean = 1
    let getCredentials () = 
        let consumerKey = System.Configuration.ConfigurationManager.AppSettings.["consumerKey"]
        System.Console.WriteLine ("CONSUMER KEY: " + consumerKey)
        let consumerSecret = System.Configuration.ConfigurationManager.AppSettings.["consumerSecret"]
        let accessToken = System.Configuration.ConfigurationManager.AppSettings.["accessToken"]
        let accessTokenSecret = System.Configuration.ConfigurationManager.AppSettings.["accessTokenSecret"]
        new Core.Credentials.TwitterCredentials(consumerKey,consumerSecret,accessToken,accessTokenSecret)


    let random = new System.Random()

    let createCache<'a,'b when 'a: equality> () =
        {
            Data = new System.Collections.Generic.Dictionary<'a,CacheSet<'b>>();
            LastCleaned = System.DateTime.Now;
        }

    let userTweetCache = createCache<string,UserTweetsInfo>()

    let tooOld (dt:System.DateTime) = System.DateTime.Now.Subtract(dt).Days > 3

    let cleanCache (cache: Cache<'a,'b>) =
        cache.LastCleaned <- System.DateTime.Now
        for x in cache.Data do
            if tooOld x.Value.DateTime then
                cache.Data.Remove x.Key
                |> ignore

    let concatenate (s: string seq) =
        match Seq.length s with
        | 0 -> ""
        | 1 -> Seq.exactlyOne s
        | _ -> Seq.fold (fun x y -> x + " " + y) (Seq.head s) (Seq.skip 1 s)

    let seqRandom (s: seq<'a>) : 'a =
        let length = Seq.length s
        match length with
        | 0 -> failwith "seqRandom requires sequence to have length at least 1"
        | _ ->
            let choice = random.Next(0,length-1)
            Seq.item choice s

    let removeSpecialCharacters (str:string) = 
        let sb = new System.Text.StringBuilder()
        for c in str do
            if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')) then
                sb.Append(c) |> ignore
            else ()
        sb.ToString()

    let removeFirstAndLast (x : seq<'a>) =
        if Seq.length x >= 2 then 
            x
            |> Seq.take (Seq.length x - 1)
            |> Seq.skip 1
        else
            Seq.empty<'a>

    let groupAndMap (x: seq<'a*'b>) =
        x
        |> Seq.groupBy fst
        |> Seq.map (fun (key,s) -> (key,Seq.map (fun (key, value) -> value) s))
        |> Map.ofSeq

    let userToSmallUser (u:Core.Interfaces.IUser) : SmallUser option =
        try 
        Some {Username = u.ScreenName; FullName = u.Name; Image = u.ProfileImageUrl400x400}
        with
        | _ -> None

    let getTweetFromID (tweetID: int64) =
        Tweet.GetTweet tweetID

    let substitute (pattern:string) (replacement:string) (input:string) =
        let rgx = new Regex(pattern)
        rgx.Replace(input,replacement)

    let tweetText (x:Core.Interfaces.ITweet) = 
        x.Text
        |> System.Web.HttpUtility.HtmlDecode 
        |> (substitute "\\s+" " ")
        |> (substitute "https{0,1}://t.co/\\S*" "")
        |> (fun y -> y.Trim(' ').TrimEnd(' '))


    let getFromCache (cache: Cache<'a,'b>) (getValue: 'a -> 'b option) (key: 'a) =
        let value =
            try
                let storedValue =
                    if cache.Data.ContainsKey key then
                        let value = cache.Data.Item key
                        if tooOld value.DateTime then
                            cache.Data.Remove key
                            |> ignore
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
                            do cache.Data.Add((key,{DateTime = dateTime; Value = nv}))
                            Some nv
                        | None -> None
            with
              | _ -> None
        if System.DateTime.Now.Subtract(lastClean).Days > daysBetweenClean then 
            cleanCache cache
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
                    let temp = new Core.Parameters.UserTimelineParameters()
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
            |> Map.toSeq
            |> Seq.map (fun (num,tweet) ->
                tweet.Split(' ')
                |> Seq.ofArray
                |> (fun words -> Seq.mapFold (fun (startIdx:int) (word:string) -> ((startIdx+1,word),startIdx+word.Length+1)) (-1) words)
                |> fst
                |> (fun words -> Seq.mapFoldBack (fun (startIdx:int,word:string) (endIdx:int) -> 
                    ((word,{TweetWordData.Tweet = num; 
                        TweetWordData.CharactersBeforeWord = startIdx;
                        TweetWordData.Word = word;
                        TweetWordData.CharactersAfterWord = endIdx+1})),endIdx+word.Length+1) words (-1))
                |> fst
                |> Seq.map (fun (word,wordInfo) -> (removeSpecialCharacters (word.ToLowerInvariant()),wordInfo))
                |> Seq.filter (fun (word,_) -> word.Length > 0)
                |> removeFirstAndLast
                )
            |> Seq.concat
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
        getFromCache userTweetCache getCombinedInfo username




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
            |> Set.toSeq
            |> Seq.map (fun (word:string) ->
                            (word, Map.find word user1TweetsInfo.WordLookup, Map.find word user2TweetsInfo.WordLookup))
            |> Seq.map 
                (fun (word, user1Words, user2Words) ->
                    let getMins (userWords: TweetWordData seq) = 
                        let minUserBefore = userWords |> Seq.map (fun x -> x.CharactersBeforeWord)  |> Seq.min
                        let minUserAfter = userWords |> Seq.map (fun x -> x.CharactersAfterWord)  |> Seq.min
                        (minUserBefore,minUserAfter)
                    let user1Mins = getMins user1Words
                    let user2Mins = getMins user2Words
                    (word, 
                        user1Words |> Seq.filter (canMakeTweet word maxTweetLength user2Mins),
                        user2Words |> Seq.filter (canMakeTweet word maxTweetLength user1Mins))
                    )
            |> Seq.filter (fun (word, user1words, user2words) -> not (Seq.isEmpty user1words || Seq.isEmpty user2words))

        let combineTwoWordSets (user1TweetsInfo: UserTweetsInfo) (user2TweetsInfo: UserTweetsInfo) (word, user1Words, user2Words) =
            let chooseWords word userAWords userBWords =
                let userAWord = seqRandom userAWords
                let userBWord = 
                    userBWords
                    |> Seq.filter (canMakeTweet word maxTweetLength (userAWord.CharactersBeforeWord, userAWord.CharactersAfterWord))
                    |> seqRandom
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

        match Seq.length validWordInfoJoined with
        | 0 -> None
        | _ ->
            validWordInfoJoined
            |> seqRandom
            |> combineTwoWordSets user1TweetsInfo user2TweetsInfo
            |> Some
        

    let mashup (username1: string) (username2: string) =
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
                
                
            


