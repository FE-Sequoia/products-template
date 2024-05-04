<template>
	<div class="diy_list page_notification_announcement" id="notification_announcement_list">
		<div class="warp">
			<div class="container diy_list_container">
				<div class="diy_list_title">
					<div class="col">
						<span class="title">通知公告列表</span>
					</div>
				</div>
				<div class="leis_box"> 
				<div class="iudis_box">
			
				<div class="row diy_list_search">
					<div class="col">
						<!-- 搜索栏 -->
						<div class="view Search">
							<span class="diy_list_search_title">关键字搜索：</span>
																							<b-form-input size="sm" class="mr-sm-2" placeholder="公告标题搜索" v-model="query['announcement_title']" />
																														<b-form-input size="sm" class="mr-sm-2" placeholder="发布人搜索" v-model="query['publisher']" />
																																																																							<b-button size="sm" @click="search_notification_announcement()" >
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
						<!-- tab -->
																		<b-tabs content-class="mt-3">
							<b-tab v-for="(o, i) in list_type_announcement_type" :key="i" :title="o['announcement_type']" :active="i===0" @click="tab_select(o['announcement_type'])">
								<div class="row">
									<div class="col">
										<!-- tab -->
										<list_notification_announcement :list="type_list[o['announcement_type']]" />
										<!-- /tab -->
									</div>
								</div>
							</b-tab>
						</b-tabs>
												<!-- /tab -->
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
	import list_notification_announcement from "@/components/diy/list_notification_announcement.vue";
	import diy_pager from "@/components/diy/diy_pager";
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		components: {
			diy_pager,
			list_notification_announcement,
		},
		data() {
			return {
				url_get_list: "~/api/notification_announcement/get_list?like=0",

				// 查询条件
				query: {
					keyword: "",
					page: 1,
					size: 12,
								"announcement_title": "", // 公告标题
											"publisher": "", // 发布人
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
						name: "公告标题正序",
						value: "announcement_title asc",
					},
					{
						name: "公告标题倒序",
						value: "announcement_title desc",
					},
							{
						name: "发布人正序",
						value: "publisher asc",
					},
					{
						name: "发布人倒序",
						value: "publisher desc",
					},
								],

										
																"list_type_announcement_type": [],
				"type_list":{},
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
															async get_list_type_announcement_type() {
				var json = await this.$get("~/api/notification_announcement/get_list?groupby=announcement_type"
				);
				if (json.result) {
					this.list_type_announcement_type = json.result.list;
					for (let i = 0;i<this.list_type_announcement_type.length;i++){
						this.get_announcement_type_type_list(this.list_type_announcement_type[i].announcement_type);
					}
					this.query.announcement_type = this.list_type_announcement_type[0].announcement_type;
					this.get_list();
				} else if (json.error) {
					console.log(json.error);
				}
			},

			get_announcement_type_type_list(type){
				let _this = this;
				this.$get("~/api/notification_announcement/get_list?", {"announcement_type":type
								}, (json) => {
					if (json.result) {
						_this.$set(_this.type_list,type, json.result.list);
					}
				});
			},
			tab_select(v){
				this.query.announcement_type = v;
				this.get_list();
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
														/**
			 * 筛选
			 */
																		/**
			 * 重置
			 */
			reset() {
							this.query.announcement_title = ""
										this.query.publisher = ""
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
																									this.get_list_type_announcement_type();
								}
	}
</script>

<style>
</style>
