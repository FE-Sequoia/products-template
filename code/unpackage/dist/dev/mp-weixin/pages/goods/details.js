(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/details"],{"37b3":function(t,e,o){"use strict";var r=o("93c4"),n=o.n(r);n.a},"475e":function(t,e,o){"use strict";(function(t){var r=o("dc88");function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function i(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */i=function(){return t};var t={},e=Object.prototype,o=e.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},c=r.iterator||"@@iterator",s=r.asyncIterator||"@@asyncIterator",a=r.toStringTag||"@@toStringTag";function u(t,e,o){return Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(T){u=function(t,e,o){return t[e]=o}}function l(t,e,o,r){var n=e&&e.prototype instanceof f?e:f,i=Object.create(n.prototype),c=new $(r||[]);return i._invoke=function(t,e,o){var r="suspendedStart";return function(n,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===n)throw i;return S()}for(o.method=n,o.arg=i;;){var c=o.delegate;if(c){var s=x(c,o);if(s){if(s===h)continue;return s}}if("next"===o.method)o.sent=o._sent=o.arg;else if("throw"===o.method){if("suspendedStart"===r)throw r="completed",o.arg;o.dispatchException(o.arg)}else"return"===o.method&&o.abrupt("return",o.arg);r="executing";var a=d(t,e,o);if("normal"===a.type){if(r=o.done?"completed":"suspendedYield",a.arg===h)continue;return{value:a.arg,done:o.done}}"throw"===a.type&&(r="completed",o.method="throw",o.arg=a.arg)}}}(t,o,c),i}function d(t,e,o){try{return{type:"normal",arg:t.call(e,o)}}catch(T){return{type:"throw",arg:T}}}t.wrap=l;var h={};function f(){}function p(){}function _(){}var g={};u(g,c,(function(){return this}));var m=Object.getPrototypeOf,v=m&&m(m(k([])));v&&v!==e&&o.call(v,c)&&(g=v);var y=_.prototype=f.prototype=Object.create(g);function b(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){function r(i,c,s,a){var u=d(t[i],t,c);if("throw"!==u.type){var l=u.arg,h=l.value;return h&&"object"==n(h)&&o.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,s,a)}),(function(t){r("throw",t,s,a)})):e.resolve(h).then((function(t){l.value=t,s(l)}),(function(t){return r("throw",t,s,a)}))}a(u.arg)}var i;this._invoke=function(t,o){function n(){return new e((function(e,n){r(t,o,e,n)}))}return i=i?i.then(n,n):n()}}function x(t,e){var o=t.iterator[e.method];if(void 0===o){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method))return h;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var r=d(o,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,h;var n=r.arg;return n?n.done?(e[t.resultName]=n.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):n:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function $(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function k(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(o.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:S}}function S(){return{value:void 0,done:!0}}return p.prototype=_,u(y,"constructor",_),u(_,"constructor",p),p.displayName=u(_,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,_):(t.__proto__=_,u(t,a,"GeneratorFunction")),t.prototype=Object.create(y),t},t.awrap=function(t){return{__await:t}},b(w.prototype),u(w.prototype,s,(function(){return this})),t.AsyncIterator=w,t.async=function(e,o,r,n,i){void 0===i&&(i=Promise);var c=new w(l(e,o,r,n),i);return t.isGeneratorFunction(o)?c:c.next().then((function(t){return t.done?t.value:c.next()}))},b(y),u(y,a,"Generator"),u(y,c,(function(){return this})),u(y,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var o in t)e.push(o);return e.reverse(),function o(){for(;e.length;){var r=e.pop();if(r in t)return o.value=r,o.done=!1,o}return o.done=!0,o}},t.values=k,$.prototype={constructor:$,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(j),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(o,r){return c.type="throw",c.arg=t,e.next=o,r&&(e.method="next",e.arg=void 0),!!r}for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n],c=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var s=o.call(i,"catchLoc"),a=o.call(i,"finallyLoc");if(s&&a){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!a)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var c=i?i.completion:{};return c.type=t,c.arg=e,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.finallyLoc===t)return this.complete(o.completion,o.afterLoc),j(o),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc===t){var r=o.completion;if("throw"===r.type){var n=r.arg;j(o)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,o){return this.delegate={iterator:k(t),resultName:e,nextLoc:o},"next"===this.method&&(this.arg=void 0),h}},t}function c(t,e,o,r,n,i,c){try{var s=t[i](c),a=s.value}catch(u){return void o(u)}s.done?e(a):Promise.resolve(a).then(r,n)}function s(t){return function(){var e=this,o=arguments;return new Promise((function(r,n){var i=t.apply(e,o);function s(t){c(i,r,n,s,a,"next",t)}function a(t){c(i,r,n,s,a,"throw",t)}s(void 0)}))}}var a=function(){Promise.all([o.e("common/vendor"),o.e("components/diy/div_mall_center")]).then(function(){return resolve(o("b8ec"))}.bind(null,o)).catch(o.oe)},u=function(){o.e("components/diy/div_goods").then(function(){return resolve(o("39af"))}.bind(null,o)).catch(o.oe)},l=function(){o.e("components/diy/list_comment").then(function(){return resolve(o("0ff7"))}.bind(null,o)).catch(o.oe)},d=function(){o.e("components/diy/bar_title").then(function(){return resolve(o("a3ca"))}.bind(null,o)).catch(o.oe)},h=function(){o.e("components/diy/bar_goods_nav").then(function(){return resolve(o("3cc0"))}.bind(null,o)).catch(o.oe)};e["a"]={mixins:[r["a"]],components:{div_mall_center:a,div_goods:u,list_comment:l,bar_title:d,bar_goods_nav:h},data:function(){return{url_get_obj:"~/api/goods/get_obj?",field:"goods_id",query:{goods_id:0},right_options:[{icon:"headphones",text:"客服"},{icon:"cart",text:"购物车"},{icon:"heart",text:"收藏"}],buttonGroup:[{text:"加入购物车",backgroundColor:"#ff0000",color:"#fff"},{text:"立即购买",backgroundColor:"#ffa200",color:"#fff"}],obj:{goods_id:0,title:"",img:"",description:"",price_ago:0,price:0,sales:0,inventory:0,type:"",hits:0,content:"",create_time:"",update_time:"",img_1:"",img_2:"",img_3:"",img_4:"",img_5:"",source_table:"",source_field:"",source_id:0,customize_field:"",user_id:0},list_comment:[],bar_title:"评论区",bar_url:"",form_comment:{source_table:"goods",source_field:"goods_id",source_id:0,reply_to_id:0},check_collected:!1,comment_flag:!0,isAdmin:!1,chatList:[],showChat:!1,isSmall:!1,scrollTop:0,oldScrollTop:0,token:"",sendValue:"",vip_discount:0}},methods:{get_user_vip_discount:function(){var t=this;return s(i().mark((function e(){var o;return i().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$get("~/api/user/get_obj?user_id="+t.$store.state.user.user_id);case 2:o=e.sent,o.result&&o.result.obj&&(t.vip_discount=o.result.obj.vip_discount);case 4:case"end":return e.stop()}}),e)})))()},toToggle:function(){this.isAdmin=!this.isAdmin},openSupportModal:function(){var e=this,o=t.getStorageSync("supportChat");if(this.isAdmin="管理员"==t.getStorageSync("auth")[0].user_group,this.token=this.token||t.getStorageSync("token")||"",o&&(this.chatList=JSON.parse(o)),!this.token)return t.showToast({title:"请先进行登录",icon:"none"});console.log("打开客服"),this.showChat=!this.showChat,this.chatList.length&&this.showChat&&setTimeout((function(){e.scrollBottom()}),0)},scaleSmall:function(){this.isSmall=!this.isSmall},getChat:function(){},scroll:function(t){this.oldScrollTop=t.detail.scrollTop},scrollBottom:function(){var e=this;t.createSelectorQuery().select(".support_content").boundingClientRect((function(t){var o=t.bottom+t.height;e.scrollTop=e.oldScrollTop,e.$nextTick((function(){e.scrollTop=o+5e3}))})).exec()},sendChat:function(){var e=this,o=new Date(+new Date+288e5).toJSON().substr(0,16).replace("T"," "),r=(new Date).getTime(),n="",i=12e3;if(!this.sendValue)return t.showToast({title:"不能发送空内容",icon:"none"});this.chatList.length&&(n=r-this.chatList[this.chatList.length-1]["nowTime"]>i?o:""),!this.chatList.length&&(n=o);var c={isAdmin:this.isAdmin,content:this.sendValue,sendTime:n,nowTime:r};this.chatList.push(c),setTimeout((function(){e.scrollBottom()}),0),t.setStorageSync("supportChat",JSON.stringify(this.chatList)),this.sendValue=""},onClick:function(t){0===t.index?this.openSupportModal():1===t.index?this.$nav("/pages/cart/list"):2===t.index&&this.add_collect(t.index)},buttonClick:function(t){console.log(t),0===t.index?this.add_cart():1===t.index&&this.buy_now()},get_collect:function(){var t=this,e=this.user.user_id,o=this.obj.goods_id,r={source_table:"goods",source_field:"goods_id",source_id:o,user_id:e};this.$get("~/api/collect/count?",r,(function(e){if(e.result||0===e.result){var o=!!e.result;t.check_collected=o,t.check_collected?t.right_options[2].icon="heart-filled":t.right_options[2].icon="heart",console.log("收藏状态："+o)}else e.error&&console.error(e.error)}))},add_collect:function(t){var e=this,o=this.obj,r=o.title,n=o.img,i=o.goods_id,c={title:r,img:n,source_table:"goods",source_field:"goods_id",source_id:i,user_id:this.$store.state.user.user_id};this.check_collected?(this.check_collected=!1,this.right_options[t].icon="heart",this.$get("~/api/collect/del",c,(function(t){e.$toast("取消收藏")}))):(this.check_collected=!0,this.right_options[t].icon="heart-filled",this.$post("~/api/collect/add?",c,(function(t){e.$toast("收藏成功"),console.log(t)})))},add_cart:function(){var t=this,e=this.obj,o=e.title,r=e.img,n=e.price,i=e.price_ago,c=e.description,s=e.goods_id,a=e.type,u={title:o,img:r,price:n,price_ago:i,price_count:n,description:c,goods_id:s,type:a,user_id:this.$store.state.user.user_id};this.$get("~/api/cart/get_list?",{goods_id:this.obj.goods_id,user_id:u.user_id},(function(e){if(e.result.count){var o=e.result.list[0],r=o.cart_id,n=o.num,i=o.price,c=o.price_count;n+=1,c+=i,t.$post("~/api/cart/set?cart_id=".concat(r),{num:n,price:i,price_count:c},(function(e){t.$toast("已加入购物车","成功"),console.log("更改值")}))}else t.$post("~/api/cart/add?",u,(function(e){t.$toast("已加入购物车","成功")}))}))},order_code:function(){for(var t="",e=0;e<6;e++)t+=Math.floor(10*Math.random());return t=(new Date).getTime()+t,t},buy_now:function(){var t=this;return s(i().mark((function e(){var o,r,n,c,s,a,u,l,d,h,f,p,_,g,m,v,y,b;return i().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.obj.inventory<1)){e.next=3;break}return t.$toast("库存不足"),e.abrupt("return");case 3:return o=t.obj,r=o.title,n=o.img,c=o.price,s=o.price_ago,a=o.description,u=o.type,l=o.goods_id,d=t.$store.state.user.user_id,h=new Promise((function(e,o){t.$get("~/api/address/get_obj?",{user_id:d,default:1},(function(o){o.result&&o.result.obj?e(o.result.obj):t.$toast("地址未添加")}))})).catch((function(t){})),e.next=8,h;case 8:f=e.sent,p=f.name,_=f.phone,g=f.address,m=f.postcode,v=c,t.vip_discount>0&&(v*=t.vip_discount),y=t.order_code(),b={order_number:y,goods_id:l,title:r,type:u,img:n,price:c,price_ago:s,price_count:v,num:1,contact_name:p,contact_phone:_,contact_address:g,postal_code:m,user_id:d,description:a,merchant_id:t.obj.user_id},console.log(b),t.$post("~/api/order/add?",b,(function(e){t.$toast("加入订单成功"),t.$nav("/pages/order/details?order_number="+y)}));case 19:case"end":return e.stop()}}),e)})))()},get_obj_after:function(t){var e=this,o=this.obj;this.get_comment(o),this.form_comment.source_id=o.goods_id,this.$get("~/api/order/get_obj?",{goods_id:this.obj.goods_id,user_id:this.$store.state.user.user_id,state:"已付款"},(function(t){t.result&&t.result.obj?console.log(t.result):e.comment_flag=!1}))},get_comment:function(){var t=this,e=getCurrentPages()[getCurrentPages().length-1].options,o={source_table:"goods",source_field:"goods_id",source_id:e.goods_id,orderby:"create_time desc",reply_to_id:"0"};this.$get("~/api/comment/get_list?",o,(function(e){if(e.result){var o=e.result.list;o.map((function(t){t.list_reply=[]})),t.add_reply(o).then((function(e){t.list_comment=e}))}}))},add_reply:function(t){var e=this;return new Promise((function(o){for(var r=function(o){var r=t[o];e.$get("~/api/comment/get_list?",{source_table:"goods",source_field:"goods_id",source_id:r.goods_id,orderby:"create_time desc",reply_to_id:r.comment_id},(function(t){t.result&&(r.list_reply=t.result.list)}))},n=0;n<t.length;n++)r(n);o(t)})).catch((function(t){}))}},onLoad:function(){this.get_comment(),this.get_collect(),this.get_user_vip_discount()}}}).call(this,o("543d")["default"])},"93c4":function(t,e,o){},be3e:function(t,e,o){"use strict";var r,n,i=function(){var t=this,e=t.$createElement,o=(t._self._c,t.$setRichTextImage(t.obj.content)),r=t.$check_action("/comment/list","get"),n=t.$check_action("/comment/list","get"),i=t.$check_action("/comment/list","add")&&t.comment_flag,c=!t.obj.source_table||t.$check_cart_page("/"+t.obj.source_table+"/details");t.$mp.data=Object.assign({},{$root:{m0:o,m1:r,m2:n,m3:i,m4:c}})},c=[],s=o("475e"),a=s["a"],u=(o("37b3"),o("f0c5")),l=Object(u["a"])(a,i,c,!1,null,null,null,!1,r,n);e["a"]=l.exports},e531:function(t,e,o){"use strict";o.r(e),function(t){o("6cdc"),o("66fd");var e=o("be3e");wx.__webpack_require_UNI_MP_PLUGIN__=o,t(e["a"])}.call(this,o("543d")["createPage"])}},[["e531","common/runtime","common/vendor"]]]);