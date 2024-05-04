(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-th/uni-th"],{"225e":function(t,e,n){"use strict";var i;n.r(e);var r,o=function(){var t=this,e=t.$createElement;t._self._c},a=[],s={name:"uniTh",options:{virtualHost:!0},props:{width:{type:[String,Number],default:""},align:{type:String,default:"left"}},data:function(){return{border:!1}},created:function(){this.root=this.getTable("uniTable"),this.rootTr=this.getTable("uniTr"),this.rootTr.minWidthUpdate(this.width?this.width:140),this.border=this.root.border},methods:{getTable:function(t){var e=this.$parent,n=e.$options.name;while(n!==t){if(e=e.$parent,!e)return!1;n=e.$options.name}return e}}},u=s,l=(n("d4b7"),n("f0c5")),h=Object(l["a"])(u,o,a,!1,null,null,null,!1,i,r);e["default"]=h.exports},c206:function(t,e,n){},d4b7:function(t,e,n){"use strict";var i=n("c206"),r=n.n(i);r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-th/uni-th-create-component',
    {
        'components/uni-th/uni-th-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("225e"))
        })
    },
    [['components/uni-th/uni-th-create-component']]
]);
