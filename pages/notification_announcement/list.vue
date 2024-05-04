<template>
	<view class="page_notification_announcement diy_list diy_list_page div_list_tml" id="notification_announcement_list">
		<!-- 筛选模块(开始) -->
		<view>
			<view class="container">
				<view>
					<view>
						<view class="">
							<!-- 搜索栏 -->
													<uni-search-bar placeholder="搜索公告标题" @confirm="search_notification_announcement" @cancel="search_cancel_notification_announcement('announcement_title')" cancelText="取消"
											@input="input($event, 'announcement_title')">
								<uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
							</uni-search-bar>
																			<uni-search-bar placeholder="搜索发布人" @confirm="search_notification_announcement" @cancel="search_cancel_notification_announcement('publisher')" cancelText="取消"
											@input="input($event, 'publisher')">
								<uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
							</uni-search-bar>
																<!-- /搜索栏 -->
						</view>
					</view>
				</view>

				<view>
					<view>
						<view class="tab_view">
							<!-- 筛选栏 -->
																		<!-- /筛选栏 -->
						</view>
					</view>
				</view>

				<view>
					<view>
						<view class="sort_view">
							<!-- 排序 -->
							<view class="list_orderby">
								<bar_orderby :text="o.name" v-model:direction="o.direction" :direction.sync="o.direction"
											 v-for="(o,i) in list_orderby" :key="i" @handle="handleOrderby">
								</bar_orderby>
							</view>
							<!-- /排序 -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 筛选模块(结束) -->
														<view class="warp">
		<list_tab
				activeColor="var(--color_primary)"
				lineColor="var(--color_primary)"
				:tabs="list_type_announcement_type"
				v-model="query['announcement_type']"
				@change="change_tab_announcement_type"
				class="tab-wrapper"
		></list_tab>
			<!-- 列表 -->
							<view class="container">
					<view v-for="(o,i) in list" class="row">
															<view v-if="$check_field('get','announcement_title')" class="col">
							<view class="view">
														<view class="diy_field diy_text">
									<text>
										{{ o["announcement_title"] }}
									</text>
								</view>
													</view>
						</view>
																				<view v-if="$check_field('get','publisher')" class="col">
							<view class="view">
														<view class="diy_field diy_text">
									<text>
										{{ o["publisher"] }}
									</text>
								</view>
													</view>
						</view>
																				<view v-if="$check_field('get','release_time')" class="col">
							<view class="view">
														<view class="diy_field diy_datetime">
									<text>
										{{ $toTime(o["release_time"],"yyyy-MM-dd hh:mm:ss") }}
									</text>
								</view>
													</view>
						</view>
																				<view v-if="$check_field('get','announcement_type')" class="col">
							<view class="view">
														<view class="diy_field diy_text">
									<text>
										{{ o["announcement_type"] }}
									</text>
								</view>
													</view>
						</view>
																				<view v-if="$check_field('get','announcement_content')" class="col">
							<view class="view">
														<view class="diy_field diy_text">
									<text>
										{{ o["announcement_content"] }}
									</text>
								</view>
													</view>
						</view>
															<view class="uni-padding-wrap uni-common-mt">
							<navigator class="btn btn-primary" :url="'./details?notification_announcement_id=' + o['notification_announcement_id']">查看详情</navigator>
						</view>
					</view>
				</view>
			</view>
											<!-- /列表 -->
		<!-- 分页器 -->
		<uni-pagination
				class="pager"
				show-icon="true"
				:total="count"
				:pageSize="query.size"
				:current="query.page"
				@change="page_change"
		></uni-pagination>
		<!-- /分页器 -->
	</view>
</template>

<script>
	import list_tab from "@/components/diy/list_tab.vue";
	import bar_orderby from "@/components/diy/bar_orderby.vue";
    import mixin from "@/libs/mixins/page.js";

	export default {
		mixins: [mixin],
		components: {
			list_tab,
			bar_orderby,
		},
		data() {
			return {
				url_get_list: "~/api/notification_announcement/get_list?like=0",
															list_orderby: [
									{
					name: '点赞数',
					direction: "",
					command_asc: '`praise_len` asc',
					command_desc: '`praise_len` desc'
				},
				{
					name: '点击数',
					direction: "",
					command_asc: '`hits` asc',
					command_desc: '`hits` desc'
				},
				{
					name: '发布时间',
					direction: "",
					command_asc: '`create_time` asc',
					command_desc: '`create_time` desc'
				}
			],
					query: {
									"announcement_title": "", // 公告标题
												"publisher": "", // 发布人
												"notification_announcement_id": 0, // ID
						"page": 1,
						"size": 10
			},
			list: [],
					count: 50,
																	btnnum :0,
					"list_type_announcement_type": [],
					"type_list":{},
								}
		},
		methods: {

															async get_list_type_announcement_type() {
		var json = await this.$get("~/api/notification_announcement/get_list?groupby=announcement_type");
		if (json.result) {
			json.result.list.map((o)=>{
				this.list_type_announcement_type.push(o.announcement_type)
			});
			this.query.announcement_type = this.list_type_announcement_type[0]
			this.get_list();
		} else if (json.error) {
			console.log(json.error);
		}
	},
	change_tab_announcement_type(val) {
		if (val === "全部" || val === "") {
			this.query.announcement_type = "";
		}else{
			this.query.announcement_type = val
		}
		this.search_();
	},
	search_notification_announcement(){
		let _this = this;
		this.$get("~/api/notification_announcement/get_list?like=0", _this.query, (json) => {
			if (json.result) {
				_this.$set(_this.type_list,_this.query.announcement_type, json.result.list);
				_this.get_list();
			}
		});
	},
	search_cancel_notification_announcement(key){
		this.query[key] = ""
		this.search_notification_announcement();
	},
						
	/**
	 * 获取列表后
	 * @param {Object} json
	 * @param {Object} func
	 */
	get_list_after(json ,func){
		let list = json.result.list;
		this.get_praise(list);
		if (func) {
			func(json);
		}
	},

	/**
	 * 获取点赞数
	 * @param {Object} list
	 */
	get_praise(list){
		this.$get("~/api/praise/list_group?groupby=source_id&source_table=notification_announcement", {}, (res) => {
			if (res.result && res.result.list) {
				res.result.list.map((o) => {
					for(var i = 0;i < list.length; i++){
						var oj = list[i];
						if(oj["notification_announcement_id"] === o["source_id"]){
							oj["praise_len"] = o["count"];
							break;
						}
					}
				});
			}
			else if(res.error) {
				console.error(res.error);
			}
		});
	},

				
						
			
			
			
		
	input(e, key) {
		this.query[key] = e.value;
	},

	search_() {
		this.query.page = 1;
		this.get_list();
	},

	search_cancel(key){
		this.query[key] = ""
		this.search_();
	},

	// 改变分类标签
	changeScreen(idx,key) {
		if (this.query[key] === "全部") {
			this.query[key] = "";
		}
		this.search_()
	},

	// 控制排序
	handleOrderby(o) {
		// console.log(o);
		// 取出对应的orderby

		// 重置其他排序的direction
		this.list_orderby.map(val => {
			if (val.name !== o.text) {
				return val.direction = ""
			}
		})

		// 找到对应的排序项，发送排序请求
		var obj_orderby = this.list_orderby.find(val => val.name === o.text)
		if (o.direction === "") {
			this.query.orderby = ""
			this.search_()
		} else if (o.direction === "up") {
			this.query.orderby = obj_orderby.command_desc
			this.search_()
		} else if (o.direction === "down") {
			this.query.orderby = obj_orderby.command_asc
			this.search_()
		}
	},

	/**
	 * 跳转地址
	 * @param {Object} id
	 */
	to_nav(id) {
		this.$nav('/pages/notification_announcement/details?notification_announcement_id=' + id)
	},


	},
	created() {
																								this.get_list_type_announcement_type();
							}
	}
</script>
<style scoped>
.container {
  box-shadow: none;
  -webkit-box-shadow: none;
}
.pager {
  margin-top: 1rem;
}
.uni-collapse {
  background-color: inherit;
}

.pager {
  margin-top: 1rem;
}

.tab_view {
  /* background-color: #ffffff; */
  margin: 0 auto;
}

.list_orderby {
  display: flex;
  justify-content: flex-start;
  /* background-color: #ffffff; */
  /* border-top: 5px double #ccc;
		border-bottom: 5px double #ccc; */
  margin-right: -1px;
}

.list_orderby .bar_orderby {
  border-left: 1px solid #ccc;
}
.change_table {
  height: 50px;
  margin: 0 var(--margin_base);
}
.btn_change_table {
  margin-left: auto;
  font-weight: bold;
  width: 100px;
  height: 37px;
  text-align: center;
  font-size: 0.875rem;
  border: 1px solid #cccccc;
  border-radius: 1rem;
  margin: 0.25rem;
  float: right;
}
.end-title {
  display: flex;
}
.end-title view {
  flex-grow: 1;
  text-align: center;
}
.end-cont {
  display: none;
  /* background: #c8c7cc; */
}
.btna {
  color: #ffffff;
  background: #00a0ff;
}
.dis {
  display: block;
}
.box_style {
  width: 44%;
  margin-bottom: 0.75rem;
  padding: 0.375rem;
  display: inline-block !important;
  border: 0.075rem solid #ccc;
  border-radius: 0.375rem;
  overflow: hidden;
}
.box_style:nth-child(even) {
  margin-left: 0.6rem;
}
.box_style:nth-child(even) {
  margin-left: 0.6rem;
}
.bottom-view,
.create_time_block {
  font-size: 12px;
  color: #666666;
}
.bottom-view view {
  display: inline-block;
}
.bottom-view span {
  margin-left: 5px;
  margin-right: 10px;
}
</style>
<style>
/* 新加样式 */
.uni-searchbar {
  background-color: #22b8b8;
}
.search_div .uni-searchbar .uni-searchbar__box {
  border-radius: 8px !important;
  height: auto;
}

.tab_view {
  margin: 8px auto;
  font-size: 14px;
}
.list_orderby {
  margin: 1rem;
}
.list_orderby .bar_orderby {
  margin-right: 0.5rem;
  border-left: 1px solid #ccc;
  background-color: #22b8b8;
  border-radius: 10px;
  padding: 5px;
}
.sort_view .bar_orderby .text {
  color: #fff;
}
/* 列表样式 */
.dis {
  width: 50%;
  display: inline-block;
}
.end-cont .warp .container {
  font-family: Arial, Helvetica, sans-serif;
  border: 2px solid #22b8b8;
  padding: 5px;
  /* margin-top: 10px; */
  border-radius: 8px;
  margin: 10px 5px 0 5px;
  font-size: 14px;
}
.col {
  padding: 5px;
}
.end-cont .warp .container .diy_img img {
  width: 100%;
  height: 100px;
  padding: 5px 0;
}
.diy_dj {
  display: inline-block;
  width: 50%;
}
.uni-common-mt {
  width: 100%;
}
.uni-common-mt .btn {
  font-size: 14px;
  color: #fff;
  background-color: #22b8b8;
  line-height: 2;
  margin-bottom: 8px;
  display: inline-block;
	  width: 100%;
	  text-align: center;
}
.diy_text{
	padding-left: 10px;
	 color:#22b8b8;
	 text-decoration: dashed;
}
.uni-common-mt .btn{
	display: inline-block;
	  width: 100%;
	  text-align: center;
}
.container {
  padding: 8px 0s;
}
.delete_btn{
	display: inline-block;
	padding-left: 8px;
	color: #22B8B8;
	text-decoration: underline;
}
.tab-wrapper {
	width: 20%;
}
.warp .container {
	width: 80%;
}
.page_notification_announcement .warp {
	display: flex;
	justify-content: space-between;
}
</style>
