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
            Title : string
            Body : list<Element>
        }

    let MainTemplate =
        Content.Template<Page>("~/Main.html")
            .With("title", fun x -> x.Title)
            .With("body", fun x -> x.Body)

    let Main ctx title body : Async<Content<EndPoint>> =
        Content.WithTemplate MainTemplate
            {
                Title = title
                Body = body
            }

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
                    return match (Backend.Twitter.getUser x,Backend.Twitter.getUser y) with
                            | (Some ux, Some uy) -> Some (Backend.Twitter.userToSmallUser ux, Backend.Twitter.userToSmallUser uy)
                            | _ -> None
                    }
            )
        |> Async.Parallel
        |> Async.RunSynchronously
        |> Seq.ofArray
        |> Seq.choose id
        |> Seq.toArray
    let HomePage (ctx:Context<EndPoint>) =
        let localPairCombos = pairCombos

        Templating.Main ctx "Tweet mash-up" [
            Section [
                Div [
                    Div [H1 [Text "Tweet mash-up"]; H3 [Text "Combine tweets from two Twitter accounts for one awesome tweet!"]] -< [Attr.Class "text-center"]
                    Div [
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
                        ]
                    ]
                ] -< [Attr.Class "bg-primary"]
            Div [
                Div [ClientSide <@ Client.tryIt() @>] -< [Html.NewAttr "role" "tabpanel"; Attr.Class "tab-pane active"; Attr.Id "tryit"]
                Div [ClientSide <@ Client.preset localPairCombos @>] -< [Html.NewAttr "role" "tabpanel"; Attr.Class "tab-pane"; Attr.Id "preset"]
                ] -< [Attr.Class "tab-content"]
        ]


    [<Website>]
    let Main =
        Application.MultiPage (fun ctx endpoint ->
            match endpoint with
            | EndPoint.Home -> HomePage ctx
        )
