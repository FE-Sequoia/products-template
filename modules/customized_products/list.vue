<template>
	<div class="diy_list page_customized_products" id="customized_products_list">
		<div class="warp">
			<div class="container diy_list_container">
				<div class="diy_list_title">
					<div class="col">
						<span class="title">定制商品列表</span>
					</div>
				</div>
				<div class="leis_box"> 
				<div class="iudis_box">
			
				<div class="row diy_list_search">
					<div class="col">
						<!-- 搜索栏 -->
						<div class="view Search">
							<span class="diy_list_search_title">关键字搜索：</span>
																																				<b-form-input size="sm" class="mr-sm-2" placeholder="商品名称搜索" v-model="query['product_name']" />
																																																																					<b-form-input size="sm" class="mr-sm-2" placeholder="商品类别搜索" v-model="query['product_category']" />
																																																																																																																					<b-button size="sm" @click="search()" >
								<b-icon icon="search"/>
							</b-button>
						</div>
						<!-- /搜索栏 -->
					</div>
				</div>
				<div class="diy_list_select_box">
					<span class="diy_list_select_title">下拉搜索：</span>
						<div class="diy_list_dropdown_box">
						<div class="col">
							<!-- 筛选 -->
							<div class="view sift">
																			<b-dropdown text="商品类别" variant="outline-dark" left>
									<b-dropdown-item @click="filter_set('全部','product_category')">全部</b-dropdown-item>
										<b-dropdown-item v-for="(o, i) in list_product_category" :key="i" @click="filter_set(o['classification_categories'],'product_category')" >
												{{ o['classification_categories'] }}
										</b-dropdown-item>
								</b-dropdown>
																		<!-- 排序 -->
							
								<b-dropdown text="排序" variant="outline-dark" left>
										<b-dropdown-item v-for="(o, i) in list_sort" :key="i" @click="set_sort(o)" >
												{{ o.name }}
										</b-dropdown-item>
								</b-dropdown>
						
							<!--/排序 -->
							</div>
							<!-- /筛选 -->
						</div>
					</div>
				
				</div>
			</div>
				<div class="row diy_list_box">
					<div class="col">
						<!-- 列表 -->
						<list_customized_products :list="list" />
						<!-- /列表 -->
					</div>
				</div>
	</div>
	<!-- 大盒子结尾 -->
				<div class="row diy_list_page_box">
					<div class="col overflow-auto flex_cc">
						<!-- 分页器 -->
<!--						<diy_pager v-model="query['page']" :size="query['size']" :count="count" v-on:toPage="toPage" v-on:toSize="toSize" ></diy_pager>-->
            <b-pagination
                v-model="query.page"
                :total-rows="count"
                :per-page="query.size"
                @change="goToPage"
            />
						<!-- /分页器 -->
					</div>
				</div>
				<music_player :music-list="player_list"></music_player>
			</div>
		</div>
	</div>
</template>

<script>
	import list_customized_products from "@/components/diy/list_customized_products.vue";
	import diy_pager from "@/components/diy/diy_pager";
	import mixin from "@/mixins/page.js";
	import music_player from "@/components/diy/music_player.vue";

	export default {
		mixins: [mixin],
		components: {
			diy_pager,
			list_customized_products,
			music_player,
		},
		data() {
			return {
				url_get_list: "~/api/customized_products/get_list?like=0",

				// 查询条件
				query: {
					keyword: "",
					page: 1,
					size: 12,
									"product_name": "", // 商品名称
														"product_category": "", // 商品类别
															"examine_state": "已通过", // 审核状态
				},
				player_list: [],
				// 排序内容
				list_sort: [{
						name: "创建时间从高到低",
						value: "create_time desc",
					},
					{
						name: "创建时间从低到高",
						value: "create_time asc",
					},
					{
						name: "更新时间从高到低",
						value: "update_time desc",
					},
					{
						name: "更新时间从低到高",
						value: "update_time asc",
					},
							{
						name: "商品名称正序",
						value: "product_name asc",
					},
					{
						name: "商品名称倒序",
						value: "product_name desc",
					},
										{
						name: "商品类别正序",
						value: "product_category asc",
					},
					{
						name: "商品类别倒序",
						value: "product_category desc",
					},
												],

															// 商品类别列表
				"list_product_category": [""],
																
			}
		},
		methods: {
      get_list_before(param) {
        var oNowDate = this.dateFormat("yyyy-MM-dd hh:mm:ss")+"";
        var url_get_list = "~/api/customized_products/get_list?timing_start_time_max=" + oNowDate +
            "&timing_end_time_min=" + oNowDate + "&like=0";
        this.url_get_list= url_get_list;
      },
			/**
			 * 筛选选择
			 */
			filter_set(o,key) {
			    if (o == "全部") {
			        this.query[key] = "";
			    } else {
			        this.query[key] = o;
			    }
			    this.search();
			},

			/**
			 * 排序
			 */
			set_sort(o) {
			    this.query.orderby = o.value;
			    this.search();
			},
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
					if (func) {
						func(json);
					}
				},
									/**
			 * 获取商品类别列表
			 */
			async get_list_product_category() {
				var json = await this.$get("~/api/classification_information/get_list?");
				if (json.result) {
					this.list_product_category = json.result.list;
				} else if (json.error) {
					console.log(json.error);
				}
			},
											/**
			 * 筛选
			 */
																filter_product_category(o) {
				if (o == "全部") {
					this.query["product_category"] = "";
				} else {
					this.query["product_category"] = o;
				}
				this.search();
			},
															/**
			 * 重置
			 */
			reset() {
								this.query.product_name = ""
													this.query.product_category = ""
														this.search();
			},

			// 返回条数
			toSize(i){
				this.query.size = i;
				this.first();
			},

			// 返回页数
			toPage(i){
				this.query.page = i;
				this.first();
			},

      goToPage(v){
        this.query.page = v;
        this.goToNew(v)
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
		computed: {
		},
		created() {
														/**
			 * 获取商品类别列表
			 */
			this.get_list_product_category();
																		}
	}
</script>

<style>
</style>
