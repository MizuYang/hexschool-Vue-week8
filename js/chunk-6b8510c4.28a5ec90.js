(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6b8510c4"],{"00b4":function(e,t,n){"use strict";n("ac1f");var c=n("23e7"),a=n("da84"),r=n("c65b"),o=n("e330"),l=n("1626"),s=n("861d"),i=function(){var e=!1,t=/[ac]/;return t.exec=function(){return e=!0,/./.exec.apply(this,arguments)},!0===t.test("abc")&&e}(),d=a.Error,u=o(/./.test);c({target:"RegExp",proto:!0,forced:!i},{test:function(e){var t=this.exec;if(!l(t))return u(this,e);var n=r(t,this,e);if(null!==n&&!s(n))throw new d("RegExp exec method returned something other than an Object or null");return!!n}})},"23f7":function(e,t,n){},"5b04":function(e,t,n){"use strict";n.r(t);var c=n("7a23"),a=function(e){return Object(c["pushScopeId"])("data-v-4aa870ed"),e=e(),Object(c["popScopeId"])(),e},r=a((function(){return Object(c["createElementVNode"])("div",{class:"banner_main img-fluid"},null,-1)})),o={class:"contact container mt-8 mt-sm-10"},l=a((function(){return Object(c["createElementVNode"])("h2",{class:"title text-center mb-5 pt-3"},[Object(c["createElementVNode"])("span",{class:"decorate"},"連絡我們")],-1)})),s={class:"row justify-content-center form-container"},i={class:"mb-1"},d=a((function(){return Object(c["createElementVNode"])("label",{for:"name"}," 姓名 ",-1)})),u={class:"mb-1"},b=a((function(){return Object(c["createElementVNode"])("label",{for:"email"}," E-mail ",-1)})),m={class:"mb-1"},f=a((function(){return Object(c["createElementVNode"])("label",{for:"tel",class:"form-label"},"電話",-1)})),j={class:"mb-1"},O=a((function(){return Object(c["createElementVNode"])("label",{for:"category"}," 聯絡類別 ",-1)})),v=a((function(){return Object(c["createElementVNode"])("option",{value:"",disabled:""},"請選擇聯絡類別",-1)})),p=a((function(){return Object(c["createElementVNode"])("option",{value:"退 / 換貨問題、我收到的東西有破損"}," 退 / 換貨問題、我收到的東西有破損 ",-1)})),N=a((function(){return Object(c["createElementVNode"])("option",{value:"重複付款或其他付款問題"}," 重複付款或其他付款問題 ",-1)})),V=a((function(){return Object(c["createElementVNode"])("option",{value:"我收到的產品有發霉、其它品質問題"}," 我收到的產品有發霉、其它品質問題 ",-1)})),E=a((function(){return Object(c["createElementVNode"])("option",{value:"優惠券相關問題"},"優惠券相關問題",-1)})),h=a((function(){return Object(c["createElementVNode"])("option",{value:"我沒收到訂購的產品"},"我沒收到訂購的產品",-1)})),x=a((function(){return Object(c["createElementVNode"])("option",{value:"我要加盟"},"我要加盟",-1)})),g=a((function(){return Object(c["createElementVNode"])("option",{value:"其它問題 / 請詳細描述"},"其它問題 / 請詳細描述",-1)})),w={class:"mb-3"},C=a((function(){return Object(c["createElementVNode"])("label",{for:"message"}," 留言 ",-1)})),k=a((function(){return Object(c["createElementVNode"])("div",{class:"text-center"},[Object(c["createElementVNode"])("button",{type:"submit",class:"btn btn-danger send-btn mb-4",title:"發送內容"}," 送出內容 ")],-1)})),y=a((function(){return Object(c["createElementVNode"])("div",{class:"text-center"},[Object(c["createElementVNode"])("p",null,[Object(c["createElementVNode"])("small",null," 送出內容後，我們將在 3~5 個工作天內回覆您。 ")])],-1)})),L=a((function(){return Object(c["createElementVNode"])("div",{class:"cssload-container"},[Object(c["createElementVNode"])("div",{class:"cssload-dot"}),Object(c["createElementVNode"])("div",{class:"step",id:"cssload-s1"}),Object(c["createElementVNode"])("div",{class:"step",id:"cssload-s2"}),Object(c["createElementVNode"])("div",{class:"step",id:"cssload-s3"})],-1)}));function _(e,t,n,a,_,z){var S=Object(c["resolveComponent"])("Field"),q=Object(c["resolveComponent"])("ErrorMessage"),F=Object(c["resolveComponent"])("Form"),I=Object(c["resolveComponent"])("Loading");return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,[r,Object(c["createElementVNode"])("div",o,[l,Object(c["createElementVNode"])("div",s,[Object(c["createVNode"])(F,{action:"/",class:"col-md-6",ref:"form",onSubmit:z.sendQuestion},{default:Object(c["withCtx"])((function(e){var t=e.errors;return[Object(c["createElementVNode"])("div",i,[d,Object(c["createVNode"])(S,{id:"name",name:"姓名",type:"text",class:Object(c["normalizeClass"])(["form-control",{"is-invalid":t["姓名"]}]),placeholder:"請輸入姓名",rules:"required"},null,8,["class"]),Object(c["createVNode"])(q,{name:"姓名",class:"invalid-feedback"})]),Object(c["createElementVNode"])("div",u,[b,Object(c["createVNode"])(S,{type:"email",id:"email",placeholder:"請輸入E-mail",class:Object(c["normalizeClass"])(["form-control",{"is-invalid":t["信箱"]}]),name:"信箱",rules:"email|required"},null,8,["class"]),Object(c["createVNode"])(q,{name:"信箱",class:"invalid-feedback"})]),Object(c["createElementVNode"])("div",m,[f,Object(c["createVNode"])(S,{id:"tel",name:"電話",type:"tel",class:Object(c["normalizeClass"])(["form-control",{"is-invalid":t["電話"]}]),rules:z.isPhone,placeholder:"請輸入電話 / 例：09xxxxxxxx",maxlength:"10"},null,8,["class","rules"]),Object(c["createVNode"])(q,{name:"電話",class:"invalid-feedback"})]),Object(c["createElementVNode"])("div",j,[O,Object(c["createVNode"])(S,{id:"category",name:"類別",class:Object(c["normalizeClass"])(["form-control form-select",{"is-invalid":t["類別"]}]),rules:"required",as:"select"},{default:Object(c["withCtx"])((function(){return[v,p,N,V,E,h,x,g]})),_:2},1032,["class"]),Object(c["createVNode"])(q,{name:"類別",class:"invalid-feedback"})]),Object(c["createElementVNode"])("div",w,[C,Object(c["createVNode"])(S,{name:"留言",id:"message",class:Object(c["normalizeClass"])(["form-control mb-4",{"is-invalid":t["留言"]}]),type:"text",rules:"required",placeholder:"輸入您想說的內容"},null,8,["class"]),Object(c["createVNode"])(q,{name:"留言",class:"invalid-feedback"})]),k]})),_:1},8,["onSubmit"]),y])]),Object(c["createVNode"])(I,{active:_.isLoading,"onUpdate:active":t[0]||(t[0]=function(e){return _.isLoading=e})},{default:Object(c["withCtx"])((function(){return[L]})),_:1},8,["active"])],64)}n("ac1f"),n("00b4");var z={data:function(){return{isLoading:!1}},methods:{isPhone:function(e){var t=/^(09)[0-9]{8}$/;return!!t.test(e)||"*請輸入 09 開頭的正確電話號碼"},sendQuestion:function(){var e=this;this.isLoading=!0,setTimeout((function(){e.$httpMessageState(!0,"送出內容"),e.$router.push("/sendMessage"),e.isLoading=!1}),1500)}}},S=(n("c18c"),n("d959")),q=n.n(S);const F=q()(z,[["render",_],["__scopeId","data-v-4aa870ed"]]);t["default"]=F},c18c:function(e,t,n){"use strict";n("23f7")}}]);
//# sourceMappingURL=chunk-6b8510c4.28a5ec90.js.map