namespace Website

open WebSharper
open Backend

module Server =
    [<Rpc>]
    let makeMashup (user1:string) (user2:string) =
        let error = "Couldn't make a mashup :("
        let mashup = 
//            try
                match Backend.Twitter.mashup user1 user2 with
                | Some x -> x.Combined
                | None -> error
//            with
//            | _ -> error
        async {
            return mashup
        }
