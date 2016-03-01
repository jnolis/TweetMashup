namespace Website

open WebSharper
open Backend.Twitter
open Tweetinvi
type Reponse<'a,'b> =
    | Success of 'a
    | Failure of 'b 
module Server =
    [<Rpc>]
    let makeMashup (user1:string) (user2:string) =
        let stringToOption (s:string) =
            match s.Length with | 0 -> None | _ -> Some s
        let mashup = 
            let username1 = user1.TrimStart('@') 
            let username2 = user2.TrimStart('@') 
            match mashup username1 username2 with
            | Some m -> Success (m.Combined, m.CombinedWithContext, stringToOption m.User1.Name, stringToOption m.User1.ProfileImageUrl400x400, stringToOption m.User2.Name, stringToOption m.User2.ProfileImageUrl400x400)
            | None -> Failure "Mashup didn't work :("
        async {
            return mashup
        }