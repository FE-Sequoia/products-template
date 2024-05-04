<template>
	<view class="page_customized_products diy_list diy_list_page div_list_tml" id="customized_products_list">
		<!-- 筛选模块(开始) -->
		<view>
			<view class="container">
				<view>
					<view>
						<view class="">
							<!-- 搜索栏 -->
														<uni-search-bar placeholder="搜索商品名称" @confirm="search_" @cancel="search_cancel('product_name')" cancelText="取消"
											@input="input($event, 'product_name')">
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
																					<uni-section title="商品类别" type="line">
							<uni-data-select
									@change="change_product_category"
									v-model="query['product_category']"
									:localdata="list_product_category"
							></uni-data-select>
							</uni-section>
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
		<!-- 列表 -->
			<view class="warp" >
			<view class="container">
				<view v-for="(o,i) in list" class="row box_style">
							<view class="col" v-if="0 && $check_field('get','product_number')">
						<view class="view">
							<view class="diy_title" v-if="true">
								<span>商品编号</span>
							</view>
										<view class="diy_field diy_text">
								<span>
									{{ o["product_number"] }}
								</span>
							</view>
									</view>
					</view>
							<view class="col" v-if="1 && $check_field('get','product_name')">
						<view class="view">
							<view class="diy_title" v-if="true">
								<span>商品名称</span>
							</view>
										<view class="diy_field diy_text">
								<span>
									{{ o["product_name"] }}
								</span>
							</view>
									</view>
					</view>
							<view class="col" v-if="1 && $check_field('get','cover')">
						<view class="view">
							<view class="diy_title" v-if=" false">
								<span>封面</span>
							</view>
										<view class="diy_field diy_img">
								<img :src="$fullUrl(o['cover'])" width="100%" height="100" />
							</view>
									</view>
					</view>
							<view class="col" v-if="0 && $check_field('get','money')">
						<view class="view">
							<view class="diy_title" v-if="true">
								<span>金额</span>
							</view>
										<view class="diy_field diy_text">
								<span>
									{{ o["money"] }}
								</span>
							</view>
									</view>
					</view>
							<view class="col" v-if="0 && $check_field('get','inventory')">
						<view class="view">
							<view class="diy_title" v-if="true">
								<span>库存</span>
							</view>
										<view class="diy_field diy_text">
								<span>
									{{ o["inventory"] }}
								</span>
							</view>
									</view>
					</view>
							<view class="col" v-if="1 && $check_field('get','product_category')">
						<view class="view">
							<view class="diy_title" v-if="true">
								<span>商品类别</span>
							</view>
										<view class="diy_field diy_text">
								<span>
									{{ o["product_category"] }}
								</span>
							</view>
									</view>
					</view>
							<view class="col" v-if="0 && $check_field('get','audio_frequency')">
						<view class="view">
							<view class="diy_title" v-if="true">
								<span>音频</span>
							</view>
										<view class="diy_field diy_text">
								<span>
									{{ o["audio_frequency"] }}
								</span>
							</view>
									</view>
					</view>
							<view class="col" v-if="0 && $check_field('get','video')">
						<view class="view">
							<view class="diy_title" v-if="true">
								<span>视频</span>
							</view>
										<view class="diy_field diy_text">
								<span>
									{{ o["video"] }}
								</span>
							</view>
									</view>
					</view>
							<view class="col" v-if="0 && $check_field('get','content')">
						<view class="view">
							<view class="diy_title" v-if="true">
								<span>内容</span>
							</view>
										<view class="diy_field diy_desc">
									<span>
										{{ obj["content"] }}
									</span>
							</view>
									</view>
					</view>
							<view class="col" v-if="0 && $check_field('get','seller')">
						<view class="view">
							<view class="diy_title" v-if="true">
								<span>卖家</span>
							</view>
										<view class="diy_field diy_uid">
								<span>
									{{ get_user_seller(o['seller']) }}
								</span>
							</view>
									</view>
					</view>
							<view class="col" v-if="0 && $check_field('get','classification_number')">
						<view class="view">
							<view class="diy_title" v-if="true">
								<span>分类编号</span>
							</view>
										<view class="diy_field diy_text">
								<span>
									{{ o["classification_number"] }}
								</span>
							</view>
									</view>
					</view>
							<view class="col" v-if="0 && $check_field('get','classification_categories')">
						<view class="view">
							<view class="diy_title" v-if="true">
								<span>分类类别</span>
							</view>
										<view class="diy_field diy_text">
								<span>
									{{ o["classification_categories"] }}
								</span>
							</view>
									</view>
					</view>
							<view class="col" v-if="0 && $check_field('get','details')">
						<view class="view">
							<view class="diy_title" v-if="true">
								<span>详情</span>
							</view>
										<view class="diy_field diy_desc">
									<span>
										{{ obj["details"] }}
									</span>
							</view>
									</view>
					</view>
							<view class="bottom-view">
								<view class="praise-title">点赞数<span>{{ o["praise_len"] }}</span></view>
										<view class="hits-title">点击数<span>{{ o["hits"] }}</span></view>
							</view>
					<view class="col">
						<view class="view">
							<view class="create_time_block diy_filed diy_time">
								{{ $toTime(o["create_time"] ,"yyyy-MM-dd hh:mm:ss") }}

							</view>
						</view>
					</view>
					<view class="uni-padding-wrap uni-common-mt">
						<navigator :url="'./details?customized_products_id=' + o['customized_products_id']" class="btn btn-primary">查看详情</navigator>

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
		<!-- 播放器 -->
		<music_player :music-list="player_list"></music_player>
		<!-- /播放器 -->
	</view>
</template>

<script>
	import list_tab from "@/components/diy/list_tab.vue";
	import bar_orderby from "@/components/diy/bar_orderby.vue";
    import mixin from "@/libs/mixins/page.js";
	import music_player from "@/components/diy/music_player.vue";

	export default {
		mixins: [mixin],
		components: {
			list_tab,
			bar_orderby,
			music_player,
		},
		data() {
			return {
				url_get_list: "~/api/customized_products/get_list?like=0",
															// 商品类别选项列表
				list_product_category: [{value:"全部",text:"全部"}],
															// 用户列表
					list_user_seller: [],
														player_list: [],
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
										"product_name": "", // 商品名称
															"product_category": "", // 商品类别
																"examine_state": "已通过", // 审核状态
						"examine_reply": "", // 审核状态
						"customized_products_id": 0, // ID
						"page": 1,
						"size": 10
			},
			list: [],
					count: 50,
		}
		},
		methods: {


	/**
	 * 获取列表后
	 * @param {Object} json
	 * @param {Object} func
	 */
	get_list_after(json ,func){
		let list = json.result.list;
		for (let i = 0 ; i < list.length; i++){
			let obj = {};
											obj.music_name = list[i].product_name
								obj.cover = list[i].cover
																		obj.singer = list[i].product_category
								obj.audio_frequency = list[i].audio_frequency
																																				this.player_list.push(obj)
		}
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
		this.$get("~/api/praise/list_group?groupby=source_id&source_table=customized_products", {}, (res) => {
			if (res.result && res.result.list) {
				res.result.list.map((o) => {
					for(var i = 0;i < list.length; i++){
						var oj = list[i];
						if(oj["customized_products_id"] === o["source_id"]){
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

	
						
			
			
			
						// 改变分类标签
	change_product_category(val) {
		if (val === "全部" || val === "") {
			this.query.product_category = "";
		}else{
			this.query.product_category = val
		}
		this.search_();
	},
			
		/**
	 * 获取商品类别列表
	 */
	async get_list_product_category() {
						var json = await this.$get("~/api/classification_information/get_list?");
		if(json.result && json.result.list){
			json.result.list.map((o) => this.list_product_category.push({value:o.classification_categories,text:o.classification_categories}));
		}
		else if(json.error){
			$.toast(json.error.message);
			console.error(json.error);
		}
			},
			
			
			
			
			/**
	 * 获取商城卖家用户列表
	 */
	async get_list_user_seller() {
		var json = await this.$get("~/api/user/get_list?user_group=商城卖家");
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
		this.$nav('/pages/customized_products/details?customized_products_id=' + id)
	},

	dateFormat(fmt) {
		var myDate = new Date();
	    var o = {
	        "M+": myDate.getMonth() + 1, // 月份
	        "d+": myDate.getDate(), // 日
	        "h+": myDate.getHours(), // 小时
	        "m+": myDate.getMinutes(), // 分
	        "s+": myDate.getSeconds(), // 秒
	        "q+": Math.floor((myDate.getMonth() + 3) / 3), // 季度
	        "S": myDate.getMilliseconds() // 毫秒
	    };
	    if (/(y+)/.test(fmt))
	        fmt = fmt.replace(RegExp.$1, (myDate.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	            return fmt;
	},

	},
	created() {
													// 初始化商品类别列表
		this.get_list_product_category();
												this.get_list_user_seller();
											var oNowDate = this.dateFormat("yyyy-MM-dd hh:mm:ss")+"";
		var url_get_list = "~/api/customized_products/get_list?timing_start_time_max=" + oNowDate +
			"&timing_end_time_min=" + oNowDate + "&like=0";
		this.url_get_list= url_get_list;
		this.get_list();
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
.page_customized_products .warp {
	display: flex;
	justify-content: space-between;
}
</style>
