namespace Website

open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client
open WebSharper.Piglets
[<JavaScript>]
module Client =

    let Main () =
        let userUI (i:int) (x: Stream<string>) = 
            Div [Attr.Class "input-group input-group-lg"] -<
                [
                Span [Attr.Class "input-group-addon"; Attr.Id ("username" + i.ToString())] -< [Text "@"]
                Controls.Input x -< 
                    [Attr.Value ""; 
                       Attr.Type "text"; 
                       Attr.Class "form-control"; 
                       Attr.PlaceHolder "username"; 
                       Attr.NewAttr "aria-describedby" ("username" + i.ToString()) ]
                ]

        let output = H1 []
        let user1Image = Img []
        let user2Image = Img []
        let userUI =
            Piglet.Return (fun x y -> (x, y))
            <*> Piglet.Yield ""
            <*> Piglet.Yield ""
            |> Piglet.WithSubmit
            |> Piglet.Run (fun (x, y) ->
                async {
                    let! mashup =  Server.makeMashup x y
                    match mashup with
                    | Website.Reponse.Success (a,b,c) ->
                        output.Text <- a
                        match b with | Some bv -> user1Image.SetAttribute("src",bv) | None -> user1Image.RemoveAttribute("src")
                        match c with | Some cv -> user2Image.SetAttribute("src",cv) | None -> user2Image.RemoveAttribute("src")
                    | Website.Reponse.Failure d ->
                        output.Text <- d
                        user1Image.RemoveAttribute("src")
                        user2Image.RemoveAttribute("src")
                }
                |> Async.Start)
            |> Piglet.Render (fun x y submit ->
                Div [
                    Div [            
                        Div [userUI 1 x] -< [Attr.Class "col-lg-6"]
                        Div [userUI 2 y] -< [Attr.Class "col-lg-6"]
                    ] -< [Attr.Class "row"]
                    Br []
                    Div [Div [Controls.Submit submit -< [Attr.Class "btn btn-primary btn-lg"; Attr.NewAttr "Value" "Make the mash-up!"] ] -< [Attr.Class "col-md-6"]] -< [Attr.Class "row"]
                ])

        
        Div [
            userUI
            Br []
            Div [
                Div [user1Image -< [Attr.Class "img-responsive"]] -< [Attr.Class "col-lg-6" ]
                Div [user2Image -< [Attr.Class "img-responsive"]] -< [Attr.Class "col-lg-6"]
            ] -< [Attr.Class "row"]
            output
        ]
