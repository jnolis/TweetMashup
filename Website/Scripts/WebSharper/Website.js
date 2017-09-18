(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Website,Client,List,T,UI,Next,Doc,AttrProxy,Arrays,Var,Remoting,AjaxRemotingProvider,Var1,View1,AttrModule,String;
 Runtime.Define(Global,{
  Website:{
   Client:{
    buildOutputUI:function(isMobile,r)
    {
     var matchValue,_,_1,m,arg20,r1,_2,m1,arg201,r2;
     matchValue=[isMobile,r];
     if(matchValue[0])
      {
       if(matchValue[1].$==1)
        {
         m=matchValue[1].$0;
         _1=Client.buildOutputUIFailureMobile(m);
        }
       else
        {
         if(matchValue[1].$==2)
          {
           arg20=Runtime.New(T,{
            $:0
           });
           _1=Doc.Element("div",[],arg20);
          }
         else
          {
           r1=matchValue[1].$0;
           _1=Client.buildOutputUIMobile(r1);
          }
        }
       _=_1;
      }
     else
      {
       if(matchValue[1].$==1)
        {
         m1=matchValue[1].$0;
         _2=Client.buildOutputUIFailureWeb(m1);
        }
       else
        {
         if(matchValue[1].$==2)
          {
           arg201=Runtime.New(T,{
            $:0
           });
           _2=Doc.Element("div",[],arg201);
          }
         else
          {
           r2=matchValue[1].$0;
           _2=Client.buildOutputUIWeb(r2);
          }
        }
       _=_2;
      }
     return _;
    },
    buildOutputUIFailureMobile:function(message)
    {
     var Text,attrs;
     Text=List.ofArray([Doc.TextNode(message)]);
     attrs=[];
     return Doc.Concat([Doc.Element("div",attrs,[Doc.TextNode("\n\u0009"),Doc.Element("div",[AttrProxy.Create("class","col-xs-12")],[Doc.TextNode("\n\u0009\u0009"),Doc.Element("h5",[AttrProxy.Create("class","text-center tweet-text-mobile")],Arrays.ofSeq(Text)),Doc.TextNode("\u0009\u0009\n\u0009")]),Doc.TextNode("\n")])]);
    },
    buildOutputUIFailureWeb:function(message)
    {
     var Text,attrs;
     Text=List.ofArray([Doc.TextNode(message)]);
     attrs=[];
     return Doc.Concat([Doc.Element("div",attrs,[Doc.TextNode("\n\u0009"),Doc.Element("div",[AttrProxy.Create("class","row")],[Doc.TextNode("\n\u0009\u0009"),Doc.Element("p",[AttrProxy.Create("class","tweet-text text-center")],Arrays.ofSeq(Text)),Doc.TextNode("\n\u0009")]),Doc.TextNode("\n")])]);
    },
    buildOutputUIMobile:function(result)
    {
     var Images,Usernames,Text,Link,attrs,attrs1;
     Images=List.ofArray([Doc.Element("img",List.ofArray([AttrProxy.Create("class","img-circle img-left-small"),AttrProxy.Create("width","96"),AttrProxy.Create("height","96"),AttrProxy.Create("src",result.User1.Image)]),Runtime.New(T,{
      $:0
     })),Doc.Element("img",List.ofArray([AttrProxy.Create("class","img-circle img-right-small"),AttrProxy.Create("width","96"),AttrProxy.Create("height","96"),AttrProxy.Create("src",result.User2.Image)]),Runtime.New(T,{
      $:0
     }))]);
     Usernames=List.ofArray([Doc.TextNode(result.User1.FullName+" & "+result.User2.FullName)]);
     Text=List.ofArray([Doc.TextNode(result.Combined.Tweet)]);
     Link=List.ofArray([Doc.Element("a",List.ofArray([AttrProxy.Create("class","btn btn-lg twitter-button"),AttrProxy.Create("href","https://twitter.com/intent/tweet?text="+result.Combined.TweetWithContext),AttrProxy.Create("target","_blank")]),List.ofArray([Doc.Element("i",List.ofArray([AttrProxy.Create("class","fa fa-twitter wow bounceIn")]),Runtime.New(T,{
      $:0
     })),Doc.Element("span",List.ofArray([AttrProxy.Create("class","label")]),List.ofArray([Doc.TextNode("Tweet this!")]))]))]);
     attrs=[];
     attrs1=[AttrProxy.Create("class","col-xs-12")];
     return Doc.Concat([Doc.Element("div",attrs,[Doc.TextNode("\n\u0009"),Doc.Element("div",attrs1,[Doc.TextNode("\n        "),Doc.Element("div",[AttrProxy.Create("class","col-xs-12")],[Doc.TextNode("\n                        "),Doc.Element("div",[AttrProxy.Create("class","overlapping-images-small")],Arrays.ofSeq(Images)),Doc.TextNode("\n\u0009\u0009")]),Doc.TextNode("\n        "),Doc.Element("div",[AttrProxy.Create("class","text-center")],[Doc.TextNode("\n\u0009\u0009\u0009"),Doc.Element("h6",[AttrProxy.Create("class","text-center")],Arrays.ofSeq(Usernames)),Doc.TextNode("\n\u0009\u0009")]),Doc.TextNode("\n    ")]),Doc.TextNode("\n\u0009"),Doc.Element("div",[AttrProxy.Create("class","col-xs-12")],[Doc.TextNode("\n\u0009\u0009"),Doc.Element("h6",[AttrProxy.Create("class","text-center")],[Doc.TextNode("TweetMashup.com Presents:")]),Doc.TextNode("\n\u0009")]),Doc.TextNode("\n\u0009"),Doc.Element("div",[AttrProxy.Create("class","col-xs-12")],[Doc.TextNode("\n\u0009\u0009"),Doc.Element("h5",[AttrProxy.Create("class","text-center tweet-text-mobile")],Arrays.ofSeq(Text)),Doc.TextNode("\u0009\u0009\u0009\n\u0009")]),Doc.TextNode("\n\u0009"),Doc.Element("div",[AttrProxy.Create("class","text-center col-xs-12")],Arrays.ofSeq(Link)),Doc.TextNode("\n")])]);
    },
    buildOutputUIWeb:function(result)
    {
     var User1FullName,User1Username,Images,User2FullName,User2Username,Text,Link,attrs,attrs1;
     User1FullName=List.ofArray([Doc.TextNode(result.User1.FullName)]);
     User1Username=List.ofArray([Doc.TextNode("@"+result.User1.Username)]);
     Images=List.ofArray([Doc.Element("img",List.ofArray([AttrProxy.Create("class","img-circle img-left"),AttrProxy.Create("width","128"),AttrProxy.Create("height","128"),AttrProxy.Create("src",result.User1.Image)]),Runtime.New(T,{
      $:0
     })),Doc.Element("img",List.ofArray([AttrProxy.Create("class","img-circle img-right"),AttrProxy.Create("width","128"),AttrProxy.Create("height","128"),AttrProxy.Create("src",result.User2.Image)]),Runtime.New(T,{
      $:0
     }))]);
     User2FullName=List.ofArray([Doc.TextNode(result.User2.FullName)]);
     User2Username=List.ofArray([Doc.TextNode("@"+result.User2.Username)]);
     Text=List.ofArray([Doc.TextNode(result.Combined.Tweet)]);
     Link=List.ofArray([Doc.Element("a",List.ofArray([AttrProxy.Create("class","btn btn-lg twitter-button"),AttrProxy.Create("href","https://twitter.com/intent/tweet?text="+result.Combined.TweetWithContext),AttrProxy.Create("target","_blank")]),List.ofArray([Doc.Element("i",List.ofArray([AttrProxy.Create("class","fa fa-twitter wow bounceIn")]),Runtime.New(T,{
      $:0
     })),Doc.Element("span",List.ofArray([AttrProxy.Create("class","label")]),List.ofArray([Doc.TextNode("Tweet this!")]))]))]);
     attrs=[];
     attrs1=[AttrProxy.Create("class","row")];
     return Doc.Concat([Doc.Element("div",attrs,[Doc.TextNode("\n\u0009"),Doc.Element("div",attrs1,[Doc.TextNode(" \n\u0009\u0009"),Doc.Element("div",[AttrProxy.Create("class","col-md-4 col-lg-4 left-name hidden-sm hidden-xs")],[Doc.TextNode("\n\u0009\u0009\u0009"),Doc.Element("h4",[],Arrays.ofSeq(User1FullName)),Doc.TextNode("\n\u0009\u0009\u0009"),Doc.Element("h5",[],Arrays.ofSeq(User1Username)),Doc.TextNode("\n\u0009\u0009")]),Doc.TextNode("\n\u0009\u0009"),Doc.Element("div",[AttrProxy.Create("class","overlapping-images col-md-4 col-lg-4")],Arrays.ofSeq(Images)),Doc.TextNode("\n\u0009\u0009"),Doc.Element("div",[AttrProxy.Create("class","col-md-4 col-lg-4 right-name hidden-sm hidden-xs")],[Doc.TextNode("\n\u0009\u0009\u0009"),Doc.Element("h4",[],Arrays.ofSeq(User2FullName)),Doc.TextNode("\n\u0009\u0009\u0009"),Doc.Element("h5",[],Arrays.ofSeq(User2Username)),Doc.TextNode("\n\u0009\u0009")]),Doc.TextNode("\n\u0009")]),Doc.TextNode("\n\u0009"),Doc.Element("div",[AttrProxy.Create("class","row")],[Doc.TextNode("\n\u0009\u0009"),Doc.Element("h3",[AttrProxy.Create("class","text-center")],[Doc.TextNode(" TweetMashup.com presents:")]),Doc.TextNode("\n\u0009")]),Doc.TextNode("\n\u0009"),Doc.Element("div",[AttrProxy.Create("class","row")],[Doc.TextNode("\n\u0009\u0009"),Doc.Element("p",[AttrProxy.Create("class","tweet-text text-center")],Arrays.ofSeq(Text)),Doc.TextNode("\n\u0009")]),Doc.TextNode("\n\u0009"),Doc.Element("div",[AttrProxy.Create("class","text-center row")],Arrays.ofSeq(Link)),Doc.TextNode("\n")])]);
    },
    preset:function(isMobile,userPairs)
    {
     var tweetCache,tweetCacheUser1,tweetCacheUser2,tweetCacheChoice,outputUIData,pairUI,outputUIView;
     tweetCache=[[]];
     tweetCacheUser1=[{
      Username:"",
      FullName:"",
      Image:""
     }];
     tweetCacheUser2=[{
      Username:"",
      FullName:"",
      Image:""
     }];
     tweetCacheChoice=[0];
     outputUIData=Var.Create({
      $:2
     });
     pairUI=function(_arg1)
     {
      var user2,user1,onSubmit,GoButton,Images,GoButton1,Usernames,attrs,attrs1;
      user2=_arg1[1];
      user1=_arg1[0];
      onSubmit=function()
      {
       var mashup,d,d1,resultValue,index,resultValue1,index1;
       if((tweetCacheChoice[0]>=tweetCache[0].length?true:user1.Username!==tweetCacheUser1[0].Username)?true:user2.Username!==tweetCacheUser2[0].Username)
        {
         mashup=AjaxRemotingProvider.Sync("Website:0",[{
          $:2
         },user1.Username,user2.Username]);
         if(mashup.$==1)
          {
           d=mashup.$0;
           tweetCache[0]=[];
           tweetCacheUser1[0]={
            Username:"",
            FullName:"",
            Image:""
           };
           tweetCacheUser2[0]={
            Username:"",
            FullName:"",
            Image:""
           };
           return Var1.Set(outputUIData,{
            $:1,
            $0:d
           });
          }
         else
          {
           d1=mashup.$0;
           tweetCache[0]=d1.Combined;
           tweetCacheUser1[0]=d1.User1;
           tweetCacheUser2[0]=d1.User2;
           tweetCacheChoice[0]=0;
           index=tweetCacheChoice[0];
           resultValue={
            Combined:Arrays.get(tweetCache[0],index),
            User1:user1,
            User2:user2
           };
           tweetCacheChoice[0]=tweetCacheChoice[0]+1;
           return Var1.Set(outputUIData,{
            $:0,
            $0:resultValue
           });
          }
        }
       else
        {
         index1=tweetCacheChoice[0];
         resultValue1={
          Combined:Arrays.get(tweetCache[0],index1),
          User1:tweetCacheUser1[0],
          User2:tweetCacheUser2[0]
         };
         tweetCacheChoice[0]=tweetCacheChoice[0]+1;
         return Var1.Set(outputUIData,{
          $:0,
          $0:resultValue1
         });
        }
      };
      if(isMobile)
       {
        GoButton=List.ofArray([Doc.ButtonView(user1.FullName+" & "+user2.FullName,List.ofArray([AttrProxy.Create("class","btn go-button col-xs-12"),AttrProxy.Create("value","Go!")]),View1.Const(null),onSubmit)]);
        return Doc.Concat([Doc.Element("div",[AttrProxy.Create("class","form form-horizontal form-mobile preset-container")],[Doc.TextNode("\n\u0009"),Doc.Element("div",[AttrProxy.Create("class","form-group form-group-mobile")],[Doc.TextNode("\n\u0009\u0009"),Doc.Element("div",[AttrProxy.Create("class","input-group col-xs-12")],Arrays.ofSeq(GoButton)),Doc.TextNode("\n\u0009")]),Doc.TextNode("\n")])]);
       }
      else
       {
        Images=List.ofArray([Doc.Element("img",List.ofArray([AttrProxy.Create("src",user1.Image),AttrProxy.Create("class","img-circle img-left-small"),AttrProxy.Create("width","96"),AttrProxy.Create("height","96")]),Runtime.New(T,{
         $:0
        })),Doc.Element("img",List.ofArray([AttrProxy.Create("src",user2.Image),AttrProxy.Create("class","img-circle img-right-small"),AttrProxy.Create("width","96"),AttrProxy.Create("height","96")]),Runtime.New(T,{
         $:0
        }))]);
        GoButton1=List.ofArray([Doc.ButtonView("Go!",List.ofArray([AttrProxy.Create("class","btn go-button btn-lg"),AttrProxy.Create("value","Go!")]),View1.Const(null),onSubmit)]);
        Usernames=List.ofArray([Doc.TextNode(user1.FullName+" & "+user2.FullName)]);
        attrs=[AttrProxy.Create("class","col-sm-6 col-md-4 preset-container")];
        attrs1=[AttrProxy.Create("class","row")];
        return Doc.Concat([Doc.Element("div",attrs,[Doc.TextNode("\n    "),Doc.Element("div",attrs1,[Doc.TextNode("                           \n\u0009\u0009"),Doc.Element("div",[AttrProxy.Create("class","overlapping-images-small col-xs-6 col-md-8")],Arrays.ofSeq(Images)),Doc.TextNode("\n\u0009\u0009"),Doc.Element("div",[AttrProxy.Create("class","form form-inline col-xs-6 col-md-4")],[Doc.TextNode("\n\u0009\u0009\u0009"),Doc.Element("div",[AttrProxy.Create("class","form-group")],[Doc.TextNode("\n\u0009\u0009\u0009\u0009"),Doc.Element("div",[AttrProxy.Create("class","input-group")],Arrays.ofSeq(GoButton1)),Doc.TextNode("\n\u0009\u0009\u0009")]),Doc.TextNode("\n\u0009\u0009")]),Doc.TextNode("\n\u0009")]),Doc.TextNode("\n\u0009"),Doc.Element("div",[AttrProxy.Create("class","row text-center")],[Doc.TextNode("\n\u0009\u0009"),Doc.Element("h4",[],Arrays.ofSeq(Usernames)),Doc.TextNode("\n\u0009")]),Doc.TextNode("\n")])]);
       }
     };
     outputUIView=outputUIData.get_View();
     return Doc.Element("div",List.ofArray([AttrProxy.Create("class",isMobile?"container tweet-mobile-ui":"container")]),List.ofArray([Doc.Element("div",isMobile?Runtime.New(T,{
      $:0
     }):List.ofArray([AttrProxy.Create("class","row")]),Arrays.map(pairUI,userPairs)),Doc.BindView(function(r)
     {
      return Client.buildOutputUI(isMobile,r);
     },outputUIView)]));
    },
    tryIt:function(isMobile,credentialSet)
    {
     var _,arg20,arg201,credentials,tweetCache,tweetCacheUser1,tweetCacheUser2,tweetCacheChoice,outputUIData,user1,user2,user1Input,user2Input,onSubmit,inputUI,_3,ats,arg202,ats1,outputUIView,l;
     if(credentialSet.$==2)
      {
       arg201=List.ofArray([Doc.TextNode("Error with credentials, try refreshing browser")]);
       arg20=List.ofArray([Doc.Element("h5",[],arg201)]);
       _=Doc.Element("div",[],arg20);
      }
     else
      {
       if(credentialSet.$==0)
        {
         credentials=credentialSet.$0;
         tweetCache=[[]];
         tweetCacheUser1=[{
          Username:"",
          FullName:"",
          Image:""
         }];
         tweetCacheUser2=[{
          Username:"",
          FullName:"",
          Image:""
         }];
         tweetCacheChoice=[0];
         outputUIData=Var.Create({
          $:2
         });
         user1=Var.Create("");
         user2=Var.Create("");
         user1Input=Client.userSelectionUI(isMobile,1,user1);
         user2Input=Client.userSelectionUI(isMobile,1,user2);
         onSubmit=function()
         {
          var _1,mashup,_2,d,d1,resultValue,index,resultValue1,index1;
          if((tweetCacheChoice[0]>=tweetCache[0].length?true:Var.Get(user1)!==tweetCacheUser1[0].Username)?true:Var.Get(user2)!==tweetCacheUser2[0].Username)
           {
            mashup=AjaxRemotingProvider.Sync("Website:0",[{
             $:2
            },Var.Get(user1),Var.Get(user2)]);
            if(mashup.$==1)
             {
              d=mashup.$0;
              tweetCache[0]=[];
              tweetCacheUser1[0]={
               Username:"",
               FullName:"",
               Image:""
              };
              tweetCacheUser2[0]={
               Username:"",
               FullName:"",
               Image:""
              };
              _2=Var1.Set(outputUIData,{
               $:1,
               $0:d
              });
             }
            else
             {
              d1=mashup.$0;
              tweetCache[0]=d1.Combined;
              tweetCacheUser1[0]=d1.User1;
              tweetCacheUser2[0]=d1.User2;
              tweetCacheChoice[0]=0;
              index=tweetCacheChoice[0];
              resultValue={
               Combined:Arrays.get(tweetCache[0],index),
               User1:d1.User1,
               User2:d1.User2
              };
              tweetCacheChoice[0]=tweetCacheChoice[0]+1;
              _2=Var1.Set(outputUIData,{
               $:0,
               $0:resultValue
              });
             }
            _1=_2;
           }
          else
           {
            index1=tweetCacheChoice[0];
            resultValue1={
             Combined:Arrays.get(tweetCache[0],index1),
             User1:tweetCacheUser1[0],
             User2:tweetCacheUser2[0]
            };
            tweetCacheChoice[0]=tweetCacheChoice[0]+1;
            _1=Var1.Set(outputUIData,{
             $:0,
             $0:resultValue1
            });
           }
          return _1;
         };
         if(!isMobile)
          {
           ats=List.ofArray([AttrProxy.Create("class","form form-inline")]);
           arg202=List.ofArray([Doc.TextNode("&")]);
           _3=Doc.Element("div",ats,List.ofArray([Client.userSelectionUI(false,1,user1),Doc.Element("div",List.ofArray([AttrModule.Class("form-group")]),List.ofArray([Doc.Element("h1",[],arg202)])),Client.userSelectionUI(false,2,user2),Doc.Element("div",List.ofArray([AttrProxy.Create("class","form-group")]),List.ofArray([Doc.Element("div",List.ofArray([AttrProxy.Create("class","input-group col-md-10")]),List.ofArray([Doc.ButtonView("Go!",List.ofArray([AttrProxy.Create("class","btn go-button btn-lg"),AttrProxy.Create("value","Go!")]),View1.Const(null),onSubmit)]))]))]));
          }
         else
          {
           ats1=List.ofArray([AttrProxy.Create("class","form form-horizontal form-mobile")]);
           _3=Doc.Element("div",ats1,List.ofArray([Client.userSelectionUI(true,1,user1),Client.userSelectionUI(true,2,user2),Doc.Element("div",List.ofArray([AttrProxy.Create("class","form-group form-group-mobile")]),List.ofArray([Doc.Element("div",List.ofArray([AttrProxy.Create("class","input-group col-xs-12")]),List.ofArray([Doc.ButtonView("Go!",List.ofArray([AttrProxy.Create("class","btn go-button col-xs-12"),AttrProxy.Create("value","Go!")]),View1.Const(null),onSubmit)]))]))]));
          }
         inputUI=_3;
         outputUIView=outputUIData.get_View();
         _=Doc.Element("div",List.ofArray([AttrProxy.Create("class",isMobile?"container tweet-mobile-ui preset-container":"container preset-container")]),List.ofArray([inputUI,Doc.BindView(function(r)
         {
          return Client.buildOutputUI(isMobile,r);
         },outputUIView)]));
        }
       else
        {
         l=credentialSet.$0;
         _=Client.tryItDummyUI(isMobile,l);
        }
      }
     return _;
    },
    tryItDummyUI:function(isMobile,loginUrl)
    {
     var dummyUserSelectionUI,ats2,arg20,ats3;
     dummyUserSelectionUI=function(isMobile1,i)
     {
      var ats,ats1,arg10;
      ats=List.ofArray([AttrProxy.Create("class",!isMobile1?"form-group":"form-group form-group-mobile")]);
      ats1=List.ofArray([AttrProxy.Create("class",!isMobile1?"input-group input-group-lg col-md-10":"input-group col-xs-12")]);
      arg10="username"+String(i);
      return Doc.Element("div",ats,List.ofArray([Doc.Element("label",List.ofArray([AttrProxy.Create("class","sr-only"),AttrProxy.Create("for","username"+String(i))]),List.ofArray([Doc.TextNode("Username "+String(i))])),Doc.Element("div",ats1,List.ofArray([Doc.Element("span",List.ofArray([AttrProxy.Create("class","input-group-addon"),AttrProxy.Create("id","username"+String(i))]),List.ofArray([Doc.TextNode("@")])),Doc.Element("input",List.ofArray([AttrProxy.Create("value",""),AttrProxy.Create("type","text"),AttrProxy.Create("class","form-control"),AttrProxy.Create("disabled",""),AttrProxy.Create("placeholder","username"),AttrProxy.Create("aria-describedby",arg10)]),Runtime.New(T,{
       $:0
      }))]))]));
     };
     ats2=List.ofArray([AttrProxy.Create("class","form form-inline")]);
     arg20=List.ofArray([Doc.TextNode("&")]);
     ats3=List.ofArray([AttrProxy.Create("class","form-group")]);
     return Doc.Element("div",ats2,List.ofArray([dummyUserSelectionUI(isMobile,1),Doc.Element("div",List.ofArray([AttrProxy.Create("class","form-group")]),List.ofArray([Doc.Element("h1",[],arg20)])),dummyUserSelectionUI(isMobile,2),Doc.Element("div",ats3,List.ofArray([Doc.Element("a",List.ofArray([AttrProxy.Create("class","btn btn-lg twitter-button"),AttrProxy.Create("href",loginUrl)]),List.ofArray([Doc.Element("i",List.ofArray([AttrProxy.Create("class","fa fa-twitter wow bounceIn")]),Runtime.New(T,{
      $:0
     })),Doc.Element("span",List.ofArray([AttrProxy.Create("class","label")]),List.ofArray([Doc.TextNode("Authorize to  make your own!")]))]))]))]));
    },
    userSelectionUI:function(isMobile,i,x)
    {
     var ats,ats1,arg10;
     ats=List.ofArray([AttrProxy.Create("class","form-group form-group-mobile")]);
     ats1=List.ofArray([AttrProxy.Create("class",!isMobile?"input-group input-group-lg col-md-10":"input-group col-xs-12")]);
     arg10="username"+String(i);
     return Doc.Element("div",ats,List.ofArray([Doc.Element("label",List.ofArray([AttrProxy.Create("class","sr-only"),AttrProxy.Create("for","username"+String(i))]),List.ofArray([Doc.TextNode("Username "+String(i))])),Doc.Element("div",ats1,List.ofArray([Doc.Element("span",List.ofArray([AttrProxy.Create("class","input-group-addon"),AttrProxy.Create("id","username"+String(i))]),List.ofArray([Doc.TextNode("@")])),Doc.Input(List.ofArray([AttrProxy.Create("value",""),AttrProxy.Create("type","text"),AttrProxy.Create("class","form-control"),AttrProxy.Create("placeholder","username"),AttrProxy.Create("aria-describedby",arg10)]),x)]))]));
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  Website=Runtime.Safe(Global.Website);
  Client=Runtime.Safe(Website.Client);
  List=Runtime.Safe(Global.WebSharper.List);
  T=Runtime.Safe(List.T);
  UI=Runtime.Safe(Global.WebSharper.UI);
  Next=Runtime.Safe(UI.Next);
  Doc=Runtime.Safe(Next.Doc);
  AttrProxy=Runtime.Safe(Next.AttrProxy);
  Arrays=Runtime.Safe(Global.WebSharper.Arrays);
  Var=Runtime.Safe(Next.Var);
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
  Var1=Runtime.Safe(Next.Var1);
  View1=Runtime.Safe(Next.View1);
  AttrModule=Runtime.Safe(Next.AttrModule);
  return String=Runtime.Safe(Global.String);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());
