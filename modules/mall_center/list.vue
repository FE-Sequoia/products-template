<template>
	<div class="diy_list page_mall_center" id="mall_center_list">
		<div class="warp">
			<div class="container diy_list_container">
				<div class="diy_list_title">
					<div class="col">
						<span class="title">商城中心列表</span>
					</div>
				</div>
				<div class="leis_box"> 
				<div class="iudis_box">
			
				<div class="row diy_list_search">
					<div class="col">
						<!-- 搜索栏 -->
						<div class="view Search">
							<span class="diy_list_search_title">关键字搜索：</span>
																							<b-form-input size="sm" class="mr-sm-2" placeholder="商城卖家搜索" v-model="query['mall_seller']" />
																																											<b-form-input size="sm" class="mr-sm-2" placeholder="生产日期搜索" v-model="query['production_date']" />
																																											<b-form-input size="sm" class="mr-sm-2" placeholder="标签搜索" v-model="query['label']" />
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
											<b-dropdown text="商城卖家" variant="outline-dark" left>
									<b-dropdown-item @click="filter_set('全部','mall_seller')">全部</b-dropdown-item>
									<b-dropdown-item v-for="o in list_mall_seller" :key="o['user_id']" @click="filter_set(o['user_id'],'mall_seller')">
										{{ o['nickname'] + '-' + o['username'] }}
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
						<list_mall_center :list="list" />
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
			</div>
		</div>
	</div>
</template>

<script>
	import list_mall_center from "@/components/diy/list_mall_center.vue";
	import diy_pager from "@/components/diy/diy_pager";
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		components: {
			diy_pager,
			list_mall_center,
		},
		data() {
			return {
				url_get_list: "~/api/mall_center/get_list?like=0",

				// 查询条件
				query: {
					keyword: "",
					page: 1,
					size: 12,
								"mall_seller": 0, // 商城卖家
												"production_date": "", // 生产日期
												"label": "", // 标签
							},
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
						name: "商城卖家正序",
						value: "mall_seller asc",
					},
					{
						name: "商城卖家倒序",
						value: "mall_seller desc",
					},
								{
						name: "生产日期正序",
						value: "production_date asc",
					},
					{
						name: "生产日期倒序",
						value: "production_date desc",
					},
								{
						name: "标签正序",
						value: "label asc",
					},
					{
						name: "标签倒序",
						value: "label desc",
					},
					],

						list_mall_seller: [],
									
			}
		},
		methods: {
      get_list_before(param) {
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
			 * 筛选
			 */
								/**
			 * 获取商城卖家列表
			 */
			async get_list_mall_seller() {
				var json = await this.$get("~/api/user/get_list?user_group=商城卖家");
				if(json.result && json.result.list){
					this.list_mall_seller = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
																				/**
			 * 重置
			 */
			reset() {
							this.query.mall_seller = ""
											this.query.production_date = ""
											this.query.label = ""
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

		},
		computed: {
		},
		created() {
					this.get_list_mall_seller();
											}
	}
</script>

<style>
</style>
