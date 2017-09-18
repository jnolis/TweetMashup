(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Concurrency,Array,Arrays,Seq,UI,Next,Abbrev,Fresh,Collections,HashSetProxy,HashSet,Slot1,Unchecked,An,AppendList1,Anims,requestAnimationFrame,Trans,Option,View,Lazy,Array1,Attrs,DomUtility,AttrModule,AttrProxy,List,AnimatedAttrNode,Trans1,DynamicAttrNode,View1,document,Doc,Elt,Seq1,Docs,String,CheckedInput,Mailbox,Operators,T,jQuery,NodeSet,DocElemNode,DomNodes,Easing,Easings,Var,Var1,RegExp,FlowBuilder,Flow,Input,DoubleInterpolation,Key,ListModels,RefImpl1,ListModel1,Storage1,ListModel,Dictionary,Model1,Model,encodeURIComponent,Strings,Route,decodeURIComponent,Routing,Router,Trie1,window,Snap1,Async,Ref,ArrayStorage,LocalStorageBackend,JSON,Char,Submitter,Enumerator,ResizeArray,ResizeArrayProxy,MapModule,FSharpMap,RefImpl;
 Runtime.Define(Global,{
  WebSharper:{
   UI:{
    Next:{
     Abbrev:{
      Async:{
       Schedule:function(f)
       {
        var arg00;
        arg00=Concurrency.Delay(function()
        {
         return Concurrency.Return(f(null));
        });
        return Concurrency.Start(arg00,{
         $:0
        });
       },
       StartTo:function(comp,k)
       {
        return Concurrency.StartWithContinuations(comp,k,function()
        {
        },function()
        {
        },{
         $:0
        });
       }
      },
      Dict:{
       ToKeyArray:function(d)
       {
        var arr,action;
        arr=Array(d.count);
        action=function(i)
        {
         return function(kv)
         {
          return Arrays.set(arr,i,kv.K);
         };
        };
        Seq.iteri(action,d);
        return arr;
       },
       ToValueArray:function(d)
       {
        var arr,action;
        arr=Array(d.count);
        action=function(i)
        {
         return function(kv)
         {
          return Arrays.set(arr,i,kv.V);
         };
        };
        Seq.iteri(action,d);
        return arr;
       }
      },
      Fresh:{
       Id:function()
       {
        var _;
        _=Fresh.counter()+1;
        Fresh.counter=function()
        {
         return _;
        };
        return"uid"+Global.String(Fresh.counter());
       },
       Int:function()
       {
        var _;
        _=Fresh.counter()+1;
        Fresh.counter=function()
        {
         return _;
        };
        return Fresh.counter();
       },
       counter:Runtime.Field(function()
       {
        return 0;
       })
      },
      HashSet:{
       Except:function(excluded,included)
       {
        var set;
        set=HashSetProxy.New(HashSet.ToArray(included));
        set.ExceptWith(HashSet.ToArray(excluded));
        return set;
       },
       Filter:function(ok,set)
       {
        var array;
        array=HashSet.ToArray(set);
        return HashSetProxy.New(Arrays.filter(ok,array));
       },
       Intersect:function(a,b)
       {
        var set;
        set=HashSetProxy.New(HashSet.ToArray(a));
        set.IntersectWith(HashSet.ToArray(b));
        return set;
       },
       ToArray:function(set)
       {
        var arr;
        arr=Array(set.get_Count());
        set.CopyTo(arr);
        return arr;
       }
      },
      Mailbox:{
       StartProcessor:function(proc)
       {
        var mail,isActive,work,start,post;
        mail=[];
        isActive=[false];
        work=Concurrency.Delay(function()
        {
         return Concurrency.Combine(Concurrency.While(function()
         {
          return mail.length>0;
         },Concurrency.Delay(function()
         {
          var msg;
          msg=mail.shift();
          return Concurrency.Bind(proc(msg),function()
          {
           return Concurrency.Return(null);
          });
         })),Concurrency.Delay(function()
         {
          return Concurrency.Return(void(isActive[0]=false));
         }));
        });
        start=function()
        {
         var _;
         if(!isActive[0])
          {
           isActive[0]=true;
           _=Concurrency.Start(work,{
            $:0
           });
          }
         else
          {
           _=null;
          }
         return _;
        };
        post=function(msg)
        {
         mail.push(msg);
         return start(null);
        };
        return post;
       }
      },
      Slot:Runtime.Class({},{
       Create:function(key,value)
       {
        return Slot1.New(key,value);
       }
      }),
      Slot1:Runtime.Class({
       Equals:function(o)
       {
        return Unchecked.Equals(this.key.call(null,this.value),this.key.call(null,o.get_Value()));
       },
       GetHashCode:function()
       {
        return Unchecked.Hash(this.key.call(null,this.value));
       },
       get_Value:function()
       {
        return this.value;
       }
      },{
       New:function(key,value)
       {
        var r;
        r=Runtime.New(this,{});
        r.key=key;
        r.value=value;
        return r;
       }
      })
     },
     An:Runtime.Class({},{
      Append:function(_arg2,_arg1)
      {
       var a,b;
       a=_arg2.$0;
       b=_arg1.$0;
       return Runtime.New(An,{
        $:0,
        $0:AppendList1.Append(a,b)
       });
      },
      Concat:function(xs)
      {
       var _arg00_,arg0;
       _arg00_=Seq.map(function(_arg00_1)
       {
        return Anims.List(_arg00_1);
       },xs);
       arg0=AppendList1.Concat(_arg00_);
       return Runtime.New(An,{
        $:0,
        $0:arg0
       });
      },
      Const:function(v)
      {
       return Anims.Const(v);
      },
      Delayed:function(inter,easing,dur,delay,x,y)
      {
       var Duration;
       Duration=dur+delay;
       return{
        Compute:function(t)
        {
         var _,normalisedTime;
         if(t<=delay)
          {
           _=x;
          }
         else
          {
           normalisedTime=easing.TransformTime.call(null,(t-delay)/dur);
           _=inter.Interpolate(normalisedTime,x,y);
          }
         return _;
        },
        Duration:Duration
       };
      },
      Map:function(f,anim)
      {
       var f1;
       f1=anim.Compute;
       return Anims.Def(anim.Duration,function(x)
       {
        return f(f1(x));
       });
      },
      Pack:function(anim)
      {
       return Runtime.New(An,{
        $:0,
        $0:AppendList1.Single({
         $:1,
         $0:anim
        })
       });
      },
      Play:function(anim)
      {
       return Concurrency.Delay(function()
       {
        var arg00,arg10;
        arg00=function()
        {
        };
        arg10=Anims.Actions(anim);
        return Concurrency.Bind(An.Run(arg00,arg10),function()
        {
         return Concurrency.Return(Anims.Finalize(anim));
        });
       });
      },
      Run:function(k,anim)
      {
       var dur,arg00;
       dur=anim.Duration;
       arg00=function(tupledArg)
       {
        var ok,_arg1,_arg2,loop,value1;
        ok=tupledArg[0];
        _arg1=tupledArg[1];
        _arg2=tupledArg[2];
        loop=function(start,now)
        {
         var t,_,value;
         t=now-start;
         k(anim.Compute.call(null,t));
         if(t<=dur)
          {
           value=requestAnimationFrame(function(t1)
           {
            return loop(start,t1);
           });
           _=void value;
          }
         else
          {
           _=ok(null);
          }
         return _;
        };
        value1=requestAnimationFrame(function(t)
        {
         return loop(t,t);
        });
        return;
       };
       return Concurrency.FromContinuations(arg00);
      },
      Simple:function(inter,easing,dur,x,y)
      {
       return{
        Compute:function(t)
        {
         var t1;
         t1=easing.TransformTime.call(null,t/dur);
         return inter.Interpolate(t1,x,y);
        },
        Duration:dur
       };
      },
      WhenDone:function(f,main)
      {
       var arg00;
       arg00=Runtime.New(An,{
        $:0,
        $0:AppendList1.Single({
         $:0,
         $0:f
        })
       });
       return An.Append(arg00,main);
      },
      get_Empty:function()
      {
       return Runtime.New(An,{
        $:0,
        $0:AppendList1.Empty()
       });
      }
     }),
     AnimatedAttrNode:Runtime.Class({
      GetChangeAnim:function(parent)
      {
       var matchValue,arg00,a=this,arg10,_,_1,_2,l,v,arg001,arg002,arg101,x;
       matchValue=[this.visible,this.logical];
       arg00=function()
       {
        return a.sync(parent);
       };
       if(matchValue[0].$==1)
        {
         if(matchValue[1].$==1)
          {
           matchValue[0].$0;
           matchValue[1].$0;
           if(a.dirty)
            {
             l=matchValue[1].$0;
             v=matchValue[0].$0;
             arg001=a.tr;
             arg002=function(v1)
             {
              return a.pushVisible(parent,v1);
             };
             arg101=Trans.AnimateChange(arg001,v,l);
             x=An.Map(arg002,arg101);
             _2=An.Pack(x);
            }
           else
            {
             _2=An.get_Empty();
            }
           _1=_2;
          }
         else
          {
           _1=An.get_Empty();
          }
         _=_1;
        }
       else
        {
         _=An.get_Empty();
        }
       arg10=_;
       return An.WhenDone(arg00,arg10);
      },
      GetEnterAnim:function(parent)
      {
       var matchValue,arg00,a=this,arg10,_,_1,_2,lo,vi,arg001,arg002,arg101,x,_3,_4,lo1,arg003,arg004,arg102,x1,_5,_6,lo2,arg005,arg006,arg103,x2,_7,_8,lo3,arg007,arg008,arg104,x3;
       matchValue=[this.visible,this.logical];
       arg00=function()
       {
        return a.sync(parent);
       };
       if(matchValue[0].$==1)
        {
         if(matchValue[1].$==1)
          {
           matchValue[0].$0;
           matchValue[1].$0;
           if(a.dirty)
            {
             lo=matchValue[1].$0;
             vi=matchValue[0].$0;
             arg001=a.tr;
             arg002=function(v)
             {
              return a.pushVisible(parent,v);
             };
             arg101=Trans.AnimateChange(arg001,vi,lo);
             x=An.Map(arg002,arg101);
             _2=An.Pack(x);
            }
           else
            {
             if(matchValue[0].$==0)
              {
               if(matchValue[1].$==1)
                {
                 lo1=matchValue[1].$0;
                 arg003=a.tr;
                 arg004=function(v)
                 {
                  return a.pushVisible(parent,v);
                 };
                 arg102=Trans.AnimateEnter(arg003,lo1);
                 x1=An.Map(arg004,arg102);
                 _4=An.Pack(x1);
                }
               else
                {
                 _4=An.get_Empty();
                }
               _3=_4;
              }
             else
              {
               _3=An.get_Empty();
              }
             _2=_3;
            }
           _1=_2;
          }
         else
          {
           if(matchValue[0].$==0)
            {
             if(matchValue[1].$==1)
              {
               lo2=matchValue[1].$0;
               arg005=a.tr;
               arg006=function(v)
               {
                return a.pushVisible(parent,v);
               };
               arg103=Trans.AnimateEnter(arg005,lo2);
               x2=An.Map(arg006,arg103);
               _6=An.Pack(x2);
              }
             else
              {
               _6=An.get_Empty();
              }
             _5=_6;
            }
           else
            {
             _5=An.get_Empty();
            }
           _1=_5;
          }
         _=_1;
        }
       else
        {
         if(matchValue[0].$==0)
          {
           if(matchValue[1].$==1)
            {
             lo3=matchValue[1].$0;
             arg007=a.tr;
             arg008=function(v)
             {
              return a.pushVisible(parent,v);
             };
             arg104=Trans.AnimateEnter(arg007,lo3);
             x3=An.Map(arg008,arg104);
             _8=An.Pack(x3);
            }
           else
            {
             _8=An.get_Empty();
            }
           _7=_8;
          }
         else
          {
           _7=An.get_Empty();
          }
         _=_7;
        }
       arg10=_;
       return An.WhenDone(arg00,arg10);
      },
      GetExitAnim:function(parent)
      {
       var matchValue,arg00,a=this,arg10,_,cur,arg001,arg002,arg101,x;
       matchValue=this.visible;
       arg00=function()
       {
        a.dirty=true;
        a.visible={
         $:0
        };
        return;
       };
       if(matchValue.$==1)
        {
         cur=matchValue.$0;
         arg001=a.tr;
         arg002=function(v)
         {
          return a.pushVisible(parent,v);
         };
         arg101=Trans.AnimateExit(arg001,cur);
         x=An.Map(arg002,arg101);
         _=An.Pack(x);
        }
       else
        {
         _=An.get_Empty();
        }
       arg10=_;
       return An.WhenDone(arg00,arg10);
      },
      Init:function()
      {
       return null;
      },
      Sync:function()
      {
       return null;
      },
      get_Changed:function()
      {
       return this.updates;
      },
      pushVisible:function(el,v)
      {
       this.visible={
        $:1,
        $0:v
       };
       this.dirty=true;
       return(this.push.call(null,el))(v);
      },
      sync:function(p)
      {
       var _;
       if(this.dirty)
        {
         Option.iter(this.push.call(null,p),this.logical);
         this.visible=this.logical;
         _=void(this.dirty=false);
        }
       else
        {
         _=null;
        }
       return _;
      }
     },{
      New:function(tr,view,push)
      {
       var r,arg00;
       r=Runtime.New(this,{});
       r.tr=tr;
       r.push=push;
       r.logical={
        $:0
       };
       r.visible={
        $:0
       };
       r.dirty=true;
       arg00=function(x)
       {
        r.logical={
         $:1,
         $0:x
        };
        r.dirty=true;
        return;
       };
       r.updates=View.Map(arg00,view);
       return r;
      }
     }),
     Anims:{
      Actions:function(_arg1)
      {
       var all,chooser,array,xs;
       all=_arg1.$0;
       chooser=function(_arg2)
       {
        var _,w;
        if(_arg2.$==1)
         {
          w=_arg2.$0;
          _={
           $:1,
           $0:w
          };
         }
        else
         {
          _={
           $:0
          };
         }
        return _;
       };
       array=AppendList1.ToArray(all);
       xs=Arrays.choose(chooser,array);
       return Anims.ConcatActions(xs);
      },
      ConcatActions:function(xs)
      {
       var xs1,matchValue,_,mapping,source,dur,xs2;
       xs1=Seq.toArray(xs);
       matchValue=Arrays.length(xs1);
       if(matchValue===0)
        {
         _=Anims.Const(null);
        }
       else
        {
         if(matchValue===1)
          {
           _=Arrays.get(xs1,0);
          }
         else
          {
           mapping=function(anim)
           {
            return anim.Duration;
           };
           source=Seq.map(mapping,xs1);
           dur=Seq.max(source);
           xs2=Arrays.map(function(anim)
           {
            return Anims.Prolong(dur,anim);
           },xs1);
           _=Anims.Def(dur,function(t)
           {
            return Arrays.iter(function(anim)
            {
             return anim.Compute.call(null,t);
            },xs2);
           });
          }
        }
       return _;
      },
      Const:function(v)
      {
       return Anims.Def(0,function()
       {
        return v;
       });
      },
      Def:function(d,f)
      {
       return{
        Compute:f,
        Duration:d
       };
      },
      Finalize:function(_arg1)
      {
       var all,action,array;
       all=_arg1.$0;
       action=function(_arg2)
       {
        var _,f;
        if(_arg2.$==0)
         {
          f=_arg2.$0;
          _=f(null);
         }
        else
         {
          _=null;
         }
        return _;
       };
       array=AppendList1.ToArray(all);
       return Arrays.iter(action,array);
      },
      List:function(_arg1)
      {
       var xs;
       xs=_arg1.$0;
       return xs;
      },
      Prolong:function(nextDuration,anim)
      {
       var comp,dur,last,compute;
       comp=anim.Compute;
       dur=anim.Duration;
       last=Lazy.Create(function()
       {
        return anim.Compute.call(null,anim.Duration);
       });
       compute=function(t)
       {
        return t>=dur?last.eval():comp(t);
       };
       return{
        Compute:compute,
        Duration:nextDuration
       };
      }
     },
     AppendList1:{
      Append:function(x,y)
      {
       var matchValue,_,x1,_1,x2;
       matchValue=[x,y];
       if(matchValue[0].$==0)
        {
         x1=matchValue[1];
         _=x1;
        }
       else
        {
         if(matchValue[1].$==0)
          {
           x2=matchValue[0];
           _1=x2;
          }
         else
          {
           _1={
            $:2,
            $0:x,
            $1:y
           };
          }
         _=_1;
        }
       return _;
      },
      Concat:function(xs)
      {
       var x,f,z,re;
       x=Seq.toArray(xs);
       f=function(x1)
       {
        return x1;
       };
       z=AppendList1.Empty();
       re=function(_arg00_)
       {
        return function(_arg10_)
        {
         return AppendList1.Append(_arg00_,_arg10_);
        };
       };
       return Array1.MapTreeReduce(f,z,re,x);
      },
      Empty:function()
      {
       return{
        $:0
       };
      },
      FromArray:function(xs)
      {
       var matchValue;
       matchValue=xs.length;
       return matchValue===0?{
        $:0
       }:matchValue===1?{
        $:1,
        $0:Arrays.get(xs,0)
       }:{
        $:3,
        $0:xs.slice()
       };
      },
      Single:function(x)
      {
       return{
        $:1,
        $0:x
       };
      },
      ToArray:function(xs)
      {
       var out,loop;
       out=[];
       loop=function(xs1)
       {
        var _,x,y,x1,xs2;
        if(xs1.$==1)
         {
          x=xs1.$0;
          _=out.push(x);
         }
        else
         {
          if(xs1.$==2)
           {
            y=xs1.$1;
            x1=xs1.$0;
            loop(x1);
            _=loop(y);
           }
          else
           {
            if(xs1.$==3)
             {
              xs2=xs1.$0;
              _=Arrays.iter(function(v)
              {
               return out.push(v);
              },xs2);
             }
            else
             {
              _=null;
             }
           }
         }
        return _;
       };
       loop(xs);
       return out.slice(0);
      }
     },
     Array:{
      MapTreeReduce:function(f,z,re,a)
      {
       var loop;
       loop=function(off,len)
       {
        var _,_1,_2,l2,a1,b,l21,a2,b1;
        if(len<=0)
         {
          _=z;
         }
        else
         {
          if(len===1)
           {
            if(off>=0?off<Arrays.length(a):false)
             {
              _2=f(Arrays.get(a,off));
             }
            else
             {
              l2=len/2>>0;
              a1=loop(off,l2);
              b=loop(off+l2,len-l2);
              _2=(re(a1))(b);
             }
            _1=_2;
           }
          else
           {
            l21=len/2>>0;
            a2=loop(off,l21);
            b1=loop(off+l21,len-l21);
            _1=(re(a2))(b1);
           }
          _=_1;
         }
        return _;
       };
       return loop(0,Arrays.length(a));
      }
     },
     AttrModule:{
      Animated:function(name,tr,view,attr)
      {
       return Attrs.Animated(tr,view,function(el)
       {
        return function(v)
        {
         return DomUtility.SetAttr(el,name,attr(v));
        };
       });
      },
      AnimatedStyle:function(name,tr,view,attr)
      {
       return Attrs.Animated(tr,view,function(el)
       {
        return function(v)
        {
         return DomUtility.SetStyle(el,name,attr(v));
        };
       });
      },
      Class:function(name)
      {
       return Attrs.Static(function(el)
       {
        return DomUtility.AddClass(el,name);
       });
      },
      ContentEditableHtml:function(_var)
      {
       var x,arg00;
       x=AttrModule.CustomVar(_var,function(e)
       {
        return function(v)
        {
         e.innerHTML=v;
        };
       },function(e)
       {
        return{
         $:1,
         $0:e.innerHTML
        };
       });
       arg00=AttrProxy.Create("contenteditable","true");
       return AttrProxy.Append(arg00,x);
      },
      ContentEditableText:function(_var)
      {
       var x,arg00;
       x=AttrModule.CustomVar(_var,function(e)
       {
        return function(v)
        {
         e.textContent=v;
        };
       },function(e)
       {
        return{
         $:1,
         $0:e.textContent
        };
       });
       arg00=AttrProxy.Create("contenteditable","true");
       return AttrProxy.Append(arg00,x);
      },
      CustomValue:function(_var,toString,fromString)
      {
       return AttrModule.CustomVar(_var,function(e)
       {
        return function(v)
        {
         e.value=toString(v);
        };
       },function(e)
       {
        return fromString(e.value);
       });
      },
      CustomVar:function(_var,set,get)
      {
       var onChange,set1;
       onChange=function(el)
       {
        return function()
        {
         return _var.UpdateMaybe(function(v)
         {
          var matchValue,_,x,_1;
          matchValue=get(el);
          if(matchValue.$==1)
           {
            x=matchValue.$0;
            if(!Unchecked.Equals(x,v))
             {
              matchValue.$0;
              _1=matchValue;
             }
            else
             {
              _1={
               $:0
              };
             }
            _=_1;
           }
          else
           {
            _={
             $:0
            };
           }
          return _;
         });
        };
       };
       set1=function(e)
       {
        return function(v)
        {
         var matchValue,_,x,_1;
         matchValue=get(e);
         if(matchValue.$==1)
          {
           x=matchValue.$0;
           if(Unchecked.Equals(x,v))
            {
             matchValue.$0;
             _1=null;
            }
           else
            {
             _1=(set(e))(v);
            }
           _=_1;
          }
         else
          {
           _=(set(e))(v);
          }
         return _;
        };
       };
       return AttrProxy.Concat(List.ofArray([AttrModule.Handler("change",onChange),AttrModule.Handler("input",onChange),AttrModule.Handler("keypress",onChange),AttrModule.DynamicCustom(set1,_var.get_View())]));
      },
      Dynamic:function(name,view)
      {
       return Attrs.Dynamic(view,function()
       {
       },function(el)
       {
        return function(v)
        {
         return DomUtility.SetAttr(el,name,v);
        };
       });
      },
      DynamicClass:function(name,view,ok)
      {
       return Attrs.Dynamic(view,function()
       {
       },function(el)
       {
        return function(v)
        {
         return ok(v)?DomUtility.AddClass(el,name):DomUtility.RemoveClass(el,name);
        };
       });
      },
      DynamicCustom:function(set,view)
      {
       return Attrs.Dynamic(view,function()
       {
       },set);
      },
      DynamicPred:function(name,predView,valView)
      {
       var viewFn,arg00,tupleView;
       viewFn=function(el)
       {
        return function(tupledArg)
        {
         var p,v;
         p=tupledArg[0];
         v=tupledArg[1];
         return p?DomUtility.SetAttr(el,name,v):DomUtility.RemoveAttr(el,name);
        };
       };
       arg00=function(pred)
       {
        return function(value)
        {
         return[pred,value];
        };
       };
       tupleView=View.Map2(arg00,predView,valView);
       return Attrs.Dynamic(tupleView,function()
       {
       },viewFn);
      },
      DynamicProp:function(name,view)
      {
       return Attrs.Dynamic(view,function()
       {
       },function(el)
       {
        return function(v)
        {
         el[name]=v;
        };
       });
      },
      DynamicStyle:function(name,view)
      {
       return Attrs.Dynamic(view,function()
       {
       },function(el)
       {
        return function(v)
        {
         return DomUtility.SetStyle(el,name,v);
        };
       });
      },
      Handler:function(name,callback)
      {
       return Attrs.Static(function(el)
       {
        return el.addEventListener(name,callback(el),false);
       });
      },
      HandlerView:function(name,view,callback)
      {
       var id,init,cb;
       id=Fresh.Id();
       init=function(el)
       {
        var callback1;
        callback1=callback(el);
        return el.addEventListener(name,function(ev)
        {
         return(callback1(ev))(el[id]);
        },false);
       };
       cb=function(el)
       {
        return function(x)
        {
         el[id]=x;
        };
       };
       return Attrs.Dynamic(view,init,cb);
      },
      OnAfterRender:function(callback)
      {
       return Attrs.Mk(0,{
        $:4,
        $0:callback
       });
      },
      OnAfterRenderView:function(v,callback)
      {
       var id,arg00,arg10;
       id=Fresh.Id();
       arg00=AttrModule.OnAfterRender(function(el)
       {
        return(callback(el))(el[id]);
       });
       arg10=AttrModule.DynamicCustom(function(el)
       {
        return function(x)
        {
         el[id]=x;
        };
       },v);
       return AttrProxy.Append(arg00,arg10);
      },
      Style:function(name,value)
      {
       return Attrs.Static(function(el)
       {
        return DomUtility.SetStyle(el,name,value);
       });
      },
      ValidateForm:function()
      {
       return AttrModule.OnAfterRender(function(e)
       {
        return Global.H5F?Global.H5F.setup(e):undefined;
       });
      },
      Value:function(_var)
      {
       return AttrModule.CustomValue(_var,function(x)
       {
        return x;
       },function(x)
       {
        return{
         $:1,
         $0:x
        };
       });
      }
     },
     AttrProxy:Runtime.Class({},{
      Append:function(a,b)
      {
       return Attrs.Mk(a.Flags|b.Flags,Attrs.AppendTree(a.Tree,b.Tree));
      },
      Concat:function(xs)
      {
       var x,f,z,re;
       x=Seq.toArray(xs);
       f=function(x1)
       {
        return x1;
       };
       z=AttrProxy.get_Empty();
       re=function(arg00)
       {
        return function(arg10)
        {
         return AttrProxy.Append(arg00,arg10);
        };
       };
       return Array1.MapTreeReduce(f,z,re,x);
      },
      Create:function(name,value)
      {
       return Attrs.Static(function(el)
       {
        return DomUtility.SetAttr(el,name,value);
       });
      },
      Handler:function(event,q)
      {
       return Attrs.Static(function(el)
       {
        return el.addEventListener(event,q(el),false);
       });
      },
      get_Empty:function()
      {
       return Attrs.EmptyAttr();
      }
     }),
     Attrs:{
      Animated:function(tr,view,set)
      {
       var node,flags;
       node=AnimatedAttrNode.New(tr,view,set);
       flags=4;
       Trans1.CanAnimateEnter(tr)?flags=flags|1:null;
       Trans1.CanAnimateExit(tr)?flags=flags|2:null;
       return Attrs.Mk(flags,{
        $:1,
        $0:node
       });
      },
      AppendTree:function(a,b)
      {
       var matchValue,_,x,_1,x1;
       matchValue=[a,b];
       if(matchValue[0].$==0)
        {
         x=matchValue[1];
         _=x;
        }
       else
        {
         if(matchValue[1].$==0)
          {
           x1=matchValue[0];
           _1=x1;
          }
         else
          {
           _1={
            $:2,
            $0:a,
            $1:b
           };
          }
         _=_1;
        }
       return _;
      },
      Dynamic:function(view,init,set)
      {
       var tree;
       tree={
        $:1,
        $0:DynamicAttrNode.New(view,init,set)
       };
       return Attrs.Mk(0,tree);
      },
      EmptyAttr:Runtime.Field(function()
      {
       return Attrs.Mk(0,{
        $:0
       });
      }),
      GetAnim:function(dyn,f)
      {
       var mapping,array,arg00;
       mapping=function(n)
       {
        return(f(n))(dyn.DynElem);
       };
       array=dyn.DynNodes;
       arg00=Arrays.map(mapping,array);
       return An.Concat(arg00);
      },
      GetChangeAnim:function(dyn)
      {
       return Attrs.GetAnim(dyn,function(n)
       {
        return function(arg00)
        {
         return n.GetChangeAnim(arg00);
        };
       });
      },
      GetEnterAnim:function(dyn)
      {
       return Attrs.GetAnim(dyn,function(n)
       {
        return function(arg00)
        {
         return n.GetEnterAnim(arg00);
        };
       });
      },
      GetExitAnim:function(dyn)
      {
       return Attrs.GetAnim(dyn,function(n)
       {
        return function(arg00)
        {
         return n.GetExitAnim(arg00);
        };
       });
      },
      HasChangeAnim:function(attr)
      {
       return(attr.DynFlags&4)!==0;
      },
      HasEnterAnim:function(attr)
      {
       return(attr.DynFlags&1)!==0;
      },
      HasExitAnim:function(attr)
      {
       return(attr.DynFlags&2)!==0;
      },
      Insert:function(elem,tree)
      {
       var nodes,oar,loop,arr;
       nodes=[];
       oar=[];
       loop=function(node)
       {
        var _,n,b,a,mk,cb;
        if(node.$==1)
         {
          n=node.$0;
          n.Init(elem);
          _=nodes.push(n);
         }
        else
         {
          if(node.$==2)
           {
            b=node.$1;
            a=node.$0;
            loop(a);
            _=loop(b);
           }
          else
           {
            if(node.$==3)
             {
              mk=node.$0;
              _=mk(elem);
             }
            else
             {
              if(node.$==4)
               {
                cb=node.$0;
                _=oar.push(cb);
               }
              else
               {
                _=null;
               }
             }
           }
         }
        return _;
       };
       loop(tree.Tree);
       arr=nodes.slice(0);
       return Runtime.DeleteEmptyFields({
        DynElem:elem,
        DynFlags:tree.Flags,
        DynNodes:arr,
        OnAfterRender:(oar.length===0?{
         $:0
        }:{
         $:1,
         $0:function(el)
         {
          return Seq.iter(function(f)
          {
           return f(el);
          },oar);
         }
        }).$0
       },["OnAfterRender"]);
      },
      Mk:function(flags,tree)
      {
       return Runtime.New(AttrProxy,{
        Flags:flags,
        Tree:tree
       });
      },
      Static:function(attr)
      {
       return Attrs.Mk(0,{
        $:3,
        $0:attr
       });
      },
      Sync:function(elem,dyn)
      {
       var action,array;
       action=function(d)
       {
        return d.Sync(elem);
       };
       array=dyn.DynNodes;
       return Arrays.iter(action,array);
      },
      Updates:function(dyn)
      {
       var p,x1,f,z;
       p=function(x)
       {
        return function(y)
        {
         var arg00;
         arg00=function()
         {
          return function()
          {
           return null;
          };
         };
         return View.Map2(arg00,x,y);
        };
       };
       x1=dyn.DynNodes;
       f=function(x)
       {
        return x.get_Changed();
       };
       z=View1.Const(null);
       return Array1.MapTreeReduce(f,z,p,x1);
      }
     },
     CheckedInput:Runtime.Class({
      get_Input:function()
      {
       var _,x,x1,x2;
       if(this.$==1)
        {
         x=this.$0;
         _=x;
        }
       else
        {
         if(this.$==2)
          {
           x1=this.$0;
           _=x1;
          }
         else
          {
           x2=this.$1;
           _=x2;
          }
        }
       return _;
      }
     }),
     Doc:Runtime.Class({
      ReplaceInDom:function(elt)
      {
       var rdelim,value;
       rdelim=document.createTextNode("");
       value=elt.parentNode.replaceChild(rdelim,elt);
       return Doc.RunBefore(rdelim,this);
      },
      get_DocNode:function()
      {
       return this.docNode;
      },
      get_Updates:function()
      {
       return this.updates;
      }
     },{
      Append:function(a,b)
      {
       var arg00,arg10,arg20,x,arg001;
       arg00=function()
       {
        return function()
        {
         return null;
        };
       };
       arg10=a.get_Updates();
       arg20=b.get_Updates();
       x=View.Map2(arg00,arg10,arg20);
       arg001={
        $:0,
        $0:a.get_DocNode(),
        $1:b.get_DocNode()
       };
       return Doc.Mk(arg001,x);
      },
      Async:function(a)
      {
       var arg00,arg10,arg001;
       arg00=function(x)
       {
        return x;
       };
       arg10=View1.Const(a);
       arg001=View.MapAsync(arg00,arg10);
       return Doc.EmbedView(arg001);
      },
      BindView:function(f,view)
      {
       return Doc.EmbedView(View.Map(f,view));
      },
      Button:function(caption,attrs,action)
      {
       var attrs1,el,arg20;
       attrs1=AttrProxy.Concat(attrs);
       el=Doc.Clickable("button",action);
       arg20=Doc.TextNode(caption);
       return Elt.New(el,attrs1,arg20);
      },
      ButtonView:function(caption,attrs,view,action)
      {
       var evAttr,attrs1,arg00,arg20;
       evAttr=AttrModule.HandlerView("click",view,function()
       {
        return function()
        {
         return action;
        };
       });
       attrs1=AttrProxy.Concat(Seq.append([evAttr],attrs));
       arg00=DomUtility.CreateElement("button");
       arg20=Doc.TextNode(caption);
       return Elt.New(arg00,attrs1,arg20);
      },
      CheckBox:function(attrs,chk)
      {
       var el,onClick,attrs1,arg20;
       el=DomUtility.CreateElement("input");
       onClick=function()
       {
        return chk.Set(el.checked);
       };
       el.addEventListener("click",onClick,false);
       attrs1=AttrProxy.Concat(Seq.toList(Seq.delay(function()
       {
        return Seq.append(attrs,Seq.delay(function()
        {
         return Seq.append([AttrProxy.Create("type","checkbox")],Seq.delay(function()
         {
          return[AttrModule.DynamicProp("checked",chk.get_View())];
         }));
        }));
       })));
       arg20=Doc.get_Empty();
       return Elt.New(el,attrs1,arg20);
      },
      CheckBoxGroup:function(attrs,item,chk)
      {
       var rvi,updateList,predicate,arg00,checkedView,arg001,arg10,arg101,attrs1,el,onClick,arg20;
       rvi=chk.get_View();
       updateList=function(chkd)
       {
        return chk.Update(function(obs)
        {
         var obs1,source;
         obs1=chkd?List.append(obs,List.ofArray([item])):List.filter(function(x)
         {
          return!Unchecked.Equals(x,item);
         },obs);
         source=Seq1.distinct(obs1);
         return Seq.toList(source);
        });
       };
       predicate=function(x)
       {
        return Unchecked.Equals(x,item);
       };
       arg00=function(list)
       {
        return Seq.exists(predicate,list);
       };
       checkedView=View.Map(arg00,rvi);
       arg10=chk.get_Id();
       arg101=Fresh.Id();
       arg001=List.append(List.ofArray([AttrProxy.Create("type","checkbox"),AttrProxy.Create("name",arg10),AttrProxy.Create("value",arg101),AttrModule.DynamicProp("checked",checkedView)]),List.ofSeq(attrs));
       attrs1=AttrProxy.Concat(arg001);
       el=DomUtility.CreateElement("input");
       onClick=function()
       {
        var chkd;
        chkd=el.checked;
        return updateList(chkd);
       };
       el.addEventListener("click",onClick,false);
       arg20=Doc.get_Empty();
       return Elt.New(el,attrs1,arg20);
      },
      Clickable:function(elem,action)
      {
       var el;
       el=DomUtility.CreateElement(elem);
       el.addEventListener("click",function(ev)
       {
        ev.preventDefault();
        return action(null);
       },false);
       return el;
      },
      Concat:function(xs)
      {
       var x,f,z,re;
       x=Seq.toArray(xs);
       f=function(x1)
       {
        return x1;
       };
       z=Doc.get_Empty();
       re=function(arg00)
       {
        return function(arg10)
        {
         return Doc.Append(arg00,arg10);
        };
       };
       return Array1.MapTreeReduce(f,z,re,x);
      },
      Convert:function(render,view)
      {
       var arg00;
       arg00=View.MapSeqCached(render,view);
       return Doc.Flatten(arg00);
      },
      ConvertBy:function(key,render,view)
      {
       var arg00;
       arg00=View.MapSeqCachedBy(key,render,view);
       return Doc.Flatten(arg00);
      },
      ConvertSeq:function(render,view)
      {
       var arg00;
       arg00=View.MapSeqCachedView(render,view);
       return Doc.Flatten(arg00);
      },
      ConvertSeqBy:function(key,render,view)
      {
       var arg00;
       arg00=View.MapSeqCachedViewBy(key,render,view);
       return Doc.Flatten(arg00);
      },
      Element:function(name,attr,children)
      {
       var attr1,children1,arg00;
       attr1=AttrProxy.Concat(attr);
       children1=Doc.Concat(children);
       arg00=DomUtility.CreateElement(name);
       return Elt.New(arg00,attr1,children1);
      },
      EmbedView:function(view)
      {
       var node,arg00,arg001,arg10,x,arg002;
       node=Docs.CreateEmbedNode();
       arg00=function(doc)
       {
        Docs.UpdateEmbedNode(node,doc.get_DocNode());
        return doc.get_Updates();
       };
       arg001=function()
       {
       };
       arg10=View1.Bind(arg00,view);
       x=View.Map(arg001,arg10);
       arg002={
        $:2,
        $0:node
       };
       return Doc.Mk(arg002,x);
      },
      Flatten:function(view)
      {
       var arg00,arg002;
       arg00=function(arg001)
       {
        return Doc.Concat(arg001);
       };
       arg002=View.Map(arg00,view);
       return Doc.EmbedView(arg002);
      },
      FloatInput:function(attr,_var)
      {
       var parseCheckedFloat,arg10;
       parseCheckedFloat=function(el)
       {
        return function(s)
        {
         var arg0,_,i;
         if(String.isBlank(s))
          {
           _=(el.checkValidity?el.checkValidity():true)?Runtime.New(CheckedInput,{
            $:2,
            $0:s
           }):Runtime.New(CheckedInput,{
            $:1,
            $0:s
           });
          }
         else
          {
           i=+s;
           _=Global.isNaN(i)?Runtime.New(CheckedInput,{
            $:1,
            $0:s
           }):Runtime.New(CheckedInput,{
            $:0,
            $0:i,
            $1:s
           });
          }
         arg0=_;
         return{
          $:1,
          $0:arg0
         };
        };
       };
       arg10=function(el)
       {
        return Seq.append(attr,[AttrModule.CustomValue(_var,function(i)
        {
         return i.get_Input();
        },parseCheckedFloat(el)),AttrProxy.Create("type","number")]);
       };
       return Doc.InputInternal("input",arg10);
      },
      FloatInputUnchecked:function(attr,_var)
      {
       var parseFloat,arg10;
       parseFloat=function(s)
       {
        var _,pd;
        if(String.isBlank(s))
         {
          _={
           $:1,
           $0:0
          };
         }
        else
         {
          pd=+s;
          _=Global.isNaN(pd)?{
           $:0
          }:{
           $:1,
           $0:pd
          };
         }
        return _;
       };
       arg10=function()
       {
        return Seq.append(attr,[_var.Get()===0?AttrProxy.Create("value","0"):AttrProxy.get_Empty(),AttrModule.CustomValue(_var,function(value)
        {
         return Global.String(value);
        },parseFloat),AttrProxy.Create("type","number")]);
       };
       return Doc.InputInternal("input",arg10);
      },
      Input:function(attr,_var)
      {
       var arg10;
       arg10=function()
       {
        return Seq.append(attr,[AttrModule.Value(_var)]);
       };
       return Doc.InputInternal("input",arg10);
      },
      InputArea:function(attr,_var)
      {
       var arg10;
       arg10=function()
       {
        return Seq.append(attr,[AttrModule.Value(_var)]);
       };
       return Doc.InputInternal("textarea",arg10);
      },
      InputInternal:function(elemTy,attr)
      {
       var el,arg10,arg20;
       el=DomUtility.CreateElement(elemTy);
       arg10=AttrProxy.Concat(attr(el));
       arg20=Doc.get_Empty();
       return Elt.New(el,arg10,arg20);
      },
      IntInput:function(attr,_var)
      {
       var parseCheckedInt,arg10;
       parseCheckedInt=function(el)
       {
        return function(s)
        {
         var arg0,_,i;
         if(String.isBlank(s))
          {
           _=(el.checkValidity?el.checkValidity():true)?Runtime.New(CheckedInput,{
            $:2,
            $0:s
           }):Runtime.New(CheckedInput,{
            $:1,
            $0:s
           });
          }
         else
          {
           i=+s;
           _=Global.isNaN(i)?Runtime.New(CheckedInput,{
            $:1,
            $0:s
           }):Runtime.New(CheckedInput,{
            $:0,
            $0:i,
            $1:s
           });
          }
         arg0=_;
         return{
          $:1,
          $0:arg0
         };
        };
       };
       arg10=function(el)
       {
        return Seq.append(attr,[AttrModule.CustomValue(_var,function(i)
        {
         return i.get_Input();
        },parseCheckedInt(el)),AttrProxy.Create("type","number"),AttrProxy.Create("step","1")]);
       };
       return Doc.InputInternal("input",arg10);
      },
      IntInputUnchecked:function(attr,_var)
      {
       var parseInt,arg10;
       parseInt=function(s)
       {
        var _,pd;
        if(String.isBlank(s))
         {
          _={
           $:1,
           $0:0
          };
         }
        else
         {
          pd=+s;
          _=pd!==pd>>0?{
           $:0
          }:{
           $:1,
           $0:pd
          };
         }
        return _;
       };
       arg10=function()
       {
        return Seq.append(attr,[_var.Get()===0?AttrProxy.Create("value","0"):AttrProxy.get_Empty(),AttrModule.CustomValue(_var,function(value)
        {
         return Global.String(value);
        },parseInt),AttrProxy.Create("type","number"),AttrProxy.Create("step","1")]);
       };
       return Doc.InputInternal("input",arg10);
      },
      Link:function(caption,attrs,action)
      {
       var x,arg00,attrs1,el,arg20;
       x=AttrProxy.Concat(attrs);
       arg00=AttrProxy.Create("href","#");
       attrs1=AttrProxy.Append(arg00,x);
       el=Doc.Clickable("a",action);
       arg20=Doc.TextNode(caption);
       return Elt.New(el,attrs1,arg20);
      },
      LinkView:function(caption,attrs,view,action)
      {
       var evAttr,attrs1,arg00,arg20;
       evAttr=AttrModule.HandlerView("click",view,function()
       {
        return function()
        {
         return action;
        };
       });
       attrs1=AttrProxy.Concat(Seq.append([evAttr,AttrProxy.Create("href","#")],attrs));
       arg00=DomUtility.CreateElement("a");
       arg20=Doc.TextNode(caption);
       return Elt.New(arg00,attrs1,arg20);
      },
      Mk:function(node,updates)
      {
       return Doc.New(node,updates);
      },
      New:function(docNode,updates)
      {
       var r;
       r=Runtime.New(this,{});
       r.docNode=docNode;
       r.updates=updates;
       return r;
      },
      PasswordBox:function(attr,_var)
      {
       var arg10;
       arg10=function()
       {
        return Seq.append(attr,[AttrModule.Value(_var),AttrProxy.Create("type","password")]);
       };
       return Doc.InputInternal("input",arg10);
      },
      Radio:function(attrs,value,_var)
      {
       var el,arg00,arg10,predView,valAttr,op_EqualsEqualsGreater,arg001,attr,arg20;
       el=DomUtility.CreateElement("input");
       el.addEventListener("click",function()
       {
        return _var.Set(value);
       },false);
       arg00=function(x)
       {
        return Unchecked.Equals(x,value);
       };
       arg10=_var.get_View();
       predView=View.Map(arg00,arg10);
       valAttr=AttrModule.DynamicProp("checked",predView);
       op_EqualsEqualsGreater=function(k,v)
       {
        return AttrProxy.Create(k,v);
       };
       arg001=List.append(List.ofArray([op_EqualsEqualsGreater("type","radio"),op_EqualsEqualsGreater("name",_var.get_Id()),valAttr]),List.ofSeq(attrs));
       attr=AttrProxy.Concat(arg001);
       arg20=Doc.get_Empty();
       return Elt.New(el,attr,arg20);
      },
      Run:function(parent,doc)
      {
       var d,st,p,arg10;
       d=doc.get_DocNode();
       Docs.LinkElement(parent,d);
       st=Docs.CreateRunState(parent,d);
       p=Mailbox.StartProcessor(function()
       {
        return Docs.PerformAnimatedUpdate(st,d);
       });
       arg10=doc.get_Updates();
       return View1.Sink(p,arg10);
      },
      RunAfter:function(ldelim,doc)
      {
       var rdelim,value;
       rdelim=document.createTextNode("");
       value=ldelim.parentNode.insertBefore(rdelim,ldelim.nextSibling);
       return Doc.RunBetween(ldelim,rdelim,doc);
      },
      RunAfterById:function(id,doc)
      {
       var matchValue;
       matchValue=DomUtility.Doc().getElementById(id);
       return Unchecked.Equals(matchValue,null)?Operators.FailWith("invalid id: "+id):Doc.RunAfter(matchValue,doc);
      },
      RunAppend:function(parent,doc)
      {
       var rdelim,value;
       rdelim=document.createTextNode("");
       value=parent.appendChild(rdelim);
       return Doc.RunBefore(rdelim,doc);
      },
      RunAppendById:function(id,doc)
      {
       var matchValue;
       matchValue=DomUtility.Doc().getElementById(id);
       return Unchecked.Equals(matchValue,null)?Operators.FailWith("invalid id: "+id):Doc.RunAppend(matchValue,doc);
      },
      RunBefore:function(rdelim,doc)
      {
       var ldelim,value;
       ldelim=document.createTextNode("");
       value=rdelim.parentNode.insertBefore(ldelim,rdelim);
       return Doc.RunBetween(ldelim,rdelim,doc);
      },
      RunBeforeById:function(id,doc)
      {
       var matchValue;
       matchValue=DomUtility.Doc().getElementById(id);
       return Unchecked.Equals(matchValue,null)?Operators.FailWith("invalid id: "+id):Doc.RunBefore(matchValue,doc);
      },
      RunBetween:function(ldelim,rdelim,doc)
      {
       var st,p,arg10;
       Docs.LinkPrevElement(rdelim,doc.get_DocNode());
       st=Docs.CreateDelimitedRunState(ldelim,rdelim,doc.get_DocNode());
       p=Mailbox.StartProcessor(function()
       {
        return Docs.PerformAnimatedUpdate(st,doc.get_DocNode());
       });
       arg10=doc.get_Updates();
       return View1.Sink(p,arg10);
      },
      RunById:function(id,tr)
      {
       var matchValue;
       matchValue=DomUtility.Doc().getElementById(id);
       return Unchecked.Equals(matchValue,null)?Operators.FailWith("invalid id: "+id):Doc.Run(matchValue,tr);
      },
      RunPrepend:function(parent,doc)
      {
       var rdelim,value;
       rdelim=document.createTextNode("");
       value=parent.insertBefore(rdelim,parent.firstChild);
       return Doc.RunBefore(rdelim,doc);
      },
      RunPrependById:function(id,doc)
      {
       var matchValue;
       matchValue=DomUtility.Doc().getElementById(id);
       return Unchecked.Equals(matchValue,null)?Operators.FailWith("invalid id: "+id):Doc.RunPrepend(matchValue,doc);
      },
      Select:function(attrs,show,options,current)
      {
       var arg20;
       arg20=View1.Const(options);
       return Doc.SelectDyn(attrs,show,arg20,current);
      },
      SelectDyn:function(attrs,show,vOptions,current)
      {
       var options,getIndex,getSelectedItem,itemIndex,setSelectedItem,el1,value,selectedItemAttr,onChange,arg00,x2,arg001,optionElements,arg102,x3,arg002,attrs1;
       options=[Runtime.New(T,{
        $:0
       })];
       getIndex=function(el)
       {
        return el.selectedIndex;
       };
       getSelectedItem=function(el)
       {
        var i;
        i=getIndex(el);
        return options[0].get_Item(i);
       };
       itemIndex=function(x)
       {
        return Seq.findIndex(function(y)
        {
         return Unchecked.Equals(x,y);
        },options[0]);
       };
       setSelectedItem=function(el)
       {
        return function(item)
        {
         var i;
         i=itemIndex(item);
         el.selectedIndex=i;
         return;
        };
       };
       el1=DomUtility.CreateElement("select");
       value=current.get_View();
       selectedItemAttr=AttrModule.DynamicCustom(setSelectedItem,value);
       onChange=function()
       {
        return current.UpdateMaybe(function(x1)
        {
         var y;
         y=getSelectedItem(el1);
         return Unchecked.Equals(x1,y)?{
          $:0
         }:{
          $:1,
          $0:y
         };
        });
       };
       el1.addEventListener("change",onChange,false);
       arg00=function(l)
       {
        var mapping;
        options[0]=l;
        mapping=function(i)
        {
         return function(x)
         {
          return[i,x];
         };
        };
        return Seq.mapi(mapping,l);
       };
       x2=View.Map(arg00,vOptions);
       arg001=function(tupledArg)
       {
        var i,o,t,arg10,arg101,arg20;
        i=tupledArg[0];
        o=tupledArg[1];
        t=Doc.TextNode(show(o));
        arg101=Global.String(i);
        arg10=List.ofArray([AttrProxy.Create("value",arg101)]);
        arg20=List.ofArray([t]);
        return Doc.Element("option",arg10,arg20);
       };
       optionElements=Doc.Convert(arg001,x2);
       arg102=AttrProxy.Concat(attrs);
       x3=AttrProxy.Append(selectedItemAttr,arg102);
       arg002=AttrModule.OnAfterRender(function(el)
       {
        return(setSelectedItem(el))(current.Get());
       });
       attrs1=AttrProxy.Append(arg002,x3);
       return Elt.New(el1,attrs1,optionElements);
      },
      SelectDynOptional:function(attrs,noneText,show,vOptions,current)
      {
       var arg10,arg00,arg20;
       arg10=function(_arg2)
       {
        var _,x;
        if(_arg2.$==1)
         {
          x=_arg2.$0;
          _=show(x);
         }
        else
         {
          _=noneText;
         }
        return _;
       };
       arg00=function(options)
       {
        return Runtime.New(T,{
         $:1,
         $0:{
          $:0
         },
         $1:List.map(function(arg0)
         {
          return{
           $:1,
           $0:arg0
          };
         },options)
        });
       };
       arg20=View.Map(arg00,vOptions);
       return Doc.SelectDyn(attrs,arg10,arg20,current);
      },
      SelectOptional:function(attrs,noneText,show,options,current)
      {
       var arg10,arg20;
       arg10=function(_arg1)
       {
        var _,x;
        if(_arg1.$==1)
         {
          x=_arg1.$0;
          _=show(x);
         }
        else
         {
          _=noneText;
         }
        return _;
       };
       arg20=Runtime.New(T,{
        $:1,
        $0:{
         $:0
        },
        $1:List.map(function(arg0)
        {
         return{
          $:1,
          $0:arg0
         };
        },options)
       });
       return Doc.Select(attrs,arg10,arg20,current);
      },
      Static:function(el)
      {
       var arg10,arg20;
       arg10=AttrProxy.get_Empty();
       arg20=Doc.get_Empty();
       return Elt.New(el,arg10,arg20);
      },
      SvgElement:function(name,attr,children)
      {
       var attr1,children1,arg00;
       attr1=AttrProxy.Concat(attr);
       children1=Doc.Concat(children);
       arg00=DomUtility.CreateSvgElement(name);
       return Elt.New(arg00,attr1,children1);
      },
      TextNode:function(v)
      {
       var arg00,arg10;
       arg00={
        $:5,
        $0:DomUtility.CreateText(v)
       };
       arg10=View1.Const(null);
       return Doc.Mk(arg00,arg10);
      },
      TextView:function(txt)
      {
       var node,arg00,x,arg001;
       node=Docs.CreateTextNode();
       arg00=function(t)
       {
        return Docs.UpdateTextNode(node,t);
       };
       x=View.Map(arg00,txt);
       arg001={
        $:4,
        $0:node
       };
       return Doc.Mk(arg001,x);
      },
      Verbatim:function(html)
      {
       var matchValue,a,elem,append,es,arg10;
       matchValue=jQuery.parseHTML(html);
       a=Unchecked.Equals(matchValue,null)?[]:matchValue;
       elem=function(e)
       {
        return{
         $:1,
         $0:Docs.CreateElemNode(e,AttrProxy.get_Empty(),{
          $:3
         })
        };
       };
       append=function(x)
       {
        return function(y)
        {
         return{
          $:0,
          $0:x,
          $1:y
         };
        };
       };
       es=Array1.MapTreeReduce(elem,{
        $:3
       },append,a);
       arg10=View1.Const(null);
       return Doc.Mk(es,arg10);
      },
      get_Empty:function()
      {
       var arg00,arg10;
       arg00={
        $:3
       };
       arg10=View1.Const(null);
       return Doc.Mk(arg00,arg10);
      }
     }),
     DocElemNode:Runtime.Class({
      Equals:function(o)
      {
       return this.ElKey===o.ElKey;
      },
      GetHashCode:function()
      {
       return this.ElKey;
      }
     }),
     Docs:{
      ComputeChangeAnim:function(st,cur)
      {
       var arg00,relevant,arg001,arg101,arg002,mapping,array,x;
       arg00=function(n)
       {
        return Attrs.HasChangeAnim(n.Attr);
       };
       relevant=function(arg10)
       {
        return NodeSet.Filter(arg00,arg10);
       };
       arg001=relevant(st.PreviousNodes);
       arg101=relevant(cur);
       arg002=NodeSet.Intersect(arg001,arg101);
       mapping=function(n)
       {
        return Attrs.GetChangeAnim(n.Attr);
       };
       array=NodeSet.ToArray(arg002);
       x=Arrays.map(mapping,array);
       return An.Concat(x);
      },
      ComputeEnterAnim:function(st,cur)
      {
       var arg00,arg001,arg10,arg002,mapping,array,x;
       arg00=function(n)
       {
        return Attrs.HasEnterAnim(n.Attr);
       };
       arg001=st.PreviousNodes;
       arg10=NodeSet.Filter(arg00,cur);
       arg002=NodeSet.Except(arg001,arg10);
       mapping=function(n)
       {
        return Attrs.GetEnterAnim(n.Attr);
       };
       array=NodeSet.ToArray(arg002);
       x=Arrays.map(mapping,array);
       return An.Concat(x);
      },
      ComputeExitAnim:function(st,cur)
      {
       var arg00,mapping,arg10,arg101,arg001,array,arg002;
       arg00=function(n)
       {
        return Attrs.HasExitAnim(n.Attr);
       };
       mapping=function(n)
       {
        return Attrs.GetExitAnim(n.Attr);
       };
       arg10=st.PreviousNodes;
       arg101=NodeSet.Filter(arg00,arg10);
       arg001=NodeSet.Except(cur,arg101);
       array=NodeSet.ToArray(arg001);
       arg002=Arrays.map(mapping,array);
       return An.Concat(arg002);
      },
      CreateDelimitedElemNode:function(ldelim,rdelim,attr,children)
      {
       var el,attr1;
       el=ldelim.parentNode;
       Docs.LinkPrevElement(rdelim,children);
       attr1=Attrs.Insert(el,attr);
       return Runtime.New(DocElemNode,Runtime.DeleteEmptyFields({
        Attr:attr1,
        Children:children,
        Delimiters:[ldelim,rdelim],
        El:el,
        ElKey:Fresh.Int(),
        Render:Runtime.GetOptional(attr1.OnAfterRender).$0
       },["Render"]));
      },
      CreateDelimitedRunState:function(ldelim,rdelim,doc)
      {
       return{
        PreviousNodes:NodeSet.get_Empty(),
        Top:Docs.CreateDelimitedElemNode(ldelim,rdelim,AttrProxy.get_Empty(),doc)
       };
      },
      CreateElemNode:function(el,attr,children)
      {
       var attr1;
       Docs.LinkElement(el,children);
       attr1=Attrs.Insert(el,attr);
       return Runtime.New(DocElemNode,Runtime.DeleteEmptyFields({
        Attr:attr1,
        Children:children,
        El:el,
        ElKey:Fresh.Int(),
        Render:Runtime.GetOptional(attr1.OnAfterRender).$0
       },["Render"]));
      },
      CreateEmbedNode:function()
      {
       return{
        Current:{
         $:3
        },
        Dirty:false
       };
      },
      CreateRunState:function(parent,doc)
      {
       return{
        PreviousNodes:NodeSet.get_Empty(),
        Top:Docs.CreateElemNode(parent,AttrProxy.get_Empty(),doc)
       };
      },
      CreateTextNode:function()
      {
       return{
        Text:DomUtility.CreateText(""),
        Dirty:false,
        Value:""
       };
      },
      DoSyncElement:function(el)
      {
       var parent,ins,ch,arg00,arg10,arg101,parent1,arg001,arg102,matchValue,pos1,_2,rdelim,value;
       parent=el.El;
       ins=function(doc,pos)
       {
        var _,e,d,_1,t,t1,b,a;
        if(doc.$==1)
         {
          e=doc.$0;
          _={
           $:1,
           $0:e.El
          };
         }
        else
         {
          if(doc.$==2)
           {
            d=doc.$0;
            if(d.Dirty)
             {
              d.Dirty=false;
              _1=Docs.InsertDoc(parent,d.Current,pos);
             }
            else
             {
              _1=ins(d.Current,pos);
             }
            _=_1;
           }
          else
           {
            if(doc.$==3)
             {
              _=pos;
             }
            else
             {
              if(doc.$==4)
               {
                t=doc.$0;
                _={
                 $:1,
                 $0:t.Text
                };
               }
              else
               {
                if(doc.$==5)
                 {
                  t1=doc.$0;
                  _={
                   $:1,
                   $0:t1
                  };
                 }
                else
                 {
                  b=doc.$1;
                  a=doc.$0;
                  _=ins(a,ins(b,pos));
                 }
               }
             }
           }
         }
        return _;
       };
       ch=DomNodes.DocChildren(el);
       arg00=el.El;
       arg10=Runtime.GetOptional(el.Delimiters);
       arg101=DomNodes.Children(arg00,arg10);
       parent1=el.El;
       arg001=function(el1)
       {
        return DomUtility.RemoveNode(parent1,el1);
       };
       arg102=DomNodes.Except(ch,arg101);
       DomNodes.Iter(arg001,arg102);
       matchValue=Runtime.GetOptional(el.Delimiters);
       if(matchValue.$==1)
        {
         rdelim=matchValue.$0[1];
         _2={
          $:1,
          $0:rdelim
         };
        }
       else
        {
         _2={
          $:0
         };
        }
       pos1=_2;
       value=ins(el.Children,pos1);
       return;
      },
      DomNodes:Runtime.Class({},{
       Children:function(elem,delims)
       {
        var _,rdelim,ldelim,a,n,value,objectArg;
        if(delims.$==1)
         {
          rdelim=delims.$0[1];
          ldelim=delims.$0[0];
          a=Array.prototype.constructor.apply(Array,[]);
          n=ldelim.nextSibling;
          while(n!==rdelim)
           {
            value=a.push(n);
            n=n.nextSibling;
           }
          _=Runtime.New(DomNodes,{
           $:0,
           $0:a
          });
         }
        else
         {
          objectArg=elem.childNodes;
          _=Runtime.New(DomNodes,{
           $:0,
           $0:Arrays.init(elem.childNodes.length,function(arg00)
           {
            return objectArg[arg00];
           })
          });
         }
        return _;
       },
       DocChildren:function(node)
       {
        var q,loop;
        q=[];
        loop=function(doc)
        {
         var _,d,e,tn,t,b,a;
         if(doc.$==2)
          {
           d=doc.$0;
           _=loop(d.Current);
          }
         else
          {
           if(doc.$==1)
            {
             e=doc.$0;
             _=q.push(e.El);
            }
           else
            {
             if(doc.$==3)
              {
               _=null;
              }
             else
              {
               if(doc.$==5)
                {
                 tn=doc.$0;
                 _=q.push(tn);
                }
               else
                {
                 if(doc.$==4)
                  {
                   t=doc.$0;
                   _=q.push(t.Text);
                  }
                 else
                  {
                   b=doc.$1;
                   a=doc.$0;
                   loop(a);
                   _=loop(b);
                  }
                }
              }
            }
          }
         return _;
        };
        loop(node.Children);
        return Runtime.New(DomNodes,{
         $:0,
         $0:q.slice(0)
        });
       },
       Except:function(_arg2,_arg1)
       {
        var excluded,included,predicate,arg0;
        excluded=_arg2.$0;
        included=_arg1.$0;
        predicate=function(n)
        {
         var predicate1;
         predicate1=function(k)
         {
          return!(n===k);
         };
         return Seq.forall(predicate1,excluded);
        };
        arg0=Arrays.filter(predicate,included);
        return Runtime.New(DomNodes,{
         $:0,
         $0:arg0
        });
       },
       FoldBack:function(f,_arg4,z)
       {
        var ns;
        ns=_arg4.$0;
        return Arrays.foldBack(f,ns,z);
       },
       Iter:function(f,_arg3)
       {
        var ns;
        ns=_arg3.$0;
        return Arrays.iter(f,ns);
       }
      }),
      InsertDoc:function(parent,doc,pos)
      {
       var _,e,d,t,t1,b,a;
       if(doc.$==1)
        {
         e=doc.$0;
         _=Docs.InsertNode(parent,e.El,pos);
        }
       else
        {
         if(doc.$==2)
          {
           d=doc.$0;
           d.Dirty=false;
           _=Docs.InsertDoc(parent,d.Current,pos);
          }
         else
          {
           if(doc.$==3)
            {
             _=pos;
            }
           else
            {
             if(doc.$==4)
              {
               t=doc.$0;
               _=Docs.InsertNode(parent,t.Text,pos);
              }
             else
              {
               if(doc.$==5)
                {
                 t1=doc.$0;
                 _=Docs.InsertNode(parent,t1,pos);
                }
               else
                {
                 b=doc.$1;
                 a=doc.$0;
                 _=Docs.InsertDoc(parent,a,Docs.InsertDoc(parent,b,pos));
                }
              }
            }
          }
        }
       return _;
      },
      InsertNode:function(parent,node,pos)
      {
       DomUtility.InsertAt(parent,pos,node);
       return{
        $:1,
        $0:node
       };
      },
      LinkElement:function(el,children)
      {
       var value;
       value=Docs.InsertDoc(el,children,{
        $:0
       });
       return;
      },
      LinkPrevElement:function(el,children)
      {
       var value;
       value=Docs.InsertDoc(el.parentNode,children,{
        $:1,
        $0:el
       });
       return;
      },
      NodeSet:Runtime.Class({},{
       Except:function(_arg3,_arg2)
       {
        var excluded,included;
        excluded=_arg3.$0;
        included=_arg2.$0;
        return Runtime.New(NodeSet,{
         $:0,
         $0:HashSet.Except(excluded,included)
        });
       },
       Filter:function(f,_arg1)
       {
        var set;
        set=_arg1.$0;
        return Runtime.New(NodeSet,{
         $:0,
         $0:HashSet.Filter(f,set)
        });
       },
       FindAll:function(doc)
       {
        var q,loop;
        q=[];
        loop=function(node)
        {
         var _,b,a,el,em;
         if(node.$==0)
          {
           b=node.$1;
           a=node.$0;
           loop(a);
           _=loop(b);
          }
         else
          {
           if(node.$==1)
            {
             el=node.$0;
             q.push(el);
             _=loop(el.Children);
            }
           else
            {
             if(node.$==2)
              {
               em=node.$0;
               _=loop(em.Current);
              }
             else
              {
               _=null;
              }
            }
          }
         return _;
        };
        loop(doc);
        return Runtime.New(NodeSet,{
         $:0,
         $0:HashSetProxy.New(q.slice(0))
        });
       },
       Intersect:function(_arg5,_arg4)
       {
        var a,b;
        a=_arg5.$0;
        b=_arg4.$0;
        return Runtime.New(NodeSet,{
         $:0,
         $0:HashSet.Intersect(a,b)
        });
       },
       IsEmpty:function(_arg6)
       {
        var ns;
        ns=_arg6.$0;
        return ns.get_Count()===0;
       },
       ToArray:function(_arg7)
       {
        var ns;
        ns=_arg7.$0;
        return HashSet.ToArray(ns);
       },
       get_Empty:function()
       {
        return Runtime.New(NodeSet,{
         $:0,
         $0:HashSetProxy.New11()
        });
       }
      }),
      PerformAnimatedUpdate:function(st,doc)
      {
       return Concurrency.Delay(function()
       {
        var cur,change,enter,exit;
        cur=NodeSet.FindAll(doc);
        change=Docs.ComputeChangeAnim(st,cur);
        enter=Docs.ComputeEnterAnim(st,cur);
        exit=Docs.ComputeExitAnim(st,cur);
        return Concurrency.Bind(An.Play(An.Append(change,exit)),function()
        {
         Docs.SyncElemNode(st.Top);
         return Concurrency.Bind(An.Play(enter),function()
         {
          return Concurrency.Return(void(st.PreviousNodes=cur));
         });
        });
       });
      },
      Sync:function(doc)
      {
       var sync;
       sync=function(doc1)
       {
        var _,el,n,d,_1,b,a;
        if(doc1.$==1)
         {
          el=doc1.$0;
          Docs.SyncElement(el);
          _=sync(el.Children);
         }
        else
         {
          if(doc1.$==2)
           {
            n=doc1.$0;
            _=sync(n.Current);
           }
          else
           {
            if(doc1.$==3)
             {
              _=null;
             }
            else
             {
              if(doc1.$==5)
               {
                _=null;
               }
              else
               {
                if(doc1.$==4)
                 {
                  d=doc1.$0;
                  if(d.Dirty)
                   {
                    d.Text.nodeValue=d.Value;
                    _1=void(d.Dirty=false);
                   }
                  else
                   {
                    _1=null;
                   }
                  _=_1;
                 }
                else
                 {
                  b=doc1.$1;
                  a=doc1.$0;
                  sync(a);
                  _=sync(b);
                 }
               }
             }
           }
         }
        return _;
       };
       return sync(doc);
      },
      SyncElemNode:function(el)
      {
       Docs.SyncElement(el);
       return Docs.Sync(el.Children);
      },
      SyncElement:function(el)
      {
       var hasDirtyChildren,matchValue,_1,f;
       hasDirtyChildren=function(el1)
       {
        var dirty;
        dirty=function(doc)
        {
         var _,b,a,d;
         if(doc.$==0)
          {
           b=doc.$1;
           a=doc.$0;
           _=dirty(a)?true:dirty(b);
          }
         else
          {
           if(doc.$==2)
            {
             d=doc.$0;
             _=d.Dirty?true:dirty(d.Current);
            }
           else
            {
             _=false;
            }
          }
         return _;
        };
        return dirty(el1.Children);
       };
       Attrs.Sync(el.El,el.Attr);
       hasDirtyChildren(el)?Docs.DoSyncElement(el):null;
       matchValue=Runtime.GetOptional(el.Render);
       if(matchValue.$==1)
        {
         f=matchValue.$0;
         f(el.El);
         _1=void(delete el.Render);
        }
       else
        {
         _1=null;
        }
       return _1;
      },
      UpdateEmbedNode:function(node,upd)
      {
       node.Current=upd;
       node.Dirty=true;
       return;
      },
      UpdateTextNode:function(n,t)
      {
       n.Value=t;
       n.Dirty=true;
       return;
      }
     },
     DomUtility:{
      AddClass:function(element,cl)
      {
       var value;
       value=jQuery(element).addClass(cl);
       return;
      },
      AppendTo:function(ctx,node)
      {
       var value;
       value=ctx.appendChild(node);
       return;
      },
      Clear:function(ctx)
      {
       var value;
       while(ctx.hasChildNodes())
        {
         value=ctx.removeChild(ctx.firstChild);
        }
       return;
      },
      ClearAttrs:function(ctx)
      {
       var value;
       while(ctx.hasAttributes())
        {
         value=ctx.removeAttributeNode(ctx.attributes.item(0));
        }
       return;
      },
      CreateAttr:function(name,value)
      {
       var a;
       a=DomUtility.Doc().createAttribute(name);
       a.value=value;
       return a;
      },
      CreateElement:function(name)
      {
       return DomUtility.Doc().createElement(name);
      },
      CreateSvgElement:function(name)
      {
       return DomUtility.Doc().createElementNS("http://www.w3.org/2000/svg",name);
      },
      CreateText:function(s)
      {
       return DomUtility.Doc().createTextNode(s);
      },
      Doc:Runtime.Field(function()
      {
       return document;
      }),
      InsertAt:function(parent,pos,node)
      {
       var currentPos,canSkip,_,p2,matchValue1,_1,_2,n1,n2,_3,_4,marker,value,value1;
       currentPos=function(node1)
       {
        var matchValue;
        matchValue=node1.nextSibling;
        return Unchecked.Equals(matchValue,null)?{
         $:0
        }:{
         $:1,
         $0:matchValue
        };
       };
       if(node.parentNode===parent)
        {
         p2=currentPos(node);
         matchValue1=[pos,p2];
         if(matchValue1[0].$==1)
          {
           if(matchValue1[1].$==1)
            {
             n1=matchValue1[0].$0;
             n2=matchValue1[1].$0;
             _2=n1===n2;
            }
           else
            {
             _2=false;
            }
           _1=_2;
          }
         else
          {
           _1=matchValue1[1].$==0?true:false;
          }
         _=_1;
        }
       else
        {
         _=false;
        }
       canSkip=_;
       if(!canSkip)
        {
         if(pos.$==1)
          {
           marker=pos.$0;
           value=parent.insertBefore(node,marker);
           _4=void value;
          }
         else
          {
           value1=parent.appendChild(node);
           _4=void value1;
          }
         _3=_4;
        }
       else
        {
         _3=null;
        }
       return _3;
      },
      RemoveAttr:function(el,attrName)
      {
       return el.removeAttribute(attrName);
      },
      RemoveClass:function(element,cl)
      {
       var value;
       value=jQuery(element).removeClass(cl);
       return;
      },
      RemoveNode:function(parent,el)
      {
       var _,value;
       if(el.parentNode===parent)
        {
         value=parent.removeChild(el);
         _=void value;
        }
       else
        {
         _=null;
        }
       return _;
      },
      SetAttr:function(el,name,value)
      {
       return el.setAttribute(name,value);
      },
      SetProperty:function($target,$name,$value)
      {
       var $0=this,$this=this;
       return $target.setProperty($name,$value);
      },
      SetStyle:function(el,name,value)
      {
       return DomUtility.SetProperty(el.style,name,value);
      }
     },
     DoubleInterpolation:Runtime.Class({
      Interpolate:function(t,x,y)
      {
       return x+t*(y-x);
      }
     }),
     DynamicAttrNode:Runtime.Class({
      GetChangeAnim:function()
      {
       return An.get_Empty();
      },
      GetEnterAnim:function()
      {
       return An.get_Empty();
      },
      GetExitAnim:function()
      {
       return An.get_Empty();
      },
      Init:function(parent)
      {
       return this.init.call(null,parent);
      },
      Sync:function(parent)
      {
       var _;
       if(this.dirty)
        {
         (this.push.call(null,parent))(this.value);
         _=void(this.dirty=false);
        }
       else
        {
         _=null;
        }
       return _;
      },
      get_Changed:function()
      {
       return this.updates;
      }
     },{
      New:function(view,init,push)
      {
       var r,arg00;
       r=Runtime.New(this,{});
       r.init=init;
       r.push=push;
       r.value=undefined;
       r.dirty=true;
       arg00=function(x)
       {
        r.value=x;
        r.dirty=true;
        return;
       };
       r.updates=View.Map(arg00,view);
       return r;
      }
     }),
     Easing:Runtime.Class({},{
      Custom:function(f)
      {
       return Runtime.New(Easing,{
        TransformTime:f
       });
      },
      get_CubicInOut:function()
      {
       return Easings.CubicInOut();
      }
     }),
     Easings:{
      CubicInOut:Runtime.Field(function()
      {
       var f;
       f=function(t)
       {
        var t2,t3;
        t2=t*t;
        t3=t2*t;
        return 3*t2-2*t3;
       };
       return Runtime.New(Easing,{
        TransformTime:f
       });
      })
     },
     Elt:Runtime.Class({
      AddClass:function($cls)
      {
       var $this=this;
       return $this.elt.className+=" "+$cls;
      },
      Append:function(doc)
      {
       var e,v,arg00,arg10,arg20,value;
       e=this.get_DocElemNode();
       e.Children={
        $:0,
        $0:e.Children,
        $1:doc.get_DocNode()
       };
       v=this.rvUpdates;
       arg00=function()
       {
        return function()
        {
         return null;
        };
       };
       arg10=Var.Get(this.rvUpdates);
       arg20=doc.get_Updates();
       Var1.Set(v,View.Map2(arg00,arg10,arg20));
       value=Docs.InsertDoc(this.elt,doc.get_DocNode(),{
        $:0
       });
       return;
      },
      Clear:function()
      {
       var value;
       this.get_DocElemNode().Children={
        $:3
       };
       Var1.Set(this.rvUpdates,View1.Const(null));
       while(this.elt.hasChildNodes())
        {
         value=this.elt.removeChild(this.elt.firstChild);
        }
       return;
      },
      GetAttribute:function(name)
      {
       return this.elt.getAttribute(name);
      },
      GetProperty:function(name)
      {
       return this.elt[name];
      },
      GetText:function()
      {
       return this.elt.textContent;
      },
      GetValue:function()
      {
       return this.elt.value;
      },
      HasAttribute:function(name)
      {
       return this.elt.hasAttribute(name);
      },
      HasClass:function(cls)
      {
       return(new RegExp("(\\s|^)"+cls+"(\\s|$)")).test(this.elt.className);
      },
      Html:function()
      {
       return this.elt.outerHTML;
      },
      Id:function()
      {
       return this.elt.id;
      },
      OnAfterRender:function(cb)
      {
       var matchValue,_,f;
       matchValue=Runtime.GetOptional(this.get_DocElemNode().Render);
       if(matchValue.$==1)
        {
         f=matchValue.$0;
         _={
          $:1,
          $0:function(el)
          {
           f(el);
           return cb(el);
          }
         };
        }
       else
        {
         _={
          $:1,
          $0:cb
         };
        }
       Runtime.SetOptional(this.get_DocElemNode(),"Render",_);
       return this;
      },
      OnAfterRenderView:function(view,cb)
      {
       var id,arg00,_this=this;
       id=Fresh.Id();
       arg00=function(x)
       {
        (_this.get_Element())[id]=x;
        return Doc.get_Empty();
       };
       this.Append(Doc.BindView(arg00,view));
       return _this.OnAfterRender(function(e)
       {
        return(cb(e))(e[id]);
       });
      },
      Prepend:function(doc)
      {
       var e,v,arg00,arg10,arg20,matchValue,pos,value;
       e=this.get_DocElemNode();
       e.Children={
        $:0,
        $0:doc.get_DocNode(),
        $1:e.Children
       };
       v=this.rvUpdates;
       arg00=function()
       {
        return function()
        {
         return null;
        };
       };
       arg10=Var.Get(this.rvUpdates);
       arg20=doc.get_Updates();
       Var1.Set(v,View.Map2(arg00,arg10,arg20));
       matchValue=this.elt.firstChild;
       pos=Unchecked.Equals(matchValue,null)?{
        $:0
       }:{
        $:1,
        $0:matchValue
       };
       value=Docs.InsertDoc(this.elt,doc.get_DocNode(),pos);
       return;
      },
      RemoveAttribute:function(name)
      {
       return this.elt.removeAttribute(name);
      },
      RemoveClass:function(cls)
      {
       this.elt.className=this.elt.className.replace(new RegExp("(\\s|^)"+cls+"(\\s|$)")," ");
      },
      SetAttribute:function(name,value)
      {
       return this.elt.setAttribute(name,value);
      },
      SetProperty:function(name,value)
      {
       this.elt[name]=value;
      },
      SetStyle:function(style,value)
      {
       this.elt.style[style]=value;
      },
      SetText:function(v)
      {
       this.get_DocElemNode().Children={
        $:3
       };
       Var1.Set(this.rvUpdates,View1.Const(null));
       this.elt.textContent=v;
       return;
      },
      SetValue:function(v)
      {
       this.elt.value=v;
      },
      get_DocElemNode:function()
      {
       var matchValue,_,e;
       matchValue=this.docNode1;
       if(matchValue.$==1)
        {
         e=matchValue.$0;
         _=e;
        }
       else
        {
         _=Operators.FailWith("Elt: Invalid docNode");
        }
       return _;
      },
      get_Element:function()
      {
       return this.elt;
      },
      on:function(ev,cb)
      {
       this.elt.addEventListener(ev,cb(this.elt),false);
       return this;
      },
      onView:function(ev,view,cb)
      {
       var id,arg00,_this=this;
       id=Fresh.Id();
       arg00=function(x)
       {
        (_this.get_Element())[id]=x;
        return Doc.get_Empty();
       };
       this.Append(Doc.BindView(arg00,view));
       _this.elt.addEventListener(ev,function(ev1)
       {
        return((cb(_this.elt))(ev1))(_this.elt[id]);
       },false);
       return _this;
      }
     },{
      New:function(el,attr,children)
      {
       var node,rvUpdates,attrUpdates,arg00,arg001,arg10,updates;
       node=Docs.CreateElemNode(el,attr,children.get_DocNode());
       rvUpdates=Var.Create(children.get_Updates());
       attrUpdates=Attrs.Updates(node.Attr);
       arg00=function()
       {
        return function()
        {
         return null;
        };
       };
       arg001=function(arg20)
       {
        return View.Map2(arg00,attrUpdates,arg20);
       };
       arg10=rvUpdates.get_View();
       updates=View1.Bind(arg001,arg10);
       return Elt.New1({
        $:1,
        $0:node
       },updates,el,rvUpdates,attrUpdates);
      },
      New1:function(docNode,updates,elt,rvUpdates)
      {
       var r;
       r=Runtime.New(this,Doc.New(docNode,updates));
       r.docNode1=docNode;
       r.elt=elt;
       r.rvUpdates=rvUpdates;
       return r;
      }
     }),
     Flow:Runtime.Class({},{
      Bind:function(m,k)
      {
       return{
        Render:function(_var)
        {
         return function(cont)
         {
          return(m.Render.call(null,_var))(function(r)
          {
           return(k(r).Render.call(null,_var))(cont);
          });
         };
        }
       };
      },
      Map:function(f,x)
      {
       return{
        Render:function(_var)
        {
         return function(cont)
         {
          return(x.Render.call(null,_var))(function(r)
          {
           return cont(f(r));
          });
         };
        }
       };
      },
      Return:function(x)
      {
       return{
        Render:function()
        {
         return function(cont)
         {
          return cont(x);
         };
        }
       };
      },
      get_Do:function()
      {
       return FlowBuilder.New();
      }
     }),
     Flow1:Runtime.Class({},{
      Define:function(f)
      {
       return{
        Render:function(_var)
        {
         return function(cont)
         {
          var arg10;
          arg10=f(cont);
          return Var1.Set(_var,arg10);
         };
        }
       };
      },
      Embed:function(fl)
      {
       var _var;
       _var=Var.Create(Doc.get_Empty());
       (fl.Render.call(null,_var))(function()
       {
       });
       return Doc.EmbedView(_var.get_View());
      },
      Static:function(doc)
      {
       return{
        Render:function(_var)
        {
         return function(cont)
         {
          Var1.Set(_var,doc);
          return cont(null);
         };
        }
       };
      }
     }),
     FlowBuilder:Runtime.Class({
      Bind:function(comp,func)
      {
       return Flow.Bind(comp,func);
      },
      Return:function(value)
      {
       return Flow.Return(value);
      },
      ReturnFrom:function(inner)
      {
       return inner;
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      }
     }),
     Html:{
      attr:Runtime.Class({},{
       New:function()
       {
        return Runtime.New(this,{});
       }
      })
     },
     Input:{
      ActivateButtonListener:Runtime.Field(function()
      {
       var _buttonListener_39_1,_1;
       _buttonListener_39_1=function(evt,down)
       {
        var matchValue,_,arg00,arg001,arg002;
        matchValue=evt.button;
        if(matchValue===0)
         {
          arg00=Input.MouseBtnSt1().Left;
          _=Var1.Set(arg00,down);
         }
        else
         {
          if(matchValue===1)
           {
            arg001=Input.MouseBtnSt1().Middle;
            _=Var1.Set(arg001,down);
           }
          else
           {
            if(matchValue===2)
             {
              arg002=Input.MouseBtnSt1().Right;
              _=Var1.Set(arg002,down);
             }
            else
             {
              _=null;
             }
           }
         }
        return _;
       };
       if(!Input.MouseBtnSt1().Active)
        {
         Input.MouseBtnSt1().Active=true;
         document.addEventListener("mousedown",function(evt)
         {
          return _buttonListener_39_1(evt,true);
         },false);
         _1=document.addEventListener("mouseup",function(evt)
         {
          return _buttonListener_39_1(evt,false);
         },false);
        }
       else
        {
         _1=null;
        }
       return _1;
      }),
      ActivateKeyListener:Runtime.Field(function()
      {
       var _,value,value1;
       if(!Input.KeyListenerState().KeyListenerActive)
        {
         value=jQuery(document).keydown(function(evt)
         {
          var keyCode,arg00,xs;
          keyCode=evt.which;
          arg00=Input.KeyListenerState().LastPressed;
          Var1.Set(arg00,keyCode);
          xs=Var.Get(Input.KeyListenerState().KeysPressed);
          return!Seq.exists(function(x)
          {
           return x===keyCode;
          },xs)?Var1.Set(Input.KeyListenerState().KeysPressed,List.append(xs,List.ofArray([keyCode]))):null;
         });
         value1=jQuery(document).keyup(function(evt)
         {
          var keyCode,arg00,predicate,arg10;
          keyCode=evt.which;
          arg00=Input.KeyListenerState().KeysPressed;
          predicate=function(x)
          {
           return x!==keyCode;
          };
          arg10=function(list)
          {
           return List.filter(predicate,list);
          };
          return Var1.Update(arg00,arg10);
         });
         _=void value1;
        }
       else
        {
         _=null;
        }
       return _;
      }),
      KeyListenerState:Runtime.Field(function()
      {
       return{
        KeysPressed:Var.Create(Runtime.New(T,{
         $:0
        })),
        KeyListenerActive:false,
        LastPressed:Var.Create(-1)
       };
      }),
      Keyboard:Runtime.Class({},{
       IsPressed:function(key)
       {
        var predicate;
        Input.ActivateKeyListener();
        predicate=function(x)
        {
         return x===key;
        };
        return View.Map(function(list)
        {
         return Seq.exists(predicate,list);
        },Input.KeyListenerState().KeysPressed.get_View());
       },
       get_KeysPressed:function()
       {
        Input.ActivateKeyListener();
        return Input.KeyListenerState().KeysPressed.get_View();
       },
       get_LastPressed:function()
       {
        Input.ActivateKeyListener();
        return Input.KeyListenerState().LastPressed.get_View();
       }
      }),
      Mouse:Runtime.Class({},{
       get_LeftPressed:function()
       {
        Input.ActivateButtonListener();
        return Input.MouseBtnSt1().Left.get_View();
       },
       get_MiddlePressed:function()
       {
        Input.ActivateButtonListener();
        return Input.MouseBtnSt1().Middle.get_View();
       },
       get_MousePressed:function()
       {
        Input.ActivateButtonListener();
        return View1.Apply(View1.Apply(View1.Apply(View1.Const(function(l)
        {
         return function(m)
         {
          return function(r)
          {
           return(l?true:m)?true:r;
          };
         };
        }),Input.MouseBtnSt1().Left.get_View()),Input.MouseBtnSt1().Middle.get_View()),Input.MouseBtnSt1().Right.get_View());
       },
       get_Position:function()
       {
        var onMouseMove,_;
        onMouseMove=function(evt)
        {
         var arg00,arg10;
         arg00=Input.MousePosSt1().PosV;
         arg10=[evt.clientX,evt.clientY];
         return Var1.Set(arg00,arg10);
        };
        if(!Input.MousePosSt1().Active)
         {
          document.addEventListener("mousemove",onMouseMove,false);
          _=void(Input.MousePosSt1().Active=true);
         }
        else
         {
          _=null;
         }
        return Input.MousePosSt1().PosV.get_View();
       },
       get_RightPressed:function()
       {
        Input.ActivateButtonListener();
        return Input.MouseBtnSt1().Right.get_View();
       }
      }),
      MouseBtnSt1:Runtime.Field(function()
      {
       return{
        Active:false,
        Left:Var.Create(false),
        Middle:Var.Create(false),
        Right:Var.Create(false)
       };
      }),
      MousePosSt1:Runtime.Field(function()
      {
       return{
        Active:false,
        PosV:Var.Create([0,0])
       };
      })
     },
     Interpolation1:Runtime.Class({},{
      get_Double:function()
      {
       return Runtime.New(DoubleInterpolation,{
        $:0
       });
      }
     }),
     Key:Runtime.Class({},{
      Fresh:function()
      {
       return Runtime.New(Key,{
        $:0,
        $0:Fresh.Int()
       });
      }
     }),
     ListModel:Runtime.Class({
      Add:function(item)
      {
       var v,_,objectArg,index,m=this,objectArg1;
       v=this.Var.get_Value();
       if(!ListModels.Contains(this.get_Key(),item,v))
        {
         objectArg=this.Storage;
         _=this.Var.set_Value(objectArg.Add(item,v));
        }
       else
        {
         index=Arrays.findINdex(function(it)
         {
          return Unchecked.Equals((m.get_Key())(it),(m.get_Key())(item));
         },v);
         objectArg1=m.Storage;
         _=m.Var.set_Value(objectArg1.SetAt(index,item,v));
        }
       return _;
      },
      Clear:function()
      {
       return this.Var.set_Value(this.Storage.Set(Seq.empty()));
      },
      ContainsKey:function(key)
      {
       var m=this;
       return Seq.exists(function(it)
       {
        return Unchecked.Equals(m.key.call(null,it),key);
       },m.Var.get_Value());
      },
      ContainsKeyAsView:function(key)
      {
       var predicate,m=this,arg00,arg10;
       predicate=function(it)
       {
        return Unchecked.Equals(m.key.call(null,it),key);
       };
       arg00=function(array)
       {
        return Seq.exists(predicate,array);
       };
       arg10=m.Var.get_View();
       return View.Map(arg00,arg10);
      },
      Find:function(pred)
      {
       return Arrays.find(pred,this.Var.get_Value());
      },
      FindAsView:function(pred)
      {
       var arg00,arg10;
       arg00=function(array)
       {
        return Arrays.find(pred,array);
       };
       arg10=this.Var.get_View();
       return View.Map(arg00,arg10);
      },
      FindByKey:function(key)
      {
       var m=this;
       return Arrays.find(function(it)
       {
        return Unchecked.Equals(m.key.call(null,it),key);
       },m.Var.get_Value());
      },
      FindByKeyAsView:function(key)
      {
       var predicate,m=this,arg00,arg10;
       predicate=function(it)
       {
        return Unchecked.Equals(m.key.call(null,it),key);
       };
       arg00=function(array)
       {
        return Arrays.find(predicate,array);
       };
       arg10=m.Var.get_View();
       return View.Map(arg00,arg10);
      },
      Iter:function(fn)
      {
       return Arrays.iter(fn,this.Var.get_Value());
      },
      Lens:function(key)
      {
       var arg00,arg10;
       arg00=function(x)
       {
        return x;
       };
       arg10=function()
       {
        return function(x)
        {
         return x;
        };
       };
       return this.LensInto(arg00,arg10,key);
      },
      LensInto:function(get,update,key)
      {
       return RefImpl1.New(this,key,get,update);
      },
      Remove:function(item)
      {
       var v,_,keyFn,k,objectArg,arg00;
       v=this.Var.get_Value();
       if(ListModels.Contains(this.key,item,v))
        {
         keyFn=this.key;
         k=keyFn(item);
         objectArg=this.Storage;
         arg00=function(i)
         {
          return!Unchecked.Equals(keyFn(i),k);
         };
         _=this.Var.set_Value(objectArg.RemoveIf(arg00,v));
        }
       else
        {
         _=null;
        }
       return _;
      },
      RemoveBy:function(f)
      {
       var objectArg,arg00,arg10;
       objectArg=this.Storage;
       arg00=function(x)
       {
        var value;
        value=f(x);
        return!value;
       };
       arg10=this.Var.get_Value();
       return this.Var.set_Value(objectArg.RemoveIf(arg00,arg10));
      },
      RemoveByKey:function(key)
      {
       var objectArg,arg00,m=this,arg10;
       objectArg=this.Storage;
       arg00=function(i)
       {
        return!Unchecked.Equals((m.get_Key())(i),key);
       };
       arg10=m.Var.get_Value();
       return this.Var.set_Value(objectArg.RemoveIf(arg00,arg10));
      },
      Set:function(lst)
      {
       return this.Var.set_Value(this.Storage.Set(lst));
      },
      TryFind:function(pred)
      {
       return Arrays.tryFind(pred,this.Var.get_Value());
      },
      TryFindAsView:function(pred)
      {
       var arg00,arg10;
       arg00=function(array)
       {
        return Arrays.tryFind(pred,array);
       };
       arg10=this.Var.get_View();
       return View.Map(arg00,arg10);
      },
      TryFindByKey:function(key)
      {
       var m=this;
       return Arrays.tryFind(function(it)
       {
        return Unchecked.Equals(m.key.call(null,it),key);
       },m.Var.get_Value());
      },
      TryFindByKeyAsView:function(key)
      {
       var predicate,m=this,arg00,arg10;
       predicate=function(it)
       {
        return Unchecked.Equals(m.key.call(null,it),key);
       };
       arg00=function(array)
       {
        return Arrays.tryFind(predicate,array);
       };
       arg10=m.Var.get_View();
       return View.Map(arg00,arg10);
      },
      UpdateAll:function(fn)
      {
       var objectArg,arg00,m=this;
       objectArg=this.Var;
       arg00=function(a)
       {
        var action;
        action=function(i)
        {
         return function(x)
         {
          var action1,option;
          action1=function(y)
          {
           return Arrays.set(a,i,y);
          };
          option=fn(x);
          return Option.iter(action1,option);
         };
        };
        Arrays.iteri(action,a);
        return m.Storage.Set(a);
       };
       return objectArg.Update(arg00);
      },
      UpdateBy:function(fn,key)
      {
       var v,matchValue,m=this,_,index,matchValue1,_1,value,objectArg;
       v=this.Var.get_Value();
       matchValue=Arrays.tryFindIndex(function(it)
       {
        return Unchecked.Equals(m.key.call(null,it),key);
       },v);
       if(matchValue.$==1)
        {
         index=matchValue.$0;
         matchValue1=fn(Arrays.get(v,index));
         if(matchValue1.$==1)
          {
           value=matchValue1.$0;
           objectArg=m.Storage;
           _1=m.Var.set_Value(objectArg.SetAt(index,value,v));
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
      },
      Wrap:function(extract,wrap,update)
      {
       return ListModel1.Wrap(this,extract,wrap,update);
      },
      get_Key:function()
      {
       return this.key;
      },
      get_Length:function()
      {
       return Arrays.length(this.Var.get_Value());
      },
      get_LengthAsView:function()
      {
       var arg00,arg10;
       arg00=function(arr)
       {
        return Arrays.length(arr);
       };
       arg10=this.Var.get_View();
       return View.Map(arg00,arg10);
      },
      get_View:function()
      {
       return this.view;
      }
     },{
      Create:function(key,init)
      {
       var _arg00_,arg10;
       _arg00_=Seq.toArray(init);
       arg10=Storage1.InMemory(_arg00_);
       return ListModel.CreateWithStorage(key,arg10);
      },
      CreateWithStorage:function(key,storage)
      {
       var source,arg00,_var,arg001,arg10,view;
       source=Seq1.distinctBy(key,storage.Init());
       arg00=Seq.toArray(source);
       _var=Var.Create(arg00);
       arg001=function(x)
       {
        var value;
        value=storage.Set(x);
        return x.slice();
       };
       arg10=_var.get_View();
       view=View.Map(arg001,arg10);
       return Runtime.New(ListModel,{
        key:key,
        Var:_var,
        Storage:storage,
        view:view
       });
      }
     }),
     ListModel1:Runtime.Class({},{
      FromSeq:function(init)
      {
       var arg00;
       arg00=function(x)
       {
        return x;
       };
       return ListModel.Create(arg00,init);
      },
      Key:function(m)
      {
       return m.key;
      },
      View:function(m)
      {
       return m.view;
      },
      Wrap:function(underlying,extract,createItem,updateItem)
      {
       var state,mapping,array,init,objectArg,arg00,arg10,_var,g;
       state=[Dictionary.New12()];
       mapping=function(u)
       {
        var t;
        t=createItem(u);
        state[0].set_Item((underlying.get_Key())(u),t);
        return t;
       };
       array=underlying.Var.get_Value();
       init=Arrays.map(mapping,array);
       objectArg=underlying.Var;
       arg00=function(us)
       {
        var newState,mapping1,ts;
        newState=Dictionary.New12();
        mapping1=function(u)
        {
         var k,t;
         k=(underlying.get_Key())(u);
         t=state[0].ContainsKey(k)?(updateItem(state[0].get_Item(k)))(u):createItem(u);
         newState.set_Item(k,t);
         return t;
        };
        ts=Arrays.map(mapping1,us);
        state[0]=newState;
        return ts;
       };
       arg10=function()
       {
        return function(ts)
        {
         var newState,mapping1,us1;
         newState=Dictionary.New12();
         mapping1=function(t)
         {
          var u;
          u=extract(t);
          newState.set_Item((underlying.get_Key())(u),t);
          return u;
         };
         us1=Arrays.map(mapping1,ts);
         state[0]=newState;
         return us1;
        };
       };
       _var=Var1.Lens(objectArg,arg00,arg10);
       g=underlying.get_Key();
       return Runtime.New(ListModel,{
        key:function(x)
        {
         return g(extract(x));
        },
        Var:_var,
        Storage:Storage1.InMemory(init),
        view:View.Map(function(source)
        {
         return source;
        },_var.get_View())
       });
      }
     }),
     ListModels:{
      Contains:function(keyFn,item,xs)
      {
       var t;
       t=keyFn(item);
       return Seq.exists(function(it)
       {
        return Unchecked.Equals(keyFn(it),t);
       },xs);
      }
     },
     Model:Runtime.Class({
      get_View:function()
      {
       return Model1.View(this);
      }
     },{
      Create:function(proj,init)
      {
       var _var,arg10,view;
       _var=Var.Create(init);
       arg10=_var.get_View();
       view=View.Map(proj,arg10);
       return Runtime.New(Model,{
        $:0,
        $0:_var,
        $1:view
       });
      },
      Update:function(update,_arg1)
      {
       var _var,arg10;
       _var=_arg1.$0;
       arg10=function(x)
       {
        update(x);
        return x;
       };
       return Var1.Update(_var,arg10);
      }
     }),
     Model1:Runtime.Class({},{
      View:function(_arg2)
      {
       var view;
       view=_arg2.$1;
       return view;
      }
     }),
     ReactiveExtensions:Runtime.Class({},{
      New:function()
      {
       return Runtime.New(this,{});
      }
     }),
     RefImpl:Runtime.Class({
      Get:function()
      {
       return this.get.call(null,this.baseRef.Get());
      },
      Set:function(v)
      {
       var _this=this;
       return this.baseRef.Update(function(t)
       {
        return(_this.update.call(null,t))(v);
       });
      },
      Update:function(f)
      {
       var _this=this;
       return this.baseRef.Update(function(t)
       {
        return(_this.update.call(null,t))(f(_this.get.call(null,t)));
       });
      },
      UpdateMaybe:function(f)
      {
       var _this=this;
       return this.baseRef.UpdateMaybe(function(t)
       {
        return Option.map(_this.update.call(null,t),f(_this.get.call(null,t)));
       });
      },
      get_Id:function()
      {
       return this.id;
      },
      get_Value:function()
      {
       return this.get.call(null,this.baseRef.Get());
      },
      get_View:function()
      {
       var arg00,arg10;
       arg00=this.get;
       arg10=this.baseRef.get_View();
       return View.Map(arg00,arg10);
      },
      set_Value:function(v)
      {
       var _this=this;
       return this.baseRef.Update(function(t)
       {
        return(_this.update.call(null,t))(v);
       });
      }
     },{
      New:function(baseRef,get,update)
      {
       var r;
       r=Runtime.New(this,{});
       r.baseRef=baseRef;
       r.get=get;
       r.update=update;
       r.id=Fresh.Id();
       return r;
      }
     }),
     RefImpl1:Runtime.Class({
      Get:function()
      {
       return this.get.call(null,this.m.FindByKey(this.key));
      },
      Set:function(v)
      {
       var objectArg,arg00,r=this,arg10;
       objectArg=this.m;
       arg00=function(i)
       {
        return{
         $:1,
         $0:(r.update.call(null,i))(v)
        };
       };
       arg10=r.key;
       return objectArg.UpdateBy(arg00,arg10);
      },
      Update:function(f)
      {
       var objectArg,arg00,r=this,arg10;
       objectArg=this.m;
       arg00=function(i)
       {
        return{
         $:1,
         $0:(r.update.call(null,i))(f(r.get.call(null,i)))
        };
       };
       arg10=r.key;
       return objectArg.UpdateBy(arg00,arg10);
      },
      UpdateMaybe:function(f)
      {
       var objectArg,arg00,r=this,arg10;
       objectArg=this.m;
       arg00=function(i)
       {
        return Option.map(r.update.call(null,i),f(r.get.call(null,i)));
       };
       arg10=r.key;
       return objectArg.UpdateBy(arg00,arg10);
      },
      get_Id:function()
      {
       return this.id;
      },
      get_Value:function()
      {
       return this.Get();
      },
      get_View:function()
      {
       var arg00,arg10;
       arg00=this.get;
       arg10=this.m.FindByKeyAsView(this.key);
       return View.Map(arg00,arg10);
      },
      set_Value:function(v)
      {
       return this.Set(v);
      }
     },{
      New:function(m,key,get,update)
      {
       var r;
       r=Runtime.New(this,{});
       r.m=m;
       r.key=key;
       r.get=get;
       r.update=update;
       r.id=Fresh.Id();
       return r;
      }
     }),
     Route:{
      Append:function(_arg2,_arg1)
      {
       var a,b;
       a=_arg2.$0;
       b=_arg1.$0;
       return{
        $:0,
        $0:AppendList1.Append(a,b)
       };
      },
      FromList:function(xs)
      {
       var _arg00_,arg0;
       _arg00_=Arrays.ofSeq(xs);
       arg0=AppendList1.FromArray(_arg00_);
       return{
        $:0,
        $0:arg0
       };
      },
      MakeHash:function(_arg1)
      {
       var x,array,strings;
       x=_arg1.$0;
       array=AppendList1.ToArray(x);
       strings=Arrays.map(function(x1)
       {
        return encodeURIComponent(x1);
       },array);
       return Strings.concat("/",strings);
      },
      NoHash:function(s)
      {
       return Strings.StartsWith(s,"#")?s.substring(1):s;
      },
      ParseHash:function(hash)
      {
       var array,_arg00_,arg0;
       array=Strings.SplitChars(Route.NoHash(hash),[47],1);
       _arg00_=Arrays.map(function(x)
       {
        return decodeURIComponent(x);
       },array);
       arg0=AppendList1.FromArray(_arg00_);
       return{
        $:0,
        $0:arg0
       };
      },
      SameHash:function(a,b)
      {
       return Route.NoHash(a)===Route.NoHash(b);
      },
      ToList:function(_arg1)
      {
       var rt,array;
       rt=_arg1.$0;
       array=AppendList1.ToArray(rt);
       return List.ofArray(array);
      }
     },
     RouteMap1:Runtime.Class({},{
      Create:function(ser,des)
      {
       return{
        Des:des,
        Ser:ser
       };
      },
      Install:function(map)
      {
       return Routing.InstallMap(map);
      }
     }),
     Router:Runtime.Class({},{
      Dir:function(prefix,sites)
      {
       var arg10;
       arg10=Router.Merge(sites);
       return Router.Prefix(prefix,arg10);
      },
      Install:function(key,site)
      {
       return Routing.Install(key,site);
      },
      Merge:function(sites)
      {
       return Routing.MergeRouters(sites);
      },
      Prefix:function(prefix,_arg1)
      {
       var va,tree;
       va=_arg1.$0;
       tree=_arg1.$1;
       return{
        $:0,
        $0:va,
        $1:Trie1.Prefix(prefix,tree)
       };
      }
     }),
     Router1:Runtime.Class({},{
      Route:function(r,init,render)
      {
       return Routing.DefineRoute(r,init,render);
      }
     }),
     Routing:{
      ComputeBodies:function(trie)
      {
       var d,action,array;
       d=Dictionary.New12();
       action=function(body)
       {
        return d.set_Item(body.RouteId,body);
       };
       array=Trie1.ToArray(trie);
       Arrays.iter(action,array);
       return d;
      },
      DefineRoute:function(r,init,render)
      {
       var state,id,site,t;
       state=Var.Create(init);
       id=Fresh.Int();
       site=(render({
        $:0,
        $0:id
       }))(state);
       t=Trie1.Leaf({
        $:0,
        $0:id,
        $1:function(ctx)
        {
         var arg00,arg10;
         arg00=function(va)
         {
          return ctx.UpdateRoute.call(null,Routing.DoLink(r,va));
         };
         arg10=state.get_View();
         View1.Sink(arg00,arg10);
         return{
          OnRouteChanged:function(route)
          {
           return Var1.Set(state,Routing.DoRoute(r,route));
          },
          OnSelect:function()
          {
           return ctx.UpdateRoute.call(null,Routing.DoLink(r,Var.Get(state)));
          },
          RouteId:id,
          RouteValue:site
         };
        }
       });
       return{
        $:0,
        $0:{
         $:1,
         $0:site
        },
        $1:t
       };
      },
      DoLink:function(map,va)
      {
       return Route.FromList(map.Ser.call(null,va));
      },
      DoRoute:function(map,route)
      {
       return map.Des.call(null,Route.ToList(route));
      },
      Install:function(key,_arg1)
      {
       var va,site,currentRoute,state,_arg00_1,siteTrie,parseRoute,matchValue,glob,_,site1,arg00,_1,v,arg001,arg10,updateRoute,arg101;
       va=_arg1.$0;
       site=_arg1.$1;
       currentRoute=Routing.InstallMap({
        Des:function(xs)
        {
         return Route.FromList(xs);
        },
        Ser:function(_arg00_)
        {
         return Route.ToList(_arg00_);
        }
       });
       state={
        Bodies:undefined,
        CurrentRoute:currentRoute,
        CurrentSite:0,
        Selection:undefined
       };
       _arg00_1=function(prefix)
       {
        return function(_arg11)
        {
         var init,id;
         init=_arg11.$1;
         id=_arg11.$0;
         return init({
          UpdateRoute:function(rest)
          {
           return Routing.OnInternalSiteUpdate(state,id,prefix,rest);
          }
         });
        };
       };
       siteTrie=Trie1.Map(_arg00_1,site);
       state.Bodies=Routing.ComputeBodies(siteTrie);
       parseRoute=function(route)
       {
        return Trie1.Lookup(siteTrie,Route.ToList(route));
       };
       matchValue=parseRoute(Var.Get(currentRoute));
       if(matchValue.$==0)
        {
         site1=matchValue.$0;
         matchValue.$1;
         state.CurrentSite=site1.RouteId;
         _=Var.Create(site1.RouteValue);
        }
       else
        {
         if(va.$==1)
          {
           v=va.$0;
           _1=v;
          }
         else
          {
           _1=Operators.FailWith("Site.Install fails on empty site");
          }
         arg00=_1;
         _=Var.Create(arg00);
        }
       glob=_;
       state.Selection=glob;
       arg001=function(site2)
       {
        return Routing.OnSelectSite(state,key(site2));
       };
       arg10=glob.get_View();
       View1.Sink(arg001,arg10);
       updateRoute=function(route)
       {
        var matchValue1,_2,site2,rest,rest1;
        matchValue1=parseRoute(route);
        if(matchValue1.$==1)
         {
          _2=null;
         }
        else
         {
          site2=matchValue1.$0;
          rest=matchValue1.$1;
          rest1=Route.FromList(rest);
          _2=Routing.OnGlobalRouteChange(state,site2,rest1);
         }
        return _2;
       };
       updateRoute(Var.Get(currentRoute));
       arg101=currentRoute.get_View();
       View1.Sink(updateRoute,arg101);
       return glob;
      },
      InstallMap:function(rt)
      {
       var cur,_var,set,onUpdate,arg00,arg10;
       cur=function()
       {
        var _arg00_;
        _arg00_=Route.ParseHash(window.location.hash);
        return rt.Des.call(null,Route.ToList(_arg00_));
       };
       _var=Var.Create(cur(null));
       set=function(value)
       {
        var a;
        a=Var.Get(_var);
        return!Unchecked.Equals(rt.Ser.call(null,a),rt.Ser.call(null,value))?Var1.Set(_var,value):null;
       };
       onUpdate=function()
       {
        return set(cur(null));
       };
       window.onpopstate=onUpdate;
       window.onhashchange=onUpdate;
       arg00=function(loc)
       {
        var ha;
        ha=Route.MakeHash(Route.FromList(rt.Ser.call(null,loc)));
        return!Route.SameHash(window.location.hash,ha)?void(window.location.hash=ha):null;
       };
       arg10=_var.get_View();
       View1.Sink(arg00,arg10);
       return _var;
      },
      MergeRouters:function(sites)
      {
       var sites1,mapping,_arg00_,merged,chooser,value,_,t1;
       sites1=Seq.toArray(sites);
       mapping=function(_arg1)
       {
        var t;
        t=_arg1.$1;
        return t;
       };
       _arg00_=Seq.map(mapping,sites1);
       merged=Trie1.Merge(_arg00_);
       chooser=function(_arg2)
       {
        var x;
        x=_arg2.$0;
        return x;
       };
       value=Seq.tryPick(chooser,sites1);
       if(merged.$==1)
        {
         t1=merged.$0;
         _={
          $:0,
          $0:value,
          $1:t1
         };
        }
       else
        {
         _=Operators.FailWith("Invalid Site.Merge: need more prefix disambiguation");
        }
       return _;
      },
      OnGlobalRouteChange:function(state,site,rest)
      {
       var _;
       if(state.CurrentSite!==site.RouteId)
        {
         state.CurrentSite=site.RouteId;
         _=Var1.Set(state.Selection,site.RouteValue);
        }
       else
        {
         _=null;
        }
       return site.OnRouteChanged.call(null,rest);
      },
      OnInternalSiteUpdate:function(state,ix,prefix,rest)
      {
       var _,route;
       if(state.CurrentSite===ix)
        {
         route=Route.Append(Route.FromList(prefix),rest);
         _=Routing.SetCurrentRoute(state,route);
        }
       else
        {
         _=null;
        }
       return _;
      },
      OnSelectSite:function(state,_arg1)
      {
       var id,_;
       id=_arg1.$0;
       if(state.CurrentSite!==id)
        {
         state.CurrentSite=id;
         _=state.Bodies.get_Item(id).OnSelect.call(null,null);
        }
       else
        {
         _=null;
        }
       return _;
      },
      SetCurrentRoute:function(state,route)
      {
       return!Unchecked.Equals(Var.Get(state.CurrentRoute),route)?Var1.Set(state.CurrentRoute,route):null;
      }
     },
     Snap1:{
      Bind:function(f,snap)
      {
       var res,onObs,onReady;
       res=Snap1.Create();
       onObs=function()
       {
        return Snap1.MarkObsolete(res);
       };
       onReady=function(x)
       {
        var y;
        y=f(x);
        return Snap1.When(y,function(v)
        {
         return(Snap1.IsForever(y)?Snap1.IsForever(snap):false)?Snap1.MarkForever(res,v):Snap1.MarkReady(res,v);
        },onObs);
       };
       Snap1.When(snap,onReady,onObs);
       return res;
      },
      Create:function()
      {
       return Snap1.Make({
        $:3,
        $0:[],
        $1:[]
       });
      },
      CreateForever:function(v)
      {
       return Snap1.Make({
        $:0,
        $0:v
       });
      },
      CreateForeverAsync:function(a)
      {
       var o,arg00;
       o=Snap1.Make({
        $:3,
        $0:[],
        $1:[]
       });
       arg00=Concurrency.Delay(function()
       {
        return Concurrency.Bind(a,function(_arg1)
        {
         return Concurrency.Return(Snap1.MarkForever(o,_arg1));
        });
       });
       Concurrency.Start(arg00,{
        $:0
       });
       return o;
      },
      CreateWithValue:function(v)
      {
       return Snap1.Make({
        $:2,
        $0:v,
        $1:[]
       });
      },
      IsForever:function(snap)
      {
       var matchValue;
       matchValue=snap.State;
       return matchValue.$==0?true:false;
      },
      IsObsolete:function(snap)
      {
       var matchValue;
       matchValue=snap.State;
       return matchValue.$==1?true:false;
      },
      Make:function(st)
      {
       return{
        State:st
       };
      },
      Map:function(fn,sn)
      {
       var matchValue,_,x,res;
       matchValue=sn.State;
       if(matchValue.$==0)
        {
         x=matchValue.$0;
         _=Snap1.CreateForever(fn(x));
        }
       else
        {
         res=Snap1.Create();
         Snap1.When(sn,function(x1)
         {
          var v;
          v=fn(x1);
          return Snap1.MarkDone(res,sn,v);
         },function()
         {
          return Snap1.MarkObsolete(res);
         });
         _=res;
        }
       return _;
      },
      Map2:function(fn,sn1,sn2)
      {
       var matchValue,_,_1,x,y,x1,_2,y1,res,v1,v2,obs,cont;
       matchValue=[sn1.State,sn2.State];
       if(matchValue[0].$==0)
        {
         if(matchValue[1].$==0)
          {
           x=matchValue[0].$0;
           y=matchValue[1].$0;
           _1=Snap1.CreateForever((fn(x))(y));
          }
         else
          {
           x1=matchValue[0].$0;
           _1=Snap1.Map(fn(x1),sn2);
          }
         _=_1;
        }
       else
        {
         if(matchValue[1].$==0)
          {
           y1=matchValue[1].$0;
           _2=Snap1.Map(function(x2)
           {
            return(fn(x2))(y1);
           },sn1);
          }
         else
          {
           res=Snap1.Create();
           v1=[{
            $:0
           }];
           v2=[{
            $:0
           }];
           obs=function()
           {
            v1[0]={
             $:0
            };
            v2[0]={
             $:0
            };
            return Snap1.MarkObsolete(res);
           };
           cont=function()
           {
            var matchValue1,_3,_4,x2,y2;
            matchValue1=[v1[0],v2[0]];
            if(matchValue1[0].$==1)
             {
              if(matchValue1[1].$==1)
               {
                x2=matchValue1[0].$0;
                y2=matchValue1[1].$0;
                _4=(Snap1.IsForever(sn1)?Snap1.IsForever(sn2):false)?Snap1.MarkForever(res,(fn(x2))(y2)):Snap1.MarkReady(res,(fn(x2))(y2));
               }
              else
               {
                _4=null;
               }
              _3=_4;
             }
            else
             {
              _3=null;
             }
            return _3;
           };
           Snap1.When(sn1,function(x2)
           {
            v1[0]={
             $:1,
             $0:x2
            };
            return cont(null);
           },obs);
           Snap1.When(sn2,function(y2)
           {
            v2[0]={
             $:1,
             $0:y2
            };
            return cont(null);
           },obs);
           _2=res;
          }
         _=_2;
        }
       return _;
      },
      Map3:function(fn,sn1,sn2,sn3)
      {
       var matchValue,_,_1,_2,x,y,z,x1,y1,_3,x2,z2,x3,_4,_5,y3,z3,y4,_6,z4,res,v1,v2,v3,obs,cont;
       matchValue=[sn1.State,sn2.State,sn3.State];
       if(matchValue[0].$==0)
        {
         if(matchValue[1].$==0)
          {
           if(matchValue[2].$==0)
            {
             x=matchValue[0].$0;
             y=matchValue[1].$0;
             z=matchValue[2].$0;
             _2=Snap1.CreateForever(((fn(x))(y))(z));
            }
           else
            {
             x1=matchValue[0].$0;
             y1=matchValue[1].$0;
             _2=Snap1.Map(function(z1)
             {
              return((fn(x1))(y1))(z1);
             },sn3);
            }
           _1=_2;
          }
         else
          {
           if(matchValue[2].$==0)
            {
             x2=matchValue[0].$0;
             z2=matchValue[2].$0;
             _3=Snap1.Map(function(y2)
             {
              return((fn(x2))(y2))(z2);
             },sn2);
            }
           else
            {
             x3=matchValue[0].$0;
             _3=Snap1.Map2(function(y2)
             {
              return function(z1)
              {
               return((fn(x3))(y2))(z1);
              };
             },sn2,sn3);
            }
           _1=_3;
          }
         _=_1;
        }
       else
        {
         if(matchValue[1].$==0)
          {
           if(matchValue[2].$==0)
            {
             y3=matchValue[1].$0;
             z3=matchValue[2].$0;
             _5=Snap1.Map(function(x4)
             {
              return((fn(x4))(y3))(z3);
             },sn1);
            }
           else
            {
             y4=matchValue[1].$0;
             _5=Snap1.Map2(function(x4)
             {
              return function(z1)
              {
               return((fn(x4))(y4))(z1);
              };
             },sn1,sn3);
            }
           _4=_5;
          }
         else
          {
           if(matchValue[2].$==0)
            {
             z4=matchValue[2].$0;
             _6=Snap1.Map2(function(x4)
             {
              return function(y2)
              {
               return((fn(x4))(y2))(z4);
              };
             },sn1,sn2);
            }
           else
            {
             res=Snap1.Create();
             v1=[{
              $:0
             }];
             v2=[{
              $:0
             }];
             v3=[{
              $:0
             }];
             obs=function()
             {
              v1[0]={
               $:0
              };
              v2[0]={
               $:0
              };
              v3[0]={
               $:0
              };
              return Snap1.MarkObsolete(res);
             };
             cont=function()
             {
              var matchValue1,_7,_8,_9,x4,y2,z1;
              matchValue1=[v1[0],v2[0],v3[0]];
              if(matchValue1[0].$==1)
               {
                if(matchValue1[1].$==1)
                 {
                  if(matchValue1[2].$==1)
                   {
                    x4=matchValue1[0].$0;
                    y2=matchValue1[1].$0;
                    z1=matchValue1[2].$0;
                    _9=((Snap1.IsForever(sn1)?Snap1.IsForever(sn2):false)?Snap1.IsForever(sn3):false)?Snap1.MarkForever(res,((fn(x4))(y2))(z1)):Snap1.MarkReady(res,((fn(x4))(y2))(z1));
                   }
                  else
                   {
                    _9=null;
                   }
                  _8=_9;
                 }
                else
                 {
                  _8=null;
                 }
                _7=_8;
               }
              else
               {
                _7=null;
               }
              return _7;
             };
             Snap1.When(sn1,function(x4)
             {
              v1[0]={
               $:1,
               $0:x4
              };
              return cont(null);
             },obs);
             Snap1.When(sn2,function(y2)
             {
              v2[0]={
               $:1,
               $0:y2
              };
              return cont(null);
             },obs);
             Snap1.When(sn3,function(z1)
             {
              v3[0]={
               $:1,
               $0:z1
              };
              return cont(null);
             },obs);
             _6=res;
            }
           _4=_6;
          }
         _=_4;
        }
       return _;
      },
      MapAsync:function(fn,snap)
      {
       var res;
       res=Snap1.Create();
       Snap1.When(snap,function(v)
       {
        return Async.StartTo(fn(v),function(v1)
        {
         return Snap1.MarkDone(res,snap,v1);
        });
       },function()
       {
        return Snap1.MarkObsolete(res);
       });
       return res;
      },
      MapCached:function(prev,fn,sn)
      {
       var fn1;
       fn1=function(x)
       {
        var matchValue,_,_x_,_1,y,y1,y2;
        matchValue=prev[0];
        if(matchValue.$==1)
         {
          matchValue.$0[1];
          _x_=matchValue.$0[0];
          if(Unchecked.Equals(x,_x_))
           {
            matchValue.$0[0];
            y=matchValue.$0[1];
            _1=y;
           }
          else
           {
            y1=fn(x);
            prev[0]={
             $:1,
             $0:[x,y1]
            };
            _1=y1;
           }
          _=_1;
         }
        else
         {
          y2=fn(x);
          prev[0]={
           $:1,
           $0:[x,y2]
          };
          _=y2;
         }
        return _;
       };
       return Snap1.Map(fn1,sn);
      },
      MarkDone:function(res,sn,v)
      {
       return Snap1.IsForever(sn)?Snap1.MarkForever(res,v):Snap1.MarkReady(res,v);
      },
      MarkForever:function(sn,v)
      {
       var matchValue,_,q;
       matchValue=sn.State;
       if(matchValue.$==3)
        {
         q=matchValue.$0;
         sn.State={
          $:0,
          $0:v
         };
         _=Seq.iter(function(k)
         {
          return k(v);
         },q);
        }
       else
        {
         _=null;
        }
       return _;
      },
      MarkObsolete:function(sn)
      {
       var matchValue,_,ks,ks1;
       matchValue=sn.State;
       if(matchValue.$==1)
        {
         _=null;
        }
       else
        {
         if(matchValue.$==2)
          {
           ks=matchValue.$1;
           sn.State={
            $:1
           };
           _=Seq.iter(function(k)
           {
            return k(null);
           },ks);
          }
         else
          {
           if(matchValue.$==3)
            {
             ks1=matchValue.$1;
             sn.State={
              $:1
             };
             _=Seq.iter(function(k)
             {
              return k(null);
             },ks1);
            }
           else
            {
             _=null;
            }
          }
        }
       return _;
      },
      MarkReady:function(sn,v)
      {
       var matchValue,_,q2,q1;
       matchValue=sn.State;
       if(matchValue.$==3)
        {
         q2=matchValue.$1;
         q1=matchValue.$0;
         sn.State={
          $:2,
          $0:v,
          $1:q2
         };
         _=Seq.iter(function(k)
         {
          return k(v);
         },q1);
        }
       else
        {
         _=null;
        }
       return _;
      },
      Sequence:function(snaps)
      {
       var _,res,snaps1,c,d,vs,obs,cont,action;
       if(Seq.isEmpty(snaps))
        {
         _=Snap1.CreateForever(Seq.empty());
        }
       else
        {
         res=Snap1.Create();
         snaps1=Arrays.ofSeq(snaps);
         c=Arrays.length(snaps1);
         d=[0];
         vs=[[]];
         obs=function()
         {
          d[0]=0;
          vs[0]=[];
          return Snap1.MarkObsolete(res);
         };
         cont=function()
         {
          return d[0]===c?Seq.forall(function(x)
          {
           return Snap1.IsForever(x);
          },snaps1)?Snap1.MarkForever(res,vs[0]):Snap1.MarkReady(res,vs[0]):null;
         };
         action=function(i)
         {
          return function(s)
          {
           return Snap1.When(s,function(x)
           {
            vs[0][i]=x;
            Ref.incr(d);
            return cont(null);
           },obs);
          };
         };
         Arrays.iteri(action,snaps1);
         _=res;
        }
       return _;
      },
      SnapshotOn:function(sn1,sn2)
      {
       var res,v,triggered,obs,cont;
       res=Snap1.Create();
       v=[{
        $:0
       }];
       triggered=[false];
       obs=function()
       {
        v[0]={
         $:0
        };
        return Snap1.MarkObsolete(res);
       };
       cont=function()
       {
        var _,matchValue,_1,_2,y,_3,y1,_4,y2;
        if(triggered[0])
         {
          matchValue=v[0];
          if(matchValue.$==1)
           {
            matchValue.$0;
            if(Snap1.IsForever(sn1))
             {
              y=matchValue.$0;
              _2=Snap1.MarkForever(res,y);
             }
            else
             {
              if(matchValue.$==1)
               {
                y1=matchValue.$0;
                _3=Snap1.MarkReady(res,y1);
               }
              else
               {
                _3=null;
               }
              _2=_3;
             }
            _1=_2;
           }
          else
           {
            if(matchValue.$==1)
             {
              y2=matchValue.$0;
              _4=Snap1.MarkReady(res,y2);
             }
            else
             {
              _4=null;
             }
            _1=_4;
           }
          _=_1;
         }
        else
         {
          _=null;
         }
        return _;
       };
       Snap1.When(sn1,function()
       {
        triggered[0]=true;
        return cont(null);
       },obs);
       Snap1.When(sn2,function(y)
       {
        v[0]={
         $:1,
         $0:y
        };
        return cont(null);
       },function()
       {
       });
       return res;
      },
      When:function(snap,avail,obsolete)
      {
       var matchValue,_,v,q,q2,q1,v1;
       matchValue=snap.State;
       if(matchValue.$==1)
        {
         _=obsolete(null);
        }
       else
        {
         if(matchValue.$==2)
          {
           v=matchValue.$0;
           q=matchValue.$1;
           q.push(obsolete);
           _=avail(v);
          }
         else
          {
           if(matchValue.$==3)
            {
             q2=matchValue.$1;
             q1=matchValue.$0;
             q1.push(avail);
             _=q2.push(obsolete);
            }
           else
            {
             v1=matchValue.$0;
             _=avail(v1);
            }
          }
        }
       return _;
      }
     },
     Storage1:{
      ArrayStorage:Runtime.Class({
       Add:function(i,arr)
       {
        var value;
        value=arr.push(i);
        return arr;
       },
       Init:function()
       {
        return this.init;
       },
       RemoveIf:function(pred,arr)
       {
        return Arrays.filter(pred,arr);
       },
       Set:function(coll)
       {
        return Seq.toArray(coll);
       },
       SetAt:function(idx,elem,arr)
       {
        Arrays.set(arr,idx,elem);
        return arr;
       }
      },{
       New:function(init)
       {
        var r;
        r=Runtime.New(this,{});
        r.init=init;
        return r;
       }
      }),
      InMemory:function(init)
      {
       return ArrayStorage.New(init);
      },
      LocalStorage:function(id,serializer)
      {
       return LocalStorageBackend.New(id,serializer);
      },
      LocalStorageBackend:Runtime.Class({
       Add:function(i,arr)
       {
        var value;
        value=arr.push(i);
        return this.set(arr);
       },
       Init:function()
       {
        var item,_,_1,x,mapping,matchValue;
        item=this.storage.getItem(this.id);
        if(item===null)
         {
          _=[];
         }
        else
         {
          try
          {
           x=JSON.parse(item);
           mapping=this.serializer.Decode;
           _1=Arrays.map(mapping,x);
          }
          catch(matchValue)
          {
           _1=[];
          }
          _=_1;
         }
        return _;
       },
       RemoveIf:function(pred,arr)
       {
        var arr1;
        arr1=Arrays.filter(pred,arr);
        return this.set(arr1);
       },
       Set:function(coll)
       {
        var arr;
        arr=Seq.toArray(coll);
        return this.set(arr);
       },
       SetAt:function(idx,elem,arr)
       {
        Arrays.set(arr,idx,elem);
        return this.set(arr);
       },
       clear:function()
       {
        return this.storage.removeItem(this.id);
       },
       set:function(arr)
       {
        var mapping,_arg00_;
        mapping=this.serializer.Encode;
        _arg00_=Arrays.map(mapping,arr);
        this.storage.setItem(this.id,JSON.stringify(_arg00_));
        return arr;
       }
      },{
       New:function(id,serializer)
       {
        var r;
        r=Runtime.New(this,{});
        r.id=id;
        r.serializer=serializer;
        r.storage=window.localStorage;
        return r;
       }
      })
     },
     String:{
      isBlank:function(s)
      {
       return Strings.forall(function(arg00)
       {
        return Char.IsWhiteSpace(arg00);
       },s);
      }
     },
     Submitter:Runtime.Class({
      Trigger:function()
      {
       return Var1.Set(this["var"],null);
      },
      get_Input:function()
      {
       return this.input;
      },
      get_View:function()
      {
       return this.view;
      }
     },{
      Create:function(input,init)
      {
       return Submitter.New(input,init);
      },
      New:function(input,init)
      {
       var r,arg10,arg20;
       r=Runtime.New(this,{});
       r.input=input;
       r["var"]=Var.Create(null);
       arg10=r["var"].get_View();
       arg20=r.input;
       r.view=View.SnapshotOn(init,arg10,arg20);
       return r;
      }
     }),
     Submitter1:Runtime.Class({},{
      CreateOption:function(input)
      {
       var arg00;
       arg00=function(arg0)
       {
        return{
         $:1,
         $0:arg0
        };
       };
       return Submitter.New(View.Map(arg00,input),{
        $:0
       });
      },
      Input:function(s)
      {
       return s.get_Input();
      },
      Trigger:function(s)
      {
       return s.Trigger();
      },
      View:function(s)
      {
       return s.get_View();
      }
     }),
     Trans:Runtime.Class({},{
      AnimateChange:function(tr,x,y)
      {
       return(tr.TChange.call(null,x))(y);
      },
      AnimateEnter:function(tr,x)
      {
       return tr.TEnter.call(null,x);
      },
      AnimateExit:function(tr,x)
      {
       return tr.TExit.call(null,x);
      }
     }),
     Trans1:Runtime.Class({},{
      CanAnimateChange:function(tr)
      {
       return(tr.TFlags&1)!==0;
      },
      CanAnimateEnter:function(tr)
      {
       return(tr.TFlags&2)!==0;
      },
      CanAnimateExit:function(tr)
      {
       return(tr.TFlags&4)!==0;
      },
      Change:function(ch,tr)
      {
       var TFlags;
       TFlags=tr.TFlags|1;
       return{
        TChange:ch,
        TEnter:tr.TEnter,
        TExit:tr.TExit,
        TFlags:TFlags
       };
      },
      Create:function(ch)
      {
       return{
        TChange:ch,
        TEnter:function(t)
        {
         return An.Const(t);
        },
        TExit:function(t)
        {
         return An.Const(t);
        },
        TFlags:1
       };
      },
      Enter:function(f,tr)
      {
       var TFlags;
       TFlags=tr.TFlags|2;
       return{
        TChange:tr.TChange,
        TEnter:f,
        TExit:tr.TExit,
        TFlags:TFlags
       };
      },
      Exit:function(f,tr)
      {
       var TFlags;
       TFlags=tr.TFlags|4;
       return{
        TChange:tr.TChange,
        TEnter:tr.TEnter,
        TExit:f,
        TFlags:TFlags
       };
      },
      Trivial:function()
      {
       return{
        TChange:function()
        {
         return function(y)
         {
          return An.Const(y);
         };
        },
        TEnter:function(t)
        {
         return An.Const(t);
        },
        TExit:function(t)
        {
         return An.Const(t);
        },
        TFlags:0
       };
      }
     }),
     Trie1:{
      AllSome:function(xs)
      {
       var e,r,ok,matchValue,_,x;
       e=Enumerator.Get(xs);
       r=ResizeArrayProxy.New2();
       ok=true;
       while(ok?e.MoveNext():false)
        {
         matchValue=e.get_Current();
         if(matchValue.$==1)
          {
           x=matchValue.$0;
           _=r.Add(x);
          }
         else
          {
           _=ok=false;
          }
        }
       return ok?{
        $:1,
        $0:r.ToArray()
       }:{
        $:0
       };
      },
      Empty:function()
      {
       return{
        $:1
       };
      },
      IsLeaf:function(t)
      {
       return t.$==2?true:false;
      },
      Leaf:function(v)
      {
       return{
        $:2,
        $0:v
       };
      },
      Look:function(key,trie)
      {
       var matchValue,_,v,_1,k,ks,map,matchValue1,_2,trie1;
       matchValue=[trie,key];
       if(matchValue[0].$==2)
        {
         v=matchValue[0].$0;
         _={
          $:0,
          $0:v,
          $1:key
         };
        }
       else
        {
         if(matchValue[0].$==0)
          {
           if(matchValue[1].$==1)
            {
             k=matchValue[1].$0;
             ks=matchValue[1].$1;
             map=matchValue[0].$0;
             matchValue1=MapModule.TryFind(k,map);
             if(matchValue1.$==0)
              {
               _2={
                $:1
               };
              }
             else
              {
               trie1=matchValue1.$0;
               _2=Trie1.Look(ks,trie1);
              }
             _1=_2;
            }
           else
            {
             _1={
              $:1
             };
            }
           _=_1;
          }
         else
          {
           _={
            $:1
           };
          }
        }
       return _;
      },
      Lookup:function(trie,key)
      {
       return Trie1.Look(Seq.toList(key),trie);
      },
      Map:function(f,trie)
      {
       return Trie1.MapLoop(Runtime.New(T,{
        $:0
       }),f,trie);
      },
      MapLoop:function(loc,f,trie)
      {
       var _,x,mp,mapping,xs;
       if(trie.$==1)
        {
         _={
          $:1
         };
        }
       else
        {
         if(trie.$==2)
          {
           x=trie.$0;
           _={
            $:2,
            $0:(f(loc))(x)
           };
          }
         else
          {
           mp=trie.$0;
           mapping=function(k)
           {
            return function(v)
            {
             return Trie1.MapLoop(List.append(loc,List.ofArray([k])),f,v);
            };
           };
           xs=MapModule.Map(mapping,mp);
           _=Trie1.TrieBranch(xs);
          }
        }
       return _;
      },
      Mapi:function(f,trie)
      {
       var counter,next;
       counter=[0];
       next=function()
       {
        var c;
        c=counter[0];
        counter[0]=c+1;
        return c;
       };
       return Trie1.Map(function(x)
       {
        return(f(next(null)))(x);
       },trie);
      },
      Merge:function(ts)
      {
       var ts1,matchValue,_,_1,chooser,merge,mapping,maps,option;
       ts1=Seq.toArray(ts);
       matchValue=Arrays.length(ts1);
       if(matchValue===0)
        {
         _={
          $:1,
          $0:{
           $:1
          }
         };
        }
       else
        {
         if(matchValue===1)
          {
           _={
            $:1,
            $0:Arrays.get(ts1,0)
           };
          }
         else
          {
           if(Seq.exists(function(t)
           {
            return Trie1.IsLeaf(t);
           },ts1))
            {
             _1={
              $:0
             };
            }
           else
            {
             chooser=function(_arg1)
             {
              var _2,map;
              if(_arg1.$==0)
               {
                map=_arg1.$0;
                _2={
                 $:1,
                 $0:map
                };
               }
              else
               {
                _2={
                 $:0
                };
               }
              return _2;
             };
             merge=function(_arg00_)
             {
              return Trie1.Merge(_arg00_);
             };
             mapping=function(xs)
             {
              return Trie1.TrieBranch(xs);
             };
             maps=Seq.choose(chooser,ts1);
             option=Trie1.MergeMaps(merge,maps);
             _1=Option.map(mapping,option);
            }
           _=_1;
          }
        }
       return _;
      },
      MergeMaps:function(merge,maps)
      {
       var x,folder,state,x1,x2,mapping,x3,x4,mapping2;
       x=Seq.collect(function(table)
       {
        return MapModule.ToSeq(table);
       },maps);
       folder=function(s)
       {
        return function(tupledArg)
        {
         var k,v;
         k=tupledArg[0];
         v=tupledArg[1];
         return Trie1.MultiAdd(k,v,s);
        };
       };
       state=FSharpMap.New1([]);
       x1=Seq.fold(folder,state,x);
       x2=MapModule.ToSeq(x1);
       mapping=function(tupledArg)
       {
        var k,vs,mapping1,option;
        k=tupledArg[0];
        vs=tupledArg[1];
        mapping1=function(v)
        {
         return[k,v];
        };
        option=merge(vs);
        return Option.map(mapping1,option);
       };
       x3=Seq.map(mapping,x2);
       x4=Trie1.AllSome(x3);
       mapping2=function(elements)
       {
        return MapModule.OfArray(Seq.toArray(elements));
       };
       return Option.map(mapping2,x4);
      },
      MultiAdd:function(key,value,map)
      {
       return map.Add(key,Runtime.New(T,{
        $:1,
        $0:value,
        $1:Trie1.MultiFind(key,map)
       }));
      },
      MultiFind:function(key,map)
      {
       return Operators.DefaultArg(MapModule.TryFind(key,map),Runtime.New(T,{
        $:0
       }));
      },
      Prefix:function(key,trie)
      {
       return Trie1.TrieBranch(FSharpMap.New1(List.ofArray([[key,trie]])));
      },
      ToArray:function(trie)
      {
       var all,value;
       all=[];
       value=Trie1.Map(function()
       {
        return function(v)
        {
         return all.push(v);
        };
       },trie);
       return all.slice(0);
      },
      TrieBranch:function(xs)
      {
       return xs.get_IsEmpty()?{
        $:1
       }:{
        $:0,
        $0:xs
       };
      }
     },
     Var:Runtime.Class({
      Get:function()
      {
       return Var.Get(this);
      },
      Set:function(v)
      {
       return Var1.Set(this,v);
      },
      Update:function(f)
      {
       return Var1.Update(this,f);
      },
      UpdateMaybe:function(f)
      {
       var matchValue,_,v;
       matchValue=f(Var.Get(this));
       if(matchValue.$==1)
        {
         v=matchValue.$0;
         _=Var1.Set(this,v);
        }
       else
        {
         _=null;
        }
       return _;
      },
      get_Id:function()
      {
       return"uinref"+Global.String(Var1.GetId(this));
      },
      get_Value:function()
      {
       return Var.Get(this);
      },
      get_View:function()
      {
       var _this=this;
       return{
        $:0,
        $0:function()
        {
         return Var1.Observe(_this);
        }
       };
      },
      get_View1:function()
      {
       return this.get_View();
      },
      set_Value:function(v)
      {
       return Var1.Set(this,v);
      }
     },{
      Create:function(v)
      {
       return Runtime.New(Var,{
        Const:false,
        Current:v,
        Snap:Snap1.CreateWithValue(v),
        Id:Fresh.Int()
       });
      },
      Get:function(_var)
      {
       return _var.Current;
      }
     }),
     Var1:Runtime.Class({},{
      GetId:function(_var)
      {
       return _var.Id;
      },
      Lens:function(iref,get,update)
      {
       return RefImpl.New(iref,get,update);
      },
      Observe:function(_var)
      {
       return _var.Snap;
      },
      Set:function(_var,value)
      {
       var _;
       if(_var.Const)
        {
         _=null;
        }
       else
        {
         Snap1.MarkObsolete(_var.Snap);
         _var.Current=value;
         _=void(_var.Snap=Snap1.CreateWithValue(value));
        }
       return _;
      },
      SetFinal:function(_var,value)
      {
       var _;
       if(_var.Const)
        {
         _=null;
        }
       else
        {
         _var.Const=true;
         _var.Current=value;
         _=void(_var.Snap=Snap1.CreateForever(value));
        }
       return _;
      },
      Update:function(_var,fn)
      {
       var arg10;
       arg10=fn(Var.Get(_var));
       return Var1.Set(_var,arg10);
      }
     }),
     View:Runtime.Class({},{
      ConvertSeqNode:function(conv,value)
      {
       var _var,view;
       _var=Var.Create(value);
       view=_var.get_View();
       return{
        NValue:conv(view),
        NVar:_var,
        NView:view
       };
      },
      CreateLazy:function(observe)
      {
       var cur,obs;
       cur=[{
        $:0
       }];
       obs=function()
       {
        var matchValue,_,sn,_1,sn1,sn2,sn3;
        matchValue=cur[0];
        if(matchValue.$==1)
         {
          sn=matchValue.$0;
          if(!Snap1.IsObsolete(sn))
           {
            sn1=matchValue.$0;
            _1=sn1;
           }
          else
           {
            sn2=observe(null);
            cur[0]={
             $:1,
             $0:sn2
            };
            _1=sn2;
           }
          _=_1;
         }
        else
         {
          sn3=observe(null);
          cur[0]={
           $:1,
           $0:sn3
          };
          _=sn3;
         }
        return _;
       };
       return{
        $:0,
        $0:obs
       };
      },
      CreateLazy2:function(snapFn,_arg4,_arg3)
      {
       var o1,o2;
       o1=_arg4.$0;
       o2=_arg3.$0;
       return View.CreateLazy(function()
       {
        var s1,s2;
        s1=o1(null);
        s2=o2(null);
        return(snapFn(s1))(s2);
       });
      },
      Map:function(fn,_arg1)
      {
       var observe;
       observe=_arg1.$0;
       return View.CreateLazy(function()
       {
        var _arg10_;
        _arg10_=observe(null);
        return Snap1.Map(fn,_arg10_);
       });
      },
      Map2:function(fn,v1,v2)
      {
       var arg00;
       arg00=function(_arg10_)
       {
        return function(_arg20_)
        {
         return Snap1.Map2(fn,_arg10_,_arg20_);
        };
       };
       return View.CreateLazy2(arg00,v1,v2);
      },
      MapAsync:function(fn,_arg5)
      {
       var observe;
       observe=_arg5.$0;
       return View.CreateLazy(function()
       {
        var _arg10_;
        _arg10_=observe(null);
        return Snap1.MapAsync(fn,_arg10_);
       });
      },
      MapAsync2:function(fn,v1,v2)
      {
       var arg00,arg10;
       arg00=function(x)
       {
        return x;
       };
       arg10=View.Map2(fn,v1,v2);
       return View.MapAsync(arg00,arg10);
      },
      MapCached:function(fn,_arg2)
      {
       var observe,vref;
       observe=_arg2.$0;
       vref=[{
        $:0
       }];
       return View.CreateLazy(function()
       {
        var _arg20_;
        _arg20_=observe(null);
        return Snap1.MapCached(vref,fn,_arg20_);
       });
      },
      MapSeqCached:function(conv,view)
      {
       var arg00;
       arg00=function(x)
       {
        return x;
       };
       return View.MapSeqCachedBy(arg00,conv,view);
      },
      MapSeqCachedBy:function(key,conv,view)
      {
       var state,arg00;
       state=[Dictionary.New12()];
       arg00=function(xs)
       {
        var prevState,newState,mapping,array,result;
        prevState=state[0];
        newState=Dictionary.New12();
        mapping=function(x)
        {
         var k,res;
         k=key(x);
         res=prevState.ContainsKey(k)?prevState.get_Item(k):conv(x);
         newState.set_Item(k,res);
         return res;
        };
        array=Seq.toArray(xs);
        result=Arrays.map(mapping,array);
        state[0]=newState;
        return result;
       };
       return View.Map(arg00,view);
      },
      MapSeqCachedView:function(conv,view)
      {
       var arg00,arg10;
       arg00=function(x)
       {
        return x;
       };
       arg10=function()
       {
        return function(v)
        {
         return conv(v);
        };
       };
       return View.MapSeqCachedViewBy(arg00,arg10,view);
      },
      MapSeqCachedViewBy:function(key,conv,view)
      {
       var state,arg00;
       state=[Dictionary.New12()];
       arg00=function(xs)
       {
        var prevState,newState,x,mapping,result;
        prevState=state[0];
        newState=Dictionary.New12();
        x=Seq.toArray(xs);
        mapping=function(x1)
        {
         var k,node,_,n,arg001,arg002;
         k=key(x1);
         if(prevState.ContainsKey(k))
          {
           n=prevState.get_Item(k);
           arg001=n.NVar;
           Var1.Set(arg001,x1);
           _=n;
          }
         else
          {
           arg002=function(v)
           {
            return(conv(k))(v);
           };
           _=View.ConvertSeqNode(arg002,x1);
          }
         node=_;
         newState.set_Item(k,node);
         return node.NValue;
        };
        result=Arrays.map(mapping,x);
        state[0]=newState;
        return result;
       };
       return View.Map(arg00,view);
      },
      SnapshotOn:function(def,_arg7,_arg6)
      {
       var o1,o2,sInit,obs;
       o1=_arg7.$0;
       o2=_arg6.$0;
       sInit=Snap1.CreateWithValue(def);
       obs=function()
       {
        var s1,s2,_,s;
        s1=o1(null);
        s2=o2(null);
        if(Snap1.IsObsolete(sInit))
         {
          _=Snap1.SnapshotOn(s1,s2);
         }
        else
         {
          s=Snap1.SnapshotOn(s1,s2);
          Snap1.When(s,function()
          {
          },function()
          {
           return Snap1.MarkObsolete(sInit);
          });
          _=sInit;
         }
        return _;
       };
       return View.CreateLazy(obs);
      },
      UpdateWhile:function(def,v1,v2)
      {
       var value,arg00;
       value=[def];
       arg00=function(pred)
       {
        return function(v)
        {
         pred?void(value[0]=v):null;
         return value[0];
        };
       };
       return View.Map2(arg00,v1,v2);
      },
      get_Do:function()
      {
       return{
        $:0
       };
      }
     }),
     View1:Runtime.Class({},{
      Apply:function(fn,view)
      {
       var arg00;
       arg00=function(f)
       {
        return function(x)
        {
         return f(x);
        };
       };
       return View.Map2(arg00,fn,view);
      },
      Bind:function(fn,view)
      {
       return View1.Join(View.Map(fn,view));
      },
      Const:function(x)
      {
       var o;
       o=Snap1.CreateForever(x);
       return{
        $:0,
        $0:function()
        {
         return o;
        }
       };
      },
      ConstAsync:function(a)
      {
       var o;
       o=Snap1.CreateForeverAsync(a);
       return{
        $:0,
        $0:function()
        {
         return o;
        }
       };
      },
      Join:function(_arg8)
      {
       var observe;
       observe=_arg8.$0;
       return View.CreateLazy(function()
       {
        var _arg00_,_arg10_;
        _arg00_=function(_arg2)
        {
         var obs;
         obs=_arg2.$0;
         return obs(null);
        };
        _arg10_=observe(null);
        return Snap1.Bind(_arg00_,_arg10_);
       });
      },
      Sequence:function(views)
      {
       return View.CreateLazy(function()
       {
        var mapping,_arg00_;
        mapping=function(_arg3)
        {
         var observe;
         observe=_arg3.$0;
         return observe(null);
        };
        _arg00_=Seq.map(mapping,views);
        return Snap1.Sequence(_arg00_);
       });
      },
      Sink:function(act,_arg11)
      {
       var observe,loop;
       observe=_arg11.$0;
       loop=function()
       {
        var sn;
        sn=observe(null);
        return Snap1.When(sn,act,function()
        {
         return Async.Schedule(loop);
        });
       };
       return Async.Schedule(loop);
      },
      TryFinally:function(f,_arg10)
      {
       var observe;
       observe=_arg10.$0;
       return View.CreateLazy(function()
       {
        var _;
        try
        {
         _=observe(null);
        }
        finally
        {
         f(null);
        }
        return _;
       });
      },
      TryWith:function(f,_arg9)
      {
       var observe;
       observe=_arg9.$0;
       return View.CreateLazy(function()
       {
        var _,exn,patternInput,obs;
        try
        {
         _=observe(null);
        }
        catch(exn)
        {
         patternInput=f(exn);
         obs=patternInput.$0;
         _=obs(null);
        }
        return _;
       });
      }
     })
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  Concurrency=Runtime.Safe(Global.WebSharper.Concurrency);
  Array=Runtime.Safe(Global.Array);
  Arrays=Runtime.Safe(Global.WebSharper.Arrays);
  Seq=Runtime.Safe(Global.WebSharper.Seq);
  UI=Runtime.Safe(Global.WebSharper.UI);
  Next=Runtime.Safe(UI.Next);
  Abbrev=Runtime.Safe(Next.Abbrev);
  Fresh=Runtime.Safe(Abbrev.Fresh);
  Collections=Runtime.Safe(Global.WebSharper.Collections);
  HashSetProxy=Runtime.Safe(Collections.HashSetProxy);
  HashSet=Runtime.Safe(Abbrev.HashSet);
  Slot1=Runtime.Safe(Abbrev.Slot1);
  Unchecked=Runtime.Safe(Global.WebSharper.Unchecked);
  An=Runtime.Safe(Next.An);
  AppendList1=Runtime.Safe(Next.AppendList1);
  Anims=Runtime.Safe(Next.Anims);
  requestAnimationFrame=Runtime.Safe(Global.requestAnimationFrame);
  Trans=Runtime.Safe(Next.Trans);
  Option=Runtime.Safe(Global.WebSharper.Option);
  View=Runtime.Safe(Next.View);
  Lazy=Runtime.Safe(Global.WebSharper.Lazy);
  Array1=Runtime.Safe(Next.Array);
  Attrs=Runtime.Safe(Next.Attrs);
  DomUtility=Runtime.Safe(Next.DomUtility);
  AttrModule=Runtime.Safe(Next.AttrModule);
  AttrProxy=Runtime.Safe(Next.AttrProxy);
  List=Runtime.Safe(Global.WebSharper.List);
  AnimatedAttrNode=Runtime.Safe(Next.AnimatedAttrNode);
  Trans1=Runtime.Safe(Next.Trans1);
  DynamicAttrNode=Runtime.Safe(Next.DynamicAttrNode);
  View1=Runtime.Safe(Next.View1);
  document=Runtime.Safe(Global.document);
  Doc=Runtime.Safe(Next.Doc);
  Elt=Runtime.Safe(Next.Elt);
  Seq1=Runtime.Safe(Global.Seq);
  Docs=Runtime.Safe(Next.Docs);
  String=Runtime.Safe(Next.String);
  CheckedInput=Runtime.Safe(Next.CheckedInput);
  Mailbox=Runtime.Safe(Abbrev.Mailbox);
  Operators=Runtime.Safe(Global.WebSharper.Operators);
  T=Runtime.Safe(List.T);
  jQuery=Runtime.Safe(Global.jQuery);
  NodeSet=Runtime.Safe(Docs.NodeSet);
  DocElemNode=Runtime.Safe(Next.DocElemNode);
  DomNodes=Runtime.Safe(Docs.DomNodes);
  Easing=Runtime.Safe(Next.Easing);
  Easings=Runtime.Safe(Next.Easings);
  Var=Runtime.Safe(Next.Var);
  Var1=Runtime.Safe(Next.Var1);
  RegExp=Runtime.Safe(Global.RegExp);
  FlowBuilder=Runtime.Safe(Next.FlowBuilder);
  Flow=Runtime.Safe(Next.Flow);
  Input=Runtime.Safe(Next.Input);
  DoubleInterpolation=Runtime.Safe(Next.DoubleInterpolation);
  Key=Runtime.Safe(Next.Key);
  ListModels=Runtime.Safe(Next.ListModels);
  RefImpl1=Runtime.Safe(Next.RefImpl1);
  ListModel1=Runtime.Safe(Next.ListModel1);
  Storage1=Runtime.Safe(Next.Storage1);
  ListModel=Runtime.Safe(Next.ListModel);
  Dictionary=Runtime.Safe(Collections.Dictionary);
  Model1=Runtime.Safe(Next.Model1);
  Model=Runtime.Safe(Next.Model);
  encodeURIComponent=Runtime.Safe(Global.encodeURIComponent);
  Strings=Runtime.Safe(Global.WebSharper.Strings);
  Route=Runtime.Safe(Next.Route);
  decodeURIComponent=Runtime.Safe(Global.decodeURIComponent);
  Routing=Runtime.Safe(Next.Routing);
  Router=Runtime.Safe(Next.Router);
  Trie1=Runtime.Safe(Next.Trie1);
  window=Runtime.Safe(Global.window);
  Snap1=Runtime.Safe(Next.Snap1);
  Async=Runtime.Safe(Abbrev.Async);
  Ref=Runtime.Safe(Global.WebSharper.Ref);
  ArrayStorage=Runtime.Safe(Storage1.ArrayStorage);
  LocalStorageBackend=Runtime.Safe(Storage1.LocalStorageBackend);
  JSON=Runtime.Safe(Global.JSON);
  Char=Runtime.Safe(Global.WebSharper.Char);
  Submitter=Runtime.Safe(Next.Submitter);
  Enumerator=Runtime.Safe(Global.WebSharper.Enumerator);
  ResizeArray=Runtime.Safe(Collections.ResizeArray);
  ResizeArrayProxy=Runtime.Safe(ResizeArray.ResizeArrayProxy);
  MapModule=Runtime.Safe(Collections.MapModule);
  FSharpMap=Runtime.Safe(Collections.FSharpMap);
  return RefImpl=Runtime.Safe(Next.RefImpl);
 });
 Runtime.OnLoad(function()
 {
  Runtime.Inherit(Elt,Doc);
  Input.MousePosSt1();
  Input.MouseBtnSt1();
  Input.KeyListenerState();
  Input.ActivateKeyListener();
  Input.ActivateButtonListener();
  Easings.CubicInOut();
  DomUtility.Doc();
  Attrs.EmptyAttr();
  Fresh.counter();
  return;
 });
}());
