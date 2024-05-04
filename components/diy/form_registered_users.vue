<template>
	<div>
			<view v-if="$check_register_field('add','name','/registered_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					姓名:
				</text>
			</view>
									<!-- 文本 -->
				<view class="diy_field diy_text">
					<input type="text" id="form_name" v-model="form['name']" @blur="handleBlur($event.target.value,'name')"  placeholder="请输入姓名" />
				</view>
							</view>
				<view v-if="$check_register_field('add','gender','/registered_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					性别:
				</text>
			</view>
					<!-- 选项 -->
			<view class="diy_field diy_down">
				<uni-data-select
						id="form_gender"
						v-model="form['gender']"
						:localdata="list_gender"
						@change="change_gender"
				></uni-data-select>
			</view>
				</view>
				<view v-if="$check_register_field('add','age','/registered_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					年龄:
				</text>
			</view>
									<!-- 文本 -->
				<view class="diy_field diy_text">
					<input type="text" id="form_age" v-model="form['age']" @blur="handleBlur($event.target.value,'age')"  placeholder="请输入年龄" />
				</view>
							</view>
				<view v-if="$check_register_field('add','id_photo','/registered_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					证件照:
				</text>
			</view>
					<!-- 图片 -->
			<!-- 修改权限 -->
			<view class="diy_field diy_img" v-if="form['id_photo']" >
				<image style="width: 50px;height: 50px" :src="$fullUrl(form['id_photo'])" @click="change_img('id_photo')" />
			</view>
			<!-- 添加权限 -->
			<view class="diy_field diy_img" v-else-if="!form['id_photo']" >
				<view class="btn_add_img" @click="change_img('id_photo')">
					<text>+</text>
				</view>
			</view>
				</view>
				<view v-if="$check_register_field('add','date_of_birth','/registered_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					出生日期:
				</text>
			</view>
					<!-- 日期 -->
			<view class="diy_field diy_date">
				<input type="date" id="form_date_of_birth" v-model="form['date_of_birth']" placeholder="请输入出生日期" />
			</view>
				</view>
				<view v-if="$check_register_field('add','registration_time','/registered_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					注册时间:
				</text>
			</view>
					<!-- 日长 -->
			<view class="diy_field diy_datetime">
				<uni-datetime-picker type="datetime" id="form_registration_time" v-model="form['registration_time']" placeholder="请输入注册时间" ></uni-datetime-picker>
			</view>
				</view>
				<view v-if="$check_register_field('add','resume','/registered_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					简历:
				</text>
			</view>
									<!-- 文本 -->
				<view class="diy_field diy_text">
					<input type="text" id="form_resume" v-model="form['resume']" @blur="handleBlur($event.target.value,'resume')"  placeholder="请输入简历" />
				</view>
							</view>
				<view v-if="$check_register_field('add','number','/registered_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					编号:
				</text>
			</view>
					<!-- 选项 -->
			<view class="diy_field diy_down">
				<uni-data-select
						id="form_number"
						v-model="form['number']"
						:localdata="list_number"
						@change="change_number"
				></uni-data-select>
			</view>
				</view>
				<view v-if="$check_register_field('add','classification_number','/registered_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					分类编号:
				</text>
			</view>
					<!-- 选项 -->
			<view class="diy_field diy_down">
				<uni-data-select
						id="form_classification_number"
						v-model="form['classification_number']"
						:localdata="list_classification_number"
						@change="change_classification_number"
				></uni-data-select>
			</view>
				</view>
				<view v-if="$check_register_field('add','classification_categories','/registered_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					分类类别:
				</text>
			</view>
					<!-- 仅查看 -->
			<view class="diy_field diy_disabled">
				<text>
					{{ form['classification_categories'] }}
				</text>
			</view>
				</view>
				<view v-if="$check_register_field('add','label','/registered_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					标签:
				</text>
			</view>
					<!-- 选项 -->
			<view class="diy_field diy_down">
				<ld-select :multiple="true" :list="list_label"
						   label-key="text" value-key="value"
						   placeholder="请选择"
						   v-model="label_multiple_value"
						   @confirm="change_label"></ld-select>
			</view>
				</view>
				<view v-if="$check_register_field('add','id_card','/registered_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					身份证:
				</text>
			</view>
									<!-- 文本 -->
				<view class="diy_field diy_text">
					<input type="text" id="form_id_card" v-model="form['id_card']" @blur="handleBlur($event.target.value,'id_card')"  placeholder="请输入身份证" />
				</view>
							</view>
				<view v-if="$check_register_field('add','mobile_phone','/registered_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					手机:
				</text>
			</view>
					<!-- 手机 -->
			<view class="diy_field diy_phone">
				<input type="text" id="form_mobile_phone" v-model="form['mobile_phone']" @blur="handleBlur($event.target.value,'mobile_phone')" placeholder="请输入手机" />
			</view>
				</view>
		</div>
</template>

<script>
														import ldSelect from "@/components/ld-select/ld-select.vue";
	export default {
		components: {ldSelect},
		model: {
			prop: "form",
			event: "change"
		},
		props: {
			form: {
				type: Object,
				default: ()=>{
					return {
						url_upload: "~/api/registered_users/upload?",
					}
				}
			}
		},
		data(){
			return {
								"list_gender": [],
																		"list_number": [],
													"list_classification_number": [],
														label_multiple_value:[],
							"list_label": [],
								}
		},
		methods: {
					/**
			 * 获取性别列表
			 */
			async get_list_gender() {
									['男','女'].map((o) => this.list_gender.push({value:o,text:o}));
											},
			change_gender(val) {
				if (val === "全部" || val === "") {
					this.$emit('change',{"value":"","type":"gender"})
				}else{
					this.$emit('change',{"value":val,"type":"gender"})
				}
									},
										/**
			 * 获取编号列表
			 */
			async get_list_number() {
												var json = await this.$get("~/api/classification_information/get_list?");
				if(json.result && json.result.list){
					json.result.list.map((o) => this.list_number.push({value:o.classification_number,text:o.classification_number}));
				}
				else if(json.error){
					console.error(json.error);
				}
							},
			change_number(val) {
				if (val === "全部" || val === "") {
					this.$emit('change',{"value":"","type":"number"})
				}else{
					this.$emit('change',{"value":val,"type":"number"})
				}
									},
					/**
			 * 获取分类编号列表
			 */
			async get_list_classification_number() {
												var json = await this.$get("~/api/classification_information/get_list?");
				if(json.result && json.result.list){
					json.result.list.map((o) => this.list_classification_number.push({value:o.classification_number,text:o.classification_number}));
				}
				else if(json.error){
					console.error(json.error);
				}
							},
			change_classification_number(val) {
				if (val === "全部" || val === "") {
					this.$emit('change',{"value":"","type":"classification_number"})
				}else{
					this.$emit('change',{"value":val,"type":"classification_number"})
				}
							if (val){
					this.$get('~/api/classification_information/get_obj?classification_number='+val,{},(res)=>{
						if(res.result && res.result.obj){
																																																																																																								this.$set(this.form, "classification_categories", res.result.obj.classification_categories);
																																										}else{
							console.error(res.error);
						}
					})
				}
									},
						/**
			 * 获取标签列表
			 */
			async get_list_label() {
												var json = await this.$get("~/api/classification_information/get_list?");
				if(json.result && json.result.list){
					json.result.list.map((o) => this.list_label.push({value:o.classification_categories,text:o.classification_categories}));
				}
				else if(json.error){
					console.error(json.error);
				}
							},
			change_label(val) {
				if (val === "全部" || val === "") {
					this.$emit('change',{"value":"","type":"label"})
				}else{
					this.$emit('change',{"value":val,"type":"label"})
				}
										this.form.label = "";
				if (this.label_multiple_value && this.label_multiple_value.length>0){
					this.form.label = this.label_multiple_value.toString();
				}
						},
						/**
			 * 上传图片
			 * @param {Object} param文件参数
			 */
			change_img(key_name){
				var _self = this;
				_self.upload_img_flag = false
				// 选择图像方法
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: _self.$fullUrl('/api/registered_users/upload?'),
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'i_want_to_customize': 'test'
							},
							header: {
								'x-auth-token': "null"
							},
							success: function(uploadFileRes) {
								var filename = JSON.parse(uploadFileRes.data).result.url
								_self.$delete(_self.form,key_name);
								_self.$set(_self.form,key_name,filename);
								_self.handleBlur(filename,key_name);
							}
						});

						uploadTask.onProgressUpdate(function(res) {
							_self.percent = res.progress;
							console.log('上传进度' + res.progress);
							console.log('已经上传的数据长度' + res.totalBytesSent);
							console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
						});
					},
					error: function(e) {
						console.log(e);
					}
				});
			},
			handleBlur(value,type){
				this.$emit('change',{value,type})
			}
		},
    mounted(){
						this.get_list_gender();
																this.get_list_number();
						this.get_list_classification_number();
								this.get_list_label();
								}
	}
</script>

<style>
.col-md-6{
	display: flex;
	margin-bottom: 1.25rem;
	height: 36px;
}
.diy_title{
	/* flex: 1.2; */
	display: inline-block;
	width: 5.0625rem;
	margin-right: 0.3125rem;
	font-size: 0.875rem;
    color: #333;
		padding-top: 0.3125rem;
}
.diy_field{
	/* flex: 5; */
	display: inline-block;
	width: 100%;
	background: #ffffff;
	height: 2.25rem;
	line-height:  2.25rem;
	border-radius: 0.25rem;
	padding-left: 0.625rem;


	}
	.diy_field input{
		display: inline;
		font-size: 0.875rem;
	}
</style>
