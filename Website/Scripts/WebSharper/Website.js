(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Html,Client,Operators,List,Attr,Tags,String,Piglets,Controls,T,Pervasives,Piglet,Concurrency,Remoting,AjaxRemotingProvider;
 Runtime.Define(Global,{
  Website:{
   Client:{
    Main:function()
    {
     var userUI,x2,output,x3,user1Image,x4,user2Image,_arg00_,x5,x6,userUI1,arg107,arg108,arg109,arg10a,arg10b;
     userUI=function(i,x)
     {
      var arg10,arg101,arg102;
      arg10=List.ofArray([Attr.Attr().NewAttr("class","input-group input-group-lg")]);
      arg101=List.ofArray([Attr.Attr().NewAttr("class","input-group-addon"),Attr.Attr().NewAttr("id","username"+String(i))]);
      arg102="username"+String(i);
      return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([Operators.add(Tags.Tags().NewTag("span",arg101),List.ofArray([Tags.Tags().text("@")])),Operators.add(Controls.input("text",function(x1)
      {
       return x1;
      },function(x1)
      {
       return x1;
      },x),List.ofArray([Attr.Attr().NewAttr("value",""),Attr.Attr().NewAttr("type","text"),Attr.Attr().NewAttr("class","form-control"),Attr.Attr().NewAttr("placeholder","username"),Attr.Attr().NewAttr("aria-describedby",arg102)]))]));
     };
     x2=Runtime.New(T,{
      $:0
     });
     output=Tags.Tags().NewTag("h1",x2);
     x3=Runtime.New(T,{
      $:0
     });
     user1Image=Tags.Tags().NewTag("img",x3);
     x4=Runtime.New(T,{
      $:0
     });
     user2Image=Tags.Tags().NewTag("img",x4);
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
        var c,b,a,_,arg20;
        if(_arg1.$==1)
         {
          output.set_Text(_arg1.$0);
          user1Image["HtmlProvider@33"].RemoveAttribute(user1Image.get_Body(),"src");
          user2Image["HtmlProvider@33"].RemoveAttribute(user2Image.get_Body(),"src");
          return Concurrency.Return(null);
         }
        else
         {
          c=_arg1.$0[2];
          b=_arg1.$0[1];
          a=_arg1.$0[0];
          output.set_Text(a);
          if(b.$==0)
           {
            user1Image["HtmlProvider@33"].RemoveAttribute(user1Image.get_Body(),"src");
            _=Concurrency.Return(null);
           }
          else
           {
            arg20=b.$0;
            user1Image["HtmlProvider@33"].SetAttribute(user1Image.get_Body(),"src",arg20);
            _=Concurrency.Return(null);
           }
          return Concurrency.Combine(_,Concurrency.Delay(function()
          {
           var arg201;
           if(c.$==0)
            {
             user2Image["HtmlProvider@33"].RemoveAttribute(user2Image.get_Body(),"src");
             return Concurrency.Return(null);
            }
           else
            {
             arg201=c.$0;
             user2Image["HtmlProvider@33"].SetAttribute(user2Image.get_Body(),"src",arg201);
             return Concurrency.Return(null);
            }
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
        var arg10,arg101,arg102,arg103,arg104,arg105,arg106;
        arg102=List.ofArray([userUI(1,x)]);
        arg103=List.ofArray([userUI(2,y)]);
        arg101=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg102),List.ofArray([Attr.Attr().NewAttr("class","col-lg-6")])),Operators.add(Tags.Tags().NewTag("div",arg103),List.ofArray([Attr.Attr().NewAttr("class","col-lg-6")]))]);
        arg104=Runtime.New(T,{
         $:0
        });
        arg106=List.ofArray([Operators.add(Controls.Submit(submit),List.ofArray([Attr.Attr().NewAttr("class","btn btn-primary btn-lg"),Attr.Attr().NewAttr("Value","Make the mash-up!")]))]);
        arg105=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg106),List.ofArray([Attr.Attr().NewAttr("class","col-md-6")]))]);
        arg10=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg101),List.ofArray([Attr.Attr().NewAttr("class","row")])),Tags.Tags().NewTag("br",arg104),Operators.add(Tags.Tags().NewTag("div",arg105),List.ofArray([Attr.Attr().NewAttr("class","row")]))]);
        return Tags.Tags().NewTag("div",arg10);
       };
      };
     },x6);
     arg108=Runtime.New(T,{
      $:0
     });
     arg10a=List.ofArray([Operators.add(user1Image,List.ofArray([Attr.Attr().NewAttr("class","img-responsive")]))]);
     arg10b=List.ofArray([Operators.add(user2Image,List.ofArray([Attr.Attr().NewAttr("class","img-responsive")]))]);
     arg109=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg10a),List.ofArray([Attr.Attr().NewAttr("class","col-lg-6")])),Operators.add(Tags.Tags().NewTag("div",arg10b),List.ofArray([Attr.Attr().NewAttr("class","col-lg-6")]))]);
     arg107=List.ofArray([userUI1,Tags.Tags().NewTag("br",arg108),Operators.add(Tags.Tags().NewTag("div",arg109),List.ofArray([Attr.Attr().NewAttr("class","row")])),output]);
     return Tags.Tags().NewTag("div",arg107);
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
  Attr=Runtime.Safe(Client.Attr);
  Tags=Runtime.Safe(Client.Tags);
  String=Runtime.Safe(Global.String);
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
