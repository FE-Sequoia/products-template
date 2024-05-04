(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/diy/list_notification_announcement"],{"3afe":function(n,e,t){"use strict";var i=t("6217"),o=t.n(i);o.a},6217:function(n,e,t){},"72ed":function(n,e,t){"use strict";var i;t.r(e);var o,a=function(){var n=this,e=n.$createElement,t=(n._self._c,n.$check_index_field("get","announcement_title","/notification_announcement/list")),i=n.$check_index_field("get","publisher","/notification_announcement/list"),o=n.$check_index_field("get","release_time","/notification_announcement/list"),a=n.$check_index_field("get","announcement_type","/notification_announcement/list"),c=0,s=n.__map(n.list,(function(e,t){var i=n.__get_orig(e),a=o?n.$toTime(e["release_time"],"yyyy-MM-dd hh:mm:ss"):null,c=n.$toTime(e["create_time"],"yyyy-MM-dd hh:mm:ss");return{$orig:i,m3:a,m6:c}}));n.$mp.data=Object.assign({},{$root:{m0:t,m1:i,m2:o,m4:a,m5:c,l0:s}})},c=[],s={props:{list:{type:Array,default:function(){return[]}}},data:function(){return{}},methods:{to_nav:function(n){this.$nav("/pages/notification_announcement/details?notification_announcement_id="+n)}},created:function(){}},l=s,m=(t("3afe"),t("f0c5")),u=Object(m["a"])(l,a,c,!1,null,"41780934",null,!1,i,o);e["default"]=u.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/diy/list_notification_announcement-create-component',
    {
        'components/diy/list_notification_announcement-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("72ed"))
        })
    },
    [['components/diy/list_notification_announcement-create-component']]
]);
