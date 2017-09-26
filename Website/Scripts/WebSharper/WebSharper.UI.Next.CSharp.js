(function()
{
 "use strict";
 var Global,WebSharper,UI,Next,CSharp,ViewExtensions,DocExtension,Client,Helpers,RouteMapBuilder,RouteItemParsers,View,Doc,Var,List,IntelliFactory,Runtime,RouteMap,Seq,Unchecked,Arrays,Collections,Map,Nullable,Operators,FSharpMap,Option;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 UI=WebSharper.UI=WebSharper.UI||{};
 Next=UI.Next=UI.Next||{};
 CSharp=Next.CSharp=Next.CSharp||{};
 ViewExtensions=CSharp.ViewExtensions=CSharp.ViewExtensions||{};
 DocExtension=CSharp.DocExtension=CSharp.DocExtension||{};
 Client=CSharp.Client=CSharp.Client||{};
 Helpers=Client.Helpers=Client.Helpers||{};
 RouteMapBuilder=Client.RouteMapBuilder=Client.RouteMapBuilder||{};
 RouteItemParsers=Client.RouteItemParsers=Client.RouteItemParsers||{};
 View=Next&&Next.View;
 Doc=Next&&Next.Doc;
 Var=Next&&Next.Var;
 List=WebSharper&&WebSharper.List;
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 RouteMap=Next&&Next.RouteMap;
 Seq=WebSharper&&WebSharper.Seq;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Arrays=WebSharper&&WebSharper.Arrays;
 Collections=WebSharper&&WebSharper.Collections;
 Map=Collections&&Collections.Map;
 Nullable=WebSharper&&WebSharper.Nullable;
 Operators=WebSharper&&WebSharper.Operators;
 FSharpMap=Collections&&Collections.FSharpMap;
 Option=WebSharper&&WebSharper.Option;
 ViewExtensions.UpdateWhile=function(va,a,vb)
 {
  return View.UpdateWhile(a,vb,va);
 };
 DocExtension.DocSeqCached=function(v,f,g)
 {
  return Doc.ConvertSeqBy(f,function(a)
  {
   return function(b)
   {
    return g(a,b);
   };
  },v);
 };
 Helpers.seqRefToListRef=function(l)
 {
  return Var.Lens(l,List.ofSeq,function(a,b)
  {
   return b;
  });
 };
 RouteMapBuilder=Client.RouteMapBuilder=Runtime.Class({
  Install:function()
  {
   var _var,renders;
   function m(f,r)
   {
    return f(function(d)
    {
     return Var.Set(_var,d);
    },r);
   }
   _var=RouteMap.Install(this.ToRouteMap());
   renders=List.map(function($1)
   {
    return function($2)
    {
     return m($1,$2);
    };
   },List.rev(this.renders));
   return Doc.BindView(function(r)
   {
    return Seq.pick(function(f)
    {
     return f(r);
    },renders);
   },_var.v);
  },
  ToRouteMap:function()
  {
   var links,routes;
   links=List.rev(this.links);
   routes=List.rev(this.routes);
   return RouteMap.CreateWithQuery(function(a)
   {
    return Seq.pick(function(f)
    {
     return f(a);
    },links);
   },function(r)
   {
    return Seq.pick(function(f)
    {
     return f(r);
    },routes);
   });
  },
  AddRender:function(r)
  {
   this.renders=new List.T({
    $:1,
    $0:r,
    $1:this.renders
   });
  },
  AddLink:function(l)
  {
   this.links=new List.T({
    $:1,
    $0:l,
    $1:this.links
   });
  },
  AddRoute:function(r)
  {
   this.routes=new List.T({
    $:1,
    $0:r,
    $1:this.routes
   });
  }
 },WebSharper.Obj,RouteMapBuilder);
 RouteMapBuilder.New=Runtime.Ctor(function()
 {
  this.links=List.T.Empty;
  this.routes=List.T.Empty;
  this.renders=List.T.Empty;
 },RouteMapBuilder);
 RouteItemParsers["System.Double"]=function(a)
 {
  var x,m;
  x=a[0];
  return x.$==1?(m=(new Global.RegExp("^[0-9](?:\\.[0-9]*)?$")).exec(x.$0),Unchecked.Equals(m,null)?null:{
   $:1,
   $0:[Global.parseFloat(Arrays.get(m,0)),x.$1]
  }):null;
 };
 RouteItemParsers["System.Int32"]=function(a)
 {
  var x,m;
  x=a[0];
  return x.$==1?(m=(new Global.RegExp("^[0-9]+$")).exec(x.$0),Unchecked.Equals(m,null)?null:{
   $:1,
   $0:[Global.parseInt(Arrays.get(m,0),Global.$1),x.$1]
  }):null;
 };
 RouteItemParsers["System.String"]=function(a)
 {
  var x;
  x=a[0];
  return x.$==1?{
   $:1,
   $0:[x.$0,x.$1]
  }:null;
 };
 RouteItemParsers.MakeLink=function(shape)
 {
  return function(value)
  {
   var map,f;
   function m(name,queryItem,a,link)
   {
    var p,v,m$2,v$1,v$2,v$3;
    return queryItem===0?(p=link(value[name]),(map[0]=Map.FoldBack(function($1,$2,$3)
    {
     return $3.Add($1,$2);
    },p[1],map[0]),p[0])):queryItem===1?(map[0]=(v=List.head((link(value[name]))[0]),map[0].Add(name,v)),List.T.Empty):queryItem===2?(m$2=value[name],m$2!=null&&m$2.$==1?map[0]=(v$1=List.head((link(m$2.$0))[0]),map[0].Add(name,v$1)):void 0,List.T.Empty):queryItem===3?(v$2=value[name],(v$2!=null?map[0]=(v$3=List.head((link(Nullable.get(v$2)))[0]),map[0].Add(name,v$3)):void 0,List.T.Empty)):Operators.FailWith("invalid QueryItem enum value");
   }
   function g(t)
   {
    return t[0];
   }
   function m$1(a,link)
   {
    return function(x)
    {
     return(link(x))[0];
    };
   }
   return shape.$==1?(map=[new FSharpMap.New([])],[List.append(Option.toList(shape.$1),List.ofSeq(Seq.collect(function($1)
   {
    return m($1[0],$1[1],$1[2],$1[3]);
   },shape.$2))),map[0]]):shape.$==2?[new List.T({
    $:1,
    $0:Global.String(Seq.length(value)),
    $1:List.ofSeq(Seq.collect((f=shape.$2,function(x)
    {
     return g(f(x));
    }),value))
   }),new FSharpMap.New([])]:shape.$==3?[List.ofSeq(Seq.concat((((Runtime.Curried3(Seq.map2))(function($1,$2)
   {
    return(function($3)
    {
     return m$1($3[0],$3[1]);
    }($1))($2);
   }))(shape.$0))(value))),new FSharpMap.New([])]:[List.ofArray([Global.String(value)]),new FSharpMap.New([])];
  };
 };
 RouteItemParsers.ParseRoute=function(shape)
 {
  var f,g;
  function b($1,$2)
  {
   return $2.$==0?{
    $:1,
    $0:$1
   }:null;
  }
  f=RouteItemParsers.ParseShape(shape);
  g=function(o)
  {
   return o==null?null:b.apply(null,o.$0);
  };
  return function(x)
  {
   return g(f(x));
  };
 };
 RouteItemParsers.ParseShape=function(shape)
 {
  return function(t)
  {
   var path,query,$1,fromArray,parseItem,o,length,rest,arr,t$1,o$1;
   function parseArgs(init,rest$1,args)
   {
    var v,o$2;
    function f$1(rest$2,t$2)
    {
     var name,queryItem,parse,rest$3,m,m$1,m$2,m$3,m$4,m$5;
     name=t$2[0];
     queryItem=t$2[1];
     parse=t$2[2];
     return rest$2!=null&&rest$2.$==1?(rest$3=rest$2.$0,queryItem===0?(m=parse([rest$3,query]),m!=null&&m.$==1?(v[name]=m.$0[0],{
      $:1,
      $0:m.$0[1]
     }):null):queryItem===1?(m$1=Map.TryFind(name,query),m$1==null?null:(v[name]=m$1.$0,{
      $:1,
      $0:rest$3
     })):queryItem===2?(m$2=Map.TryFind(name,query),m$2!=null&&m$2.$==1?(m$3=parse([List.ofArray([m$2.$0]),new FSharpMap.New([])]),m$3!=null&&m$3.$==1?(v[name]={
      $:1,
      $0:m$3.$0[0]
     },{
      $:1,
      $0:rest$3
     }):null):(v[name]=null,{
      $:1,
      $0:rest$3
     })):queryItem===3?(m$4=Map.TryFind(name,query),m$4!=null&&m$4.$==1?(m$5=parse([List.ofArray([m$4.$0]),new FSharpMap.New([])]),m$5!=null&&m$5.$==1?(v[name]=m$5.$0[0],{
      $:1,
      $0:rest$3
     }):null):(v[name]=null,{
      $:1,
      $0:rest$3
     })):Operators.FailWith("invalid QueryItem enum value")):null;
    }
    v=init();
    o$2=(((Runtime.Curried3(Arrays.fold))(f$1))({
     $:1,
     $0:rest$1
    }))(args);
    return o$2==null?null:{
     $:1,
     $0:[v,o$2.$0]
    };
   }
   function f(rest$1,t$2)
   {
    var o$2,parsed,rest$2;
    return rest$1==null?null:(o$2=t$2[0]([rest$1.$0,query]),o$2==null?null:{
     $:1,
     $0:(parsed=o$2.$0[0],(rest$2=o$2.$0[1],(t$1.push(parsed),rest$2)))
    });
   }
   path=t[0];
   query=t[1];
   return shape.$==1?shape.$1==null?parseArgs(shape.$0,path,shape.$2):path.$==1&&(path.$0===shape.$1.$0&&($1=[path.$1,path.$0],true))?parseArgs(shape.$0,$1[0],shape.$2):null:shape.$==2?(fromArray=shape.$0,(parseItem=shape.$1,(o=RouteItemParsers["System.Int32"]([path,query]),o==null?null:(length=o.$0[0],(rest=o.$0[1],(arr=Arrays.create(length,null),function(i,rest$1)
   {
    var m;
    while(true)
     if(i===length)
      return{
       $:1,
       $0:[fromArray(arr),rest$1]
      };
     else
      {
       m=parseItem([rest$1,query]);
       if(m!=null&&m.$==1)
        {
         Arrays.set(arr,i,m.$0[0]);
         i=i+1;
         rest$1=m.$0[1];
        }
       else
        return null;
      }
   }(0,rest))))))):shape.$==3?(t$1=[],(o$1=(((Runtime.Curried3(Arrays.fold))(f))({
    $:1,
    $0:path
   }))(shape.$0),o$1==null?null:{
    $:1,
    $0:[t$1,o$1.$0]
   })):shape.$0([path,query]);
  };
 };
}());
