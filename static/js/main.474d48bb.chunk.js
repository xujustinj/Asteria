(this.webpackJsonpasteria=this.webpackJsonpasteria||[]).push([[0],{27:function(e,t,n){e.exports=n(42)},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(23),u=n.n(i),l=n(16),s=n(11),c=(n(32),n(33),n(34),n(35),n(1)),o=n(2),h=n(5),v=n(3),f=n(4),d=n(12),m=n(17),y=function(e){function t(e){var n;Object(c.a)(this,t),(n=Object(h.a)(this,Object(v.a)(t).call(this,e))).net=void 0,n.state=void 0,n.net=e.network;var a=n.net.inputLayer().binding(),r=!0,i=!1,u=void 0;try{for(var l,s=a[Symbol.iterator]();!(r=(l=s.next()).done);r=!0){var o=l.value,f=Object(m.a)(o,1)[0];a.set(f,0)}}catch(d){i=!0,u=d}finally{try{r||null==s.return||s.return()}finally{if(i)throw u}}return n.state={inputs:a,outputs:n.net.output(a)},n}return Object(f.a)(t,e),Object(o.a)(t,[{key:"handleInput",value:function(e){var t=e.target,n=t.name,a=t.value,r=this.state.inputs;r.set(n,a),this.setState({inputs:r,outputs:this.net.output(r)})}},{key:"render",value:function(){var e=[],t=!0,n=!1,a=void 0;try{for(var i,u=this.state.inputs[Symbol.iterator]();!(t=(i=u.next()).done);t=!0){var l=i.value,s=Object(m.a)(l,2),c=s[0],o=s[1];e.push(r.a.createElement("div",{key:"input-"+c},r.a.createElement("label",null,c,"="),r.a.createElement("input",{type:"number",name:c,value:o,onChange:this.handleInput.bind(this)})))}}catch(j){n=!0,a=j}finally{try{t||null==u.return||u.return()}finally{if(n)throw a}}var h=[],v=!0,f=!1,d=void 0;try{for(var y,p=this.state.outputs[Symbol.iterator]();!(v=(y=p.next()).done);v=!0){var b=y.value,w=Object(m.a)(b,2),k=w[0],O=w[1];h.push(r.a.createElement("div",{key:"output-"+k},r.a.createElement("label",null,k,"="),r.a.createElement("input",{readOnly:!0,type:"number",name:k,value:O})))}}catch(j){f=!0,d=j}finally{try{v||null==p.return||p.return()}finally{if(f)throw d}}return r.a.createElement("form",{className:"Test"},r.a.createElement("h3",null,"Inputs"),e,r.a.createElement("h3",null,"Outputs"),h)}}]),t}(a.Component),p=n(24),b=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(h.a)(this,Object(v.a)(t).call(this,e))).state=void 0,n.state={samples:1,sensitivity:1,friction:1,generations:1},n}return Object(f.a)(t,e),Object(o.a)(t,[{key:"handleChange",value:function(e){var t=e.target,n=t.name,a=t.value;this.setState(Object(p.a)({},n,a))}},{key:"submitForm",value:function(){var e=this.state,t=e.samples,n=e.sensitivity,a=e.friction,r=e.generations;this.props.onTrain(t,n,a,r)}},{key:"render",value:function(){var e=this.state,t=e.samples,n=e.sensitivity,a=e.friction,i=e.generations;return r.a.createElement("form",{className:"Train"},r.a.createElement("label",null,"Samples"),r.a.createElement("input",{type:"number",name:"samples",value:isFinite(t)?t:"",min:"1",onChange:this.handleChange.bind(this)}),r.a.createElement("br",null),r.a.createElement("label",null,"Sensitivity"),r.a.createElement("input",{type:"number",name:"sensitivity",value:isFinite(n)?n:"",onChange:this.handleChange.bind(this)}),r.a.createElement("br",null),r.a.createElement("label",null,"Friction"),r.a.createElement("input",{type:"number",name:"friction",value:isFinite(a)?a:"",onChange:this.handleChange.bind(this)}),r.a.createElement("br",null),r.a.createElement("label",null,"Generations"),r.a.createElement("input",{type:"number",name:"generations",value:isFinite(i)?i:"",min:"0",onChange:this.handleChange.bind(this)}),r.a.createElement("br",null),r.a.createElement("input",{type:"button",value:"Train",onClick:this.submitForm.bind(this)}))}}]),t}(a.Component);function w(e){return r.a.createElement("thead",null,r.a.createElement("tr",{key:"header"},e.names.map((function(e){return r.a.createElement("th",{key:"header-"+e},e)}))))}function k(e){var t=e.rows.map((function(t){return r.a.createElement("tr",{key:t.key},e.names.map((function(e){return r.a.createElement("td",{key:t.key+"-"+e},t.values.get(e))})))}));return r.a.createElement("tbody",null,t)}var O=function(e){var t=e.rows,n=Array.from(t[0].values.keys());return r.a.createElement("table",null,r.a.createElement(w,{names:n}),r.a.createElement(k,{names:n,rows:t}))},j="G",g=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(h.a)(this,Object(v.a)(t).call(this,e))).state=void 0,n.state={rows:[n.makeRow(0)],input:0},n}return Object(f.a)(t,e),Object(o.a)(t,[{key:"makeRow",value:function(e){return{key:e,values:new Map([[j,e]].concat(Object(d.a)(this.makeRowExtras()),[["R",this.net().r()]]))}}},{key:"makeRowExtras",value:function(){return new Map}},{key:"onTrain",value:function(e,t,n,a){for(var r=0;r<a;++r){this.net().study(e),this.net().learn(t,n);var i=this.state.rows;i.unshift(this.makeRow(i.length)),this.setState({rows:i})}}},{key:"Testing",value:function(){var e=this.TestingContents.bind(this);return r.a.createElement("div",null,r.a.createElement("h2",null,"Testing"),r.a.createElement(e,null),r.a.createElement(y,{network:this.net()}))}},{key:"TestingContents",value:function(){return r.a.createElement("div",null)}},{key:"Training",value:function(){var e=this.state.rows,t=this.TrainingContents.bind(this);return r.a.createElement("div",null,r.a.createElement("h2",null,"Training"),r.a.createElement(t,null),r.a.createElement(b,{onTrain:this.onTrain.bind(this)}),r.a.createElement(O,{rows:e}))}},{key:"TrainingContents",value:function(){return r.a.createElement("div",null)}},{key:"render",value:function(){var e=this.Testing.bind(this),t=this.Training.bind(this);return r.a.createElement("div",{className:"Asteria42"},r.a.createElement(e,null),r.a.createElement(t,null))}}]),t}(a.Component),E=n(10),_=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;Object(c.a)(this,e),this.entries=void 0,this.size=void 0,this.entries=t,this.size=void 0===n?this.entries.length:n}return Object(o.a)(e,[{key:"get",value:function(e,t){return this.entries[e][t]}},{key:"row",value:function(e){return this.entries[e]}},{key:"col",value:function(e){return this.entries[e]}},{key:"rows",value:function(){return this.entries}},{key:"cols",value:function(){return this.entries}},{key:"height",value:function(){return this.size}},{key:"width",value:function(){return this.size}},{key:"transpose",value:function(){return this}},{key:"add",value:function(e){this.entries.forEach((function(t,n){var a=e[n];t.forEach((function(e,t){return e+a[t]}))}))}},{key:"sub",value:function(e){this.entries.forEach((function(t,n){var a=e[n];t.forEach((function(e,t){return e-a[t]}))}))}},{key:"print",value:function(){return this.entries.map((function(e){return e.join()})).join("\n")}}]),e}(),A=function(){function e(t){var n=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0;if(Object(c.a)(this,e),this.entries=void 0,this.h=void 0,this.w=void 0,this.t=void 0,this.entries=t,this.h=void 0===a?t.length:a,this.w=void 0===r?t[0].length:r,i)this.t=i;else{this.t=new Array(this.w);for(var u=function(e){n.t[e]=n.entries.map((function(t){return t[e]}))},l=0;l<this.w;++l)u(l)}}return Object(o.a)(e,[{key:"get",value:function(e,t){return this.entries[e][t]}},{key:"row",value:function(e){return this.entries[e]}},{key:"col",value:function(e){return this.t[e]}},{key:"rows",value:function(){return this.entries}},{key:"cols",value:function(){return this.t}},{key:"height",value:function(){return this.h}},{key:"width",value:function(){return this.w}},{key:"transpose",value:function(){return new e(this.t,this.w,this.h,this.entries)}},{key:"add",value:function(e){var t=this;this.entries.forEach((function(n,a){for(var r=e[a],i=0;i<t.w;++i){var u=r[i];n[i]+=u,t.t[i][a]+=u}}))}},{key:"sub",value:function(e){var t=this;this.entries.forEach((function(n,a){for(var r=e[a],i=0;i<t.w;++i){var u=r[i];n[i]-=u,t.t[i][a]-=u}}))}},{key:"print",value:function(){return this.entries.map((function(e){return e.join()})).join("\n")}}]),e}();var x=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=new Array(e),a=0;a<e;++a)n[a]=new Array(e).fill(0),n[a][a]=t;return new _(n,e)};function L(e,t){return e.reduce((function(e,n,a){return e+n*t[a]}),0)}function M(e,t){return new A(e.rows().map((function(e){return t.cols().map((function(t){return L(e,t)}))})),e.height(),t.width())}function T(e){for(var t=new Array(e),n=0;n<e;++n)t[n]=new Array(e).fill(0),t[n][n]=1;for(var a=t,r=arguments.length,i=new Array(r>1?r-1:0),u=1;u<r;u++)i[u-1]=arguments[u];for(var l=0,s=i;l<s.length;l++){var c=s[l],o=c.x,h=c.y;if(o<e&&h<e){var v=2*Math.random()-1,f=Math.sqrt(1-v*v);t[o][o]=v,t[h][h]=v,Math.random()<.5?(t[o][h]=f,t[h][o]=-f,a[o][h]=-f,a[h][o]=f):(t[o][h]=-f,t[h][o]=f,a[o][h]=f,a[h][o]=-f)}}return new A(t,e,e,a)}function N(e){for(var t=e.height(),n=t%2===0?t:t+1,a=n/2,r=[],i=[],u=n-1,l=[],s=1;s<a;++s)r.push(s),i.push(u-s);for(var c=0;c<=n-2;++c){l[c]=[{x:0,y:u}];for(var o=0;o<r.length;++o)l[c].push({x:r[o],y:i[o]});r.unshift(u),i.push(r.pop()),u=i.shift()}return l.map((function(e){return T.apply(void 0,[t].concat(Object(d.a)(e)))})).reduceRight(M,e)}function S(e,t){return new Array(e).fill(t)}var C=function(){function e(t){Object(c.a)(this,e),this.width=void 0,this.width=t}return Object(o.a)(e,[{key:"print",value:function(){return""}},{key:"study",value:function(e){}},{key:"learn",value:function(e,t){}},{key:"reset",value:function(){}}]),e}(),R=function(e){function t(){var e;Object(c.a)(this,t);for(var n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(e=Object(h.a)(this,Object(v.a)(t).call(this,a.length)))._names=void 0,e._value=void 0,e._names=a,e._value=new Array(e.width).fill(0),e}return Object(f.a)(t,e),Object(o.a)(t,[{key:"value",value:function(){return this._value}},{key:"print",value:function(){var e=this;return this._names.reduce((function(t,n,a){return t+"\n\t"+n+": "+e._value[a]}),"[")+"\n]"}},{key:"bind",value:function(e){for(var t=0;t<this.width;++t)e.has(this._names[t])&&(this._value[t]=e.get(this._names[t]))}},{key:"binding",value:function(){for(var e=new Map,t=0;t<this.width;++t)e.set(this._names[t],this._value[t]);return e}},{key:"input",value:function(){return this.binding()}}]),t}(C),F=function(e){function t(e,n){var a;return Object(c.a)(this,t),(a=Object(h.a)(this,Object(v.a)(t).call(this,n))).prev=void 0,a.w=void 0,a.vw=void 0,a.aw=[],a.b=void 0,a.vb=void 0,a.ab=[],a._preAF=null,a._value=null,a.prev=e,a.w=new A(function(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,a=x(e,n),r=[];r.length<t;)r=r.concat(N(a).cols());return r.slice(0,t)}(e.width,n),n,e.width),a.vw=function(e,t,n){for(var a=[];a.length<e;)a.push(S(t,n));return a}(n,e.width,0),a.b=S(n,0),a.vb=S(n,0),a}return Object(f.a)(t,e),Object(o.a)(t,[{key:"preAF",value:function(){var e,t,n;return null===this._preAF&&(this._preAF=(e=this.w,t=this.prev.value(),n=this.b,e.rows().map((function(e,a){return e.reduce((function(e,n,a){return e+n*t[a]}),n[a])})))),this._preAF}},{key:"value",value:function(){var e=this;return null===this._value&&(this._value=this.preAF().map((function(t){return e.actValue(t)}))),this._value}},{key:"print",value:function(){var e=this;return this.w.rows().reduce((function(t,n,a){return t+"\n\t"+n.join()+"; "+e.b[a]}),"[")+"\n]"}},{key:"study",value:function(e){var t,n,a=this,r=this.preAF(),i=e.map((function(e,t){return e*a.actDeriv(r[t])}));this.aw.push((t=i,n=this.prev.value(),t.map((function(e){return n.map((function(t){return t*e}))})))),this.ab.push(i),this.prev.study(function(e,t){return e.cols().map((function(e){return L(e,t)}))}(this.w,i))}},{key:"learn",value:function(e,t){for(var n=this,a=this.aw.length,r=function(r){for(var i=function(i){n.vw[r][i]=(1-t)*n.vw[r][i]+e*n.aw.reduce((function(e,t){return e+t[r][i]}),0)/a},u=0;u<n.prev.width;++u)i(u);n.vb[r]=(1-t)*n.vb[r]+e*n.ab.reduce((function(e,t){return e+t[r]}),0)/a,n.b[r]+=n.vb[r]},i=0;i<this.width;++i)r(i);this.w.add(this.vw),this.prev.learn(e,t),this.aw=[],this.ab=[]}},{key:"reset",value:function(){this._preAF=null,this._value=null,this.prev.reset()}}]),t}(C),D=function(e){function t(){return Object(c.a)(this,t),Object(h.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(o.a)(t,[{key:"weight",value:function(e,t){return this.w.get(t,e)}},{key:"bias",value:function(e){return this.b[e]}}]),t}(F),I=function(e){function t(e){var n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a>1?a-1:0),i=1;i<a;i++)r[i-1]=arguments[i];return(n=Object(h.a)(this,Object(v.a)(t).call(this,e,r.length)))._names=void 0,n._expec=void 0,n._names=r,n._expec=new Array(n.width).fill(0),n}return Object(f.a)(t,e),Object(o.a)(t,[{key:"print",value:function(){var e=this;return this.w.rows().reduce((function(t,n,a){return t+"\n\t"+n.join()+"; "+e.b[a]}),"[")+"\n]"}},{key:"studyBindings",value:function(){var e=this;this.study(this.value().map((function(t,n){return e._expec[n]-t})))}},{key:"error",value:function(){var e=this;return this.value().reduce((function(t,n,a){var r=e._expec[a]-n;return t+r*r}),0)}},{key:"bind",value:function(e){for(var t=0;t<this.width;++t)e.has(this._names[t])&&(this._expec[t]=e.get(this._names[t]))}},{key:"binding",value:function(){for(var e=new Map,t=0;t<this.width;++t)e.set(this._names[t],this._expec[t]);return e}},{key:"output",value:function(){for(var e=this.value(),t=new Map,n=0;n<this.width;++n)t.set(this._names[n],e[n]);return t}},{key:"weight",value:function(e,t){return this.w.get(this._names.indexOf(t),e)}},{key:"bias",value:function(e){return this.b[this._names.indexOf(e)]}}]),t}(F),z=function(){function e(){Object(c.a)(this,e),this._inputLayer=void 0,this._hiddenLayers=void 0,this._outputLayer=void 0,this.studied=void 0,this.studied=[];var t=this.source(1)[0],n=t.input,a=t.output,r=Array.from(n.keys()),i=Array.from(a.keys());this._inputLayer=Object(E.a)(R,Object(d.a)(r)),this._hiddenLayers=[];var u=this._inputLayer,l=!0,s=!1,o=void 0;try{for(var h,v=this.hiddenSizes()[Symbol.iterator]();!(l=(h=v.next()).done);l=!0){var f=h.value;this._hiddenLayers.push(this.makeHiddenLayer(u,f)),u=this._hiddenLayers[this._hiddenLayers.length-1]}}catch(m){s=!0,o=m}finally{try{l||null==v.return||v.return()}finally{if(s)throw o}}this._outputLayer=this.makeOutputLayer.apply(this,[u].concat(Object(d.a)(i)))}return Object(o.a)(e,[{key:"print",value:function(){return this._hiddenLayers.map((function(e){return e.print()})).join("\n")+"\n"+this._outputLayer.print()}},{key:"inputLayer",value:function(){return this._inputLayer}},{key:"hiddenLayer",value:function(e){return this._hiddenLayers[e]}},{key:"outputLayer",value:function(){return this._outputLayer}},{key:"error",value:function(){return this._outputLayer.error()}},{key:"avgErr",value:function(){return this.studied.reduce((function(e,t){return e+t.err}),0)/this.studied.length}},{key:"bind",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.reset(),this._inputLayer.bind(e),null!==t&&this._outputLayer.bind(t)}},{key:"output",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null!==e&&this.bind(e),this._outputLayer.output()}},{key:"study",value:function(e){var t=this;this.studied=this.source(e).map((function(e){return t.bind(e.input,e.output),t._outputLayer.studyBindings(),{sample:e,err:t._outputLayer.error()}}))}},{key:"learn",value:function(e,t){this._outputLayer.learn(e,t)}},{key:"reset",value:function(){this._outputLayer.reset()}}]),e}(),H=function(e){function t(){return Object(c.a)(this,t),Object(h.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(o.a)(t,[{key:"rsq",value:function(){var e=this,t=this.tests();return t.reduce((function(t,n){var a=n.input,r=n.output;return e.bind(a,r),t+e.error()}),0)/t.length}},{key:"r",value:function(){return Math.sqrt(this.rsq())}}]),t}(z);function B(e){return isFinite(e)&&e>0?e:Number.MIN_VALUE}var V=function(){function e(){Object(c.a)(this,e)}return Object(o.a)(e,null,[{key:"value",value:function(e){return B(1/(1+Math.exp(-e)))}},{key:"deriv",value:function(e){return B(1/(Math.exp(e)+2+Math.exp(-e)))}}]),e}(),W=function(e){function t(){return Object(c.a)(this,t),Object(h.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(o.a)(t,[{key:"actValue",value:function(e){return V.value(e)}},{key:"actDeriv",value:function(e){return V.deriv(e)}}]),t}(D),J=function(e){function t(){return Object(c.a)(this,t),Object(h.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(o.a)(t,[{key:"actValue",value:function(e){return V.value(e)}},{key:"actDeriv",value:function(e){return V.deriv(e)}}]),t}(I),q=function(){function e(){Object(c.a)(this,e)}return Object(o.a)(e,null,[{key:"value",value:function(e){var t=1+Math.exp(e);return isFinite(t)?B(Math.log(t)):e}},{key:"deriv",value:function(e){return B(1/(1+Math.exp(-e)))}}]),e}(),G=function(e){function t(){return Object(c.a)(this,t),Object(h.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(o.a)(t,[{key:"actValue",value:function(e){return q.value(e)}},{key:"actDeriv",value:function(e){return q.deriv(e)}}]),t}(D),U=function(e){function t(){return Object(c.a)(this,t),Object(h.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(o.a)(t,[{key:"actValue",value:function(e){return q.value(e)}},{key:"actDeriv",value:function(e){return q.deriv(e)}}]),t}(I),X=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(h.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).cachedTests=[{input:new Map([["x",0]]),output:new Map([["y",42]])},{input:new Map([["x",1]]),output:new Map([["y",42]])}],n}return Object(f.a)(t,e),Object(o.a)(t,[{key:"source",value:function(e){this.studied.sort((function(e,t){return t.err-e.err}));for(var t=this.studied.slice(0,e/2).map((function(e){return e.sample})),n=t.length;n<e;++n)t.push({input:new Map([["x",Math.random()]]),output:new Map([["y",42]])});return t}},{key:"hiddenSizes",value:function(){return[]}},{key:"makeHiddenLayer",value:function(e,t){return new G(e,t)}},{key:"makeOutputLayer",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];return Object(E.a)(U,[e].concat(n))}},{key:"tests",value:function(){return this.cachedTests}},{key:"m",value:function(){return this.outputLayer().weight(0,"y")}},{key:"b",value:function(){return this.outputLayer().bias("y")}},{key:"value",value:function(e){return this.output(new Map([["x",e]])).get("y")}}]),t}(H),P=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(h.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r))))._net=void 0,n}return Object(f.a)(t,e),Object(o.a)(t,[{key:"net",value:function(){return this._net||(this._net=new X),this._net}},{key:"makeRowExtras",value:function(){return new Map([["m",this.net().m()],["b",this.net().b()]])}},{key:"TestingContents",value:function(){return r.a.createElement("p",null,"Asteria should output 42 no matter what input we give her.")}},{key:"TrainingContents",value:function(){return r.a.createElement("p",null,"We want Asteria to reach y=42~ReLU(42), where m=0 and b~42.",r.a.createElement("br",null),"To adjust m and b, Asteria samples values of x between 0 to 1 and does fancy backpropagation.")}}]),t}(g),Q=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(h.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).cachedTests=function(){for(var e=[],t=0;t<=1;t+=.1)for(var n=0;n<=1;n+=.1){var a=t>.5===n>.5?0:1;e.push({input:new Map([["x",t],["y",n]]),output:new Map([["xXORy",a]])})}return e}(),n}return Object(f.a)(t,e),Object(o.a)(t,[{key:"source",value:function(e){this.studied.sort((function(e,t){return t.err-e.err}));for(var t=e/4,n=this.studied.slice(t,2*t).map((function(e){return e.sample})),a=0;a<e;++a){var r=Math.random(),i=Math.random(),u=r>.5===i>.5?0:1;n.push({input:new Map([["x",r],["y",i]]),output:new Map([["xXORy",u]])})}return n}},{key:"hiddenSizes",value:function(){return[2,4,4]}},{key:"makeHiddenLayer",value:function(e,t){return new W(e,t)}},{key:"makeOutputLayer",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];return Object(E.a)(J,[e].concat(n))}},{key:"tests",value:function(){return this.cachedTests}},{key:"value",value:function(e,t){return this.output(new Map([["x",e],["y",t]])).get("xXORy")}}]),t}(H),Z=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(h.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r))))._net=void 0,n}return Object(f.a)(t,e),Object(o.a)(t,[{key:"net",value:function(){return this._net||(this._net=new Q),this._net}}]),t}(g),K=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(h.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).cachedTests=function(){for(var e=[],t=0;t<=1;t+=.1)for(var n=0;n<=1;n+=.1){var a=t>.5&&n>.5?0:1;e.push({input:new Map([["x",t],["y",n]]),output:new Map([["xNANDy",a]])})}return e}(),n}return Object(f.a)(t,e),Object(o.a)(t,[{key:"source",value:function(e){this.studied.sort((function(e,t){return t.err-e.err}));for(var t=e/4,n=this.studied.slice(t,2*t).map((function(e){return e.sample})),a=n.length;a<e;++a){var r=Math.random(),i=Math.random(),u=r>.5&&i>.5?0:1;n.push({input:new Map([["x",r],["y",i]]),output:new Map([["xNANDy",u]])})}return n}},{key:"hiddenSizes",value:function(){return[2]}},{key:"makeHiddenLayer",value:function(e,t){return new W(e,t)}},{key:"makeOutputLayer",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];return Object(E.a)(J,[e].concat(n))}},{key:"tests",value:function(){return this.cachedTests}},{key:"value",value:function(e,t){return this.output(new Map([["x",e],["y",t]])).get("xNANDy")}}]),t}(H),Y=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(h.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r))))._net=void 0,n}return Object(f.a)(t,e),Object(o.a)(t,[{key:"net",value:function(){return this._net||(this._net=new K),this._net}}]),t}(g),$=[{name:"Home",heading:function(){return r.a.createElement("h1",{className:"heading"},"Welcome")},path:"/Asteria/",inSidebar:!1,main:function(){return r.a.createElement(ee,null)}},{name:"The Answer",path:"/Asteria/42",inSidebar:!0,heading:function(){return r.a.createElement("h1",{className:"heading"},"The Answer")},main:function(){return r.a.createElement(P,null)}},{name:"NAND Logic",path:"/Asteria/NAND",inSidebar:!0,heading:function(){return r.a.createElement("h1",{className:"heading"},"NAND Logic")},main:function(){return r.a.createElement(Y,null)}},{name:"Exclusive OR",path:"/Asteria/XOR",inSidebar:!0,heading:function(){return r.a.createElement("h2",{className:"heading adventure-on-hover"},"Exclusive OR")},main:function(){return r.a.createElement(Z,null)}}];function ee(){return r.a.createElement("div",null,r.a.createElement("h3",null,"What"),r.a.createElement("p",null,"Asteria is the product of a ongoing adventure into the world of machine learning. The goal: to have a tool that can identify and translate ",r.a.createElement("a",{href:"https://madeon.fandom.com/wiki/Adventure_alphabet"},"Madeon's Adventure alphabet")," on the fly (hence the name Asteria). By no means is Asteria anywhere near that goal, nor am I making a direct beeline for it. I'm taking a winding path that will hopefully maximize the amount I can learn from this project."),r.a.createElement("p",null,"In the sidebar are 3 small-scale demonstrations of Asteria's learning power that probably won't melt your CPUs. Enjoy!"),r.a.createElement("h3",null,"How"),r.a.createElement("p",null,"So far, I have:"),r.a.createElement("ul",null,r.a.createElement("li",null,"built an ",r.a.createElement("b",null,"object-oriented multilayer perceptron")," library"),r.a.createElement("li",null,"implemented ",r.a.createElement("b",null,"symbolic differentiation")," (deprecated) in ",r.a.createElement("b",null,"TypeScript")),r.a.createElement("li",null,"re-derived the matrix shortcuts for computing ",r.a.createElement("b",null,"backpropagation")," and implemented them in ",r.a.createElement("b",null,"TypeScript")),r.a.createElement("li",null,"added ",r.a.createElement("b",null,"momentum")," and ",r.a.createElement("b",null,"orthogonal initialization")," to speed up learning"),r.a.createElement("li",null,"built this website with ",r.a.createElement("b",null,"React")," and ",r.a.createElement("b",null,"React Router")),r.a.createElement("li",null,"re-learned ",r.a.createElement("b",null,"CSS")," via ",r.a.createElement("b",null,"SASS (scss)"))),r.a.createElement("h3",null,"Who"),r.a.createElement("p",null,"Special thanks to:"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("b",null,"Grant Sanderson (3Blue1Brown)")," for making the ",r.a.createElement("a",{href:"https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi"},"videos")," that kicked off this adventure"),r.a.createElement("li",null,r.a.createElement("b",null,"TwoNineFive")," for the putting together the ",r.a.createElement("a",{href:"https://fontmeme.com/fonts/madeon-runes-font/"},"lovely font")," that's dotted around this site")),r.a.createElement("h3",null,"Why"),r.a.createElement("p",null,"If you're wondering why I implemented machine learning in JavaScript... why not?"),r.a.createElement("div",{className:"signoff adventure-off-hover"},"Justin"))}var te=function(){return r.a.createElement(l.a,null,r.a.createElement("header",null,r.a.createElement("div",{className:"sidebar-width logo-container"},r.a.createElement(l.b,{to:"/Asteria/",className:"adventure-on-hover"},"Asteria")),r.a.createElement(s.c,null,$.map((function(e,t){return r.a.createElement(s.a,{exact:!0,key:t,path:e.path},r.a.createElement(e.heading,null))}))),r.a.createElement("a",{className:"github-button",href:"https://github.com/xujustinj/Asteria"},"GitHub")),r.a.createElement("div",{className:"main"},r.a.createElement("div",{className:"sidebar"},$.filter((function(e){return e.inSidebar})).map((function(e,t){return r.a.createElement(l.b,{key:t,to:e.path,className:"adventure-on-hover"},e.name)}))),r.a.createElement("div",{className:"content"},$.map((function(e,t){return r.a.createElement(s.a,{exact:!0,key:t,path:e.path},r.a.createElement(e.main,null))})))))};n(41);u.a.render(r.a.createElement(te,null),document.getElementById("root"))}},[[27,1,2]]]);
//# sourceMappingURL=main.474d48bb.chunk.js.map