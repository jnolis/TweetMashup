(function()
{
 "use strict";
 var Global,Website,Client,SC$1,Website_Templates,WebSharper,Concurrency,Remoting,AjaxRemotingProvider,UI,Next,Var,Arrays,List,Doc,AttrProxy,View,AttrModule,$;
 Global=window;
 Website=Global.Website=Global.Website||{};
 Client=Website.Client=Website.Client||{};
 SC$1=Global.StartupCode$Website$Client=Global.StartupCode$Website$Client||{};
 Website_Templates=Global.Website_Templates=Global.Website_Templates||{};
 WebSharper=Global.WebSharper;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 Var=Next&&Next.Var;
 Arrays=WebSharper&&WebSharper.Arrays;
 List=WebSharper&&WebSharper.List;
 Doc=Next&&Next.Doc;
 AttrProxy=Next&&Next.AttrProxy;
 View=Next&&Next.View;
 AttrModule=Next&&Next.AttrModule;
 $=Global.jQuery;
 Client.preset=function(isMobile,login,userPairs)
 {
  var tweetCache,tweetCacheUser1,tweetCacheUser2,tweetCacheChoice,outputUIData;
  function pairUI(user1,user2)
  {
   var t,t$1;
   function onSubmit()
   {
    var b;
    Concurrency.Start((b=null,Concurrency.Delay(function()
    {
     var tempResult,resultValue;
     tempResult={
      $:1,
      $0:""
     };
     return Concurrency.Combine(tweetCacheChoice>=tweetCache.length||user1.Username!==tweetCacheUser1.Username||user2.Username!==tweetCacheUser2.Username?Concurrency.Bind((new AjaxRemotingProvider.New()).Async("Website:Website.Server.makeMashup:-436435442",[null,user1.Username,user2.Username]),function(a)
     {
      var d,d$1,resultValue$1;
      return a.$==1?(d=a.$0,(tweetCache=[],tweetCacheUser1=Client.emptyUser(),tweetCacheUser2=Client.emptyUser(),Var.Set(outputUIData,{
       $:1,
       $0:d
      }),tempResult={
       $:1,
       $0:d
      },Concurrency.Zero())):(d$1=a.$0,(tweetCache=d$1.Combined,tweetCacheUser1=d$1.User1,tweetCacheUser2=d$1.User2,tweetCacheChoice=0,resultValue$1={
       Combined:Arrays.get(tweetCache,tweetCacheChoice),
       User1:user1,
       User2:user2
      },tweetCacheChoice=tweetCacheChoice+1,Var.Set(outputUIData,{
       $:0,
       $0:resultValue$1
      }),tempResult={
       $:0,
       $0:resultValue$1
      },Concurrency.Zero()));
     }):(resultValue={
      Combined:Arrays.get(tweetCache,tweetCacheChoice),
      User1:tweetCacheUser1,
      User2:tweetCacheUser2
     },(tweetCacheChoice=tweetCacheChoice+1,Var.Set(outputUIData,{
      $:0,
      $0:resultValue
     }),tempResult={
      $:0,
      $0:resultValue
     },Concurrency.Zero())),Concurrency.Delay(function()
     {
      return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("Website:Website.Server.logMashup:463903631",[isMobile,{
       $:1,
       $0:login
      },user1.Username,user2.Username,tempResult.$==0?{
       $:1,
       $0:tempResult.$0.Combined.Tweet
      }:null]),function()
      {
       return Concurrency.Return(null);
      });
     }));
    })),null);
   }
   return isMobile?Website_Templates.presetuimobile(new List.T({
    $:1,
    $0:{
     $:0,
     $0:"gobutton",
     $1:Doc.Concat(List.ofArray([Doc.ButtonView(user1.FullName+" & "+user2.FullName,[AttrProxy.Create("class","btn go-button col-xs-12"),AttrProxy.Create("value","Go!")],View.Const(),onSubmit)]))
    },
    $1:List.T.Empty
   })):Website_Templates.presetuiweb((t=(t$1=new List.T({
    $:1,
    $0:{
     $:0,
     $0:"images",
     $1:Doc.Concat(List.ofArray([Doc.Element("img",[AttrProxy.Create("src",user1.Image),AttrProxy.Create("class","img-circle img-left-small"),AttrProxy.Create("width","96"),AttrProxy.Create("height","96")],[]),Doc.Element("img",[AttrProxy.Create("src",user2.Image),AttrProxy.Create("class","img-circle img-right-small"),AttrProxy.Create("width","96"),AttrProxy.Create("height","96")],[])]))
    },
    $1:List.T.Empty
   }),new List.T({
    $:1,
    $0:{
     $:0,
     $0:"gobutton",
     $1:Doc.Concat(List.ofArray([Doc.ButtonView("Go!",[AttrProxy.Create("class","btn go-button btn-lg"),AttrProxy.Create("value","Go!")],View.Const(),onSubmit)]))
    },
    $1:t$1
   })),new List.T({
    $:1,
    $0:{
     $:0,
     $0:"usernames",
     $1:Doc.Concat(List.ofArray([Doc.TextNode(user1.FullName+" & "+user2.FullName)]))
    },
    $1:t
   })));
  }
  tweetCache=[];
  tweetCacheUser1=Client.emptyUser();
  tweetCacheUser2=Client.emptyUser();
  tweetCacheChoice=0;
  outputUIData=Var.Create$1({
   $:2
  });
  return Doc.Element("div",[AttrProxy.Create("class",isMobile?"container tweet-mobile-ui":"container")],[Doc.Element("div",isMobile?List.T.Empty:List.ofArray([AttrProxy.Create("class","row")]),Arrays.map(function($1)
  {
   return pairUI($1[0],$1[1]);
  },userPairs)),Doc.BindView(function(r)
  {
   return Client.buildOutputUI(isMobile,r);
  },outputUIData.v)]);
 };
 Client.tryIt=function(isMobile,login,loginUrlOption)
 {
  var tweetCache,tweetCacheUser1,tweetCacheUser2,tweetCacheChoice,outputUIData,user1,user2,inputUI;
  function onSubmit()
  {
   var b;
   Concurrency.Start((b=null,Concurrency.Delay(function()
   {
    var tempResult,user1StoredValue,user2StoredValue,resultValue;
    tempResult={
     $:1,
     $0:""
    };
    user1StoredValue=user1.c;
    user2StoredValue=user2.c;
    return Concurrency.Combine(tweetCacheChoice>=tweetCache.length||user1StoredValue!==tweetCacheUser1.Username||user2StoredValue!==tweetCacheUser2.Username?Concurrency.Bind((new AjaxRemotingProvider.New()).Async("Website:Website.Server.makeMashup:-436435442",[{
     $:1,
     $0:login
    },user1.c,user2.c]),function(a)
    {
     var d,d$1,resultValue$1;
     return a.$==1?(d=a.$0,(tweetCache=[],tweetCacheUser1=Client.emptyUser(),tweetCacheUser2=Client.emptyUser(),Var.Set(outputUIData,{
      $:1,
      $0:d
     }),tempResult={
      $:1,
      $0:d
     },Concurrency.Zero())):(d$1=a.$0,(tweetCache=d$1.Combined,tweetCacheUser1=d$1.User1,tweetCacheUser2=d$1.User2,tweetCacheChoice=0,resultValue$1={
      Combined:Arrays.get(tweetCache,tweetCacheChoice),
      User1:d$1.User1,
      User2:d$1.User2
     },tweetCacheChoice=tweetCacheChoice+1,Var.Set(outputUIData,{
      $:0,
      $0:resultValue$1
     }),tempResult={
      $:0,
      $0:resultValue$1
     },Concurrency.Zero()));
    }):(resultValue={
     Combined:Arrays.get(tweetCache,tweetCacheChoice),
     User1:tweetCacheUser1,
     User2:tweetCacheUser2
    },(tweetCacheChoice=tweetCacheChoice+1,Var.Set(outputUIData,{
     $:0,
     $0:resultValue
    }),tempResult={
     $:0,
     $0:resultValue
    },Concurrency.Zero())),Concurrency.Delay(function()
    {
     return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("Website:Website.Server.logMashup:463903631",[isMobile,{
      $:1,
      $0:login
     },user1StoredValue,user2StoredValue,tempResult.$==0?{
      $:1,
      $0:tempResult.$0.Combined.Tweet
     }:null]),function()
     {
      return Concurrency.Return(null);
     });
    }));
   })),null);
  }
  return loginUrlOption==null?(tweetCache=[],tweetCacheUser1=Client.emptyUser(),tweetCacheUser2=Client.emptyUser(),tweetCacheChoice=0,outputUIData=Var.Create$1({
   $:2
  }),user1=Var.Create$1(""),user2=Var.Create$1(""),Client.userSelectionUI(isMobile,1,user1),Client.userSelectionUI(isMobile,1,user2),inputUI=!isMobile?Doc.Element("div",[AttrProxy.Create("class","form form-inline")],[Client.userSelectionUI(false,1,user1),Doc.Element("div",[AttrModule.Class("form-group")],[Doc.Element("h1",[],[Doc.TextNode("&")])]),Client.userSelectionUI(false,2,user2),Doc.Element("div",[AttrProxy.Create("class","form-group")],[Doc.Element("div",[AttrProxy.Create("class","input-group col-md-10")],[Doc.ButtonView("Go!",[AttrProxy.Create("class","btn go-button btn-lg"),AttrProxy.Create("value","Go!")],View.Const(),onSubmit)])])]):Doc.Element("div",[AttrProxy.Create("class","form form-horizontal form-mobile")],[Client.userSelectionUI(true,1,user1),Client.userSelectionUI(true,2,user2),Doc.Element("div",[AttrProxy.Create("class","form-group form-group-mobile")],[Doc.Element("div",[AttrProxy.Create("class","input-group col-xs-12")],[Doc.ButtonView("Go!",[AttrProxy.Create("class","btn go-button col-xs-12"),AttrProxy.Create("value","Go!")],View.Const(),onSubmit)])])]),Doc.Element("div",[AttrProxy.Create("class",isMobile?"container tweet-mobile-ui preset-container":"container preset-container")],[inputUI,Doc.BindView(function(r)
  {
   return Client.buildOutputUI(isMobile,r);
  },outputUIData.v)])):Client.tryItDummyUI(isMobile,loginUrlOption.$0);
 };
 Client.userSelectionUI=function(isMobile,i,x)
 {
  return Doc.Element("div",[AttrProxy.Create("class","form-group form-group-mobile")],[Doc.Element("label",[AttrProxy.Create("class","sr-only"),AttrProxy.Create("for","username"+Global.String(i))],[Doc.TextNode("Username "+Global.String(i))]),Doc.Element("div",[AttrProxy.Create("class",!isMobile?"input-group input-group-lg col-md-10":"input-group col-xs-12")],[Doc.Element("span",[AttrProxy.Create("class","input-group-addon"),AttrProxy.Create("id","username"+Global.String(i))],[Doc.TextNode("@")]),Doc.Input([AttrProxy.Create("value",""),AttrProxy.Create("type","text"),AttrProxy.Create("class","form-control"),AttrProxy.Create("placeholder","username"),AttrProxy.Create("aria-describedby","username"+Global.String(i))],x)])]);
 };
 Client.tryItDummyUI=function(isMobile,loginUrl)
 {
  function dummyUserSelectionUI(isMobile$1,i)
  {
   return Doc.Element("div",[AttrProxy.Create("class",!isMobile$1?"form-group":"form-group form-group-mobile")],[Doc.Element("label",[AttrProxy.Create("class","sr-only"),AttrProxy.Create("for","username"+Global.String(i))],[Doc.TextNode("Username "+Global.String(i))]),Doc.Element("div",[AttrProxy.Create("class",!isMobile$1?"input-group input-group-lg col-md-10":"input-group col-xs-12")],[Doc.Element("span",[AttrProxy.Create("class","input-group-addon"),AttrProxy.Create("id","username"+Global.String(i))],[Doc.TextNode("@")]),Doc.Element("input",[AttrProxy.Create("value",""),AttrProxy.Create("type","text"),AttrProxy.Create("class","form-control"),AttrProxy.Create("disabled",""),AttrProxy.Create("placeholder","username"),AttrProxy.Create("aria-describedby","username"+Global.String(i))],[])])]);
  }
  return!isMobile?Doc.Element("div",[AttrProxy.Create("class","form form-inline")],[dummyUserSelectionUI(isMobile,1),Doc.Element("div",[AttrModule.Class("form-group")],[Doc.Element("h1",[],[Doc.TextNode("&")])]),dummyUserSelectionUI(isMobile,2),Doc.Element("div",[AttrProxy.Create("class","form-group")],[Doc.Element("a",[AttrProxy.Create("class","btn btn-lg twitter-button"),AttrProxy.Create("href",loginUrl)],[Doc.Element("i",[AttrProxy.Create("class","fa fa-twitter wow bounceIn")],[]),Doc.Element("span",[AttrProxy.Create("class","label")],[Doc.TextNode("Authorize to make your own!")])])])]):Doc.Element("div",[AttrProxy.Create("class",isMobile?"container tweet-mobile-ui preset-container":"container preset-container")],[Doc.Element("div",[AttrProxy.Create("class",isMobile?"form form-horizontal form-mobile":"form form-horizontal")],[dummyUserSelectionUI(isMobile,1),dummyUserSelectionUI(isMobile,2),Doc.Element("div",[AttrProxy.Create("class",isMobile?"form-group form-group-mobile":"form-group")],[Doc.Element("a",[AttrProxy.Create("class","btn btn-lg twitter-button"),AttrProxy.Create("href",loginUrl)],[Doc.Element("i",[AttrProxy.Create("class","fa fa-twitter wow bounceIn")],[]),Doc.Element("span",[AttrProxy.Create("class","label")],[Doc.TextNode("Authorize to make your own!")])])])])]);
 };
 Client.buildOutputUI=function(isMobile,r)
 {
  var $1;
  switch(isMobile?r.$==1?3:r.$==2?4:2:r.$==1?1:r.$==2?4:0)
  {
   case 0:
    return Client.buildOutputUIWeb(r.$0);
    break;
   case 1:
    return Client.buildOutputUIFailureWeb(r.$0);
    break;
   case 2:
    return Client.buildOutputUIMobile(r.$0);
    break;
   case 3:
    return Client.buildOutputUIFailureMobile(r.$0);
    break;
   case 4:
    return Doc.Element("div",[],[]);
    break;
  }
 };
 Client.buildOutputUIFailureMobile=function(message)
 {
  return Website_Templates.outputuifailuremobile(new List.T({
   $:1,
   $0:{
    $:0,
    $0:"text",
    $1:Doc.Concat(List.ofArray([Doc.TextNode(message)]))
   },
   $1:List.T.Empty
  }));
 };
 Client.buildOutputUIFailureWeb=function(message)
 {
  return Website_Templates.outputuifailureweb(new List.T({
   $:1,
   $0:{
    $:0,
    $0:"text",
    $1:Doc.Concat(List.ofArray([Doc.TextNode(message)]))
   },
   $1:List.T.Empty
  }));
 };
 Client.buildOutputUIMobile=function(result)
 {
  var t,t$1,t$2;
  return Website_Templates.outputuimobile((t=(t$1=(t$2=new List.T({
   $:1,
   $0:{
    $:0,
    $0:"images",
    $1:Doc.Concat(List.ofArray([Doc.Element("img",[AttrProxy.Create("class","img-circle img-left-small"),AttrProxy.Create("width","96"),AttrProxy.Create("height","96"),AttrProxy.Create("src",result.User1.Image)],[]),Doc.Element("img",[AttrProxy.Create("class","img-circle img-right-small"),AttrProxy.Create("width","96"),AttrProxy.Create("height","96"),AttrProxy.Create("src",result.User2.Image)],[])]))
   },
   $1:List.T.Empty
  }),new List.T({
   $:1,
   $0:{
    $:0,
    $0:"usernames",
    $1:Doc.Concat(List.ofArray([Doc.TextNode(result.User1.FullName+" & "+result.User2.FullName)]))
   },
   $1:t$2
  })),new List.T({
   $:1,
   $0:{
    $:0,
    $0:"text",
    $1:Doc.Concat(List.ofArray([Doc.TextNode(result.Combined.Tweet)]))
   },
   $1:t$1
  })),new List.T({
   $:1,
   $0:{
    $:0,
    $0:"link",
    $1:Doc.Concat(List.ofArray([Doc.Element("a",[AttrProxy.Create("class","btn btn-lg twitter-button"),AttrProxy.Create("href","https://twitter.com/intent/tweet?text="+result.Combined.TweetWithContext),AttrProxy.Create("target","_blank")],[Doc.Element("i",[AttrProxy.Create("class","fa fa-twitter wow bounceIn")],[]),Doc.Element("span",[AttrProxy.Create("class","label")],[Doc.TextNode("Tweet this!")])])]))
   },
   $1:t
  })));
 };
 Client.buildOutputUIWeb=function(result)
 {
  var t,t$1,t$2,t$3;
  return Website_Templates.outputuiweb((t=(t$1=(t$2=(t$3=new List.T({
   $:1,
   $0:{
    $:0,
    $0:"user1fullname",
    $1:Doc.Concat(List.ofArray([Doc.TextNode(result.User1.FullName)]))
   },
   $1:List.T.Empty
  }),new List.T({
   $:1,
   $0:{
    $:0,
    $0:"images",
    $1:Doc.Concat(List.ofArray([Doc.Element("img",[AttrProxy.Create("class","img-circle img-left"),AttrProxy.Create("width","128"),AttrProxy.Create("height","128"),AttrProxy.Create("src",result.User1.Image)],[]),Doc.Element("img",[AttrProxy.Create("class","img-circle img-right"),AttrProxy.Create("width","128"),AttrProxy.Create("height","128"),AttrProxy.Create("src",result.User2.Image)],[])]))
   },
   $1:t$3
  })),new List.T({
   $:1,
   $0:{
    $:0,
    $0:"user2fullname",
    $1:Doc.Concat(List.ofArray([Doc.TextNode(result.User2.FullName)]))
   },
   $1:t$2
  })),new List.T({
   $:1,
   $0:{
    $:0,
    $0:"text",
    $1:Doc.Concat(List.ofArray([Doc.TextNode(result.Combined.Tweet)]))
   },
   $1:t$1
  })),new List.T({
   $:1,
   $0:{
    $:0,
    $0:"link",
    $1:Doc.Concat(List.ofArray([Doc.Element("a",[AttrProxy.Create("class","btn btn-lg twitter-button"),AttrProxy.Create("href","https://twitter.com/intent/tweet?text="+result.Combined.TweetWithContext),AttrProxy.Create("target","_blank")],[Doc.Element("i",[AttrProxy.Create("class","fa fa-twitter wow bounceIn")],[]),Doc.Element("span",[AttrProxy.Create("class","label")],[Doc.TextNode("Tweet this!")])])]))
   },
   $1:t
  })));
 };
 Client.emptyUser=function()
 {
  SC$1.$cctor();
  return SC$1.emptyUser;
 };
 SC$1.$cctor=function()
 {
  SC$1.$cctor=Global.ignore;
  SC$1.emptyUser={
   Username:"",
   FullName:"",
   Image:"",
   FollowerCount:0,
   FollowingCount:0
  };
 };
 Website_Templates.presetuimobile=function(h)
 {
  return h?Doc.GetOrLoadTemplate("presetuimobile",{
   $:1,
   $0:"presetuimobile"
  },function()
  {
   return $.parseHTML("<div class=\"form form-horizontal form-mobile preset-container-mobile\">\r\n\u0009<div class=\"form-group form-group-mobile\">\r\n\u0009\u0009<div class=\"input-group col-xs-12\" ws-hole=\"GoButton\">\r\n\u0009\u0009</div>\r\n\u0009</div>\r\n</div>");
  },h):Doc.PrepareTemplate("presetuimobile",{
   $:1,
   $0:"presetuimobile"
  },function()
  {
   return $.parseHTML("<div class=\"form form-horizontal form-mobile preset-container-mobile\">\r\n\u0009<div class=\"form-group form-group-mobile\">\r\n\u0009\u0009<div class=\"input-group col-xs-12\" ws-hole=\"GoButton\">\r\n\u0009\u0009</div>\r\n\u0009</div>\r\n</div>");
  });
 };
 Website_Templates.outputuifailuremobile=function(h)
 {
  return h?Doc.GetOrLoadTemplate("outputuifailuremobile",{
   $:1,
   $0:"outputuifailuremobile"
  },function()
  {
   return $.parseHTML("<div class=\"output-ui-mobile\">\r\n\u0009<div class=\"col-xs-12\">\r\n\u0009\u0009<h5 class=\"text-center tweet-text-mobile\" ws-hole=\"Text\"></h5>\u0009\u0009\r\n\u0009</div>\r\n</div>");
  },h):Doc.PrepareTemplate("outputuifailuremobile",{
   $:1,
   $0:"outputuifailuremobile"
  },function()
  {
   return $.parseHTML("<div class=\"output-ui-mobile\">\r\n\u0009<div class=\"col-xs-12\">\r\n\u0009\u0009<h5 class=\"text-center tweet-text-mobile\" ws-hole=\"Text\"></h5>\u0009\u0009\r\n\u0009</div>\r\n</div>");
  });
 };
 Website_Templates.outputuifailureweb=function(h)
 {
  return h?Doc.GetOrLoadTemplate("outputuifailureweb",{
   $:1,
   $0:"outputuifailureweb"
  },function()
  {
   return $.parseHTML("<div class=\"output-ui\">\r\n\u0009<div class=\"row\">\r\n\u0009\u0009<p class=\"tweet-text text-center\" ws-hole=\"Text\">\r\n\u0009</div>\r\n</div>");
  },h):Doc.PrepareTemplate("outputuifailureweb",{
   $:1,
   $0:"outputuifailureweb"
  },function()
  {
   return $.parseHTML("<div class=\"output-ui\">\r\n\u0009<div class=\"row\">\r\n\u0009\u0009<p class=\"tweet-text text-center\" ws-hole=\"Text\">\r\n\u0009</div>\r\n</div>");
  });
 };
 Website_Templates.outputuimobile=function(h)
 {
  return h?Doc.GetOrLoadTemplate("outputuimobile",{
   $:1,
   $0:"outputuimobile"
  },function()
  {
   return $.parseHTML("<div class=\"output-ui-mobile\">\r\n\u0009<div class=\"col-xs-12\">\r\n        <div class=\"col-xs-12\">\r\n                        <div class=\"overlapping-images-small\" ws-hole=\"Images\">\r\n\u0009\u0009\u0009\u0009\u0009\u0009</div>\r\n\u0009\u0009</div>\r\n        <div class=\"text-center\">\r\n\u0009\u0009\u0009<h6 class=\"text-center\" ws-hole=\"Usernames\">\r\n\u0009\u0009\u0009</h6>\r\n\u0009\u0009</div>\r\n    </div>\r\n\u0009<div class=\"col-xs-12\">\r\n\u0009\u0009<h6 class=\"text-center\">TweetMashup.com by <a href=\"https://nolisllc.com\" target=\"_blank\">Nolis, LLC</a></h6>\r\n\u0009</div>\r\n\u0009<div class=\"col-xs-12\">\r\n\u0009\u0009<h5 class=\"text-center tweet-text-mobile\" ws-hole=\"Text\"></h5>\u0009\u0009\u0009\r\n\u0009</div>\r\n\u0009<div class=\"text-center col-xs-12\" ws-hole=\"Link\">\r\n\u0009</div>\r\n</div>");
  },h):Doc.PrepareTemplate("outputuimobile",{
   $:1,
   $0:"outputuimobile"
  },function()
  {
   return $.parseHTML("<div class=\"output-ui-mobile\">\r\n\u0009<div class=\"col-xs-12\">\r\n        <div class=\"col-xs-12\">\r\n                        <div class=\"overlapping-images-small\" ws-hole=\"Images\">\r\n\u0009\u0009\u0009\u0009\u0009\u0009</div>\r\n\u0009\u0009</div>\r\n        <div class=\"text-center\">\r\n\u0009\u0009\u0009<h6 class=\"text-center\" ws-hole=\"Usernames\">\r\n\u0009\u0009\u0009</h6>\r\n\u0009\u0009</div>\r\n    </div>\r\n\u0009<div class=\"col-xs-12\">\r\n\u0009\u0009<h6 class=\"text-center\">TweetMashup.com by <a href=\"https://nolisllc.com\" target=\"_blank\">Nolis, LLC</a></h6>\r\n\u0009</div>\r\n\u0009<div class=\"col-xs-12\">\r\n\u0009\u0009<h5 class=\"text-center tweet-text-mobile\" ws-hole=\"Text\"></h5>\u0009\u0009\u0009\r\n\u0009</div>\r\n\u0009<div class=\"text-center col-xs-12\" ws-hole=\"Link\">\r\n\u0009</div>\r\n</div>");
  });
 };
 Website_Templates.outputuiweb=function(h)
 {
  return h?Doc.GetOrLoadTemplate("outputuiweb",{
   $:1,
   $0:"outputuiweb"
  },function()
  {
   return $.parseHTML("<div class=\"output-ui\">\r\n\u0009<div class=\"row\"> \r\n\u0009\u0009<div class=\"col-md-4 col-lg-4 left-name hidden-sm hidden-xs\">\r\n\u0009\u0009\u0009<h4 ws-hole=\"User1FullName\"></h4>\r\n\u0009\u0009</div>\r\n\u0009\u0009<div class=\"overlapping-images col-md-4 col-lg-4\" ws-hole=\"Images\">\r\n\u0009\u0009</div>\r\n\u0009\u0009<div class=\"col-md-4 col-lg-4 right-name hidden-sm hidden-xs\">\r\n\u0009\u0009\u0009<h4 ws-hole=\"User2FullName\"></h4>\r\n\u0009\u0009</div>\r\n\u0009</div>\r\n\u0009<div class=\"row\">\r\n        <h3 class=\"text-center\">TweetMashup.com by <a href=\"https://nolisllc.com\" target=\"_blank\">Nolis, LLC</a></h3>\r\n\u0009</div>\r\n\u0009<div class=\"row\">\r\n\u0009\u0009<p class=\"tweet-text text-center\" ws-hole=\"Text\">\r\n\u0009</div>\r\n\u0009<div class=\"text-center row\" ws-hole=\"Link\">\r\n\u0009</div>\r\n</div>");
  },h):Doc.PrepareTemplate("outputuiweb",{
   $:1,
   $0:"outputuiweb"
  },function()
  {
   return $.parseHTML("<div class=\"output-ui\">\r\n\u0009<div class=\"row\"> \r\n\u0009\u0009<div class=\"col-md-4 col-lg-4 left-name hidden-sm hidden-xs\">\r\n\u0009\u0009\u0009<h4 ws-hole=\"User1FullName\"></h4>\r\n\u0009\u0009</div>\r\n\u0009\u0009<div class=\"overlapping-images col-md-4 col-lg-4\" ws-hole=\"Images\">\r\n\u0009\u0009</div>\r\n\u0009\u0009<div class=\"col-md-4 col-lg-4 right-name hidden-sm hidden-xs\">\r\n\u0009\u0009\u0009<h4 ws-hole=\"User2FullName\"></h4>\r\n\u0009\u0009</div>\r\n\u0009</div>\r\n\u0009<div class=\"row\">\r\n        <h3 class=\"text-center\">TweetMashup.com by <a href=\"https://nolisllc.com\" target=\"_blank\">Nolis, LLC</a></h3>\r\n\u0009</div>\r\n\u0009<div class=\"row\">\r\n\u0009\u0009<p class=\"tweet-text text-center\" ws-hole=\"Text\">\r\n\u0009</div>\r\n\u0009<div class=\"text-center row\" ws-hole=\"Link\">\r\n\u0009</div>\r\n</div>");
  });
 };
 Website_Templates.presetuiweb=function(h)
 {
  return h?Doc.GetOrLoadTemplate("presetuiweb",{
   $:1,
   $0:"presetuiweb"
  },function()
  {
   return $.parseHTML("<div class=\"col-sm-6 col-md-4 preset-container\">\r\n    <div class=\"row\">                           \r\n\u0009\u0009<div class=\"overlapping-images-small col-xs-6 col-md-8\" ws-hole=\"Images\">\r\n\u0009\u0009</div>\r\n\u0009\u0009<div class=\"form form-inline col-xs-6 col-md-4\">\r\n\u0009\u0009\u0009<div class=\"form-group\">\r\n\u0009\u0009\u0009\u0009<div class=\"input-group\" ws-hole=\"GoButton\">\r\n\u0009\u0009\u0009\u0009</div>\r\n\u0009\u0009\u0009</div>\r\n\u0009\u0009</div>\r\n\u0009</div>\r\n\u0009<div class=\"row text-center\">\r\n\u0009\u0009<h4 ws-hole=\"Usernames\"></h4>\r\n\u0009</div>\r\n</div>");
  },h):Doc.PrepareTemplate("presetuiweb",{
   $:1,
   $0:"presetuiweb"
  },function()
  {
   return $.parseHTML("<div class=\"col-sm-6 col-md-4 preset-container\">\r\n    <div class=\"row\">                           \r\n\u0009\u0009<div class=\"overlapping-images-small col-xs-6 col-md-8\" ws-hole=\"Images\">\r\n\u0009\u0009</div>\r\n\u0009\u0009<div class=\"form form-inline col-xs-6 col-md-4\">\r\n\u0009\u0009\u0009<div class=\"form-group\">\r\n\u0009\u0009\u0009\u0009<div class=\"input-group\" ws-hole=\"GoButton\">\r\n\u0009\u0009\u0009\u0009</div>\r\n\u0009\u0009\u0009</div>\r\n\u0009\u0009</div>\r\n\u0009</div>\r\n\u0009<div class=\"row text-center\">\r\n\u0009\u0009<h4 ws-hole=\"Usernames\"></h4>\r\n\u0009</div>\r\n</div>");
  });
 };
}());
