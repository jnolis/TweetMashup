namespace Website
open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client
open WebSharper.Piglets

type OutputUIWeb =
    {
    TweetText: Element;
    User1Image: Element;
    User2Image: Element;
    Presents: Element;
    User1Name: Element;
    User2Name: Element;
    TweetThisButton: Element;
    }
type OutputUIMobile =
    {
    TweetText: Element;
    User1Image: Element;
    User2Image: Element;
    Presents: Element;
    Usernames: Element
    TweetThisButton: Element;
    }
[<JavaScript>]
module Client =
    let buildOutputUIWeb ()  =
        let output = P [] -< [Attr.Class "tweet-text text-center"]
        let user1Image = Img [Attr.Class "img-circle img-left"; Attr.Width "128"; Attr.Height "128"]
        let user2Image = Img [Attr.Class "img-circle img-right"; Attr.Width "128"; Attr.Height "128"]
        let tweetThisButton = A [I [Attr.Class "fa fa-twitter wow bounceIn"];
                                    Span [Text "Tweet this!"] -< [Attr.Class "label"]
                                    ] -< [Attr.Class "btn btn-lg twitter-button"; Attr.HRef "http://www.google.com"; Attr.Style "display: none;"; Attr.Target "_blank"]
        let presents = H3 [Attr.Class "text-center"]
        let user1Name = H4 [Attr.Style "display: none;"]
        let user2Name = H4 [Attr.Style "display: none;"]
        {Presents = presents;TweetText= output; User1Image = user1Image; User2Image = user2Image; User1Name = user1Name; User2Name = user2Name; TweetThisButton = tweetThisButton}
    let buildOutputUIMobile () =
        let presents = H6 [Attr.Class "text-center"]
        let output = H5 [] -< [Attr.Class "text-center tweet-text-mobile"]
        let user1Image = Img [Attr.Class "img-circle img-left-small"; Attr.Width "96"; Attr.Height "96"]
        let user2Image = Img [Attr.Class "img-circle img-right-small"; Attr.Width "96"; Attr.Height "96"]
        let tweetThisButton = A [I [Attr.Class "fa fa-twitter wow bounceIn"];
                                    Span [Text "Tweet this!"] -< [Attr.Class "label"]
                                    ] -< [Attr.Class "btn btn-lg twitter-button"; Attr.HRef "http://www.google.com"; Attr.Style "display: none;"; Attr.Target "_blank"]
        let usernames = H6 [Attr.Style "display: none;"]
        {Presents = presents;TweetText = output; User1Image = user1Image; User2Image = user2Image; Usernames = usernames; TweetThisButton = tweetThisButton}
    let processUserName (userNameOption: string option) (userName: Element) = 
        match userNameOption with
            | Some userNameText -> 
                userName.Text <- userNameText
                userName.RemoveAttribute("style")
            | None -> 
                userName.SetAttribute("style","display: none;")

    let processUserNames (user1NameOption: string option) (user2NameOption: string option) (usernames: Element) = 
        match (user1NameOption,user2NameOption) with
        | (Some user1NameText,Some user2NameText) -> 
            usernames.Text <- user1NameText + " & " + user2NameText
            usernames.RemoveAttribute("style")
        | _ -> 
            usernames.SetAttribute("style","display: none;")

    let processUserImage userImageURLOption (userImage:Element) =
        match userImageURLOption with 
            | Some userImageURL -> userImage.SetAttribute("src",userImageURL) 
            | None -> userImage.RemoveAttribute("src")

    let processTweetTextForLink (tweetTextForLink : string option) (tweetThisButton: Element) =
        match tweetTextForLink with
        | Some linkURL ->
            do tweetThisButton.RemoveAttribute("disabled")
            do tweetThisButton.RemoveAttribute("style")
            do tweetThisButton.SetAttribute("href","https://twitter.com/intent/tweet?text="+linkURL)
        | None -> 
            do tweetThisButton.SetAttribute("disabled","")
    let processTweetText (tweetText:string) (presents:Element) (e:Element) = 
        do presents.Text <- "TweetMashup.com presents:"
        do e.Text <- tweetText
    let processSuccessWeb (outputUI: OutputUIWeb) resultValues =
        let (tweetText, tweetTextForLink, user1NameOption, user1ImageURLOption, user2NameOption, user2ImageURLOption) = resultValues
        do processTweetText tweetText outputUI.Presents outputUI.TweetText
        do processTweetTextForLink tweetTextForLink outputUI.TweetThisButton
        do processUserName user1NameOption outputUI.User1Name
        do processUserName user2NameOption outputUI.User2Name
        do processUserImage user1ImageURLOption outputUI.User1Image
        do processUserImage user2ImageURLOption outputUI.User2Image


    let processSuccessMobile (outputUI: OutputUIMobile) resultValues =
        do outputUI.TweetThisButton.SetAttribute("style","")
        let (tweetText,tweetTextForLink,user1NameOption,user1ImageURLOption,user2NameOption,user2ImageURLOption) = resultValues
        do processTweetText tweetText outputUI.Presents outputUI.TweetText
        do processTweetTextForLink tweetTextForLink outputUI.TweetThisButton
        do processUserNames user1NameOption user2NameOption outputUI.Usernames
        do processUserImage user1ImageURLOption outputUI.User1Image
        do processUserImage user2ImageURLOption outputUI.User2Image

    let processFailureWeb (outputUI : OutputUIWeb) failureText =
        do outputUI.TweetThisButton.SetAttribute("style","")
        do outputUI.TweetText.Text <- failureText
        do outputUI.User1Image.RemoveAttribute("src")
        do outputUI.User1Name.SetAttribute("style","display: none;")
        do outputUI.User2Image.RemoveAttribute("src")
        do outputUI.User2Name.SetAttribute("style","display: none;")
        do outputUI.TweetThisButton.SetAttribute("style","display: none;")

    let processFailureMobile (outputUI : OutputUIMobile) failureText = 
        do outputUI.TweetThisButton.SetAttribute("style","")
        do outputUI.TweetText.Text <- failureText
        do outputUI.User1Image.RemoveAttribute("src")
        do outputUI.User2Image.RemoveAttribute("src")
        do outputUI.Usernames.SetAttribute("style","display: none;")
        do outputUI.TweetThisButton.SetAttribute("style","display: none;")

    let userSelectionUIWeb (i:int) (x: Stream<string>) = 
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
    let userSelectionUIMobile (i:int) (x: Stream<string>) = 
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
    let renderOutputUIWeb (outputUI: OutputUIWeb) =
        Div [
            Div [
                Div [outputUI.User1Name] -< [Attr.Class "col-md-4 col-lg-4 left-name hidden-sm hidden-xs"]
                Div [
                    outputUI.User1Image
                    outputUI.User2Image
                ] -< [Attr.Class "overlapping-images col-md-4 col-lg-4"]
                Div [outputUI.User2Name] -< [Attr.Class "col-md-4 col-lg-4 right-name hidden-sm hidden-xs"]
            ] -< [Attr.Class "row"]
            Div [
                outputUI.Presents
                ] -< [Attr.Class "row"]
            Div [
                outputUI.TweetText
                ] -< [Attr.Class "row"]
            Div [
                outputUI.TweetThisButton
                ] -< [Attr.Class "text-center row"]
        ]

    let renderOutputUIMobile (outputUI: OutputUIMobile) =
        Div [
            Div [
                Div [
                    outputUI.User1Image
                    outputUI.User2Image
                ] -< [Attr.Class "overlapping-images-small"]
                Div [outputUI.Usernames] -< [Attr.Class "text-center"]
            ] -< [Attr.Class "col-xs-12"]
            Div [
                outputUI.Presents
                ] -< [Attr.Class "col-xs-12"]
            Div [
                outputUI.TweetText
                ] -< [Attr.Class "col-xs-12"]
            Div [
                outputUI.TweetThisButton
                ] -< [Attr.Class "text-center col-xs-12"]
            ]
    let tryIt () =
        let outputUI = buildOutputUIWeb ()
        let mutable usernamePairCache = ("","")
        let mutable tweetCache = Array.empty<string*(string option)>
        let mutable tweetCacheD = (Array.empty<string*(string option)>,None,None,None,None)
        let mutable tweetCacheChoice = 0
        let userInputUI =
            Piglet.Return (fun x y -> (x, y))
            <*> Piglet.Yield ""
            <*> Piglet.Yield ""
            |> Piglet.WithSubmit
            |> Piglet.Run (fun (x, y) ->
                async {
                    if tweetCacheChoice >= Array.length tweetCache || (x,y) <> usernamePairCache then
                        usernamePairCache <- (x,y)
                        let! mashup =  Server.makeMashup x y
                        match mashup with
                        | Reponse.Success d ->
                            tweetCache <- (fun (x,_,_,_,_) -> x) d
                            tweetCacheD <- d
                            tweetCacheChoice <- 0
                            let newD = (fun (a,b,c,x,e) -> 
                                let (z,a) = (Array.item tweetCacheChoice tweetCache)
                                (z,a,b,c,x,e)) tweetCacheD
                            tweetCacheChoice <- tweetCacheChoice + 1
                            processSuccessWeb outputUI newD
                        | Reponse.Failure d ->
                            tweetCache <- Array.empty<string*(string option)>
                            tweetCacheD <- (Array.empty<string*(string option)>,None,None,None,None)
                            tweetCacheChoice <- 0
                            usernamePairCache <- ("","")
                            processFailureWeb outputUI d
                    else
                        usernamePairCache <- (x,y)
                        let newD = (fun (a,b,c,x,e) -> 
                            let (z,a) = (Array.item tweetCacheChoice tweetCache)
                            (z,a,b,c,x,e)) tweetCacheD
                        tweetCacheChoice <- tweetCacheChoice + 1
                        processSuccessWeb outputUI newD                
                }
                |> Async.Start)
            |> Piglet.Render (fun x y submit ->
                    Div [       
                            userSelectionUIWeb 1 x
                            Div [H1 [Text "&"] ] -< [Attr.Class "form-group"]
                            userSelectionUIWeb 2 y
                            Div [
                                Div [
                                    (Controls.Submit submit) -< [Attr.Class "btn go-button btn-lg"; Attr.NewAttr "Value" "Go!"; Attr.Id "go-button"]
                                    ] -< [Attr.Class "input-group col-md-10"]
                                ] -< [Attr.Class "form-group"]
                        ] -< [Attr.Class "form form-inline"]
                    )

        Div [
            userInputUI;
            renderOutputUIWeb outputUI
        ] -< [Attr.Class "container"]


    let preset (userPairs: (Backend.SmallUser*Backend.SmallUser) []) = 
        let outputUI = buildOutputUIWeb ()
        let mutable tweetCache = Array.empty<string*(string option)>
        let mutable tweetCacheD = (Array.empty<string*(string option)>,None,None,None,None)
        let mutable tweetCacheChoice = 0
        let mutable usernamePairCache = ("","")
        let pairUI (userPair:Backend.SmallUser*Backend.SmallUser) =
            let (user1,user2) = userPair
            Piglet.Return ()
            |> Piglet.WithSubmit
            |> Piglet.Run (fun () ->
                async {
                    if tweetCacheChoice >= Array.length tweetCache || (user1.Username,user2.Username) <> usernamePairCache then
                        usernamePairCache <- (user1.Username,user2.Username)
                        let! mashup =  Server.makeMashup user1.Username user2.Username
                        match mashup with
                        | Reponse.Success d ->
                            tweetCache <- (fun (x,_,_,_,_) -> x) d
                            tweetCacheD <- d
                            tweetCacheChoice <- 0
                            let newD = (fun (a,b,c,x,e) -> 
                                let (z,a) = (Array.item tweetCacheChoice tweetCache)
                                (z,a,b,c,x,e)) tweetCacheD
                            tweetCacheChoice <- tweetCacheChoice + 1
                            processSuccessWeb outputUI newD
                        | Reponse.Failure d ->
                            tweetCache <- Array.empty<string*(string option)>
                            tweetCacheD <- (Array.empty<string*(string option)>,None,None,None,None)
                            tweetCacheChoice <- 0
                            usernamePairCache <- ("","")
                            processFailureWeb outputUI d
                    else
                        usernamePairCache <- (user1.Username,user2.Username)
                        let newD = (fun (a,b,c,x,e) -> 
                            let (z,a) = (Array.item tweetCacheChoice tweetCache)
                            (z,a,b,c,x,e)) tweetCacheD
                        tweetCacheChoice <- tweetCacheChoice + 1
                        processSuccessWeb outputUI newD                
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
        Div [Attr.Class "container"] -<
            [Div (userPairs |> Seq.map pairUI |> List.ofSeq) -< [Attr.Class "row"]; 
            renderOutputUIWeb outputUI;
            ]
            
    let presetMobile (userPairs: (Backend.SmallUser*Backend.SmallUser) []) =   
        let outputUI = buildOutputUIMobile ()
        let mutable tweetCache = Array.empty<string*(string option)>
        let mutable tweetCacheD = (Array.empty<string*(string option)>,None,None,None,None)
        let mutable tweetCacheChoice = 0
        let mutable usernamePairCache = ("","")
        let pairUI (userPair:Backend.SmallUser*Backend.SmallUser) =
            let (user1,user2) = userPair
            Piglet.Return ()
            |> Piglet.WithSubmit
            |> Piglet.Run (fun () ->
                async {
                    if tweetCacheChoice >= Array.length tweetCache || (user1.Username,user2.Username) <> usernamePairCache then
                        usernamePairCache <- (user1.Username,user2.Username)
                        let! mashup =  Server.makeMashup user1.Username user2.Username
                        match mashup with
                        | Reponse.Success d ->
                            tweetCache <- (fun (x,_,_,_,_) -> x) d
                            tweetCacheD <- d
                            tweetCacheChoice <- 0
                            let newD = (fun (a,b,c,x,e) -> 
                                let (z,a) = (Array.item tweetCacheChoice tweetCache)
                                (z,a,b,c,x,e)) tweetCacheD
                            tweetCacheChoice <- tweetCacheChoice + 1
                            processSuccessMobile outputUI newD
                        | Reponse.Failure d ->
                            tweetCache <- Array.empty<string*(string option)>
                            tweetCacheD <- (Array.empty<string*(string option)>,None,None,None,None)
                            tweetCacheChoice <- 0
                            usernamePairCache <- ("","")
                            processFailureMobile outputUI d
                    else
                        usernamePairCache <- (user1.Username,user2.Username)
                        let newD = (fun (a,b,c,x,e) -> 
                            let (z,a) = (Array.item tweetCacheChoice tweetCache)
                            (z,a,b,c,x,e)) tweetCacheD
                        tweetCacheChoice <- tweetCacheChoice + 1
                        processSuccessMobile outputUI newD                
                }
                |> Async.Start)
            |> Piglet.Render (fun submit ->
                        Div [       
                            Div [
                                Div [
                                    (Controls.Submit submit) -< [Attr.Class "btn go-button col-xs-12"; Attr.NewAttr "Value" (user1.FullName + " & " + user2.FullName); Attr.Id "go-button"]
                                    ] -< [Attr.Class "input-group col-xs-12"]
                                ] -< [Attr.Class "form-group form-group-mobile"]
                        ] -< [Attr.Class "form form-horizontal form-mobile"]
                    )
        Div [Attr.Class "container tweet-mobile-ui"] -<
            [Div (userPairs |> Seq.map pairUI |> List.ofSeq); 
            renderOutputUIMobile outputUI;
            ]

    let tryItMobile () = 
        let outputUI = buildOutputUIMobile()
        let mutable tweetCache = Array.empty<string*(string option)>
        let mutable tweetCacheD = (Array.empty<string*(string option)>,None,None,None,None)
        let mutable tweetCacheChoice = 0
        let mutable usernamePairCache = ("","")
        let userInputUI =
            Piglet.Return (fun x y -> (x, y))
            <*> Piglet.Yield ""
            <*> Piglet.Yield ""
            |> Piglet.WithSubmit
            |> Piglet.Run (fun (x, y) ->
                async {
                    if tweetCacheChoice >= Array.length tweetCache || (x,y) <> usernamePairCache then
                        usernamePairCache <- (x,y)
                        let! mashup =  Server.makeMashup x y
                        match mashup with
                        | Reponse.Success d ->
                            tweetCache <- (fun (x,_,_,_,_) -> x) d
                            tweetCacheD <- d
                            tweetCacheChoice <- 0
                            let newD = (fun (a,b,c,x,e) -> 
                                let (z,a) = (Array.item tweetCacheChoice tweetCache)
                                (z,a,b,c,x,e)) tweetCacheD
                            tweetCacheChoice <- tweetCacheChoice + 1
                            processSuccessMobile outputUI newD
                        | Reponse.Failure d ->
                            tweetCache <- Array.empty<string*(string option)>
                            tweetCacheD <- (Array.empty<string*(string option)>,None,None,None,None)
                            tweetCacheChoice <- 0
                            usernamePairCache <- ("","")
                            processFailureMobile outputUI d

                    else
                        usernamePairCache <- (x,y)
                        let newD = (fun (a,b,c,x,e) -> 
                            let (z,a) = (Array.item tweetCacheChoice tweetCache)
                            (z,a,b,c,x,e)) tweetCacheD
                        tweetCacheChoice <- tweetCacheChoice + 1
                        processSuccessMobile outputUI newD                
                }
                |> Async.Start)
            |> Piglet.Render (fun x y submit ->
                    Div [       
                            userSelectionUIMobile 1 x
                            userSelectionUIMobile 2 y
                            Div [
                                Div [
                                    (Controls.Submit submit) -< [Attr.Class "btn go-button col-xs-12"; Attr.NewAttr "Value" "Go!"; Attr.Id "go-button"]
                                    ] -< [Attr.Class "input-group col-xs-12"]
                                ] -< [Attr.Class "form-group form-group-mobile"]
                        ] -< [Attr.Class "form form-horizontal form-mobile"]
                    )

        Div [
            userInputUI
            renderOutputUIMobile outputUI
        ] -< [Attr.Class "container tweet-mobile-ui"]

