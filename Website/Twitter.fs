namespace Backend

open Tweetinvi
open System
open System.Text.RegularExpressions

type Mashup =
    {
    Word: string
    Combined: string
    Tweet1: Core.Interfaces.ITweet
    Tweet2: Core.Interfaces.ITweet
    User1: Core.Interfaces.IUser
    User2: Core.Interfaces.IUser
    }

type CacheSet<'a> = {DateTime: System.DateTime; Value: 'a}

module Twitter =
    let random = new System.Random()

    let tweetCache = new System.Collections.Generic.Dictionary<string,CacheSet<Map<int64,string>>>()
    let userCache = new System.Collections.Generic.Dictionary<string,CacheSet<Core.Interfaces.IUser>>()

    let tooOld (dt:System.DateTime) = System.DateTime.Now.Subtract(dt).Hours > 0

    let cleanCache (cache: System.Collections.Generic.Dictionary<'a,CacheSet<'b>>) =
        for x in cache do
            if tooOld x.Value.DateTime then
                cache.Remove x.Key
                |> ignore

    let concatenate (s: string seq) =
        match Seq.length s with
        | 0 -> ""
        | 1 -> Seq.exactlyOne s
        | _ -> Seq.fold (fun x y -> x + " " + y) (Seq.head s) (Seq.skip 1 s)

    let seqRandom (s: seq<'a>) : 'a =
        let length = Seq.length s
        let choice = random.Next(0,length-1)
        Seq.item choice s

    let removeSpecialCharacters (str:string) = 
        let sb = new System.Text.StringBuilder()
        for c in str do
            if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || c = '.' || c = '_') then
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

    let getCredentials () = 
        System.Web.HttpContext.Current.Request.PhysicalApplicationPath + @"Content/Keys.json"
        |> System.IO.File.ReadAllText
        |> (fun x -> Newtonsoft.Json.JsonConvert.DeserializeObject<Core.Credentials.TwitterCredentials> (x))

    let getCredentialsFromFile (filename) = 
        filename
        |> System.IO.File.ReadAllText
        |> (fun x -> Newtonsoft.Json.JsonConvert.DeserializeObject<Core.Credentials.TwitterCredentials> (x))

    let getTweetFromID (credentials) (tweetID: int64) =
        Auth.SetCredentials (credentials)
        Tweet.GetTweet tweetID

    let getFromCache (cache: System.Collections.Generic.Dictionary<'a,CacheSet<'b>>) (getValue: 'a -> 'b option) (key: 'a)=
        try
            do cleanCache(cache)
            let storedValue =
                if cache.ContainsKey key then
                    let value = cache.Item key
                    if tooOld value.DateTime then
                        cache.Remove key
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
                        do cache.Add((key,{DateTime = dateTime; Value = nv}))
                        Some nv
                    | None -> None
        with
          | _ -> None

    let getUserFromString (credentials) (username: string) =
        let getUser (credentials) (username) =
            try 
                Auth.SetCredentials credentials
                User.GetUserFromScreenName username
                |> Some
            with | _ -> None
        getFromCache userCache (getUser credentials) username

    let getTweets (credentials) (username:string) = 
        let getTweets (credentials) (username:string) = 
                Auth.SetCredentials credentials
                try Timeline.GetUserTimeline(username, 3200)
                    |> Seq.filter (fun tweet -> (not tweet.IsRetweet) && (not tweet.InReplyToStatusId.HasValue))
                    |> Seq.map (fun tweet -> (tweet.Id, tweet.Text))
                    |> Map.ofSeq
                    |> Some
                with
                | _ -> None
        getFromCache tweetCache (getTweets credentials) username


            

    let mashup (credentials) (userID1: string) (userID2: string) =
        let getTweetWordMaps (tweets:Map<int64,string>) =
            tweets
            |> Map.toSeq
            |> Seq.map (fun (num,tweet) ->
                tweet.Split(' ')
                |> Seq.ofArray
                |> Seq.map (fun word -> (removeSpecialCharacters (word.ToLowerInvariant()),num))
                |> Seq.filter (fun (word,num) -> word.Length > 0)
                |> removeFirstAndLast
                )
            |> Seq.concat
            |> groupAndMap
                

        let getWordInBoth (tweetWordMaps : Map<string,seq<int64>>*Map<string,seq<int64>>)= 
            let wordsInBoth =
                [fst tweetWordMaps; snd tweetWordMaps]
                |> Seq.map (fun tweetMap -> tweetMap
                                            |> Map.toSeq
                                            |> Seq.map fst
                                            |> Set.ofSeq)
                |> Set.intersectMany
            wordsInBoth
            |> Set.toSeq
            |> (fun x -> match Seq.length x with | 0 -> None | _ -> Some (seqRandom x))
        
        let getTweetWithWord (word:string) (tweetWordMap : Map<string,seq<int64>>) (tweets: Map<int64,string>) =
            let tweetID = Map.find word tweetWordMap
                             |> (fun tweets -> seqRandom tweets)
            (tweetID, Map.find tweetID tweets)

        let mashTwoTweets (word:string) (tweet1: string) (tweet2: string) =
            let cutTweetText (isLeft: bool) (word: string) (text:string) =
                let isWord (formattedWord: string) (rawWord: string) =
                    formattedWord = removeSpecialCharacters (rawWord.ToLowerInvariant())
                let wordSequence = 
                    text.Split(' ')
                    |> Seq.ofArray
                    |> Seq.mapi (fun i (w:string) -> (i, isWord word w, w))
                let occurence =  
                    wordSequence
                    |> Seq.filter (fun (x,y,z) -> y)
                    |> seqRandom
                    |> (fun (x,y,z) -> x)
                
                wordSequence
                    |> (if isLeft then
                            Seq.take (occurence)
                        else
                            Seq.skip (occurence))
                    |> Seq.map (fun (x,y,z) -> z)
                    |> concatenate
            match random.NextDouble() > 0.5 with
            | true -> (tweet1,tweet2)
            | false -> (tweet2,tweet1)
            |> (fun (ta, tb) -> (cutTweetText true word ta) + " " + (cutTweetText false word tb))
            
        let (tweets1Option,tweets2Option) =             
            seq [userID1;userID2]
            |> Seq.map (fun user ->
                async {
                    return getTweets credentials user
                    }
                )
            |> Async.Parallel
            |> Async.RunSynchronously
            |> (fun x -> (Array.item 0 x, Array.item 1 x))
        let (user1Option,user2Option) =             
            seq [userID1;userID2]
            |> Seq.map (fun user ->
                async {
                    return getUserFromString credentials user
                    }
                )
            |> Async.Parallel
            |> Async.RunSynchronously
            |> (fun x -> (Array.item 0 x, Array.item 1 x))
        match (tweets1Option,tweets2Option) with
        | (Some tweets1, Some tweets2) ->
            let (twm1,twm2) = (getTweetWordMaps tweets1, getTweetWordMaps tweets2)
            let wordInBoth = getWordInBoth (twm1, twm2)
            match (wordInBoth,user1Option,user2Option) with
            | (Some word, Some user1, Some user2) ->
                let (tweet1ID,tweet1String) = getTweetWithWord word twm1 tweets1
                let (tweet2ID,tweet2String) = getTweetWithWord word twm2 tweets2
                let combined = mashTwoTweets word tweet1String tweet2String
                let (tweet1,tweet2) =
                    seq [tweet1ID;tweet2ID]
                    |> Seq.map (fun tweetID ->
                        async {
                            return getTweetFromID credentials tweetID
                            }
                        )
                    |> Async.Parallel
                    |> Async.RunSynchronously
                    |> (fun x -> (Array.item 0 x, Array.item 1 x))
            
                Some {
                    Combined = combined;
                    Word = word;
                    Tweet1 = tweet1;
                    Tweet2 = tweet2;
                    User1 = user1;
                    User2 = user2;
                }
            | _ -> None
        | _ -> None
                
                
            


