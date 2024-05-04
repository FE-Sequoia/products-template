<template>
	<div class="page_root" id="root_index">
		<div class="warp">
			<div class="container-fluid">
				<el-row>
<!--					<el-col :span="4">-->
<!--						<div_label bg_color="bg_red" icon="el-icon-message" :url="url_message_count" unit="条"-->
<!--								  title="留言信息"></div_label>-->
<!--					</el-col>-->
					<el-col :span="4">
						<div_label bg_color="bg_purple" icon="el-icon-user-solid" :url="url_user_count" unit="人"
								  title="用户数量"></div_label>
					</el-col>
<!--					<el-col :span="4">-->
<!--						<div_label bg_color="bg_green" icon="el-icon-view" :url="url_article_hits" unit="次"-->
<!--								  title="文章浏览量"></div_label>-->
<!--					</el-col>-->
				</el-row>

				<el-row>
					<el-col v-if="user_group == '管理员' || $check_figure('/order/table')" :span="8">
						<div v-loading="line_obj_shop_money.loading" class="card chart">
							<el-date-picker
									v-model="line_obj_shop_money.month"
									:default-time="['00:00:00', '23:59:59']"
									align="right"
									end-placeholder="结束日期"
									start-placeholder="开始日期"
									type="datetimerange"
									format="yyyy-MM-dd"
									@change="changeMonth($event, line_obj_shop_money)">
							</el-date-picker>
							<span v-if="!line_obj_shop_money.loading" style="margin-left: 20px;display: inline!important;">总销售金额：{{line_obj_shop_money.total}}</span>
							<newLineChart :color="['#fff000']" v-if="line_obj_shop_money.values.length > 0" id="line_obj_shop_money"
										  :timeout="0" :title="'商品销售金额统计'" :vm="line_obj_shop_money" style="margin-top: 20px;height: 300px">
							</newLineChart>
						</div>
					</el-col>
					<el-col v-if="user_group == '管理员' || $check_figure('/order/table')" :span="8">
						<div v-loading="bar_obj_shop_num.loading" class="card chart">
							<el-date-picker
									v-model="bar_obj_shop_num.month"
									:default-time="['00:00:00', '23:59:59']"
									align="right"
									end-placeholder="结束日期"
									start-placeholder="开始日期"
									type="datetimerange"
									format="yyyy-MM-dd"
									@change="changeMonth($event, bar_obj_shop_num)">
							</el-date-picker>
							<span v-if="!bar_obj_shop_num.loading" style="margin-left: 20px">总销售数量：{{bar_obj_shop_num.total}}</span>
							<newBarChart v-if="bar_obj_shop_num.values.length > 0" id="bar_obj_shop_num"
										 :timeout="0" :title="'商品销售数量统计'" :vm="bar_obj_shop_num" style="margin-top: 20px;height: 300px">
							</newBarChart>
						</div>
					</el-col>
									<el-col v-if="user_group == '管理员' || $check_figure('/customized_products/table')" :span="8">
						<div class="card chart">
																																																																																																								</div>
					</el-col>
									<el-col v-if="user_group != '管理员' && !$check_option('/subject_exam/table','teacher') && $check_figure('/subject_exam/table')" :span="8">
						<div class="card chart">
							<subjectExamCharts v-if="bar_obj_subject_exam.values.length >　0" id="line_obj_data_account_statistics"
											   :title="'用户考试科目数据统计'" :vm="bar_obj_subject_exam"
											   @changeTab="get_url_subject_exam_list">
							</subjectExamCharts>
							<div v-if="!bar_obj_subject_exam.values.length">数据分析没有符合条件的数据</div>
						</div>
					</el-col>
					<el-col v-if="user_group == '管理员' || $check_figure('/subject_exam/table')" :span="8">
						<div class="card chart">
							<subjectExamCharts v-if="bar_obj_subject_exam_avg.values.length >　0" id="line_obj_data_account_avg" :title="'试卷平均分统计'"
											   :vm="bar_obj_subject_exam_avg" avg
											   @changeTab="get_subject_average">
							</subjectExamCharts>
							<div v-if="!bar_obj_subject_exam_avg.values.length">数据分析没有符合条件的数据</div>
						</div>
					</el-col>
					<el-col v-if="user_group == '管理员' || $check_figure('/subject_exam/table')" :span="8">
						<div class="card chart" style="min-height: 400px;height: auto">
							<subjectExamTable v-if="subject_name_list.length > 0" :vm="subject_name_list"></subjectExamTable>
							<div v-if="!subject_name_list.length">数据总览没有符合条件的数据</div>
						</div>
					</el-col>
				</el-row>

	<div class="iframe_box" :style="{height: recognitionHeight}">
		<div class="iframe_box_top">
			智能识别系统
		</div>
		<div style="width:1155px;height:800px;overflow:hidden;border:0px; margin: 100px auto; position: relative;">
			<div style="margin:-530px -100px 0px -280px;position:relative"> #这里的position = relative 是必须的
				<iframe :src="recognitionUrl" id="ifyemian" scrolling="no" frameborder="0"
						style="position:absolute;
     width: 112%;
    height: 1323px;
     display:block;
     left: 0;
     right:0;">
				</iframe>
			</div>
		</div>
	</div>

				<div class="iframe_box_change">
					<div class="iframe_box_top">
						在线智能翻译
					</div>
					<iframe src="https://www.iciba.com/fy" class="iframe_box_content" frameborder="0"  scrolling="no" hspace="100" vspace="550"></iframe>
				</div>
				<div id ="outerdiv">
					<iframe src="https://cli.im/weixin" id ='inneriframe' scrolling="no"></iframe>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import mixin from "@/mixins/page.js";
	import pieChart from "@/components/charts/pie_chart";
	import newBarChart from "@/components/charts/new_bar_chart";
	import newLineChart from "@/components/charts/new_line_chart";
	import subjectExamCharts from "@/components/charts/subject_exam_charts.vue";
	import subjectExamTable from "@/components/charts/subject_exam_table.vue";
	import div_label from "@/components/div_label.vue";
	export default {
		mixins: [mixin],
		name: "Home",
		components: {
			pieChart,
			newBarChart,
			newLineChart,
			subjectExamCharts,
			subjectExamTable,
			div_label
		},
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
				bar_obj_subject_exam_avg: {
					names: [],
					xAxis: [],
					values: [],
					tabs: []
				},
				subject_name_list: [],
			};
		},
		created() {
							// 执行定制商品数据获取
			// this.get_list_customized_products();
			// this.get_order_month_some_price(null, this.line_obj_shop_money)
			// this.get_order_month_some_price(null, this.bar_obj_shop_num)
			// this.get_url_subject_list()
		},
		mounted() {},
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
						let day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
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
				if(date){
					days = getDateBetween(date[0], date[1])
				}else{
					o.month[0] = new Date(nowYear, nowMonth - 1, 1, 0, 0, 0)
					o.month[1] = new Date(nowYear, nowMonth - 1, nowDate, 23, 59, 59)
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
				let time = new Date(date).toStr("yyyy-MM-dd");
				var $where = ""
				if (this.user.user_group != "管理员")
						$where = '&merchant_id=' + this.user.user_id
				const json = await this.$get(
						`~/api/order/sum?field=${field}&create_time_min=${time} 00:00:00&create_time_max=${time} 23:59:59&state=已付款` + $where,
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
					this.bar_obj_subject_exam_avg.tabs.push(result.result.list[i].name)
				}
				await this.get_url_subject_exam_list(this.bar_obj_subject_exam.tabs[0])
				await this.get_subject_average(this.bar_obj_subject_exam.tabs[0])
				this.bar_obj_subject_exam.names = [this.bar_obj_subject_exam.tabs[0]]
			},
			async get_url_subject_exam_list(e) {
				let url = "~/api/subject_exam/get_list?subject_name=" + e;
				if (this.user_group!=='管理员' && this.$check_option("/subject_exam/table","teacher")){
					url = "~/api/subject_exam/get_list?subject_name=" + e + "&user_id="+this.$store.state.user.user_id;
				}
				const json = await this.$get(url)
				const allResult = []
				this.bar_obj_subject_exam.xAxis = []
				for (let j = 0; j < json.result.list.length; j++) {
					this.bar_obj_subject_exam.xAxis.push(json.result.list[j].name)
					let params = {
						exam_id: json.result.list[j].exam_id,
						user_id: this.$store.state.user.user_id,
					}
					if (this.user_group!=='管理员' && this.$check_option("/subject_exam/table","teacher")){
						params = {
							exam_id: json.result.list[j].exam_id,
						}
					}
					const value = await this.$get("~/api/subject_user_answer/get_list", params);
					for (let k = 0; k < value.result.list.length; k++) {
						allResult.push([value.result.list[k].score])
					}
				}
				this.bar_obj_subject_exam.values = allResult
				this.bar_obj_subject_exam.names = [e]
			},
			async get_subject_average(e) {
				const subject_name_list = []
				let url = "~/api/subject_exam/get_list";
				if (this.user_group!=='管理员' && this.$check_option("/subject_exam/table","teacher")){
					url = "~/api/subject_exam/get_list?user_id="+this.$store.state.user.user_id;
				}
				const json = await this.$get(url);
				for (let i = 0; i < json.result.list.length; i++) {
					const value = json.result.list[i].subject_name
					const index = this.find_subject_item(subject_name_list, "name", value)
					if (index === -1) {
						subject_name_list.push({
							name: json.result.list[i].subject_name,
							exam: [json.result.list[i].exam_id],
							examNames: [json.result.list[i].name],
							score: [],
							userList: [],
							min: [],
							max: [],
							avg: []
						})
					} else {
						subject_name_list[index].exam.push(json.result.list[i].exam_id)
						subject_name_list[index].examNames.push(json.result.list[i].name)
					}
				}

				const result = await this.$get("~/api/subject_user_answer/get_list")
				for (let i = 0; i < result.result.list.length; i++) {
					for (let j = 0; j < subject_name_list.length; j++) {
						const exam_index = subject_name_list[j].exam.indexOf(result.result.list[i].exam_id)
						if (exam_index > -1) {
							if (!subject_name_list[j].score[exam_index]) {
								subject_name_list[j].score[exam_index] = []
								subject_name_list[j].userList[exam_index] = []
							}
							const user_index = subject_name_list[j].userList[exam_index].indexOf(result.result.list[i].user_id)
							if(user_index === -1){
								subject_name_list[j].userList[exam_index].push(result.result.list[i].user_id)
							}
							subject_name_list[j].score[exam_index].push(result.result.list[i].score)
						}
					}
				}

				this.bar_obj_subject_exam_avg.names = ["平均分", "最高分", "最低分"]
				this.bar_obj_subject_exam_avg.values = [[], [], []]

				for (let i = 0; i < subject_name_list.length; i++) {
					for (let j = 0; j < subject_name_list[i].score.length; j++) {
						const max = Math.max.apply(Math, subject_name_list[i].score[j])
						const min = Math.min.apply(Math, subject_name_list[i].score[j])
						const avg = subject_name_list[i].score[j].reduce(function (a, b) {
							return a + b
						}) / subject_name_list[i].score[j].length
						if (subject_name_list[i].name === e) {
							this.bar_obj_subject_exam_avg.xAxis = subject_name_list[i].examNames
							this.bar_obj_subject_exam_avg.values[0].push(avg)
							this.bar_obj_subject_exam_avg.values[1].push(max)
							this.bar_obj_subject_exam_avg.values[2].push(min)
						}
						subject_name_list[i].avg.push(avg)
						subject_name_list[i].max.push(max)
						subject_name_list[i].min.push(min)
					}
				}
				console.log(subject_name_list)
				this.subject_name_list = subject_name_list
			},
			find_subject_item(arr, key, val) {
				for (let i = 0; i < arr.length; i++) {
					if (arr[i][key] == val) {
						return i
					}
				}
				return -1
			}
		},
		computed:{
			recognitionHeight(){
				return "830px"
			},
			recognitionUrl(){
				return "https://www.faceplusplus.com.cn/license-plate-recognition/"
			}
		}
	};
</script>

<style scoped="scoped">
	.chart {
		display: block;
		width: 100%;
		height: 400px;
		padding: 1rem;
		position: relative;
	}

	.el-col {
		padding: 0.5rem;
	}

	.card {
		overflow: hidden;
	}

	.iframe_box ,.iframe_box_change{
		width: 100%;
		height: 1180px;
		position: relative;
		margin-top: 25px;
	}
	.iframe_box_change{
		height: 580px;
		padding-top: 50px;
	}
	.iframe_box	.iframe_box_content, .iframe_box_change .iframe_box_content{
		width: 100%;
		height: 100%;
	}
	.iframe_box_top{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100px;
		font-size: 25px;
		line-height: 100px;
		background: #fff;
		z-index: 99999999;
		padding-left: 50px;
	}
	#iframe_box_face div::before {
		content: '';
		width: 100px;
		position: absolute;
		top: 154px;
		right: 129px;
		z-index: 999;
		height: 20px;
		background-color: #FFFFFF;
	}

	#iframe_box_face>h1 {
		margin-top: 100px;
		margin-bottom: 20px;
	}
	#outerdiv
	{
		margin: 0 auto;
		width:1500px;
		height:600px;
		overflow:hidden;
		position:relative;
	}

	#inneriframe
	{
		position:absolute;
		top:-150px;
		left:0px;
		width:1300px;
		height:450px;
	}
</style>
