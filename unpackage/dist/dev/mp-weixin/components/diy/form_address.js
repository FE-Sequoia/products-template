(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/diy/form_address"],{"5b1e":function(e,s,n){},"618c":function(e,s,n){"use strict";var a=n("5b1e"),t=n.n(a);t.a},"744e":function(e,s,n){"use strict";(function(e){var a=n("a29f");s["a"]={mixins:[a["a"]],props:{form:{type:Object,default:{}},vm:{type:Object,default:function(){return{address:"address",address_id:"address_id",name:"name",phone:"phone"}}}},methods:{save_address:function(){var s=this.form,n=s.address,a=s.name,t=s.phone,d=s.address_id,o=s.user_id,i=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;!t||i.test(t)?(o=this.user.user_id,d?this.$post("~/api/address/set?address_id=".concat(d),{address:n,name:a,phone:t,user_id:o},(function(s){console.log(s),e.navigateBack({delta:1})})):this.$post("~/api/address/add?",{address:n,name:a,phone:t,user_id:o},(function(s){console.log(s),e.navigateBack({delta:1})}))):this.$toast("请输入正确的手机号码","error")}}}}).call(this,n("543d")["default"])},8691:function(e,s,n){"use strict";n.r(s);var a,t={uniEasyinput:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-easyinput/uni-easyinput")]).then(n.bind(null,"eea8"))}},d=function(){var e=this,s=e.$createElement;e._self._c},o=[],i=n("744e"),r=i["a"],u=(n("618c"),n("f0c5")),c=Object(u["a"])(r,d,o,!1,null,null,null,!1,t,a);s["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/diy/form_address-create-component',
    {
        'components/diy/form_address-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8691"))
        })
    },
    [['components/diy/form_address-create-component']]
]);
