<template>
	<view class="diy_details diy_div_i_want_to_customize">
		<view v-if="Object.keys(obj).length!==0" class="warp">
			<view class="container">
				<view class="row">
					<view v-if="$check_field('get','order_number')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>订单号:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["order_number"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','product_number')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>商品编号:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["product_number"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','product_name')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>商品名称:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["product_name"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','cover')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>封面:</span>
						</view>
							<view class="diy_field diy_img">
							<image style="width:100%;height:auto;" :src="$fullUrl(obj['cover'])" mode="widthFix"></image>
						</view>
						</view>
					<view v-if="$check_field('get','money')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>金额:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["money"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','seller')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>卖家:</span>
						</view>
							<view class="diy_field diy_uid">
							<text>
								{{ get_user_seller(obj['seller']) }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','purchasing_users')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>购买用户:</span>
						</view>
							<view class="diy_field diy_uid">
							<text>
								{{ get_user_purchasing_users(obj['purchasing_users']) }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','purchase_quantity')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>购买数量:</span>
						</view>
							<view class="diy_field diy_number">
							<text>
								{{ obj["purchase_quantity"] }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','total_amount')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>总金额:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["total_amount"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','customized_time')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>定制时间:</span>
						</view>
							<view class="diy_field diy_datetime">
							<text>
								{{ $toTime(obj["customized_time"],"yyyy-MM-dd hh:mm:ss") }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','requirement_document')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>需求文件:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["requirement_document"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','remarks')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>备注:</span>
						</view>
							<view class="diy_field diy_desc">
							<text>
								{{ obj["remarks"] }}
							</text>
						</view>
						</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import mixin from "@/libs/mixins/component.js";
	export default {
		mixins: [mixin],
		props: {
			obj_goods: {
				type: Object,
				default(){
					return {}
				}
			},
			query:{
				type: Object,
				default(){
					return {
						i_want_to_customize_id: 0
					}
				}
			}
		},
		data() {
			return {
				obj_goods_type: {},
				obj: {},
										// 用户列表
				list_user_seller: [],
						// 用户列表
				list_user_purchasing_users: [],
									}
		},
		methods: {
			async get_obj_goods_type() {
				var res = await this.$get(getApp().globalData.host + "/api/goods_type/get_obj", {
					name: this.obj_goods.type
				})

				if (res.result.obj) {
					this.obj_goods_type = res.result.obj
				} else {
					console.log("没有请求到商品分类");
				}
			},
			async get_obj_by_goods() {
				var {
					source_table,
					source_field
				} = this.obj_goods_type
				var {
					source_id
				} = this.obj_goods
				var query = {}
				query[source_field] = source_id
				this.$get(getApp().globalData.host + "/api/" + source_table + "/get_obj", {}, (res) => {
					if (res.result.obj) {
						this.obj = res.result.obj
					} else {
						console.log("没有请求到商品分类");
					}
				})
			},
			async get_obj_by_id(){
				var res = await this.$get(getApp().globalData.host + "/api/i_want_to_customize/get_obj", {
					i_want_to_customize_id:this.query.i_want_to_customize_id
				})

				if (res.result && res.result.obj) {
					this.obj = res.result.obj
				} else {
					console.log("没有请求到商品分类");
				}
			},
									/**
			 * 获取商城卖家用户列表
			 */
			async get_list_user_seller() {
				var json = await this.$get(getApp().globalData.host + "/api/user/get_list?user_group=商城卖家");
				if(json.result && json.result.list){
					this.list_user_seller = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_seller(id){
				let obj = this.list_user_seller;
				let ret = "";
				for(let i=0;i<obj.length;i++){
					if(obj[i].user_id==id){
						ret = obj[i].nickname+"-"+obj[i].username;
					}
				}
				return ret;
			},
					/**
			 * 获取注册用户用户列表
			 */
			async get_list_user_purchasing_users() {
				var json = await this.$get(getApp().globalData.host + "/api/user/get_list?user_group=注册用户");
				if(json.result && json.result.list){
					this.list_user_purchasing_users = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_purchasing_users(id){
				let obj = this.list_user_purchasing_users;
				let ret = "";
				for(let i=0;i<obj.length;i++){
					if(obj[i].user_id==id){
						ret = obj[i].nickname+"-"+obj[i].username;
					}
				}
				return ret;
			},
								},
		created() {
									this.get_list_user_seller();
					this.get_list_user_purchasing_users();
								},
		async onLoad(){
			if (Object.keys(this.obj_goods).length !== 0) {
				await this.get_obj_goods_type();
				await this.get_obj_by_goods();
			} else if (this.query["i_want_to_customize_id"] !==0) {
				await this.get_obj_by_id();
			}
		}
	}
</script>

<style scoped>
	.div_i_want_to_customize_details {}

	.details {
		background-color: #fff;
		margin-bottom: 0.5rem;
		padding: 1rem;
		font-size: 10px;
	}

	.item {
		display: flex;
		padding: 0.2rem 0;
		border-bottom: 1px solid #eee;
	}

	.left_text {
		flex: 0 0 25%;
	}

	.right_text {
		flex: 0 0 75%;
	}
	.edit_nav{
		text-align: center;
		background-color: #fff;
		padding: 0.3rem;
		margin: 0.1rem 1rem;
		border: 1px solid #eee;
		border-radius: 0.5rem;
	}
</style>
