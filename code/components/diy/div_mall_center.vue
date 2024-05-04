<template>
	<view class="diy_details diy_div_mall_center">
		<view v-if="Object.keys(obj).length!==0" class="warp">
			<view class="container">
				<view class="row">
					<view v-if="$check_field('get','mall_seller')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>商城卖家:</span>
						</view>
							<view class="diy_field diy_uid">
							<text>
								{{ get_user_mall_seller(obj['mall_seller']) }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','merchant_name')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>商家姓名:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["merchant_name"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','production_date')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>生产日期:</span>
						</view>
							<view class="diy_field diy_date">
							<text>
								{{ $toTime(obj["production_date"],"yyyy-MM-dd") }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','shelf_life')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>保质期:</span>
						</view>
							<view class="diy_field diy_datetime">
							<text>
								{{ $toTime(obj["shelf_life"],"yyyy-MM-dd hh:mm:ss") }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','label')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>标签:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["label"]}}
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
						mall_center_id: 0
					}
				}
			}
		},
		data() {
			return {
				obj_goods_type: {},
				obj: {},
					// 用户列表
				list_user_mall_seller: [],
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
				var res = await this.$get(getApp().globalData.host + "/api/mall_center/get_obj", {
					mall_center_id:this.query.mall_center_id
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
			async get_list_user_mall_seller() {
				var json = await this.$get(getApp().globalData.host + "/api/user/get_list?user_group=商城卖家");
				if(json.result && json.result.list){
					this.list_user_mall_seller = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_mall_seller(id){
				let obj = this.list_user_mall_seller;
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
				this.get_list_user_mall_seller();
							},
		async onLoad(){
			if (Object.keys(this.obj_goods).length !== 0) {
				await this.get_obj_goods_type();
				await this.get_obj_by_goods();
			} else if (this.query["mall_center_id"] !==0) {
				await this.get_obj_by_id();
			}
		}
	}
</script>

<style scoped>
	.div_mall_center_details {}

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
