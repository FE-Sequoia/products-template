(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/message/list"],{"3ae5":function(n,e,t){"use strict";t.r(e),function(n){t("6cdc"),t("66fd");var e=t("9e77");wx.__webpack_require_UNI_MP_PLUGIN__=t,n(e["a"])}.call(this,t("543d")["createPage"])},"98f7":function(n,e,t){"use strict";var i=t("c8b5"),a=t.n(i);a.a},"9e77":function(n,e,t){"use strict";var i,a={uniSearchBar:function(){return t.e("components/uni-search-bar/uni-search-bar").then(t.bind(null,"1c61"))},uniIcons:function(){return Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(t.bind(null,"2ba4"))},uniPagination:function(){return t.e("components/uni-pagination/uni-pagination").then(t.bind(null,"9f41"))}},c=function(){var n=this,e=n.$createElement,t=(n._self._c,"管理员"==n.user_group||n.$check_action("/message/edit","add"));n.$mp.data=Object.assign({},{$root:{m0:t}})},o=[],s=t("dc88"),r=function(){t.e("components/diy/list_message").then(function(){return resolve(t("6024"))}.bind(null,t)).catch(t.oe)},u={mixins:[s["a"]],components:{list_message:r},data:function(){return{url_get_list:"~/api/message/get_list?like=0",query:{page:1,size:7,orderby:"create_time asc"}}},methods:{get_list_before:function(n){return n},get_list_after:function(n){}}},l=u,m=(t("98f7"),t("f0c5")),f=Object(m["a"])(l,c,o,!1,null,"b35986da",null,!1,a,i);e["a"]=f.exports},c8b5:function(n,e,t){}},[["3ae5","common/runtime","common/vendor"]]]);