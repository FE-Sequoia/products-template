(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-tr/uni-tr"],{"454b":function(t,i,n){"use strict";var r=n("a9d5"),e=n.n(r);e.a},a9d5:function(t,i,n){},cb91:function(t,i,n){"use strict";var r;n.r(i);var e,o=function(){var t=this,i=t.$createElement;t._self._c},s=[],h={name:"uniTr",options:{virtualHost:!0},data:function(){return{value:!1,border:!1,selection:!1,widthThArr:[]}},created:function(){this.root=this.getTable(),this.border=this.root.border,this.selection=this.root.type,this.root.trChildren.push(this),this.root.isNodata()},mounted:function(){if(this.widthThArr.length>0){var t="selection"===this.selection?50:0;this.root.minWidth=this.widthThArr.reduce((function(t,i){return Number(t)+Number(i)}))+t}},destroyed:function(){var t=this,i=this.root.trChildren.findIndex((function(i){return i===t}));this.root.trChildren.splice(i,1),this.root.isNodata()},methods:{minWidthUpdate:function(t){this.widthThArr.push(t)},change:function(t){var i=this;this.root.trChildren.forEach((function(n){n===i&&i.root.check(i,t.detail.value.length>0)}))},getTable:function(){var t=this.$parent,i=t.$options.name;while("uniTable"!==i){if(t=t.$parent,!t)return!1;i=t.$options.name}return t}}},a=h,u=(n("454b"),n("f0c5")),c=Object(u["a"])(a,o,s,!1,null,null,null,!1,r,e);i["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-tr/uni-tr-create-component',
    {
        'components/uni-tr/uni-tr-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("cb91"))
        })
    },
    [['components/uni-tr/uni-tr-create-component']]
]);
