namespace Website
open WebSharper
open Backend.Twitter
open Tweetinvi
type Reponse<'a,'b> =
    | Success of 'a
    | Failure of 'b 

module Server =

    [<Rpc>]
    let makeMashup (username1:string) (username2:string) =
        let stringToOption (s:string) =
            match s.Length with | 0 -> None | _ -> Some s

        async {
            let mashupResults = 
                match mashup 10 username1 username2 with
                | Some m -> 
                    Success (m.Combined |> Array.map (fun x -> (x.Tweet,x.TweetWithContext)), stringToOption m.User1.FullName, stringToOption m.User1.Image, stringToOption m.User2.FullName, stringToOption m.User2.Image)
                | None -> Failure "Mashup didn't work since the server is overloaded. Try using more famous twitter accounts..."
            return mashupResults
        }