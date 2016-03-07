namespace Website

open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client
open WebSharper.Piglets
[<JavaScript>]
module Client =
    let tweetButtonTemplate () = A [I [Attr.Class "fa fa-twitter wow bounceIn"];
                                    Span [Text "Tweet this!"] -< [Attr.Class "label"]
                                    ] -< [Attr.Class "btn btn-lg twitter-button"; Attr.HRef "http://www.google.com"; Attr.Style "display: none;"; Attr.Target "_blank"]
    let preset (userPairs: (Backend.SmallUser*Backend.SmallUser) []) = 
        let output = P [] -< [Attr.Class "tweet-text text-center"]
        let tweetThisButton = tweetButtonTemplate()
        let pairUI (userPair:Backend.SmallUser*Backend.SmallUser) =
            let (user1,user2) = userPair
            Piglet.Return ()
            |> Piglet.WithSubmit
            |> Piglet.Run (fun () ->
                async {
                    let! mashup = Server.makeMashup user1.Username user2.Username
                    do tweetThisButton.SetAttribute("style","")
                    match mashup with
                    | Website.Reponse.Success 
                        (tweetText,tweetTextForLink,user1NameOption,user1ImageURLOption,user2NameOption,user2ImageURLOption) ->
                        output.Text <- tweetText
                        match tweetTextForLink with
                        | Some linkURL ->
                            do tweetThisButton.RemoveAttribute("disabled")
                            do tweetThisButton.RemoveAttribute("style")
                            tweetThisButton.SetAttribute("href","https://twitter.com/intent/tweet?text="+linkURL)
                        | None -> 
                            do tweetThisButton.SetAttribute("disabled","")
                    | Website.Reponse.Failure d ->
                        output.Text <- d
                        tweetThisButton.SetAttribute("style","display: none;")
                }
                |> Async.Start)
            |> Piglet.Render (fun submit ->
                    Div [                            
                            Div [
                                Div [
                                    Img [Attr.Src user1.Image; Attr.Class "img-circle img-left-small"; Attr.Width "96"; Attr.Height "96"]
                                    Img [Attr.Src user2.Image; Attr.Class "img-circle img-right-small"; Attr.Width "96"; Attr.Height "96"]
                                    ] -< [Attr.Class "overlapping-images-small col-xs-6 col-md-8"]
                                Div [
                                    Div [
                                        Div [
                                            (Controls.Submit submit) -< [Attr.Class "btn go-button btn-lg"; Attr.NewAttr "Value" "Go!"; Attr.Id "go-button"]
                                            ] -< [Attr.Class "input-group"]
                                        ] -< [Attr.Class "form-group"]
                                    ] -< [Attr.Class "form form-inline col-xs-6 col-md-4"]
                                ] -< [Attr.Class "row"]
                            Div [H4 [Text (user1.FullName + " & " + user2.FullName)]] -< [Attr.Class "row text-center"]
                        ] -< [Attr.Class "col-sm-6 col-md-4"]
                    )
        Section [Attr.Class "container"] -<
            [Div (userPairs |> Seq.map pairUI |> List.ofSeq) -< [Attr.Class "row"]; 
            Div [output] -< [Attr.Class "row"];
            Div [tweetThisButton] -< [Attr.Class "row text-center"];
            ]
            
    let presetMobile (userPairs: (Backend.SmallUser*Backend.SmallUser) []) = Div []    


    let tryIt () =
        let userUI (i:int) (x: Stream<string>) = 
            Div [
                Label [Text ("Username " + i.ToString())] -< [Attr.Class "sr-only"; Attr.For ("username" + i.ToString())]
                Div [Attr.Class "input-group input-group-lg col-md-10"] -<
                    [
                    Span [Attr.Class "input-group-addon"; Attr.Id ("username" + i.ToString())] -< [Text "@"]
                    Controls.Input x -< 
                        [Attr.Value ""; 
                            Attr.Type "text"; 
                            Attr.Class "form-control"; 
                            Attr.PlaceHolder "username"; 
                            Attr.NewAttr "aria-describedby" ("username" + i.ToString()) ]
                    ]
                ] -< [Attr.Class "form-group"]
        let output = P [] -< [Attr.Class "tweet-text text-center"]
        let user1Image = Img [Attr.Class "img-circle img-left"; Attr.Width "128"; Attr.Height "128"]
        let user2Image = Img [Attr.Class "img-circle img-right"; Attr.Width "128"; Attr.Height "128"]
        let tweetThisButton = tweetButtonTemplate()
        let user1Name = H4 [Attr.Style "display: none;"]
        let user2Name = H4 [Attr.Style "display: none;"]
        let userUI =
            Piglet.Return (fun x y -> (x, y))
            <*> Piglet.Yield ""
            <*> Piglet.Yield ""
            |> Piglet.WithSubmit
            |> Piglet.Run (fun (x, y) ->
                async {
                    let! mashup =  Server.makeMashup x y
                    do tweetThisButton.SetAttribute("style","")
                    match mashup with
                    | Website.Reponse.Success 
                        (tweetText,tweetTextForLink,user1NameOption,user1ImageURLOption,user2NameOption,user2ImageURLOption) ->
                        output.Text <- tweetText
                        match tweetTextForLink with
                        | Some linkURL ->
                            do tweetThisButton.RemoveAttribute("disabled")
                            do tweetThisButton.RemoveAttribute("style")
                            tweetThisButton.SetAttribute("href","https://twitter.com/intent/tweet?text="+linkURL)
                        | None -> 
                            do tweetThisButton.SetAttribute("disabled","")

                        match user1NameOption with
                        | Some user1NameText -> 
                            user1Name.Text <- user1NameText
                            user1Name.RemoveAttribute("style")
                        | None -> 
                            user1Name.SetAttribute("style","display: none;")
                        match user2NameOption with
                        | Some user2NameText ->
                            user2Name.Text <- user2NameText
                            user2Name.RemoveAttribute("style")
                        | None -> 
                            user2Name.SetAttribute("style","display: none;")

                        match user1ImageURLOption with 
                        | Some user1ImageURL -> user1Image.SetAttribute("src",user1ImageURL) 
                        | None -> user1Image.RemoveAttribute("src")
                        match user2ImageURLOption with 
                        | Some user2ImageURL -> user2Image.SetAttribute("src",user2ImageURL) 
                        | None -> user2Image.RemoveAttribute("src")
                    | Website.Reponse.Failure d ->
                        output.Text <- d
                        user1Image.RemoveAttribute("src")
                        user1Name.SetAttribute("style","display: none;")
                        user2Image.RemoveAttribute("src")
                        user2Name.SetAttribute("style","display: none;")
                        tweetThisButton.SetAttribute("style","display: none;")
                }
                |> Async.Start)
            |> Piglet.Render (fun x y submit ->
                    Div [       
                            userUI 1 x
                            Div [H1 [Text "&"] ] -< [Attr.Class "form-group"]
                            userUI 2 y
                            Div [
                                Div [
                                    (Controls.Submit submit) -< [Attr.Class "btn go-button btn-lg"; Attr.NewAttr "Value" "Go!"; Attr.Id "go-button"]
                                    ] -< [Attr.Class "input-group col-md-10"]
                                ] -< [Attr.Class "form-group"]
                        ] -< [Attr.Class "form form-inline"]
                    )

        Div [
            userUI
            Div [
                Div [user1Name] -< [Attr.Class "col-md-4 col-lg-4 left-name hidden-sm hidden-xs"]
                Div [
                    user1Image
                    user2Image
                ] -< [Attr.Class "overlapping-images col-md-4 col-lg-4"]
                Div [user2Name] -< [Attr.Class "col-md-4 col-lg-4 right-name hidden-sm hidden-xs"]
            ] -< [Attr.Class "row"]
            Div [
                output
                ] -< [Attr.Class "row"]
            Div [
                tweetThisButton
                ] -< [Attr.Class "text-center row"]
        ] -< [Attr.Class "container"]


    let tryItMobile () =
        let userUI (i:int) (x: Stream<string>) = 
            Div [
                Label [Text ("Username " + i.ToString())] -< [Attr.Class "sr-only"; Attr.For ("username" + i.ToString())]
                Div [Attr.Class "input-group col-xs-12"] -<
                    [
                    Span [Attr.Class "input-group-addon"; Attr.Id ("username" + i.ToString())] -< [Text "@"]
                    Controls.Input x -< 
                        [Attr.Value ""; 
                            Attr.Type "text"; 
                            Attr.Class "form-control"; 
                            Attr.PlaceHolder "username"; 
                            Attr.NewAttr "aria-describedby" ("username" + i.ToString()) ]
                    ]
                ] -< [Attr.Class "form-group form-group-mobile"]
        let output = H5 [] -< [Attr.Class "text-center tweet-text-mobile"]
        let user1Image = Img [Attr.Class "img-circle img-left-small"; Attr.Width "96"; Attr.Height "96"]
        let user2Image = Img [Attr.Class "img-circle img-right-small"; Attr.Width "96"; Attr.Height "96"]
        let tweetThisButton = tweetButtonTemplate()
        let usernames = H6 [Attr.Style "display: none;"]
        let userUI =
            Piglet.Return (fun x y -> (x, y))
            <*> Piglet.Yield ""
            <*> Piglet.Yield ""
            |> Piglet.WithSubmit
            |> Piglet.Run (fun (x, y) ->
                async {
                    let! mashup =  Server.makeMashup x y
                    do tweetThisButton.SetAttribute("style","")
                    match mashup with
                    | Website.Reponse.Success 
                        (tweetText,tweetTextForLink,user1NameOption,user1ImageURLOption,user2NameOption,user2ImageURLOption) ->
                        output.Text <- tweetText
                        match tweetTextForLink with
                        | Some linkURL ->
                            do tweetThisButton.RemoveAttribute("disabled")
                            do tweetThisButton.RemoveAttribute("style")
                            tweetThisButton.SetAttribute("href","https://twitter.com/intent/tweet?text="+linkURL)
                        | None -> 
                            do tweetThisButton.SetAttribute("disabled","")

                        match (user1NameOption,user2NameOption) with
                        | (Some user1NameText,Some user2NameText) -> 
                            usernames.Text <- user1NameText + " & " + user2NameText
                            usernames.RemoveAttribute("style")
                        | _ -> 
                            usernames.SetAttribute("style","display: none;")

                        match user1ImageURLOption with 
                        | Some user1ImageURL -> user1Image.SetAttribute("src",user1ImageURL) 
                        | None -> user1Image.RemoveAttribute("src")
                        match user2ImageURLOption with 
                        | Some user2ImageURL -> user2Image.SetAttribute("src",user2ImageURL) 
                        | None -> user2Image.RemoveAttribute("src")
                    | Website.Reponse.Failure d ->
                        output.Text <- d
                        user1Image.RemoveAttribute("src")
                        usernames.SetAttribute("style","display: none;")
                        user2Image.RemoveAttribute("src")
                        tweetThisButton.SetAttribute("style","display: none;")
                }
                |> Async.Start)
            |> Piglet.Render (fun x y submit ->
                    Div [       
                            userUI 1 x
                            userUI 2 y
                            Div [
                                Div [
                                    (Controls.Submit submit) -< [Attr.Class "btn go-button col-xs-12"; Attr.NewAttr "Value" "Go!"; Attr.Id "go-button"]
                                    ] -< [Attr.Class "input-group col-xs-12"]
                                ] -< [Attr.Class "form-group form-group-mobile"]
                        ] -< [Attr.Class "form form-horizontal form-mobile"]
                    )

        Div [
            userUI
            Div [
                Div [
                    user1Image
                    user2Image
                ] -< [Attr.Class "overlapping-images-small"]
                Div [usernames] -< [Attr.Class "text-center"]
            ] -< [Attr.Class "row"]
            Div [
                output
                ] -< [Attr.Class "row"]
            Div [
                tweetThisButton
                ] -< [Attr.Class "text-center row"]
        ] -< [Attr.Class "container tweet-mobile-ui"]

