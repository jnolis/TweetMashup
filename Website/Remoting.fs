namespace Website
open WebSharper
open Twitter
open Tweetinvi

///I think this is actually a standard type in F# 4.1, but I started writing this before that existed
type Reponse<'a,'b> =
    | Success of 'a
    | Failure of 'b 

///<summary>When sending credentials to the server there are three options: credentials, no credentials given, or no credentials required.
///This might be a security issue in that someone could manually inject "notrequired", but at most all they'll do is go against the app rate limits instead of the user one with is NBD
type SendCredentials =
    | Credentials of SimpleCredentials
    | NoCredentials
    | NotRequired


module Server =
    ///This is the single function that takes any response we get from the client asking for a mashup and converts that to a call to the Twitter method to make the mashup.
    [<Rpc>]
    let makeMashup (credentials: SendCredentials) (username1:string) (username2:string) =
        let mashupResults = 
            match credentials with
            | Credentials c ->
                match mashup (Some c) 10 username1 username2 with
                | Some m -> Success m
                | None -> Failure "Mashup didn't work :("
            | NotRequired ->
                match mashup (None) 10 username1 username2 with
                | Some m -> Success m
                | None -> Failure "Mashup didn't work :("
            | NoCredentials -> Failure "Mashup didn't work, try refreshing the browser"
        mashupResults
