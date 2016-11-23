namespace Website
open WebSharper
open Backend.Twitter
open Tweetinvi
type Reponse<'a,'b> =
    | Success of 'a
    | Failure of 'b 

type SendCredentials =
    | Credentials of Backend.SimpleCredentials
    | NoCredentials
    | NotRequired

module Server =

    [<Rpc>]
    let makeMashup (credentials: SendCredentials) (username1:string) (username2:string) =
        let stringToOption (s:string) =
            match s.Length with | 0 -> None | _ -> Some s

        async {
            let mashupResults = 
                match credentials with
                | Credentials c ->
                    match mashup (Some c) 10 username1 username2 with
                    | Some m -> 
                        Success (m.Combined |> Array.map (fun x -> (x.Tweet,x.TweetWithContext)), stringToOption m.User1.FullName, stringToOption m.User1.Image, stringToOption m.User2.FullName, stringToOption m.User2.Image)
                    | None -> Failure "Mashup didn't work :("
                | NotRequired ->
                    match mashup (None) 10 username1 username2 with
                    | Some m -> 
                        Success (m.Combined |> Array.map (fun x -> (x.Tweet,x.TweetWithContext)), stringToOption m.User1.FullName, stringToOption m.User1.Image, stringToOption m.User2.FullName, stringToOption m.User2.Image)
                    | None -> Failure "Mashup didn't work :("
                | NoCredentials -> Failure "Mashup didn't work, try refreshing the browser"
            return mashupResults
        }