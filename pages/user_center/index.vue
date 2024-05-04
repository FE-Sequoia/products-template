<template>
	<div class="page_user my_home" id="user_address">
		<div class="warp">
			<div class="container">
				<div class="row justify-content-between">
					<div class="col-12 col-md-3">
						<div class="card_menu">
							<!-- 左侧边栏 -->
						</div>
					</div>
					<div class="col-12 col-md-9">
						<div class="card_addres pl-2">
							<div class="warp">
								<div class="container-fluid">
									<div class="d-row-line">
										<div style="text-align: center;">数据统计中心</div>
									</div>
									<div class="d-row" style="height: 300px;">
																			<view class="d-col" v-if="user_group == '管理员' || $check_figure('/order/table')" :span="8">
											<div class="card chart">
												<h5 class="title">销售金额统计图</h5>
												<uni-datetime-picker v-model="line_obj_shop_money.month"
																	 type="daterange" @change="changeMonth($event, line_obj_shop_money)" :disabled="line_obj_shop_money.loading"/>
												<div style="margin-top: 10px;">销售金额总数：{{line_obj_shop_money.total}}</div>
												<newLineChart v-if="line_obj_shop_money.values.length > 0"
															  id="line_shop_money_chart" :vm="line_obj_shop_money"
															  :title="'销售金额统计'">
												</newLineChart>
												<div v-else style="text-align: center;margin-top: 20px;">正在加载数据...请稍后</div>
											</div>
										</view>
										<view class="d-col" v-if="user_group == '管理员' || $check_figure('/order/table')" :span="8">
											<div class="card chart">
												<h5 class="title">销售数量统计图</h5>
												<uni-datetime-picker v-model="bar_obj_shop_num.month"
																	 type="daterange" @change="changeMonth($event, bar_obj_shop_num)" :disabled="bar_obj_shop_num.loading"/>
												<div style="margin-top: 10px;">销售数量总数：{{bar_obj_shop_num.total}}</div>
												<newBarChart v-if="bar_obj_shop_num.values.length > 0"
															 id="bar_obj_bar_chart" :vm="bar_obj_shop_num" :title="'销售数量统计'">
												</newBarChart>
												<div v-else style="text-align: center;margin-top: 20px;">正在加载数据...请稍后</div>
											</div>
										</view>
																																																																																																			<view class="d-col" v-if="user_group == '管理员' || $check_figure('/customized_products/table')" :span="8">
															<div class="card chart">
																																																																																																																																																																																																																																																																																																																																																																																						</div>
														</view>
																																																																																																			<view class="d-col"
															  v-if="user_group !== '管理员' && !$check_option('/subject_exam/table','teacher') && $check_figure('/subject_exam/table')" :span="8">
															<div class="card chart">
																<h5 class="title">用户考试成绩统计</h5>
																<subjectExamCharts v-if="bar_obj_subject_exam.values.length > 0"
																					id="bar_obj_subject_exam" :vm="bar_obj_subject_exam" :title="'用户考试成绩统计统计'" @changeTab="get_url_subject_exam_list">
																</subjectExamCharts>
																<div v-if="!bar_obj_subject_exam.values.length">用户考试成绩统计没有符合条件的数据</div>
															</div>
														</view>
																			</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import mixin from "@/libs/mixins/page.js";
	import pieChart from "@/components/charts/pie_chart";
	import newBarChart from "@/components/charts/new_bar_chart";
	import newLineChart from "@/components/charts/new_line_chart";
	import subjectExamCharts from "@/components/charts/subject_exam_charts.vue";
	export default {
		mixins: [mixin],
		data() {
			return {
					activeName: "third",
																																																																							list_customized_products: [],
																																																																												line_obj_shop_money: {
										type: "money",
										names: ["销售金额"],
										xAxis: [],
										values: [],
										month: [],
										loading: false,
										total: 0
									},
									bar_obj_shop_num: {
										type: "num",
										names: ["销售数量"],
										xAxis: [],
										values: [],
										month: [],
										loading: false,
										total: 0
									},
																			url_message_count: "~/api/message/count?",
														url_user_count: "~/api/user/count?",
														url_article_hits: "~/api/article/sum?field=hits",
																			bar_obj_subject_exam: {
										names: [],
										xAxis: [],
										values: [],
										tabs: []
									},
									};
		},
		mounted() {
		},
		methods: {
			async get_nickname(list,flag){
				if (flag) {
					for (let i=0;i<list.length;i++){
						await this.$get(
								"~/api/user/get_obj?user_id="+list[i],
								null,
								(json) => {
									if (json.result) {
										list[i] = json.result.obj.nickname;
									}
								});
					}
				}else {
					for (let i=0;i<list.length;i++){
						await this.$get(
								"~/api/user/get_obj?user_id="+list[i].name,
								null,
								(json) => {
									if (json.result) {
										list[i].name = json.result.obj.nickname;
									}
								});
					}
				}
			},
			// 获取饼状图统计图数据
																																																																																																																																																																																																																																											// 获取指定日期的数据
				async get_order_month_some_price(date, o) {

					function getDateBetween(start, end) {
						var result = [];
						//使用传入参数的时间
						var startTime = new Date(start);
						var endTime = new Date(end);
						while (endTime - startTime >= 0) {
							let year = startTime.getFullYear();
							let month = startTime.getMonth();
							month = month < 9 ? '0' + (month + 1) : month + 1;
							let day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime
									.getDate();
							//加入数组
							result.push(year + "-" + month + "-" + day);
							//更新日期
							startTime.setDate(startTime.getDate() + 1);
						}
						return result;
					}

					const now = new Date();
					const nowYear = now.getFullYear();
					const nowMonth = now.getMonth() + 1;
					const nowDate = now.getDate();
					let days = []
					if (date) {
						days = getDateBetween(date[0], date[1])
					} else {
						o.month[0] = new Date(nowYear, nowMonth - 1, 1, 0, 0, 0).toStr("yyyy-MM-dd")
						o.month[1] = new Date(nowYear, nowMonth - 1, nowDate, 23, 59, 59).toStr("yyyy-MM-dd")
						days = getDateBetween(o.month[0], o.month[1])
					}

					o.xAxis = []
					o.values = []
					o.loading = true
					let list = {
						result: [],
						total: 0
					}
					let field = o.type === "money" ? "price_count" : "num"
					for (let i = 0; i < days.length; i++) {
						const t = new Date(days[i])
						const time = t.getFullYear() + "-" + (t.getMonth()+1) + "-" + t.getDate()
						o.xAxis.push((t.getMonth()+1) + "-" + t.getDate())
						await this.get_order_sum_price_sub(list, time, i, field)
					}
					o.loading = false
					o.values = list.result
					o.total = list.total
				},

				// 获取某一天的销售数量
				async get_order_sum_price_sub(list, date, index, field) {
					let user_group = this.$store.state.user.user_group;
					let user_id = this.$store.state.user.user_id;
					let time = new Date(date).toStr("yyyy-MM-dd");
					var $where = ""
					if (user_group != "管理员")
							$where = '&merchant_id=' + user_id
					const json = await this.$get(
							`~/api/order/sum?field=${field}&create_time_min=${time} 00:00:00&create_time_max=${time} 23:59:59&state=已付款` +
								$where,
							null,
					);
					list.result[index] = []
					if (json.result) {
						list.total += json.result
						list.result[index].push(json.result)
					} else {
						list.result[index].push(0)
					}
				},

				// 选择日期
				changeMonth(e, o) {
					this.get_order_month_some_price(e, o)
				},
							async get_url_subject_list() {
					const result = await this.$get("~/api/subject/get_list", null);
					for (let i = 0; i < result.result.list.length; i++) {
						this.bar_obj_subject_exam.tabs.push(result.result.list[i].name)
					}
					await this.get_url_subject_exam_list(this.bar_obj_subject_exam.tabs[0])
					this.bar_obj_subject_exam.names = [this.bar_obj_subject_exam.tabs[0]]
				},
				async get_url_subject_exam_list(e) {
					const json = await this.$get("~/api/subject_exam/get_list?subject_name=" + e)
					const allResult = []
					this.bar_obj_subject_exam.xAxis = []
					for (let j = 0; j < json.result.list.length; j++) {
						this.bar_obj_subject_exam.xAxis.push(json.result.list[j].name)
						const value = await this.$get("~/api/subject_user_answer/get_list", {
							user_id: this.$store.state.user.user_id,
							exam_id: json.result.list[j].exam_id,
						})
						for (let k = 0; k < value.result.list.length; k++) {
							allResult.push([value.result.list[k].score])
						}
					}
					this.bar_obj_subject_exam.values = allResult
					this.bar_obj_subject_exam.names = [e]
				},
			}
		,created() {
																																// 执行定制商品数据获取
				this.get_list_customized_products();
																																			this.get_order_month_some_price(null, this.line_obj_shop_money)
				this.get_order_month_some_price(null, this.bar_obj_shop_num)
										this.get_url_subject_list()
						}
		,components: {
			pieChart,
			newBarChart,
			newLineChart,
			subjectExamCharts,
		},
	};
</script>

<style scoped>
	.container {
		min-height: 800px;
		box-shadow: none;
	}
	h5.title {
		margin: 10px 0px;
	}
</style>
