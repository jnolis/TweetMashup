namespace Website
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.UI.Next.Templating
open WebSharper.UI.Next.Notation
open WebSharper

type NamesUI =
    | DesktopNames of Elt*Elt
    | MobileNames of Elt

type ResultValue = {
    Combined: Combined
    User1: SmallUser
    User2: SmallUser

}

type OutputUIWeb = Template<"OutputUIWeb.html">
type OutputUIMobile = Template<"OutputUIMobile.html">
type OutputUIFailureWeb = Template<"OutputUIFailureWeb.html">
type OutputUIFailureMobile = Template<"OutputUIFailureMobile.html">
type PresetUIWeb = Template<"PresetUIWeb.html">
type PresetUIMobile = Template<"PresetUIMobile.html">

type ResultSuccess = 
    | Success of ResultValue
    | Failure of string
    | NotStarted

[<JavaScript>]
module Client =
    open WebSharper.UI.Next.Client.Doc
    open System.Security.Policy
    let emptyUser = {SmallUser.FullName = ""; SmallUser.Username = ""; SmallUser.Image = ""; FollowerCount = 0; FollowingCount = 0}
    let buildOutputUIWeb (result:ResultValue) =
        OutputUIWeb.OutputUIWeb()
                            .User1FullName([text result.User1.FullName])
                            .User1Username([text ("@" + result.User1.Username)])
                            .Images([
                                        imgAttr [attr.``class`` "img-circle img-left"; attr.width "128"; attr.height "128"; attr.src result.User1.Image] [] :> Doc
                                        imgAttr [attr.``class`` "img-circle img-right"; attr.width "128"; attr.height "128"; attr.src result.User2.Image] [] :> Doc
                                    ])
                            .User2FullName([text result.User2.FullName])
                            .User2Username([text ("@" + result.User2.Username)])
                            .Text([text result.Combined.Tweet])
                            .Link([
                                    aAttr [attr.``class`` "btn btn-lg twitter-button"; 
                                           attr.href ("https://twitter.com/intent/tweet?text=" + result.Combined.TweetWithContext); 
                                           attr.target "_blank"] 
                                          [
                                            iAttr [attr.``class`` "fa fa-twitter wow bounceIn"] [] 
                                            spanAttr [attr.``class`` "label"] [text "Tweet this!"] 
                                            ]  :> Doc
                                   ])
                            .Elt()

    let buildOutputUIMobile (result:ResultValue) =
        OutputUIMobile.OutputUIMobile()
                            .Images(
                                    [
                                        imgAttr [attr.``class`` "img-circle img-left-small"; attr.width "96"; attr.height "96"; attr.src result.User1.Image] [] :> Doc
                                        imgAttr [attr.``class`` "img-circle img-right-small"; attr.width "96"; attr.height "96"; attr.src result.User2.Image] [] :> Doc
                                    ])
                            .Usernames([text (result.User1.FullName + " & " + result.User2.FullName)])
                            .Text([text result.Combined.Tweet])
                            .Link(
                                [aAttr 
                                    [attr.``class`` "btn btn-lg twitter-button";
                                     attr.href ("https://twitter.com/intent/tweet?text=" + result.Combined.TweetWithContext);
                                     attr.target "_blank"]
                                    [
                                        iAttr [attr.``class`` "fa fa-twitter wow bounceIn"] []
                                        spanAttr [attr.``class`` "label"] [text "Tweet this!"] 
                                        ] :> Doc
                                        ])
                            .Elt()


    let buildOutputUIFailureWeb (message: string) = 
        OutputUIFailureWeb.OutputUIFailureWeb().Text([text message]).Elt()

    let buildOutputUIFailureMobile (message: string) = 
        OutputUIFailureMobile.OutputUIFailureMobile().Text([text message]).Elt()

    let buildOutputUI (isMobile:bool) (r:ResultSuccess) =
        match (isMobile,r) with
        | (false,Success r) -> buildOutputUIWeb r
        | (false,Failure m) -> buildOutputUIFailureWeb m
        | (true,Success r) -> buildOutputUIMobile r
        | (true,Failure m) -> buildOutputUIFailureMobile m
        | (_,NotStarted) -> div []


    let tryItDummyUI (isMobile: bool) (loginUrl:string)=
        let dummyUserSelectionUI (isMobile:bool) (i:int) = 
            divAttr [attr.``class`` (if not isMobile then "form-group" else "form-group form-group-mobile")] [
                labelAttr [attr.``class`` "sr-only"; attr.``for`` ("username" + i.ToString())] [text ("Username " + i.ToString())]
                divAttr [attr.``class`` (if not isMobile then "input-group input-group-lg col-md-10" else "input-group col-xs-12")]
                    [
                    spanAttr [attr.``class`` "input-group-addon"; attr.id ("username" + i.ToString())] [text "@"]
                    inputAttr
                        [attr.value ""; 
                            attr.``type`` "text"; 
                            attr.``class`` "form-control";
                            attr.``disabled`` "";
                            attr.placeholder "username"; 
                            Attr.Create "aria-describedby" ("username" + i.ToString()) ]
                        []
                    ]
                ]
        if not isMobile then
            divAttr [attr.``class`` "form form-inline"] [       
                (dummyUserSelectionUI isMobile 1)
                divAttr [Attr.Class "form-group"] [h1 [text "&"] ]
                (dummyUserSelectionUI isMobile 2)
                divAttr [attr.``class`` "form-group"] [
                    aAttr [attr.``class`` "btn btn-lg twitter-button"; attr.href loginUrl] [
                        iAttr [attr.``class`` "fa fa-twitter wow bounceIn"] [];
                                        spanAttr [attr.``class`` "label"] [text "Authorize to make your own!"]
                                        ]
                        ]
                ]
        else
            divAttr [attr.``class`` "form form-horizontal form-mobile"] [       
                (dummyUserSelectionUI isMobile 1)
                (dummyUserSelectionUI isMobile 2)
                divAttr [attr.``class`` "form-group-mobile"] [
                    aAttr [attr.``class`` "btn btn-lg twitter-button"; attr.href loginUrl] [
                        iAttr [attr.``class`` "fa fa-twitter wow bounceIn"] [];
                                        spanAttr [attr.``class`` "label"] [text "Authorize to make your own!"]
                                        ]
                        ]
                ]

    let userSelectionUI (isMobile: bool) (i:int) (x: Var<string>) = 

        divAttr [attr.``class`` "form-group form-group-mobile"] 
            [
            labelAttr [attr.``class`` "sr-only"; attr.``for`` ("username" + i.ToString())] [text ("Username " + i.ToString())]
            divAttr [attr.``class`` (if not isMobile then "input-group input-group-lg col-md-10" else "input-group col-xs-12")]
                [
                spanAttr [attr.``class`` "input-group-addon"; attr.id ("username" + i.ToString())] [text "@"]
                Doc.Input
                    [attr.value ""; 
                            attr.``type`` "text"; 
                            attr.``class`` "form-control";
                            attr.placeholder "username"; 
                            Attr.Create "aria-describedby" ("username" + i.ToString()) ]
                    x
                ]
            ]

    
    let tryIt (isMobile: bool) (loginOption: string option) (loginUrlOption: string option) =
        match (loginOption,loginUrlOption) with
        | (None,None) ->
            div [h5 [text "Error with credentials, try refreshing browser"]]
        | (_,Some l) ->
            tryItDummyUI isMobile l
        | (Some login,_) ->
            let mutable tweetCache = Array.empty<Combined>
            let mutable tweetCacheUser1 = emptyUser
            let mutable tweetCacheUser2 = emptyUser
            let mutable tweetCacheChoice = 0
            let outputUIData = Var.Create NotStarted
            let user1 = Var.Create ""
            let user2 = Var.Create ""
            let user1Input = userSelectionUI isMobile 1 user1
            let user2Input = userSelectionUI isMobile 1 user2
            let onSubmit () = 
                async {
                let mutable tempResult = Failure ""
                let user1StoredValue = user1.Value
                let user2StoredValue = user2.Value
                
                if tweetCacheChoice >= Array.length tweetCache || 
                    user1StoredValue <> tweetCacheUser1.Username || 
                    user2StoredValue <> tweetCacheUser2.Username then
                    let! mashup =  
                        Server.makeMashup (Some login) user1.Value user2.Value
                        
                    match mashup with
                    | Reponse.Success d ->
                        tweetCache <- d.Combined
                        tweetCacheUser1 <- d.User1
                        tweetCacheUser2 <- d.User2
                        tweetCacheChoice <- 0
                        let resultValue = {ResultValue.Combined = (Array.item tweetCacheChoice tweetCache); User1 = d.User1; User2 = d.User2}
                        tweetCacheChoice <- tweetCacheChoice + 1
                        outputUIData.Value <- Success resultValue
                        tempResult <- Success resultValue
                    | Reponse.Failure d ->
                        tweetCache <- Array.empty<Combined>
                        tweetCacheUser1 <- emptyUser
                        tweetCacheUser2 <- emptyUser
                        outputUIData.Value <- Failure d
                        tempResult <- Failure d
                else
                    let resultValue = {ResultValue.Combined = (Array.item tweetCacheChoice tweetCache); User1 = tweetCacheUser1; User2 = tweetCacheUser2}
                    tweetCacheChoice <- tweetCacheChoice + 1
                    outputUIData.Value <- Success resultValue
                    tempResult <- Success resultValue
                do! Server.logMashup isMobile loginOption user1StoredValue user2StoredValue (match tempResult with | Success s -> Some s.Combined.Tweet | _ -> None)
                }
                |> Microsoft.FSharp.Control.Async.Start
            let inputUI =
                if not isMobile then
                    divAttr [attr.``class`` "form form-inline"] [       
                                    userSelectionUI false 1 user1
                                    divAttr [Attr.Class "form-group"] [h1 [text "&"] ]
                                    userSelectionUI false 2 user2
                                    divAttr [attr.``class`` "form-group"] [
                                        divAttr [attr.``class`` "input-group col-md-10"] [
                                            ButtonView "Go!" [attr.``class`` "btn go-button btn-lg"; attr.value "Go!"] (View.Const()) onSubmit
                                            ]
                                        ] 
                                ] :> Doc
                else
                    divAttr  [attr.``class`` "form form-horizontal form-mobile"] [       
                                    userSelectionUI true 1 user1
                                    userSelectionUI true 2 user2
                                    divAttr [attr.``class`` "form-group form-group-mobile"] [
                                        divAttr [attr.``class`` "input-group col-xs-12"] [
                                            ButtonView "Go!" [attr.``class`` "btn go-button col-xs-12"; attr.value "Go!"] (View.Const()) onSubmit
                                            ]
                                        ]
                                ] :> Doc
            let outputUIView = View.FromVar outputUIData
        
            divAttr [attr.``class`` (if isMobile then "container tweet-mobile-ui preset-container" else "container preset-container")]
                [
                inputUI
                Doc.BindView (buildOutputUI isMobile) outputUIView
                ] 

    let preset (isMobile: bool) (loginOption: string option) (userPairs : (SmallUser*SmallUser) []) = 
        let mutable tweetCache = Array.empty<Combined>
        let mutable tweetCacheUser1 = emptyUser
        let mutable tweetCacheUser2 = emptyUser
        let mutable tweetCacheChoice = 0
        let outputUIData = Var.Create NotStarted
        let pairUI ((user1,user2) : SmallUser*SmallUser) =
            let onSubmit () = 
                async {
                let mutable tempResult = Failure ""
                if tweetCacheChoice >= Array.length tweetCache || user1.Username <> tweetCacheUser1.Username || user2.Username <> tweetCacheUser2.Username then
                    let! mashup =  Server.makeMashup None user1.Username user2.Username
                    match mashup with
                    | Reponse.Success d ->
                        tweetCache <- d.Combined
                        tweetCacheUser1 <- d.User1
                        tweetCacheUser2 <- d.User2
                        tweetCacheChoice <- 0
                        let resultValue = {ResultValue.Combined = (Array.item tweetCacheChoice tweetCache); User1 = user1; User2 = user2}
                        tweetCacheChoice <- tweetCacheChoice + 1
                        outputUIData.Value <- Success resultValue
                        tempResult <- Success resultValue
                    | Reponse.Failure d ->
                        tweetCache <- Array.empty<Combined>
                        tweetCacheUser1 <- emptyUser
                        tweetCacheUser2 <- emptyUser
                        outputUIData.Value <- Failure d
                        tempResult <- Failure d
                else
                    let resultValue = {ResultValue.Combined = (Array.item tweetCacheChoice tweetCache); User1 = tweetCacheUser1; User2 = tweetCacheUser2}
                    tweetCacheChoice <- tweetCacheChoice + 1
                    outputUIData.Value <- Success resultValue
                    tempResult <- Success resultValue
                do! Server.logMashup isMobile loginOption user1.Username user2.Username (match tempResult with | Success s -> Some s.Combined.Tweet | _ -> None)
                } |> Microsoft.FSharp.Control.Async.Start
            if isMobile then
                PresetUIMobile.PresetUIMobile().GoButton(
                    [ButtonView (user1.FullName + " & " + user2.FullName) [attr.``class`` "btn go-button col-xs-12"; attr.value "Go!"] (View.Const()) onSubmit :> Doc] ).Doc()
            else 
                PresetUIWeb.PresetUIWeb().Images([
                                                    imgAttr [attr.src user1.Image; attr.``class`` "img-circle img-left-small"; attr.width "96"; attr.height "96"] [] :> Doc
                                                    imgAttr [attr.src user2.Image; attr.``class`` "img-circle img-right-small"; attr.width "96"; attr.height "96"] [] :> Doc
                                                    ])
                                .GoButton([ButtonView "Go!" [attr.``class`` "btn go-button btn-lg"; attr.value "Go!"] (View.Const()) onSubmit :> Doc])
                                .Usernames([text (user1.FullName + " & " + user2.FullName)])
                                .Doc()
                        
        let outputUIView = View.FromVar outputUIData
        
        divAttr [attr.``class`` (if isMobile then "container tweet-mobile-ui" else "container")]
            [
            divAttr (if isMobile then [] else [attr.``class`` "row"]) (userPairs |> Array.map pairUI); 
            Doc.BindView (buildOutputUI isMobile) outputUIView
            ] 
        :> Doc
   