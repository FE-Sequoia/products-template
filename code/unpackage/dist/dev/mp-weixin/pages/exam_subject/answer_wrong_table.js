(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/exam_subject/answer_wrong_table"],{"10f0":function(n,e,t){},"8dce":function(n,e,t){"use strict";t.r(e),function(n){t("6cdc"),t("66fd");var e=t("ecc5");wx.__webpack_require_UNI_MP_PLUGIN__=t,n(e["a"])}.call(this,t("543d")["createPage"])},beb4:function(n,e,t){"use strict";var i=t("10f0"),u=t.n(i);u.a},ecc5:function(n,e,t){"use strict";var i,u={uniSearchBar:function(){return t.e("components/uni-search-bar/uni-search-bar").then(t.bind(null,"1c61"))},uniIcons:function(){return Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(t.bind(null,"2ba4"))},uniTable:function(){return t.e("components/uni-table/uni-table").then(t.bind(null,"d81d"))},uniTr:function(){return t.e("components/uni-tr/uni-tr").then(t.bind(null,"cb91"))},uniTh:function(){return t.e("components/uni-th/uni-th").then(t.bind(null,"225e"))},uniTd:function(){return t.e("components/uni-td/uni-td").then(t.bind(null,"6c11"))},uniPagination:function(){return t.e("components/uni-pagination/uni-pagination").then(t.bind(null,"9f41"))}},r=function(){var n=this,e=n.$createElement,t=(n._self._c,n.$check_action("/user_answer_wrong/table","get")),i=t?n.__map(n.list,(function(e,t){var i=n.__get_orig(e),u=n.$toTime(e["create_time"],"yyyy-MM-dd hh:mm:ss");return{$orig:i,m1:u}})):null;n.$mp.data=Object.assign({},{$root:{m0:t,l0:i}})},c=[],o=t("dc88"),a={mixins:[o["a"]],data:function(){return{url_get_list:"~/api/user_answer_wrong/get_list?like=0",field:"user_answer_id",query:{size:10,page:1,title:"",user_id:this.$store.state.user.user_id,orderby:"create_time desc"},user:{}}},methods:{search_:function(){this.query.page=1,this.get_list()},input:function(n,e){this.query[e]=n.value}}},s=a,l=(t("beb4"),t("f0c5")),_=Object(l["a"])(s,r,c,!1,null,null,null,!1,u,i);e["a"]=_.exports}},[["8dce","common/runtime","common/vendor"]]]);