<template>
	<div id="page_pay" class="page_pay">
		<div class="warp">
			<div class="container">
				<div class="row">
					<div class="col-12 col-md-6">
						<div v-for="item in coupon_list" :key="item.coupon_id" v-if="coupon_list.length>0">
							<div class="coupon_box">
								<div style="margin-left: 10px">
									<div>{{ item.coupon_name }}</div>
									<div>使用规则:满{{ item.coupon_price }}减 {{item.coupon_price1}}</div>
									<div>有效期：{{ item["coupon_time"].split(",")[0], "yyyy-MM-dd hh:mm:ss" }}
										到
										{{ item["coupon_time"].split(",")[1], "yyyy-MM-dd hh:mm:ss" }}
									</div>
								</div>
								<button :disabled="isDisabled(item.coupon_id)"
									style="margin-right: 10px;font-size: 0.7rem;" type="primary" @click="receive_coupon({
                      coupon_id: item.coupon_id,
                      is_use: 0
                    })">
									{{isDisabled(item.coupon_id)?"已领取":"领取"}}
								</button>
							</div>
						</div>
						<div v-if="coupon_list.length<=0" style="text-align: center;">无可领取的优惠券</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import mixin from "@/libs/mixins/page.js"

	export default {
		mixins: [mixin],

		components: {},
		data() {
			return {
				url_get_list: "~/api/coupon/get_list?like=0",
				field: "coupon_id",
				list: [],
				coupon_list: [],
				admin_userId: 0,
				coupon_user_list: [],
				goods_user_id: 0
			};
		},

		methods: {
			/**
			 * 获取用户
			 */
			async get_list_user() {
				var json = await this.$get("~/api/user/get_list?");
				if (json.result) {
					for (let i = 0; i < json.result.list.length; i++) {
						if (json.result.list[i].user_group === "管理员") {
							this.admin_userId = json.result.list[i].user_id
						}
					}
				} else if (json.error) {
					console.error(json.error);
				}
			},
			/**
			 *  领取优惠券
			 */
			receive_coupon(data) {
				data.user_id = this.$store.state.user.user_id
				this.$post("~/api/coupon_user/add", data, (res) => {
					if (res.result === 1) {
						this.get_coupon_user_list()
					}
				})
			},
			/**
			 *  当前用户的优惠券
			 */
			async get_coupon_user_list() {
				const result = await this.$get("~/api/coupon_user/get_list", {
					user_id: this.$store.state.user.user_id
				})
				this.coupon_user_list = result.result.list
			},
		},
		mounted() {
			console.log(this.$store);
		},
		computed: {
			isDisabled(id) {
				return function(id) {
					if (this.coupon_user_list) {
						for (let i = 0; i < this.coupon_user_list.length; i++) {
							if (this.coupon_user_list[i].coupon_id === id) {
								return true
							}
						}
					}
				}
			}
		},
		async created() {
			await this.get_list_user()
			await this.get_coupon_user_list()
		},
		watch: {
			list() {
				for (var j = 0; j < this.list.length; j++) {
					if (this.list[j].coupon_user_id == this.admin_userId || this.list[j].coupon_user_id == this.goods_user_id) {
						this.coupon_list.push(this.list[j])
					}
				}
			}
		},
		onLoad(e) {
			this.goods_user_id = e.user_id
		}
	};
</script>

<style scoped>
	.container {
		padding: 5px;
	}

	.coupon_box {
		width: 100%;
		height: 80px;
		border-radius: 5px;
		background: rgb(243, 116, 116);
		color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		font-size: 0.7rem;
	}
</style>