(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/ld-select/ld-select"],{2965:function(e,t,l){"use strict";var a=l("8d2d"),i=l.n(a);i.a},"3b80":function(e,t,l){},"765c":function(e,t,l){"use strict";var a=l("3b80"),i=l.n(a);i.a},"8d2d":function(e,t,l){},e195:function(e,t,l){"use strict";var a;l.r(t);var i,n=function(){var e=this,t=e.$createElement,l=(e._self._c,e.__map(e.list,(function(t,l){var a=e.__get_orig(t),i=e.valueIndexOf(t),n=e.getLabelKeyValue(t),u=e.valueIndexOf(t);return{$orig:a,m0:i,m1:n,m2:u}})));e.$mp.data=Object.assign({},{$root:{l0:l}})},u=[],r={data:function(){return{isShowModal:!1}},props:{value:{type:[Number,String,Array,Object],default:null},placeholder:{default:"",type:String},multiple:{default:!1,type:Boolean},list:{default:function(){return[]},type:Array},valueKey:{default:"value",type:String},labelKey:{default:"label",type:String},disabled:{default:!1,type:Boolean},clearable:{default:!1,type:Boolean},cancelText:{default:"取消",type:String},confirmText:{default:"确定",type:String},color:{default:"#000000",type:String},selectColor:{default:"#0081ff",type:String},bgColor:{default:"#F1F1F1",type:String},selectBgColor:{default:"#FFFFFF",type:String}},computed:{_value:{get:function(){return this.get_value(this.value)},set:function(e){}}},created:function(){},methods:{get_value:function(e){var t=this;if(e||0===e){if(Array.isArray(e)){var l=[];e.forEach((function(e){var a=t.list.find((function(l){var a=t.getValueKeyValue(l);return e===a}));a||(a={},t.$set(a,t.valueKey,e),t.$set(a,t.labelKey,e)),l.push(a)}));var a=l.map((function(e){return t.getLabelKeyValue(e)})).join(",");return a}var i=this.list.find((function(l){var a=t.getValueKeyValue(l);return e===a}));return i?this.getLabelKeyValue(i):e}return""},select:function(e){var t=this.getValueKeyValue(e);if(this.multiple){var l=this.value,a=l.indexOf(t);-1!=a?(l.splice(a,1),this.setInput(l)):(l.push(t),this.setInput(l))}else this.setInput(t),this.hideModal()},valueIndexOf:function(e){var t=this.getValueKeyValue(e);return Array.isArray(this.value)?-1!=this.value.indexOf(t):this.value===t},getLabelKeyValue:function(e){return e[this.labelKey]},getValueKeyValue:function(e){return e[this.valueKey]},empty:function(){this.multiple?this.setInput([]):this.setInput("")},setInput:function(e){this.$emit("change",e),this.$emit("input",e)},cancelClick:function(){this.$emit("cancel",this.value),this.hideModal()},confirmClick:function(){this.$emit("confirm",this.value),this.hideModal()},showModal:function(){this.disabled||(this.isShowModal=!0)},hideModal:function(){this.isShowModal=!1}}},s=r,o=(l("765c"),l("2965"),l("f0c5")),c=Object(o["a"])(s,n,u,!1,null,"3fc2e7f9",null,!1,a,i);t["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/ld-select/ld-select-create-component',
    {
        'components/ld-select/ld-select-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e195"))
        })
    },
    [['components/ld-select/ld-select-create-component']]
]);
