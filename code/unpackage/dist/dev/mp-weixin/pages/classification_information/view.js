(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/classification_information/view"],{"51d2":function(i,s,e){"use strict";var o=e("bb24"),a=e.n(o);a.a},"5dc5":function(i,s,e){"use strict";(function(i){var o=e("dc88");s["a"]={mixins:[o["a"]],data:function(){return{field:"classification_information_id",url_add:"~/api/classification_information/add?",url_set:"~/api/classification_information/set?",url_get_obj:"~/api/classification_information/get_obj?",url_upload:"~/api/classification_information/upload?",classification_number:null,classification_categories:null,classification_remarks:null,query:{classification_information_id:0},form:{classification_number:"",classification_categories:"",classification_remarks:"",classification_information_id:0},disabledObj:{classification_number_isDisabled:!1,classification_categories_isDisabled:!1,classification_remarks_isDisabled:!1}}},methods:{submit_check:function(i){return null},changeLog:function(i,s){this.form[s]=i},uploadFile_:function(s){var e=this;"mp-weixin"!=i.getSystemInfoSync().uniPlatform||"devtools"==i.getSystemInfoSync().platform?i.chooseImage({count:1,success:function(i){var o=i.tempFilePaths;e.successChoose(o[0],s)}}):wx.chooseMessageFile({count:1,success:function(i){var o=i.tempFiles;e.successChoose(o[0].path,s)}})},successChoose:function(s,e){var o=this;i.uploadFile({url:getApp().globalData.host+"/api/classification_information/upload",filePath:s,name:"file",success:function(s){s.data.error?i.showToast({title:s.data.error.message,icon:"none"}):o[e]=JSON.parse(s.data).result.url}})},close_:function(i){"classification_number"==i&&(this["classification_number"]=this.form["classification_number"]=""),"classification_categories"==i&&(this["classification_categories"]=this.form["classification_categories"]=""),"classification_remarks"==i&&(this["classification_remarks"]=this.form["classification_remarks"]="")},submit_:function(){null!==this["classification_number"]&&(this.form["classification_number"]=this["classification_number"]),null!==this["classification_categories"]&&(this.form["classification_categories"]=this["classification_categories"]),null!==this["classification_remarks"]&&(this.form["classification_remarks"]=this["classification_remarks"]),console.log(this.form),this.submit()},change_file:function(s){var e=this;i.chooseFile({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(o){var a=o.tempFilePaths,t=i.uploadFile({url:e.$fullUrl("/api/classification_information/upload?"),filePath:a[0],name:"file",formData:{i_want_to_customize:"test"},header:{"x-auth-token":e.$store.state.user.token},success:function(i){var o=JSON.parse(i.data).result.url;e.form[s]=o}});t.onProgressUpdate((function(i){e.percent=i.progress,console.log("上传进度"+i.progress),console.log("已经上传的数据长度"+i.totalBytesSent),console.log("预期需要上传的数据总长度"+i.totalBytesExpectedToSend)}))},error:function(i){console.log(i)}})},change_img:function(s){var e=this;e.upload_img_flag=!1,i.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(o){var a=o.tempFilePaths,t=i.uploadFile({url:e.$fullUrl("/api/classification_information/upload?"),filePath:a[0],name:"file",formData:{i_want_to_customize:"test"},header:{"x-auth-token":e.$store.state.user.token},success:function(i){var o=JSON.parse(i.data).result.url;e.form[s]=o}});t.onProgressUpdate((function(i){e.percent=i.progress,console.log("上传进度"+i.progress),console.log("已经上传的数据长度"+i.totalBytesSent),console.log("预期需要上传的数据总长度"+i.totalBytesExpectedToSend)}))},error:function(i){console.log(i)}})},get_obj_before:function(s){var e=i.db.get("form");e&&(delete e.examine_state,delete e.examine_reply,this.obj=i.push(this.obj,e),this.form=i.push(this.form,e));var o=[];for(var a in e)o.push(a);for(var t=0;t<o.length;t++)this.disabledObj[o[t]+"_isDisabled"]=!0;return i.db.del("form"),s},get_obj_after:function(i,s){},is_view:function(){var i="管理员"==this.user_group;return i||(i=this.$check_action("/classification_information/table","add"),console.log(i?"你有表格添加权限视作有添加权限":"你没有表格添加权限")),i||(i=this.$check_action("/classification_information/table","set"),console.log(i?"你有表格添加权限视作有修改权限":"你没有表格修改权限")),i||(i=this.$check_action("/classification_information/view","add"),console.log(i?"你有视图添加权限视作有添加权限":"你没有视图添加权限")),i||(i=this.$check_action("/classification_information/view","set"),console.log(i?"你有视图修改权限视作有修改权限":"你没有视图修改权限")),i||(i=this.$check_action("/classification_information/view","get"),console.log(i?"你有视图查询权限视作有查询权限":"你没有视图查询权限")),console.log(i?"具有当前页面的查看权，请注意这不代表你有字段的查看权":"无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行"),i}},created:function(){}}}).call(this,e("543d")["default"])},"6b7b":function(i,s,e){"use strict";e.r(s),function(i){e("6cdc"),e("66fd");var s=e("ef25");wx.__webpack_require_UNI_MP_PLUGIN__=e,i(s["a"])}.call(this,e("543d")["createPage"])},bb24:function(i,s,e){},ef25:function(i,s,e){"use strict";var o,a={uniForms:function(){return Promise.all([e.e("common/vendor"),e.e("components/uni-forms/uni-forms")]).then(e.bind(null,"2deb"))},uniFormsItem:function(){return e.e("components/uni-forms-item/uni-forms-item").then(e.bind(null,"d8ed"))},uniEasyinput:function(){return Promise.all([e.e("common/vendor"),e.e("components/uni-easyinput/uni-easyinput")]).then(e.bind(null,"eea8"))}},t=function(){var i=this,s=i.$createElement,e=(i._self._c,i.is_view()),o=e?i.$check_field("get","classification_number")||i.$check_field("add","classification_number")||i.$check_field("set","classification_number"):null,a=e&&o?"管理员"===i.user_group||i.form["classification_information_id"]&&i.$check_field("set","classification_number")||!i.form["classification_information_id"]&&i.$check_field("add","classification_number"):null,t=e&&o&&!a?i.$check_field("get","classification_number"):null,c=e?i.$check_field("get","classification_categories")||i.$check_field("add","classification_categories")||i.$check_field("set","classification_categories"):null,n=e&&c?"管理员"===i.user_group||i.form["classification_information_id"]&&i.$check_field("set","classification_categories")||!i.form["classification_information_id"]&&i.$check_field("add","classification_categories"):null,l=e&&c&&!n?i.$check_field("get","classification_categories"):null,r=e?i.$check_field("get","classification_remarks")||i.$check_field("add","classification_remarks")||i.$check_field("set","classification_remarks"):null,f=e&&r?"管理员"===i.user_group||i.form["classification_information_id"]&&i.$check_field("set","classification_remarks")||!i.form["classification_information_id"]&&i.$check_field("add","classification_remarks"):null,u=e&&r&&!f?i.$check_field("get","classification_remarks"):null,_=i.$check_action("/classification_information/view","set")||i.$check_action("/classification_information/view","add")||i.$check_option("/classification_information/table","examine");i.$mp.data=Object.assign({},{$root:{m0:e,m1:o,m2:a,m3:t,m4:c,m5:n,m6:l,m7:r,m8:f,m9:u,m10:_}})},c=[],n=e("5dc5"),l=n["a"],r=(e("51d2"),e("f0c5")),f=Object(r["a"])(l,t,c,!1,null,"16641944",null,!1,a,o);s["a"]=f.exports}},[["6b7b","common/runtime","common/vendor"]]]);