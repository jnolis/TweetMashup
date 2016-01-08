namespace Website

open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client
open WebSharper.Piglets
[<JavaScript>]
module Client =

    let Start user1 user2 k =
        async {
            let! data = Server.makeMashup user1 user2
            return k data
        }
        |> Async.Start

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
        let userUI =
            Piglet.Return (fun x y -> (x, y))
            <*> Piglet.Yield ""
            <*> Piglet.Yield ""
            |> Piglet.WithSubmit
            |> Piglet.Run (fun (x, y) ->
                async {
                    let! data = Server.makeMashup x y
                    output.Text <- data
                }
                |> Async.Start)
            |> Piglet.Render (fun x y submit ->
                Div [
                    Div [            
                        Div [userUI 1 x] -< [Attr.Class "col-lg-6"]
                        Div [userUI 2 y] -< [Attr.Class "col-lg-6"]
                    ] -< [Attr.Class "row"]
                    Br []
                    Div [Div [Controls.Submit submit -< [Attr.Class "btn btn-primary btn-lg"]   -< [Text "Make the mashup!"]] -< [Attr.Class "col-md-6"]] -< [Attr.Class "row"]
                ])

        
        Div [
            userUI
            output
        ]
