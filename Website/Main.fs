namespace Website

open WebSharper
open WebSharper.Sitelets
open Tweetinvi

type EndPoint =
    | [<EndPoint "/">] Home

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
    Tweetinvi.Auth.ApplicationCredentials <- Backend.Twitter.getCredentials()
    let pairCombos = 
        System.Web.HttpContext.Current.Request.PhysicalApplicationPath + @"Content/AccountPairs.json"
        |> System.IO.File.ReadAllText
        |> (fun x -> Newtonsoft.Json.JsonConvert.DeserializeObject<(string*string) seq> (x))
        |> Seq.map
            (fun (x,y) -> 
                async {
                    return match (Backend.Twitter.getTweetsAndUserInfo x,Backend.Twitter.getTweetsAndUserInfo y) with
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
        Templating.mobile ctx [
            Div [
                Div [
                    Div [
                        Div [
                            Div [
                                H3 [Text "Tweet mashup!"]; 
                                H5 [Text "Combine tweets from two Twitter accounts for one awesome tweet!"]
                                H4 [Text "(I'm working on server fixes as you read this!)"] -< [Attr.Class "text-danger"]
                                H5 [Text "By "; A [Text "Jonathan Adler"] -< [Attr.HRef "https://twitter.com/skyetetra"]; Text " with help from ";  A [Text "Jess Eddy"] -< [Attr.HRef "https://twitter.com/jesseddy" ]]
                                ] -< [Attr.Class "text-center"]
                            ] -< [Attr.Class "container"]
                        UL [
                            LI [A[Text "Try it!"] -< [Attr.HRef "#tryit"; 
                                                        Html.NewAttr "aria-controls" "tryit"; 
                                                        Html.NewAttr "role" "tab"; 
                                                        Html.NewAttr "data-toggle" "tab"]
                                ]-< [Html.NewAttr "role" "presentation"; Attr.Class "active"] 
                            LI [A [Text "Popular combos"] -< [Attr.HRef "#preset"; 
                                                                                Html.NewAttr "aria-controls" "preset";
                                                                                Html.NewAttr "role" "tab";
                                                                                Html.NewAttr "data-toggle" "tab"]
                                ]-< [Html.NewAttr "role" "presentation"] 
            
                            ] -< [Attr.Class "nav nav-tabs"; Html.NewAttr "role" "tablist"]
                        ] -< [Attr.Class "container"]
                    ] -< [Attr.Class "bg-primary"]

                Div [
                    Div [ClientSide <@ Client.tryItMobile() @>] -< [Html.NewAttr "role" "tabpanel"; Attr.Class "tab-pane active"; Attr.Id "tryit"]
                    Div [ClientSide <@ Client.presetMobile localPairCombos @>] -< [Html.NewAttr "role" "tabpanel"; Attr.Class "tab-pane"; Attr.Id "preset"]
                    ] -< [Attr.Class "tab-content"]
                ] 
        ]
    let homePage (ctx:Context<EndPoint>) =
        let localPairCombos = pairCombos
        Templating.main ctx [
            Section [
                Div [
                    Div [
                        H1 [Text "Tweet mashup!"]; 
                        H3 [Text "Combine tweets from two Twitter accounts for one awesome tweet!"]
                        H2 [Text "(I'm working on server fixes as you read this!)"] -< [Attr.Class "text-danger"]
                        ] -< [Attr.Class "text-center"]
                    UL [
                        LI [A[Text "Try it!"] -< [Attr.HRef "#tryit"; 
                                                    Html.NewAttr "aria-controls" "tryit"; 
                                                    Html.NewAttr "role" "tab"; 
                                                    Html.NewAttr "data-toggle" "tab"]
                            ]-< [Html.NewAttr "role" "presentation"; Attr.Class "active"] 
                        LI [A [Text "Or pick from popular combinations"] -< [Attr.HRef "#preset"; 
                                                                            Html.NewAttr "aria-controls" "preset";
                                                                            Html.NewAttr "role" "tab";
                                                                            Html.NewAttr "data-toggle" "tab"]
                            ]-< [Html.NewAttr "role" "presentation"] 
            
                        ] -< [Attr.Class "nav nav-tabs"; Html.NewAttr "role" "tablist"]
                    ] -< [Attr.Class "container"]
                ] -< [Attr.Class "bg-primary"]
            Div [
                Div [ClientSide <@ Client.tryIt() @>] -< [Html.NewAttr "role" "tabpanel"; Attr.Class "tab-pane active"; Attr.Id "tryit"]
                Div [ClientSide <@ Client.preset localPairCombos @>] -< [Html.NewAttr "role" "tabpanel"; Attr.Class "tab-pane"; Attr.Id "preset"]
                ] -< [Attr.Class "tab-content"]
        ]


    [<Website>]
    let Main =
        Application.MultiPage (fun ctx endpoint ->
            let context = ctx.Environment.["HttpContext"] :?> System.Web.HttpContextWrapper
            match endpoint with
            | EndPoint.Home -> if context.Request.Browser.IsMobileDevice then mobilePage ctx else homePage ctx

        )
