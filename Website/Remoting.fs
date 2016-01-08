namespace Website

open WebSharper
open Backend.Twitter

type Reponse<'a,'b> =
    | Success of 'a
    | Failure of 'b 
module Server =
    [<Rpc>]
    let makeMashup (user1:string) (user2:string) =
        let stringToOption (s:string) =
            match s.Length with | 0 -> None | _ -> Some s
        let mashup = 
            match mashup (getCredentials()) user1 user2 with
            | Some m -> Success (m.Combined,stringToOption m.User1.ProfileImageUrl400x400,stringToOption m.User2.ProfileImageUrl400x400)
            | None -> Failure "Mashup didn't work :("
        async {
            return mashup
        }

    [<Rpc>]
    let getUserProfileImageURL (username:string) =
        let url =
            match getUserFromString (getCredentials()) username with
            | Some x -> x.ProfileImageUrl400x400
            | None -> ""
        async {
            return url
        }