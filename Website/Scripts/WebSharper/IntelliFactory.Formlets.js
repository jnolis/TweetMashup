(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,IntelliFactory,Formlets,Base,Formlet,Form,Tree,Edit,Result,List,T,LayoutUtils,Tree1,Util,Seq,Enumerator,Unchecked;
 Runtime.Define(Global,{
  IntelliFactory:{
   Formlets:{
    Base:{
     D:Runtime.Class({
      Dispose:function()
      {
       return null;
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      }
     }),
     Form:Runtime.Class({
      Dispose:function()
      {
       return this.Dispose1.call(null,null);
      }
     }),
     Formlet:Runtime.Class({
      Build:function()
      {
       return this.Build1.call(null,null);
      },
      MapResult:function(f)
      {
       var _this=this;
       return Runtime.New(Formlet,{
        Layout:this.Layout,
        Build1:function()
        {
         var form,objectArg,arg00,arg10,state;
         form=_this.Build1.call(null,null);
         objectArg=_this.Utils.Reactive;
         arg00=form.State;
         arg10=function(x)
         {
          return f(x);
         };
         objectArg.Select(arg00,arg10);
         state=form.State;
         return Runtime.New(Form,{
          Body:form.Body,
          Dispose1:form.Dispose1,
          Notify:form.Notify,
          State:state
         });
        },
        Utils:_this.Utils
       });
      },
      get_Layout:function()
      {
       return this.Layout;
      }
     }),
     FormletBuilder:Runtime.Class({
      Bind:function(x,f)
      {
       var objectArg;
       objectArg=this.F;
       return objectArg.Bind(x,f);
      },
      Delay:function(f)
      {
       return this.F.Delay(f);
      },
      Return:function(x)
      {
       return this.F.Return(x);
      },
      ReturnFrom:function(f)
      {
       return f;
      }
     },{
      New:function(F)
      {
       var r;
       r=Runtime.New(this,{});
       r.F=F;
       return r;
      }
     }),
     FormletProvider:Runtime.Class({
      AppendLayout:function(layout,formlet)
      {
       var arg10;
       arg10=this.ApplyLayout(formlet);
       return this.WithLayout(layout,arg10);
      },
      Apply:function(f,x)
      {
       var arg00,_this=this;
       arg00=function()
       {
        var f1,x1,objectArg,arg001,arg10,left,objectArg1,arg002,arg101,right,objectArg2,body,objectArg3,arg003,arg102,arg20,state;
        f1=_this.BuildForm(f);
        x1=_this.BuildForm(x);
        objectArg=_this.U.Reactive;
        arg001=f1.Body;
        arg10=function(arg0)
        {
         return Runtime.New(Edit,{
          $:1,
          $0:arg0
         });
        };
        left=objectArg.Select(arg001,arg10);
        objectArg1=_this.U.Reactive;
        arg002=x1.Body;
        arg101=function(arg0)
        {
         return Runtime.New(Edit,{
          $:2,
          $0:arg0
         });
        };
        right=objectArg1.Select(arg002,arg101);
        objectArg2=_this.U.Reactive;
        body=objectArg2.Merge(left,right);
        objectArg3=_this.U.Reactive;
        arg003=x1.State;
        arg102=f1.State;
        arg20=function(r)
        {
         return function(f2)
         {
          return Result.Apply(f2,r);
         };
        };
        state=objectArg3.CombineLatest(arg003,arg102,arg20);
        return Runtime.New(Form,{
         Body:body,
         Dispose1:function()
         {
          x1.Dispose1.call(null,null);
          return f1.Dispose1.call(null,null);
         },
         Notify:function(o)
         {
          x1.Notify.call(null,o);
          return f1.Notify.call(null,o);
         },
         State:state
        });
       };
       return _this.New(arg00);
      },
      ApplyLayout:function(formlet)
      {
       var arg00,_this=this;
       arg00=function()
       {
        var form,matchValue,body,_,body1;
        form=formlet.Build();
        matchValue=formlet.get_Layout().Apply.call(null,form.Body);
        if(matchValue.$==0)
         {
          _=form.Body;
         }
        else
         {
          matchValue.$0[1];
          body1=matchValue.$0[0];
          _=_this.U.Reactive.Return(Tree.Set(body1));
         }
        body=_;
        return Runtime.New(Form,{
         Body:body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:form.State
        });
       };
       return _this.New(arg00);
      },
      Bind:function(formlet,f)
      {
       var arg00;
       arg00=this.Map(f,formlet);
       return this.Join(arg00);
      },
      BindWith:function(hF,formlet,f)
      {
       var arg00,_this=this;
       arg00=function()
       {
        var formlet1,form,objectArg,arg001,arg10,left,objectArg1,arg002,arg101,right,matchValue,combB,_,_1,bLeft,bRight,objectArg2,value,arg003;
        formlet1=_this.Bind(formlet,f);
        form=formlet1.Build();
        objectArg=_this.U.Reactive;
        arg001=form.Body;
        arg10=function(edit)
        {
         return edit.$==1?true:false;
        };
        left=_this.U.DefaultLayout.Apply.call(null,objectArg.Where(arg001,arg10));
        objectArg1=_this.U.Reactive;
        arg002=form.Body;
        arg101=function(edit)
        {
         return edit.$==2?true:false;
        };
        right=_this.U.DefaultLayout.Apply.call(null,objectArg1.Where(arg002,arg101));
        matchValue=[left,right];
        if(matchValue[0].$==1)
         {
          if(matchValue[1].$==1)
           {
            bLeft=matchValue[0].$0[0];
            bRight=matchValue[1].$0[0];
            objectArg2=_this.U.Reactive;
            value=(hF(bLeft))(bRight);
            arg003=Tree.Set(value);
            _1=objectArg2.Return(arg003);
           }
          else
           {
            _1=_this.U.Reactive.Never();
           }
          _=_1;
         }
        else
         {
          _=_this.U.Reactive.Never();
         }
        combB=_;
        return Runtime.New(Form,{
         Body:combB,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:form.State
        });
       };
       return _this.New(arg00);
      },
      BuildForm:function(formlet)
      {
       var form,matchValue,_,d,body;
       form=formlet.Build();
       matchValue=formlet.get_Layout().Apply.call(null,form.Body);
       if(matchValue.$==1)
        {
         d=matchValue.$0[1];
         body=matchValue.$0[0];
         _=Runtime.New(Form,{
          Body:this.U.Reactive.Return(Tree.Set(body)),
          Dispose1:function()
          {
           form.Dispose1.call(null,null);
           return d.Dispose();
          },
          Notify:form.Notify,
          State:form.State
         });
        }
       else
        {
         _=form;
        }
       return _;
      },
      Delay:function(f)
      {
       var Build,_this=this;
       Build=function()
       {
        return _this.BuildForm(f(null));
       };
       return Runtime.New(Formlet,{
        Layout:_this.L.Delay(function()
        {
         return f(null).get_Layout();
        }),
        Build1:Build,
        Utils:_this.U
       });
      },
      Deletable:function(formlet)
      {
       var arg10,_this=this;
       arg10=function(value)
       {
        var _,value1;
        if(value.$==1)
         {
          value1=value.$0;
          _=_this.Return({
           $:1,
           $0:value1
          });
         }
        else
         {
          _=_this.ReturnEmpty({
           $:0
          });
         }
        return _;
       };
       return _this.Replace(formlet,arg10);
      },
      Empty:function()
      {
       var arg00,_this=this;
       arg00=function()
       {
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Return(Tree.Delete()),
         Dispose1:function()
         {
         },
         Notify:function()
         {
         },
         State:_this.U.Reactive.Never()
        });
       };
       return _this.New(arg00);
      },
      EmptyForm:function()
      {
       return Runtime.New(Form,{
        Body:this.U.Reactive.Never(),
        Dispose1:function()
        {
        },
        Notify:function()
        {
        },
        State:this.U.Reactive.Never()
       });
      },
      Fail:function(fs)
      {
       return Runtime.New(Form,{
        Body:this.U.Reactive.Never(),
        Dispose1:function(x)
        {
         return x;
        },
        Notify:function()
        {
        },
        State:this.U.Reactive.Return(Runtime.New(Result,{
         $:1,
         $0:fs
        }))
       });
      },
      FailWith:function(fs)
      {
       var arg00,_this=this;
       arg00=function()
       {
        return _this.Fail(fs);
       };
       return _this.New(arg00);
      },
      FlipBody:function(formlet)
      {
       var arg00,_this=this,x,arg002;
       arg00=function()
       {
        var form,objectArg,arg001,arg10,body;
        form=formlet.Build();
        objectArg=_this.U.Reactive;
        arg001=form.Body;
        arg10=function(edit)
        {
         return Tree.FlipEdit(edit);
        };
        body=objectArg.Select(arg001,arg10);
        return Runtime.New(Form,{
         Body:body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:form.State
        });
       };
       x=_this.New(arg00);
       arg002=formlet.get_Layout();
       return _this.WithLayout(arg002,x);
      },
      FromState:function(state)
      {
       var arg00,_this=this;
       arg00=function()
       {
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Never(),
         Dispose1:function()
         {
         },
         Notify:function()
         {
         },
         State:state
        });
       };
       return _this.New(arg00);
      },
      InitWith:function(value,formlet)
      {
       var arg00,_this=this,x,arg002;
       arg00=function()
       {
        var form,objectArg,arg001,arg10,state;
        form=formlet.Build();
        objectArg=_this.U.Reactive;
        arg001=_this.U.Reactive.Return(Runtime.New(Result,{
         $:0,
         $0:value
        }));
        arg10=form.State;
        state=objectArg.Concat(arg001,arg10);
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:state
        });
       };
       x=_this.New(arg00);
       arg002=formlet.get_Layout();
       return _this.WithLayout(arg002,x);
      },
      InitWithFailure:function(formlet)
      {
       var arg00,_this=this,x,arg002;
       arg00=function()
       {
        var form,objectArg,arg001,arg10,state;
        form=formlet.Build();
        objectArg=_this.U.Reactive;
        arg001=_this.U.Reactive.Return(Runtime.New(Result,{
         $:1,
         $0:Runtime.New(T,{
          $:0
         })
        }));
        arg10=form.State;
        state=objectArg.Concat(arg001,arg10);
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:state
        });
       };
       x=_this.New(arg00);
       arg002=formlet.get_Layout();
       return _this.WithLayout(arg002,x);
      },
      Join:function(formlet)
      {
       var arg00,_this=this;
       arg00=function()
       {
        var form1,objectArg,arg001,arg10,objectArg1,arg002,formStream,objectArg2,arg101,value,objectArg4,arg003,arg103,right,objectArg5,objectArg6,arg004,arg104,arg005,body,state,objectArg7,arg105,notify,dispose;
        form1=_this.BuildForm(formlet);
        objectArg=_this.U.Reactive;
        arg001=form1.State;
        arg10=function(res)
        {
         var _,fs,innerF;
         if(res.$==1)
          {
           fs=res.$0;
           _=_this.Fail(fs);
          }
         else
          {
           innerF=res.$0;
           _=_this.BuildForm(innerF);
          }
         return _;
        };
        objectArg1=_this.U.Reactive;
        arg002=objectArg.Select(arg001,arg10);
        formStream=objectArg1.Heat(arg002);
        objectArg2=_this.U.Reactive;
        arg101=function(f)
        {
         var _delete,objectArg3,arg102;
         _delete=_this.U.Reactive.Return(Tree.Delete());
         objectArg3=_this.U.Reactive;
         arg102=f.Body;
         return objectArg3.Concat(_delete,arg102);
        };
        value=objectArg2.Select(formStream,arg101);
        objectArg4=_this.U.Reactive;
        arg003=_this.U.Reactive.Switch(value);
        arg103=function(arg0)
        {
         return Runtime.New(Edit,{
          $:2,
          $0:arg0
         });
        };
        right=objectArg4.Select(arg003,arg103);
        objectArg5=_this.U.Reactive;
        objectArg6=_this.U.Reactive;
        arg004=form1.Body;
        arg104=function(arg0)
        {
         return Runtime.New(Edit,{
          $:1,
          $0:arg0
         });
        };
        arg005=objectArg6.Select(arg004,arg104);
        body=objectArg5.Merge(arg005,right);
        objectArg7=_this.U.Reactive;
        arg105=function(f)
        {
         return f.State;
        };
        state=_this.U.Reactive.Switch(objectArg7.Select(formStream,arg105));
        notify=function(o)
        {
         return form1.Notify.call(null,o);
        };
        dispose=function()
        {
         return form1.Dispose1.call(null,null);
        };
        return Runtime.New(Form,{
         Body:body,
         Dispose1:dispose,
         Notify:notify,
         State:state
        });
       };
       return _this.New(arg00);
      },
      LiftResult:function(formlet)
      {
       var arg00;
       arg00=function(arg0)
       {
        return Runtime.New(Result,{
         $:0,
         $0:arg0
        });
       };
       return this.MapResult(arg00,formlet);
      },
      Map:function(f,formlet)
      {
       var arg00;
       arg00=function(arg10)
       {
        return Result.Map(f,arg10);
       };
       return this.MapResult(arg00,formlet);
      },
      MapBody:function(f,formlet)
      {
       var layout,_this=this;
       layout={
        Apply:function(o)
        {
         var matchValue,_,matchValue1,_1,d,body,d1,body1;
         matchValue=formlet.get_Layout().Apply.call(null,o);
         if(matchValue.$==0)
          {
           matchValue1=_this.U.DefaultLayout.Apply.call(null,o);
           if(matchValue1.$==0)
            {
             _1={
              $:0
             };
            }
           else
            {
             d=matchValue1.$0[1];
             body=matchValue1.$0[0];
             _1={
              $:1,
              $0:[f(body),d]
             };
            }
           _=_1;
          }
         else
          {
           d1=matchValue.$0[1];
           body1=matchValue.$0[0];
           _={
            $:1,
            $0:[f(body1),d1]
           };
          }
         return _;
        }
       };
       return _this.WithLayout(layout,formlet);
      },
      MapResult:function(f,formlet)
      {
       var Build,_this=this;
       Build=function()
       {
        var form,objectArg,arg00,arg10,state;
        form=formlet.Build();
        objectArg=_this.U.Reactive;
        arg00=form.State;
        arg10=function(x)
        {
         return f(x);
        };
        state=objectArg.Select(arg00,arg10);
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:state
        });
       };
       return Runtime.New(Formlet,{
        Layout:formlet.get_Layout(),
        Build1:Build,
        Utils:_this.U
       });
      },
      Never:function()
      {
       var arg00,_this=this;
       arg00=function()
       {
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Never(),
         Dispose1:function()
         {
         },
         Notify:function()
         {
         },
         State:_this.U.Reactive.Never()
        });
       };
       return _this.New(arg00);
      },
      New:function(build)
      {
       return Runtime.New(Formlet,{
        Layout:this.L.Default(),
        Build1:build,
        Utils:this.U
       });
      },
      Replace:function(formlet,f)
      {
       var arg00,arg001;
       arg00=function(value)
       {
        return f(value);
       };
       arg001=this.Map(arg00,formlet);
       return this.Switch(arg001);
      },
      ReplaceFirstWithFailure:function(formlet)
      {
       var arg00,_this=this,x,arg003;
       arg00=function()
       {
        var form,objectArg,arg001,state,objectArg1,arg002,state1;
        form=formlet.Build();
        objectArg=_this.U.Reactive;
        arg001=form.State;
        state=objectArg.Drop(arg001,1);
        objectArg1=_this.U.Reactive;
        arg002=_this.U.Reactive.Return(Runtime.New(Result,{
         $:1,
         $0:Runtime.New(T,{
          $:0
         })
        }));
        state1=objectArg1.Concat(arg002,state);
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:state1
        });
       };
       x=_this.New(arg00);
       arg003=formlet.get_Layout();
       return _this.WithLayout(arg003,x);
      },
      Return:function(x)
      {
       var arg00,_this=this;
       arg00=function()
       {
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Never(),
         Dispose1:function(x1)
         {
          return x1;
         },
         Notify:function()
         {
         },
         State:_this.U.Reactive.Return(Runtime.New(Result,{
          $:0,
          $0:x
         }))
        });
       };
       return _this.New(arg00);
      },
      ReturnEmpty:function(x)
      {
       var arg00,_this=this;
       arg00=function()
       {
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Return(Tree.Delete()),
         Dispose1:function(x1)
         {
          return x1;
         },
         Notify:function()
         {
         },
         State:_this.U.Reactive.Return(Runtime.New(Result,{
          $:0,
          $0:x
         }))
        });
       };
       return _this.New(arg00);
      },
      SelectMany:function(formlet)
      {
       var arg00,_this=this;
       arg00=function()
       {
        var form1,objectArg,arg001,arg10,objectArg1,arg002,formStream,objectArg2,arg003,arg101,left,tag,incrTag,objectArg3,arg102,allBodies,right,objectArg5,body,objectArg6,arg103,stateStream,objectArg7,arg005,arg104,state,notify,dispose;
        form1=_this.BuildForm(formlet);
        objectArg=_this.U.Reactive;
        arg001=form1.State;
        arg10=function(res)
        {
         var _,innerF,arg0;
         if(res.$==1)
          {
           res.$0;
           _={
            $:0
           };
          }
         else
          {
           innerF=res.$0;
           arg0=_this.BuildForm(innerF);
           _={
            $:1,
            $0:arg0
           };
          }
         return _;
        };
        objectArg1=_this.U.Reactive;
        arg002=objectArg.Choose(arg001,arg10);
        formStream=objectArg1.Heat(arg002);
        objectArg2=_this.U.Reactive;
        arg003=form1.Body;
        arg101=function(arg0)
        {
         return Runtime.New(Edit,{
          $:1,
          $0:arg0
         });
        };
        left=objectArg2.Select(arg003,arg101);
        tag=[function(arg0)
        {
         return Runtime.New(Edit,{
          $:1,
          $0:arg0
         });
        }];
        incrTag=function()
        {
         var f;
         f=tag[0];
         tag[0]=function(x)
         {
          var arg0;
          arg0=f(x);
          return Runtime.New(Edit,{
           $:2,
           $0:arg0
          });
         };
         return;
        };
        objectArg3=_this.U.Reactive;
        arg102=function(f)
        {
         var tagLocal,objectArg4,arg004;
         incrTag(null);
         tagLocal=tag[0];
         objectArg4=_this.U.Reactive;
         arg004=f.Body;
         return objectArg4.Select(arg004,tagLocal);
        };
        allBodies=objectArg3.Select(formStream,arg102);
        right=_this.U.Reactive.SelectMany(allBodies);
        objectArg5=_this.U.Reactive;
        body=objectArg5.Merge(left,right);
        objectArg6=_this.U.Reactive;
        arg103=function(f)
        {
         return f.State;
        };
        stateStream=objectArg6.Select(formStream,arg103);
        objectArg7=_this.U.Reactive;
        arg005=_this.U.Reactive.CollectLatest(stateStream);
        arg104=function(arg004)
        {
         return Result.Sequence(arg004);
        };
        state=objectArg7.Select(arg005,arg104);
        notify=function(o)
        {
         return form1.Notify.call(null,o);
        };
        dispose=function()
        {
         return form1.Dispose1.call(null,null);
        };
        return Runtime.New(Form,{
         Body:body,
         Dispose1:dispose,
         Notify:notify,
         State:state
        });
       };
       return _this.New(arg00);
      },
      Sequence:function(fs)
      {
       var fs1,_,fs2,f,fComp,fRest,arg00;
       fs1=List.ofSeq(fs);
       if(fs1.$==1)
        {
         fs2=fs1.$1;
         f=fs1.$0;
         fComp=this.Return(function(v)
         {
          return function(vs)
          {
           return Runtime.New(T,{
            $:1,
            $0:v,
            $1:vs
           });
          };
         });
         fRest=this.Sequence(fs2);
         arg00=this.Apply(fComp,f);
         _=this.Apply(arg00,fRest);
        }
       else
        {
         _=this.Return(Runtime.New(T,{
          $:0
         }));
        }
       return _;
      },
      Switch:function(formlet)
      {
       var arg00,_this=this;
       arg00=function()
       {
        var arg001,formlet1,form1,objectArg,arg002,arg10,objectArg1,arg003,formStream,objectArg2,arg004,arg101,objectArg3,arg102,body,state,objectArg4,arg103,notify,dispose;
        arg001=_this.WithLayoutOrDefault(formlet);
        formlet1=_this.ApplyLayout(arg001);
        form1=_this.BuildForm(formlet1);
        objectArg=_this.U.Reactive;
        arg002=form1.State;
        arg10=function(res)
        {
         var _,innerF,arg0;
         if(res.$==1)
          {
           res.$0;
           _={
            $:0
           };
          }
         else
          {
           innerF=res.$0;
           arg0=_this.BuildForm(innerF);
           _={
            $:1,
            $0:arg0
           };
          }
         return _;
        };
        objectArg1=_this.U.Reactive;
        arg003=objectArg.Choose(arg002,arg10);
        formStream=objectArg1.Heat(arg003);
        objectArg2=_this.U.Reactive;
        arg004=form1.Body;
        objectArg3=_this.U.Reactive;
        arg102=function(f)
        {
         return f.Body;
        };
        arg101=_this.U.Reactive.Switch(objectArg3.Select(formStream,arg102));
        body=objectArg2.Concat(arg004,arg101);
        objectArg4=_this.U.Reactive;
        arg103=function(f)
        {
         return f.State;
        };
        state=_this.U.Reactive.Switch(objectArg4.Select(formStream,arg103));
        notify=function(o)
        {
         return form1.Notify.call(null,o);
        };
        dispose=function()
        {
         return form1.Dispose1.call(null,null);
        };
        return Runtime.New(Form,{
         Body:body,
         Dispose1:dispose,
         Notify:notify,
         State:state
        });
       };
       return _this.New(arg00);
      },
      WithCancelation:function(formlet,cancelFormlet)
      {
       var compose,f1,f2,f3,f,arg00,arg10;
       compose=function(r1)
       {
        return function(r2)
        {
         var matchValue,_,_1,fs,s;
         matchValue=[r1,r2];
         if(matchValue[1].$==0)
          {
           _=Runtime.New(Result,{
            $:0,
            $0:{
             $:0
            }
           });
          }
         else
          {
           if(matchValue[0].$==1)
            {
             fs=matchValue[0].$0;
             _1=Runtime.New(Result,{
              $:1,
              $0:fs
             });
            }
           else
            {
             s=matchValue[0].$0;
             _1=Runtime.New(Result,{
              $:0,
              $0:{
               $:1,
               $0:s
              }
             });
            }
           _=_1;
          }
         return _;
        };
       };
       f1=this.Return(compose);
       f2=this.LiftResult(formlet);
       f3=this.LiftResult(cancelFormlet);
       f=this.Apply(f1,f2);
       arg00=function(arg001)
       {
        return Result.Join(arg001);
       };
       arg10=this.Apply(f,f3);
       return this.MapResult(arg00,arg10);
      },
      WithLayout:function(layout,formlet)
      {
       return Runtime.New(Formlet,{
        Layout:layout,
        Build1:function()
        {
         return formlet.Build();
        },
        Utils:this.U
       });
      },
      WithLayoutOrDefault:function(formlet)
      {
       var arg00;
       arg00=function(x)
       {
        return x;
       };
       return this.MapBody(arg00,formlet);
      },
      WithNotification:function(notify,formlet)
      {
       var arg00,_this=this,x,arg001;
       arg00=function()
       {
        var form,Notify;
        form=_this.BuildForm(formlet);
        Notify=function(obj)
        {
         form.Notify.call(null,obj);
         return notify(obj);
        };
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:Notify,
         State:form.State
        });
       };
       x=_this.New(arg00);
       arg001=formlet.get_Layout();
       return _this.WithLayout(arg001,x);
      },
      WithNotificationChannel:function(formlet)
      {
       var arg00,_this=this,x,arg003;
       arg00=function()
       {
        var form,objectArg,arg001,arg002,arg10,state,Body,Notify;
        form=formlet.Build();
        objectArg=_this.U.Reactive;
        arg001=form.State;
        arg002=function(v)
        {
         return[v,form.Notify];
        };
        arg10=function(arg101)
        {
         return Result.Map(arg002,arg101);
        };
        state=objectArg.Select(arg001,arg10);
        Body=form.Body;
        Notify=form.Notify;
        return Runtime.New(Form,{
         Body:Body,
         Dispose1:form.Dispose1,
         Notify:Notify,
         State:state
        });
       };
       x=_this.New(arg00);
       arg003=formlet.get_Layout();
       return _this.WithLayout(arg003,x);
      }
     },{
      New:function(U)
      {
       var r;
       r=Runtime.New(this,{});
       r.U=U;
       r.L=LayoutUtils.New({
        Reactive:r.U.Reactive
       });
       return r;
      }
     }),
     LayoutUtils:Runtime.Class({
      Default:function()
      {
       return{
        Apply:function()
        {
         return{
          $:0
         };
        }
       };
      },
      Delay:function(f)
      {
       return{
        Apply:function(x)
        {
         return f(null).Apply.call(null,x);
        }
       };
      },
      New:function(container)
      {
       return{
        Apply:function(event)
        {
         var panel,tree,disp;
         panel=container(null);
         tree=[Runtime.New(Tree1,{
          $:0
         })];
         disp=Util.subscribeTo(event,function(edit)
         {
          var deletedTree,patternInput,off,action;
          deletedTree=Tree.ReplacedTree(edit,tree[0]);
          tree[0]=Tree.Apply(edit,tree[0]);
          patternInput=Tree.Range(edit,tree[0]);
          off=patternInput[0];
          panel.Remove.call(null,deletedTree.get_Sequence());
          action=function(i)
          {
           return function(e)
           {
            return(panel.Insert.call(null,off+i))(e);
           };
          };
          return Seq.iteri(action,edit);
         });
         return{
          $:1,
          $0:[panel.Body,disp]
         };
        }
       };
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      }
     }),
     Result:Runtime.Class({},{
      Apply:function(f,r)
      {
       var matchValue,_,_1,fs1,fs2,fs,_2,fs3,f1,v;
       matchValue=[f,r];
       if(matchValue[0].$==1)
        {
         if(matchValue[1].$==1)
          {
           fs1=matchValue[0].$0;
           fs2=matchValue[1].$0;
           _1=Runtime.New(Result,{
            $:1,
            $0:List.append(fs1,fs2)
           });
          }
         else
          {
           fs=matchValue[0].$0;
           _1=Runtime.New(Result,{
            $:1,
            $0:fs
           });
          }
         _=_1;
        }
       else
        {
         if(matchValue[1].$==1)
          {
           matchValue[0].$0;
           fs3=matchValue[1].$0;
           _2=Runtime.New(Result,{
            $:1,
            $0:fs3
           });
          }
         else
          {
           f1=matchValue[0].$0;
           v=matchValue[1].$0;
           _2=Runtime.New(Result,{
            $:0,
            $0:f1(v)
           });
          }
         _=_2;
        }
       return _;
      },
      Join:function(res)
      {
       var _,fs,s;
       if(res.$==1)
        {
         fs=res.$0;
         _=Runtime.New(Result,{
          $:1,
          $0:fs
         });
        }
       else
        {
         s=res.$0;
         _=s;
        }
       return _;
      },
      Map:function(f,res)
      {
       var _,fs,v;
       if(res.$==1)
        {
         fs=res.$0;
         _=Runtime.New(Result,{
          $:1,
          $0:fs
         });
        }
       else
        {
         v=res.$0;
         _=Runtime.New(Result,{
          $:0,
          $0:f(v)
         });
        }
       return _;
      },
      OfOption:function(o)
      {
       var _,v;
       if(o.$==0)
        {
         _=Runtime.New(Result,{
          $:1,
          $0:Runtime.New(T,{
           $:0
          })
         });
        }
       else
        {
         v=o.$0;
         _=Runtime.New(Result,{
          $:0,
          $0:v
         });
        }
       return _;
      },
      Sequence:function(rs)
      {
       var merge;
       merge=function(rs1)
       {
        return function(r)
        {
         var _,fs1,_1,fs2,vs,_2,fs,v;
         if(rs1.$==1)
          {
           fs1=rs1.$0;
           if(r.$==1)
            {
             fs2=r.$0;
             _1=Runtime.New(Result,{
              $:1,
              $0:List.append(fs1,fs2)
             });
            }
           else
            {
             r.$0;
             _1=Runtime.New(Result,{
              $:1,
              $0:fs1
             });
            }
           _=_1;
          }
         else
          {
           vs=rs1.$0;
           if(r.$==1)
            {
             fs=r.$0;
             _2=Runtime.New(Result,{
              $:1,
              $0:fs
             });
            }
           else
            {
             v=r.$0;
             _2=Runtime.New(Result,{
              $:0,
              $0:List.append(vs,List.ofArray([v]))
             });
            }
           _=_2;
          }
         return _;
        };
       };
       return Seq.fold(merge,Runtime.New(Result,{
        $:0,
        $0:Runtime.New(T,{
         $:0
        })
       }),rs);
      }
     }),
     Tree:{
      Apply:function(edit,input)
      {
       var apply;
       apply=function(edit1,input1)
       {
        var _,edit2,_1,r,l,edit3,_2,r1,l1,output;
        if(edit1.$==1)
         {
          edit2=edit1.$0;
          if(input1.$==2)
           {
            r=input1.$1;
            l=input1.$0;
            _1=Runtime.New(Tree1,{
             $:2,
             $0:apply(edit2,l),
             $1:r
            });
           }
          else
           {
            _1=apply(Runtime.New(Edit,{
             $:1,
             $0:edit2
            }),Runtime.New(Tree1,{
             $:2,
             $0:Runtime.New(Tree1,{
              $:0
             }),
             $1:input1
            }));
           }
          _=_1;
         }
        else
         {
          if(edit1.$==2)
           {
            edit3=edit1.$0;
            if(input1.$==2)
             {
              r1=input1.$1;
              l1=input1.$0;
              _2=Runtime.New(Tree1,{
               $:2,
               $0:l1,
               $1:apply(edit3,r1)
              });
             }
            else
             {
              _2=apply(Runtime.New(Edit,{
               $:2,
               $0:edit3
              }),Runtime.New(Tree1,{
               $:2,
               $0:input1,
               $1:Runtime.New(Tree1,{
                $:0
               })
              }));
             }
            _=_2;
           }
          else
           {
            output=edit1.$0;
            _=output;
           }
         }
        return _;
       };
       return apply(edit,input);
      },
      Count:function(t)
      {
       var loop,_,_1,b,a,_2,_3,tree,k,_4,ts,t1,_5;
       loop=[];
       _=Runtime.New(T,{
        $:0
       });
       loop[3]=t;
       loop[2]=_;
       loop[1]=0;
       loop[0]=1;
       while(loop[0])
        {
         if(loop[3].$==2)
          {
           b=loop[3].$1;
           a=loop[3].$0;
           _2=Runtime.New(T,{
            $:1,
            $0:b,
            $1:loop[2]
           });
           _3=loop[1];
           loop[3]=a;
           loop[2]=_2;
           loop[1]=_3;
           _1=void(loop[0]=1);
          }
         else
          {
           tree=loop[3];
           k=tree.$==0?0:1;
           if(loop[2].$==1)
            {
             ts=loop[2].$1;
             t1=loop[2].$0;
             _5=loop[1]+k;
             loop[3]=t1;
             loop[2]=ts;
             loop[1]=_5;
             _4=void(loop[0]=1);
            }
           else
            {
             loop[0]=0;
             _4=void(loop[1]=loop[1]+k);
            }
           _1=_4;
          }
        }
       return loop[1];
      },
      DeepFlipEdit:function(edit)
      {
       var _,e,e1,t;
       if(edit.$==1)
        {
         e=edit.$0;
         _=Runtime.New(Edit,{
          $:2,
          $0:Tree.DeepFlipEdit(e)
         });
        }
       else
        {
         if(edit.$==2)
          {
           e1=edit.$0;
           _=Runtime.New(Edit,{
            $:1,
            $0:Tree.DeepFlipEdit(e1)
           });
          }
         else
          {
           t=edit.$0;
           _=Runtime.New(Edit,{
            $:0,
            $0:t
           });
          }
        }
       return _;
      },
      Delete:function()
      {
       return Runtime.New(Edit,{
        $:0,
        $0:Runtime.New(Tree1,{
         $:0
        })
       });
      },
      Edit:Runtime.Class({
       GetEnumerator:function()
       {
        return Enumerator.Get(this.get_Sequence());
       },
       GetEnumerator1:function()
       {
        return Enumerator.Get(this.get_Sequence());
       },
       get_Sequence:function()
       {
        var _,edit,edit1,tree;
        if(this.$==1)
         {
          edit=this.$0;
          _=edit.get_Sequence();
         }
        else
         {
          if(this.$==2)
           {
            edit1=this.$0;
            _=edit1.get_Sequence();
           }
          else
           {
            tree=this.$0;
            _=tree.get_Sequence();
           }
         }
        return _;
       }
      }),
      FlipEdit:function(edit)
      {
       var _,e,e1,t;
       if(edit.$==1)
        {
         e=edit.$0;
         _=Runtime.New(Edit,{
          $:2,
          $0:e
         });
        }
       else
        {
         if(edit.$==2)
          {
           e1=edit.$0;
           _=Runtime.New(Edit,{
            $:1,
            $0:e1
           });
          }
         else
          {
           t=edit.$0;
           _=Runtime.New(Edit,{
            $:0,
            $0:t
           });
          }
        }
       return _;
      },
      FromSequence:function(vs)
      {
       var folder,state1;
       folder=function(state)
       {
        return function(v)
        {
         return Runtime.New(Tree1,{
          $:2,
          $0:state,
          $1:Runtime.New(Tree1,{
           $:1,
           $0:v
          })
         });
        };
       };
       state1=Runtime.New(Tree1,{
        $:0
       });
       return Seq.fold(folder,state1,vs);
      },
      Range:function(edit,input)
      {
       var loop,_,edit1,_1,l,_2,_3,edit2,_4,r,l1,tree,_5,_6;
       loop=[];
       loop[3]=0;
       loop[2]=input;
       loop[1]=edit;
       loop[0]=1;
       while(loop[0])
        {
         if(loop[1].$==1)
          {
           edit1=loop[1].$0;
           if(loop[2].$==2)
            {
             loop[2].$1;
             l=loop[2].$0;
             loop[3]=loop[3];
             loop[2]=l;
             loop[1]=edit1;
             _1=void(loop[0]=1);
            }
           else
            {
             _2=loop[3];
             _3=Runtime.New(Tree1,{
              $:0
             });
             loop[3]=_2;
             loop[2]=_3;
             loop[1]=edit1;
             _1=void(loop[0]=1);
            }
           _=_1;
          }
         else
          {
           if(loop[1].$==2)
            {
             edit2=loop[1].$0;
             if(loop[2].$==2)
              {
               r=loop[2].$1;
               l1=loop[2].$0;
               loop[3]=loop[3]+Tree.Count(l1);
               loop[2]=r;
               loop[1]=edit2;
               _4=void(loop[0]=1);
              }
             else
              {
               tree=loop[2];
               _5=loop[3]+Tree.Count(tree);
               _6=Runtime.New(Tree1,{
                $:0
               });
               loop[3]=_5;
               loop[2]=_6;
               loop[1]=edit2;
               _4=void(loop[0]=1);
              }
             _=_4;
            }
           else
            {
             loop[1].$0;
             loop[0]=0;
             _=void(loop[1]=[loop[3],Tree.Count(loop[2])]);
            }
          }
        }
       return loop[1];
      },
      ReplacedTree:function(edit,input)
      {
       var _,edit1,_1,l,edit2,_2,r;
       if(edit.$==1)
        {
         edit1=edit.$0;
         if(input.$==2)
          {
           input.$1;
           l=input.$0;
           _1=Tree.ReplacedTree(edit1,l);
          }
         else
          {
           _1=Tree.ReplacedTree(Runtime.New(Edit,{
            $:1,
            $0:edit1
           }),Runtime.New(Tree1,{
            $:2,
            $0:Runtime.New(Tree1,{
             $:0
            }),
            $1:input
           }));
          }
         _=_1;
        }
       else
        {
         if(edit.$==2)
          {
           edit2=edit.$0;
           if(input.$==2)
            {
             r=input.$1;
             input.$0;
             _2=Tree.ReplacedTree(edit2,r);
            }
           else
            {
             _2=Tree.ReplacedTree(Runtime.New(Edit,{
              $:2,
              $0:edit2
             }),Runtime.New(Tree1,{
              $:2,
              $0:input,
              $1:Runtime.New(Tree1,{
               $:0
              })
             }));
            }
           _=_2;
          }
         else
          {
           edit.$0;
           _=input;
          }
        }
       return _;
      },
      Set:function(value)
      {
       return Runtime.New(Edit,{
        $:0,
        $0:Runtime.New(Tree1,{
         $:1,
         $0:value
        })
       });
      },
      ShowEdit:function(edit)
      {
       var showE;
       showE=function(edit1)
       {
        var _,l,r;
        if(edit1.$==1)
         {
          l=edit1.$0;
          _="Left > "+showE(l);
         }
        else
         {
          if(edit1.$==2)
           {
            r=edit1.$0;
            _="Right > "+showE(r);
           }
          else
           {
            _="Replace";
           }
         }
        return _;
       };
       return showE(edit);
      },
      Transform:function(f,edit)
      {
       var _,e,arg0,e1,arg01,t;
       if(edit.$==1)
        {
         e=edit.$0;
         arg0=Tree.Transform(f,e);
         _=Runtime.New(Edit,{
          $:1,
          $0:arg0
         });
        }
       else
        {
         if(edit.$==2)
          {
           e1=edit.$0;
           arg01=Tree.Transform(f,e1);
           _=Runtime.New(Edit,{
            $:2,
            $0:arg01
           });
          }
         else
          {
           t=edit.$0;
           _=Runtime.New(Edit,{
            $:0,
            $0:f(t)
           });
          }
        }
       return _;
      },
      Tree:Runtime.Class({
       GetEnumerator:function()
       {
        return Enumerator.Get(this.get_Sequence());
       },
       GetEnumerator1:function()
       {
        return Enumerator.Get(this.get_Sequence());
       },
       Map:function(f)
       {
        var _,t,right,left;
        if(this.$==1)
         {
          t=this.$0;
          _=Runtime.New(Tree1,{
           $:1,
           $0:f(t)
          });
         }
        else
         {
          if(this.$==2)
           {
            right=this.$1;
            left=this.$0;
            _=Runtime.New(Tree1,{
             $:2,
             $0:left.Map(f),
             $1:right.Map(f)
            });
           }
          else
           {
            _=Runtime.New(Tree1,{
             $:0
            });
           }
         }
        return _;
       },
       get_Sequence:function()
       {
        var _,x,y,x1;
        if(this.$==1)
         {
          x=this.$0;
          _=[x];
         }
        else
         {
          if(this.$==2)
           {
            y=this.$1;
            x1=this.$0;
            _=Seq.append(x1.get_Sequence(),y.get_Sequence());
           }
          else
           {
            _=Seq.empty();
           }
         }
        return _;
       }
      })
     },
     Validator:Runtime.Class({
      Is:function(f,m,flet)
      {
       return this.Validate(f,m,flet);
      },
      IsEmail:function(msg)
      {
       var _this=this;
       return function(arg20)
       {
        return _this.IsRegexMatch("^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$",msg,arg20);
       };
      },
      IsEqual:function(value,msg,flet)
      {
       var arg00;
       arg00=function(i)
       {
        return Unchecked.Equals(i,value);
       };
       return this.Validate(arg00,msg,flet);
      },
      IsFloat:function(msg)
      {
       var _this=this;
       return function(arg20)
       {
        return _this.IsRegexMatch("^\\s*(\\+|-)?((\\d+(\\.\\d+)?)|(\\.\\d+))\\s*$",msg,arg20);
       };
      },
      IsGreaterThan:function(min,msg,flet)
      {
       var arg00;
       arg00=function(i)
       {
        return Unchecked.Compare(i,min)===1;
       };
       return this.Validate(arg00,msg,flet);
      },
      IsInt:function(msg)
      {
       var _this=this;
       return function(arg20)
       {
        return _this.IsRegexMatch("^-?\\d+$",msg,arg20);
       };
      },
      IsLessThan:function(max,msg,flet)
      {
       var arg00;
       arg00=function(i)
       {
        return Unchecked.Compare(i,max)===-1;
       };
       return this.Validate(arg00,msg,flet);
      },
      IsNotEmpty:function(msg,flet)
      {
       var arg00;
       arg00=function(s)
       {
        return s!=="";
       };
       return this.Validate(arg00,msg,flet);
      },
      IsNotEqual:function(value,msg,flet)
      {
       return this.Validate(function(i)
       {
        return!Unchecked.Equals(i,value);
       },msg,flet);
      },
      IsRegexMatch:function(regex,msg,flet)
      {
       var arg00,_this=this;
       arg00=function(x)
       {
        var objectArg;
        objectArg=_this.VP;
        return objectArg.Matches(regex,x);
       };
       return _this.Validate(arg00,msg,flet);
      },
      IsTrue:function(msg,flet)
      {
       var arg00;
       arg00=function(x)
       {
        return x;
       };
       return this.Validate(arg00,msg,flet);
      },
      Validate:function(f,msg,flet)
      {
       var value;
       value=flet.MapResult(function(res)
       {
        var _,fs,v;
        if(res.$==1)
         {
          fs=res.$0;
          _=Runtime.New(Result,{
           $:1,
           $0:fs
          });
         }
        else
         {
          v=res.$0;
          _=f(v)?Runtime.New(Result,{
           $:0,
           $0:v
          }):Runtime.New(Result,{
           $:1,
           $0:List.ofArray([msg])
          });
         }
        return _;
       });
       return value;
      }
     },{
      New:function(VP)
      {
       var r;
       r=Runtime.New(this,{});
       r.VP=VP;
       return r;
      }
     })
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  IntelliFactory=Runtime.Safe(Global.IntelliFactory);
  Formlets=Runtime.Safe(IntelliFactory.Formlets);
  Base=Runtime.Safe(Formlets.Base);
  Formlet=Runtime.Safe(Base.Formlet);
  Form=Runtime.Safe(Base.Form);
  Tree=Runtime.Safe(Base.Tree);
  Edit=Runtime.Safe(Tree.Edit);
  Result=Runtime.Safe(Base.Result);
  List=Runtime.Safe(Global.WebSharper.List);
  T=Runtime.Safe(List.T);
  LayoutUtils=Runtime.Safe(Base.LayoutUtils);
  Tree1=Runtime.Safe(Tree.Tree);
  Util=Runtime.Safe(Global.WebSharper.Util);
  Seq=Runtime.Safe(Global.WebSharper.Seq);
  Enumerator=Runtime.Safe(Global.WebSharper.Enumerator);
  return Unchecked=Runtime.Safe(Global.WebSharper.Unchecked);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());
