namespace Website

open WebSharper
open WebSharper.Sitelets
open Tweetinvi
open WebSharper.UI.Next
open WebSharper.UI.Next.Server
open WebSharper.UI.Next.Templating
open WebSharper.UI.Next.Html
open Twitter

type EndPoint =
    | [<EndPoint "/">] Home
    | [<Query("authorization_id", "oauth_token","oauth_verifier")>] Login of authorization_id : string * oauth_token : string * oauth_verifier : string

type SiteContent = {
    Tabs: Doc seq
    TabContents: Doc seq
}



module Templating =

    type MainPage = Template<"Main.html">
    type MobilePage = Template<"Mobile.html">
    type AboutPage = Template<"About.html">
    let mobilePage ctx siteContent : Async<Content<EndPoint>> =
        MobilePage.Doc(Tabs = siteContent.Tabs, TabContents = siteContent.TabContents)
        |> Content.Page

    let desktopPage ctx siteContent : Async<Content<EndPoint>> =
        MainPage.Doc(Tabs = siteContent.Tabs, TabContents = siteContent.TabContents)
        |> Content.Page



module Site =
    Tweetinvi.Auth.ApplicationCredentials <- getAppCredentials()
    let getPairCombos() = 
        System.Web.HttpContext.Current.Request.PhysicalApplicationPath + @"Content/AccountPairs.json"
        |> System.IO.File.ReadAllText
        |> (fun x -> Newtonsoft.Json.JsonConvert.DeserializeObject<(string*string) seq> (x))
        |> Seq.map
            (fun pair -> 
                async {
                    return match (
                                    getTweetsAndUserInfo (Some Tweetinvi.Auth.ApplicationCredentials) (fst pair),
                                    getTweetsAndUserInfo (Some Tweetinvi.Auth.ApplicationCredentials) (snd pair)) with
                            | (Some ux, Some uy) -> Some (ux.User, uy.User)
                            | _ -> None
                    }
            )
        |> Async.Parallel
        |> Async.RunSynchronously
        |> Seq.ofArray
        |> Seq.choose id
        |> Array.ofSeq

    let makeTabs presetName tryItName aboutName (isAuthenticated: bool) =
        seq [
            liAttr [Attr.Create "role" "presentation"; attr.``class`` (if not isAuthenticated then "active" else "")]
                    [aAttr [attr.href "#preset"; Attr.Create "aria-controls" "preset"; Attr.Create "role" "tab"; Attr.Create "data-toggle" "tab"]
                            [text presetName]]
            liAttr [Attr.Create "role" "presentation"; attr.``class`` (if isAuthenticated then "active" else "")]
                    [aAttr [attr.href "#tryit"; Attr.Create "aria-controls" "preset"; Attr.Create "role" "tab"; Attr.Create "data-toggle" "tab"]
                            [text tryItName]]
            liAttr [Attr.Create "role" "presentation"]
                    [aAttr [attr.href "#about"; Attr.Create "aria-controls" "preset"; Attr.Create "role" "tab"; Attr.Create "data-toggle" "tab"]
                            [text aboutName]]
            ]
            |> Seq.map (fun x -> x :> Doc)

    let makeTabContents preset tryIt (isAuthenticated: bool)=
        seq [
            divAttr [attr.``class`` "tab-content"]
                    [
                    divAttr [Attr.Create "role" "tabpanel"; attr.``class`` (if not isAuthenticated then "tab-pane active" else "tab-pane"); attr.id "preset"]
                            preset
                    divAttr [Attr.Create "role" "tabpanel"; attr.``class`` (if isAuthenticated then "tab-pane active" else "tab-pane"); attr.id "tryit"]
                            tryIt
                    divAttr [Attr.Create "role" "tabpanel"; attr.``class`` "tab-pane"; attr.id "about"]
                            [(Templating.AboutPage.Doc())]
                    ]
               ]
            |> Seq.map (fun x -> x :> Doc)

    
    let tabs isMobile isAuthenticated = 
        if isMobile then
            makeTabs "Popular combos" "Try your own"  "About" isAuthenticated
        else
            makeTabs "Pick from popular combinations" "Or make your own!"  "About Tweet mashup!" isAuthenticated

    let tabContents (isMobile: bool) (cs:CredentialSet)  = 
        let localPairCombos = getPairCombos()
        let isAuthenticated = match cs with | CredentialSet.Login c -> true | _ -> false
        makeTabContents 
            [client <@ Client.preset isMobile localPairCombos @>]
            [client <@ Client.tryIt isMobile cs @>] 
            isAuthenticated

    
    let ctxToCredentialSet (ctx:Context<EndPoint>) =
            match ctx.UserSession.GetLoggedInUser() |> Async.RunSynchronously with
            | Some login -> 
                match getCredentials login with
                | Some credentials -> CredentialSet.Login login
                | _ ->  CredentialSet.LoginUrl (initAuthentication login)
            | None -> CredentialError

    let homePage (isMobile:bool) (ctx:Context<EndPoint>) =
        let localPairCombos = getPairCombos()
        let cs = ctxToCredentialSet ctx
        let isAuthenticated = match cs with | CredentialSet.Login c -> true | _ -> false
        Templating.desktopPage ctx {Tabs = tabs isMobile isAuthenticated; TabContents = tabContents isMobile cs}


        
        


    [<Website>]
    let Main =
        Application.MultiPage (fun ctx endpoint ->
            let context = ctx.Environment.["HttpContext"] :?> System.Web.HttpContextWrapper
            match endpoint with
            | EndPoint.Home -> 
                let isMobile = context.Request.Browser.IsMobileDevice
                match ctx.UserSession.GetLoggedInUser() |> Async.RunSynchronously with
                | Some login -> ()
                | None -> ctx.UserSession.LoginUser (System.Guid.NewGuid().ToString(),true) |> Async.RunSynchronously
                homePage isMobile ctx
            | EndPoint.Login (authorization_id, oauth_token,oauth_verifier) -> 
                match ctx.UserSession.GetLoggedInUser() |> Async.RunSynchronously with
                | Some login ->
                    finishAuthentication oauth_verifier login
                    |> ignore
                | None -> ()
                Content.RedirectPermanentToUrl (ctx.Link EndPoint.Home)
        )
