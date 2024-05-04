(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-number-box/uni-number-box"],{"0392":function(t,e,i){"use strict";var n=i("e16f"),u=i.n(n);u.a},ae2b:function(t,e,i){"use strict";var n;i.r(e);var u,a=function(){var t=this,e=t.$createElement;t._self._c},s=[],l={name:"UniNumberBox",props:{value:{type:[Number,String],default:1},min:{type:Number,default:0},max:{type:Number,default:100},step:{type:Number,default:1},disabled:{type:Boolean,default:!1}},data:function(){return{inputValue:0}},watch:{value:function(t){this.inputValue=+t},inputValue:function(t,e){+t!==+e&&this.$emit("change",t)}},created:function(){this.inputValue=+this.value},methods:{_calcValue:function(t){if(!this.disabled){var e=this._getDecimalScale(),i=this.inputValue*e,n=this.step*e;if("minus"===t){if(i-=n,i<this.min*e)return;i>this.max*e&&(i=this.max*e)}else if("plus"===t){if(i+=n,i>this.max*e)return;i<this.min*e&&(i=this.min*e)}this.inputValue=String(i/e)}},_getDecimalScale:function(){var t=1;return~~this.step!==this.step&&(t=Math.pow(10,(this.step+"").split(".")[1].length)),t},_onBlur:function(t){var e=t.detail.value;e&&(e=+e,e>this.max?e=this.max:e<this.min&&(e=this.min),this.inputValue=e)}}},r=l,h=(i("0392"),i("f0c5")),c=Object(h["a"])(r,a,s,!1,null,"2abbb33e",null,!1,n,u);e["default"]=c.exports},e16f:function(t,e,i){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-number-box/uni-number-box-create-component',
    {
        'components/uni-number-box/uni-number-box-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("ae2b"))
        })
    },
    [['components/uni-number-box/uni-number-box-create-component']]
]);
