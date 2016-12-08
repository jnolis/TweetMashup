namespace Website

open WebSharper
open WebSharper.Sitelets
open Tweetinvi

type EndPoint =
    | [<EndPoint "/">] Home
    | [<EndPoint "/about">] About
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
                                H5 [A[Text "(Now open-source!)"] -< [Attr.HRef "https://github.com/jonadler/TweetMashup"]]
                                H5 [Text "By "; A [Text "Jonathan Adler"] -< [Attr.HRef "https://twitter.com/skyetetra"]; Text " with help from ";  A [Text "Jess Eddy"] -< [Attr.HRef "https://twitter.com/jesseddy" ]]
                                ] -< [Attr.Class "text-center"]
                            ] -< [Attr.Class "container"]
                        UL [
                            LI [A [Text "Popular combos"] -< [Attr.HRef "#preset"; 
                                                                                Html.NewAttr "aria-controls" "preset";
                                                                                Html.NewAttr "role" "tab";
                                                                                Html.NewAttr "data-toggle" "tab"]
                                ]-< [Html.NewAttr "role" "presentation"; Attr.Class (if not credentials.IsSome then "active" else "")] 
                            LI [A[Text "Try your own!"] -< [Attr.HRef "#tryit"; 
                                                        Html.NewAttr "aria-controls" "tryit"; 
                                                        Html.NewAttr "role" "tab"; 
                                                        Html.NewAttr "data-toggle" "tab"]
                                ]-< [Html.NewAttr "role" "presentation"; Attr.Class (if credentials.IsSome then "active" else "")] 

            
                            ] -< [Attr.Class "nav nav-tabs"; Html.NewAttr "role" "tablist"]
                        ] -< [Attr.Class "container"]
                    ] -< [Attr.Class "bg-primary"]

                Div [
                    Div [ClientSide <@ Client.presetMobile localPairCombos @>] -< [Html.NewAttr "role" "tabpanel"; Attr.Class (if not credentials.IsSome then "tab-pane active" else "tab-pane"); Attr.Id "preset"]
                    Div [ClientSide <@ Client.tryItMobile(credentials,loginUrl) @>] -< [Html.NewAttr "role" "tabpanel"; Attr.Class (if credentials.IsSome then "tab-pane active" else "tab-pane"); Attr.Id "tryit"]
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
                        H4 [A[Text "(now open-source!)"] -< [Attr.HRef "https://github.com/jonadler/TweetMashup"]]
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

            
                        ] -< [Attr.Class "nav nav-tabs"; Html.NewAttr "role" "tablist"]
                    ] -< [Attr.Class "container"]
                ] -< [Attr.Class "bg-primary"]
            Div [
                Div [ClientSide <@ Client.preset localPairCombos @>] -< [Html.NewAttr "role" "tabpanel"; Attr.Class (if not credentials.IsSome then "tab-pane active" else "tab-pane"); Attr.Id "preset"]
                Div [ClientSide <@ Client.tryIt (credentials,loginUrl) @>] -< [Html.NewAttr "role" "tabpanel"; Attr.Class (if credentials.IsSome then "tab-pane active" else "tab-pane"); Attr.Id "tryit"]
                ] -< [Attr.Class "tab-content"]
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
