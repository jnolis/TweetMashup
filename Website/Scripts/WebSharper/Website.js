(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Html,Client,Operators,List,String,Tags,Attr,Piglets,Controls,T,Pervasives,Piglet,Concurrency,Remoting,AjaxRemotingProvider;
 Runtime.Define(Global,{
  Website:{
   Client:{
    Main:function()
    {
     var userUI,output,arg105,user1Image,arg106,user2Image,arg107,tweetThisButton,arg108,x3,user1Name,x4,user2Name,_arg00_,x5,x6,userUI1,arg109,arg10a,arg10b,arg10c,arg10d,arg10e,arg10f;
     userUI=function(i,x)
     {
      var arg10,arg101,x1,arg102,arg103,arg104;
      x1="Username "+String(i);
      arg101=List.ofArray([Tags.Tags().text(x1)]);
      arg102=List.ofArray([Attr.Attr().NewAttr("class","input-group input-group-lg col-md-10 colg")]);
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
     arg106=Runtime.New(T,{
      $:0
     });
     user1Image=Operators.add(Tags.Tags().NewTag("img",arg106),List.ofArray([Attr.Attr().NewAttr("class","img-circle img-left"),Attr.Attr().NewAttr("width","128"),Attr.Attr().NewAttr("height","128")]));
     arg107=Runtime.New(T,{
      $:0
     });
     user2Image=Operators.add(Tags.Tags().NewTag("img",arg107),List.ofArray([Attr.Attr().NewAttr("class","img-circle img-right"),Attr.Attr().NewAttr("width","128"),Attr.Attr().NewAttr("height","128")]));
     arg108=List.ofArray([Tags.Tags().text("Tweet this!")]);
     tweetThisButton=Operators.add(Tags.Tags().NewTag("a",arg108),List.ofArray([Attr.Attr().NewAttr("class","btn btn-primary"),Attr.Attr().NewAttr("href","http://www.google.com"),Attr.Attr().NewAttr("style","display: none;")]));
     x3=Runtime.New(T,{
      $:0
     });
     user1Name=Tags.Tags().NewTag("h4",x3);
     x4=Runtime.New(T,{
      $:0
     });
     user2Name=Tags.Tags().NewTag("h4",x4);
     _arg00_=Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Piglet.Return(function(x)
     {
      return function(y)
      {
       return[x,y];
      };
     }),Piglet.Yield("")),Piglet.Yield(""));
     x5=Piglet.WithSubmit(_arg00_);
     x6=Piglet.Run(function(tupledArg)
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
          user2Image["HtmlProvider@33"].RemoveAttribute(user2Image.get_Body(),"src");
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
            arg20="https://twitter.com/intent/tweet?text="+linkURL;
            tweetThisButton["HtmlProvider@33"].SetAttribute(tweetThisButton.get_Body(),"href",arg20);
            a=Concurrency.Return(null);
           }
          return Concurrency.Combine(a,Concurrency.Delay(function()
          {
           var a1;
           if(user1NameOption.$==0)
            {
             user1Name.set_Text("");
             a1=Concurrency.Return(null);
            }
           else
            {
             user1Name.set_Text(user1NameOption.$0);
             a1=Concurrency.Return(null);
            }
           return Concurrency.Combine(a1,Concurrency.Delay(function()
           {
            var a2;
            if(user2NameOption.$==0)
             {
              user2Name.set_Text("");
              a2=Concurrency.Return(null);
             }
            else
             {
              user2Name.set_Text(user2NameOption.$0);
              a2=Concurrency.Return(null);
             }
            return Concurrency.Combine(a2,Concurrency.Delay(function()
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
          }));
         }
       });
      }),{
       $:0
      });
     },x5);
     userUI1=Piglet.Render(function(x)
     {
      return function(y)
      {
       return function(submit)
       {
        var arg10,arg101,arg102,arg103,arg104;
        arg102=List.ofArray([Tags.Tags().text("&")]);
        arg101=List.ofArray([Tags.Tags().NewTag("h1",arg102)]);
        arg104=List.ofArray([Operators.add(Controls.Submit(submit),List.ofArray([Attr.Attr().NewAttr("class","btn btn-success btn-lg"),Attr.Attr().NewAttr("Value","Go!")]))]);
        arg103=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg104),List.ofArray([Attr.Attr().NewAttr("class","input-group col-md-10")]))]);
        arg10=List.ofArray([userUI(1,x),Operators.add(Tags.Tags().NewTag("div",arg101),List.ofArray([Attr.Attr().NewAttr("class","form-group")])),userUI(2,y),Operators.add(Tags.Tags().NewTag("div",arg103),List.ofArray([Attr.Attr().NewAttr("class","form-group")]))]);
        return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([Attr.Attr().NewAttr("class","form form-inline")]));
       };
      };
     },x6);
     arg10b=List.ofArray([user1Name]);
     arg10c=List.ofArray([user1Image,user2Image]);
     arg10d=List.ofArray([user2Name]);
     arg10a=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg10b),List.ofArray([Attr.Attr().NewAttr("class","col-md-4 col-lg-4 left-name hidden-sm hidden-xs")])),Operators.add(Tags.Tags().NewTag("div",arg10c),List.ofArray([Attr.Attr().NewAttr("class","overlapping-images col-md-4 col-lg-4")])),Operators.add(Tags.Tags().NewTag("div",arg10d),List.ofArray([Attr.Attr().NewAttr("class","col-md-4 col-lg-4 right-name hidden-sm hidden-xs")]))]);
     arg10e=List.ofArray([output]);
     arg10f=List.ofArray([tweetThisButton]);
     arg109=List.ofArray([userUI1,Operators.add(Tags.Tags().NewTag("div",arg10a),List.ofArray([Attr.Attr().NewAttr("class","row")])),Operators.add(Tags.Tags().NewTag("div",arg10e),List.ofArray([Attr.Attr().NewAttr("class","row")])),Operators.add(Tags.Tags().NewTag("div",arg10f),List.ofArray([Attr.Attr().NewAttr("class","row")]))]);
     return Operators.add(Tags.Tags().NewTag("div",arg109),List.ofArray([Attr.Attr().NewAttr("class","container")]));
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
  String=Runtime.Safe(Global.String);
  Tags=Runtime.Safe(Client.Tags);
  Attr=Runtime.Safe(Client.Attr);
  Piglets=Runtime.Safe(Global.WebSharper.Piglets);
  Controls=Runtime.Safe(Piglets.Controls);
  T=Runtime.Safe(List.T);
  Pervasives=Runtime.Safe(Piglets.Pervasives);
  Piglet=Runtime.Safe(Piglets.Piglet);
  Concurrency=Runtime.Safe(Global.WebSharper.Concurrency);
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  return AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());
