namespace Website
open WebSharper
open Twitter
open Tweetinvi

///I think this is actually a standard type in F# 4.1, but I started writing this before that existed
type Reponse<'a,'b> =
    | Success of 'a
    | Failure of 'b 

module Server =
    ///This is the single function that takes any response we get from the client asking for a mashup and converts that to a call to the Twitter method to make the mashup.
    [<Rpc>]
    let makeMashup (login: string option) (username1:string) (username2:string) =
        match mashup login 10 username1 username2 with
        | Some m -> Success m
        | None -> Failure "Mashup didn't work :("
