(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/notification_announcement/view"],{"60cf":function(e,t,n){"use strict";n.r(t),function(e){n("6cdc"),n("66fd");var t=n("afc6");wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t["a"])}.call(this,n("543d")["createPage"])},6486:function(e,t,n){},ab70:function(e,t,n){"use strict";(function(e){var o=n("dc88");function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function r(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */r=function(){return e};var e={},t=Object.prototype,n=t.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},c=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function s(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{s({},"")}catch(P){s=function(e,t,n){return e[t]=n}}function l(e,t,n,o){var i=t&&t.prototype instanceof h?t:h,r=Object.create(i.prototype),c=new L(o||[]);return r._invoke=function(e,t,n){var o="suspendedStart";return function(i,r){if("executing"===o)throw new Error("Generator is already running");if("completed"===o){if("throw"===i)throw r;return S()}for(n.method=i,n.arg=r;;){var c=n.delegate;if(c){var a=k(c,n);if(a){if(a===m)continue;return a}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===o)throw o="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o="executing";var u=f(e,t,n);if("normal"===u.type){if(o=n.done?"completed":"suspendedYield",u.arg===m)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(o="completed",n.method="throw",n.arg=u.arg)}}}(e,n,c),r}function f(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(P){return{type:"throw",arg:P}}}e.wrap=l;var m={};function h(){}function d(){}function _(){}var p={};s(p,c,(function(){return this}));var y=Object.getPrototypeOf,g=y&&y(y(E([])));g&&g!==t&&n.call(g,c)&&(p=g);var v=_.prototype=h.prototype=Object.create(p);function b(e){["next","throw","return"].forEach((function(t){s(e,t,(function(e){return this._invoke(t,e)}))}))}function w(e,t){function o(r,c,a,u){var s=f(e[r],e,c);if("throw"!==s.type){var l=s.arg,m=l.value;return m&&"object"==i(m)&&n.call(m,"__await")?t.resolve(m.__await).then((function(e){o("next",e,a,u)}),(function(e){o("throw",e,a,u)})):t.resolve(m).then((function(e){l.value=e,a(l)}),(function(e){return o("throw",e,a,u)}))}u(s.arg)}var r;this._invoke=function(e,n){function i(){return new t((function(t,i){o(e,n,t,i)}))}return r=r?r.then(i,i):i()}}function k(e,t){var n=e.iterator[t.method];if(void 0===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,k(e,t),"throw"===t.method))return m;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var o=f(n,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,m;var i=o.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,m):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,m)}function $(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function x(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function L(e){this.tryEntries=[{tryLoc:"root"}],e.forEach($,this),this.reset(!0)}function E(e){if(e){var t=e[c];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function t(){for(;++o<e.length;)if(n.call(e,o))return t.value=e[o],t.done=!1,t;return t.value=void 0,t.done=!0,t};return i.next=i}}return{next:S}}function S(){return{value:void 0,done:!0}}return d.prototype=_,s(v,"constructor",_),s(_,"constructor",d),d.displayName=s(_,u,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===d||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,_):(e.__proto__=_,s(e,u,"GeneratorFunction")),e.prototype=Object.create(v),e},e.awrap=function(e){return{__await:e}},b(w.prototype),s(w.prototype,a,(function(){return this})),e.AsyncIterator=w,e.async=function(t,n,o,i,r){void 0===r&&(r=Promise);var c=new w(l(t,n,o,i),r);return e.isGeneratorFunction(n)?c:c.next().then((function(e){return e.done?e.value:c.next()}))},b(v),s(v,u,"Generator"),s(v,c,(function(){return this})),s(v,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var o=t.pop();if(o in e)return n.value=o,n.done=!1,n}return n.done=!0,n}},e.values=E,L.prototype={constructor:L,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function o(n,o){return c.type="throw",c.arg=e,t.next=n,o&&(t.method="next",t.arg=void 0),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var r=this.tryEntries[i],c=r.completion;if("root"===r.tryLoc)return o("end");if(r.tryLoc<=this.prev){var a=n.call(r,"catchLoc"),u=n.call(r,"finallyLoc");if(a&&u){if(this.prev<r.catchLoc)return o(r.catchLoc,!0);if(this.prev<r.finallyLoc)return o(r.finallyLoc)}else if(a){if(this.prev<r.catchLoc)return o(r.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<r.finallyLoc)return o(r.finallyLoc)}}}},abrupt:function(e,t){for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o];if(i.tryLoc<=this.prev&&n.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var r=i;break}}r&&("break"===e||"continue"===e)&&r.tryLoc<=t&&t<=r.finallyLoc&&(r=null);var c=r?r.completion:{};return c.type=e,c.arg=t,r?(this.method="next",this.next=r.finallyLoc,m):this.complete(c)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),x(n),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var o=n.completion;if("throw"===o.type){var i=o.arg;x(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:E(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),m}},e}function c(e,t,n,o,i,r,c){try{var a=e[r](c),u=a.value}catch(s){return void n(s)}a.done?t(u):Promise.resolve(u).then(o,i)}function a(e){return function(){var t=this,n=arguments;return new Promise((function(o,i){var r=e.apply(t,n);function a(e){c(r,o,i,a,u,"next",e)}function u(e){c(r,o,i,a,u,"throw",e)}a(void 0)}))}}t["a"]={mixins:[o["a"]],data:function(){return{field:"notification_announcement_id",url_add:"~/api/notification_announcement/add?",url_set:"~/api/notification_announcement/set?",url_get_obj:"~/api/notification_announcement/get_obj?",url_upload:"~/api/notification_announcement/upload?",announcement_title:null,publisher:null,release_time:null,announcement_type:null,announcement_content:null,query:{notification_announcement_id:0},form:{announcement_title:"",publisher:"",release_time:this.$toTime((new Date).getTime(),"yyyy-MM-dd hh:mm:ss"),announcement_type:"",announcement_content:"",notification_announcement_id:0},disabledObj:{announcement_title_isDisabled:!1,publisher_isDisabled:!1,release_time_isDisabled:!1,announcement_type_isDisabled:!1,announcement_content_isDisabled:!1},list_announcement_type:[]}},methods:{submit_check:function(e){return e.release_time?null:"发布时间不能为空"},changeLog:function(e,t){this.form[t]=e},uploadFile_:function(t){var n=this;"mp-weixin"!=e.getSystemInfoSync().uniPlatform||"devtools"==e.getSystemInfoSync().platform?e.chooseImage({count:1,success:function(e){var o=e.tempFilePaths;n.successChoose(o[0],t)}}):wx.chooseMessageFile({count:1,success:function(e){var o=e.tempFiles;n.successChoose(o[0].path,t)}})},successChoose:function(t,n){var o=this;e.uploadFile({url:getApp().globalData.host+"/api/notification_announcement/upload",filePath:t,name:"file",success:function(t){t.data.error?e.showToast({title:t.data.error.message,icon:"none"}):o[n]=JSON.parse(t.data).result.url}})},close_:function(e){"announcement_title"==e&&(this["announcement_title"]=this.form["announcement_title"]=""),"publisher"==e&&(this["publisher"]=this.form["publisher"]=""),"release_time"==e&&(this["release_time"]=this.form["release_time"]=""),"announcement_type"==e&&(this["announcement_type"]=this.form["announcement_type"]=""),"announcement_content"==e&&(this["announcement_content"]=this.form["announcement_content"]="")},submit_:function(){null!==this["announcement_title"]&&(this.form["announcement_title"]=this["announcement_title"]),null!==this["publisher"]&&(this.form["publisher"]=this["publisher"]),null!==this["release_time"]&&(this.form["release_time"]=this["release_time"]),null!==this["announcement_type"]&&(this.form["announcement_type"]=this["announcement_type"]),null!==this["announcement_content"]&&(this.form["announcement_content"]=this["announcement_content"]),console.log(this.form),this.submit()},change_file:function(t){var n=this;e.chooseFile({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(o){var i=o.tempFilePaths,r=e.uploadFile({url:n.$fullUrl("/api/notification_announcement/upload?"),filePath:i[0],name:"file",formData:{i_want_to_customize:"test"},header:{"x-auth-token":n.$store.state.user.token},success:function(e){var o=JSON.parse(e.data).result.url;n.form[t]=o}});r.onProgressUpdate((function(e){n.percent=e.progress,console.log("上传进度"+e.progress),console.log("已经上传的数据长度"+e.totalBytesSent),console.log("预期需要上传的数据总长度"+e.totalBytesExpectedToSend)}))},error:function(e){console.log(e)}})},change_img:function(t){var n=this;n.upload_img_flag=!1,e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(o){var i=o.tempFilePaths,r=e.uploadFile({url:n.$fullUrl("/api/notification_announcement/upload?"),filePath:i[0],name:"file",formData:{i_want_to_customize:"test"},header:{"x-auth-token":n.$store.state.user.token},success:function(e){var o=JSON.parse(e.data).result.url;n.form[t]=o}});r.onProgressUpdate((function(e){n.percent=e.progress,console.log("上传进度"+e.progress),console.log("已经上传的数据长度"+e.totalBytesSent),console.log("预期需要上传的数据总长度"+e.totalBytesExpectedToSend)}))},error:function(e){console.log(e)}})},get_obj_before:function(t){var n=e.db.get("form");n&&(delete n.examine_state,delete n.examine_reply,this.obj=e.push(this.obj,n),this.form=e.push(this.form,n));var o=[];for(var i in n)o.push(i);for(var r=0;r<o.length;r++)this.disabledObj[o[r]+"_isDisabled"]=!0;return this.form["release_time"]&&-1===JSON.stringify(this.form["release_time"]).indexOf("-")&&(this.form["release_time"]=this.$toTime(parseInt(this.form["release_time"]),"yyyy-MM-dd hh:mm:ss")),e.db.del("form"),t},get_list_announcement_type:function(){var e=this;return a(r().mark((function t(){var n;return r().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$get("~/api/classification_information/get_list?");case 2:n=t.sent,n.result&&n.result.list?n.result.list.map((function(t){return e.list_announcement_type.push({value:t.classification_categories,text:t.classification_categories})})):n.error&&console.error(n.error);case 4:case"end":return t.stop()}}),t)})))()},get_obj_after:function(e,t){this.form["release_time"]&&-1===JSON.stringify(this.form["release_time"]).indexOf("-")&&(this.form["release_time"]=this.$toTime(parseInt(this.form["release_time"]),"yyyy-MM-dd hh:mm:ss"))},is_view:function(){var e="管理员"==this.user_group;return e||(e=this.$check_action("/notification_announcement/table","add"),console.log(e?"你有表格添加权限视作有添加权限":"你没有表格添加权限")),e||(e=this.$check_action("/notification_announcement/table","set"),console.log(e?"你有表格添加权限视作有修改权限":"你没有表格修改权限")),e||(e=this.$check_action("/notification_announcement/view","add"),console.log(e?"你有视图添加权限视作有添加权限":"你没有视图添加权限")),e||(e=this.$check_action("/notification_announcement/view","set"),console.log(e?"你有视图修改权限视作有修改权限":"你没有视图修改权限")),e||(e=this.$check_action("/notification_announcement/view","get"),console.log(e?"你有视图查询权限视作有查询权限":"你没有视图查询权限")),console.log(e?"具有当前页面的查看权，请注意这不代表你有字段的查看权":"无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行"),e}},created:function(){this.get_list_announcement_type()}}}).call(this,n("543d")["default"])},afc6:function(e,t,n){"use strict";var o,i={uniForms:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-forms/uni-forms")]).then(n.bind(null,"2deb"))},uniFormsItem:function(){return n.e("components/uni-forms-item/uni-forms-item").then(n.bind(null,"d8ed"))},uniEasyinput:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-easyinput/uni-easyinput")]).then(n.bind(null,"eea8"))},uniDatetimePicker:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-datetime-picker/uni-datetime-picker")]).then(n.bind(null,"35cd"))},uniDataSelect:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-data-select/uni-data-select")]).then(n.bind(null,"b904"))}},r=function(){var e=this,t=e.$createElement,n=(e._self._c,e.is_view()),o=n?e.$check_field("get","announcement_title")||e.$check_field("add","announcement_title")||e.$check_field("set","announcement_title"):null,i=n&&o?"管理员"===e.user_group||e.form["notification_announcement_id"]&&e.$check_field("set","announcement_title")||!e.form["notification_announcement_id"]&&e.$check_field("add","announcement_title"):null,r=n&&o&&!i?e.$check_field("get","announcement_title"):null,c=n?e.$check_field("get","publisher")||e.$check_field("add","publisher")||e.$check_field("set","publisher"):null,a=n&&c?"管理员"===e.user_group||e.form["notification_announcement_id"]&&e.$check_field("set","publisher")||!e.form["notification_announcement_id"]&&e.$check_field("add","publisher"):null,u=n&&c&&!a?e.$check_field("get","publisher"):null,s=n?e.$check_field("get","release_time")||e.$check_field("add","release_time")||e.$check_field("set","release_time"):null,l=n&&s?"管理员"===e.user_group||e.form["notification_announcement_id"]&&e.$check_field("set","release_time")||!e.form["notification_announcement_id"]&&e.$check_field("add","release_time"):null,f=n&&s&&!l?e.$check_field("get","release_time"):null,m=n?e.$check_field("get","announcement_type")||e.$check_field("add","announcement_type")||e.$check_field("set","announcement_type"):null,h=n&&m?"管理员"===e.user_group||e.form["notification_announcement_id"]&&e.$check_field("set","announcement_type")||!e.form["notification_announcement_id"]&&e.$check_field("add","announcement_type"):null,d=n&&m&&!h?e.$check_field("get","announcement_type"):null,_=n?e.$check_field("get","announcement_content")||e.$check_field("add","announcement_content")||e.$check_field("set","announcement_content"):null,p=n&&_?"管理员"===e.user_group||e.form["notification_announcement_id"]&&e.$check_field("set","announcement_content")||!e.form["notification_announcement_id"]&&e.$check_field("add","announcement_content"):null,y=n&&_&&!p?e.$check_field("get","announcement_content"):null,g=e.$check_action("/notification_announcement/view","set")||e.$check_action("/notification_announcement/view","add")||e.$check_option("/notification_announcement/table","examine");e.$mp.data=Object.assign({},{$root:{m0:n,m1:o,m2:i,m3:r,m4:c,m5:a,m6:u,m7:s,m8:l,m9:f,m10:m,m11:h,m12:d,m13:_,m14:p,m15:y,m16:g}})},c=[],a=n("ab70"),u=a["a"],s=(n("cb44"),n("f0c5")),l=Object(s["a"])(u,r,c,!1,null,"28b6d5f7",null,!1,i,o);t["a"]=l.exports},cb44:function(e,t,n){"use strict";var o=n("6486"),i=n.n(o);i.a}},[["60cf","common/runtime","common/vendor"]]]);