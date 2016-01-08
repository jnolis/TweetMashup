namespace Website

open WebSharper
open WebSharper.Sitelets

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

    let HomePage ctx =
        Templating.Main ctx "Twitter Mash-up!" [
            H1 [Text "Twitter Mash-up!"]
            Div [ClientSide <@ Client.Main() @>]
        ]


    [<Website>]
    let Main =
        Application.MultiPage (fun ctx endpoint ->
            match endpoint with
            | EndPoint.Home -> HomePage ctx
        )
