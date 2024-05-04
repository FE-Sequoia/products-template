(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/diy/bar_goods_nav"],{"1fae":function(n,t,o){"use strict";var e=o("ca64"),c=o.n(e);c.a},"3cc0":function(n,t,o){"use strict";o.r(t);var e,c={uniIcons:function(){return Promise.all([o.e("common/vendor"),o.e("components/uni-icons/uni-icons")]).then(o.bind(null,"2ba4"))}},i=function(){var n=this,t=n.$createElement;n._self._c},a=[],l={name:"UniGoodsNav",props:{options:{type:Array,default:function(){return[{icon:"shop",text:"店铺"},{icon:"cart",text:"购物车"}]}},buttonGroup:{type:Array,default:function(){return[{text:"加入购物车",backgroundColor:"#ffa200",color:"#fff"},{text:"立即购买",backgroundColor:"#ff0000",color:"#fff"}]}},isEllipse:{type:Boolean,default:!1},cart_action:{type:Boolean,default:!0}},methods:{onClick:function(n,t){this.$emit("click",{index:n,content:t})},buttonClick:function(n,t){this.$emit("buttonClick",{index:n,content:t})}}},u=l,r=(o("1fae"),o("f0c5")),f=Object(r["a"])(u,i,a,!1,null,null,null,!1,c,e);t["default"]=f.exports},ca64:function(n,t,o){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/diy/bar_goods_nav-create-component',
    {
        'components/diy/bar_goods_nav-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3cc0"))
        })
    },
    [['components/diy/bar_goods_nav-create-component']]
]);
