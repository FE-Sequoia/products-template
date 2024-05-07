<template>
	<el-form ref="form" :rules="rules" :model="form" status-icon label-width="80px">
					<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
			<el-form-item label="商家姓名" prop="merchant_name">
						<el-input id="merchant_name" v-model="form['merchant_name']" placeholder="请输入商家姓名"
					v-if="user_group == '管理员' || (form['mall_center_id'] && $check_field('set','merchant_name') ) || $check_field('add','merchant_name')"></el-input>
				<div v-else-if="$check_field('get','merchant_name')">{{form['merchant_name']}}</div>
					</el-form-item>
		</el-col>
				<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
			<el-form-item label="生产日期" prop="production_date">
						<el-date-picker v-if="user_group == '管理员' || (form['mall_center_id'] && $check_field('set','production_date') ) || $check_field('add','production_date')" id="production_date"
					v-model="form['production_date']" type="date" placeholder="选择日期">
				</el-date-picker>
				<div v-else-if="$check_field('get','production_date')">{{form['production_date']}}</div>
					</el-form-item>
		</el-col>
				<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
			<el-form-item label="保质期" prop="shelf_life">
						<el-date-picker v-if="user_group == '管理员' || (form['mall_center_id'] && $check_field('set','shelf_life') ) || $check_field('add','shelf_life')" id="shelf_life"
					v-model="form['shelf_life']" type="datetime" placeholder="选择日期时间">
				</el-date-picker>
				<div v-else-if="$check_field('get','shelf_life')">{{form['shelf_life']}}</div>
					</el-form-item>
		</el-col>
				<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
			<el-form-item label="标签" prop="label">
						<el-input id="label" v-model="form['label']" placeholder="请输入标签"
					v-if="user_group == '管理员' || (form['mall_center_id'] && $check_field('set','label') ) || $check_field('add','label')"></el-input>
				<div v-else-if="$check_field('get','label')">{{form['label']}}</div>
					</el-form-item>
		</el-col>
	


		<el-col :xs="24" :sm="24" :lg="24" style="text-align: center;" class="el_form_btn_warp">
			<el-button type="primary" @click="submit()">提交</el-button>
			<el-button @click="cancel()">取消</el-button>
		</el-col>

	</el-form>
</template>

<script>
	import mixin from "../../mixins/component.js";

	export default {
		mixins: [mixin],
		props:{
			query: {
				type: Object,
				default: function(){
					return {
						"mall_center_id": 0
					}
				}
			},
			form_goods:{
				type: Object,
				default: function(){
					return {}
				}
			},
			func_check:{
				type: Function,
				default: function(fun){
					console.log("调试输出",fun);
				}
			},
			func_submit:{
				type: Function,
				default: function(fun){
					console.log("调试输出",fun);
				}
			}
		},
		data() {
			return {
				field: "mall_center_id",
				url_add: "~/api/mall_center/add?",
				url_set: "~/api/mall_center/set?",
				url_get_obj: "~/api/mall_center/get_obj?",
				url_upload: "~/api/mall_center/upload?",

				form: {
						"mall_seller": 0,
							"merchant_name":  '',
							"production_date":  '',
							"shelf_life":  '',
							"label":  '',
					},

					
				rules: {
					"mall_seller": [     {required: true,message: '商城卖家不能为空'},  ],
					"merchant_name": [     {required: true,message: '商家姓名不能为空'},  ],
					"production_date": [     {required: true,message: '生产日期不能为空'},  ],
					"shelf_life": [     {required: true,message: '保质期不能为空'},  ],
					"label": [     {required: true,message: '标签不能为空'},  ],
				}

			}
		},
		methods: {

			/**
			 * 请求列表前
			 * @param {Object} param
			 */
			get_list_before(param) {
				var user_group = this.user.user_group;
				if (user_group !== "管理员") {
					switch (user_group) {
									case "商城卖家":
							param["mall_seller"] = this.user.user_id;
							break;
																				}
				}

				return param;
			},

	
	
		
	
		
	
		
	
		
	
	
			submit(){
				this.func_check(()=>{
					this.$refs["form"].validate((valid) => {
						if (valid) {
							this.submit();
						} else {
							console.error('error 提交失败!!');
						}
					});
				})
			},

			submit_after(){
				var source_id = this.form_goods.source_id;
				if(source_id){
					this.func_submit();
				}else{
					this.$get('~/api/mall_center/get_obj?',this.form,(res)=>{
						if(res.result && res.result.obj){
							this.form_goods.source_id = res.result.obj["mall_center_id"];
							this.func_submit();
						}else{
							console.error(res.error);
						}

					})
				}
			}
		},
		created() {
							}
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
