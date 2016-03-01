namespace Website

open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client
open WebSharper.Piglets
[<JavaScript>]
module Client =

    let Main () =
        let userUI (i:int) (x: Stream<string>) = 
            Div [
                Label [Text ("Username " + i.ToString())] -< [Attr.Class "sr-only"; Attr.For ("username" + i.ToString())]
                Div [Attr.Class "input-group input-group-lg col-md-10 colg"] -<
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
        let user1Image = Img [] -< [Attr.Class "img-circle img-left"; Attr.Width "128"; Attr.Height "128"]
        let user2Image = Img [] -< [Attr.Class "img-circle img-right"; Attr.Width "128"; Attr.Height "128"]
        let tweetThisButton = A [Text "Tweet this!"] -< [Attr.Class "btn btn-primary"; Attr.HRef "http://www.google.com"; Attr.Style "display: none;"]
        let user1Name = H4 []
        let user2Name = H4 []
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
                            tweetThisButton.SetAttribute("href","https://twitter.com/intent/tweet?text="+linkURL)
                        | None -> 
                            do tweetThisButton.SetAttribute("disabled","")

                        match user1NameOption with
                        | Some user1NameText -> user1Name.Text <- user1NameText
                        | None -> user1Name.Text <- ""
                        match user2NameOption with
                        | Some user2NameText -> user2Name.Text <- user2NameText
                        | None -> user2Name.Text <- ""

                        match user1ImageURLOption with 
                        | Some user1ImageURL -> user1Image.SetAttribute("src",user1ImageURL) 
                        | None -> user1Image.RemoveAttribute("src")
                        match user2ImageURLOption with 
                        | Some user2ImageURL -> user2Image.SetAttribute("src",user2ImageURL) 
                        | None -> user2Image.RemoveAttribute("src")
                    | Website.Reponse.Failure d ->
                        output.Text <- d
                        user1Image.RemoveAttribute("src")
                        user2Image.RemoveAttribute("src")
                }
                |> Async.Start)
            |> Piglet.Render (fun x y submit ->
                    Div [       
                            userUI 1 x
                            Div [H1 [Text "&"] ] -< [Attr.Class "form-group"]
                            userUI 2 y
                            Div [
                                Div [
                                    (Controls.Submit submit) -< [Attr.Class "btn btn-success btn-lg"; Attr.NewAttr "Value" "Go!"]
                                    ] -< [Attr.Class "input-group col-md-10"]
                                ] -< [Attr.Class "form-group"]
                        ] -< [Attr.Class "form form-inline"]
                    )//-< [Attr.Class "container"; Attr.NewAttr "role" "form"])

        
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
                ] -< [Attr.Class "row"]
        ] -< [Attr.Class "container"]
