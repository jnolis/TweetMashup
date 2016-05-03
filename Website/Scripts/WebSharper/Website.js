(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Html,Client,Operators,List,T,Tags,Attr,Website,Client1,Piglets,Piglet,Concurrency,Remoting,AjaxRemotingProvider,Controls,Seq,Pervasives,String;
 Runtime.Define(Global,{
  Website:{
   Client:{
    buildOutputUIMobile:function()
    {
     var output,arg10,x,user1Image,x1,user2Image,tweetThisButton,arg101,arg102,arg103,arg104,usernames;
     arg10=Runtime.New(T,{
      $:0
     });
     output=Operators.add(Tags.Tags().NewTag("h5",arg10),List.ofArray([Attr.Attr().NewAttr("class","text-center tweet-text-mobile")]));
     x=List.ofArray([Attr.Attr().NewAttr("class","img-circle img-left-small"),Attr.Attr().NewAttr("width","96"),Attr.Attr().NewAttr("height","96")]);
     user1Image=Tags.Tags().NewTag("img",x);
     x1=List.ofArray([Attr.Attr().NewAttr("class","img-circle img-right-small"),Attr.Attr().NewAttr("width","96"),Attr.Attr().NewAttr("height","96")]);
     user2Image=Tags.Tags().NewTag("img",x1);
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
      Usernames:usernames,
      TweetThisButton:tweetThisButton
     };
    },
    buildOutputUIWeb:function()
    {
     var output,arg10,x,user1Image,x1,user2Image,tweetThisButton,arg101,arg102,arg103,arg104,user1Name,arg105,user2Name;
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
     arg104=List.ofArray([Attr.Attr().NewAttr("style","display: none;")]);
     user1Name=Tags.Tags().NewTag("h4",arg104);
     arg105=List.ofArray([Attr.Attr().NewAttr("style","display: none;")]);
     user2Name=Tags.Tags().NewTag("h4",arg105);
     return{
      TweetText:output,
      User1Image:user1Image,
      User2Image:user2Image,
      User1Name:user1Name,
      User2Name:user2Name,
      TweetThisButton:tweetThisButton
     };
    },
    preset:function(userPairs)
    {
     var outputUI,pairUI,arg10c,source,x3;
     outputUI=Client1.buildOutputUIWeb();
     pairUI=function(userPair)
     {
      var user2,user1,_arg00_,x,action,x2,_arg00_1;
      user2=userPair[1];
      user1=userPair[0];
      _arg00_=Piglet.Return(null);
      x=Piglet.WithSubmit(_arg00_);
      action=function()
      {
       var arg00;
       arg00=Concurrency.Delay(function()
       {
        var x1;
        x1=AjaxRemotingProvider.Async("Website:0",[user1.Username,user2.Username]);
        return Concurrency.Bind(x1,function(_arg1)
        {
         var _,d,d1,_arg10_,_arg11_,_arg12_,_arg13_,_arg14_,_arg15_;
         if(_arg1.$==1)
          {
           d=_arg1.$0;
           Client1.processFailureWeb(outputUI,d);
           _=Concurrency.Return(null);
          }
         else
          {
           d1=_arg1.$0;
           _arg10_=d1[0];
           _arg11_=d1[1];
           _arg12_=d1[2];
           _arg13_=d1[3];
           _arg14_=d1[4];
           _arg15_=d1[5];
           Client1.processSuccessWeb(outputUI,_arg10_,_arg11_,_arg12_,_arg13_,_arg14_,_arg15_);
           _=Concurrency.Return(null);
          }
         return _;
        });
       });
       return Concurrency.Start(arg00,{
        $:0
       });
      };
      x2=Piglet.Run(action,x);
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
      return Piglet.Render(_arg00_1,x2);
     };
     arg10c=List.ofArray([Attr.Attr().NewAttr("class","container")]);
     source=Seq.map(pairUI,userPairs);
     x3=List.ofSeq(source);
     return Operators.add(Tags.Tags().NewTag("section",arg10c),List.ofArray([Operators.add(Tags.Tags().NewTag("div",x3),List.ofArray([Attr.Attr().NewAttr("class","row")])),Client1.renderOutputUIWeb(outputUI)]));
    },
    presetMobile:function(userPairs)
    {
     var outputUI,pairUI,arg104,source,x3;
     outputUI=Client1.buildOutputUIMobile();
     pairUI=function(userPair)
     {
      var user2,user1,_arg00_,x,action,x2,_arg00_1;
      user2=userPair[1];
      user1=userPair[0];
      _arg00_=Piglet.Return(null);
      x=Piglet.WithSubmit(_arg00_);
      action=function()
      {
       var arg00;
       arg00=Concurrency.Delay(function()
       {
        var x1;
        x1=AjaxRemotingProvider.Async("Website:0",[user1.Username,user2.Username]);
        return Concurrency.Bind(x1,function(_arg1)
        {
         var _,d,d1,_arg10_,_arg11_,_arg12_,_arg13_,_arg14_,_arg15_;
         if(_arg1.$==1)
          {
           d=_arg1.$0;
           Client1.processFailureMobile(outputUI,d);
           _=Concurrency.Return(null);
          }
         else
          {
           d1=_arg1.$0;
           _arg10_=d1[0];
           _arg11_=d1[1];
           _arg12_=d1[2];
           _arg13_=d1[3];
           _arg14_=d1[4];
           _arg15_=d1[5];
           Client1.processSuccessMobile(outputUI,_arg10_,_arg11_,_arg12_,_arg13_,_arg14_,_arg15_);
           _=Concurrency.Return(null);
          }
         return _;
        });
       });
       return Concurrency.Start(arg00,{
        $:0
       });
      };
      x2=Piglet.Run(action,x);
      _arg00_1=function(submit)
      {
       var arg10,arg101,arg102,arg103;
       arg103=user1.FullName+" & "+user2.FullName;
       arg102=List.ofArray([Operators.add(Controls.Submit(submit),List.ofArray([Attr.Attr().NewAttr("class","btn go-button col-xs-12"),Attr.Attr().NewAttr("Value",arg103),Attr.Attr().NewAttr("id","go-button")]))]);
       arg101=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg102),List.ofArray([Attr.Attr().NewAttr("class","input-group col-xs-12")]))]);
       arg10=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg101),List.ofArray([Attr.Attr().NewAttr("class","form-group form-group-mobile")]))]);
       return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([Attr.Attr().NewAttr("class","form form-horizontal form-mobile")]));
      };
      return Piglet.Render(_arg00_1,x2);
     };
     arg104=List.ofArray([Attr.Attr().NewAttr("class","container")]);
     source=Seq.map(pairUI,userPairs);
     x3=List.ofSeq(source);
     return Operators.add(Tags.Tags().NewTag("section",arg104),List.ofArray([Operators.add(Tags.Tags().NewTag("div",x3),List.ofArray([Attr.Attr().NewAttr("class","row")])),Client1.renderOutputUIMobile(outputUI)]));
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
     Client1.processTweetText(tweetText,_.TweetText);
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
     Client1.processTweetText(tweetText,_.TweetText);
     Client1.processTweetTextForLink(tweetTextForLink,_.TweetThisButton);
     Client1.processUserName(user1NameOption,_.User1Name);
     Client1.processUserName(user2NameOption,_.User2Name);
     Client1.processUserImage(user1ImageURLOption,_.User1Image);
     return Client1.processUserImage(user2ImageURLOption,_.User2Image);
    },
    processTweetText:function(tweetText,e)
    {
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
     var arg10,arg101,arg102,arg103,arg104,arg105;
     arg102=List.ofArray([outputUI.User1Image,outputUI.User2Image]);
     arg103=List.ofArray([outputUI.Usernames]);
     arg101=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg102),List.ofArray([Attr.Attr().NewAttr("class","overlapping-images-small")])),Operators.add(Tags.Tags().NewTag("div",arg103),List.ofArray([Attr.Attr().NewAttr("class","text-center")]))]);
     arg104=List.ofArray([outputUI.TweetText]);
     arg105=List.ofArray([outputUI.TweetThisButton]);
     arg10=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg101),List.ofArray([Attr.Attr().NewAttr("class","row")])),Operators.add(Tags.Tags().NewTag("div",arg104),List.ofArray([Attr.Attr().NewAttr("class","row")])),Operators.add(Tags.Tags().NewTag("div",arg105),List.ofArray([Attr.Attr().NewAttr("class","text-center row")]))]);
     return Tags.Tags().NewTag("div",arg10);
    },
    renderOutputUIWeb:function(outputUI)
    {
     var arg10,arg101,arg102,arg103,arg104,arg105,arg106;
     arg102=List.ofArray([outputUI.User1Name]);
     arg103=List.ofArray([outputUI.User1Image,outputUI.User2Image]);
     arg104=List.ofArray([outputUI.User2Name]);
     arg101=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg102),List.ofArray([Attr.Attr().NewAttr("class","col-md-4 col-lg-4 left-name hidden-sm hidden-xs")])),Operators.add(Tags.Tags().NewTag("div",arg103),List.ofArray([Attr.Attr().NewAttr("class","overlapping-images col-md-4 col-lg-4")])),Operators.add(Tags.Tags().NewTag("div",arg104),List.ofArray([Attr.Attr().NewAttr("class","col-md-4 col-lg-4 right-name hidden-sm hidden-xs")]))]);
     arg105=List.ofArray([outputUI.TweetText]);
     arg106=List.ofArray([outputUI.TweetThisButton]);
     arg10=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg101),List.ofArray([Attr.Attr().NewAttr("class","row")])),Operators.add(Tags.Tags().NewTag("div",arg105),List.ofArray([Attr.Attr().NewAttr("class","row")])),Operators.add(Tags.Tags().NewTag("div",arg106),List.ofArray([Attr.Attr().NewAttr("class","text-center row")]))]);
     return Tags.Tags().NewTag("div",arg10);
    },
    tryIt:function()
    {
     var outputUI,_arg00_,x1,action,x3,_arg00_1,userInputUI,arg105;
     outputUI=Client1.buildOutputUIWeb();
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
       var x2;
       x2=AjaxRemotingProvider.Async("Website:0",[x,y]);
       return Concurrency.Bind(x2,function(_arg1)
       {
        var _,d,d1,_arg10_,_arg11_,_arg12_,_arg13_,_arg14_,_arg15_;
        if(_arg1.$==1)
         {
          d=_arg1.$0;
          Client1.processFailureWeb(outputUI,d);
          _=Concurrency.Return(null);
         }
        else
         {
          d1=_arg1.$0;
          _arg10_=d1[0];
          _arg11_=d1[1];
          _arg12_=d1[2];
          _arg13_=d1[3];
          _arg14_=d1[4];
          _arg15_=d1[5];
          Client1.processSuccessWeb(outputUI,_arg10_,_arg11_,_arg12_,_arg13_,_arg14_,_arg15_);
          _=Concurrency.Return(null);
         }
        return _;
       });
      });
      return Concurrency.Start(arg00,{
       $:0
      });
     };
     x3=Piglet.Run(action,x1);
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
     userInputUI=Piglet.Render(_arg00_1,x3);
     arg105=List.ofArray([userInputUI,Client1.renderOutputUIWeb(outputUI)]);
     return Operators.add(Tags.Tags().NewTag("div",arg105),List.ofArray([Attr.Attr().NewAttr("class","container")]));
    },
    tryItMobile:function()
    {
     var outputUI,_arg00_,x1,x2,arg10;
     outputUI=Client1.buildOutputUIMobile();
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
       return Concurrency.Bind(AjaxRemotingProvider.Async("Website:0",[x,y]),function(_arg1)
       {
        var d;
        if(_arg1.$==1)
         {
          Client1.processFailureMobile(outputUI,_arg1.$0);
          return Concurrency.Return(null);
         }
        else
         {
          d=_arg1.$0;
          Client1.processSuccessMobile(outputUI,d[0],d[1],d[2],d[3],d[4],d[5]);
          return Concurrency.Return(null);
         }
       });
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
  Html=Runtime.Safe(Global.WebSharper.Html);
  Client=Runtime.Safe(Html.Client);
  Operators=Runtime.Safe(Client.Operators);
  List=Runtime.Safe(Global.WebSharper.List);
  T=Runtime.Safe(List.T);
  Tags=Runtime.Safe(Client.Tags);
  Attr=Runtime.Safe(Client.Attr);
  Website=Runtime.Safe(Global.Website);
  Client1=Runtime.Safe(Website.Client);
  Piglets=Runtime.Safe(Global.WebSharper.Piglets);
  Piglet=Runtime.Safe(Piglets.Piglet);
  Concurrency=Runtime.Safe(Global.WebSharper.Concurrency);
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
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
