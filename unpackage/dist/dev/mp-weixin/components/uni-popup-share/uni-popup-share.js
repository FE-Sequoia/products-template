(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-popup-share/uni-popup-share"],{"2f35":function(e,t,c){"use strict";var n=c("da7a"),p=c.n(n);p.a},c023:function(e,t,c){"use strict";var n;c.r(t);var p,a=function(){var e=this,t=e.$createElement;e._self._c},o=[],s={name:"UniPopupShare",props:{title:{type:String,default:"分享到"}},inject:["popup"],data:function(){return{bottomData:[{text:"微信",icon:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/c2b17470-50be-11eb-b680-7980c8a877b8.png",name:"wx"},{text:"支付宝",icon:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/d684ae40-50be-11eb-8ff1-d5dcf8779628.png",name:"wx"},{text:"QQ",icon:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/e7a79520-50be-11eb-b997-9918a5dda011.png",name:"qq"},{text:"新浪",icon:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/0dacdbe0-50bf-11eb-8ff1-d5dcf8779628.png",name:"sina"},{text:"百度",icon:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/1ec6e920-50bf-11eb-8a36-ebb87efcf8c0.png",name:"copy"},{text:"其他",icon:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/2e0fdfe0-50bf-11eb-b997-9918a5dda011.png",name:"more"}]}},created:function(){},methods:{select:function(e,t){var c=this;this.$emit("select",{item:e,index:t},(function(){c.popup.close()}))},close:function(){this.popup.close()}}},i=s,u=(c("2f35"),c("f0c5")),d=Object(u["a"])(i,a,o,!1,null,"d790888a",null,!1,n,p);t["default"]=d.exports},da7a:function(e,t,c){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-popup-share/uni-popup-share-create-component',
    {
        'components/uni-popup-share/uni-popup-share-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c023"))
        })
    },
    [['components/uni-popup-share/uni-popup-share-create-component']]
]);
