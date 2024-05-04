<template>
	<view class="diy_details diy_div_registered_users">
		<view v-if="Object.keys(obj).length!==0" class="warp">
			<view class="container">
				<view class="row">
					<view v-if="$check_field('get','name')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>姓名:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["name"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','gender')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>性别:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["gender"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','age')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>年龄:</span>
						</view>
							<view class="diy_field diy_number">
							<text>
								{{ obj["age"] }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','id_photo')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>证件照:</span>
						</view>
							<view class="diy_field diy_img">
							<image style="width:100%;height:auto;" :src="$fullUrl(obj['id_photo'])" mode="widthFix"></image>
						</view>
						</view>
					<view v-if="$check_field('get','date_of_birth')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>出生日期:</span>
						</view>
							<view class="diy_field diy_date">
							<text>
								{{ $toTime(obj["date_of_birth"],"yyyy-MM-dd") }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','registration_time')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>注册时间:</span>
						</view>
							<view class="diy_field diy_datetime">
							<text>
								{{ $toTime(obj["registration_time"],"yyyy-MM-dd hh:mm:ss") }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','resume')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>简历:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["resume"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','number')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>编号:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["number"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','classification_number')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>分类编号:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["classification_number"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','classification_categories')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>分类类别:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["classification_categories"]}}
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
					<view v-if="$check_field('get','id_card')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>身份证:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["id_card"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','mobile_phone')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>手机:</span>
						</view>
							<view class="diy_field diy_phone">
							<text>
								{{ obj['mobile_phone'] }}
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
						registered_users_id: 0
					}
				}
			}
		},
		data() {
			return {
				obj_goods_type: {},
				obj: {},
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
				var res = await this.$get(getApp().globalData.host + "/api/registered_users/get_obj", {
					registered_users_id:this.query.registered_users_id
				})

				if (res.result && res.result.obj) {
					this.obj = res.result.obj
				} else {
					console.log("没有请求到商品分类");
				}
			},
															},
		created() {
															},
		async onLoad(){
			if (Object.keys(this.obj_goods).length !== 0) {
				await this.get_obj_goods_type();
				await this.get_obj_by_goods();
			} else if (this.query["registered_users_id"] !==0) {
				await this.get_obj_by_id();
			}
		}
	}
</script>

<style scoped>
	.div_registered_users_details {}

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
