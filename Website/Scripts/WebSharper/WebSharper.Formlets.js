(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Formlets,Body,List,Html,Client,Tags,Controls,IntelliFactory,Reactive,HotStream,Formlets1,Base,Result,Attr,T,Operators,jQuery,EventsPervasives,Data,Formlet,Ref,CssConstants,Math,Seq,Utils,Tree,Edit,Form,Arrays,FormletProvider,Formlet1,Pagelet,Util,LayoutProvider,LayoutUtils,Reactive1,Validator,ValidatorProvidor,RegExp,Collections,Dictionary,ElementStore,Enhance,FormButtonConfiguration,FormContainerConfiguration,Padding,ManyConfiguration,ValidationFrameConfiguration,ValidationIconConfiguration,JSON,FormletBuilder,Layout,FormRowConfiguration,LabelConfiguration,Padding1,Enumerator;
 Runtime.Define(Global,{
  WebSharper:{
   Formlets:{
    Body:Runtime.Class({},{
     New:function(el,l)
     {
      return Runtime.New(Body,{
       Element:el,
       Label:l
      });
     }
    }),
    Controls:{
     Button:function(label)
     {
      var genElem;
      genElem=function()
      {
       var arg10;
       arg10=List.ofArray([Tags.Tags().text(label)]);
       return Tags.Tags().NewTag("button",arg10);
      };
      return Controls.ElementButton(genElem);
     },
     Checkbox:function(def)
     {
      return Controls.CheckboxControl(false,def);
     },
     CheckboxControl:function(readOnly,def)
     {
      var f;
      f=function()
      {
       var state,readOnlyAtts,x,arg10,arg00,body,reset;
       state=HotStream.New(Runtime.New(Result,{
        $:0,
        $0:def
       }));
       readOnlyAtts=readOnly?List.ofArray([Attr.Attr().NewAttr("disabled","disabled")]):Runtime.New(T,{
        $:0
       });
       arg10=List.ofArray([Attr.Attr().NewAttr("type","checkbox"),Attr.Attr().NewAttr("class","inputCheckbox")]);
       x=Operators.add(Tags.Tags().NewTag("input",arg10),readOnlyAtts);
       arg00=function(cb)
       {
        return function()
        {
         var _,arg0,arg001;
         if(!readOnly)
          {
           arg0=jQuery(cb.get_Body()).prop("checked");
           arg001=Runtime.New(Result,{
            $:0,
            $0:arg0
           });
           _=state.Trigger(arg001);
          }
         else
          {
           _=null;
          }
         return _;
        };
       };
       EventsPervasives.Events().OnClick(arg00,x);
       body=x;
       def?body["HtmlProvider@33"].SetAttribute(body.get_Body(),"defaultChecked","true"):body["HtmlProvider@33"].RemoveAttribute(body.get_Body(),"checked");
       reset=function()
       {
        var _;
        if(def)
         {
          _=body["HtmlProvider@33"].SetProperty(body.get_Body(),"checked",true);
         }
        else
         {
          body["HtmlProvider@33"].RemoveAttribute(body.get_Body(),"checked");
          _=body["HtmlProvider@33"].SetProperty(body.get_Body(),"checked",false);
         }
        return state.Trigger(Runtime.New(Result,{
         $:0,
         $0:def
        }));
       };
       reset(null);
       return[body,reset,state];
      };
      return Data.MkFormlet(f);
     },
     CheckboxGroup:function(values)
     {
      return Controls.CheckboxGroupControl(false,values);
     },
     CheckboxGroupControl:function(readOnly,values)
     {
      var mapping,chooser,f1,fs,formlet1;
      mapping=function(tupledArg)
      {
       var l,v,b,x,arg0,label,f,formlet;
       l=tupledArg[0];
       v=tupledArg[1];
       b=tupledArg[2];
       x=Controls.CheckboxControl(readOnly,b);
       arg0=function()
       {
        var arg10;
        arg10=List.ofArray([Tags.Tags().text(l)]);
        return Tags.Tags().NewTag("label",arg10);
       };
       label={
        $:1,
        $0:arg0
       };
       f=function(b1)
       {
        return[b1,v];
       };
       formlet=Formlet.WithLabel(label,x);
       return Formlet.Map(f,formlet);
      };
      chooser=function(tupledArg)
      {
       var b,v;
       b=tupledArg[0];
       v=tupledArg[1];
       return b?{
        $:1,
        $0:v
       }:{
        $:0
       };
      };
      f1=function(list)
      {
       return List.choose(chooser,list);
      };
      fs=List.map(mapping,values);
      formlet1=Formlet.Sequence(fs);
      return Formlet.Map(f1,formlet1);
     },
     ElementButton:function(genElem)
     {
      var f;
      f=function()
      {
       var state,count,x,arg00,body,reset;
       state=HotStream.New(Runtime.New(Result,{
        $:1,
        $0:Runtime.New(T,{
         $:0
        })
       }));
       count=[0];
       x=genElem(null);
       arg00=function()
       {
        return function()
        {
         state.Trigger(Runtime.New(Result,{
          $:0,
          $0:count[0]
         }));
         return Ref.incr(count);
        };
       };
       EventsPervasives.Events().OnClick(arg00,x);
       body=x;
       reset=function()
       {
        count[0]=0;
        return state.Trigger(Runtime.New(Result,{
         $:1,
         $0:Runtime.New(T,{
          $:0
         })
        }));
       };
       return[body,reset,state];
      };
      return Data.MkFormlet(f);
     },
     Input:function(value)
     {
      return Controls.InputField(false,"text",CssConstants.InputTextClass(),value);
     },
     InputControl:function(value,f)
     {
      var f1;
      f1=function()
      {
       var state,body,reset;
       state=HotStream.New(Runtime.New(Result,{
        $:0,
        $0:value
       }));
       body=f(state);
       body.set_Value(value);
       reset=function()
       {
        body.set_Value(value);
        return state.Trigger(Runtime.New(Result,{
         $:0,
         $0:value
        }));
       };
       return[body,reset,state];
      };
      return Data.MkFormlet(f1);
     },
     InputField:function(readOnly,typ,cls,value)
     {
      return Controls.InputControl(value,function(state)
      {
       var ro,x,input,f;
       ro=readOnly?List.ofArray([Attr.Attr().NewAttr("readonly","readonly")]):Runtime.New(T,{
        $:0
       });
       x=List.append(List.ofArray([Attr.Attr().NewAttr("type",typ),Attr.Attr().NewAttr("class",cls)]),ro);
       input=Tags.Tags().NewTag("input",x);
       f=function()
       {
        return!readOnly?state.Trigger(Runtime.New(Result,{
         $:0,
         $0:input.get_Value()
        })):null;
       };
       Controls.OnTextChange(f,input);
       return input;
      });
     },
     OnTextChange:function(f,control)
     {
      var value,up,arg00,arg001;
      value=[control.get_Value()];
      up=function()
      {
       var _;
       if(control.get_Value()!==value[0])
        {
         value[0]=control.get_Value();
         _=f(null);
        }
       else
        {
         _=null;
        }
       return _;
      };
      arg00=function()
      {
       return function()
       {
        return up(null);
       };
      };
      EventsPervasives.Events().OnChange(arg00,control);
      arg001=function()
      {
       return function()
       {
        return up(null);
       };
      };
      EventsPervasives.Events().OnKeyUp(arg001,control);
      control.Dom.oninput=up;
      return;
     },
     Password:function(value)
     {
      return Controls.InputField(false,"password","inputPassword",value);
     },
     RadioButtonGroup:function(def,values)
     {
      return Controls.RadioButtonGroupControl(false,def,values);
     },
     RadioButtonGroupControl:function(readOnly,def,values)
     {
      var f;
      f=function()
      {
       var groupId,x,_,defIx,mapping,x1,chooser,d,f1,state,mapping1,rbLbVls,resetRB,reset,mapping2,vs,arg0,arg001,body;
       groupId="id"+Math.round(Math.random()*100000000);
       if(def.$==0)
        {
         _={
          $:0
         };
        }
       else
        {
         defIx=def.$0;
         mapping=function(ix)
         {
          return function(tupledArg)
          {
           var value;
           tupledArg[0];
           value=tupledArg[1];
           return[ix,value];
          };
         };
         x1=List.mapi(mapping,values);
         chooser=function(tupledArg)
         {
          var ix,value,_1,defIx1;
          ix=tupledArg[0];
          value=tupledArg[1];
          if(def.$==0)
           {
            _1={
             $:0
            };
           }
          else
           {
            defIx1=def.$0;
            _1=defIx1===ix?{
             $:1,
             $0:Runtime.New(Result,{
              $:0,
              $0:value
             })
            }:{
             $:0
            };
           }
          return _1;
         };
         _=Seq.tryPick(chooser,x1);
        }
       x=_;
       d=HotStream.New(Runtime.New(Result,{
        $:1,
        $0:Runtime.New(T,{
         $:0
        })
       }));
       f1=function(arg00)
       {
        return HotStream.New(arg00);
       };
       state=Utils.Maybe(d,f1,x);
       mapping1=function(tupledArg)
       {
        var label,value,inp,arg10;
        label=tupledArg[0];
        value=tupledArg[1];
        arg10=List.ofArray([Attr.Attr().NewAttr("class","inputRadio"),Attr.Attr().NewAttr("type","radio"),Attr.Attr().NewAttr("name",groupId)]);
        inp=Operators.add(Tags.Tags().NewTag("input",arg10),readOnly?List.ofArray([Attr.Attr().NewAttr("disabled","disabled")]):Runtime.New(T,{
         $:0
        }));
        return[inp,label,value];
       };
       rbLbVls=List.map(mapping1,values);
       resetRB=function(rb,value,ix)
       {
        var _1,defIx1,_2;
        if(def.$==0)
         {
          rb["HtmlProvider@33"].RemoveAttribute(rb.get_Body(),"checked");
          _1=state.Trigger(Runtime.New(Result,{
           $:1,
           $0:Runtime.New(T,{
            $:0
           })
          }));
         }
        else
         {
          defIx1=def.$0;
          if(defIx1===ix)
           {
            rb["HtmlProvider@33"].SetProperty(rb.get_Body(),"checked",true);
            _2=state.Trigger(Runtime.New(Result,{
             $:0,
             $0:value
            }));
           }
          else
           {
            _2=rb["HtmlProvider@33"].SetProperty(rb.get_Body(),"checked",false);
           }
          _1=_2;
         }
        return _1;
       };
       reset=function()
       {
        var action;
        action=function(ix)
        {
         return function(tupledArg)
         {
          var rb,value;
          rb=tupledArg[0];
          tupledArg[1];
          value=tupledArg[2];
          return resetRB(rb,value,ix);
         };
        };
        return Seq.iteri(action,rbLbVls);
       };
       mapping2=function(ix)
       {
        return function(tupledArg)
        {
         var rb,label,value,arg00,Label;
         rb=tupledArg[0];
         label=tupledArg[1];
         value=tupledArg[2];
         resetRB(rb,value,ix);
         arg00=function()
         {
          return function()
          {
           return!readOnly?state.Trigger(Runtime.New(Result,{
            $:0,
            $0:value
           })):null;
          };
         };
         EventsPervasives.Events().OnClick(arg00,rb);
         Label={
          $:1,
          $0:function()
          {
           var arg10;
           arg10=List.ofArray([Tags.Tags().text(label)]);
           return Tags.Tags().NewTag("label",arg10);
          }
         };
         return Runtime.New(Body,{
          Element:rb,
          Label:Label
         });
        };
       };
       vs=List.mapi(mapping2,rbLbVls);
       arg0=Tree.FromSequence(vs);
       arg001=Runtime.New(Edit,{
        $:0,
        $0:arg0
       });
       body=Data.RX().Return(arg001);
       return Runtime.New(Form,{
        Body:body,
        Dispose1:function()
        {
        },
        Notify:function()
        {
         return reset(null);
        },
        State:state
       });
      };
      return Formlet.New(f);
     },
     ReadOnlyCheckbox:function(def)
     {
      return Controls.CheckboxControl(true,def);
     },
     ReadOnlyInput:function(value)
     {
      return Controls.InputField(true,"text",CssConstants.InputTextClass(),value);
     },
     ReadOnlyRadioButtonGroup:function(def,values)
     {
      return Controls.RadioButtonGroupControl(true,def,values);
     },
     ReadOnlySelect:function(def,vls)
     {
      return Controls.SelectControl(true,def,vls);
     },
     ReadOnlyTextArea:function(value)
     {
      return Controls.TextAreaControl(true,value);
     },
     Select:function(def,vls)
     {
      return Controls.SelectControl(false,def,vls);
     },
     SelectControl:function(readOnly,def,vls)
     {
      var f;
      f=function()
      {
       var mapping,list,aVls,sIx,mapping1,x,select,body,sValue,state,reset,arg00;
       mapping=function(tuple)
       {
        return tuple[1];
       };
       list=List.map(mapping,vls);
       aVls=Arrays.ofSeq(list);
       sIx=(def>=0?def<vls.get_Length():false)?def:0;
       mapping1=function(i)
       {
        return function(tupledArg)
        {
         var nm;
         nm=tupledArg[0];
         tupledArg[1];
         return Tags.Tags().NewTag("option",List.ofArray([Tags.Tags().text(nm),Attr.Attr().NewAttr("value",Global.String(i))]));
        };
       };
       x=List.mapi(mapping1,vls);
       select=Tags.Tags().NewTag("select",x);
       body=readOnly?Operators.add(select,List.ofArray([Attr.Attr().NewAttr("disabled","disabled")])):select;
       sValue=Runtime.New(Result,{
        $:0,
        $0:Arrays.get(aVls,sIx)
       });
       state=HotStream.New(sValue);
       reset=function()
       {
        var arg20;
        arg20=Global.String(sIx);
        body["HtmlProvider@33"].SetProperty(body.get_Body(),"value",arg20);
        return state.Trigger(sValue);
       };
       reset(null);
       arg00=function()
       {
        return function()
        {
         var _,value,arg0,arg001;
         if(!readOnly)
          {
           value=body.get_Value();
           arg0=Arrays.get(aVls,value<<0);
           arg001=Runtime.New(Result,{
            $:0,
            $0:arg0
           });
           _=state.Trigger(arg001);
          }
         else
          {
           _=null;
          }
         return _;
        };
       };
       EventsPervasives.Events().OnChange(arg00,body);
       reset(null);
       return[body,reset,state];
      };
      return Data.MkFormlet(f);
     },
     TextArea:function(value)
     {
      return Controls.TextAreaControl(false,value);
     },
     TextAreaControl:function(readOnly,value)
     {
      return Controls.InputControl(value,function(state)
      {
       var x,input,f;
       x=readOnly?List.ofArray([Attr.Attr().NewAttr("readonly","readonly")]):Runtime.New(T,{
        $:0
       });
       input=Tags.Tags().NewTag("textarea",x);
       f=function()
       {
        return!readOnly?state.Trigger(Runtime.New(Result,{
         $:0,
         $0:input.get_Value()
        })):null;
       };
       Controls.OnTextChange(f,input);
       return input;
      });
     }
    },
    CssConstants:{
     InputTextClass:Runtime.Field(function()
     {
      return"inputText";
     })
    },
    Data:{
     $:function(f,x)
     {
      var objectArg,x1;
      objectArg=Data.BaseFormlet();
      x1=objectArg.Apply(f,x);
      return Data.OfIFormlet(x1);
     },
     BaseFormlet:function()
     {
      return FormletProvider.New(Data.UtilsProvider());
     },
     DefaultLayout:Runtime.Field(function()
     {
      return Data.Layout().get_Vertical();
     }),
     Formlet:Runtime.Class({
      Build:function()
      {
       return this.buildInternal.call(null,null);
      },
      MapResult:function(f)
      {
       var x,_this=this;
       x=Formlet1.New(function()
       {
        var form,objectArg,arg00,arg10;
        form=_this.buildInternal.call(null,null);
        objectArg=_this.utils.Reactive;
        arg00=form.State;
        arg10=function(x1)
        {
         return f(x1);
        };
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:objectArg.Select(arg00,arg10)
        });
       },_this.layoutInternal,_this.formletBase,_this.utils);
       return x;
      },
      Render:function()
      {
       return this.Run(function()
       {
       }).Render();
      },
      Run:function(f)
      {
       var matchValue,_,formlet,form,value,matchValue1,el,_1,patternInput,body,body1,el1;
       matchValue=this.get_ElementInternal();
       if(matchValue.$==0)
        {
         formlet=this.formletBase.ApplyLayout(this);
         form=formlet.Build();
         value=Util.subscribeTo(form.State,function(res)
         {
          var value1;
          value1=Result.Map(f,res);
          return;
         });
         matchValue1=formlet.get_Layout().Apply.call(null,form.Body);
         if(matchValue1.$==0)
          {
           patternInput=Data.DefaultLayout().Apply.call(null,form.Body).$0;
           body=patternInput[0];
           _1=body.Element;
          }
         else
          {
           body1=matchValue1.$0[0];
           _1=body1.Element;
          }
         el=_1;
         this.set_ElementInternal({
          $:1,
          $0:el
         });
         _=el;
        }
       else
        {
         el1=matchValue.$0;
         _=el1;
        }
       return _;
      },
      get_Body:function()
      {
       return this.Run(function()
       {
       }).get_Body();
      },
      get_ElementInternal:function()
      {
       return this["ElementInternal@"];
      },
      get_Layout:function()
      {
       return this.layoutInternal;
      },
      set_ElementInternal:function(v)
      {
       this["ElementInternal@"]=v;
       return;
      }
     },{
      New:function(buildInternal,layoutInternal,formletBase,utils)
      {
       var r;
       r=Runtime.New(this,Pagelet.New());
       r.buildInternal=buildInternal;
       r.layoutInternal=layoutInternal;
       r.formletBase=formletBase;
       r.utils=utils;
       r["ElementInternal@"]={
        $:0
       };
       return r;
      }
     }),
     Layout:Runtime.Field(function()
     {
      return LayoutProvider.New(LayoutUtils.New({
       Reactive:Reactive1.Default()
      }));
     }),
     MkFormlet:function(f)
     {
      var objectArg,arg00,formlet;
      objectArg=Data.BaseFormlet();
      arg00=function()
      {
       var patternInput,state,reset,body,value,arg001,Body1,Notify;
       patternInput=f(null);
       state=patternInput[2];
       reset=patternInput[1];
       body=patternInput[0];
       value=Data.NewBody(body,{
        $:0
       });
       arg001=Tree.Set(value);
       Body1=Data.RX().Return(arg001);
       Notify=function()
       {
        return reset(null);
       };
       return Runtime.New(Form,{
        Body:Body1,
        Dispose1:function()
        {
         return null;
        },
        Notify:Notify,
        State:state
       });
      };
      formlet=objectArg.New(arg00);
      return Data.OfIFormlet(formlet);
     },
     NewBody:function(arg00,arg10)
     {
      return Body.New(arg00,arg10);
     },
     OfIFormlet:function(formlet)
     {
      var f2;
      f2=Formlet1.New(function()
      {
       return formlet.Build();
      },formlet.get_Layout(),Data.BaseFormlet(),Data.UtilsProvider());
      return Data.PropagateRenderFrom(formlet,f2);
     },
     PropagateRenderFrom:function(f1,f2)
     {
      f1.hasOwnProperty("Render")?void(f2.Render=f1.Render):null;
      return f2;
     },
     RX:Runtime.Field(function()
     {
      return Reactive1.Default();
     }),
     UtilsProvider:function()
     {
      return{
       Reactive:Data.RX(),
       DefaultLayout:Data.DefaultLayout()
      };
     },
     Validator:Runtime.Field(function()
     {
      return Validator.New(ValidatorProvidor.New());
     }),
     ValidatorProvidor:Runtime.Class({
      Matches:function(regex,text)
      {
       return text.match(new RegExp(regex));
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      }
     })
    },
    ElementStore:Runtime.Class({
     Init:function()
     {
      this.store=Dictionary.New12();
      return;
     },
     RegisterElement:function(key,f)
     {
      var value;
      value=this.store.ContainsKey(key);
      return!value?this.store.set_Item(key,f):null;
     },
     Remove:function(key)
     {
      var _,value;
      if(this.store.ContainsKey(key))
       {
        (this.store.get_Item(key))(null);
        value=this.store.Remove(key);
        _=void value;
       }
      else
       {
        _=null;
       }
      return _;
     }
    },{
     New:function()
     {
      return Runtime.New(this,{});
     },
     NewElementStore:function()
     {
      var store;
      store=ElementStore.New();
      store.Init();
      return store;
     }
    }),
    Enhance:{
     Cancel:function(formlet,isCancel)
     {
      return Formlet.Replace(formlet,function(value)
      {
       return isCancel(value)?Formlet.Empty():Formlet.Return(value);
      });
     },
     CustomMany:function(config,formlet)
     {
      var formlet1,addButton,f,formlet2,c,x,l,x1,delF,manyF,resetS,formlet6,resetF,reset,_builder_,formlet7;
      formlet1=Controls.ElementButton(function()
      {
       var arg10,arg101,arg102;
       arg101=config.AddIconClass;
       arg10=List.ofArray([Attr.Attr().NewAttr("class",arg101)]);
       arg102=Runtime.New(T,{
        $:0
       });
       return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([Tags.Tags().NewTag("div",arg102)]));
      });
      addButton=Formlet.InitWith(1,formlet1);
      f=function()
      {
      };
      formlet2=Controls.ElementButton(function()
      {
       var arg10,arg101,arg102;
       arg101=config.RemoveIconClass;
       arg10=List.ofArray([Attr.Attr().NewAttr("class",arg101)]);
       arg102=Runtime.New(T,{
        $:0
       });
       return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([Tags.Tags().NewTag("div",arg102)]));
      });
      c=Formlet.Map(f,formlet2);
      x=Formlet.WithCancelation(formlet,c);
      l=Data.Layout().get_Horizontal();
      x1=Formlet.WithLayout(l,x);
      delF=Enhance.Deletable(x1);
      manyF=function()
      {
       var f1,formlet3,formlet4,formlet5;
       f1=function(source)
       {
        return List.ofSeq(source);
       };
       formlet3=Enhance.Many_(addButton,function()
       {
        return delF;
       });
       formlet4=Formlet.Map(f1,formlet3);
       formlet5=Formlet.WithLayoutOrDefault(formlet4);
       return Formlet.ApplyLayout(formlet5);
      };
      resetS=HotStream.New(Runtime.New(Result,{
       $:0,
       $0:null
      }));
      formlet6=Data.BaseFormlet().FromState(resetS);
      resetF=Data.OfIFormlet(formlet6);
      reset=function()
      {
       return resetS.Trigger(Runtime.New(Result,{
        $:0,
        $0:null
       }));
      };
      _builder_=Formlet.Do();
      formlet7=_builder_.Delay(function()
      {
       return _builder_.Bind(resetF,function()
       {
        return _builder_.ReturnFrom(manyF(null));
       });
      });
      return Formlet.WithNotification(reset,formlet7);
     },
     Deletable:function(formlet)
     {
      return Enhance.Replace(formlet,function(value)
      {
       var _,value1;
       if(value.$==1)
        {
         value1=value.$0;
         _=Formlet.Return({
          $:1,
          $0:value1
         });
        }
       else
        {
         _=Formlet.ReturnEmpty({
          $:0
         });
        }
       return _;
      });
     },
     FormButtonConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(FormButtonConfiguration,{
        Label:{
         $:0
        },
        Style:{
         $:0
        },
        Class:{
         $:0
        }
       });
      }
     }),
     FormContainerConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       var Header,Description;
       Header={
        $:0
       };
       Description={
        $:0
       };
       return Runtime.New(FormContainerConfiguration,{
        Header:Header,
        Padding:Padding.get_Default(),
        Description:Description,
        BackgroundColor:{
         $:0
        },
        BorderColor:{
         $:0
        },
        CssClass:{
         $:0
        },
        Style:{
         $:0
        }
       });
      }
     }),
     InputButton:function(conf,enabled)
     {
      var f;
      f=function()
      {
       var state,count,label,x1,arg10,arg00,submit,submit1,matchValue,_,style,matchValue1,_1,cls,reset;
       state=HotStream.New(Runtime.New(Result,{
        $:1,
        $0:Runtime.New(T,{
         $:0
        })
       }));
       count=[0];
       label=Utils.Maybe("Submit",function(x)
       {
        return x;
       },conf.Label);
       arg10=List.ofArray([Attr.Attr().NewAttr("type","button")]);
       x1=Operators.add(Tags.Tags().NewTag("input",arg10),List.ofArray([Attr.Attr().NewAttr("class","submitButton"),Attr.Attr().NewAttr("value",label)]));
       arg00=function()
       {
        return function()
        {
         Ref.incr(count);
         return state.Trigger(Runtime.New(Result,{
          $:0,
          $0:count[0]
         }));
        };
       };
       EventsPervasives.Events().OnClick(arg00,x1);
       submit=x1;
       !enabled?submit["HtmlProvider@33"].AddClass(submit.get_Body(),"disabledButton"):null;
       matchValue=conf.Style;
       if(matchValue.$==1)
        {
         style=matchValue.$0;
         _=submit["HtmlProvider@33"].SetStyle(submit.get_Body(),style);
        }
       else
        {
         _=null;
        }
       matchValue1=conf.Class;
       if(matchValue1.$==1)
        {
         cls=matchValue1.$0;
         _1=submit["HtmlProvider@33"].AddClass(submit.get_Body(),cls);
        }
       else
        {
         _1=null;
        }
       submit1=submit;
       reset=function()
       {
        count[0]=0;
        return state.Trigger(Runtime.New(Result,{
         $:1,
         $0:Runtime.New(T,{
          $:0
         })
        }));
       };
       state.Trigger(Runtime.New(Result,{
        $:1,
        $0:Runtime.New(T,{
         $:0
        })
       }));
       return[submit1,reset,state];
      };
      return Data.MkFormlet(f);
     },
     Many:function(formlet)
     {
      return Enhance.CustomMany(ManyConfiguration.get_Default(),formlet);
     },
     ManyConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(ManyConfiguration,{
        AddIconClass:"addIcon",
        RemoveIconClass:"removeIcon"
       });
      }
     }),
     Many_:function(add,f)
     {
      var f1,chooser,f2,formlet,formlet1,formlet2;
      f1=function(v)
      {
       return f(v);
      };
      chooser=function(x)
      {
       return x;
      };
      f2=function(source)
      {
       return Seq.choose(chooser,source);
      };
      formlet=Formlet.Map(f1,add);
      formlet1=Formlet.SelectMany(formlet);
      formlet2=Formlet.FlipBody(formlet1);
      return Formlet.Map(f2,formlet2);
     },
     Padding:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(Padding,{
        Left:{
         $:0
        },
        Right:{
         $:0
        },
        Top:{
         $:0
        },
        Bottom:{
         $:0
        }
       });
      }
     }),
     Replace:function(formlet,f)
     {
      var f1,x;
      f1=function(res)
      {
       var _,fs,arg0,s;
       if(res.$==1)
        {
         fs=res.$0;
         arg0=Formlet.FailWith(fs);
         _=Runtime.New(Result,{
          $:0,
          $0:arg0
         });
        }
       else
        {
         s=res.$0;
         _=Runtime.New(Result,{
          $:0,
          $0:f(s)
         });
        }
       return _;
      };
      x=Formlet.MapResult(f1,formlet);
      return Formlet.Switch(x);
     },
     ValidationFrameConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(ValidationFrameConfiguration,{
        ValidClass:{
         $:1,
         $0:"successFormlet"
        },
        ValidStyle:{
         $:0
        },
        ErrorClass:{
         $:1,
         $0:"errorFormlet"
        },
        ErrorStyle:{
         $:0
        }
       });
      }
     }),
     ValidationIconConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(ValidationIconConfiguration,{
        ValidIconClass:"validIcon",
        ErrorIconClass:"errorIcon"
       });
      }
     }),
     WithCssClass:function(css,formlet)
     {
      var f;
      f=function(el)
      {
       el["HtmlProvider@33"].AddClass(el.get_Body(),css);
       return el;
      };
      return Formlet.MapElement(f,formlet);
     },
     WithCustomFormContainer:function(fc,formlet)
     {
      var x,f;
      x=Formlet.ApplyLayout(formlet);
      f=function(formEl)
      {
       var x1,d,f1,description,x2,d1,arg101,f2,tb,cell,arg103,f3,o,action,list,f4,value1,f5,value2,f6,value3,f7,value4,f8,value5,matchValue,_1,style,matchValue1,_2,cls,arg104,arg105,arg106;
       x1=fc.Description;
       d=Runtime.New(T,{
        $:0
       });
       f1=function(descr)
       {
        var _,genEl,text,arg10;
        if(descr.$==1)
         {
          genEl=descr.$0;
          _=List.ofArray([genEl(null)]);
         }
        else
         {
          text=descr.$0;
          arg10=List.ofArray([Tags.Tags().text(text)]);
          _=List.ofArray([Tags.Tags().NewTag("p",arg10)]);
         }
        return _;
       };
       description=Utils.Maybe(d,f1,x1);
       x2=fc.Header;
       arg101=List.ofArray([Attr.Attr().NewAttr("class","headerPanel")]);
       d1=Utils.InTable(List.ofArray([List.ofArray([Operators.add(Tags.Tags().NewTag("div",arg101),description)]),List.ofArray([formEl])]));
       f2=function(formElem)
       {
        var hdr,_,genElem,text,arg10,header,arg102;
        if(formElem.$==1)
         {
          genElem=formElem.$0;
          _=genElem(null);
         }
        else
         {
          text=formElem.$0;
          arg10=List.ofArray([Tags.Tags().text(text)]);
          _=Tags.Tags().NewTag("h1",arg10);
         }
        hdr=_;
        arg102=List.ofArray([Attr.Attr().NewAttr("class","headerPanel")]);
        header=Operators.add(Tags.Tags().NewTag("div",arg102),Runtime.New(T,{
         $:1,
         $0:hdr,
         $1:description
        }));
        return Utils.InTable(List.ofArray([List.ofArray([header]),List.ofArray([formEl])]));
       };
       tb=Utils.Maybe(d1,f2,x2);
       arg103=List.ofArray([Attr.Attr().NewAttr("class","formlet")]);
       cell=Operators.add(Tags.Tags().NewTag("td",arg103),List.ofArray([tb]));
       f3=function(color)
       {
        var arg00;
        arg00="border-color: "+color;
        return cell["HtmlProvider@33"].SetStyle(cell.get_Body(),arg00);
       };
       o=fc.BorderColor;
       Utils.Maybe(null,f3,o);
       action=function(tupledArg)
       {
        var name,value,_,v;
        name=tupledArg[0];
        value=tupledArg[1];
        if(value.$==0)
         {
          _=null;
         }
        else
         {
          v=value.$0;
          _=cell["HtmlProvider@33"].SetCss(cell.get_Body(),name,v);
         }
        return _;
       };
       f4=function(color)
       {
        return color;
       };
       value1=fc.BackgroundColor;
       f5=function(v)
       {
        return Global.String(v)+"px";
       };
       value2=fc.Padding.Left;
       f6=function(v)
       {
        return Global.String(v)+"px";
       };
       value3=fc.Padding.Right;
       f7=function(v)
       {
        return Global.String(v)+"px";
       };
       value4=fc.Padding.Top;
       f8=function(v)
       {
        return Global.String(v)+"px";
       };
       value5=fc.Padding.Bottom;
       list=List.ofArray([["background-color",Utils.MapOption(f4,value1)],["padding-left",Utils.MapOption(f5,value2)],["padding-right",Utils.MapOption(f6,value3)],["padding-top",Utils.MapOption(f7,value4)],["padding-bottom",Utils.MapOption(f8,value5)]]);
       Seq.iter(action,list);
       matchValue=fc.Style;
       if(matchValue.$==0)
        {
         _1=null;
        }
       else
        {
         style=matchValue.$0;
         _1=cell["HtmlProvider@33"].SetStyle(cell.get_Body(),style);
        }
       matchValue1=fc.CssClass;
       if(matchValue1.$==0)
        {
         _2=null;
        }
       else
        {
         cls=matchValue1.$0;
         _2=cell["HtmlProvider@33"].AddClass(cell.get_Body(),cls);
        }
       arg106=List.ofArray([cell]);
       arg105=List.ofArray([Tags.Tags().NewTag("tr",arg106)]);
       arg104=List.ofArray([Tags.Tags().NewTag("tbody",arg105)]);
       return Tags.Tags().NewTag("table",arg104);
      };
      return Formlet.MapElement(f,x);
     },
     WithCustomResetButton:function(buttonConf,formlet)
     {
      var matchValue,buttonConf1,_,reset;
      matchValue=buttonConf.Label;
      if(matchValue.$==0)
       {
        _=Runtime.New(FormButtonConfiguration,{
         Label:{
          $:1,
          $0:"Reset"
         },
         Style:buttonConf.Style,
         Class:buttonConf.Class
        });
       }
      else
       {
        matchValue.$0;
        _=buttonConf;
       }
      buttonConf1=_;
      reset=Enhance.InputButton(buttonConf1,true);
      return Enhance.WithResetFormlet(formlet,reset);
     },
     WithCustomSubmitAndResetButtons:function(submitConf,resetConf,formlet)
     {
      var submitReset;
      submitReset=function(reset)
      {
       return function(result)
       {
        var submit,_,fs,f,formlet1,value,f1,formlet2,_builder_,reset1,x,l;
        if(result.$==1)
         {
          fs=result.$0;
          f=function()
          {
           return Runtime.New(Result,{
            $:1,
            $0:fs
           });
          };
          formlet1=Enhance.InputButton(submitConf,false);
          _=Formlet.MapResult(f,formlet1);
         }
        else
         {
          value=result.$0;
          f1=function()
          {
           return value;
          };
          formlet2=Enhance.InputButton(submitConf,true);
          _=Formlet.Map(f1,formlet2);
         }
        submit=_;
        _builder_=Formlet.Do();
        reset1=_builder_.Delay(function()
        {
         return _builder_.Bind(Formlet.LiftResult(Enhance.InputButton(resetConf,true)),function(_arg1)
         {
          _arg1.$==0?reset(null):null;
          return _builder_.Return(null);
         });
        });
        x=Data.$(Data.$(Formlet.Return(function(v)
        {
         return function()
         {
          return v;
         };
        }),submit),reset1);
        l=Data.Layout().get_Horizontal();
        return Formlet.WithLayout(l,x);
       };
      };
      return Enhance.WithSubmitAndReset(formlet,submitReset);
     },
     WithCustomSubmitButton:function(buttonConf,formlet)
     {
      var matchValue,buttonConf1,_;
      matchValue=buttonConf.Label;
      if(matchValue.$==0)
       {
        _=Runtime.New(FormButtonConfiguration,{
         Label:{
          $:1,
          $0:"Submit"
         },
         Style:buttonConf.Style,
         Class:buttonConf.Class
        });
       }
      else
       {
        matchValue.$0;
        _=buttonConf;
       }
      buttonConf1=_;
      return Enhance.WithSubmitFormlet(formlet,function(res)
      {
       var f,enabled,formlet1;
       f=function()
       {
       };
       enabled=res.$==0?true:false;
       formlet1=Enhance.InputButton(buttonConf1,enabled);
       return Formlet.Map(f,formlet1);
      });
     },
     WithCustomValidationFrame:function(vc,formlet)
     {
      var wrapper;
      wrapper=function(state)
      {
       return function(body)
       {
        var x,x1,f;
        x=List.ofArray([body.Element]);
        x1=Tags.Tags().NewTag("div",x);
        f=function(panel)
        {
         var value;
         value=Util.subscribeTo(state,function(res)
         {
          var _,msgs,matchValue,_1,cls,matchValue1,_2,cls1,matchValue2,_3,style,matchValue3,_4,cls2,matchValue4,_5,cls3,matchValue5,_6,style1;
          if(res.$==1)
           {
            msgs=res.$0;
            matchValue=vc.ValidClass;
            if(matchValue.$==1)
             {
              cls=matchValue.$0;
              _1=panel["HtmlProvider@33"].RemoveClass(panel.get_Body(),cls);
             }
            else
             {
              _1=null;
             }
            matchValue1=vc.ErrorClass;
            if(matchValue1.$==1)
             {
              cls1=matchValue1.$0;
              _2=panel["HtmlProvider@33"].AddClass(panel.get_Body(),cls1);
             }
            else
             {
              _2=null;
             }
            matchValue2=vc.ErrorStyle;
            if(matchValue2.$==1)
             {
              style=matchValue2.$0;
              _3=panel["HtmlProvider@33"].SetStyle(panel.get_Body(),style);
             }
            else
             {
              _3=panel["HtmlProvider@33"].SetStyle(panel.get_Body(),"");
             }
            _=_3;
           }
          else
           {
            matchValue3=vc.ErrorClass;
            if(matchValue3.$==1)
             {
              cls2=matchValue3.$0;
              _4=panel["HtmlProvider@33"].RemoveClass(panel.get_Body(),cls2);
             }
            else
             {
              _4=null;
             }
            matchValue4=vc.ValidClass;
            if(matchValue4.$==1)
             {
              cls3=matchValue4.$0;
              _5=panel["HtmlProvider@33"].AddClass(panel.get_Body(),cls3);
             }
            else
             {
              _5=null;
             }
            matchValue5=vc.ValidStyle;
            if(matchValue5.$==1)
             {
              style1=matchValue5.$0;
              _6=panel["HtmlProvider@33"].SetStyle(panel.get_Body(),style1);
             }
            else
             {
              _6=panel["HtmlProvider@33"].SetStyle(panel.get_Body(),"");
             }
            _=_6;
           }
          return _;
         });
         return;
        };
        Operators.OnAfterRender(f,x1);
        return x1;
       };
      };
      return Enhance.WrapFormlet(wrapper,formlet);
     },
     WithCustomValidationIcon:function(vic,formlet)
     {
      var formlet1,valid,_builder_,f,formlet2,x1,l;
      formlet1=Formlet.WithLayoutOrDefault(formlet);
      valid=function(res)
      {
       var genElem;
       genElem=function()
       {
        var _,msgs,title,arg10,arg101,arg102,arg103,arg104,arg105;
        if(res.$==1)
         {
          msgs=res.$0;
          title=Seq.fold(function(x)
          {
           return function(y)
           {
            return x+" "+y;
           };
          },"",msgs);
          arg101=vic.ErrorIconClass;
          arg10=List.ofArray([Attr.Attr().NewAttr("class",arg101),Attr.Attr().NewAttr("title",title)]);
          arg102=Runtime.New(T,{
           $:0
          });
          _=Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([Tags.Tags().NewTag("div",arg102)]));
         }
        else
         {
          arg104=vic.ValidIconClass;
          arg103=List.ofArray([Attr.Attr().NewAttr("class",arg104),Attr.Attr().NewAttr("title","")]);
          arg105=Runtime.New(T,{
           $:0
          });
          _=Operators.add(Tags.Tags().NewTag("div",arg103),List.ofArray([Tags.Tags().NewTag("div",arg105)]));
         }
        return _;
       };
       return Formlet.OfElement(genElem);
      };
      _builder_=Formlet.Do();
      f=function(arg00)
      {
       return Result.Join(arg00);
      };
      formlet2=_builder_.Delay(function()
      {
       return _builder_.Bind(Formlet.LiftResult(formlet1),function(_arg1)
       {
        return _builder_.Bind(valid(_arg1),function()
        {
         return _builder_.Return(_arg1);
        });
       });
      });
      x1=Formlet.MapResult(f,formlet2);
      l=Data.Layout().get_Horizontal();
      return Formlet.WithLayout(l,x1);
     },
     WithErrorFormlet:function(f,formlet)
     {
      var _builder_,f1,formlet1;
      _builder_=Formlet.Do();
      f1=function(arg00)
      {
       return Result.Join(arg00);
      };
      formlet1=_builder_.Delay(function()
      {
       return _builder_.Bind(Formlet.LiftResult(formlet),function(_arg1)
       {
        var _,msgs,_builder_1;
        if(_arg1.$==1)
         {
          msgs=_arg1.$0;
          _builder_1=Formlet.Do();
          _=_builder_1.Delay(function()
          {
           return _builder_1.Bind(f(msgs),function()
           {
            return _builder_1.Return(_arg1);
           });
          });
         }
        else
         {
          _arg1.$0;
          _=Formlet.Return(_arg1);
         }
        return _builder_.ReturnFrom(_);
       });
      });
      return Formlet.MapResult(f1,formlet1);
     },
     WithErrorSummary:function(label,formlet)
     {
      var errrFormlet,_builder_,f1,formlet1;
      errrFormlet=function(fs)
      {
       return Formlet.OfElement(function()
       {
        var arg10,arg101,mapping,x;
        arg101=List.ofArray([Tags.Tags().text(label)]);
        mapping=function(f)
        {
         var arg102;
         arg102=List.ofArray([Tags.Tags().text(f)]);
         return Tags.Tags().NewTag("li",arg102);
        };
        x=List.map(mapping,fs);
        arg10=List.ofArray([Tags.Tags().NewTag("legend",arg101),Tags.Tags().NewTag("ul",x)]);
        return Tags.Tags().NewTag("fieldset",arg10);
       });
      };
      _builder_=Formlet.Do();
      f1=function(arg00)
      {
       return Result.Join(arg00);
      };
      formlet1=_builder_.Delay(function()
      {
       return _builder_.Bind(Formlet.LiftResult(formlet),function(_arg1)
       {
        var _,fs,f,formlet2;
        if(_arg1.$==1)
         {
          fs=_arg1.$0;
          f=function()
          {
           return _arg1;
          };
          formlet2=errrFormlet(fs);
          _=Formlet.Map(f,formlet2);
         }
        else
         {
          _arg1.$0;
          _=Formlet.Return(_arg1);
         }
        return _builder_.ReturnFrom(_);
       });
      });
      return Formlet.MapResult(f1,formlet1);
     },
     WithFormContainer:function(formlet)
     {
      return Enhance.WithCustomFormContainer(FormContainerConfiguration.get_Default(),formlet);
     },
     WithJsonPost:function(conf,formlet)
     {
      var matchValue,postUrl,arg10,matchValue1,enc,arg101,_this,arg102,arg103,hiddenField,_this1,arg104,submitButton,formAttrs,x,arg105;
      matchValue=conf.PostUrl;
      if(matchValue.$==0)
       {
        postUrl=Runtime.New(T,{
         $:0
        });
       }
      else
       {
        arg10=matchValue.$0;
        postUrl=List.ofArray([Attr.Attr().NewAttr("action",arg10)]);
       }
      matchValue1=conf.EncodingType;
      if(matchValue1.$==0)
       {
        enc=Runtime.New(T,{
         $:0
        });
       }
      else
       {
        arg101=matchValue1.$0;
        enc=List.ofArray([Attr.Attr().NewAttr("enctype",arg101)]);
       }
      _this=Tags.Tags();
      arg103=conf.ParameterName;
      arg102=List.ofArray([Attr.Attr().NewAttr("type","hidden"),Attr.Attr().NewAttr("name",arg103)]);
      hiddenField=_this.NewTag("input",arg102);
      _this1=Tags.Tags();
      arg104=List.ofArray([Attr.Attr().NewAttr("type","submit"),Attr.Attr().NewAttr("value","Submit")]);
      submitButton=_this1.NewTag("input",arg104);
      formAttrs=List.append(Runtime.New(T,{
       $:1,
       $0:Attr.Attr().NewAttr("method","POST"),
       $1:Runtime.New(T,{
        $:1,
        $0:Attr.Attr().NewAttr("style","display:none"),
        $1:postUrl
       })
      }),enc);
      x=Operators.add(Tags.Tags().NewTag("form",formAttrs),List.ofArray([hiddenField,submitButton]));
      Operators.OnAfterRender(function(form)
      {
       var matchValue2;
       matchValue2=conf.EncodingType;
       return matchValue2.$==0?null:matchValue2.$0==="multipart/form-data"?void jQuery(form.get_Body()).attr("encoding","multipart/form-data"):null;
      },x);
      arg105=List.ofArray([x,Formlet.Map(function(value)
      {
       var data;
       data=JSON.stringify(value);
       jQuery(hiddenField.get_Body()).val(data);
       return jQuery(submitButton.get_Body()).click();
      },formlet)]);
      return Tags.Tags().NewTag("div",arg105);
     },
     WithLabel:function(labelGen,formlet)
     {
      return Formlet.WithLabel({
       $:1,
       $0:labelGen
      },formlet);
     },
     WithLabelAbove:function(formlet)
     {
      var f;
      f=function(body)
      {
       var matchValue,label,_,arg10,l,arg101,arg102,arg103,arg104,arg105,arg106,el,Label;
       matchValue=body.Label;
       if(matchValue.$==0)
        {
         arg10=Runtime.New(T,{
          $:0
         });
         _=Tags.Tags().NewTag("span",arg10);
        }
       else
        {
         l=matchValue.$0;
         _=l(null);
        }
       label=_;
       arg104=List.ofArray([label]);
       arg103=List.ofArray([Tags.Tags().NewTag("td",arg104)]);
       arg106=List.ofArray([body.Element]);
       arg105=List.ofArray([Tags.Tags().NewTag("td",arg106)]);
       arg102=List.ofArray([Tags.Tags().NewTag("tr",arg103),Tags.Tags().NewTag("tr",arg105)]);
       arg101=List.ofArray([Tags.Tags().NewTag("tbody",arg102)]);
       el=Tags.Tags().NewTag("table",arg101);
       Label={
        $:0
       };
       return Runtime.New(Body,{
        Element:el,
        Label:Label
       });
      };
      return Formlet.MapBody(f,formlet);
     },
     WithLabelAndInfo:function(label,info,formlet)
     {
      var lblTbl;
      lblTbl=function()
      {
       var arg10,arg101;
       arg10=List.ofArray([Tags.Tags().text(label)]);
       arg101=List.ofArray([Attr.Attr().NewAttr("title",info),Attr.Attr().NewAttr("class","infoIcon")]);
       return Utils.InTable(List.ofArray([List.ofArray([Tags.Tags().NewTag("label",arg10),Tags.Tags().NewTag("span",arg101)])]));
      };
      return Enhance.WithLabel(lblTbl,formlet);
     },
     WithLabelConfiguration:function(lc,formlet)
     {
      var x,l;
      x=Formlet.ApplyLayout(formlet);
      l=Data.Layout().LabelLayout(lc);
      return Formlet.WithLayout(l,x);
     },
     WithLabelLeft:function(formlet)
     {
      var f;
      f=function(body)
      {
       var matchValue,label,_,arg10,l,arg101,arg102,arg103,arg104,arg105,el,Label;
       matchValue=body.Label;
       if(matchValue.$==0)
        {
         arg10=Runtime.New(T,{
          $:0
         });
         _=Tags.Tags().NewTag("span",arg10);
        }
       else
        {
         l=matchValue.$0;
         _=l(null);
        }
       label=_;
       arg104=List.ofArray([body.Element]);
       arg105=List.ofArray([label]);
       arg103=List.ofArray([Tags.Tags().NewTag("td",arg104),Tags.Tags().NewTag("td",arg105)]);
       arg102=List.ofArray([Tags.Tags().NewTag("tr",arg103)]);
       arg101=List.ofArray([Tags.Tags().NewTag("tbody",arg102)]);
       el=Tags.Tags().NewTag("table",arg101);
       Label={
        $:0
       };
       return Runtime.New(Body,{
        Element:el,
        Label:Label
       });
      };
      return Formlet.MapBody(f,formlet);
     },
     WithLegend:function(label,formlet)
     {
      var f;
      f=function(body)
      {
       var arg10,arg101,matchValue,_,label1,element;
       arg101=List.ofArray([Tags.Tags().text(label)]);
       matchValue=body.Label;
       if(matchValue.$==0)
        {
         _=body.Element;
        }
       else
        {
         label1=matchValue.$0;
         _=Utils.InTable(List.ofArray([List.ofArray([label1(null),body.Element])]));
        }
       arg10=List.ofArray([Tags.Tags().NewTag("legend",arg101),_]);
       element=Tags.Tags().NewTag("fieldset",arg10);
       return Runtime.New(Body,{
        Element:element,
        Label:{
         $:0
        }
       });
      };
      return Formlet.MapBody(f,formlet);
     },
     WithResetAction:function(f,formlet)
     {
      var f1,x,l,x1,x2;
      f1=function()
      {
       var form,notify;
       form=formlet.Build();
       notify=function(o)
       {
        return f(null)?form.Notify.call(null,o):null;
       };
       return Runtime.New(Form,{
        Body:form.Body,
        Dispose1:form.Dispose1,
        Notify:notify,
        State:form.State
       });
      };
      x=Formlet.New(f1);
      l=formlet.get_Layout();
      x1=Formlet.WithLayout(l,x);
      x2=Data.PropagateRenderFrom(formlet,x1);
      return Data.OfIFormlet(x2);
     },
     WithResetButton:function(formlet)
     {
      return Enhance.WithCustomResetButton(FormButtonConfiguration.get_Default(),formlet);
     },
     WithResetFormlet:function(formlet,reset)
     {
      var formlet1,x,x1,x2,formlet2,button,_builder_,f,formlet3,f2,x3;
      formlet1=Formlet.WithLayoutOrDefault(formlet);
      x=Formlet.ApplyLayout(formlet1);
      x1=Formlet.InitWithFailure(x);
      x2=Formlet.LiftResult(x1);
      formlet2=Formlet.WithNotificationChannel(x2);
      button=Formlet.LiftResult(reset);
      _builder_=Formlet.Do();
      f=function(arg00)
      {
       return Result.Join(arg00);
      };
      formlet3=_builder_.Delay(function()
      {
       return _builder_.Bind(formlet2,function(_arg1)
       {
        var v,notify;
        v=_arg1[0];
        notify=_arg1[1];
        return _builder_.Bind(button,function(_arg2)
        {
         _arg2.$==0?notify(null):null;
         return _builder_.Return(v);
        });
       });
      });
      f2=Formlet.MapResult(f,formlet3);
      x3=Data.PropagateRenderFrom(formlet2,f2);
      return Data.OfIFormlet(x3);
     },
     WithRowConfiguration:function(rc,formlet)
     {
      var x,l;
      x=Formlet.ApplyLayout(formlet);
      l=Data.Layout().RowLayout(rc);
      return Formlet.WithLayout(l,x);
     },
     WithSubmitAndReset:function(formlet,submReset)
     {
      var _builder_,f2,formlet3;
      _builder_=Formlet.Do();
      f2=_builder_.Delay(function()
      {
       var formlet1,formlet2;
       formlet1=Formlet.InitWithFailure(formlet);
       formlet2=Formlet.LiftResult(formlet1);
       return _builder_.Bind(Formlet.WithNotificationChannel(formlet2),function(_arg1)
       {
        var res,notify;
        res=_arg1[0];
        notify=_arg1[1];
        return _builder_.ReturnFrom((submReset(function(arg00)
        {
         return notify(arg00);
        }))(res));
       });
      });
      formlet3=Data.PropagateRenderFrom(formlet,f2);
      return Data.OfIFormlet(formlet3);
     },
     WithSubmitAndResetButtons:function(formlet)
     {
      var inputRecord,submitConf,inputRecord1,resetConf;
      inputRecord=FormButtonConfiguration.get_Default();
      submitConf=Runtime.New(FormButtonConfiguration,{
       Label:{
        $:1,
        $0:"Submit"
       },
       Style:inputRecord.Style,
       Class:inputRecord.Class
      });
      inputRecord1=FormButtonConfiguration.get_Default();
      resetConf=Runtime.New(FormButtonConfiguration,{
       Label:{
        $:1,
        $0:"Reset"
       },
       Style:inputRecord1.Style,
       Class:inputRecord1.Class
      });
      return Enhance.WithCustomSubmitAndResetButtons(submitConf,resetConf,formlet);
     },
     WithSubmitButton:function(formlet)
     {
      return Enhance.WithCustomSubmitButton(FormButtonConfiguration.get_Default(),formlet);
     },
     WithSubmitFormlet:function(formlet,submit)
     {
      var _builder_,f,formlet1,f2,x;
      _builder_=Formlet.Do();
      f=function(arg00)
      {
       return Result.Join(arg00);
      };
      formlet1=_builder_.Delay(function()
      {
       var formlet2;
       formlet2=Formlet.InitWithFailure(formlet);
       return _builder_.Bind(Formlet.LiftResult(formlet2),function(_arg1)
       {
        return _builder_.Bind(submit(_arg1),function()
        {
         return _builder_.Return(_arg1);
        });
       });
      });
      f2=Formlet.MapResult(f,formlet1);
      x=Data.PropagateRenderFrom(formlet,f2);
      return Data.OfIFormlet(x);
     },
     WithTextLabel:function(label,formlet)
     {
      return Enhance.WithLabel(function()
      {
       var arg10;
       arg10=List.ofArray([Tags.Tags().text(label)]);
       return Tags.Tags().NewTag("label",arg10);
      },formlet);
     },
     WithValidationFrame:function(formlet)
     {
      return Enhance.WithCustomValidationFrame(ValidationFrameConfiguration.get_Default(),formlet);
     },
     WithValidationIcon:function(formlet)
     {
      return Enhance.WithCustomValidationIcon(ValidationIconConfiguration.get_Default(),formlet);
     },
     WrapFormlet:function(wrapper,formlet)
     {
      var f;
      f=function()
      {
       var formlet1,form,patternInput,body,panel;
       formlet1=Formlet.WithLayoutOrDefault(formlet);
       form=Formlet.BuildForm(formlet1);
       patternInput=formlet1.get_Layout().Apply.call(null,form.Body).$0;
       patternInput[1];
       body=patternInput[0];
       panel=(wrapper(form.State))(body);
       return[panel,function()
       {
        return form.Notify.call(null,null);
       },form.State];
      };
      return Data.MkFormlet(f);
     }
    },
    Formlet:{
     ApplyLayout:function(formlet)
     {
      var f2,formlet1;
      f2=Data.BaseFormlet().ApplyLayout(formlet);
      formlet1=Data.PropagateRenderFrom(formlet,f2);
      return Data.OfIFormlet(formlet1);
     },
     Bind:function(fl,f)
     {
      var objectArg,arg10,x1,x2;
      objectArg=Data.BaseFormlet();
      arg10=function(x)
      {
       var y;
       y=f(x);
       return y;
      };
      x1=objectArg.Bind(fl,arg10);
      x2=Data.PropagateRenderFrom(fl,x1);
      return Data.OfIFormlet(x2);
     },
     BindWith:function(compose,formlet,f)
     {
      var objectArg,arg20,x1,x2;
      objectArg=Data.BaseFormlet();
      arg20=function(x)
      {
       return f(x);
      };
      x1=objectArg.BindWith(compose,formlet,arg20);
      x2=Data.PropagateRenderFrom(formlet,x1);
      return Data.OfIFormlet(x2);
     },
     BuildForm:function(f)
     {
      return Data.BaseFormlet().BuildForm(f);
     },
     BuildFormlet:function(f)
     {
      return Data.MkFormlet(f);
     },
     Choose:function(fs)
     {
      var count,mapping,fs1,x1,f2,x2,arg00,x3,f3;
      count=[0];
      mapping=function(f)
      {
       var f1,formlet,formlet1;
       f1=function(x)
       {
        Ref.incr(count);
        return[x,count[0]];
       };
       formlet=Formlet.Map(f1,f);
       formlet1=Formlet.InitWithFailure(formlet);
       return Formlet.LiftResult(formlet1);
      };
      fs1=Seq.map(mapping,fs);
      x1=Formlet.Sequence(fs1);
      f2=function(xs)
      {
       var chooser,projection,list,list1,chooser1,list2;
       chooser=function(x)
       {
        var _,v;
        if(x.$==0)
         {
          v=x.$0;
          _={
           $:1,
           $0:v
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
       projection=function(tupledArg)
       {
        var ix;
        tupledArg[0];
        ix=tupledArg[1];
        return ix;
       };
       list=List.choose(chooser,xs);
       list1=List.sortBy(projection,list);
       chooser1=function(tupledArg)
       {
        var x;
        x=tupledArg[0];
        tupledArg[1];
        return{
         $:1,
         $0:x
        };
       };
       list2=List.rev(list1);
       return Seq.tryPick(chooser1,list2);
      };
      x2=Formlet.Map(f2,x1);
      arg00=function(x)
      {
       return x.$==1;
      };
      x3=Data.Validator().Is(arg00,"",x2);
      f3=function(x)
      {
       return x.$0;
      };
      return Formlet.Map(f3,x3);
     },
     Delay:function(f)
     {
      var formlet;
      formlet=Data.BaseFormlet().Delay(function()
      {
       return f(null);
      });
      return Data.OfIFormlet(formlet);
     },
     Deletable:function(formlet)
     {
      var f2,formlet1;
      f2=Data.BaseFormlet().Deletable(formlet);
      formlet1=Data.PropagateRenderFrom(formlet,f2);
      return Data.OfIFormlet(formlet1);
     },
     Do:Runtime.Field(function()
     {
      return FormletBuilder.New();
     }),
     Empty:function()
     {
      var formlet;
      formlet=Data.BaseFormlet().Empty();
      return Data.OfIFormlet(formlet);
     },
     FailWith:function(fs)
     {
      var formlet;
      formlet=Data.BaseFormlet().FailWith(fs);
      return Data.OfIFormlet(formlet);
     },
     FlipBody:function(formlet)
     {
      var f2,formlet1;
      f2=Data.BaseFormlet().FlipBody(formlet);
      formlet1=Data.PropagateRenderFrom(formlet,f2);
      return Data.OfIFormlet(formlet1);
     },
     Flowlet:function(formlet)
     {
      var objectArg,arg00,x,x1;
      objectArg=Data.BaseFormlet();
      arg00=Data.Layout().get_Flowlet();
      x=objectArg.WithLayout(arg00,formlet);
      x1=Data.PropagateRenderFrom(formlet,x);
      return Data.OfIFormlet(x1);
     },
     Horizontal:function(formlet)
     {
      var objectArg,arg00,x,x1;
      objectArg=Data.BaseFormlet();
      arg00=Data.Layout().get_Horizontal();
      x=objectArg.WithLayout(arg00,formlet);
      x1=Data.PropagateRenderFrom(formlet,x);
      return Data.OfIFormlet(x1);
     },
     InitWith:function(value,formlet)
     {
      var objectArg,x,x1;
      objectArg=Data.BaseFormlet();
      x=objectArg.InitWith(value,formlet);
      x1=Data.PropagateRenderFrom(formlet,x);
      return Data.OfIFormlet(x1);
     },
     InitWithFailure:function(formlet)
     {
      var f2,formlet1;
      f2=Data.BaseFormlet().InitWithFailure(formlet);
      formlet1=Data.PropagateRenderFrom(formlet,f2);
      return Data.OfIFormlet(formlet1);
     },
     Join:function(formlet)
     {
      var f,x,objectArg,x1,x2;
      f=function(f1)
      {
       return f1;
      };
      x=Formlet.Map(f,formlet);
      objectArg=Data.BaseFormlet();
      x1=objectArg.Join(x);
      x2=Data.PropagateRenderFrom(formlet,x1);
      return Data.OfIFormlet(x2);
     },
     LiftResult:function(formlet)
     {
      var f2,formlet1;
      f2=Data.BaseFormlet().LiftResult(formlet);
      formlet1=Data.PropagateRenderFrom(formlet,f2);
      return Data.OfIFormlet(formlet1);
     },
     Map:function(f,formlet)
     {
      var objectArg,x,x1;
      objectArg=Data.BaseFormlet();
      x=objectArg.Map(f,formlet);
      x1=Data.PropagateRenderFrom(formlet,x);
      return Data.OfIFormlet(x1);
     },
     MapBody:function(f,formlet)
     {
      var objectArg,x,x1;
      objectArg=Data.BaseFormlet();
      x=objectArg.MapBody(f,formlet);
      x1=Data.PropagateRenderFrom(formlet,x);
      return Data.OfIFormlet(x1);
     },
     MapElement:function(f,formlet)
     {
      var objectArg,arg00,f2,formlet1;
      objectArg=Data.BaseFormlet();
      arg00=function(b)
      {
       return Runtime.New(Body,{
        Element:f(b.Element),
        Label:b.Label
       });
      };
      f2=objectArg.MapBody(arg00,formlet);
      formlet1=Data.PropagateRenderFrom(formlet,f2);
      return Data.OfIFormlet(formlet1);
     },
     MapResult:function(f,formlet)
     {
      var objectArg,x,x1;
      objectArg=Data.BaseFormlet();
      x=objectArg.MapResult(f,formlet);
      x1=Data.PropagateRenderFrom(formlet,x);
      return Data.OfIFormlet(x1);
     },
     Never:function()
     {
      var formlet;
      formlet=Data.BaseFormlet().Never();
      return Data.OfIFormlet(formlet);
     },
     New:function(f)
     {
      var formlet;
      formlet=Data.BaseFormlet().New(f);
      return Data.OfIFormlet(formlet);
     },
     OfElement:function(genElem)
     {
      var f;
      f=function()
      {
       var elem;
       elem=genElem(null);
       return[elem,function()
       {
       },Data.RX().Return(Runtime.New(Result,{
        $:0,
        $0:null
       }))];
      };
      return Data.MkFormlet(f);
     },
     Render:function(formlet)
     {
      var f2;
      f2=formlet.Run(function()
      {
      });
      return Data.PropagateRenderFrom(formlet,f2);
     },
     Replace:function(formlet,f)
     {
      var objectArg,arg10,x1,x2;
      objectArg=Data.BaseFormlet();
      arg10=function(x)
      {
       return f(x);
      };
      x1=objectArg.Replace(formlet,arg10);
      x2=Data.PropagateRenderFrom(formlet,x1);
      return Data.OfIFormlet(x2);
     },
     ReplaceFirstWithFailure:function(formlet)
     {
      var f2,formlet1;
      f2=Data.BaseFormlet().ReplaceFirstWithFailure(formlet);
      formlet1=Data.PropagateRenderFrom(formlet,f2);
      return Data.OfIFormlet(formlet1);
     },
     Return:function(x)
     {
      var formlet;
      formlet=Data.BaseFormlet().Return(x);
      return Data.OfIFormlet(formlet);
     },
     ReturnEmpty:function(x)
     {
      var formlet;
      formlet=Data.BaseFormlet().ReturnEmpty(x);
      return Data.OfIFormlet(formlet);
     },
     Run:function(f,formlet)
     {
      return formlet.Run(f);
     },
     SelectMany:function(formlet)
     {
      var f,x,objectArg,x1,x2;
      f=function(f1)
      {
       return f1;
      };
      x=Formlet.Map(f,formlet);
      objectArg=Data.BaseFormlet();
      x1=objectArg.SelectMany(x);
      x2=Data.PropagateRenderFrom(formlet,x1);
      return Data.OfIFormlet(x2);
     },
     Sequence:function(fs)
     {
      var mapping,x1,objectArg,x2;
      mapping=function(x)
      {
       return x;
      };
      x1=Seq.map(mapping,fs);
      objectArg=Data.BaseFormlet();
      x2=objectArg.Sequence(x1);
      return Data.OfIFormlet(x2);
     },
     Switch:function(formlet)
     {
      var f,x,objectArg,x1,x2;
      f=function(f1)
      {
       return f1;
      };
      x=Formlet.Map(f,formlet);
      objectArg=Data.BaseFormlet();
      x1=objectArg.Switch(x);
      x2=Data.PropagateRenderFrom(formlet,x1);
      return Data.OfIFormlet(x2);
     },
     Vertical:function(formlet)
     {
      var objectArg,arg00,x,x1;
      objectArg=Data.BaseFormlet();
      arg00=Data.Layout().get_Vertical();
      x=objectArg.WithLayout(arg00,formlet);
      x1=Data.PropagateRenderFrom(formlet,x);
      return Data.OfIFormlet(x1);
     },
     WithCancelation:function(formlet,c)
     {
      var objectArg,x,x1;
      objectArg=Data.BaseFormlet();
      x=objectArg.WithCancelation(formlet,c);
      x1=Data.PropagateRenderFrom(formlet,x);
      return Data.OfIFormlet(x1);
     },
     WithLabel:function(label,formlet)
     {
      var objectArg,arg00,f2,formlet1;
      objectArg=Data.BaseFormlet();
      arg00=function(body)
      {
       return Runtime.New(Body,{
        Element:body.Element,
        Label:label
       });
      };
      f2=objectArg.MapBody(arg00,formlet);
      formlet1=Data.PropagateRenderFrom(formlet,f2);
      return Data.OfIFormlet(formlet1);
     },
     WithLayout:function(l,formlet)
     {
      var objectArg,x,x1;
      objectArg=Data.BaseFormlet();
      x=objectArg.WithLayout(l,formlet);
      x1=Data.PropagateRenderFrom(formlet,x);
      return Data.OfIFormlet(x1);
     },
     WithLayoutOrDefault:function(formlet)
     {
      var f2,formlet1;
      f2=Data.BaseFormlet().WithLayoutOrDefault(formlet);
      formlet1=Data.PropagateRenderFrom(formlet,f2);
      return Data.OfIFormlet(formlet1);
     },
     WithNotification:function(c,formlet)
     {
      var objectArg,x,x1;
      objectArg=Data.BaseFormlet();
      x=objectArg.WithNotification(c,formlet);
      x1=Data.PropagateRenderFrom(formlet,x);
      return Data.OfIFormlet(x1);
     },
     WithNotificationChannel:function(formlet)
     {
      var f2,formlet1;
      f2=Data.BaseFormlet().WithNotificationChannel(formlet);
      formlet1=Data.PropagateRenderFrom(formlet,f2);
      return Data.OfIFormlet(formlet1);
     }
    },
    FormletBuilder:Runtime.Class({
     Bind:function(formlet,f)
     {
      var objectArg,arg10,x1,x2;
      objectArg=Data.BaseFormlet();
      arg10=function(x)
      {
       var y;
       y=f(x);
       return y;
      };
      x1=objectArg.Bind(formlet,arg10);
      x2=Data.PropagateRenderFrom(formlet,x1);
      return Data.OfIFormlet(x2);
     },
     Delay:function(f)
     {
      var formlet;
      formlet=Data.BaseFormlet().Delay(function(x)
      {
       return f(x);
      });
      return Data.OfIFormlet(formlet);
     },
     Return:function(x)
     {
      var formlet;
      formlet=Data.BaseFormlet().Return(x);
      return Data.OfIFormlet(formlet);
     },
     ReturnFrom:function(f)
     {
      return Data.OfIFormlet(f);
     }
    },{
     New:function()
     {
      return Runtime.New(this,{});
     }
    }),
    Layout:{
     FormRowConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(FormRowConfiguration,{
        Padding:{
         $:0
        },
        Color:{
         $:0
        },
        Class:{
         $:0
        },
        Style:{
         $:0
        },
        LabelConfiguration:{
         $:0
        }
       });
      }
     }),
     LabelConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(LabelConfiguration,{
        Align:{
         $:0
        },
        VerticalAlign:{
         $:1
        },
        Placement:{
         $:0
        }
       });
      }
     }),
     Padding:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(Padding1,{
        Left:{
         $:0
        },
        Right:{
         $:0
        },
        Top:{
         $:0
        },
        Bottom:{
         $:0
        }
       });
      }
     })
    },
    LayoutProvider:Runtime.Class({
     ColumnLayout:function(rowConfig)
     {
      var objectArg,arg00,_this=this;
      objectArg=this.LayoutUtils;
      arg00=function()
      {
       var x,row,x1,arg10,container,store,insert,remove,Body1;
       x=Runtime.New(T,{
        $:0
       });
       row=Tags.Tags().NewTag("tr",x);
       arg10=List.ofArray([row]);
       x1=List.ofArray([Tags.Tags().NewTag("tbody",arg10)]);
       container=Tags.Tags().NewTag("table",x1);
       store=ElementStore.NewElementStore();
       insert=function(rowIx)
       {
        return function(body)
        {
         var elemId,x2,arg101,arg102,newCol,jqPanel,index,inserted;
         elemId=body.Element.get_Id();
         arg102=List.ofArray([_this.MakeRow(rowConfig,rowIx,body)]);
         arg101=List.ofArray([Tags.Tags().NewTag("tbody",arg102)]);
         x2=List.ofArray([Tags.Tags().NewTag("table",arg101)]);
         newCol=Tags.Tags().NewTag("td",x2);
         jqPanel=jQuery(row.get_Body());
         index=[0];
         inserted=[false];
         jqPanel.children().each(function()
         {
          var jqCol,_;
          jqCol=jQuery(this);
          if(rowIx===index[0])
           {
            jQuery(newCol.get_Body()).insertBefore(jqCol);
            newCol.Render();
            _=void(inserted[0]=true);
           }
          else
           {
            _=null;
           }
          return Ref.incr(index);
         });
         !inserted[0]?row.AppendI(newCol):null;
         return store.RegisterElement(elemId,function()
         {
          return newCol["HtmlProvider@33"].Remove(newCol.get_Body());
         });
        };
       };
       remove=function(elems)
       {
        var enumerator,_,b;
        enumerator=Enumerator.Get(elems);
        try
        {
         while(enumerator.MoveNext())
          {
           b=enumerator.get_Current();
           store.Remove(b.Element.get_Id());
          }
        }
        finally
        {
         enumerator.Dispose!=undefined?enumerator.Dispose():null;
        }
        return _;
       };
       Body1=Runtime.New(Body,{
        Element:container,
        Label:{
         $:0
        }
       });
       return{
        Body:Body1,
        SyncRoot:null,
        Insert:insert,
        Remove:remove
       };
      };
      return objectArg.New(arg00);
     },
     HorizontalAlignElem:function(align,el)
     {
      var _float,arg10,arg101;
      _float=align.$==0?"left":"right";
      arg101="float:"+_float+";";
      arg10=List.ofArray([Attr.Attr().NewAttr("style",arg101)]);
      return Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([el]));
     },
     LabelLayout:function(lc)
     {
      var inputRecord,LabelConfiguration1;
      inputRecord=FormRowConfiguration.get_Default();
      LabelConfiguration1={
       $:1,
       $0:lc
      };
      return this.RowLayout(Runtime.New(FormRowConfiguration,{
       Padding:inputRecord.Padding,
       Color:inputRecord.Color,
       Class:inputRecord.Class,
       Style:inputRecord.Style,
       LabelConfiguration:LabelConfiguration1
      }));
     },
     MakeLayout:function(lm)
     {
      var objectArg,arg00;
      objectArg=this.LayoutUtils;
      arg00=function()
      {
       var lm1,store,insert,remove,Body1;
       lm1=lm(null);
       store=ElementStore.NewElementStore();
       insert=function(ix)
       {
        return function(bd)
        {
         var elemId,newElems;
         elemId=bd.Element.get_Id();
         newElems=(lm1.Insert.call(null,ix))(bd);
         return store.RegisterElement(elemId,function()
         {
          var enumerator,_,e;
          enumerator=Enumerator.Get(newElems);
          try
          {
           while(enumerator.MoveNext())
            {
             e=enumerator.get_Current();
             e["HtmlProvider@33"].Remove(e.get_Body());
            }
          }
          finally
          {
           enumerator.Dispose!=undefined?enumerator.Dispose():null;
          }
          return _;
         });
        };
       };
       remove=function(elems)
       {
        var enumerator,_,b;
        enumerator=Enumerator.Get(elems);
        try
        {
         while(enumerator.MoveNext())
          {
           b=enumerator.get_Current();
           store.Remove(b.Element.get_Id());
          }
        }
        finally
        {
         enumerator.Dispose!=undefined?enumerator.Dispose():null;
        }
        return _;
       };
       Body1=Runtime.New(Body,{
        Element:lm1.Panel,
        Label:{
         $:0
        }
       });
       return{
        Body:Body1,
        SyncRoot:null,
        Insert:insert,
        Remove:remove
       };
      };
      return objectArg.New(arg00);
     },
     MakeRow:function(rowConfig,rowIndex,body)
     {
      var x,d,f,padding,f1,o,paddingLeft,f2,o1,paddingTop,f3,o2,paddingRight,f4,o3,paddingBottom,makeCell,elem1,matchValue,cells,_,labelGen,x3,d1,f6,labelConf,arg00,arg101,label,matchValue1,_1,x4,x5,x6,d2,f7,rowClass,x7,d3,f8,rowColorStyleProp,x8,d4,f9,rowStyleProp,matchValue2,rowStyle,_2,arg002,x9;
      x=rowConfig.Padding;
      d=Padding1.get_Default();
      f=function(x1)
      {
       return x1;
      };
      padding=Utils.Maybe(d,f,x);
      f1=function(x1)
      {
       return x1;
      };
      o=padding.Left;
      paddingLeft=Utils.Maybe(0,f1,o);
      f2=function(x1)
      {
       return x1;
      };
      o1=padding.Top;
      paddingTop=Utils.Maybe(0,f2,o1);
      f3=function(x1)
      {
       return x1;
      };
      o2=padding.Right;
      paddingRight=Utils.Maybe(0,f3,o2);
      f4=function(x1)
      {
       return x1;
      };
      o3=padding.Bottom;
      paddingBottom=Utils.Maybe(0,f4,o3);
      makeCell=function(l)
      {
       return function(t)
       {
        return function(r)
        {
         return function(b)
         {
          return function(csp)
          {
           return function(valign)
           {
            return function(elem)
            {
             var mapping,reduction,list,source,paddingStyle,f5,valignStyle,_this,arg10,style,colSpan,x2;
             mapping=function(tupledArg)
             {
              var k,v;
              k=tupledArg[0];
              v=tupledArg[1];
              return k+Global.String(v)+"px;";
             };
             reduction=function(x1)
             {
              return function(y)
              {
               return x1+y;
              };
             };
             list=List.ofArray([["padding-left: ",l],["padding-top: ",t],["padding-right: ",r],["padding-bottom: ",b]]);
             source=List.map(mapping,list);
             paddingStyle=Seq.reduce(reduction,source);
             f5=function(valign1)
             {
              var value;
              value=valign1.$==1?"middle":valign1.$==2?"bottom":"top";
              return"vertical-align: "+value+";";
             };
             valignStyle=Utils.Maybe("",f5,valign);
             _this=Attr.Attr();
             arg10=paddingStyle+";"+valignStyle;
             style=_this.NewAttr("style",arg10);
             colSpan=csp?List.ofArray([Attr.Attr().NewAttr("colspan","2")]):Runtime.New(T,{
              $:0
             });
             x2=List.append(Runtime.New(T,{
              $:1,
              $0:style,
              $1:colSpan
             }),List.ofArray([elem]));
             return Tags.Tags().NewTag("td",x2);
            };
           };
          };
         };
        };
       };
      };
      elem1=body.Element;
      matchValue=body.Label;
      if(matchValue.$==1)
       {
        labelGen=matchValue.$0;
        x3=rowConfig.LabelConfiguration;
        d1=LabelConfiguration.get_Default();
        f6=function(x1)
        {
         return x1;
        };
        labelConf=Utils.Maybe(d1,f6,x3);
        arg00=labelConf.Align;
        arg101=labelGen(null);
        label=this.HorizontalAlignElem(arg00,arg101);
        matchValue1=labelConf.Placement;
        if(matchValue1.$==3)
         {
          x4=Utils.InTable(List.ofArray([List.ofArray([elem1]),List.ofArray([label])]));
          _1=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(paddingRight))(paddingBottom))(true))({
           $:0
          }))(x4)]);
         }
        else
         {
          if(matchValue1.$==0)
           {
            _1=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(0))(paddingBottom))(false))({
             $:1,
             $0:labelConf.VerticalAlign
            }))(label),((((((makeCell(0))(paddingTop))(paddingRight))(paddingBottom))(false))({
             $:0
            }))(elem1)]);
           }
          else
           {
            if(matchValue1.$==1)
             {
              _1=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(0))(paddingBottom))(false))({
               $:1,
               $0:labelConf.VerticalAlign
              }))(elem1),((((((makeCell(0))(paddingTop))(paddingRight))(paddingBottom))(false))({
               $:0
              }))(label)]);
             }
            else
             {
              x5=Utils.InTable(List.ofArray([List.ofArray([label]),List.ofArray([elem1])]));
              _1=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(paddingRight))(paddingBottom))(true))({
               $:0
              }))(x5)]);
             }
           }
         }
        _=_1;
       }
      else
       {
        _=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(paddingRight))(paddingBottom))(true))({
         $:0
        }))(elem1)]);
       }
      cells=_;
      x6=rowConfig.Class;
      d2=Runtime.New(T,{
       $:0
      });
      f7=function(classGen)
      {
       var arg001;
       arg001=classGen(rowIndex);
       return List.ofArray([Attr.Attr().NewAttr("class",arg001)]);
      };
      rowClass=Utils.Maybe(d2,f7,x6);
      x7=rowConfig.Color;
      d3=Runtime.New(T,{
       $:0
      });
      f8=function(colGen)
      {
       var col;
       col=colGen(rowIndex);
       return List.ofArray(["background-color: "+col]);
      };
      rowColorStyleProp=Utils.Maybe(d3,f8,x7);
      x8=rowConfig.Style;
      d4=Runtime.New(T,{
       $:0
      });
      f9=function(styleGen)
      {
       return List.ofArray([styleGen(rowIndex)]);
      };
      rowStyleProp=Utils.Maybe(d4,f9,x8);
      matchValue2=List.append(rowColorStyleProp,rowStyleProp);
      if(matchValue2.$==0)
       {
        _2=Runtime.New(T,{
         $:0
        });
       }
      else
       {
        arg002=Seq.reduce(function(x1)
        {
         return function(y)
         {
          return x1+";"+y;
         };
        },matchValue2);
        _2=List.ofArray([Attr.Attr().NewAttr("style",arg002)]);
       }
      rowStyle=_2;
      x9=List.append(rowClass,List.append(rowStyle,List.append(rowStyle,cells)));
      return Tags.Tags().NewTag("tr",x9);
     },
     RowLayout:function(rowConfig)
     {
      var objectArg,arg00,_this=this;
      objectArg=this.LayoutUtils;
      arg00=function()
      {
       var x,panel,x1,container,store,insert,remove,Body1;
       x=Runtime.New(T,{
        $:0
       });
       panel=Tags.Tags().NewTag("tbody",x);
       x1=List.ofArray([panel]);
       container=Tags.Tags().NewTag("table",x1);
       store=ElementStore.NewElementStore();
       insert=function(rowIx)
       {
        return function(body)
        {
         var elemId,row,jqPanel,index,inserted;
         elemId=body.Element.get_Id();
         row=_this.MakeRow(rowConfig,rowIx,body);
         jqPanel=jQuery(panel.get_Body());
         index=[0];
         inserted=[false];
         jqPanel.children().each(function()
         {
          var jqRow,_;
          jqRow=jQuery(this);
          if(rowIx===index[0])
           {
            jQuery(row.get_Body()).insertBefore(jqRow);
            row.Render();
            _=void(inserted[0]=true);
           }
          else
           {
            _=null;
           }
          return Ref.incr(index);
         });
         !inserted[0]?panel.AppendI(row):null;
         return store.RegisterElement(elemId,function()
         {
          return row["HtmlProvider@33"].Remove(row.get_Body());
         });
        };
       };
       remove=function(elems)
       {
        var enumerator,_,b;
        enumerator=Enumerator.Get(elems);
        try
        {
         while(enumerator.MoveNext())
          {
           b=enumerator.get_Current();
           store.Remove(b.Element.get_Id());
          }
        }
        finally
        {
         enumerator.Dispose!=undefined?enumerator.Dispose():null;
        }
        return _;
       };
       Body1=Runtime.New(Body,{
        Element:container,
        Label:{
         $:0
        }
       });
       return{
        Body:Body1,
        SyncRoot:null,
        Insert:insert,
        Remove:remove
       };
      };
      return objectArg.New(arg00);
     },
     VerticalAlignedTD:function(valign,elem)
     {
      var valign1,arg10,cell;
      valign1=valign.$==1?"middle":valign.$==2?"bottom":"top";
      arg10=List.ofArray([elem]);
      cell=Tags.Tags().NewTag("td",arg10);
      cell["HtmlProvider@33"].SetCss(cell.get_Body(),"vertical-align",valign1);
      return cell;
     },
     get_Flowlet:function()
     {
      var lm;
      lm=function()
      {
       var x,panel,insert;
       x=Runtime.New(T,{
        $:0
       });
       panel=Tags.Tags().NewTag("div",x);
       insert=function()
       {
        return function(bd)
        {
         var label,_,arg10,nextScreen,arg101;
         if(bd.Label.$==1)
          {
           _=bd.Label.$0.call(null,null);
          }
         else
          {
           arg10=Runtime.New(T,{
            $:0
           });
           _=Tags.Tags().NewTag("span",arg10);
          }
         label=_;
         arg101=List.ofArray([bd.Element]);
         nextScreen=Utils.InTable(List.ofArray([List.ofArray([label,Tags.Tags().NewTag("div",arg101)])]));
         panel["HtmlProvider@33"].Clear(panel.get_Body());
         panel.AppendI(nextScreen);
         return List.ofArray([nextScreen]);
        };
       };
       return{
        Insert:insert,
        Panel:panel
       };
      };
      return this.MakeLayout(lm);
     },
     get_Horizontal:function()
     {
      return this.ColumnLayout(FormRowConfiguration.get_Default());
     },
     get_Vertical:function()
     {
      return this.RowLayout(FormRowConfiguration.get_Default());
     }
    },{
     New:function(LayoutUtils1)
     {
      var r;
      r=Runtime.New(this,{});
      r.LayoutUtils=LayoutUtils1;
      return r;
     }
    }),
    Utils:{
     InTable:function(rows)
     {
      var mapping,rs,tb,arg101;
      mapping=function(cols)
      {
       var mapping1,xs;
       mapping1=function(c)
       {
        var arg10;
        arg10=List.ofArray([c]);
        return Tags.Tags().NewTag("td",arg10);
       };
       xs=List.map(mapping1,cols);
       return Tags.Tags().NewTag("tr",xs);
      };
      rs=List.map(mapping,rows);
      tb=Tags.Tags().NewTag("tbody",rs);
      arg101=List.ofArray([tb]);
      return Tags.Tags().NewTag("table",arg101);
     },
     MapOption:function(f,value)
     {
      var _,v;
      if(value.$==1)
       {
        v=value.$0;
        _={
         $:1,
         $0:f(v)
        };
       }
      else
       {
        _={
         $:0
        };
       }
      return _;
     },
     Maybe:function(d,f,o)
     {
      var _,x;
      if(o.$==0)
       {
        _=d;
       }
      else
       {
        x=o.$0;
        _=f(x);
       }
      return _;
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  Formlets=Runtime.Safe(Global.WebSharper.Formlets);
  Body=Runtime.Safe(Formlets.Body);
  List=Runtime.Safe(Global.WebSharper.List);
  Html=Runtime.Safe(Global.WebSharper.Html);
  Client=Runtime.Safe(Html.Client);
  Tags=Runtime.Safe(Client.Tags);
  Controls=Runtime.Safe(Formlets.Controls);
  IntelliFactory=Runtime.Safe(Global.IntelliFactory);
  Reactive=Runtime.Safe(IntelliFactory.Reactive);
  HotStream=Runtime.Safe(Reactive.HotStream);
  Formlets1=Runtime.Safe(IntelliFactory.Formlets);
  Base=Runtime.Safe(Formlets1.Base);
  Result=Runtime.Safe(Base.Result);
  Attr=Runtime.Safe(Client.Attr);
  T=Runtime.Safe(List.T);
  Operators=Runtime.Safe(Client.Operators);
  jQuery=Runtime.Safe(Global.jQuery);
  EventsPervasives=Runtime.Safe(Client.EventsPervasives);
  Data=Runtime.Safe(Formlets.Data);
  Formlet=Runtime.Safe(Formlets.Formlet);
  Ref=Runtime.Safe(Global.WebSharper.Ref);
  CssConstants=Runtime.Safe(Formlets.CssConstants);
  Math=Runtime.Safe(Global.Math);
  Seq=Runtime.Safe(Global.WebSharper.Seq);
  Utils=Runtime.Safe(Formlets.Utils);
  Tree=Runtime.Safe(Base.Tree);
  Edit=Runtime.Safe(Tree.Edit);
  Form=Runtime.Safe(Base.Form);
  Arrays=Runtime.Safe(Global.WebSharper.Arrays);
  FormletProvider=Runtime.Safe(Base.FormletProvider);
  Formlet1=Runtime.Safe(Data.Formlet);
  Pagelet=Runtime.Safe(Client.Pagelet);
  Util=Runtime.Safe(Global.WebSharper.Util);
  LayoutProvider=Runtime.Safe(Formlets.LayoutProvider);
  LayoutUtils=Runtime.Safe(Base.LayoutUtils);
  Reactive1=Runtime.Safe(Reactive.Reactive);
  Validator=Runtime.Safe(Base.Validator);
  ValidatorProvidor=Runtime.Safe(Data.ValidatorProvidor);
  RegExp=Runtime.Safe(Global.RegExp);
  Collections=Runtime.Safe(Global.WebSharper.Collections);
  Dictionary=Runtime.Safe(Collections.Dictionary);
  ElementStore=Runtime.Safe(Formlets.ElementStore);
  Enhance=Runtime.Safe(Formlets.Enhance);
  FormButtonConfiguration=Runtime.Safe(Enhance.FormButtonConfiguration);
  FormContainerConfiguration=Runtime.Safe(Enhance.FormContainerConfiguration);
  Padding=Runtime.Safe(Enhance.Padding);
  ManyConfiguration=Runtime.Safe(Enhance.ManyConfiguration);
  ValidationFrameConfiguration=Runtime.Safe(Enhance.ValidationFrameConfiguration);
  ValidationIconConfiguration=Runtime.Safe(Enhance.ValidationIconConfiguration);
  JSON=Runtime.Safe(Global.JSON);
  FormletBuilder=Runtime.Safe(Formlets.FormletBuilder);
  Layout=Runtime.Safe(Formlets.Layout);
  FormRowConfiguration=Runtime.Safe(Layout.FormRowConfiguration);
  LabelConfiguration=Runtime.Safe(Layout.LabelConfiguration);
  Padding1=Runtime.Safe(Layout.Padding);
  return Enumerator=Runtime.Safe(Global.WebSharper.Enumerator);
 });
 Runtime.OnLoad(function()
 {
  Runtime.Inherit(Formlet1,Pagelet);
  Formlet.Do();
  Data.Validator();
  Data.RX();
  Data.Layout();
  Data.DefaultLayout();
  CssConstants.InputTextClass();
  return;
 });
}());
