(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/forum/details"],{"4d95":function(t,e,n){"use strict";n.r(e),function(t){n("6cdc"),n("66fd");var e=n("518d");wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e["a"])}.call(this,n("543d")["createPage"])},"518d":function(t,e,n){"use strict";var o,i={uniCard:function(){return n.e("components/uni-card/uni-card").then(n.bind(null,"cfb0"))}},c=function(){var t=this,e=t.$createElement,n=(t._self._c,t.$check_action("/forum/details","get")),o=n?t.$check_action("/comment/list","get"):null,i=n&&o?t.$check_action("/comment/list","get"):null,c=n?t.$check_action("/comment/list","add"):null;t.$mp.data=Object.assign({},{$root:{m0:n,m1:o,m2:i,m3:c}})},r=[],u=n("b634"),s=u["a"],a=(n("5629"),n("f0c5")),l=Object(a["a"])(s,c,r,!1,null,"503f279b",null,!1,i,o);e["a"]=l.exports},5629:function(t,e,n){"use strict";var o=n("9b18"),i=n.n(o);i.a},"9b18":function(t,e,n){},b634:function(t,e,n){"use strict";(function(t){var o=n("dc88"),i=function(){n.e("components/diy/bar_title").then(function(){return resolve(n("a3ca"))}.bind(null,n)).catch(n.oe)},c=function(){n.e("components/diy/div_forum").then(function(){return resolve(n("9e7f"))}.bind(null,n)).catch(n.oe)},r=function(){n.e("components/diy/list_comment").then(function(){return resolve(n("0ff7"))}.bind(null,n)).catch(n.oe)};e["a"]={mixins:[o["a"]],components:{bar_title:i,div_forum:c,list_comment:r},data:function(){return{url_get_obj:"~/api/forum/get_obj?",field:"forum_id",query:{forum_id:0},obj:{forum_id:0,display:0,user_id:0,nickname:"",hits:0,title:"",keywords:"",description:"",url:"",tag:"",img:"",content:"",create_time:"",update_time:"",avatar:"",type:"",praise_len:0},list_comment:[],form:{content:""},form_comment:{source_table:"forum",source_field:"forum_id",source_id:0,reply_to_id:0}}},methods:{onEditorReady:function(){var e=this;t.createSelectorQuery().select("#editor").context((function(t){e.editorCtx=t.context,e.editorCtx.setContents({html:e.form.content,success:function(t){console.log(t)},fail:function(t){console.log(t)}})})).exec()},get_comment:function(){var t=this,e=getCurrentPages()[getCurrentPages().length-1].options,n={source_table:"forum",source_field:"forum_id",source_id:e.forum_id,orderby:"create_time desc",reply_to_id:"0"};this.$get("~/api/comment/get_list?",n,(function(e){if(e.result){var n=e.result.list;n.map((function(t){t.list_reply=[]})),t.add_reply(n).then((function(e){t.list_comment=e}))}}))},add_reply:function(t){var e=this;return new Promise((function(n){for(var o=function(n){var o=t[n];e.$get("~/api/comment/get_list?",{source_table:"forum",source_field:"forum_id",source_id:o.forum_id,orderby:"create_time desc",reply_to_id:o.comment_id},(function(t){t.result&&(o.list_reply=t.result.list)}))},i=0;i<t.length;i++)o(i);n(t)})).catch((function(t){}))},editorChange:function(t){this.gongsijieshao=t.detail.html},get_obj_after:function(t){this.add_hits(this.obj),this.get_comment(this.obj),this.form_comment.source_id=this.obj.article_id},add_hits:function(t){this.$post("~/api/forum/set?forum_id="+t.forum_id,{hits:t.hits+1},(function(e){t.hits+=1,console.log(e)}))}},onLoad:function(){this.get_comment()}}}).call(this,n("543d")["default"])}},[["4d95","common/runtime","common/vendor"]]]);