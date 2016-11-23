(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,List,Html,Client,Attr,Tags,Operators,T,Website,Client1,Piglets,Piglet,Concurrency,Unchecked,Remoting,AjaxRemotingProvider,Arrays,Controls,Seq,Pervasives,String;
 Runtime.Define(Global,{
  Website:{
   Client:{
    buildOutputUIMobile:function()
    {
     var x,presents,output,arg10,x1,user1Image,x2,user2Image,tweetThisButton,arg101,arg102,arg103,arg104,usernames;
     x=List.ofArray([Attr.Attr().NewAttr("class","text-center")]);
     presents=Tags.Tags().NewTag("h6",x);
     arg10=Runtime.New(T,{
      $:0
     });
     output=Operators.add(Tags.Tags().NewTag("h5",arg10),List.ofArray([Attr.Attr().NewAttr("class","text-center tweet-text-mobile")]));
     x1=List.ofArray([Attr.Attr().NewAttr("class","img-circle img-left-small"),Attr.Attr().NewAttr("width","96"),Attr.Attr().NewAttr("height","96")]);
     user1Image=Tags.Tags().NewTag("img",x1);
     x2=List.ofArray([Attr.Attr().NewAttr("class","img-circle img-right-small"),Attr.Attr().NewAttr("width","96"),Attr.Attr().NewAttr("height","96")]);
     user2Image=Tags.Tags().NewTag("img",x2);
     arg102=List.ofArray([Attr.Attr().NewAttr("class","fa fa-twitter wow bounceIn")]);
     arg103=List.ofArray([Tags.Tags().text("Tweet this!")]);
     arg101=List.ofArray([Tags.Tags().NewTag("i",arg102),Operators.add(Tags.Tags().NewTag("span",arg103),List.ofArray([Attr.Attr().NewAttr("class","label")]))]);
     tweetThisButton=Operators.add(Tags.Tags().NewTag("a",arg101),List.ofArray([Attr.Attr().NewAttr("class","btn btn-lg twitter-button"),Attr.Attr().NewAttr("href","http://www.google.com"),Attr.Attr().NewAttr("style","display: none;"),Attr.Attr().NewAttr("target","_blank")]));
     arg104=List.ofArray([Attr.Attr().NewAttr("style","display: none;")]);
     usernames=Tags.Tags().NewTag("h6",arg104);
     return{
      TweetText:output,
      User1Image:user1Image,
      User2Image:user2Image,
      Presents:presents,
      Usernames:usernames,
      TweetThisButton:tweetThisButton
     };
    },
    buildOutputUIWeb:function()
    {
     var output,arg10,x,user1Image,x1,user2Image,tweetThisButton,arg101,arg102,arg103,x2,presents,arg104,user1Name,arg105,user2Name;
     arg10=Runtime.New(T,{
      $:0
     });
     output=Operators.add(Tags.Tags().NewTag("p",arg10),List.ofArray([Attr.Attr().NewAttr("class","tweet-text text-center")]));
     x=List.ofArray([Attr.Attr().NewAttr("class","img-circle img-left"),Attr.Attr().NewAttr("width","128"),Attr.Attr().NewAttr("height","128")]);
     user1Image=Tags.Tags().NewTag("img",x);
     x1=List.ofArray([Attr.Attr().NewAttr("class","img-circle img-right"),Attr.Attr().NewAttr("width","128"),Attr.Attr().NewAttr("height","128")]);
     user2Image=Tags.Tags().NewTag("img",x1);
     arg102=List.ofArray([Attr.Attr().NewAttr("class","fa fa-twitter wow bounceIn")]);
     arg103=List.ofArray([Tags.Tags().text("Tweet this!")]);
     arg101=List.ofArray([Tags.Tags().NewTag("i",arg102),Operators.add(Tags.Tags().NewTag("span",arg103),List.ofArray([Attr.Attr().NewAttr("class","label")]))]);
     tweetThisButton=Operators.add(Tags.Tags().NewTag("a",arg101),List.ofArray([Attr.Attr().NewAttr("class","btn btn-lg twitter-button"),Attr.Attr().NewAttr("href","http://www.google.com"),Attr.Attr().NewAttr("style","display: none;"),Attr.Attr().NewAttr("target","_blank")]));
     x2=List.ofArray([Attr.Attr().NewAttr("class","text-center")]);
     presents=Tags.Tags().NewTag("h3",x2);
     arg104=List.ofArray([Attr.Attr().NewAttr("style","display: none;")]);
     user1Name=Tags.Tags().NewTag("h4",arg104);
     arg105=List.ofArray([Attr.Attr().NewAttr("style","display: none;")]);
     user2Name=Tags.Tags().NewTag("h4",arg105);
     return{
      TweetText:output,
      User1Image:user1Image,
      User2Image:user2Image,
      Presents:presents,
      User1Name:user1Name,
      User2Name:user2Name,
      TweetThisButton:tweetThisButton
     };
    },
    preset:function(userPairs)
    {
     var outputUI,tweetCache,tweetCacheD,tweetCacheChoice,usernamePairCache,pairUI,arg10c,source,x6;
     outputUI=Client1.buildOutputUIWeb();
     tweetCache=[[]];
     tweetCacheD=[[[],{
      $:0
     },{
      $:0
     },{
      $:0
     },{
      $:0
     }]];
     tweetCacheChoice=[0];
     usernamePairCache=[["",""]];
     pairUI=function(userPair)
     {
      var user2,user1,_arg00_,x,action,x5,_arg00_1;
      user2=userPair[1];
      user1=userPair[0];
      _arg00_=Piglet.Return(null);
      x=Piglet.WithSubmit(_arg00_);
      action=function()
      {
       var arg00;
       arg00=Concurrency.Delay(function()
       {
        var _,x1,tupledArg1,a2,b1,c1,x4,e1,index1,patternInput1,z1,a3,newD1,_arg10_1,_arg11_1,_arg12_1,_arg13_1,_arg14_1,_arg15_1;
        if(tweetCacheChoice[0]>=tweetCache[0].length?true:!Unchecked.Equals([user1.Username,user2.Username],usernamePairCache[0]))
         {
          usernamePairCache[0]=[user1.Username,user2.Username];
          x1=AjaxRemotingProvider.Async("Website:0",[user1.Username,user2.Username]);
          _=Concurrency.Bind(x1,function(_arg1)
          {
           var _1,d,d1,x2,tupledArg,a,b,c,x3,e,index,patternInput,z,a1,newD,_arg10_,_arg11_,_arg12_,_arg13_,_arg14_,_arg15_;
           if(_arg1.$==1)
            {
             d=_arg1.$0;
             tweetCache[0]=[];
             tweetCacheD[0]=[[],{
              $:0
             },{
              $:0
             },{
              $:0
             },{
              $:0
             }];
             tweetCacheChoice[0]=0;
             usernamePairCache[0]=["",""];
             Client1.processFailureWeb(outputUI,d);
             _1=Concurrency.Return(null);
            }
           else
            {
             d1=_arg1.$0;
             x2=d1[0];
             d1[1];
             d1[2];
             d1[3];
             d1[4];
             tweetCache[0]=x2;
             tweetCacheD[0]=d1;
             tweetCacheChoice[0]=0;
             tupledArg=tweetCacheD[0];
             a=tupledArg[0];
             b=tupledArg[1];
             c=tupledArg[2];
             x3=tupledArg[3];
             e=tupledArg[4];
             index=tweetCacheChoice[0];
             patternInput=Arrays.get(tweetCache[0],index);
             z=patternInput[0];
             a1=patternInput[1];
             newD=[z,a1,b,c,x3,e];
             tweetCacheChoice[0]=tweetCacheChoice[0]+1;
             _arg10_=newD[0];
             _arg11_=newD[1];
             _arg12_=newD[2];
             _arg13_=newD[3];
             _arg14_=newD[4];
             _arg15_=newD[5];
             Client1.processSuccessWeb(outputUI,_arg10_,_arg11_,_arg12_,_arg13_,_arg14_,_arg15_);
             _1=Concurrency.Return(null);
            }
           return _1;
          });
         }
        else
         {
          usernamePairCache[0]=[user1.Username,user2.Username];
          tupledArg1=tweetCacheD[0];
          a2=tupledArg1[0];
          b1=tupledArg1[1];
          c1=tupledArg1[2];
          x4=tupledArg1[3];
          e1=tupledArg1[4];
          index1=tweetCacheChoice[0];
          patternInput1=Arrays.get(tweetCache[0],index1);
          z1=patternInput1[0];
          a3=patternInput1[1];
          newD1=[z1,a3,b1,c1,x4,e1];
          tweetCacheChoice[0]=tweetCacheChoice[0]+1;
          _arg10_1=newD1[0];
          _arg11_1=newD1[1];
          _arg12_1=newD1[2];
          _arg13_1=newD1[3];
          _arg14_1=newD1[4];
          _arg15_1=newD1[5];
          Client1.processSuccessWeb(outputUI,_arg10_1,_arg11_1,_arg12_1,_arg13_1,_arg14_1,_arg15_1);
          _=Concurrency.Return(null);
         }
        return _;
       });
       return Concurrency.Start(arg00,{
        $:0
       });
      };
      x5=Piglet.Run(action,x);
      _arg00_1=function(submit)
      {
       var arg10,arg101,arg102,arg103,arg104,arg105,arg106,arg107,arg108,arg109,arg10a,arg10b,x1;
       arg104=user1.Image;
       arg103=List.ofArray([Attr.Attr().NewAttr("src",arg104),Attr.Attr().NewAttr("class","img-circle img-left-small"),Attr.Attr().NewAttr("width","96"),Attr.Attr().NewAttr("height","96")]);
       arg106=user2.Image;
       arg105=List.ofArray([Attr.Attr().NewAttr("src",arg106),Attr.Attr().NewAttr("class","img-circle img-right-small"),Attr.Attr().NewAttr("width","96"),Attr.Attr().NewAttr("height","96")]);
       arg102=List.ofArray([Tags.Tags().NewTag("img",arg103),Tags.Tags().NewTag("img",arg105)]);
       arg109=List.ofArray([Operators.add(Controls.Submit(submit),List.ofArray([Attr.Attr().NewAttr("class","btn go-button btn-lg"),Attr.Attr().NewAttr("Value","Go!"),Attr.Attr().NewAttr("id","go-button")]))]);
       arg108=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg109),List.ofArray([Attr.Attr().NewAttr("class","input-group")]))]);
       arg107=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg108),List.ofArray([Attr.Attr().NewAttr("class","form-group")]))]);
       arg101=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg102),List.ofArray([Attr.Attr().NewAttr("class","overlapping-images-small col-xs-6 col-md-8")])),Operators.add(Tags.Tags().NewTag("div",arg107),List.ofArray([Attr.Attr().NewAttr("class","form form-inline col-xs-6 col-md-4")]))]);
       x1=user1.FullName+" & "+user2.FullName;
       arg10b=List.ofArray([Tags.Tags().text(x1)]);
       arg10a=List.ofArray([Tags.Tags().NewTag("h4",arg10b)]);
       arg10=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg101),List.ofArray([Attr.Attr().NewAttr("class","row")])),Operators.add(Tags.Tags().NewTag("div",arg10a),List.ofArray([Attr.Attr().NewAttr("class","row text-center")]))]);
       return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([Attr.Attr().NewAttr("class","col-sm-6 col-md-4")]));
      };
      return Piglet.Render(_arg00_1,x5);
     };
     arg10c=List.ofArray([Attr.Attr().NewAttr("class","container")]);
     source=Seq.map(pairUI,userPairs);
     x6=List.ofSeq(source);
     return Operators.add(Tags.Tags().NewTag("div",arg10c),List.ofArray([Operators.add(Tags.Tags().NewTag("div",x6),List.ofArray([Attr.Attr().NewAttr("class","row")])),Client1.renderOutputUIWeb(outputUI)]));
    },
    presetMobile:function(userPairs)
    {
     var outputUI,tweetCache,tweetCacheD,tweetCacheChoice,usernamePairCache,pairUI,arg104,source,x6;
     outputUI=Client1.buildOutputUIMobile();
     tweetCache=[[]];
     tweetCacheD=[[[],{
      $:0
     },{
      $:0
     },{
      $:0
     },{
      $:0
     }]];
     tweetCacheChoice=[0];
     usernamePairCache=[["",""]];
     pairUI=function(userPair)
     {
      var user2,user1,_arg00_,x,action,x5,_arg00_1;
      user2=userPair[1];
      user1=userPair[0];
      _arg00_=Piglet.Return(null);
      x=Piglet.WithSubmit(_arg00_);
      action=function()
      {
       var arg00;
       arg00=Concurrency.Delay(function()
       {
        var _,x1,tupledArg1,a2,b1,c1,x4,e1,index1,patternInput1,z1,a3,newD1,_arg10_1,_arg11_1,_arg12_1,_arg13_1,_arg14_1,_arg15_1;
        if(tweetCacheChoice[0]>=tweetCache[0].length?true:!Unchecked.Equals([user1.Username,user2.Username],usernamePairCache[0]))
         {
          usernamePairCache[0]=[user1.Username,user2.Username];
          x1=AjaxRemotingProvider.Async("Website:0",[user1.Username,user2.Username]);
          _=Concurrency.Bind(x1,function(_arg1)
          {
           var _1,d,d1,x2,tupledArg,a,b,c,x3,e,index,patternInput,z,a1,newD,_arg10_,_arg11_,_arg12_,_arg13_,_arg14_,_arg15_;
           if(_arg1.$==1)
            {
             d=_arg1.$0;
             tweetCache[0]=[];
             tweetCacheD[0]=[[],{
              $:0
             },{
              $:0
             },{
              $:0
             },{
              $:0
             }];
             tweetCacheChoice[0]=0;
             usernamePairCache[0]=["",""];
             Client1.processFailureMobile(outputUI,d);
             _1=Concurrency.Return(null);
            }
           else
            {
             d1=_arg1.$0;
             x2=d1[0];
             d1[1];
             d1[2];
             d1[3];
             d1[4];
             tweetCache[0]=x2;
             tweetCacheD[0]=d1;
             tweetCacheChoice[0]=0;
             tupledArg=tweetCacheD[0];
             a=tupledArg[0];
             b=tupledArg[1];
             c=tupledArg[2];
             x3=tupledArg[3];
             e=tupledArg[4];
             index=tweetCacheChoice[0];
             patternInput=Arrays.get(tweetCache[0],index);
             z=patternInput[0];
             a1=patternInput[1];
             newD=[z,a1,b,c,x3,e];
             tweetCacheChoice[0]=tweetCacheChoice[0]+1;
             _arg10_=newD[0];
             _arg11_=newD[1];
             _arg12_=newD[2];
             _arg13_=newD[3];
             _arg14_=newD[4];
             _arg15_=newD[5];
             Client1.processSuccessMobile(outputUI,_arg10_,_arg11_,_arg12_,_arg13_,_arg14_,_arg15_);
             _1=Concurrency.Return(null);
            }
           return _1;
          });
         }
        else
         {
          usernamePairCache[0]=[user1.Username,user2.Username];
          tupledArg1=tweetCacheD[0];
          a2=tupledArg1[0];
          b1=tupledArg1[1];
          c1=tupledArg1[2];
          x4=tupledArg1[3];
          e1=tupledArg1[4];
          index1=tweetCacheChoice[0];
          patternInput1=Arrays.get(tweetCache[0],index1);
          z1=patternInput1[0];
          a3=patternInput1[1];
          newD1=[z1,a3,b1,c1,x4,e1];
          tweetCacheChoice[0]=tweetCacheChoice[0]+1;
          _arg10_1=newD1[0];
          _arg11_1=newD1[1];
          _arg12_1=newD1[2];
          _arg13_1=newD1[3];
          _arg14_1=newD1[4];
          _arg15_1=newD1[5];
          Client1.processSuccessMobile(outputUI,_arg10_1,_arg11_1,_arg12_1,_arg13_1,_arg14_1,_arg15_1);
          _=Concurrency.Return(null);
         }
        return _;
       });
       return Concurrency.Start(arg00,{
        $:0
       });
      };
      x5=Piglet.Run(action,x);
      _arg00_1=function(submit)
      {
       var arg10,arg101,arg102,arg103;
       arg103=user1.FullName+" & "+user2.FullName;
       arg102=List.ofArray([Operators.add(Controls.Submit(submit),List.ofArray([Attr.Attr().NewAttr("class","btn go-button col-xs-12"),Attr.Attr().NewAttr("Value",arg103),Attr.Attr().NewAttr("id","go-button")]))]);
       arg101=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg102),List.ofArray([Attr.Attr().NewAttr("class","input-group col-xs-12")]))]);
       arg10=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg101),List.ofArray([Attr.Attr().NewAttr("class","form-group form-group-mobile")]))]);
       return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([Attr.Attr().NewAttr("class","form form-horizontal form-mobile")]));
      };
      return Piglet.Render(_arg00_1,x5);
     };
     arg104=List.ofArray([Attr.Attr().NewAttr("class","container tweet-mobile-ui")]);
     source=Seq.map(pairUI,userPairs);
     x6=List.ofSeq(source);
     return Operators.add(Tags.Tags().NewTag("div",arg104),List.ofArray([Tags.Tags().NewTag("div",x6),Client1.renderOutputUIMobile(outputUI)]));
    },
    processFailureMobile:function(outputUI,failureText)
    {
     var _this,_this1,_this2,_this3,_this4;
     _this=outputUI.TweetThisButton;
     _this["HtmlProvider@33"].SetAttribute(_this.get_Body(),"style","");
     outputUI.TweetText.set_Text(failureText);
     _this1=outputUI.User1Image;
     _this1["HtmlProvider@33"].RemoveAttribute(_this1.get_Body(),"src");
     _this2=outputUI.User2Image;
     _this2["HtmlProvider@33"].RemoveAttribute(_this2.get_Body(),"src");
     _this3=outputUI.Usernames;
     _this3["HtmlProvider@33"].SetAttribute(_this3.get_Body(),"style","display: none;");
     _this4=outputUI.TweetThisButton;
     return _this4["HtmlProvider@33"].SetAttribute(_this4.get_Body(),"style","display: none;");
    },
    processFailureWeb:function(outputUI,failureText)
    {
     var _this,_this1,_this2,_this3,_this4,_this5;
     _this=outputUI.TweetThisButton;
     _this["HtmlProvider@33"].SetAttribute(_this.get_Body(),"style","");
     outputUI.TweetText.set_Text(failureText);
     _this1=outputUI.User1Image;
     _this1["HtmlProvider@33"].RemoveAttribute(_this1.get_Body(),"src");
     _this2=outputUI.User1Name;
     _this2["HtmlProvider@33"].SetAttribute(_this2.get_Body(),"style","display: none;");
     _this3=outputUI.User2Image;
     _this3["HtmlProvider@33"].RemoveAttribute(_this3.get_Body(),"src");
     _this4=outputUI.User2Name;
     _this4["HtmlProvider@33"].SetAttribute(_this4.get_Body(),"style","display: none;");
     _this5=outputUI.TweetThisButton;
     return _this5["HtmlProvider@33"].SetAttribute(_this5.get_Body(),"style","display: none;");
    },
    processSuccessMobile:function(_,_1,_2,_3,_4,_5,_6)
    {
     var resultValues,_this,user2NameOption,user2ImageURLOption,user1NameOption,user1ImageURLOption,tweetTextForLink,tweetText;
     resultValues=[_1,_2,_3,_4,_5,_6];
     _this=_.TweetThisButton;
     _this["HtmlProvider@33"].SetAttribute(_this.get_Body(),"style","");
     user2NameOption=resultValues[4];
     user2ImageURLOption=resultValues[5];
     user1NameOption=resultValues[2];
     user1ImageURLOption=resultValues[3];
     tweetTextForLink=resultValues[1];
     tweetText=resultValues[0];
     Client1.processTweetText(tweetText,_.Presents,_.TweetText);
     Client1.processTweetTextForLink(tweetTextForLink,_.TweetThisButton);
     Client1.processUserNames(user1NameOption,user2NameOption,_.Usernames);
     Client1.processUserImage(user1ImageURLOption,_.User1Image);
     return Client1.processUserImage(user2ImageURLOption,_.User2Image);
    },
    processSuccessWeb:function(_,_1,_2,_3,_4,_5,_6)
    {
     var resultValues,user2NameOption,user2ImageURLOption,user1NameOption,user1ImageURLOption,tweetTextForLink,tweetText;
     resultValues=[_1,_2,_3,_4,_5,_6];
     user2NameOption=resultValues[4];
     user2ImageURLOption=resultValues[5];
     user1NameOption=resultValues[2];
     user1ImageURLOption=resultValues[3];
     tweetTextForLink=resultValues[1];
     tweetText=resultValues[0];
     Client1.processTweetText(tweetText,_.Presents,_.TweetText);
     Client1.processTweetTextForLink(tweetTextForLink,_.TweetThisButton);
     Client1.processUserName(user1NameOption,_.User1Name);
     Client1.processUserName(user2NameOption,_.User2Name);
     Client1.processUserImage(user1ImageURLOption,_.User1Image);
     return Client1.processUserImage(user2ImageURLOption,_.User2Image);
    },
    processTweetText:function(tweetText,presents,e)
    {
     presents.set_Text("TweetMashup.com presents:");
     return e.set_Text(tweetText);
    },
    processTweetTextForLink:function(tweetTextForLink,tweetThisButton)
    {
     var _,linkURL,arg20;
     if(tweetTextForLink.$==0)
      {
       _=tweetThisButton["HtmlProvider@33"].SetAttribute(tweetThisButton.get_Body(),"disabled","");
      }
     else
      {
       linkURL=tweetTextForLink.$0;
       tweetThisButton["HtmlProvider@33"].RemoveAttribute(tweetThisButton.get_Body(),"disabled");
       tweetThisButton["HtmlProvider@33"].RemoveAttribute(tweetThisButton.get_Body(),"style");
       arg20="https://twitter.com/intent/tweet?text="+linkURL;
       _=tweetThisButton["HtmlProvider@33"].SetAttribute(tweetThisButton.get_Body(),"href",arg20);
      }
     return _;
    },
    processUserImage:function(userImageURLOption,userImage)
    {
     var _,userImageURL;
     if(userImageURLOption.$==0)
      {
       _=userImage["HtmlProvider@33"].RemoveAttribute(userImage.get_Body(),"src");
      }
     else
      {
       userImageURL=userImageURLOption.$0;
       _=userImage["HtmlProvider@33"].SetAttribute(userImage.get_Body(),"src",userImageURL);
      }
     return _;
    },
    processUserName:function(userNameOption,userName)
    {
     var _,userNameText;
     if(userNameOption.$==0)
      {
       _=userName["HtmlProvider@33"].SetAttribute(userName.get_Body(),"style","display: none;");
      }
     else
      {
       userNameText=userNameOption.$0;
       userName.set_Text(userNameText);
       _=userName["HtmlProvider@33"].RemoveAttribute(userName.get_Body(),"style");
      }
     return _;
    },
    processUserNames:function(user1NameOption,user2NameOption,usernames)
    {
     var matchValue,_,_1,user1NameText,user2NameText;
     matchValue=[user1NameOption,user2NameOption];
     if(matchValue[0].$==1)
      {
       if(matchValue[1].$==1)
        {
         user1NameText=matchValue[0].$0;
         user2NameText=matchValue[1].$0;
         usernames.set_Text(user1NameText+" & "+user2NameText);
         _1=usernames["HtmlProvider@33"].RemoveAttribute(usernames.get_Body(),"style");
        }
       else
        {
         _1=usernames["HtmlProvider@33"].SetAttribute(usernames.get_Body(),"style","display: none;");
        }
       _=_1;
      }
     else
      {
       _=usernames["HtmlProvider@33"].SetAttribute(usernames.get_Body(),"style","display: none;");
      }
     return _;
    },
    renderOutputUIMobile:function(outputUI)
    {
     var arg10,arg101,arg102,arg103,arg104,arg105,arg106;
     arg102=List.ofArray([outputUI.User1Image,outputUI.User2Image]);
     arg103=List.ofArray([outputUI.Usernames]);
     arg101=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg102),List.ofArray([Attr.Attr().NewAttr("class","overlapping-images-small")])),Operators.add(Tags.Tags().NewTag("div",arg103),List.ofArray([Attr.Attr().NewAttr("class","text-center")]))]);
     arg104=List.ofArray([outputUI.Presents]);
     arg105=List.ofArray([outputUI.TweetText]);
     arg106=List.ofArray([outputUI.TweetThisButton]);
     arg10=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg101),List.ofArray([Attr.Attr().NewAttr("class","col-xs-12")])),Operators.add(Tags.Tags().NewTag("div",arg104),List.ofArray([Attr.Attr().NewAttr("class","col-xs-12")])),Operators.add(Tags.Tags().NewTag("div",arg105),List.ofArray([Attr.Attr().NewAttr("class","col-xs-12")])),Operators.add(Tags.Tags().NewTag("div",arg106),List.ofArray([Attr.Attr().NewAttr("class","text-center col-xs-12")]))]);
     return Tags.Tags().NewTag("div",arg10);
    },
    renderOutputUIWeb:function(outputUI)
    {
     var arg10,arg101,arg102,arg103,arg104,arg105,arg106,arg107;
     arg102=List.ofArray([outputUI.User1Name]);
     arg103=List.ofArray([outputUI.User1Image,outputUI.User2Image]);
     arg104=List.ofArray([outputUI.User2Name]);
     arg101=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg102),List.ofArray([Attr.Attr().NewAttr("class","col-md-4 col-lg-4 left-name hidden-sm hidden-xs")])),Operators.add(Tags.Tags().NewTag("div",arg103),List.ofArray([Attr.Attr().NewAttr("class","overlapping-images col-md-4 col-lg-4")])),Operators.add(Tags.Tags().NewTag("div",arg104),List.ofArray([Attr.Attr().NewAttr("class","col-md-4 col-lg-4 right-name hidden-sm hidden-xs")]))]);
     arg105=List.ofArray([outputUI.Presents]);
     arg106=List.ofArray([outputUI.TweetText]);
     arg107=List.ofArray([outputUI.TweetThisButton]);
     arg10=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg101),List.ofArray([Attr.Attr().NewAttr("class","row")])),Operators.add(Tags.Tags().NewTag("div",arg105),List.ofArray([Attr.Attr().NewAttr("class","row")])),Operators.add(Tags.Tags().NewTag("div",arg106),List.ofArray([Attr.Attr().NewAttr("class","row")])),Operators.add(Tags.Tags().NewTag("div",arg107),List.ofArray([Attr.Attr().NewAttr("class","text-center row")]))]);
     return Tags.Tags().NewTag("div",arg10);
    },
    tryIt:function()
    {
     var outputUI,usernamePairCache,tweetCache,tweetCacheD,tweetCacheChoice,_arg00_,x1,action,x6,_arg00_1,userInputUI,arg105;
     outputUI=Client1.buildOutputUIWeb();
     usernamePairCache=[["",""]];
     tweetCache=[[]];
     tweetCacheD=[[[],{
      $:0
     },{
      $:0
     },{
      $:0
     },{
      $:0
     }]];
     tweetCacheChoice=[0];
     _arg00_=Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Piglet.Return(function(x)
     {
      return function(y)
      {
       return[x,y];
      };
     }),Piglet.Yield("")),Piglet.Yield(""));
     x1=Piglet.WithSubmit(_arg00_);
     action=function(tupledArg)
     {
      var x,y,arg00;
      x=tupledArg[0];
      y=tupledArg[1];
      arg00=Concurrency.Delay(function()
      {
       var _,x2,tupledArg2,a2,b1,c1,x5,e1,index1,patternInput1,z1,a3,newD1,_arg10_1,_arg11_1,_arg12_1,_arg13_1,_arg14_1,_arg15_1;
       if(tweetCacheChoice[0]>=tweetCache[0].length?true:!Unchecked.Equals([x,y],usernamePairCache[0]))
        {
         usernamePairCache[0]=[x,y];
         x2=AjaxRemotingProvider.Async("Website:0",[x,y]);
         _=Concurrency.Bind(x2,function(_arg1)
         {
          var _1,d,d1,x3,tupledArg1,a,b,c,x4,e,index,patternInput,z,a1,newD,_arg10_,_arg11_,_arg12_,_arg13_,_arg14_,_arg15_;
          if(_arg1.$==1)
           {
            d=_arg1.$0;
            tweetCache[0]=[];
            tweetCacheD[0]=[[],{
             $:0
            },{
             $:0
            },{
             $:0
            },{
             $:0
            }];
            tweetCacheChoice[0]=0;
            usernamePairCache[0]=["",""];
            Client1.processFailureWeb(outputUI,d);
            _1=Concurrency.Return(null);
           }
          else
           {
            d1=_arg1.$0;
            x3=d1[0];
            d1[1];
            d1[2];
            d1[3];
            d1[4];
            tweetCache[0]=x3;
            tweetCacheD[0]=d1;
            tweetCacheChoice[0]=0;
            tupledArg1=tweetCacheD[0];
            a=tupledArg1[0];
            b=tupledArg1[1];
            c=tupledArg1[2];
            x4=tupledArg1[3];
            e=tupledArg1[4];
            index=tweetCacheChoice[0];
            patternInput=Arrays.get(tweetCache[0],index);
            z=patternInput[0];
            a1=patternInput[1];
            newD=[z,a1,b,c,x4,e];
            tweetCacheChoice[0]=tweetCacheChoice[0]+1;
            _arg10_=newD[0];
            _arg11_=newD[1];
            _arg12_=newD[2];
            _arg13_=newD[3];
            _arg14_=newD[4];
            _arg15_=newD[5];
            Client1.processSuccessWeb(outputUI,_arg10_,_arg11_,_arg12_,_arg13_,_arg14_,_arg15_);
            _1=Concurrency.Return(null);
           }
          return _1;
         });
        }
       else
        {
         usernamePairCache[0]=[x,y];
         tupledArg2=tweetCacheD[0];
         a2=tupledArg2[0];
         b1=tupledArg2[1];
         c1=tupledArg2[2];
         x5=tupledArg2[3];
         e1=tupledArg2[4];
         index1=tweetCacheChoice[0];
         patternInput1=Arrays.get(tweetCache[0],index1);
         z1=patternInput1[0];
         a3=patternInput1[1];
         newD1=[z1,a3,b1,c1,x5,e1];
         tweetCacheChoice[0]=tweetCacheChoice[0]+1;
         _arg10_1=newD1[0];
         _arg11_1=newD1[1];
         _arg12_1=newD1[2];
         _arg13_1=newD1[3];
         _arg14_1=newD1[4];
         _arg15_1=newD1[5];
         Client1.processSuccessWeb(outputUI,_arg10_1,_arg11_1,_arg12_1,_arg13_1,_arg14_1,_arg15_1);
         _=Concurrency.Return(null);
        }
       return _;
      });
      return Concurrency.Start(arg00,{
       $:0
      });
     };
     x6=Piglet.Run(action,x1);
     _arg00_1=function(x)
     {
      return function(y)
      {
       return function(submit)
       {
        var arg10,arg101,arg102,arg103,arg104;
        arg102=List.ofArray([Tags.Tags().text("&")]);
        arg101=List.ofArray([Tags.Tags().NewTag("h1",arg102)]);
        arg104=List.ofArray([Operators.add(Controls.Submit(submit),List.ofArray([Attr.Attr().NewAttr("class","btn go-button btn-lg"),Attr.Attr().NewAttr("Value","Go!"),Attr.Attr().NewAttr("id","go-button")]))]);
        arg103=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg104),List.ofArray([Attr.Attr().NewAttr("class","input-group col-md-10")]))]);
        arg10=List.ofArray([Client1.userSelectionUIWeb(1,x),Operators.add(Tags.Tags().NewTag("div",arg101),List.ofArray([Attr.Attr().NewAttr("class","form-group")])),Client1.userSelectionUIWeb(2,y),Operators.add(Tags.Tags().NewTag("div",arg103),List.ofArray([Attr.Attr().NewAttr("class","form-group")]))]);
        return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([Attr.Attr().NewAttr("class","form form-inline")]));
       };
      };
     };
     userInputUI=Piglet.Render(_arg00_1,x6);
     arg105=List.ofArray([userInputUI,Client1.renderOutputUIWeb(outputUI)]);
     return Operators.add(Tags.Tags().NewTag("div",arg105),List.ofArray([Attr.Attr().NewAttr("class","container")]));
    },
    tryItMobile:function()
    {
     var outputUI,tweetCache,tweetCacheD,tweetCacheChoice,usernamePairCache,_arg00_,x1,x2,arg10;
     outputUI=Client1.buildOutputUIMobile();
     tweetCache=[[]];
     tweetCacheD=[[[],{
      $:0
     },{
      $:0
     },{
      $:0
     },{
      $:0
     }]];
     tweetCacheChoice=[0];
     usernamePairCache=[["",""]];
     _arg00_=Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Piglet.Return(function(x)
     {
      return function(y)
      {
       return[x,y];
      };
     }),Piglet.Yield("")),Piglet.Yield(""));
     x1=Piglet.WithSubmit(_arg00_);
     x2=Piglet.Run(function(tupledArg)
     {
      var x,y;
      x=tupledArg[0];
      y=tupledArg[1];
      return Concurrency.Start(Concurrency.Delay(function()
      {
       var x3,tupledArg2,b1,c1,x5,e1,index1,patternInput1,newD1;
       if(tweetCacheChoice[0]>=tweetCache[0].length?true:!Unchecked.Equals([x,y],usernamePairCache[0]))
        {
         usernamePairCache[0]=[x,y];
         x3=AjaxRemotingProvider.Async("Website:0",[x,y]);
         return Concurrency.Bind(x3,function(_arg1)
         {
          var d,d1,tupledArg1,b,c,x4,e,index,patternInput,newD;
          if(_arg1.$==1)
           {
            d=_arg1.$0;
            tweetCache[0]=[];
            tweetCacheD[0]=[[],{
             $:0
            },{
             $:0
            },{
             $:0
            },{
             $:0
            }];
            tweetCacheChoice[0]=0;
            usernamePairCache[0]=["",""];
            Client1.processFailureMobile(outputUI,d);
            return Concurrency.Return(null);
           }
          else
           {
            d1=_arg1.$0;
            tweetCache[0]=d1[0];
            tweetCacheD[0]=d1;
            tweetCacheChoice[0]=0;
            tupledArg1=tweetCacheD[0];
            b=tupledArg1[1];
            c=tupledArg1[2];
            x4=tupledArg1[3];
            e=tupledArg1[4];
            index=tweetCacheChoice[0];
            patternInput=Arrays.get(tweetCache[0],index);
            newD=[patternInput[0],patternInput[1],b,c,x4,e];
            tweetCacheChoice[0]=tweetCacheChoice[0]+1;
            Client1.processSuccessMobile(outputUI,newD[0],newD[1],newD[2],newD[3],newD[4],newD[5]);
            return Concurrency.Return(null);
           }
         });
        }
       else
        {
         usernamePairCache[0]=[x,y];
         tupledArg2=tweetCacheD[0];
         b1=tupledArg2[1];
         c1=tupledArg2[2];
         x5=tupledArg2[3];
         e1=tupledArg2[4];
         index1=tweetCacheChoice[0];
         patternInput1=Arrays.get(tweetCache[0],index1);
         newD1=[patternInput1[0],patternInput1[1],b1,c1,x5,e1];
         tweetCacheChoice[0]=tweetCacheChoice[0]+1;
         Client1.processSuccessMobile(outputUI,newD1[0],newD1[1],newD1[2],newD1[3],newD1[4],newD1[5]);
         return Concurrency.Return(null);
        }
      }),{
       $:0
      });
     },x1);
     arg10=List.ofArray([Piglet.Render(function(x)
     {
      return function(y)
      {
       return function(submit)
       {
        var arg101,arg102,arg103;
        arg103=List.ofArray([Operators.add(Controls.Submit(submit),List.ofArray([Attr.Attr().NewAttr("class","btn go-button col-xs-12"),Attr.Attr().NewAttr("Value","Go!"),Attr.Attr().NewAttr("id","go-button")]))]);
        arg102=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg103),List.ofArray([Attr.Attr().NewAttr("class","input-group col-xs-12")]))]);
        arg101=List.ofArray([Client1.userSelectionUIMobile(1,x),Client1.userSelectionUIMobile(2,y),Operators.add(Tags.Tags().NewTag("div",arg102),List.ofArray([Attr.Attr().NewAttr("class","form-group form-group-mobile")]))]);
        return Operators.add(Tags.Tags().NewTag("div",arg101),List.ofArray([Attr.Attr().NewAttr("class","form form-horizontal form-mobile")]));
       };
      };
     },x2),Client1.renderOutputUIMobile(outputUI)]);
     return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([Attr.Attr().NewAttr("class","container tweet-mobile-ui")]));
    },
    userSelectionUIMobile:function(i,x)
    {
     var arg10,arg101,x1,arg102,arg103,arg104;
     x1="Username "+String(i);
     arg101=List.ofArray([Tags.Tags().text(x1)]);
     arg102=List.ofArray([Attr.Attr().NewAttr("class","input-group col-xs-12")]);
     arg103=List.ofArray([Attr.Attr().NewAttr("class","input-group-addon"),Attr.Attr().NewAttr("id","username"+String(i))]);
     arg104="username"+String(i);
     arg10=List.ofArray([Operators.add(Tags.Tags().NewTag("label",arg101),List.ofArray([Attr.Attr().NewAttr("class","sr-only"),Attr.Attr().NewAttr("for","username"+String(i))])),Operators.add(Tags.Tags().NewTag("div",arg102),List.ofArray([Operators.add(Tags.Tags().NewTag("span",arg103),List.ofArray([Tags.Tags().text("@")])),Operators.add(Controls.input("text",function(x2)
     {
      return x2;
     },function(x2)
     {
      return x2;
     },x),List.ofArray([Attr.Attr().NewAttr("value",""),Attr.Attr().NewAttr("type","text"),Attr.Attr().NewAttr("class","form-control"),Attr.Attr().NewAttr("placeholder","username"),Attr.Attr().NewAttr("aria-describedby",arg104)]))]))]);
     return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([Attr.Attr().NewAttr("class","form-group form-group-mobile")]));
    },
    userSelectionUIWeb:function(i,x)
    {
     var arg10,arg101,x1,arg102,arg103,arg104;
     x1="Username "+String(i);
     arg101=List.ofArray([Tags.Tags().text(x1)]);
     arg102=List.ofArray([Attr.Attr().NewAttr("class","input-group input-group-lg col-md-10")]);
     arg103=List.ofArray([Attr.Attr().NewAttr("class","input-group-addon"),Attr.Attr().NewAttr("id","username"+String(i))]);
     arg104="username"+String(i);
     arg10=List.ofArray([Operators.add(Tags.Tags().NewTag("label",arg101),List.ofArray([Attr.Attr().NewAttr("class","sr-only"),Attr.Attr().NewAttr("for","username"+String(i))])),Operators.add(Tags.Tags().NewTag("div",arg102),List.ofArray([Operators.add(Tags.Tags().NewTag("span",arg103),List.ofArray([Tags.Tags().text("@")])),Operators.add(Controls.input("text",function(x2)
     {
      return x2;
     },function(x2)
     {
      return x2;
     },x),List.ofArray([Attr.Attr().NewAttr("value",""),Attr.Attr().NewAttr("type","text"),Attr.Attr().NewAttr("class","form-control"),Attr.Attr().NewAttr("placeholder","username"),Attr.Attr().NewAttr("aria-describedby",arg104)]))]))]);
     return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([Attr.Attr().NewAttr("class","form-group")]));
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  List=Runtime.Safe(Global.WebSharper.List);
  Html=Runtime.Safe(Global.WebSharper.Html);
  Client=Runtime.Safe(Html.Client);
  Attr=Runtime.Safe(Client.Attr);
  Tags=Runtime.Safe(Client.Tags);
  Operators=Runtime.Safe(Client.Operators);
  T=Runtime.Safe(List.T);
  Website=Runtime.Safe(Global.Website);
  Client1=Runtime.Safe(Website.Client);
  Piglets=Runtime.Safe(Global.WebSharper.Piglets);
  Piglet=Runtime.Safe(Piglets.Piglet);
  Concurrency=Runtime.Safe(Global.WebSharper.Concurrency);
  Unchecked=Runtime.Safe(Global.WebSharper.Unchecked);
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
  Arrays=Runtime.Safe(Global.WebSharper.Arrays);
  Controls=Runtime.Safe(Piglets.Controls);
  Seq=Runtime.Safe(Global.WebSharper.Seq);
  Pervasives=Runtime.Safe(Piglets.Pervasives);
  return String=Runtime.Safe(Global.String);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());
