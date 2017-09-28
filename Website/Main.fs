namespace Website

open WebSharper
open WebSharper.Sitelets
open Tweetinvi
open WebSharper.UI.Next
open WebSharper.UI.Next.Server
open WebSharper.UI.Next.Templating
open WebSharper.UI.Next.Notation
open WebSharper.UI.Next.Html
open Twitter

type EndPoint =
    | [<EndPoint "/">] Home
    | [<Query("authorization_id", "oauth_token","oauth_verifier")>] Login of authorization_id : string * oauth_token : string * oauth_verifier : string
    | [<Query("authorization_id", "denied")>] Denied of authorization_id : string * denied : string

type SiteContent = {
    Tabs: Doc seq
    TabContents: Doc seq
}



module Templating =
    
    type MainPage = Template<"Main.html">
    type MobilePage = Template<"Mobile.html">
    type AboutPage = Template<"About.html">
    let mobilePage ctx siteContent : Async<Content<EndPoint>> =
        MobilePage().Tabs(siteContent.Tabs).TabContents(siteContent.TabContents).Doc()
        |> Content.Page

    let desktopPage ctx siteContent : Async<Content<EndPoint>> =
        MainPage().Tabs(siteContent.Tabs).TabContents(siteContent.TabContents).Doc()
        |> Content.Page



module Site =
    Tweetinvi.Auth.ApplicationCredentials <- getAppCredentials()

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
            [
            divAttr [Attr.Create "role" "tabpanel"; attr.``class`` (if not isAuthenticated then "tab-pane active" else "tab-pane"); attr.id "preset"]
                    preset
            divAttr [Attr.Create "role" "tabpanel"; attr.``class`` (if isAuthenticated then "tab-pane active" else "tab-pane"); attr.id "tryit"]
                    tryIt
            divAttr [Attr.Create "role" "tabpanel"; attr.``class`` "tab-pane"; attr.id "about"]
                    [Templating.AboutPage().Doc()]
            ]
            |> Seq.map (fun x-> x:>Doc)

    
    let tabs isMobile isAuthenticated = 
        if isMobile then
            makeTabs "Popular combos" "Try your own"  "About" isAuthenticated
        else
            makeTabs "Pick from popular combinations" "Or make your own!"  "About Tweet mashup!" isAuthenticated

    let tabContents (isMobile: bool) (login: string option) (loginUrl: string option)  = 
        let localPairCombos = getPairComboUsers()
        let isAuthenticated = Option.isNone loginUrl
        makeTabContents 
            [client <@ Client.preset isMobile login localPairCombos @>]
            [client <@ Client.tryIt isMobile login loginUrl @>] 
            isAuthenticated

    

    let homePage (isMobile:bool) (ctx:Context<EndPoint>) =
        let login = ctx.UserSession.GetLoggedInUser() |> Async.RunSynchronously
        match login with
            | Some l ->
                Analytics.writeView l System.DateTimeOffset.Now 
                |> Async.Start
            | None -> ()
        let (isAuthenticated,loginUrl) = 
            match login with
            | Some l ->
                let isAuthenticated = Option.isSome (getCredentials l)
                if not isAuthenticated then (false,Some (initAuthentication l)) else (true,None)
            | None -> (false,None)
        let localPairCombos = getPairComboUsers()
        {Tabs = tabs isMobile isAuthenticated; TabContents = tabContents isMobile login loginUrl}
        |> (if isMobile then Templating.mobilePage else Templating.desktopPage) ctx
        


        
        


    [<Website>]
    let Main =
        Application.MultiPage (fun (ctx: Context<EndPoint>) endpoint ->
            let context = ctx.Environment.Item("HttpContext") :?> System.Web.HttpContextWrapper
            let triedLogin = ctx.UserSession.GetLoggedInUser() |> Async.RunSynchronously
            let isMobile = context.Request.Browser.IsMobileDevice
            match endpoint with
            | EndPoint.Home -> 
                match triedLogin  with
                | Some login -> ()
                | None -> 
                    let loginFunction (login:string) = ctx.UserSession.LoginUser(login,true)
                    Async.RunSynchronously (loginFunction (System.Guid.NewGuid().ToString()))
                homePage isMobile ctx
            | EndPoint.Denied (authorization_id, denied) -> 
                match triedLogin with
                | Some login -> ()
                | None -> ctx.UserSession.LoginUser (System.Guid.NewGuid().ToString(),true) |> Async.RunSynchronously
                homePage isMobile ctx
            | EndPoint.Login (authorization_id, oauth_token,oauth_verifier) -> 
                match triedLogin with
                | Some login ->
                    finishAuthentication oauth_verifier login
                    |> ignore
                | None -> ()
                Content.RedirectPermanentToUrl (ctx.Link EndPoint.Home)
        )
