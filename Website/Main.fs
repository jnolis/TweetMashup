namespace Website

open WebSharper
open WebSharper.Sitelets
open Tweetinvi

type EndPoint =
    | [<EndPoint "/">] Home
    | [<Query("authorization_id", "oauth_token","oauth_verifier")>] Login of authorization_id : string * oauth_token : string * oauth_verifier : string

module Templating =
    open WebSharper.Html.Server

    type Page =
        {
            Body : list<Element>
        }

    let mobile ctx body : Async<Content<EndPoint>> =
        let template =
            Content.Template<Page>("~/Mobile.html").With("body", fun x -> x.Body)
        Content.WithTemplate template
            {Body = body}

    let main ctx body : Async<Content<EndPoint>> =
        let template =
            Content.Template<Page>("~/Main.html").With("body", fun x -> x.Body)
        Content.WithTemplate template
            {Body = body}


module Site =
    open WebSharper.Html.Server
    Tweetinvi.Auth.ApplicationCredentials <- Backend.Twitter.getAppCredentials()
    let pairCombos = 
        System.Web.HttpContext.Current.Request.PhysicalApplicationPath + @"Content/AccountPairs.json"
        |> System.IO.File.ReadAllText
        |> (fun x -> Newtonsoft.Json.JsonConvert.DeserializeObject<(string*string) seq> (x))
        |> Seq.map
            (fun (x,y) -> 
                async {
                    return match (Backend.Twitter.getTweetsAndUserInfo (Some Tweetinvi.Auth.ApplicationCredentials) x,Backend.Twitter.getTweetsAndUserInfo (Some Tweetinvi.Auth.ApplicationCredentials) y) with
                            | (Some ux, Some uy) -> Some (ux.User, uy.User)
                            | _ -> None
                    }
            )
        |> Async.Parallel
        |> Async.RunSynchronously
        |> Seq.ofArray
        |> Seq.choose id
        |> Seq.toArray

    let aboutText = 
        Div[
            Div [
                H3 [Text "How it works"]
                P [
                    Text "Suppose we have two tweets we want to mash up. One tweet says: \"I don't like to worry about spiders\" while the other says \"Sometimes I worry that I am a ghost.\" We can mash the two tweets together by combining them from the word \"worry.\" We take the words to the left of the word \"worry\" in the first tweet (\"I don't like to\") and the the words to the right of \"worry\" in the second tweet (\"that I am a ghost\") and combine them \"I dont like to worry that I am a ghost\". Tweet Mashup works by doing this in an efficient manner. In more detail:";
                    OL [
                        LI [ Text "For two users do the following:"];
                        OL [         
                            LI [ Text "Download a set of their tweets"]
                            LI [ Text "For each tweet, take each word in the tweet and store how many characters it is into the tweet."];
                            LI [ Text "Create a dictionary that has, for each unique word, an array of the tweets and positions the word falls in."];]
                        LI [ Text "Take the two tweet-word dictionary, and find the words that are in both of them."]
                        LI [ Text "Randomly pick a word from the set of words in both dictionaries."]
                        LI [ Text "Randomly choose an instance that word shows up in a tweet from each user, and randomly choose which user will be the beginning half of the mashed-up tweet, and which will be the ending half."]
                        LI [ Text "Combined these together to make one tweet."]
                        ]]
                H3 [Text "How it was programmed"]
                P [
                    Text "It was programmed using the functional ";
                    A [Text "programming language F#"] -< [Attr.HRef "http://www.tryfsharp.org/"; Attr.Target "_blank"];
                    Text ". The tweet API functionality was from ";
                    A [Text "Tweetinvi"] -< [Attr.HRef "https://github.com/linvi/tweetinvi"; Attr.Target "_blank"];
                    Text " and the web server capability from ";
                    A [Text "WebSharper"] -< [Attr.HRef "http://websharper.com/"; Attr.Target "_blank"];
                    Text ". The code is open-source and available on "
                    A[Text "GitHub"] -< [Attr.HRef "https://github.com/jonadler/TweetMashup"]
                    Text "."
                    ]
                H3 [Text "About us"]
                P [
                    A [Text "Jonathan Adler"] -< [Attr.HRef "http://jadler.info"; Attr.Target "_blank"];
                    Text " is an advanced analytics expert and amateur software developer. "
                    A [Text "Jess Eddy"] -< [Attr.HRef "http://jesseddy.com"; Attr.Target "_blank"];
                    Text " is a user experience consultant and digital product designer.";
                    ] 
                ] -< [Attr.Class "container"]
                ]
    let mobilePage (ctx:Context<EndPoint>) =
        let localPairCombos = pairCombos
        let (credentials,loginUrl) =
            match ctx.UserSession.GetLoggedInUser() |> Async.RunSynchronously with
            | Some login -> 
                match Backend.Twitter.getCredentials login with
                | Some credentials -> (Some credentials, None)
                | _ ->  (None, Some (Backend.Twitter.initAuthentication login))
            | None -> (None,None)
        Templating.mobile ctx [
            Div [
                Div [
                    Div [
                        Div [
                            Div [
                                H3 [Text "Tweet mashup!"]; 
                                H5 [Text "Combine tweets from two Twitter accounts for one awesome tweet!"]
                                H5 [Text "By "; A [Text "Jonathan Adler"] -< [Attr.HRef "https://twitter.com/skyetetra"]; Text " with help from ";  A [Text "Jess Eddy"] -< [Attr.HRef "https://twitter.com/jesseddy" ]]
                                ] -< [Attr.Class "text-center"]
                            ] -< [Attr.Class "container"]
                        UL [
                            LI [A [Text "Popular combos"] -< [Attr.HRef "#preset"; 
                                                                                Html.NewAttr "aria-controls" "preset";
                                                                                Html.NewAttr "role" "tab";
                                                                                Html.NewAttr "data-toggle" "tab"]
                                ]-< [Html.NewAttr "role" "presentation"; Attr.Class (if not credentials.IsSome then "active" else "")];
                            LI [A[Text "Try your own"] -< [Attr.HRef "#tryit"; 
                                                                Html.NewAttr "aria-controls" "tryit"; 
                                                                Html.NewAttr "role" "tab"; 
                                                                Html.NewAttr "data-toggle" "tab"]

                                ]-< [Html.NewAttr "role" "presentation"; Attr.Class (if credentials.IsSome then "active" else "")] 
                            LI [A[Text "About"] -< [Attr.HRef "#about"; 
                                                                Html.NewAttr "aria-controls" "about"; 
                                                                Html.NewAttr "role" "tab"; 
                                                                Html.NewAttr "data-toggle" "tab"]

                                ]-< [Html.NewAttr "role" "presentation"] 
            
                            ] -< [Attr.Class "nav nav-tabs"; Html.NewAttr "role" "tablist"]
                        ] -< [Attr.Class "container"]
                    ] -< [Attr.Class "bg-primary"]

                Div [
                    Div [ClientSide <@ Client.presetMobile localPairCombos @>] -< [Html.NewAttr "role" "tabpanel"; Attr.Class (if not credentials.IsSome then "tab-pane active" else "tab-pane"); Attr.Id "preset"]
                    Div [ClientSide <@ Client.tryItMobile(credentials,loginUrl) @>] -< [Html.NewAttr "role" "tabpanel"; Attr.Class (if credentials.IsSome then "tab-pane active" else "tab-pane"); Attr.Id "tryit"]
                    aboutText  -< [Html.NewAttr "role" "tabpanel"; Attr.Class "tab-pane"; Attr.Id "about"]
                    ] -< [Attr.Class "tab-content"]
                ] 
        ]
    let homePage (ctx:Context<EndPoint>) =
        let localPairCombos = pairCombos
        let (credentials,loginUrl) =
            match ctx.UserSession.GetLoggedInUser() |> Async.RunSynchronously with
            | Some login -> 
                match Backend.Twitter.getCredentials login with
                | Some credentials -> (Some credentials, None)
                | _ ->  (None, Some (Backend.Twitter.initAuthentication login))
            | None -> (None,None)
        Templating.main ctx [
            Section [
                Div [
                    Div [
                        H1 [Text "Tweet mashup!"]; 
                        H3 [Text "Combine tweets from two Twitter accounts for one awesome tweet!"]
                        ] -< [Attr.Class "text-center"]
                    UL [
                        LI [A [Text "Pick from popular combinations"] -< [Attr.HRef "#preset"; 
                                                                            Html.NewAttr "aria-controls" "preset";
                                                                            Html.NewAttr "role" "tab";
                                                                            Html.NewAttr "data-toggle" "tab"]
                            ]-< [Html.NewAttr "role" "presentation"; Attr.Class (if not credentials.IsSome then "active" else "")] 
                        LI [A[Text "Or make your own!"] -< [Attr.HRef "#tryit"; 
                                                    Html.NewAttr "aria-controls" "tryit"; 
                                                    Html.NewAttr "role" "tab"; 
                                                    Html.NewAttr "data-toggle" "tab"]
                            ]-< [Html.NewAttr "role" "presentation"; Attr.Class (if credentials.IsSome then "active" else "")] 
                        LI [A[Text "About Tweet mashup!"] -< [Attr.HRef "#about"; 
                                                                Html.NewAttr "aria-controls" "about"; 
                                                                Html.NewAttr "role" "tab"; 
                                                                Html.NewAttr "data-toggle" "tab"]

                                ]-< [Html.NewAttr "role" "presentation"] 
            
                        ] -< [Attr.Class "nav nav-tabs"; Html.NewAttr "role" "tablist"]
                    ] -< [Attr.Class "container"]
                ] -< [Attr.Class "bg-primary"]
            Div [
                Div [ClientSide <@ Client.preset localPairCombos @>] -< [Html.NewAttr "role" "tabpanel"; Attr.Class (if not credentials.IsSome then "tab-pane active" else "tab-pane"); Attr.Id "preset"]
                Div [ClientSide <@ Client.tryIt (credentials,loginUrl) @>] -< [Html.NewAttr "role" "tabpanel"; Attr.Class (if credentials.IsSome then "tab-pane active" else "tab-pane"); Attr.Id "tryit"]
                aboutText  -< [Html.NewAttr "role" "tabpanel"; Attr.Class "tab-pane"; Attr.Id "about"]
                ] -< [Attr.Class "tab-content"]
        ]

    let aboutPage (isMobile:bool) (ctx:Context<EndPoint>) =
        let template = if isMobile then Templating.mobile else Templating.main
        template ctx [
            Section [
                Div [
                    Div [
                        H1 [Text "About Tweet mashup!"]; 
                        A [Text "Go back to mashing tweets"] -< [Attr.HRef (ctx.Link Home)]
                        ] -< [Attr.Class "text-center"]
                    ] -< [Attr.Class "container"]
                ] -< [Attr.Class "bg-primary"]
            aboutText -< [Attr.Class "container"]
        ]

    [<Website>]
    let Main =
        Application.MultiPage (fun ctx endpoint ->
            let context = ctx.Environment.["HttpContext"] :?> System.Web.HttpContextWrapper
            match endpoint with
            | EndPoint.Home -> 
                match ctx.UserSession.GetLoggedInUser() |> Async.RunSynchronously with
                | Some login -> ()
                | None -> ctx.UserSession.LoginUser (System.Guid.NewGuid().ToString(),true) |> Async.RunSynchronously
                if context.Request.Browser.IsMobileDevice then mobilePage ctx else homePage ctx
            | EndPoint.Login (authorization_id, oauth_token,oauth_verifier) -> 
                match ctx.UserSession.GetLoggedInUser() |> Async.RunSynchronously with
                | Some login ->
                    Backend.Twitter.finishAuthentication oauth_verifier login
                    |> ignore
                | None -> ()
                Content.RedirectPermanentToUrl (ctx.Link EndPoint.Home)
        )
