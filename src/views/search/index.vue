<template>
  <div class="page_search search_index">
	<div class="warp">
	  <div class="container">
		<div class="row">
		  <div class="col-12">
			<div class="card_result_search">
			  <div class="title">搜索结果</div>
				<!-- 商品搜索结果 -->
			  <list_result_search
				:list="result_goods"
				title="商城中心"
				source_table="goods"
			  ></list_result_search>

				<!-- 文章搜索结果 -->
			  <list_result_search
				:list="result_article"
				title="新闻资讯"
				source_table="article"
			  ></list_result_search>

				<!-- 论坛搜索结果 -->
			  <list_result_search
				:list="result_forum"
				title="交流论坛"
				source_table="forum"
			  ></list_result_search>

						  <list_result_search
				v-if="$check_action('/registered_users/list', 'get')"
				:list="result_registered_users_name"
				title="注册用户姓名"
				source_table="registered_users"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/registered_users/list', 'get')"
				:list="result_registered_users_gender"
				title="注册用户性别"
				source_table="registered_users"
			  ></list_result_search>
																										  <list_result_search
				v-if="$check_action('/registered_users/list', 'get')"
				:list="result_registered_users_classification_number"
				title="注册用户分类编号"
				source_table="registered_users"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/registered_users/list', 'get')"
				:list="result_registered_users_classification_categories"
				title="注册用户分类类别"
				source_table="registered_users"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/registered_users/list', 'get')"
				:list="result_registered_users_label"
				title="注册用户标签"
				source_table="registered_users"
			  ></list_result_search>
															  <list_result_search
				v-if="$check_action('/mall_seller/list', 'get')"
				:list="result_mall_seller_seller_id"
				title="商城卖家卖家编号"
				source_table="mall_seller"
			  ></list_result_search>
																		  <list_result_search
				v-if="$check_action('/mall_center/list', 'get')"
				:list="result_mall_center_production_date"
				title="商城中心生产日期"
				source_table="mall_center"
			  ></list_result_search>
											  <list_result_search
				v-if="$check_action('/mall_center/list', 'get')"
				:list="result_mall_center_label"
				title="商城中心标签"
				source_table="mall_center"
			  ></list_result_search>
												  <list_result_search
				v-if="$check_action('/customized_products/list', 'get')"
				:list="result_customized_products_product_name"
				title="定制商品商品名称"
				source_table="customized_products"
			  ></list_result_search>
																	  <list_result_search
				v-if="$check_action('/customized_products/list', 'get')"
				:list="result_customized_products_product_category"
				title="定制商品商品类别"
				source_table="customized_products"
			  ></list_result_search>
																														  <list_result_search
				v-if="$check_action('/i_want_to_customize/list', 'get')"
				:list="result_i_want_to_customize_order_number"
				title="我要定制订单号"
				source_table="i_want_to_customize"
			  ></list_result_search>
											  <list_result_search
				v-if="$check_action('/i_want_to_customize/list', 'get')"
				:list="result_i_want_to_customize_product_name"
				title="我要定制商品名称"
				source_table="i_want_to_customize"
			  ></list_result_search>
																																				  <list_result_search
				v-if="$check_action('/notification_announcement/list', 'get')"
				:list="result_notification_announcement_announcement_title"
				title="通知公告公告标题"
				source_table="notification_announcement"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/notification_announcement/list', 'get')"
				:list="result_notification_announcement_publisher"
				title="通知公告发布人"
				source_table="notification_announcement"
			  ></list_result_search>
																		  <list_result_search
				v-if="$check_action('/classification_information/list', 'get')"
				:list="result_classification_information_classification_number"
				title="分类信息分类编号"
				source_table="classification_information"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/classification_information/list', 'get')"
				:list="result_classification_information_classification_categories"
				title="分类信息分类类别"
				source_table="classification_information"
			  ></list_result_search>
									</div>
		  </div>
		</div>
	  </div>
	</div>
  </div>
</template>

<script>
import mixin from "../../mixins/page.js";
import list_result_search from "../../components/diy/list_result_search.vue";

export default {
  mixins: [mixin],
  data() {
	return {
	  "query": {
		word: "",
	  },
	  "result_goods": [],
	  "result_article": [],
	  "result_forum": [],
						"result_registered_users_name":[],
								"result_registered_users_gender":[],
																										"result_registered_users_classification_number":[],
								"result_registered_users_classification_categories":[],
								"result_registered_users_label":[],
															"result_mall_seller_seller_id":[],
																		"result_mall_center_production_date":[],
											"result_mall_center_label":[],
												"result_customized_products_product_name":[],
																	"result_customized_products_product_category":[],
																														"result_i_want_to_customize_order_number":[],
											"result_i_want_to_customize_product_name":[],
																																				"result_notification_announcement_announcement_title":[],
								"result_notification_announcement_publisher":[],
																		"result_classification_information_classification_number":[],
								"result_classification_information_classification_categories":[],
							};
  },
  methods: {
	/**
	 * 获取${fmodel.filter.cart_name}
	 */
	get_goods() {
	  this.$get("~/api/goods/get_list?like=0", { page: 1, size: 10, title: this.query.word }, (json) => {
		if (json.result) {
		  this.result_goods = json.result.list;
		}
	  });
	},
	/**
	 * 获取文章
	 */
	get_article() {
	  this.$get("~/api/article/get_list?like=0", { page: 1, size: 10, title: this.query.word }, (json) => {
		if (json.result) {
		  this.result_article = json.result.list;
		}
	  });
	},
	/**
	 * 获取交流论坛
	 */
	get_forum() {
	  this.$get("~/api/forum/get_list?like=0", { page: 1, size: 10, title: this.query.word }, (json) => {
		if (json.result) {
		  this.result_forum = json.result.list;
		}
	  });
	},

				/**
	 * 获取name
	 */
	get_registered_users_name(){
		let url = "~/api/registered_users/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "name": this.query.word }, (json) => {
		  if (json.result) {
			var result_registered_users_name = json.result.list;
			result_registered_users_name.map(o => o.title = o['name'])
	  			this.result_registered_users_name = result_registered_users_name
		 	}
		});
	},
						/**
	 * 获取gender
	 */
	get_registered_users_gender(){
		let url = "~/api/registered_users/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "gender": this.query.word }, (json) => {
		  if (json.result) {
			var result_registered_users_gender = json.result.list;
			result_registered_users_gender.map(o => o.title = o['gender'])
	  			this.result_registered_users_gender = result_registered_users_gender
		 	}
		});
	},
																								/**
	 * 获取classification_number
	 */
	get_registered_users_classification_number(){
		let url = "~/api/registered_users/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "classification_number": this.query.word }, (json) => {
		  if (json.result) {
			var result_registered_users_classification_number = json.result.list;
			result_registered_users_classification_number.map(o => o.title = o['classification_number'])
	  			this.result_registered_users_classification_number = result_registered_users_classification_number
		 	}
		});
	},
						/**
	 * 获取classification_categories
	 */
	get_registered_users_classification_categories(){
		let url = "~/api/registered_users/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "classification_categories": this.query.word }, (json) => {
		  if (json.result) {
			var result_registered_users_classification_categories = json.result.list;
			result_registered_users_classification_categories.map(o => o.title = o['classification_categories'])
	  			this.result_registered_users_classification_categories = result_registered_users_classification_categories
		 	}
		});
	},
						/**
	 * 获取label
	 */
	get_registered_users_label(){
		let url = "~/api/registered_users/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "label": this.query.word }, (json) => {
		  if (json.result) {
			var result_registered_users_label = json.result.list;
			result_registered_users_label.map(o => o.title = o['label'])
	  			this.result_registered_users_label = result_registered_users_label
		 	}
		});
	},
													/**
	 * 获取seller_id
	 */
	get_mall_seller_seller_id(){
		let url = "~/api/mall_seller/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "seller_id": this.query.word }, (json) => {
		  if (json.result) {
			var result_mall_seller_seller_id = json.result.list;
			result_mall_seller_seller_id.map(o => o.title = o['seller_id'])
	  			this.result_mall_seller_seller_id = result_mall_seller_seller_id
		 	}
		});
	},
																/**
	 * 获取production_date
	 */
	get_mall_center_production_date(){
		let url = "~/api/mall_center/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "production_date": this.query.word }, (json) => {
		  if (json.result) {
			var result_mall_center_production_date = json.result.list;
			result_mall_center_production_date.map(o => o.title = o['production_date'])
	  			this.result_mall_center_production_date = result_mall_center_production_date
		 	}
		});
	},
									/**
	 * 获取label
	 */
	get_mall_center_label(){
		let url = "~/api/mall_center/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "label": this.query.word }, (json) => {
		  if (json.result) {
			var result_mall_center_label = json.result.list;
			result_mall_center_label.map(o => o.title = o['label'])
	  			this.result_mall_center_label = result_mall_center_label
		 	}
		});
	},
										/**
	 * 获取product_name
	 */
	get_customized_products_product_name(){
		let url = "~/api/customized_products/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "product_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_customized_products_product_name = json.result.list;
			result_customized_products_product_name.map(o => o.title = o['product_name'])
	  			this.result_customized_products_product_name = result_customized_products_product_name
		 	}
		});
	},
															/**
	 * 获取product_category
	 */
	get_customized_products_product_category(){
		let url = "~/api/customized_products/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "product_category": this.query.word }, (json) => {
		  if (json.result) {
			var result_customized_products_product_category = json.result.list;
			result_customized_products_product_category.map(o => o.title = o['product_category'])
	  			this.result_customized_products_product_category = result_customized_products_product_category
		 	}
		});
	},
																												/**
	 * 获取order_number
	 */
	get_i_want_to_customize_order_number(){
		let url = "~/api/i_want_to_customize/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "order_number": this.query.word }, (json) => {
		  if (json.result) {
			var result_i_want_to_customize_order_number = json.result.list;
			result_i_want_to_customize_order_number.map(o => o.title = o['order_number'])
	  			this.result_i_want_to_customize_order_number = result_i_want_to_customize_order_number
		 	}
		});
	},
									/**
	 * 获取product_name
	 */
	get_i_want_to_customize_product_name(){
		let url = "~/api/i_want_to_customize/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "product_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_i_want_to_customize_product_name = json.result.list;
			result_i_want_to_customize_product_name.map(o => o.title = o['product_name'])
	  			this.result_i_want_to_customize_product_name = result_i_want_to_customize_product_name
		 	}
		});
	},
																																		/**
	 * 获取announcement_title
	 */
	get_notification_announcement_announcement_title(){
		let url = "~/api/notification_announcement/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "announcement_title": this.query.word }, (json) => {
		  if (json.result) {
			var result_notification_announcement_announcement_title = json.result.list;
			result_notification_announcement_announcement_title.map(o => o.title = o['announcement_title'])
	  			this.result_notification_announcement_announcement_title = result_notification_announcement_announcement_title
		 	}
		});
	},
						/**
	 * 获取publisher
	 */
	get_notification_announcement_publisher(){
		let url = "~/api/notification_announcement/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "publisher": this.query.word }, (json) => {
		  if (json.result) {
			var result_notification_announcement_publisher = json.result.list;
			result_notification_announcement_publisher.map(o => o.title = o['publisher'])
	  			this.result_notification_announcement_publisher = result_notification_announcement_publisher
		 	}
		});
	},
																/**
	 * 获取classification_number
	 */
	get_classification_information_classification_number(){
		let url = "~/api/classification_information/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "classification_number": this.query.word }, (json) => {
		  if (json.result) {
			var result_classification_information_classification_number = json.result.list;
			result_classification_information_classification_number.map(o => o.title = o['classification_number'])
	  			this.result_classification_information_classification_number = result_classification_information_classification_number
		 	}
		});
	},
						/**
	 * 获取classification_categories
	 */
	get_classification_information_classification_categories(){
		let url = "~/api/classification_information/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "classification_categories": this.query.word }, (json) => {
		  if (json.result) {
			var result_classification_information_classification_categories = json.result.list;
			result_classification_information_classification_categories.map(o => o.title = o['classification_categories'])
	  			this.result_classification_information_classification_categories = result_classification_information_classification_categories
		 	}
		});
	},
						
  },
  components: { list_result_search },
	created(){
    this.query.word = this.$route.query.word || "";
  },
  mounted() {
	this.get_goods();
	this.get_article();
	this.get_forum();
					this.get_registered_users_name();
							this.get_registered_users_gender();
																									this.get_registered_users_classification_number();
							this.get_registered_users_classification_categories();
							this.get_registered_users_label();
														this.get_mall_seller_seller_id();
																	this.get_mall_center_production_date();
										this.get_mall_center_label();
											this.get_customized_products_product_name();
																this.get_customized_products_product_category();
																													this.get_i_want_to_customize_order_number();
										this.get_i_want_to_customize_product_name();
																																			this.get_notification_announcement_announcement_title();
							this.get_notification_announcement_publisher();
																	this.get_classification_information_classification_number();
							this.get_classification_information_classification_categories();
						  },
  watch: {
	$route() {
	  $.push(this.query, this.$route.query);
	  this.get_goods();
	  this.get_article();
	  this.get_forum();
				  this.get_registered_users_name();
						  this.get_registered_users_gender();
																								  this.get_registered_users_classification_number();
						  this.get_registered_users_classification_categories();
						  this.get_registered_users_label();
													  this.get_mall_seller_seller_id();
																  this.get_mall_center_production_date();
									  this.get_mall_center_label();
										  this.get_customized_products_product_name();
															  this.get_customized_products_product_category();
																												  this.get_i_want_to_customize_order_number();
									  this.get_i_want_to_customize_product_name();
																																		  this.get_notification_announcement_announcement_title();
						  this.get_notification_announcement_publisher();
																  this.get_classification_information_classification_number();
						  this.get_classification_information_classification_categories();
							},
  },
};
</script>

<style scoped>
.card_search {
  text-align: center;
}
.card_result_search>.title {
  text-align: center;
  padding: 10px 0;
}
</style>
