(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Piglets,Choose,Stream,Reader,Collections,Dictionary,List,T,Enumerator,Operators,Seq,Stream1,Result,ConcreteReader,Id,ConcreteWriter,ConstReader,Disposable,Html,Client,Operators1,Tags,EventsPervasives,Controls,Attr,Unchecked,jQuery,HtmlContainer,Arrays,Ref,ErrorMessage,Many,Stream2,Submitter,Operations,ResizeArray,ResizeArrayProxy,UnitStream,Concurrency,Pervasives,Piglet1,Stream3,Piglet,Validation,Util,IntelliFactory,Reactive,HotStream,RegExp;
 Runtime.Define(Global,{
  WebSharper:{
   Piglets:{
    Choose:{
     Stream:Runtime.Class({
      Choice:function(c,f)
      {
       var renders,hasChild,_this=this;
       renders=Dictionary.New12();
       hasChild=[false];
       this.subscriptions[0]=Runtime.New(T,{
        $:1,
        $0:this.pStream.Subscribe(function(res)
        {
         var _,p,i,render;
         if(res.$==0)
          {
           p=res.$0[1];
           i=res.$0[0];
           render=renders.ContainsKey(i)?renders.get_Item(i):p.view.call(null,f);
           _this.out.Trigger(p.stream.get_Latest());
           hasChild[0]?c.Remove(0):null;
           hasChild[0]=true;
           _=c.Add(render);
          }
         else
          {
           _=null;
          }
         return _;
        }),
        $1:_this.subscriptions[0]
       });
       return c.get_Container();
      },
      Chooser:function(f)
      {
       return this.chooser.view.call(null,f);
      },
      Dispose:function()
      {
       var inputSequence,enumerator,_,s,action,source;
       inputSequence=this.subscriptions[0];
       enumerator=Enumerator.Get(inputSequence);
       try
       {
        while(enumerator.MoveNext())
         {
          s=enumerator.get_Current();
          s.Dispose();
         }
       }
       finally
       {
        enumerator.Dispose!=undefined?enumerator.Dispose():null;
       }
       action=function(_arg3)
       {
        var activePatternResult,s1;
        activePatternResult=Operators.KeyValue(_arg3);
        s1=activePatternResult[1][1];
        return s1.Dispose();
       };
       source=this.choiceSubscriptions;
       return Seq.iter(action,source);
      },
      Subscribe:function(f)
      {
       return this.out.Subscribe(f);
      },
      get_ChooserStream:function()
      {
       return this.chooser.stream;
      },
      get_Latest:function()
      {
       return this.out.get_Latest();
      }
     },{
      New:function(chooser,choice,out)
      {
       var r;
       r=Runtime.New(this,Reader.New(out.get_Id()));
       r.chooser=chooser;
       r.out=out;
       r.pStream=Stream1.New(Runtime.New(Result,{
        $:1,
        $0:Runtime.New(T,{
         $:0
        })
       }),{
        $:0
       });
       r.choiceSubscriptions=Dictionary.New12();
       r.subscriptions=[List.ofArray([r.chooser.stream.Subscribe(function(res)
       {
        var arg00,objectArg1,arg002;
        arg00=function(i)
        {
         var _,p,objectArg;
         if(r.choiceSubscriptions.ContainsKey(i))
          {
           _=(r.choiceSubscriptions.get_Item(i))[0];
          }
         else
          {
           p=choice(i);
           objectArg=r.out;
           r.choiceSubscriptions.set_Item(i,[p,p.stream.Subscribe(function(arg001)
           {
            return objectArg.Trigger(arg001);
           })]);
           _=p;
          }
         return[i,_];
        };
        objectArg1=r.pStream;
        arg002=Result.Map(arg00,res);
        return objectArg1.Trigger(arg002);
       })])];
       return r;
      }
     })
    },
    ConcreteReader:Runtime.Class({
     Subscribe:function(f)
     {
      return this.subscribe.call(null,f);
     },
     get_Latest:function()
     {
      return this.latest.call(null,null);
     }
    },{
     New:function(latest,subscribe)
     {
      var r;
      r=Runtime.New(this,Reader.New((Id.next())(null)));
      r.latest=latest;
      r.subscribe=subscribe;
      return r;
     }
    }),
    ConcreteWriter:Runtime.Class({
     Trigger:function(x)
     {
      return this.trigger.call(null,x);
     }
    },{
     New:function(trigger)
     {
      var r;
      r=Runtime.New(this,{});
      r.trigger=trigger;
      return r;
     },
     New1:function(trigger)
     {
      return ConcreteWriter.New(function(_arg1)
      {
       var _,x;
       if(_arg1.$==1)
        {
         _=null;
        }
       else
        {
         x=_arg1.$0;
         _=trigger(x);
        }
       return _;
      });
     }
    }),
    ConstReader:Runtime.Class({
     Subscribe:function()
     {
      return Disposable.New(function()
      {
      });
     },
     get_Latest:function()
     {
      return this.x;
     }
    },{
     New:function(x)
     {
      var r;
      r=Runtime.New(this,Reader.New((Id.next())(null)));
      r.x=x;
      return r;
     }
    }),
    Controls:{
     Attr:function(reader,attrName,render,element)
     {
      var f;
      f=function(element1)
      {
       var set,value;
       set=function(x)
       {
        var _,x1,arg20;
        if(x.$==0)
         {
          x1=x.$0;
          arg20=render(x1);
          _=element1["HtmlProvider@33"].SetAttribute(element1.get_Body(),attrName,arg20);
         }
        else
         {
          _=null;
         }
        return _;
       };
       set(reader.get_Latest());
       value=reader.Subscribe(set);
       return;
      };
      Operators1.OnAfterRender(f,element);
      return element;
     },
     AttrResult:function(reader,attrName,render,element)
     {
      var f;
      f=function(element1)
      {
       var set,value;
       set=function(x)
       {
        var arg20;
        arg20=render(x);
        return element1["HtmlProvider@33"].SetAttribute(element1.get_Body(),attrName,arg20);
       };
       set(reader.get_Latest());
       value=reader.Subscribe(set);
       return;
      };
      Operators1.OnAfterRender(f,element);
      return element;
     },
     Button:function(submit)
     {
      var arg10,x,arg00;
      arg10=Runtime.New(T,{
       $:0
      });
      x=Tags.Tags().NewTag("button",arg10);
      arg00=function()
      {
       return function()
       {
        return submit.Trigger(Runtime.New(Result,{
         $:0,
         $0:null
        }));
       };
      };
      EventsPervasives.Events().OnClick(arg00,x);
      return x;
     },
     ButtonValidate:function(submit)
     {
      var x,_arg00_;
      x=Controls.Button(submit);
      _arg00_=submit.get_Input();
      return Controls.EnableOnSuccess(_arg00_,x);
     },
     CheckBox:function(stream)
     {
      var id,_this,arg10,i,matchValue,_,x,value,ev;
      id=(Controls.nextId())(null);
      _this=Tags.Tags();
      arg10=List.ofArray([Attr.Attr().NewAttr("type","checkbox"),Attr.Attr().NewAttr("id",id)]);
      i=_this.NewTag("input",arg10);
      matchValue=stream.get_Latest();
      if(matchValue.$==0)
       {
        x=matchValue.$0;
        _=void(i.get_Body().checked=x);
       }
      else
       {
        _=null;
       }
      value=stream.Subscribe(function(_arg1)
      {
       var _1,x1;
       if(_arg1.$==1)
        {
         _1=null;
        }
       else
        {
         x1=_arg1.$0;
         _1=!Unchecked.Equals(i.get_Body().checked,x1)?void(i.get_Body().checked=x1):null;
        }
       return _1;
      });
      ev=function()
      {
       return stream.Trigger(Runtime.New(Result,{
        $:0,
        $0:i.get_Body().checked
       }));
      };
      i.get_Body().addEventListener("change",ev,true);
      return i;
     },
     Css:function(reader,attrName,render,element)
     {
      var f;
      f=function(element1)
      {
       var set,value;
       set=function(x)
       {
        var _,x1,arg20;
        if(x.$==0)
         {
          x1=x.$0;
          arg20=render(x1);
          _=element1["HtmlProvider@33"].SetCss(element1.get_Body(),attrName,arg20);
         }
        else
         {
          _=null;
         }
        return _;
       };
       set(reader.get_Latest());
       value=reader.Subscribe(set);
       return;
      };
      Operators1.OnAfterRender(f,element);
      return element;
     },
     CssResult:function(reader,attrName,render,element)
     {
      Operators1.OnAfterRender(function(element1)
      {
       var set;
       set=function(x)
       {
        var arg20;
        arg20=render(x);
        return element1["HtmlProvider@33"].SetCss(element1.get_Body(),attrName,arg20);
       };
       set(reader.get_Latest());
       reader.Subscribe(set);
       return;
      },element);
      return element;
     },
     EnableOnSuccess:function(reader,element)
     {
      var f;
      f=function(el)
      {
       var value;
       el.get_Body().disabled=!reader.get_Latest().get_isSuccess();
       value=reader.Subscribe(function(x)
       {
        el.get_Body().disabled=!x.get_isSuccess();
       });
       return;
      };
      Operators1.OnAfterRender(f,element);
      return element;
     },
     HtmlContainer:Runtime.Class({
      Add:function(elt)
      {
       return this.container.AppendI(elt);
      },
      MoveUp:function(i)
      {
       var elt_i,elt_i_1,value,value1;
       elt_i=this.container.get_Body().childNodes[i];
       elt_i_1=this.container.get_Body().childNodes[i-1];
       value=this.container.get_Body().removeChild(elt_i);
       value1=this.container.get_Body().insertBefore(elt_i,elt_i_1);
       return;
      },
      Remove:function(i)
      {
       var value;
       value=this.container.get_Body().removeChild(this.container.get_Body().childNodes[i]);
       return;
      },
      get_Container:function()
      {
       return this.container;
      }
     },{
      New:function(container)
      {
       var r;
       r=Runtime.New(this,{});
       r.container=container;
       return r;
      }
     }),
     IntInput:function(stream)
     {
      return Controls.input("number",function(value)
      {
       return value<<0;
      },function(value)
      {
       return Global.String(value);
      },stream);
     },
     Link:function(submit)
     {
      var x,x1,f;
      x=List.ofArray([Attr.Attr().NewAttr("href","#")]);
      x1=Tags.Tags().NewTag("a",x);
      f=function(e)
      {
       return jQuery(e.get_Body()).on("click",function(ev)
       {
        submit.Trigger(Runtime.New(Result,{
         $:0,
         $0:null
        }));
        return ev.preventDefault();
       });
      };
      Operators1.OnAfterRender(f,x1);
      return x1;
     },
     Radio:function(stream,values)
     {
      var name,values1,mapping,elts,set,value;
      name=(Controls.nextId())(null);
      values1=List.ofSeq(values);
      mapping=function(x)
      {
       var _this,x1,arg00;
       _this=Tags.Tags();
       x1=_this.NewTag("input",List.ofArray([Attr.Attr().NewAttr("type","radio"),Attr.Attr().NewAttr("name",name)]));
       arg00=function(el)
       {
        return function()
        {
         return el.get_Body().checked?stream.Trigger(Runtime.New(Result,{
          $:0,
          $0:x
         })):null;
        };
       };
       EventsPervasives.Events().OnChange(arg00,x1);
       return x1;
      };
      elts=List.map(mapping,values1);
      set=function(_arg1)
      {
       var _,v,action;
       if(_arg1.$==1)
        {
         _=null;
        }
       else
        {
         v=_arg1.$0;
         action=function(x)
         {
          return function(input)
          {
           input.get_Body().checked=Unchecked.Equals(x,v);
          };
         };
         _=List.iter2(action,values1,elts);
        }
       return _;
      };
      set(stream.get_Latest());
      value=stream.Subscribe(set);
      return elts;
     },
     RadioLabelled:function(stream,values)
     {
      var y,mapping,x;
      y=Controls.Radio(stream,Seq.map(function(tuple)
      {
       return tuple[0];
      },values));
      mapping=function(tupledArg)
      {
       var _arg1,label;
       _arg1=tupledArg[0];
       label=tupledArg[1];
       return function(input)
       {
        var id,arg10,arg101;
        id=(Controls.nextId())(null);
        arg101=List.ofArray([Attr.Attr().NewAttr("for",id),Tags.Tags().text(label)]);
        arg10=List.ofArray([Operators1.add(input,List.ofArray([Attr.Attr().NewAttr("id",id)])),Tags.Tags().NewTag("label",arg101)]);
        return Tags.Tags().NewTag("span",arg10);
       };
      };
      x=Seq.map2(mapping,values,y);
      return Tags.Tags().NewTag("div",x);
     },
     RenderChoice:function(choice,renderIt,container)
     {
      var arg00;
      arg00=HtmlContainer.New(container);
      return choice.Choice(arg00,renderIt);
     },
     RenderMany:function(many,renderOne,container)
     {
      var arg00;
      arg00=HtmlContainer.New(container);
      return many.Render(arg00,renderOne);
     },
     Select:function(stream,values)
     {
      var name,values1,mapping,elts,_this,x,arg00,x1,f;
      name=(Controls.nextId())(null);
      values1=Arrays.ofSeq(values);
      mapping=function(tupledArg)
      {
       var label,id;
       tupledArg[0];
       label=tupledArg[1];
       id=(Controls.nextId())(null);
       return Operators1.add(Tags.Tags().NewTag("option",List.ofArray([Attr.Attr().NewAttr("value",id)])),List.ofArray([Tags.Tags().text(label)]));
      };
      elts=Arrays.map(mapping,values1);
      _this=Tags.Tags();
      x=_this.NewTag("select",elts);
      arg00=function(el)
      {
       return function()
       {
        return el.get_Body().selectedIndex>=0?stream.Trigger(Runtime.New(Result,{
         $:0,
         $0:(Arrays.get(values1,el.get_Body().selectedIndex))[0]
        })):null;
       };
      };
      EventsPervasives.Events().OnChange(arg00,x);
      x1=x;
      f=function()
      {
       var value;
       value=stream.Subscribe(function(_arg1)
       {
        var _,v,matchValue,_1,i,_this1;
        if(_arg1.$==1)
         {
          _=null;
         }
        else
         {
          v=_arg1.$0;
          matchValue=Arrays.tryFindIndex(function(tupledArg)
          {
           var _v_;
           _v_=tupledArg[0];
           tupledArg[1];
           return Unchecked.Equals(v,_v_);
          },values1);
          if(matchValue.$==0)
           {
            _1=null;
           }
          else
           {
            i=matchValue.$0;
            _this1=Arrays.get(elts,i);
            _1=_this1["HtmlProvider@33"].SetAttribute(_this1.get_Body(),"selected","");
           }
          _=_1;
         }
        return _;
       });
       return;
      };
      Operators1.OnAfterRender(f,x1);
      return x1;
     },
     Show:function(reader,render,container)
     {
      var render1;
      render1=function(_arg1)
      {
       var _,x;
       if(_arg1.$==1)
        {
         _=Seq.empty();
        }
       else
        {
         x=_arg1.$0;
         _=render(x);
        }
       return _;
      };
      return Controls.ShowResult(reader,render1,container);
     },
     ShowErrors:function(reader,render,container)
     {
      var render1;
      render1=function(_arg1)
      {
       var _,m,mapping;
       if(_arg1.$==1)
        {
         m=_arg1.$0;
         mapping=function(m1)
         {
          return m1.get_Message();
         };
         _=render(List.map(mapping,m));
        }
       else
        {
         _arg1.$0;
         _=Seq.empty();
        }
       return _;
      };
      return Controls.ShowResult(reader,render1,container);
     },
     ShowResult:function(reader,render,container)
     {
      var inputSequence,enumerator,_,e,value;
      inputSequence=render(reader.get_Latest());
      enumerator=Enumerator.Get(inputSequence);
      try
      {
       while(enumerator.MoveNext())
        {
         e=enumerator.get_Current();
         container.AppendI(e);
        }
      }
      finally
      {
       enumerator.Dispose!=undefined?enumerator.Dispose():null;
      }
      value=reader.Subscribe(function(x)
      {
       var inputSequence1,enumerator1,_1,e1;
       container["HtmlProvider@33"].Clear(container.get_Body());
       inputSequence1=render(x);
       enumerator1=Enumerator.Get(inputSequence1);
       try
       {
        while(enumerator1.MoveNext())
         {
          e1=enumerator1.get_Current();
          container.AppendI(e1);
         }
       }
       finally
       {
        enumerator1.Dispose!=undefined?enumerator1.Dispose():null;
       }
       return _1;
      });
      return container;
     },
     ShowString:function(reader,render,container)
     {
      return Controls.Show(reader,function(x)
      {
       var x1;
       x1=render(x);
       return List.ofArray([Tags.Tags().text(x1)]);
      },container);
     },
     Submit:function(submit)
     {
      var x,arg00;
      x=Tags.Tags().NewTag("input",List.ofArray([Attr.Attr().NewAttr("type","submit")]));
      arg00=function()
      {
       return function()
       {
        return submit.Trigger(Runtime.New(Result,{
         $:0,
         $0:null
        }));
       };
      };
      EventsPervasives.Events().OnClick(arg00,x);
      return x;
     },
     SubmitValidate:function(submit)
     {
      var x,_arg00_;
      x=Controls.Submit(submit);
      _arg00_=submit.get_Input();
      return Controls.EnableOnSuccess(_arg00_,x);
     },
     TextArea:function(stream)
     {
      var _this,arg10,i,matchValue,_,x,value,ev;
      _this=Tags.Tags();
      arg10=Runtime.New(T,{
       $:0
      });
      i=_this.NewTag("textarea",arg10);
      matchValue=stream.get_Latest();
      if(matchValue.$==0)
       {
        x=matchValue.$0;
        _=i.set_Value(x);
       }
      else
       {
        _=null;
       }
      value=stream.Subscribe(function(_arg1)
      {
       var _1,x1;
       if(_arg1.$==1)
        {
         _1=null;
        }
       else
        {
         x1=_arg1.$0;
         _1=i.get_Value()!==x1?i.set_Value(x1):null;
        }
       return _1;
      });
      ev=function()
      {
       return stream.Trigger(Runtime.New(Result,{
        $:0,
        $0:i.get_Value()
       }));
      };
      i.get_Body().addEventListener("keyup",ev,true);
      i.get_Body().addEventListener("change",ev,true);
      return i;
     },
     WithLabel:function(label,element)
     {
      var id,arg10,arg101;
      id=(Controls.nextId())(null);
      arg101=List.ofArray([Attr.Attr().NewAttr("for",id),Tags.Tags().text(label)]);
      arg10=List.ofArray([Tags.Tags().NewTag("label",arg101),Operators1.add(element,List.ofArray([Attr.Attr().NewAttr("id",id)]))]);
      return Tags.Tags().NewTag("span",arg10);
     },
     WithLabelAfter:function(label,element)
     {
      var id,arg10,arg101;
      id=(Controls.nextId())(null);
      arg101=List.ofArray([Attr.Attr().NewAttr("for",id),Tags.Tags().text(label)]);
      arg10=List.ofArray([Operators1.add(element,List.ofArray([Attr.Attr().NewAttr("id",id)])),Tags.Tags().NewTag("label",arg101)]);
      return Tags.Tags().NewTag("span",arg10);
     },
     input:function(type,ofString,toString,stream)
     {
      var _this,arg10,i,matchValue,_,x,value,ev;
      _this=Tags.Tags();
      arg10=List.ofArray([Attr.Attr().NewAttr("type",type)]);
      i=_this.NewTag("input",arg10);
      matchValue=stream.get_Latest();
      if(matchValue.$==0)
       {
        x=matchValue.$0;
        _=i.set_Value(toString(x));
       }
      else
       {
        _=null;
       }
      value=stream.Subscribe(function(_arg1)
      {
       var _1,x1,s;
       if(_arg1.$==1)
        {
         _1=null;
        }
       else
        {
         x1=_arg1.$0;
         s=toString(x1);
         _1=i.get_Value()!==s?i.set_Value(s):null;
        }
       return _1;
      });
      ev=function()
      {
       var v;
       v=Runtime.New(Result,{
        $:0,
        $0:ofString(i.get_Value())
       });
       return!Unchecked.Equals(v,stream.get_Latest())?stream.Trigger(v):null;
      };
      i.get_Body().addEventListener("keyup",ev,true);
      i.get_Body().addEventListener("change",ev,true);
      return i;
     },
     nextId:Runtime.Field(function()
     {
      var _current_26_2;
      _current_26_2=[0];
      return function()
      {
       Ref.incr(_current_26_2);
       return"pl__"+Global.String(_current_26_2[0]);
      };
     })
    },
    Disposable:Runtime.Class({
     Dispose:function()
     {
      return this.dispose.call(null,null);
     }
    },{
     New:function(dispose)
     {
      var r;
      r=Runtime.New(this,{});
      r.dispose=dispose;
      return r;
     }
    }),
    ErrorMessage:Runtime.Class({
     get_Message:function()
     {
      return this.message;
     },
     get_Source:function()
     {
      return this.source;
     }
    },{
     Create:function(msg,reader)
     {
      return ErrorMessage.New(msg,reader.get_Id());
     },
     New:function(message,source)
     {
      var r;
      r=Runtime.New(this,{});
      r.message=message;
      r.source=source;
      return r;
     }
    }),
    Id:{
     next:Runtime.Field(function()
     {
      var _current_28_3;
      _current_28_3=[0];
      return function()
      {
       Ref.incr(_current_28_3);
       return _current_28_3[0];
      };
     })
    },
    Many:{
     Operations:Runtime.Class({
      get_Delete:function()
      {
       return ConcreteWriter.New1(this["delete"]);
      },
      get_MoveDown:function()
      {
       return this.moveDown;
      },
      get_MoveUp:function()
      {
       return this.moveUp;
      }
     },{
      New:function(_delete,moveUp,moveDown)
      {
       var r;
       r=Runtime.New(this,{});
       r["delete"]=_delete;
       r.moveUp=moveUp;
       r.moveDown=moveDown;
       return r;
      }
     }),
     Stream:Runtime.Class({
      AddRender:function(f)
      {
       return this.adder.view.call(null,f);
      },
      Render:function(c,f)
      {
       var add,_this=this,matchValue,_1,xs,value1;
       add=function(x)
       {
        var piglet,value,getThisIndex,moveUp,moveDown,moveUp1,canMoveUp,canMoveDown,inMoveUp,inMoveDown,outSubscription,subMoveUp,subMoveDown,subUpSubscription,subDownSubscription,_delete;
        piglet=_this.p.call(null,x);
        _this.streams.Add(piglet.stream);
        value=piglet.stream.Subscribe(function()
        {
         return _this.update();
        });
        getThisIndex=function()
        {
         var predicate,source;
         predicate=function(x1)
         {
          return x1.get_Id()===piglet.stream.get_Id();
         };
         source=_this.streams;
         return Seq.findIndex(predicate,source);
        };
        moveUp=function(i)
        {
         var _,s;
         if(i>0?i<_this.streams.get_Count():false)
          {
           s=_this.streams.get_Item(i);
           _this.streams.set_Item(i,_this.streams.get_Item(i-1));
           _this.streams.set_Item(i-1,s);
           c.MoveUp(i);
           _=_this.update();
          }
         else
          {
           _=null;
          }
         return _;
        };
        moveDown=function()
        {
         return moveUp(getThisIndex(null)+1);
        };
        moveUp1=function()
        {
         return moveUp(getThisIndex(null));
        };
        canMoveUp=function()
        {
         return getThisIndex(null)>0?Runtime.New(Result,{
          $:0,
          $0:null
         }):Runtime.New(Result,{
          $:1,
          $0:Runtime.New(T,{
           $:0
          })
         });
        };
        canMoveDown=function()
        {
         return getThisIndex(null)<_this.streams.get_Count()-1?Runtime.New(Result,{
          $:0,
          $0:null
         }):Runtime.New(Result,{
          $:1,
          $0:Runtime.New(T,{
           $:0
          })
         });
        };
        inMoveUp=Stream1.New(canMoveUp(null),{
         $:0
        });
        inMoveDown=Stream1.New(canMoveDown(null),{
         $:0
        });
        outSubscription=_this.out.Subscribe(function()
        {
         inMoveUp.Trigger(canMoveUp(null));
         return inMoveDown.Trigger(canMoveDown(null));
        });
        subMoveUp=Submitter.New(inMoveUp,false);
        subMoveDown=Submitter.New(inMoveDown,false);
        subUpSubscription=subMoveUp.Subscribe(Result.Iter(moveUp1));
        subDownSubscription=subMoveDown.Subscribe(Result.Iter(moveDown));
        _delete=function()
        {
         var i;
         i=getThisIndex(null);
         _this.streams.RemoveAt(i);
         c.Remove(i);
         outSubscription.Dispose();
         subUpSubscription.Dispose();
         subDownSubscription.Dispose();
         return _this.update();
        };
        return c.Add(piglet.view.call(null,f(Operations.New(_delete,subMoveUp,subMoveDown))));
       };
       matchValue=_this.out.get_Latest();
       if(matchValue.$==0)
        {
         xs=matchValue.$0;
         _1=Arrays.iter(add,xs);
        }
       else
        {
         _1=null;
        }
       value1=_this.adder.stream.Subscribe(function(_arg1)
       {
        var _,init;
        if(_arg1.$==0)
         {
          init=_arg1.$0;
          _=add(init);
         }
        else
         {
          _=null;
         }
        return _;
       });
       return c.get_Container();
      },
      Subscribe:function(f)
      {
       return this.out.Subscribe(f);
      },
      get_Add:function()
      {
       return this.adder.stream;
      },
      get_Latest:function()
      {
       return this.out.get_Latest();
      },
      update:function()
      {
       var arg00,objectArg,arg10,arg001;
       arg00=function(x)
       {
        var list;
        list=List.rev(x);
        return Arrays.ofSeq(list);
       };
       objectArg=this.out;
       arg10=Seq.fold(function(acc)
       {
        return function(cur)
        {
         var matchValue,_,_1,m1,m2,m,_2,m3,l,x;
         matchValue=[acc,cur.get_Latest()];
         if(matchValue[0].$==1)
          {
           if(matchValue[1].$==1)
            {
             m1=matchValue[0].$0;
             m2=matchValue[1].$0;
             _1=Runtime.New(Result,{
              $:1,
              $0:List.append(m2,m1)
             });
            }
           else
            {
             m=matchValue[0].$0;
             _1=Runtime.New(Result,{
              $:1,
              $0:m
             });
            }
           _=_1;
          }
         else
          {
           if(matchValue[1].$==1)
            {
             m3=matchValue[1].$0;
             _2=Runtime.New(Result,{
              $:1,
              $0:m3
             });
            }
           else
            {
             l=matchValue[0].$0;
             x=matchValue[1].$0;
             _2=Runtime.New(Result,{
              $:0,
              $0:Runtime.New(T,{
               $:1,
               $0:x,
               $1:l
              })
             });
            }
           _=_2;
          }
         return _;
        };
       },Runtime.New(Result,{
        $:0,
        $0:Runtime.New(T,{
         $:0
        })
       }),this.streams);
       arg001=Result.Map(arg00,arg10);
       return objectArg.Trigger(arg001);
      }
     },{
      New:function(p,out,adder)
      {
       var r;
       r=Runtime.New(this,Reader.New(out.get_Id()));
       r.p=p;
       r.out=out;
       r.adder=adder;
       r.streams=ResizeArrayProxy.New2();
       return r;
      }
     }),
     UnitStream:Runtime.Class({
      get_Add:function()
      {
       return this.submitStream;
      }
     },{
      New:function(p,out,init,_default)
      {
       var r,submitter,objectArg,trigger,value;
       r=Runtime.New(this,Stream2.New(p,out,init));
       submitter=Stream1.New(Runtime.New(Result,{
        $:1,
        $0:Runtime.New(T,{
         $:0
        })
       }),{
        $:0
       });
       objectArg=init.get_Stream();
       trigger=function(arg00)
       {
        return objectArg.Trigger(arg00);
       };
       value=submitter.Subscribe(function(_arg1)
       {
        var _,msgs;
        if(_arg1.$==0)
         {
          _=trigger(Runtime.New(Result,{
           $:0,
           $0:_default
          }));
         }
        else
         {
          msgs=_arg1.$0;
          _=trigger(Runtime.New(Result,{
           $:1,
           $0:msgs
          }));
         }
        return _;
       });
       r.submitStream=submitter;
       return r;
      }
     })
    },
    Pervasives:{
     "Writer`1.Wrap.Static":function(f,r)
     {
      return ConcreteWriter.New(function(a)
      {
       return r.Trigger(Result.Map(f,a));
      });
     },
     "Writer`1.WrapAsync.Static":function(f,r)
     {
      var arg00;
      arg00=function(b)
      {
       return Concurrency.Delay(function()
       {
        return Concurrency.Bind(f(b),function(_arg2)
        {
         return Concurrency.Return(Runtime.New(Result,{
          $:0,
          $0:_arg2
         }));
        });
       });
      };
      return Pervasives["Writer`1.WrapToAsyncResult.Static"](arg00,r);
     },
     "Writer`1.WrapAsyncResult.Static":function(f,r)
     {
      return ConcreteWriter.New(function(ra)
      {
       var arg00;
       arg00=Concurrency.Delay(function()
       {
        return Concurrency.Bind(f(ra),function(_arg1)
        {
         r.Trigger(_arg1);
         return Concurrency.Return(null);
        });
       });
       return Concurrency.Start(arg00,{
        $:0
       });
      });
     },
     "Writer`1.WrapResult.Static":function(f,r)
     {
      return ConcreteWriter.New(function(a)
      {
       return r.Trigger(f(a));
      });
     },
     "Writer`1.WrapToAsyncResult.Static":function(f,r)
     {
      var arg00;
      arg00=function(b)
      {
       return Concurrency.Delay(function()
       {
        var _,f1,sb;
        if(b.$==1)
         {
          f1=b.$0;
          _=Concurrency.Return(Runtime.New(Result,{
           $:1,
           $0:f1
          }));
         }
        else
         {
          sb=b.$0;
          _=f(sb);
         }
        return _;
       });
      };
      return Pervasives["Writer`1.WrapAsyncResult.Static"](arg00,r);
     },
     "Writer`1.WrapToResult.Static":function(f,r)
     {
      return ConcreteWriter.New(function(a)
      {
       return r.Trigger((Result.Bind(f))(a));
      });
     },
     op_LessMultiplyGreater:function(f,x)
     {
      var f1,g;
      f1=f.view;
      g=x.view;
      return Runtime.New(Piglet1,{
       stream:Stream3.Ap(f.stream,x.stream),
       view:function(x1)
       {
        return g(f1(x1));
       }
      });
     },
     op_LessMultiplyQmarkGreater:function(f,x)
     {
      var f1,g;
      f1=f.view;
      g=x.view;
      return Runtime.New(Piglet1,{
       stream:Stream3.ApJoin(f.stream,x.stream),
       view:function(x1)
       {
        return g(f1(x1));
       }
      });
     }
    },
    Piglet:{
     Builder:Runtime.Class({
      Bind:function(p,f)
      {
       return Piglet.Choose(p,f);
      },
      Return:function(x)
      {
       return Piglet.Return(x);
      },
      ReturnFrom:function(p)
      {
       return p;
      },
      Yield:function(x)
      {
       return Piglet.Yield(x);
      },
      YieldFrom:function(p)
      {
       return p;
      },
      Zero:function()
      {
       return Piglet.ReturnFailure();
      }
     }),
     Choose:function(chooser,choices)
     {
      var s,c;
      s=Stream1.New(Runtime.New(Result,{
       $:1,
       $0:Runtime.New(T,{
        $:0
       })
      }),{
       $:0
      });
      c=Stream.New(chooser,choices,s);
      return Runtime.New(Piglet1,{
       stream:s,
       view:function(f)
       {
        return f(c);
       }
      });
     },
     Confirm:function(init,validate,nomatch)
     {
      var second,x,pred,arg10,msg,x1,_arg00_,x2,_arg00_1;
      second=Piglet.Yield(init);
      x=Pervasives.op_LessMultiplyGreater(Pervasives.op_LessMultiplyGreater(Piglet.Return(function(a)
      {
       return function(b)
       {
        return[a,b];
       };
      }),validate(Piglet.Yield(init))),second);
      pred=function(tupledArg)
      {
       var a,b;
       a=tupledArg[0];
       b=tupledArg[1];
       return Unchecked.Equals(a,b);
      };
      arg10=second.get_Stream();
      msg=ErrorMessage.Create(nomatch,arg10);
      x1=Validation["Is'"](pred,msg,x);
      _arg00_=function(tuple)
      {
       return tuple[0];
      };
      x2=Piglet.Map(_arg00_,x1);
      _arg00_1=function(a)
      {
       return function(b)
       {
        return[a,b];
       };
      };
      return Piglet.MapViewArgs(_arg00_1,x2);
     },
     FlushErrors:function(p)
     {
      return Piglet.MapResult(function(_arg1)
      {
       return _arg1.$==1?Runtime.New(Result,{
        $:1,
        $0:Runtime.New(T,{
         $:0
        })
       }):_arg1;
      },p);
     },
     Many:function(init,p)
     {
      return Piglet.ManyInit([init],init,p);
     },
     ManyInit:function(inits,init,p)
     {
      var s,_init,m;
      s=Stream1.New(Runtime.New(Result,{
       $:0,
       $0:inits
      }),{
       $:0
      });
      _init=p(init);
      m=UnitStream.New(p,s,_init,init);
      return Runtime.New(Piglet1,{
       stream:s,
       view:function(f)
       {
        return f(m);
       }
      });
     },
     ManyPiglet:function(inits,create,p)
     {
      var s,m;
      s=Stream1.New(Runtime.New(Result,{
       $:0,
       $0:inits
      }),{
       $:0
      });
      m=Stream2.New(p,s,create);
      return Runtime.New(Piglet1,{
       stream:s,
       view:function(f)
       {
        return f(m);
       }
      });
     },
     Map:function(m,p)
     {
      var _arg00_;
      _arg00_=function(_arg1)
      {
       var _,x,msg;
       if(_arg1.$==0)
        {
         x=_arg1.$0;
         _=Runtime.New(Result,{
          $:0,
          $0:m(x)
         });
        }
       else
        {
         msg=_arg1.$0;
         _=Runtime.New(Result,{
          $:1,
          $0:msg
         });
        }
       return _;
      };
      return Piglet.MapResult(_arg00_,p);
     },
     MapAsync:function(m,p)
     {
      var _arg00_;
      _arg00_=function(_arg1)
      {
       var _,x,msg;
       if(_arg1.$==0)
        {
         x=_arg1.$0;
         _=Concurrency.Delay(function()
         {
          return Concurrency.Bind(m(x),function(_arg2)
          {
           return Concurrency.Return(Runtime.New(Result,{
            $:0,
            $0:_arg2
           }));
          });
         });
        }
       else
        {
         msg=_arg1.$0;
         _=Concurrency.Return(Runtime.New(Result,{
          $:1,
          $0:msg
         }));
        }
       return _;
      };
      return Piglet.MapAsyncResult(_arg00_,p);
     },
     MapAsyncResult:function(m,p)
     {
      var out,value,arg001;
      out=Stream1.New(Runtime.New(Result,{
       $:1,
       $0:Runtime.New(T,{
        $:0
       })
      }),{
       $:0
      });
      value=p.stream.Subscribe(function(v)
      {
       var arg00;
       arg00=Concurrency.Delay(function()
       {
        return Concurrency.Bind(m(v),function(_arg1)
        {
         return Concurrency.Return(out.Trigger(_arg1));
        });
       });
       return Concurrency.Start(arg00,{
        $:0
       });
      });
      arg001=Concurrency.Delay(function()
      {
       return Concurrency.Bind(m(p.stream.get_Latest()),function(_arg2)
       {
        return Concurrency.Return(out.Trigger(_arg2));
       });
      });
      Concurrency.Start(arg001,{
       $:0
      });
      return Runtime.New(Piglet1,{
       stream:out,
       view:p.view
      });
     },
     MapResult:function(m,p)
     {
      var out,value;
      out=Stream1.New(m(p.stream.get_Latest()),{
       $:0
      });
      value=p.stream.Subscribe(function(x)
      {
       var arg00;
       arg00=m(x);
       return out.Trigger(arg00);
      });
      return Runtime.New(Piglet1,{
       stream:out,
       view:p.view
      });
     },
     MapResultWithWriter:function(f,p)
     {
      var stream,value;
      stream=Stream1.New(Runtime.New(Result,{
       $:1,
       $0:Runtime.New(T,{
        $:0
       })
      }),{
       $:0
      });
      value=p.stream.Subscribe(f(stream));
      return Runtime.New(Piglet1,{
       stream:stream,
       view:p.view
      });
     },
     MapToAsyncResult:function(m,p)
     {
      var _arg00_;
      _arg00_=function(_arg1)
      {
       var _,x,msg;
       if(_arg1.$==0)
        {
         x=_arg1.$0;
         _=m(x);
        }
       else
        {
         msg=_arg1.$0;
         _=Concurrency.Return(Runtime.New(Result,{
          $:1,
          $0:msg
         }));
        }
       return _;
      };
      return Piglet.MapAsyncResult(_arg00_,p);
     },
     MapToResult:function(m,p)
     {
      var _arg00_;
      _arg00_=function(_arg1)
      {
       var _,x,msg;
       if(_arg1.$==0)
        {
         x=_arg1.$0;
         _=m(x);
        }
       else
        {
         msg=_arg1.$0;
         _=Runtime.New(Result,{
          $:1,
          $0:msg
         });
        }
       return _;
      };
      return Piglet.MapResult(_arg00_,p);
     },
     MapViewArgs:function(view,p)
     {
      var _arg00_;
      _arg00_=p.view;
      return Runtime.New(Piglet1,{
       stream:p.stream,
       view:function(_arg20_)
       {
        return _arg20_(_arg00_(view));
       }
      });
     },
     MapWithWriter:function(f,p)
     {
      var _f_;
      _f_=function(out)
      {
       return function(r)
       {
        var _,x,msgs;
        if(r.$==0)
         {
          x=r.$0;
          _=(f(out))(x);
         }
        else
         {
          msgs=r.$0;
          _=out.Trigger(Runtime.New(Result,{
           $:1,
           $0:msgs
          }));
         }
        return _;
       };
      };
      return Piglet.MapResultWithWriter(_f_,p);
     },
     Render:function(view,p)
     {
      return p.view.call(null,view);
     },
     Return:function(x)
     {
      return Runtime.New(Piglet1,{
       stream:Stream1.New(Runtime.New(Result,{
        $:0,
        $0:x
       }),{
        $:0
       }),
       view:function(x1)
       {
        return x1;
       }
      });
     },
     ReturnFailure:function()
     {
      return Runtime.New(Piglet1,{
       stream:Stream1.New(Runtime.New(Result,{
        $:1,
        $0:Runtime.New(T,{
         $:0
        })
       }),{
        $:0
       }),
       view:function(x)
       {
        return x;
       }
      });
     },
     Run:function(action,p)
     {
      return Piglet.RunResult(Result.Iter(action),p);
     },
     RunResult:function(action,p)
     {
      var value;
      value=p.stream.Subscribe(action);
      return p;
     },
     TransmitReader:function(p)
     {
      var v,a;
      v=p.view;
      a=p.stream;
      return Runtime.New(Piglet1,{
       stream:p.stream,
       view:function(x)
       {
        return(v(x))(a);
       }
      });
     },
     TransmitReaderMap:function(f,p)
     {
      var v,arg10,a;
      v=p.view;
      arg10=p.stream;
      a=Reader.Map(f,arg10);
      return Runtime.New(Piglet1,{
       stream:p.stream,
       view:function(x)
       {
        return(v(x))(a);
       }
      });
     },
     TransmitReaderMapResult:function(f,p)
     {
      var v,arg10,a;
      v=p.view;
      arg10=p.stream;
      a=Reader.MapResult(f,arg10);
      return Runtime.New(Piglet1,{
       stream:p.stream,
       view:function(x)
       {
        return(v(x))(a);
       }
      });
     },
     TransmitReaderMapToResult:function(f,p)
     {
      var v,arg10,a;
      v=p.view;
      arg10=p.stream;
      a=Reader.MapToResult(f,arg10);
      return Runtime.New(Piglet1,{
       stream:p.stream,
       view:function(x)
       {
        return(v(x))(a);
       }
      });
     },
     TransmitStream:function(p)
     {
      var v,a;
      v=p.view;
      a=p.stream;
      return Runtime.New(Piglet1,{
       stream:p.stream,
       view:function(x)
       {
        return(v(x))(a);
       }
      });
     },
     TransmitWriter:function(p)
     {
      var v,a;
      v=p.view;
      a=p.stream;
      return Runtime.New(Piglet1,{
       stream:p.stream,
       view:function(x)
       {
        return(v(x))(a);
       }
      });
     },
     WithSubmit:function(pin)
     {
      var submitter,v;
      submitter=Submitter.New(pin.stream,false);
      v=pin.view;
      return Runtime.New(Piglet1,{
       stream:submitter.get_Output(),
       view:function(x)
       {
        return(v(x))(submitter);
       }
      });
     },
     WithSubmitClearError:function(pin)
     {
      var submitter,v;
      submitter=Submitter.New(pin.stream,true);
      v=pin.view;
      return Runtime.New(Piglet1,{
       stream:submitter.get_Output(),
       view:function(x)
       {
        return(v(x))(submitter);
       }
      });
     },
     Yield:function(x)
     {
      var s;
      s=Stream1.New(Runtime.New(Result,{
       $:0,
       $0:x
      }),{
       $:0
      });
      return Runtime.New(Piglet1,{
       stream:s,
       view:function(f)
       {
        return f(s);
       }
      });
     },
     YieldFailure:function()
     {
      var s;
      s=Stream1.New(Runtime.New(Result,{
       $:1,
       $0:Runtime.New(T,{
        $:0
       })
      }),{
       $:0
      });
      return Runtime.New(Piglet1,{
       stream:s,
       view:function(f)
       {
        return f(s);
       }
      });
     },
     YieldOption:function(x,none)
     {
      var x1,_arg00_,_arg10_,_arg00_1;
      x1=Piglet.Yield(x);
      _arg00_=function(_arg1)
      {
       var _,s;
       if(_arg1.$==1)
        {
         s=_arg1.$0;
         _=s;
        }
       else
        {
         _=none;
        }
       return _;
      };
      _arg10_=function(x2)
      {
       return Unchecked.Equals(x2,none)?{
        $:0
       }:{
        $:1,
        $0:x2
       };
      };
      _arg00_1=function(_arg20_)
      {
       return Stream3.Map(_arg00_,_arg10_,_arg20_);
      };
      return Piglet.MapViewArgs(_arg00_1,x1);
     }
    },
    Piglet1:Runtime.Class({
     get_Stream:function()
     {
      return this.stream;
     }
    }),
    Reader:Runtime.Class({
     SubscribeImmediate:function(f)
     {
      return this.Subscribe(f);
     },
     Through:function(r)
     {
      var out,value,_this=this;
      out=Stream1.New(this.get_Latest(),{
       $:0
      });
      value=r.Subscribe(function(_arg1)
      {
       var _,msgs,matchValue,predicate,_1,_2,_l_,l,l1;
       if(_arg1.$==1)
        {
         msgs=_arg1.$0;
         predicate=function(m)
         {
          return m.get_Source()===_this.get_Id();
         };
         matchValue=[_this.get_Latest(),List.filter(predicate,msgs)];
         if(matchValue[1].$==0)
          {
           _1=out.Trigger(_this.get_Latest());
          }
         else
          {
           if(matchValue[0].$==1)
            {
             _l_=matchValue[1];
             l=matchValue[0].$0;
             _2=out.Trigger(Runtime.New(Result,{
              $:1,
              $0:List.append(l,_l_)
             }));
            }
           else
            {
             matchValue[0].$0;
             l1=matchValue[1];
             _2=out.Trigger(Runtime.New(Result,{
              $:1,
              $0:l1
             }));
            }
           _1=_2;
          }
         _=_1;
        }
       else
        {
         _=out.Trigger(_this.get_Latest());
        }
       return _;
      });
      return out;
     },
     get_Id:function()
     {
      return this.id;
     }
    },{
     Const:function(x)
     {
      return ConstReader.New(Runtime.New(Result,{
       $:0,
       $0:x
      }));
     },
     ConstResult:function(x)
     {
      return ConstReader.New(x);
     },
     Map:function(f,r)
     {
      var arg00;
      arg00=function(arg10)
      {
       return Result.Map(f,arg10);
      };
      return Reader.MapResult(arg00,r);
     },
     Map2:function(f,rb,rc)
     {
      var arg00;
      arg00=function(b)
      {
       return function(c)
       {
        return Result.Map2(f,b,c);
       };
      };
      return Reader.MapResult2(arg00,rb,rc);
     },
     MapResult:function(f,r)
     {
      var out,value;
      out=Stream1.New(f(r.get_Latest()),{
       $:0
      });
      value=r.Subscribe(function(x)
      {
       var arg00;
       arg00=f(x);
       return out.Trigger(arg00);
      });
      return out;
     },
     MapResult2:function(f,rb,rc)
     {
      var out,value,value1;
      out=Stream1.New((f(rb.get_Latest()))(rc.get_Latest()),{
       $:0
      });
      value=rb.Subscribe(function(b)
      {
       return out.Trigger((f(b))(rc.get_Latest()));
      });
      value1=rc.Subscribe(function(c)
      {
       return out.Trigger((f(rb.get_Latest()))(c));
      });
      return out;
     },
     MapToResult:function(f,r)
     {
      var arg00;
      arg00=Result.Bind(f);
      return Reader.MapResult(arg00,r);
     },
     New:function(id)
     {
      var r;
      r=Runtime.New(this,{});
      r.id=id;
      return r;
     }
    }),
    Result:Runtime.Class({
     get_isSuccess:function()
     {
      return this.$==1?false:true;
     }
    },{
     Ap:function(r1,r2)
     {
      var matchValue,_,_1,m1,m2,m,_2,m3,f,x;
      matchValue=[r1,r2];
      if(matchValue[0].$==1)
       {
        if(matchValue[1].$==1)
         {
          m1=matchValue[0].$0;
          m2=matchValue[1].$0;
          _1=Runtime.New(Result,{
           $:1,
           $0:List.append(m1,m2)
          });
         }
        else
         {
          m=matchValue[0].$0;
          _1=Runtime.New(Result,{
           $:1,
           $0:m
          });
         }
        _=_1;
       }
      else
       {
        if(matchValue[1].$==1)
         {
          m3=matchValue[1].$0;
          _2=Runtime.New(Result,{
           $:1,
           $0:m3
          });
         }
        else
         {
          f=matchValue[0].$0;
          x=matchValue[1].$0;
          _2=Runtime.New(Result,{
           $:0,
           $0:f(x)
          });
         }
        _=_2;
       }
      return _;
     },
     Bind:function(f)
     {
      return function(_arg2)
      {
       var _,m,x;
       if(_arg2.$==1)
        {
         m=_arg2.$0;
         _=Runtime.New(Result,{
          $:1,
          $0:m
         });
        }
       else
        {
         x=_arg2.$0;
         _=f(x);
        }
       return _;
      };
     },
     Failwith:function(msg)
     {
      return Runtime.New(Result,{
       $:1,
       $0:List.ofArray([ErrorMessage.New(msg,0)])
      });
     },
     Iter:function(f)
     {
      return function(_arg1)
      {
       var _,x;
       if(_arg1.$==1)
        {
         _=null;
        }
       else
        {
         x=_arg1.$0;
         _=f(x);
        }
       return _;
      };
     },
     Join:function(r)
     {
      var _,_1,x,m,m1;
      if(r.$==0)
       {
        if(r.$0.$==0)
         {
          x=r.$0.$0;
          _1=Runtime.New(Result,{
           $:0,
           $0:x
          });
         }
        else
         {
          m=r.$0.$0;
          _1=Runtime.New(Result,{
           $:1,
           $0:m
          });
         }
        _=_1;
       }
      else
       {
        m1=r.$0;
        _=Runtime.New(Result,{
         $:1,
         $0:m1
        });
       }
      return _;
     },
     Map:function(f,ra)
     {
      var _,m,x;
      if(ra.$==1)
       {
        m=ra.$0;
        _=Runtime.New(Result,{
         $:1,
         $0:m
        });
       }
      else
       {
        x=ra.$0;
        _=Runtime.New(Result,{
         $:0,
         $0:f(x)
        });
       }
      return _;
     },
     Map2:function(f,ra,rb)
     {
      var matchValue,_,_1,ma,mb,m,_2,m1,a,b;
      matchValue=[ra,rb];
      if(matchValue[0].$==1)
       {
        if(matchValue[1].$==1)
         {
          ma=matchValue[0].$0;
          mb=matchValue[1].$0;
          _1=Runtime.New(Result,{
           $:1,
           $0:List.append(ma,mb)
          });
         }
        else
         {
          m=matchValue[0].$0;
          _1=Runtime.New(Result,{
           $:1,
           $0:m
          });
         }
        _=_1;
       }
      else
       {
        if(matchValue[1].$==1)
         {
          m1=matchValue[1].$0;
          _2=Runtime.New(Result,{
           $:1,
           $0:m1
          });
         }
        else
         {
          a=matchValue[0].$0;
          b=matchValue[1].$0;
          _2=Runtime.New(Result,{
           $:0,
           $0:(f(a))(b)
          });
         }
        _=_2;
       }
      return _;
     }
    }),
    Stream:{
     Ap:function(sf,sx)
     {
      var out,value,value1;
      out=Stream1.New(Result.Ap(sf.get_Latest(),sx.get_Latest()),{
       $:0
      });
      value=sf.Subscribe(function(f)
      {
       return out.Trigger(Result.Ap(f,sx.get_Latest()));
      });
      value1=sx.Subscribe(function(x)
      {
       return out.Trigger(Result.Ap(sf.get_Latest(),x));
      });
      return out;
     },
     ApJoin:function(sf,sx)
     {
      var out,value,value1;
      out=Stream1.New(Result.Ap(sf.get_Latest(),Result.Join(sx.get_Latest())),{
       $:0
      });
      value=sf.Subscribe(function(f)
      {
       return out.Trigger(Result.Ap(f,Result.Join(sx.get_Latest())));
      });
      value1=sx.Subscribe(function(x)
      {
       return out.Trigger(Result.Ap(sf.get_Latest(),Result.Join(x)));
      });
      return out;
     },
     Map:function(a2b,b2a,s)
     {
      var _s_,arg10,pa,pb,value,value1;
      arg10=s.get_Latest();
      _s_=Stream1.New(Result.Map(a2b,arg10),{
       $:1,
       $0:s.get_Id()
      });
      pa=[s.get_Latest()];
      pb=[_s_.get_Latest()];
      value=s.Subscribe(function(a)
      {
       var _;
       if(pa[0]!==a)
        {
         pb[0]=Result.Map(a2b,a);
         _=_s_.Trigger(pb[0]);
        }
       else
        {
         _=null;
        }
       return _;
      });
      value1=_s_.Subscribe(function(b)
      {
       var _;
       if(pb[0]!==b)
        {
         pa[0]=Result.Map(b2a,b);
         _=s.Trigger(pa[0]);
        }
       else
        {
         _=null;
        }
       return _;
      });
      return _s_;
     }
    },
    Stream1:Runtime.Class({
     Subscribe:function(f)
     {
      return Util.subscribeTo(this.s,f);
     },
     Trigger:function(x)
     {
      return this.s.Trigger(x);
     },
     Trigger1:function(x)
     {
      return this.Trigger(x);
     },
     Write:function(x)
     {
      var _this=this;
      return ConcreteWriter.New(function(_arg1)
      {
       var _,m;
       if(_arg1.$==0)
        {
         _=_this.Trigger(Runtime.New(Result,{
          $:0,
          $0:x
         }));
        }
       else
        {
         m=_arg1.$0;
         _=_this.Trigger(Runtime.New(Result,{
          $:1,
          $0:m
         }));
        }
       return _;
      });
     },
     get_Latest:function()
     {
      return this.s.Latest[0].$0;
     }
    },{
     New:function(init,id)
     {
      return Runtime.New(this,Stream1.New1(HotStream.New(init),id));
     },
     New1:function(s,id)
     {
      var r,_,id1;
      if(id.$==0)
       {
        _=(Id.next())(null);
       }
      else
       {
        id1=id.$0;
        _=id1;
       }
      r=Runtime.New(this,Reader.New(_));
      r.s=s;
      return r;
     }
    }),
    Submitter:Runtime.Class({
     Subscribe:function(f)
     {
      return this.output.Subscribe(f);
     },
     Trigger:function()
     {
      return this.writer.Trigger(Runtime.New(Result,{
       $:0,
       $0:null
      }));
     },
     Trigger1:function(x)
     {
      return this.writer.Trigger(x);
     },
     get_Input:function()
     {
      return this.input;
     },
     get_Latest:function()
     {
      return this.output.get_Latest();
     },
     get_Output:function()
     {
      return this.output;
     }
    },{
     New:function(input,clearError)
     {
      var r,_3,value;
      r=Runtime.New(this,Reader.New((Id.next())(null)));
      r.input=input;
      r.output=Stream1.New(Runtime.New(Result,{
       $:1,
       $0:Runtime.New(T,{
        $:0
       })
      }),{
       $:0
      });
      r.writer=ConcreteWriter.New(function(unitIn)
      {
       var matchValue,_,_1,x,m,_2,m1,m11,m2;
       matchValue=[unitIn,r.input.get_Latest()];
       if(matchValue[0].$==0)
        {
         if(matchValue[1].$==0)
          {
           x=matchValue[1].$0;
           _1=r.output.Trigger(Runtime.New(Result,{
            $:0,
            $0:x
           }));
          }
         else
          {
           m=matchValue[1].$0;
           _1=r.output.Trigger(Runtime.New(Result,{
            $:1,
            $0:m
           }));
          }
         _=_1;
        }
       else
        {
         if(matchValue[1].$==0)
          {
           m1=matchValue[0].$0;
           _2=r.output.Trigger(Runtime.New(Result,{
            $:1,
            $0:m1
           }));
          }
         else
          {
           m11=matchValue[0].$0;
           m2=matchValue[1].$0;
           _2=r.output.Trigger(Runtime.New(Result,{
            $:1,
            $0:List.append(m11,m2)
           }));
          }
         _=_2;
        }
       return _;
      });
      if(clearError)
       {
        value=r.input.Subscribe(function()
        {
         var matchValue;
         matchValue=r.output.get_Latest();
         return matchValue.$==1?matchValue.$0.$==0?null:r.output.Trigger(Runtime.New(Result,{
          $:1,
          $0:Runtime.New(T,{
           $:0
          })
         })):r.output.Trigger(Runtime.New(Result,{
          $:1,
          $0:Runtime.New(T,{
           $:0
          })
         }));
        });
        _3=void value;
       }
      else
       {
        _3=null;
       }
      return r;
     }
    }),
    Validation:{
     Is:function(pred,msg,p)
     {
      var _s_,value;
      _s_=Stream1.New(p.stream.get_Latest(),{
       $:1,
       $0:p.stream.get_Id()
      });
      value=p.stream.Subscribe(function(_arg1)
      {
       var _,x,_1,x1,m;
       if(_arg1.$==0)
        {
         x=_arg1.$0;
         if(pred(x))
          {
           x1=_arg1.$0;
           _1=_s_.Trigger(Runtime.New(Result,{
            $:0,
            $0:x1
           }));
          }
         else
          {
           _1=_s_.Trigger(Runtime.New(Result,{
            $:1,
            $0:List.ofArray([ErrorMessage.New(msg,_s_.get_Id())])
           }));
          }
         _=_1;
        }
       else
        {
         m=_arg1.$0;
         _=_s_.Trigger(Runtime.New(Result,{
          $:1,
          $0:m
         }));
        }
       return _;
      });
      return Runtime.New(Piglet1,{
       stream:_s_,
       view:p.view
      });
     },
     "Is'":function(pred,msg,p)
     {
      var _s_,value;
      _s_=Stream1.New(p.stream.get_Latest(),{
       $:1,
       $0:p.stream.get_Id()
      });
      value=p.stream.Subscribe(function(_arg1)
      {
       var _,x,_1,x1,m;
       if(_arg1.$==0)
        {
         x=_arg1.$0;
         if(pred(x))
          {
           x1=_arg1.$0;
           _1=_s_.Trigger(Runtime.New(Result,{
            $:0,
            $0:x1
           }));
          }
         else
          {
           _1=_s_.Trigger(Runtime.New(Result,{
            $:1,
            $0:List.ofArray([msg])
           }));
          }
         _=_1;
        }
       else
        {
         m=_arg1.$0;
         _=_s_.Trigger(Runtime.New(Result,{
          $:1,
          $0:m
         }));
        }
       return _;
      });
      return Runtime.New(Piglet1,{
       stream:_s_,
       view:p.view
      });
     },
     IsMatch:function(re,msg,p)
     {
      return Validation.Is(Validation.Match(re),msg,p);
     },
     IsNotEmpty:function(msg,p)
     {
      return Validation.Is(function(value)
      {
       return Validation.NotEmpty(value);
      },msg,p);
     },
     Match:function(re)
     {
      var objectArg;
      objectArg=new RegExp(re);
      return function(arg00)
      {
       return objectArg.test(arg00);
      };
     },
     NotEmpty:function(x)
     {
      return x!=="";
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  Piglets=Runtime.Safe(Global.WebSharper.Piglets);
  Choose=Runtime.Safe(Piglets.Choose);
  Stream=Runtime.Safe(Choose.Stream);
  Reader=Runtime.Safe(Piglets.Reader);
  Collections=Runtime.Safe(Global.WebSharper.Collections);
  Dictionary=Runtime.Safe(Collections.Dictionary);
  List=Runtime.Safe(Global.WebSharper.List);
  T=Runtime.Safe(List.T);
  Enumerator=Runtime.Safe(Global.WebSharper.Enumerator);
  Operators=Runtime.Safe(Global.WebSharper.Operators);
  Seq=Runtime.Safe(Global.WebSharper.Seq);
  Stream1=Runtime.Safe(Piglets.Stream1);
  Result=Runtime.Safe(Piglets.Result);
  ConcreteReader=Runtime.Safe(Piglets.ConcreteReader);
  Id=Runtime.Safe(Piglets.Id);
  ConcreteWriter=Runtime.Safe(Piglets.ConcreteWriter);
  ConstReader=Runtime.Safe(Piglets.ConstReader);
  Disposable=Runtime.Safe(Piglets.Disposable);
  Html=Runtime.Safe(Global.WebSharper.Html);
  Client=Runtime.Safe(Html.Client);
  Operators1=Runtime.Safe(Client.Operators);
  Tags=Runtime.Safe(Client.Tags);
  EventsPervasives=Runtime.Safe(Client.EventsPervasives);
  Controls=Runtime.Safe(Piglets.Controls);
  Attr=Runtime.Safe(Client.Attr);
  Unchecked=Runtime.Safe(Global.WebSharper.Unchecked);
  jQuery=Runtime.Safe(Global.jQuery);
  HtmlContainer=Runtime.Safe(Controls.HtmlContainer);
  Arrays=Runtime.Safe(Global.WebSharper.Arrays);
  Ref=Runtime.Safe(Global.WebSharper.Ref);
  ErrorMessage=Runtime.Safe(Piglets.ErrorMessage);
  Many=Runtime.Safe(Piglets.Many);
  Stream2=Runtime.Safe(Many.Stream);
  Submitter=Runtime.Safe(Piglets.Submitter);
  Operations=Runtime.Safe(Many.Operations);
  ResizeArray=Runtime.Safe(Collections.ResizeArray);
  ResizeArrayProxy=Runtime.Safe(ResizeArray.ResizeArrayProxy);
  UnitStream=Runtime.Safe(Many.UnitStream);
  Concurrency=Runtime.Safe(Global.WebSharper.Concurrency);
  Pervasives=Runtime.Safe(Piglets.Pervasives);
  Piglet1=Runtime.Safe(Piglets.Piglet1);
  Stream3=Runtime.Safe(Piglets.Stream);
  Piglet=Runtime.Safe(Piglets.Piglet);
  Validation=Runtime.Safe(Piglets.Validation);
  Util=Runtime.Safe(Global.WebSharper.Util);
  IntelliFactory=Runtime.Safe(Global.IntelliFactory);
  Reactive=Runtime.Safe(IntelliFactory.Reactive);
  HotStream=Runtime.Safe(Reactive.HotStream);
  return RegExp=Runtime.Safe(Global.RegExp);
 });
 Runtime.OnLoad(function()
 {
  Runtime.Inherit(Stream,Reader);
  Runtime.Inherit(ConcreteReader,Reader);
  Runtime.Inherit(ConstReader,Reader);
  Runtime.Inherit(Stream2,Reader);
  Runtime.Inherit(Stream2,Reader);
  Runtime.Inherit(UnitStream,Stream2);
  Runtime.Inherit(Stream1,Reader);
  Runtime.Inherit(Submitter,Reader);
  Id.next();
  Controls.nextId();
  return;
 });
}());
