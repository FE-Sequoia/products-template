(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/account/forgot"],{2672:function(e,r,n){"use strict";n.r(r),function(e){n("6cdc"),n("66fd");var r=n("bf10");wx.__webpack_require_UNI_MP_PLUGIN__=n,e(r["a"])}.call(this,n("543d")["createPage"])},3885:function(e,r,n){"use strict";(function(e){r["a"]={data:function(){return{form:{username:"",password:"",email:"",code:""},confirm_password:"",rules:{username:{rules:[{required:!0,errorMessage:"请输入用户名"},{minLength:5,maxLength:16,errorMessage:"用户名长度在 {minLength} 到 {maxLength} 个字符"}]},password:{rules:[{required:!0,errorMessage:"请输入密码"},{minLength:5,maxLength:16,errorMessage:"密码长度在 {minLength} 到 {maxLength} 个字符"}]},confirm_password:{rules:[{required:!0,errorMessage:"请输入确认密码"},{minLength:5,maxLength:16,errorMessage:"确认密码长度在 {minLength} 到 {maxLength} 个字符"}]},code:{rules:[{required:!0,errorMessage:"请输入验证码"},{minLength:1,maxLength:4,errorMessage:"验证码长度为{maxLength} 个字符"}]},email:{rules:[{format:"email",errorMessage:"请输入正确的邮箱地址"}]}}}},onLoad:function(){},onReady:function(){},methods:{get_code:function(){for(var e=Math.floor(9999*Math.random()),r=e.length;r<4;r++)e="0"+e;this.form.code=e.toString()},forgot:function(){var e=this,r=Object.assign({},this.form);r.password===r.confirm_password?this.$post("~/api/user/forget_password?",r,(function(r){if(r.result){var n=e.$redirect();e.$nav(n)}else r.error&&e.$toast(r.error.message,"error")})):this.$toast("两次输入密码不一致！","error")},resetForm:function(){this.$refs.form.resetFields()},navBack:function(){e.navigateBack()}}}}).call(this,n("543d")["default"])},"4cbe":function(e,r,n){},"87bb":function(e,r,n){"use strict";var t=n("4cbe"),s=n.n(t);s.a},bf10:function(e,r,n){"use strict";var t,s,o=function(){var e=this,r=e.$createElement;e._self._c},a=[],i=n("3885"),c=i["a"],u=(n("87bb"),n("f0c5")),m=Object(u["a"])(c,o,a,!1,null,null,null,!1,t,s);r["a"]=m.exports}},[["2672","common/runtime","common/vendor"]]]);