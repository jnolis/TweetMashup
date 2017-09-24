(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Website,Client,List,T,UI,Next,Doc,AttrProxy,Arrays,Var,Concurrency,Remoting,AjaxRemotingProvider,Var1,View1,AttrModule,String;
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
     attrs=[AttrProxy.Create("class","output-ui-mobile")];
     return Doc.Concat([Doc.Element("div",attrs,[Doc.TextNode("\n\u0009"),Doc.Element("div",[AttrProxy.Create("class","col-xs-12")],[Doc.TextNode("\n\u0009\u0009"),Doc.Element("h5",[AttrProxy.Create("class","text-center tweet-text-mobile")],Arrays.ofSeq(Text)),Doc.TextNode("\u0009\u0009\n\u0009")]),Doc.TextNode("\n")])]);
    },
    buildOutputUIFailureWeb:function(message)
    {
     var Text,attrs;
     Text=List.ofArray([Doc.TextNode(message)]);
     attrs=[AttrProxy.Create("class","output-ui")];
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
     attrs=[AttrProxy.Create("class","output-ui-mobile")];
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
     attrs=[AttrProxy.Create("class","output-ui")];
     attrs1=[AttrProxy.Create("class","row")];
     return Doc.Concat([Doc.Element("div",attrs,[Doc.TextNode("\n\u0009"),Doc.Element("div",attrs1,[Doc.TextNode(" \n\u0009\u0009"),Doc.Element("div",[AttrProxy.Create("class","col-md-4 col-lg-4 left-name hidden-sm hidden-xs")],[Doc.TextNode("\n\u0009\u0009\u0009"),Doc.Element("h4",[],Arrays.ofSeq(User1FullName)),Doc.TextNode("\n\u0009\u0009\u0009"),Doc.Element("h5",[],Arrays.ofSeq(User1Username)),Doc.TextNode("\n\u0009\u0009")]),Doc.TextNode("\n\u0009\u0009"),Doc.Element("div",[AttrProxy.Create("class","overlapping-images col-md-4 col-lg-4")],Arrays.ofSeq(Images)),Doc.TextNode("\n\u0009\u0009"),Doc.Element("div",[AttrProxy.Create("class","col-md-4 col-lg-4 right-name hidden-sm hidden-xs")],[Doc.TextNode("\n\u0009\u0009\u0009"),Doc.Element("h4",[],Arrays.ofSeq(User2FullName)),Doc.TextNode("\n\u0009\u0009\u0009"),Doc.Element("h5",[],Arrays.ofSeq(User2Username)),Doc.TextNode("\n\u0009\u0009")]),Doc.TextNode("\n\u0009")]),Doc.TextNode("\n\u0009"),Doc.Element("div",[AttrProxy.Create("class","row")],[Doc.TextNode("\n\u0009\u0009"),Doc.Element("h3",[AttrProxy.Create("class","text-center")],[Doc.TextNode(" TweetMashup.com presents:")]),Doc.TextNode("\n\u0009")]),Doc.TextNode("\n\u0009"),Doc.Element("div",[AttrProxy.Create("class","row")],[Doc.TextNode("\n\u0009\u0009"),Doc.Element("p",[AttrProxy.Create("class","tweet-text text-center")],Arrays.ofSeq(Text)),Doc.TextNode("\n\u0009")]),Doc.TextNode("\n\u0009"),Doc.Element("div",[AttrProxy.Create("class","text-center row")],Arrays.ofSeq(Link)),Doc.TextNode("\n")])]);
    },
    emptyUser:Runtime.Field(function()
    {
     return{
      Username:"",
      FullName:"",
      Image:"",
      FollowerCount:0,
      FollowingCount:0
     };
    }),
    preset:function(isMobile,loginOption,userPairs)
    {
     var tweetCache,tweetCacheUser1,tweetCacheUser2,tweetCacheChoice,outputUIData,pairUI,outputUIView;
     tweetCache=[[]];
     tweetCacheUser1=[Client.emptyUser()];
     tweetCacheUser2=[Client.emptyUser()];
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
       Concurrency.Start(Concurrency.Delay(function()
       {
        return Concurrency.Bind(AjaxRemotingProvider.Async("Website:1",[isMobile,loginOption,user1.Username,user2.Username]),function()
        {
         return Concurrency.Return(null);
        });
       }),{
        $:0
       });
       return Concurrency.Start(Concurrency.Delay(function()
       {
        var x,resultValue1,index1;
        if((tweetCacheChoice[0]>=tweetCache[0].length?true:user1.Username!==tweetCacheUser1[0].Username)?true:user2.Username!==tweetCacheUser2[0].Username)
         {
          x=AjaxRemotingProvider.Async("Website:0",[{
           $:0
          },user1.Username,user2.Username]);
          return Concurrency.Bind(x,function(_arg3)
          {
           var d,d1,resultValue,index;
           if(_arg3.$==1)
            {
             d=_arg3.$0;
             tweetCache[0]=[];
             tweetCacheUser1[0]=Client.emptyUser();
             tweetCacheUser2[0]=Client.emptyUser();
             Var1.Set(outputUIData,{
              $:1,
              $0:d
             });
             return Concurrency.Return(null);
            }
           else
            {
             d1=_arg3.$0;
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
             Var1.Set(outputUIData,{
              $:0,
              $0:resultValue
             });
             return Concurrency.Return(null);
            }
          });
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
          Var1.Set(outputUIData,{
           $:0,
           $0:resultValue1
          });
          return Concurrency.Return(null);
         }
       }),{
        $:0
       });
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
    tryIt:function(isMobile,loginOption,loginUrlOption)
    {
     var matchValue,_,_1,l,login,tweetCache,tweetCacheUser1,tweetCacheUser2,tweetCacheChoice,outputUIData,user1,user2,user1Input,user2Input,onSubmit,inputUI,_4,ats,arg20,ats1,outputUIView,_5,l1,arg201,arg202;
     matchValue=[loginOption,loginUrlOption];
     if(matchValue[0].$==1)
      {
       if(matchValue[1].$==1)
        {
         l=matchValue[1].$0;
         _1=Client.tryItDummyUI(isMobile,l);
        }
       else
        {
         login=matchValue[0].$0;
         tweetCache=[[]];
         tweetCacheUser1=[Client.emptyUser()];
         tweetCacheUser2=[Client.emptyUser()];
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
          var arg00,arg001;
          arg00=Concurrency.Delay(function()
          {
           return Concurrency.Bind(AjaxRemotingProvider.Async("Website:1",[isMobile,loginOption,Var.Get(user1),Var.Get(user2)]),function()
           {
            return Concurrency.Return(null);
           });
          });
          Concurrency.Start(arg00,{
           $:0
          });
          arg001=Concurrency.Delay(function()
          {
           var _2,x,resultValue1,index1;
           if((tweetCacheChoice[0]>=tweetCache[0].length?true:Var.Get(user1)!==tweetCacheUser1[0].Username)?true:Var.Get(user2)!==tweetCacheUser2[0].Username)
            {
             x=AjaxRemotingProvider.Async("Website:0",[{
              $:1,
              $0:login
             },Var.Get(user1),Var.Get(user2)]);
             _2=Concurrency.Bind(x,function(_arg2)
             {
              var _3,d,d1,resultValue,index;
              if(_arg2.$==1)
               {
                d=_arg2.$0;
                tweetCache[0]=[];
                tweetCacheUser1[0]=Client.emptyUser();
                tweetCacheUser2[0]=Client.emptyUser();
                Var1.Set(outputUIData,{
                 $:1,
                 $0:d
                });
                _3=Concurrency.Return(null);
               }
              else
               {
                d1=_arg2.$0;
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
                Var1.Set(outputUIData,{
                 $:0,
                 $0:resultValue
                });
                _3=Concurrency.Return(null);
               }
              return _3;
             });
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
             Var1.Set(outputUIData,{
              $:0,
              $0:resultValue1
             });
             _2=Concurrency.Return(null);
            }
           return _2;
          });
          return Concurrency.Start(arg001,{
           $:0
          });
         };
         if(!isMobile)
          {
           ats=List.ofArray([AttrProxy.Create("class","form form-inline")]);
           arg20=List.ofArray([Doc.TextNode("&")]);
           _4=Doc.Element("div",ats,List.ofArray([Client.userSelectionUI(false,1,user1),Doc.Element("div",List.ofArray([AttrModule.Class("form-group")]),List.ofArray([Doc.Element("h1",[],arg20)])),Client.userSelectionUI(false,2,user2),Doc.Element("div",List.ofArray([AttrProxy.Create("class","form-group")]),List.ofArray([Doc.Element("div",List.ofArray([AttrProxy.Create("class","input-group col-md-10")]),List.ofArray([Doc.ButtonView("Go!",List.ofArray([AttrProxy.Create("class","btn go-button btn-lg"),AttrProxy.Create("value","Go!")]),View1.Const(null),onSubmit)]))]))]));
          }
         else
          {
           ats1=List.ofArray([AttrProxy.Create("class","form form-horizontal form-mobile")]);
           _4=Doc.Element("div",ats1,List.ofArray([Client.userSelectionUI(true,1,user1),Client.userSelectionUI(true,2,user2),Doc.Element("div",List.ofArray([AttrProxy.Create("class","form-group form-group-mobile")]),List.ofArray([Doc.Element("div",List.ofArray([AttrProxy.Create("class","input-group col-xs-12")]),List.ofArray([Doc.ButtonView("Go!",List.ofArray([AttrProxy.Create("class","btn go-button col-xs-12"),AttrProxy.Create("value","Go!")]),View1.Const(null),onSubmit)]))]))]));
          }
         inputUI=_4;
         outputUIView=outputUIData.get_View();
         _1=Doc.Element("div",List.ofArray([AttrProxy.Create("class",isMobile?"container tweet-mobile-ui preset-container":"container preset-container")]),List.ofArray([inputUI,Doc.BindView(function(r)
         {
          return Client.buildOutputUI(isMobile,r);
         },outputUIView)]));
        }
       _=_1;
      }
     else
      {
       if(matchValue[1].$==1)
        {
         l1=matchValue[1].$0;
         _5=Client.tryItDummyUI(isMobile,l1);
        }
       else
        {
         arg202=List.ofArray([Doc.TextNode("Error with credentials, try refreshing browser")]);
         arg201=List.ofArray([Doc.Element("h5",[],arg202)]);
         _5=Doc.Element("div",[],arg201);
        }
       _=_5;
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
  Concurrency=Runtime.Safe(Global.WebSharper.Concurrency);
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
  Var1=Runtime.Safe(Next.Var1);
  View1=Runtime.Safe(Next.View1);
  AttrModule=Runtime.Safe(Next.AttrModule);
  return String=Runtime.Safe(Global.String);
 });
 Runtime.OnLoad(function()
 {
  Client.emptyUser();
  return;
 });
}());
