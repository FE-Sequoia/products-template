(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/password"],{"03f8":function(e,n,r){"use strict";var s,o={uniForms:function(){return Promise.all([r.e("common/vendor"),r.e("components/uni-forms/uni-forms")]).then(r.bind(null,"2deb"))},uniFormsItem:function(){return r.e("components/uni-forms-item/uni-forms-item").then(r.bind(null,"d8ed"))},uniEasyinput:function(){return Promise.all([r.e("common/vendor"),r.e("components/uni-easyinput/uni-easyinput")]).then(r.bind(null,"eea8"))}},t=function(){var e=this,n=e.$createElement;e._self._c},a=[],i=r("dc88"),u={mixins:[i["a"]],data:function(){return{oauth:{signIn:!0,user_group:[]},form:{o_password:"",password:""},confirm_password:"",rules:{o_password:{rules:[{required:!0,errorMessage:"请输入原密码"},{minLength:5,maxLength:16,errorMessage:"密码长度在 {minLength} 到 {maxLength} 个字符"}]},password:{rules:[{required:!0,errorMessage:"请输入修改密码"},{minLength:5,maxLength:16,errorMessage:"密码长度在 {minLength} 到 {maxLength} 个字符"}]},confirm_password:{rules:[{required:!0,errorMessage:"请输入确认密码"},{minLength:5,maxLength:16,errorMessage:"确认密码长度在 {minLength} 到 {maxLength} 个字符"}]}}}},methods:{change_password:function(){var e=this,n=this.form;n.password===this.confirm_password?this.$refs["form"].submit().then((function(r){e.$post("~/api/user/change_password?",n,(function(n){n.result?e.$nav("/pages/index/index"):n.error&&e.$toast(n.error.message,"error")}))})):this.$toast("密码不相同","error")}}},m=u,c=r("f0c5"),d=Object(c["a"])(m,t,a,!1,null,"69ed433b",null,!1,o,s);n["a"]=d.exports},"6e7a":function(e,n,r){"use strict";r.r(n),function(e){r("6cdc"),r("66fd");var n=r("03f8");wx.__webpack_require_UNI_MP_PLUGIN__=r,e(n["a"])}.call(this,r("543d")["createPage"])}},[["6e7a","common/runtime","common/vendor"]]]);