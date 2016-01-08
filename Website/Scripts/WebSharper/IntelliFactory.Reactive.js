(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,IntelliFactory,Reactive,Disposable,HotStream,Control,FSharpEvent,Observer,Observable,Util,Collections,Dictionary,Ref,Seq,Reactive1,Reactive2,List,T;
 Runtime.Define(Global,{
  IntelliFactory:{
   Reactive:{
    Disposable:Runtime.Class({
     Dispose:function()
     {
      return this.Dispose1.call(null,null);
     }
    },{
     New:function(d)
     {
      return Runtime.New(Disposable,{
       Dispose1:d
      });
     }
    }),
    HotStream:Runtime.Class({
     Subscribe:function(o)
     {
      this.Latest[0].$==1?o.OnNext(this.Latest[0].$0):null;
      return this.Event.event.Subscribe(o);
     },
     Trigger:function(v)
     {
      this.Latest[0]={
       $:1,
       $0:v
      };
      return this.Event.event.Trigger(v);
     }
    },{
     New:function(x)
     {
      var value;
      value={
       $:1,
       $0:x
      };
      return Runtime.New(HotStream,{
       Latest:[value],
       Event:FSharpEvent.New()
      });
     },
     New1:function()
     {
      return Runtime.New(HotStream,{
       Latest:[{
        $:0
       }],
       Event:FSharpEvent.New()
      });
     }
    }),
    Observable:Runtime.Class({
     Subscribe:function(o)
     {
      return this.OnSubscribe.call(null,o);
     },
     SubscribeWith:function(onNext,onComplete)
     {
      return this.OnSubscribe.call(null,Observer.New(onNext,onComplete));
     }
    },{
     New:function(f)
     {
      return Runtime.New(Observable,{
       OnSubscribe:f
      });
     }
    }),
    Observer:Runtime.Class({
     OnCompleted:function()
     {
      return this.OnCompleted1.call(null,null);
     },
     OnError:function()
     {
      return null;
     },
     OnNext:function(t)
     {
      return this.OnNext1.call(null,t);
     }
    },{
     New:function(onNext,onComplete)
     {
      return Runtime.New(Observer,{
       OnNext1:onNext,
       OnCompleted1:onComplete
      });
     }
    }),
    Reactive:{
     Aggregate:function(io,seed,acc)
     {
      return Observable.New(function(o)
      {
       var state;
       state=[seed];
       return Util.subscribeTo(io,function(value)
       {
        state[0]=(acc(state[0]))(value);
        return o.OnNext(state[0]);
       });
      });
     },
     Choose:function(io,f)
     {
      var arg00;
      arg00=function(o1)
      {
       return Util.subscribeTo(io,function(v)
       {
        var matchValue,_,v1;
        matchValue=f(v);
        if(matchValue.$==0)
         {
          _=null;
         }
        else
         {
          v1=matchValue.$0;
          _=o1.OnNext(v1);
         }
        return _;
       });
      };
      return Observable.New(arg00);
     },
     CollectLatest:function(outer)
     {
      return Observable.New(function(o)
      {
       var dict,index;
       dict=Dictionary.New12();
       index=[0];
       return Util.subscribeTo(outer,function(inner)
       {
        var currentIndex,value;
        Ref.incr(index);
        currentIndex=index[0];
        value=Util.subscribeTo(inner,function(value1)
        {
         var arg00;
         dict.set_Item(currentIndex,value1);
         arg00=Seq.delay(function()
         {
          return Seq.map(function(pair)
          {
           return pair.V;
          },dict);
         });
         return o.OnNext(arg00);
        });
        return;
       });
      });
     },
     CombineLast:function(io1,io2,f)
     {
      var arg00;
      arg00=function(o)
      {
       var lv1s,lv2s,update,onNext,arg10,o1,onNext1,arg101,o2,d1,d2;
       lv1s=[];
       lv2s=[];
       update=function()
       {
        var _,v1,v2;
        if(lv1s.length>0?lv2s.length>0:false)
         {
          v1=lv1s.shift();
          v2=lv2s.shift();
          _=o.OnNext((f(v1))(v2));
         }
        else
         {
          _=null;
         }
        return _;
       };
       onNext=function(x)
       {
        lv1s.push(x);
        return update(null);
       };
       arg10=function()
       {
       };
       o1=Observer.New(onNext,arg10);
       onNext1=function(y)
       {
        lv2s.push(y);
        return update(null);
       };
       arg101=function()
       {
       };
       o2=Observer.New(onNext1,arg101);
       d1=io1.Subscribe(o1);
       d2=io2.Subscribe(o2);
       return Disposable.New(function()
       {
        d1.Dispose();
        return d2.Dispose();
       });
      };
      return Observable.New(arg00);
     },
     CombineLatest:function(io1,io2,f)
     {
      var arg00;
      arg00=function(o)
      {
       var lv1,lv2,update,onNext,arg10,o1,onNext1,arg101,o2,d1,d2;
       lv1=[{
        $:0
       }];
       lv2=[{
        $:0
       }];
       update=function()
       {
        var matchValue,_,_1,v1,v2;
        matchValue=[lv1[0],lv2[0]];
        if(matchValue[0].$==1)
         {
          if(matchValue[1].$==1)
           {
            v1=matchValue[0].$0;
            v2=matchValue[1].$0;
            _1=o.OnNext((f(v1))(v2));
           }
          else
           {
            _1=null;
           }
          _=_1;
         }
        else
         {
          _=null;
         }
        return _;
       };
       onNext=function(x)
       {
        lv1[0]={
         $:1,
         $0:x
        };
        return update(null);
       };
       arg10=function()
       {
       };
       o1=Observer.New(onNext,arg10);
       onNext1=function(y)
       {
        lv2[0]={
         $:1,
         $0:y
        };
        return update(null);
       };
       arg101=function()
       {
       };
       o2=Observer.New(onNext1,arg101);
       d1=io1.Subscribe(o1);
       d2=io2.Subscribe(o2);
       return Disposable.New(function()
       {
        d1.Dispose();
        return d2.Dispose();
       });
      };
      return Observable.New(arg00);
     },
     Concat:function(io1,io2)
     {
      var arg00;
      arg00=function(o)
      {
       var innerDisp,arg001,arg10,arg003,outerDisp;
       innerDisp=[{
        $:0
       }];
       arg001=function(arg002)
       {
        return o.OnNext(arg002);
       };
       arg10=function()
       {
        innerDisp[0]={
         $:1,
         $0:io2.Subscribe(o)
        };
       };
       arg003=Observer.New(arg001,arg10);
       outerDisp=io1.Subscribe(arg003);
       return Disposable.New(function()
       {
        innerDisp[0].$==1?innerDisp[0].$0.Dispose():null;
        return outerDisp.Dispose();
       });
      };
      return Observable.New(arg00);
     },
     Default:Runtime.Field(function()
     {
      return Reactive2.New();
     }),
     Drop:function(io,count)
     {
      var arg00;
      arg00=function(o1)
      {
       var index;
       index=[0];
       return Util.subscribeTo(io,function(v)
       {
        Ref.incr(index);
        return index[0]>count?o1.OnNext(v):null;
       });
      };
      return Observable.New(arg00);
     },
     Heat:function(io)
     {
      var s;
      s=HotStream.New1();
      Util.subscribeTo(io,function(arg00)
      {
       return s.Trigger(arg00);
      });
      return s;
     },
     Merge:function(io1,io2)
     {
      var arg00;
      arg00=function(o)
      {
       var completed1,completed2,arg001,arg10,arg003,disp1,arg004,arg101,arg005,disp2;
       completed1=[false];
       completed2=[false];
       arg001=function(arg002)
       {
        return o.OnNext(arg002);
       };
       arg10=function()
       {
        completed1[0]=true;
        return(completed1[0]?completed2[0]:false)?o.OnCompleted():null;
       };
       arg003=Observer.New(arg001,arg10);
       disp1=io1.Subscribe(arg003);
       arg004=function(arg002)
       {
        return o.OnNext(arg002);
       };
       arg101=function()
       {
        completed2[0]=true;
        return(completed1[0]?completed2[0]:false)?o.OnCompleted():null;
       };
       arg005=Observer.New(arg004,arg101);
       disp2=io2.Subscribe(arg005);
       return Disposable.New(function()
       {
        disp1.Dispose();
        return disp2.Dispose();
       });
      };
      return Observable.New(arg00);
     },
     Never:function()
     {
      return Observable.New(function()
      {
       return Disposable.New(function()
       {
       });
      });
     },
     Range:function(start,count)
     {
      var arg00;
      arg00=function(o)
      {
       var i;
       for(i=start;i<=start+count;i++){
        o.OnNext(i);
       }
       return Disposable.New(function()
       {
       });
      };
      return Observable.New(arg00);
     },
     Reactive:Runtime.Class({
      Aggregate:function(io,s,a)
      {
       return Reactive1.Aggregate(io,s,a);
      },
      Choose:function(io,f)
      {
       return Reactive1.Choose(io,f);
      },
      CollectLatest:function(io)
      {
       return Reactive1.CollectLatest(io);
      },
      CombineLatest:function(io1,io2,f)
      {
       return Reactive1.CombineLatest(io1,io2,f);
      },
      Concat:function(io1,io2)
      {
       return Reactive1.Concat(io1,io2);
      },
      Drop:function(io,count)
      {
       return Reactive1.Drop(io,count);
      },
      Heat:function(io)
      {
       return Reactive1.Heat(io);
      },
      Merge:function(io1,io2)
      {
       return Reactive1.Merge(io1,io2);
      },
      Never:function()
      {
       return Reactive1.Never();
      },
      Return:function(x)
      {
       return Reactive1.Return(x);
      },
      Select:function(io,f)
      {
       return Reactive1.Select(io,f);
      },
      SelectMany:function(io)
      {
       return Reactive1.SelectMany(io);
      },
      Sequence:function(ios)
      {
       return Reactive1.Sequence(ios);
      },
      Switch:function(io)
      {
       return Reactive1.Switch(io);
      },
      Where:function(io,f)
      {
       return Reactive1.Where(io,f);
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      }
     }),
     Return:function(x)
     {
      var f;
      f=function(o)
      {
       o.OnNext(x);
       o.OnCompleted();
       return Disposable.New(function()
       {
       });
      };
      return Observable.New(f);
     },
     Select:function(io,f)
     {
      return Observable.New(function(o1)
      {
       return Util.subscribeTo(io,function(v)
       {
        return o1.OnNext(f(v));
       });
      });
     },
     SelectMany:function(io)
     {
      return Observable.New(function(o)
      {
       var disp,d;
       disp=[function()
       {
       }];
       d=Util.subscribeTo(io,function(o1)
       {
        var d1;
        d1=Util.subscribeTo(o1,function(arg00)
        {
         return o.OnNext(arg00);
        });
        disp[0]=function()
        {
         disp[0].call(null,null);
         return d1.Dispose();
        };
        return;
       });
       return Disposable.New(function()
       {
        disp[0].call(null,null);
        return d.Dispose();
       });
      });
     },
     Sequence:function(ios)
     {
      var sequence;
      sequence=function(ios1)
      {
       var _,xs,x,rest;
       if(ios1.$==1)
        {
         xs=ios1.$1;
         x=ios1.$0;
         rest=sequence(xs);
         _=Reactive1.CombineLatest(x,rest,function(x1)
         {
          return function(y)
          {
           return Runtime.New(T,{
            $:1,
            $0:x1,
            $1:y
           });
          };
         });
        }
       else
        {
         _=Reactive1.Return(Runtime.New(T,{
          $:0
         }));
        }
       return _;
      };
      return Reactive1.Select(sequence(List.ofSeq(ios)),function(source)
      {
       return source;
      });
     },
     Switch:function(io)
     {
      return Observable.New(function(o)
      {
       var index,disp,disp1;
       index=[0];
       disp=[{
        $:0
       }];
       disp1=Util.subscribeTo(io,function(o1)
       {
        var currentIndex,arg0,d;
        Ref.incr(index);
        disp[0].$==1?disp[0].$0.Dispose():null;
        currentIndex=index[0];
        arg0=Util.subscribeTo(o1,function(v)
        {
         return currentIndex===index[0]?o.OnNext(v):null;
        });
        d={
         $:1,
         $0:arg0
        };
        disp[0]=d;
        return;
       });
       return disp1;
      });
     },
     Where:function(io,f)
     {
      var arg00;
      arg00=function(o1)
      {
       return Util.subscribeTo(io,function(v)
       {
        return f(v)?o1.OnNext(v):null;
       });
      };
      return Observable.New(arg00);
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  IntelliFactory=Runtime.Safe(Global.IntelliFactory);
  Reactive=Runtime.Safe(IntelliFactory.Reactive);
  Disposable=Runtime.Safe(Reactive.Disposable);
  HotStream=Runtime.Safe(Reactive.HotStream);
  Control=Runtime.Safe(Global.WebSharper.Control);
  FSharpEvent=Runtime.Safe(Control.FSharpEvent);
  Observer=Runtime.Safe(Reactive.Observer);
  Observable=Runtime.Safe(Reactive.Observable);
  Util=Runtime.Safe(Global.WebSharper.Util);
  Collections=Runtime.Safe(Global.WebSharper.Collections);
  Dictionary=Runtime.Safe(Collections.Dictionary);
  Ref=Runtime.Safe(Global.WebSharper.Ref);
  Seq=Runtime.Safe(Global.WebSharper.Seq);
  Reactive1=Runtime.Safe(Reactive.Reactive);
  Reactive2=Runtime.Safe(Reactive1.Reactive);
  List=Runtime.Safe(Global.WebSharper.List);
  return T=Runtime.Safe(List.T);
 });
 Runtime.OnLoad(function()
 {
  Reactive1.Default();
  return;
 });
}());
