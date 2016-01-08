(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Html,Client,Operators,List,Attr,Tags,String,Piglets,Controls,T,Concurrency,Remoting,AjaxRemotingProvider,Piglet,Pervasives;
 Runtime.Define(Global,{
  Website:{
   Client:{
    Main:function()
    {
     var userUI,x2,output,action,_arg10_,x3,arg103;
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
     action=function(tupledArg)
     {
      var x,y;
      x=tupledArg[0];
      y=tupledArg[1];
      return Concurrency.Start(Concurrency.Delay(function()
      {
       return Concurrency.Bind(AjaxRemotingProvider.Async("Website:0",[x,y]),function(_arg1)
       {
        output.set_Text(_arg1);
        return Concurrency.Return(null);
       });
      }),{
       $:0
      });
     };
     _arg10_=Piglet.WithSubmit(Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Piglet.Return(function(x)
     {
      return function(y)
      {
       return[x,y];
      };
     }),Piglet.Yield("")),Piglet.Yield("")));
     x3=Piglet.Run(action,_arg10_);
     arg103=List.ofArray([Piglet.Render(function(x)
     {
      return function(y)
      {
       return function(submit)
       {
        var arg10,arg101,arg102,arg104,arg105,arg106,arg107;
        arg102=List.ofArray([userUI(1,x)]);
        arg104=List.ofArray([userUI(2,y)]);
        arg101=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg102),List.ofArray([Attr.Attr().NewAttr("class","col-lg-6")])),Operators.add(Tags.Tags().NewTag("div",arg104),List.ofArray([Attr.Attr().NewAttr("class","col-lg-6")]))]);
        arg105=Runtime.New(T,{
         $:0
        });
        arg107=List.ofArray([Operators.add(Operators.add(Controls.Submit(submit),List.ofArray([Attr.Attr().NewAttr("class","btn btn-primary btn-lg")])),List.ofArray([Tags.Tags().text("Make the mashup!")]))]);
        arg106=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg107),List.ofArray([Attr.Attr().NewAttr("class","col-md-6")]))]);
        arg10=List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg101),List.ofArray([Attr.Attr().NewAttr("class","row")])),Tags.Tags().NewTag("br",arg105),Operators.add(Tags.Tags().NewTag("div",arg106),List.ofArray([Attr.Attr().NewAttr("class","row")]))]);
        return Tags.Tags().NewTag("div",arg10);
       };
      };
     },x3),output]);
     return Tags.Tags().NewTag("div",arg103);
    },
    Start:function(user1,user2,k)
    {
     var arg00;
     arg00=Concurrency.Delay(function()
     {
      return Concurrency.Bind(AjaxRemotingProvider.Async("Website:0",[user1,user2]),function(_arg1)
      {
       return Concurrency.Return(k(_arg1));
      });
     });
     return Concurrency.Start(arg00,{
      $:0
     });
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
  Concurrency=Runtime.Safe(Global.WebSharper.Concurrency);
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
  Piglet=Runtime.Safe(Piglets.Piglet);
  return Pervasives=Runtime.Safe(Piglets.Pervasives);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());
