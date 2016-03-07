(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Html,Client,Operators,List,T,Tags,Attr,Website,Client1,Piglets,Piglet,Concurrency,Remoting,AjaxRemotingProvider,Controls,Seq,String,Pervasives;
 Runtime.Define(Global,{
  Website:{
   Client:{
    preset:function(userPairs)
    {
     var output,arg10,tweetThisButton,pairUI,arg10d,source,x3,arg10e,arg10f;
     arg10=Runtime.New(T,{
      $:0
     });
     output=Operators.add(Tags.Tags().NewTag("p",arg10),List.ofArray([Attr.Attr().NewAttr("class","tweet-text text-center")]));
     tweetThisButton=Client1.tweetButtonTemplate();
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
         var _,d,user2NameOption,user2ImageURLOption,user1NameOption,user1ImageURLOption,tweetTextForLink,tweetText,_1,linkURL,arg20;
         tweetThisButton["HtmlProvider@33"].SetAttribute(tweetThisButton.get_Body(),"style","");
         if(_arg1.$==1)
          {
           d=_arg1.$0;
           output.set_Text(d);
           tweetThisButton["HtmlProvider@33"].SetAttribute(tweetThisButton.get_Body(),"style","display: none;");
           _=Concurrency.Return(null);
          }
         else
          {
           user2NameOption=_arg1.$0[4];
           user2ImageURLOption=_arg1.$0[5];
           user1NameOption=_arg1.$0[2];
           user1ImageURLOption=_arg1.$0[3];
           tweetTextForLink=_arg1.$0[1];
           tweetText=_arg1.$0[0];
           output.set_Text(tweetText);
           if(tweetTextForLink.$==0)
            {
             tweetThisButton["HtmlProvider@33"].SetAttribute(tweetThisButton.get_Body(),"disabled","");
             _1=Concurrency.Return(null);
            }
           else
            {
             linkURL=tweetTextForLink.$0;
             tweetThisButton["HtmlProvider@33"].RemoveAttribute(tweetThisButton.get_Body(),"disabled");
             tweetThisButton["HtmlProvider@33"].RemoveAttribute(tweetThisButton.get_Body(),"style");
             arg20="https://twitter.com/intent/tweet?text="+linkURL;
             tweetThisButton["HtmlProvider@33"].SetAttribute(tweetThisButton.get_Body(),"href",arg20);
             _1=Concurrency.Return(null);
            }
           _=_1;
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
       var arg101,arg102,arg103,arg104,arg105,arg106,arg107,arg108,arg109,arg10a,arg10b,arg10c,x1;
       arg105=user1.Image;
       arg104=List.ofArray([Attr.Attr().NewAttr("src",arg105),Attr.Attr().NewAttr("class","img-circle img-left-small"),Attr.Attr().NewAttr("width","96"),Attr.Attr().NewAttr("height","96")]);
       arg107=user2.Image;
       arg106=List.ofArray([Attr.Attr().NewAttr("src",arg107),Attr.Attr().NewAttr("class","img-circle img-right-small"),Attr.Attr().NewAttr("width","96"),Attr.Attr().NewAttr("height","96")]);
       arg103=List.ofArray([Tags.Tags().NewTag("img",arg104),Tags.Tags().NewTag("img",arg106)]);
       arg10a=List.ofArray([Operators.add(Controls.Submit(submit),List.ofArray([Attr.Attr().NewAttr("class","btn go-button btn-lg"),Attr.Attr().NewAttr("Value","Go!"),Attr.Attr().NewAttr("id","go-button")]))]);
       arg109=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg10a),List.ofArray([Attr.Attr().NewAttr("class","input-group")]))]);
       arg108=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg109),List.ofArray([Attr.Attr().NewAttr("class","form-group")]))]);
       arg102=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg103),List.ofArray([Attr.Attr().NewAttr("class","overlapping-images-small col-xs-6 col-md-8")])),Operators.add(Tags.Tags().NewTag("div",arg108),List.ofArray([Attr.Attr().NewAttr("class","form form-inline col-xs-6 col-md-4")]))]);
       x1=user1.FullName+" & "+user2.FullName;
       arg10c=List.ofArray([Tags.Tags().text(x1)]);
       arg10b=List.ofArray([Tags.Tags().NewTag("h4",arg10c)]);
       arg101=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg102),List.ofArray([Attr.Attr().NewAttr("class","row")])),Operators.add(Tags.Tags().NewTag("div",arg10b),List.ofArray([Attr.Attr().NewAttr("class","row text-center")]))]);
       return Operators.add(Tags.Tags().NewTag("div",arg101),List.ofArray([Attr.Attr().NewAttr("class","col-sm-6 col-md-4")]));
      };
      return Piglet.Render(_arg00_1,x2);
     };
     arg10d=List.ofArray([Attr.Attr().NewAttr("class","container")]);
     source=Seq.map(pairUI,userPairs);
     x3=List.ofSeq(source);
     arg10e=List.ofArray([output]);
     arg10f=List.ofArray([tweetThisButton]);
     return Operators.add(Tags.Tags().NewTag("section",arg10d),List.ofArray([Operators.add(Tags.Tags().NewTag("div",x3),List.ofArray([Attr.Attr().NewAttr("class","row")])),Operators.add(Tags.Tags().NewTag("div",arg10e),List.ofArray([Attr.Attr().NewAttr("class","row")])),Operators.add(Tags.Tags().NewTag("div",arg10f),List.ofArray([Attr.Attr().NewAttr("class","row text-center")]))]));
    },
    presetMobile:function()
    {
     var arg10;
     arg10=Runtime.New(T,{
      $:0
     });
     return Tags.Tags().NewTag("div",arg10);
    },
    tryIt:function()
    {
     var userUI,output,arg105,x3,user1Image,x4,user2Image,tweetThisButton,x5,user1Name,x6,user2Name,_arg00_,x7,action,x8,_arg00_1,userUI1,arg106,arg107,arg108,arg109,arg10a,arg10b,arg10c;
     userUI=function(i,x)
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
     };
     arg105=Runtime.New(T,{
      $:0
     });
     output=Operators.add(Tags.Tags().NewTag("p",arg105),List.ofArray([Attr.Attr().NewAttr("class","tweet-text text-center")]));
     x3=List.ofArray([Attr.Attr().NewAttr("class","img-circle img-left"),Attr.Attr().NewAttr("width","128"),Attr.Attr().NewAttr("height","128")]);
     user1Image=Tags.Tags().NewTag("img",x3);
     x4=List.ofArray([Attr.Attr().NewAttr("class","img-circle img-right"),Attr.Attr().NewAttr("width","128"),Attr.Attr().NewAttr("height","128")]);
     user2Image=Tags.Tags().NewTag("img",x4);
     tweetThisButton=Client1.tweetButtonTemplate();
     x5=List.ofArray([Attr.Attr().NewAttr("style","display: none;")]);
     user1Name=Tags.Tags().NewTag("h4",x5);
     x6=List.ofArray([Attr.Attr().NewAttr("style","display: none;")]);
     user2Name=Tags.Tags().NewTag("h4",x6);
     _arg00_=Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Piglet.Return(function(x)
     {
      return function(y)
      {
       return[x,y];
      };
     }),Piglet.Yield("")),Piglet.Yield(""));
     x7=Piglet.WithSubmit(_arg00_);
     action=function(tupledArg)
     {
      var x,y,arg00;
      x=tupledArg[0];
      y=tupledArg[1];
      arg00=Concurrency.Delay(function()
      {
       var x1;
       x1=AjaxRemotingProvider.Async("Website:0",[x,y]);
       return Concurrency.Bind(x1,function(_arg1)
       {
        var _,d,user2NameOption,user2ImageURLOption,user1NameOption,user1ImageURLOption,tweetTextForLink,tweetText,a,_1,linkURL,arg20;
        tweetThisButton["HtmlProvider@33"].SetAttribute(tweetThisButton.get_Body(),"style","");
        if(_arg1.$==1)
         {
          d=_arg1.$0;
          output.set_Text(d);
          user1Image["HtmlProvider@33"].RemoveAttribute(user1Image.get_Body(),"src");
          user1Name["HtmlProvider@33"].SetAttribute(user1Name.get_Body(),"style","display: none;");
          user2Image["HtmlProvider@33"].RemoveAttribute(user2Image.get_Body(),"src");
          user2Name["HtmlProvider@33"].SetAttribute(user2Name.get_Body(),"style","display: none;");
          tweetThisButton["HtmlProvider@33"].SetAttribute(tweetThisButton.get_Body(),"style","display: none;");
          _=Concurrency.Return(null);
         }
        else
         {
          user2NameOption=_arg1.$0[4];
          user2ImageURLOption=_arg1.$0[5];
          user1NameOption=_arg1.$0[2];
          user1ImageURLOption=_arg1.$0[3];
          tweetTextForLink=_arg1.$0[1];
          tweetText=_arg1.$0[0];
          output.set_Text(tweetText);
          if(tweetTextForLink.$==0)
           {
            tweetThisButton["HtmlProvider@33"].SetAttribute(tweetThisButton.get_Body(),"disabled","");
            _1=Concurrency.Return(null);
           }
          else
           {
            linkURL=tweetTextForLink.$0;
            tweetThisButton["HtmlProvider@33"].RemoveAttribute(tweetThisButton.get_Body(),"disabled");
            tweetThisButton["HtmlProvider@33"].RemoveAttribute(tweetThisButton.get_Body(),"style");
            arg20="https://twitter.com/intent/tweet?text="+linkURL;
            tweetThisButton["HtmlProvider@33"].SetAttribute(tweetThisButton.get_Body(),"href",arg20);
            _1=Concurrency.Return(null);
           }
          a=_1;
          _=Concurrency.Combine(a,Concurrency.Delay(function()
          {
           var a1,_2,user1NameText;
           if(user1NameOption.$==0)
            {
             user1Name["HtmlProvider@33"].SetAttribute(user1Name.get_Body(),"style","display: none;");
             _2=Concurrency.Return(null);
            }
           else
            {
             user1NameText=user1NameOption.$0;
             user1Name.set_Text(user1NameText);
             user1Name["HtmlProvider@33"].RemoveAttribute(user1Name.get_Body(),"style");
             _2=Concurrency.Return(null);
            }
           a1=_2;
           return Concurrency.Combine(a1,Concurrency.Delay(function()
           {
            var a2,_3,user2NameText;
            if(user2NameOption.$==0)
             {
              user2Name["HtmlProvider@33"].SetAttribute(user2Name.get_Body(),"style","display: none;");
              _3=Concurrency.Return(null);
             }
            else
             {
              user2NameText=user2NameOption.$0;
              user2Name.set_Text(user2NameText);
              user2Name["HtmlProvider@33"].RemoveAttribute(user2Name.get_Body(),"style");
              _3=Concurrency.Return(null);
             }
            a2=_3;
            return Concurrency.Combine(a2,Concurrency.Delay(function()
            {
             var a3,_4,user1ImageURL;
             if(user1ImageURLOption.$==0)
              {
               user1Image["HtmlProvider@33"].RemoveAttribute(user1Image.get_Body(),"src");
               _4=Concurrency.Return(null);
              }
             else
              {
               user1ImageURL=user1ImageURLOption.$0;
               user1Image["HtmlProvider@33"].SetAttribute(user1Image.get_Body(),"src",user1ImageURL);
               _4=Concurrency.Return(null);
              }
             a3=_4;
             return Concurrency.Combine(a3,Concurrency.Delay(function()
             {
              var _5,user2ImageURL;
              if(user2ImageURLOption.$==0)
               {
                user2Image["HtmlProvider@33"].RemoveAttribute(user2Image.get_Body(),"src");
                _5=Concurrency.Return(null);
               }
              else
               {
                user2ImageURL=user2ImageURLOption.$0;
                user2Image["HtmlProvider@33"].SetAttribute(user2Image.get_Body(),"src",user2ImageURL);
                _5=Concurrency.Return(null);
               }
              return _5;
             }));
            }));
           }));
          }));
         }
        return _;
       });
      });
      return Concurrency.Start(arg00,{
       $:0
      });
     };
     x8=Piglet.Run(action,x7);
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
        arg10=List.ofArray([userUI(1,x),Operators.add(Tags.Tags().NewTag("div",arg101),List.ofArray([Attr.Attr().NewAttr("class","form-group")])),userUI(2,y),Operators.add(Tags.Tags().NewTag("div",arg103),List.ofArray([Attr.Attr().NewAttr("class","form-group")]))]);
        return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([Attr.Attr().NewAttr("class","form form-inline")]));
       };
      };
     };
     userUI1=Piglet.Render(_arg00_1,x8);
     arg108=List.ofArray([user1Name]);
     arg109=List.ofArray([user1Image,user2Image]);
     arg10a=List.ofArray([user2Name]);
     arg107=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg108),List.ofArray([Attr.Attr().NewAttr("class","col-md-4 col-lg-4 left-name hidden-sm hidden-xs")])),Operators.add(Tags.Tags().NewTag("div",arg109),List.ofArray([Attr.Attr().NewAttr("class","overlapping-images col-md-4 col-lg-4")])),Operators.add(Tags.Tags().NewTag("div",arg10a),List.ofArray([Attr.Attr().NewAttr("class","col-md-4 col-lg-4 right-name hidden-sm hidden-xs")]))]);
     arg10b=List.ofArray([output]);
     arg10c=List.ofArray([tweetThisButton]);
     arg106=List.ofArray([userUI1,Operators.add(Tags.Tags().NewTag("div",arg107),List.ofArray([Attr.Attr().NewAttr("class","row")])),Operators.add(Tags.Tags().NewTag("div",arg10b),List.ofArray([Attr.Attr().NewAttr("class","row")])),Operators.add(Tags.Tags().NewTag("div",arg10c),List.ofArray([Attr.Attr().NewAttr("class","text-center row")]))]);
     return Operators.add(Tags.Tags().NewTag("div",arg106),List.ofArray([Attr.Attr().NewAttr("class","container")]));
    },
    tryItMobile:function()
    {
     var userUI,output,arg105,x3,user1Image,x4,user2Image,tweetThisButton,x5,usernames,_arg00_,x6,x7,userUI1,arg106,arg107,arg108,arg109,arg10a,arg10b;
     userUI=function(i,x)
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
     };
     arg105=Runtime.New(T,{
      $:0
     });
     output=Operators.add(Tags.Tags().NewTag("h5",arg105),List.ofArray([Attr.Attr().NewAttr("class","text-center tweet-text-mobile")]));
     x3=List.ofArray([Attr.Attr().NewAttr("class","img-circle img-left-small"),Attr.Attr().NewAttr("width","96"),Attr.Attr().NewAttr("height","96")]);
     user1Image=Tags.Tags().NewTag("img",x3);
     x4=List.ofArray([Attr.Attr().NewAttr("class","img-circle img-right-small"),Attr.Attr().NewAttr("width","96"),Attr.Attr().NewAttr("height","96")]);
     user2Image=Tags.Tags().NewTag("img",x4);
     tweetThisButton=Client1.tweetButtonTemplate();
     x5=List.ofArray([Attr.Attr().NewAttr("style","display: none;")]);
     usernames=Tags.Tags().NewTag("h6",x5);
     _arg00_=Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Piglet.Return(function(x)
     {
      return function(y)
      {
       return[x,y];
      };
     }),Piglet.Yield("")),Piglet.Yield(""));
     x6=Piglet.WithSubmit(_arg00_);
     x7=Piglet.Run(function(tupledArg)
     {
      var x,y;
      x=tupledArg[0];
      y=tupledArg[1];
      return Concurrency.Start(Concurrency.Delay(function()
      {
       var x1;
       x1=AjaxRemotingProvider.Async("Website:0",[x,y]);
       return Concurrency.Bind(x1,function(_arg1)
       {
        var user2NameOption,user2ImageURLOption,user1NameOption,user1ImageURLOption,tweetTextForLink,tweetText,a,linkURL,arg20;
        tweetThisButton["HtmlProvider@33"].SetAttribute(tweetThisButton.get_Body(),"style","");
        if(_arg1.$==1)
         {
          output.set_Text(_arg1.$0);
          user1Image["HtmlProvider@33"].RemoveAttribute(user1Image.get_Body(),"src");
          usernames["HtmlProvider@33"].SetAttribute(usernames.get_Body(),"style","display: none;");
          user2Image["HtmlProvider@33"].RemoveAttribute(user2Image.get_Body(),"src");
          tweetThisButton["HtmlProvider@33"].SetAttribute(tweetThisButton.get_Body(),"style","display: none;");
          return Concurrency.Return(null);
         }
        else
         {
          user2NameOption=_arg1.$0[4];
          user2ImageURLOption=_arg1.$0[5];
          user1NameOption=_arg1.$0[2];
          user1ImageURLOption=_arg1.$0[3];
          tweetTextForLink=_arg1.$0[1];
          tweetText=_arg1.$0[0];
          output.set_Text(tweetText);
          if(tweetTextForLink.$==0)
           {
            tweetThisButton["HtmlProvider@33"].SetAttribute(tweetThisButton.get_Body(),"disabled","");
            a=Concurrency.Return(null);
           }
          else
           {
            linkURL=tweetTextForLink.$0;
            tweetThisButton["HtmlProvider@33"].RemoveAttribute(tweetThisButton.get_Body(),"disabled");
            tweetThisButton["HtmlProvider@33"].RemoveAttribute(tweetThisButton.get_Body(),"style");
            arg20="https://twitter.com/intent/tweet?text="+linkURL;
            tweetThisButton["HtmlProvider@33"].SetAttribute(tweetThisButton.get_Body(),"href",arg20);
            a=Concurrency.Return(null);
           }
          return Concurrency.Combine(a,Concurrency.Delay(function()
          {
           var matchValue,a1;
           matchValue=[user1NameOption,user2NameOption];
           if(matchValue[0].$==1)
            {
             if(matchValue[1].$==1)
              {
               usernames.set_Text(matchValue[0].$0+" & "+matchValue[1].$0);
               usernames["HtmlProvider@33"].RemoveAttribute(usernames.get_Body(),"style");
               a1=Concurrency.Return(null);
              }
             else
              {
               usernames["HtmlProvider@33"].SetAttribute(usernames.get_Body(),"style","display: none;");
               a1=Concurrency.Return(null);
              }
            }
           else
            {
             usernames["HtmlProvider@33"].SetAttribute(usernames.get_Body(),"style","display: none;");
             a1=Concurrency.Return(null);
            }
           return Concurrency.Combine(a1,Concurrency.Delay(function()
           {
            var _,arg201;
            if(user1ImageURLOption.$==0)
             {
              user1Image["HtmlProvider@33"].RemoveAttribute(user1Image.get_Body(),"src");
              _=Concurrency.Return(null);
             }
            else
             {
              arg201=user1ImageURLOption.$0;
              user1Image["HtmlProvider@33"].SetAttribute(user1Image.get_Body(),"src",arg201);
              _=Concurrency.Return(null);
             }
            return Concurrency.Combine(_,Concurrency.Delay(function()
            {
             var arg202;
             if(user2ImageURLOption.$==0)
              {
               user2Image["HtmlProvider@33"].RemoveAttribute(user2Image.get_Body(),"src");
               return Concurrency.Return(null);
              }
             else
              {
               arg202=user2ImageURLOption.$0;
               user2Image["HtmlProvider@33"].SetAttribute(user2Image.get_Body(),"src",arg202);
               return Concurrency.Return(null);
              }
            }));
           }));
          }));
         }
       });
      }),{
       $:0
      });
     },x6);
     userUI1=Piglet.Render(function(x)
     {
      return function(y)
      {
       return function(submit)
       {
        var arg10,arg101,arg102;
        arg102=List.ofArray([Operators.add(Controls.Submit(submit),List.ofArray([Attr.Attr().NewAttr("class","btn go-button col-xs-12"),Attr.Attr().NewAttr("Value","Go!"),Attr.Attr().NewAttr("id","go-button")]))]);
        arg101=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg102),List.ofArray([Attr.Attr().NewAttr("class","input-group col-xs-12")]))]);
        arg10=List.ofArray([userUI(1,x),userUI(2,y),Operators.add(Tags.Tags().NewTag("div",arg101),List.ofArray([Attr.Attr().NewAttr("class","form-group form-group-mobile")]))]);
        return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([Attr.Attr().NewAttr("class","form form-horizontal form-mobile")]));
       };
      };
     },x7);
     arg108=List.ofArray([user1Image,user2Image]);
     arg109=List.ofArray([usernames]);
     arg107=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg108),List.ofArray([Attr.Attr().NewAttr("class","overlapping-images-small")])),Operators.add(Tags.Tags().NewTag("div",arg109),List.ofArray([Attr.Attr().NewAttr("class","text-center")]))]);
     arg10a=List.ofArray([output]);
     arg10b=List.ofArray([tweetThisButton]);
     arg106=List.ofArray([userUI1,Operators.add(Tags.Tags().NewTag("div",arg107),List.ofArray([Attr.Attr().NewAttr("class","row")])),Operators.add(Tags.Tags().NewTag("div",arg10a),List.ofArray([Attr.Attr().NewAttr("class","row")])),Operators.add(Tags.Tags().NewTag("div",arg10b),List.ofArray([Attr.Attr().NewAttr("class","text-center row")]))]);
     return Operators.add(Tags.Tags().NewTag("div",arg106),List.ofArray([Attr.Attr().NewAttr("class","container tweet-mobile-ui")]));
    },
    tweetButtonTemplate:function()
    {
     var arg10,arg101,arg102;
     arg101=List.ofArray([Attr.Attr().NewAttr("class","fa fa-twitter wow bounceIn")]);
     arg102=List.ofArray([Tags.Tags().text("Tweet this!")]);
     arg10=List.ofArray([Tags.Tags().NewTag("i",arg101),Operators.add(Tags.Tags().NewTag("span",arg102),List.ofArray([Attr.Attr().NewAttr("class","label")]))]);
     return Operators.add(Tags.Tags().NewTag("a",arg10),List.ofArray([Attr.Attr().NewAttr("class","btn btn-lg twitter-button"),Attr.Attr().NewAttr("href","http://www.google.com"),Attr.Attr().NewAttr("style","display: none;"),Attr.Attr().NewAttr("target","_blank")]));
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
  String=Runtime.Safe(Global.String);
  return Pervasives=Runtime.Safe(Piglets.Pervasives);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());
