(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/forum/list"],{"6bf3":function(t,e,n){},7833:function(t,e,n){"use strict";var i,u={uniSearchBar:function(){return n.e("components/uni-search-bar/uni-search-bar").then(n.bind(null,"1c61"))},uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-icons/uni-icons")]).then(n.bind(null,"2ba4"))},uniDataSelect:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-data-select/uni-data-select")]).then(n.bind(null,"b904"))},uniPagination:function(){return n.e("components/uni-pagination/uni-pagination").then(n.bind(null,"9f41"))}},s=function(){var t=this,e=t.$createElement,n=(t._self._c,"管理员"==t.user_group||t.$check_action("/forum/list","add")),i=t.$check_action("/forum/list","get");t.$mp.data=Object.assign({},{$root:{m0:n,m1:i}})},a=[],o=n("dc88"),c=function(){n.e("components/diy/list_forum").then(function(){return resolve(n("7da2"))}.bind(null,n)).catch(n.oe)},r={mixins:[o["a"]],components:{list_forum:c},data:function(){return{url_get_list:"~/api/forum/get_list?like=0",list:[],query:{title:"",page:1,size:3,type:""},list_forum_type:[{value:"",text:"全部"}],type_names:[],filter_title:"筛选",sort_title:"排序",sort_list:[{name:"热度从高到低",value:"`hits` desc"},{name:"热度从低到高",value:"`hits` asc"},{name:"更新时间从高到低",value:"`create_time` desc"},{name:"更新时间从低到高",value:"`create_time` asc"}]}},methods:{get_forum_type:function(){var t=this;this.$get("~/api/forum_type/get_list",{},(function(e){e.result&&e.result.list.map((function(e){return t.list_forum_type.push({value:e.name,text:e.name})}))}))},filter_item:function(t){"全部"==t.name?(this.query={page:1,size:10},this.get_list()):(this.query.type=t.name,this.search_())},sort_item:function(t){this.query.orderby=t.name.value,this.search_()},input:function(t,e){this.query[e]=t.value},search_:function(){this.query.page=1,this.get_list()},searchType:function(t){this.query.type=t,this.query.page=1,this.get_list()},cancel:function(){this.query.title="",this.search_()}},mounted:function(){this.get_forum_type()}},l=r,m=(n("d749"),n("f0c5")),_=Object(m["a"])(l,s,a,!1,null,"7545d296",null,!1,u,i);e["a"]=_.exports},c694:function(t,e,n){"use strict";n.r(e),function(t){n("6cdc"),n("66fd");var e=n("7833");wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e["a"])}.call(this,n("543d")["createPage"])},d749:function(t,e,n){"use strict";var i=n("6bf3"),u=n.n(i);u.a}},[["c694","common/runtime","common/vendor"]]]);