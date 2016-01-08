namespace Backend

open Tweetinvi
open System
open System.Text.RegularExpressions

type Mashup =
    {
    Word: string
    Combined: string
    Tweet1Embedded: string
    Tweet2Embedded: string
    }

module Twitter =
    let random = new System.Random()

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

    let groupAndMap (x: seq<'a*'b>) =
        x
        |> Seq.groupBy fst
        |> Seq.map (fun (key,s) -> (key,Seq.map (fun (key, value) -> value) s))
        |> Map.ofSeq
    let getCredentials filename = 
        filename
        |> System.IO.File.ReadAllText
        |> (fun x -> Newtonsoft.Json.JsonConvert.DeserializeObject<Core.Credentials.TwitterCredentials> (x))

    let getTweets (filename: string) (username:string) = 
        Auth.SetCredentials (getCredentials filename)
        try Timeline.GetUserTimeline(username, 3200)
            |> Seq.filter (fun tweet -> (not tweet.IsRetweet) && (not tweet.InReplyToStatusId.HasValue))
            |> Seq.map (fun tweet -> (tweet.Id,tweet))
            |> Map.ofSeq
        with
        | _ -> Map.empty<int64,Core.Interfaces.ITweet>

            

    let mashup (filename: string) (user1: string) (user2: string) =
        let getAllTweets ()= 
            let user1Tweets = getTweets filename user1
            let user2Tweets = getTweets filename user2
            (user1Tweets, user2Tweets)

        let getTweetWordMaps (tweets:Map<int64,Core.Interfaces.ITweet>) =
            tweets
            |> Map.toSeq
            |> Seq.map (fun (num,tweet) ->
                tweet.Text
                |> (fun x -> x.Split(' '))
                |> Seq.ofArray
                |> Seq.map (fun word -> (removeSpecialCharacters (word.ToLowerInvariant()),num))
                |> Seq.filter (fun (word,num) -> word.Length > 0)
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
        
        let getTweetWithWord (word:string) (tweetWordMap : Map<string,seq<int64>>) (tweets: Map<int64,Core.Interfaces.ITweet>) =
            let tweetID = Map.find word tweetWordMap
                             |> (fun tweets -> seqRandom tweets)
            Map.find tweetID tweets

        let mashTwoTweets (word:string) (tweet1: Core.Interfaces.ITweet) (tweet2: Core.Interfaces.ITweet) =
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
            |> (fun (ta, tb) -> (cutTweetText true word ta.Text) + " " + (cutTweetText false word tb.Text))
            
        let (tweets1,tweets2) = getAllTweets()
        let (twm1,twm2) = (getTweetWordMaps tweets1, getTweetWordMaps tweets2)
        let wordInBoth = getWordInBoth (twm1, twm2)
        match wordInBoth with
        | Some word ->
            let tweet1 = getTweetWithWord word twm1 tweets1
            let tweet2 = getTweetWithWord word twm2 tweets2
            let combined = mashTwoTweets word tweet1 tweet2
            
            Some {
                Combined = combined;
                Word = word;
                Tweet1Embedded= Tweet.GenerateOEmbedTweet(tweet1.Id).HTML;
                Tweet2Embedded =  Tweet.GenerateOEmbedTweet(tweet2.Id).HTML}
        | None -> None
                
                
            


