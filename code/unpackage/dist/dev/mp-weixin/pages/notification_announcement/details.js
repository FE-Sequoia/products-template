(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/notification_announcement/details"],{3111:function(e,n,t){"use strict";t.r(n),function(e){t("6cdc"),t("66fd");var n=t("e8fe");wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n["a"])}.call(this,t("543d")["createPage"])},3203:function(e,n,t){},"8cb4":function(e,n,t){"use strict";(function(e){var o=t("dc88"),i=function(){t.e("components/diy/list_comment").then(function(){return resolve(t("0ff7"))}.bind(null,t)).catch(t.oe)},r=function(){t.e("components/diy/bar_title").then(function(){return resolve(t("a3ca"))}.bind(null,t)).catch(t.oe)},c=function(){t.e("components/diy/form_editor").then(function(){return resolve(t("56c9"))}.bind(null,t)).catch(t.oe)};n["a"]={mixins:[o["a"]],components:{list_comment:i,bar_title:r,form_editor:c},data:function(){return{url_get_obj:"~/api/notification_announcement/get_obj?",field:"notification_announcement_id",query:{notification_announcement_id:0},obj:{announcement_title:"",publisher:"",release_time:"",announcement_type:"",announcement_content:"",hits:0,praise_len:0,notification_announcement_id:0},praise:0,state_praise:!1,collect:0,state_collect:!1,list_comment:[],bar_title:"评论区",bar_url:""}},methods:{openUrl:function(n){console.log(1111),e.navigateTo({url:"/pages/webview/webview?url=".concat(n)})},get_praise:function(e){var n=this,t=this.user.user_id;this.$get("~/api/praise/count?",{source_table:"notification_announcement",source_field:"notification_announcement_id",source_id:e["notification_announcement_id"]},(function(e){e.result||0===e.result?(n.praise=e.result,console.log("点赞数：",e.result)):e.error&&(n.$toast(e.error.message),console.error(e.error))})),this.$get("~/api/praise/count?",{source_table:"notification_announcement",source_field:"notification_announcement_id",source_id:e["notification_announcement_id"],user_id:t},(function(e){e.result||0===e.result?(n.state_praise=!!e.result,console.log("点赞状态：",e.result)):e.error&&(n.$toast(e.error.message),console.error(e.error))}))},change_praise:function(e){var n=this,t=this.user.user_id,o={source_table:"notification_announcement",source_field:"notification_announcement_id",source_id:this.obj["notification_announcement_id"],user_id:t},i=this;i.obj.praise_len=parseInt(i.obj.praise_len),this.state_praise?(this.state_praise=!1,this.$get("~/api/praise/del?",o,(function(e){if(e.result){var t=i.obj.praise_len-1;n.$post("~/api/notification_announcement/set?notification_announcement_id="+i.obj["notification_announcement_id"],{praise_len:t},(function(e){e.result?console.log("添加点赞数状态：",e.result):e.error&&console.error(e.error)})),n.$toast("取消点赞")}else e.error&&(n.$toast(e.error.message),console.error(e.error))}))):(this.state_praise=!0,this.$post("~/api/praise/add?",o,(function(e){if(e.result){var t=i.obj.praise_len+1;n.$post("~/api/notification_announcement/set?notification_announcement_id="+i.obj["notification_announcement_id"],{praise_len:t},(function(e){e.result?console.log("添加点赞数状态：",e.result):e.error&&console.error(e.error)})),n.$toast("点赞成功")}else e.error&&(n.$toast(e.error.message),console.error(e.error))})))},get_comment:function(e){var n=this;this.$get("~/api/comment/get_list?",{source_table:"notification_announcement",source_field:"notification_announcement_id",source_id:e["notification_announcement_id"]},(function(e){if(e.result&&e.result.list){var t=e.result.list;n.list_comment=t,console.log("评论请求结果：",t)}else e.error&&console.error(e.error)}))},add_hits:function(e){var n=this;e["hits"]=e["hits"]+1;var t=e["hits"];this.$post("~/api/notification_announcement/set?notification_announcement_id="+e["notification_announcement_id"],{hits:t},(function(e){if(e.result){console.log("添加访问量状态：",e.result);var t={source_table:"notification_announcement",source_field:"notification_announcement_id",source_id:n.obj.notification_announcement_id,user_id:n.$store.state.user.user_id};n.$post("~/api/hits/add?",t,(function(e){console.log(e)}))}else e.error&&console.error(e.error)}))},get_obj_after:function(e){if(this.obj){var n=this.obj;this.get_praise(n),this.get_comment(n),this.add_hits(n)}}},created:function(){},mounted:function(){}}}).call(this,t("543d")["default"])},e8fe:function(e,n,t){"use strict";var o,i,r=function(){var e=this,n=e.$createElement,t=(e._self._c,e.$check_field("get","announcement_title")),o=e.$check_field("get","publisher"),i=e.$check_field("get","release_time"),r=i?e.$toTime(e.obj["release_time"],"yyyy-MM-dd hh:mm:ss"):null,c=e.$check_field("get","announcement_type"),s=e.$check_field("get","announcement_content");e.$mp.data=Object.assign({},{$root:{m0:t,m1:o,m2:i,m3:r,m4:c,m5:s}})},c=[],s=t("8cb4"),a=s["a"],u=(t("fdac"),t("f0c5")),_=Object(u["a"])(a,r,c,!1,null,null,null,!1,o,i);n["a"]=_.exports},fdac:function(e,n,t){"use strict";var o=t("3203"),i=t.n(o);i.a}},[["3111","common/runtime","common/vendor"]]]);