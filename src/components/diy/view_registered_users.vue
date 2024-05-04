<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
		<el-row class="row_ce">
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="头像" prop="avatar">
					<el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg"
						action="" :http-request="uploadimg" :show-file-list="false">
						<img v-if="form.avatar" :src="$fullUrl(form.avatar)" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="账号" prop="username">
			        <span v-if="obj.username">{{obj.username}}</span>
					<el-input v-else v-model="form.username" placeholder="请输入账号"></el-input>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="密码" prop="password">
					<span v-if="obj.password">{{obj.password}}</span>
			        <el-input v-else type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="昵称" prop="nickname">
					<el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
				</el-form-item>
			</el-col>


			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="邮箱" prop="email">
					<el-input type="email" v-model="form.email" placeholder="请输入邮箱"></el-input>
				</el-form-item>
			</el-col>



			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="状态" prop="state">
					<el-select :disabled="user_group!=='管理员'" v-model="form.state" placeholder="请选择">
						<el-option v-for="group in list_user_state" :key="group.value" :label="group.name"
							:value="group.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>

				<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="会员等级" prop="vip_level">
					<el-select :disabled="user_group!=='管理员'" v-model="form.vip_level" placeholder="请选择" @change="vip_level_change">
						<el-option v-for="vip_level in list_user_vip_level" :key="vip_level.name" :label="vip_level.name"
								   :value="vip_level.name">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="会员折扣" prop="vip_discount">
					<el-input :disabled="true" v-model="form.vip_discount" placeholder="请输入会员折扣"></el-input>
				</el-form-item>
			</el-col>
	
						<el-col v-if="user_group === '管理员' || $check_field('get','name') || $check_field('add','name') || $check_field('set','name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="姓名" prop="name">
												<el-input id="name" v-model="form_sub['name']" placeholder="请输入姓名"
							  v-if="user_group === '管理员' || (form_sub['registered_users_id'] && $check_field('set','name')) || (!form_sub['registered_users_id'] && $check_field('add','name'))"></el-input>
					<div v-else-if="$check_field('get','name')">{{form_sub['name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','gender') || $check_field('add','gender') || $check_field('set','gender')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="性别" prop="gender">
								<el-select id="gender" v-model="form_sub['gender']"
						v-if="user_group === '管理员' || (form_sub['registered_users_id'] && $check_field('set','gender')) || (!form_sub['registered_users_id'] && $check_field('add','gender'))">
						<el-option v-for="o in list_gender" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','gender')">{{form_sub['gender']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','age') || $check_field('add','age') || $check_field('set','age')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="年龄" prop="age">
								<el-input-number id="age" v-model.number="form_sub['age']"
						v-if="user_group === '管理员' || (form_sub['registered_users_id'] && $check_field('set','age')) || (!form_sub['registered_users_id'] && $check_field('add','age'))"></el-input-number>
					<div v-else-if="$check_field('get','age')">{{form_sub['age']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','id_photo') || $check_field('add','id_photo') || $check_field('set','id_photo')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="证件照" prop="id_photo">
								<el-upload :disabled="disabledObj['id_photo_isDisabled']" id="id_photo" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_id_photo"
						:show-file-list="false" v-if="user_group === '管理员' || (form_sub['registered_users_id'] && $check_field('set','id_photo')) || (!form_sub['registered_users_id'] && $check_field('add','id_photo'))">
						<img v-if="form_sub['id_photo']" :src="$fullUrl(form_sub['id_photo'])" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-image v-else-if="$check_field('get','id_photo')" style="width: 100px; height: 100px"
						:src="$fullUrl(form_sub['id_photo'])" :preview-src-list="[$fullUrl(form_sub['id_photo'])]">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','date_of_birth') || $check_field('add','date_of_birth') || $check_field('set','date_of_birth')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="出生日期" prop="date_of_birth">
								<el-date-picker :disabled="disabledObj['date_of_birth_isDisabled']" v-if="user_group === '管理员' || (form_sub['registered_users_id'] && $check_field('set','date_of_birth')) || (!form_sub['registered_users_id'] && $check_field('add','date_of_birth'))" id="date_of_birth"
						v-model="form_sub['date_of_birth']" type="date" placeholder="选择日期">
					</el-date-picker>
					<div v-else-if="$check_field('get','date_of_birth')">{{form_sub['date_of_birth']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','registration_time') || $check_field('add','registration_time') || $check_field('set','registration_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="注册时间" prop="registration_time">
								<el-date-picker :disabled="disabledObj['registration_time_isDisabled']" v-if="user_group === '管理员' || (form_sub['registered_users_id'] && $check_field('set','registration_time')) || (!form_sub['registered_users_id'] && $check_field('add','registration_time'))" id="registration_time"
						v-model="form_sub['registration_time']" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
					<div v-else-if="$check_field('get','registration_time')">{{form_sub['registration_time']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','resume') || $check_field('add','resume') || $check_field('set','resume')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="简历" prop="resume">
												<div v-if="disabledObj['resume_isDisabled']">
						<div v-if="$check_field('get','resume')">
							<el-button type="primary" @click="$download($fullUrl(form['resume']),form['resume'])">下载<i
									class="el-icon-download el-icon--right"></i></el-button>
						</div>
					</div>
					<div v-else>
						<el-upload v-if="user_group === '管理员' || (form_sub['registered_users_id'] && $check_field('set','resume')) || (!form_sub['registered_users_id'] && $check_field('add','resume'))" class="upload-demo" drag
								   action="" style="max-width: 300px;width: 100%;" :http-request="upload_resume" :limit="1" accept="">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						</el-upload>
						<div v-else-if="$check_field('get','resume')">
							<el-button type="primary" @click="$download($fullUrl(form['resume']),form['resume'])">下载<i
									class="el-icon-download el-icon--right"></i></el-button>
						</div>
					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','number') || $check_field('add','number') || $check_field('set','number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="编号" prop="number">
								<el-select id="number" v-model="form_sub['number']"						v-if="user_group === '管理员' || (form_sub['registered_users_id'] && $check_field('set','number')) || (!form_sub['registered_users_id'] && $check_field('add','number'))">
						<el-option v-for="o in list_number" :key="o['classification_number']" :label="o['classification_number']"
							:value="o['classification_number']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','number')">{{form_sub['number']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','classification_number') || $check_field('add','classification_number') || $check_field('set','classification_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="分类编号" prop="classification_number">
								<el-select id="classification_number" v-model="form_sub['classification_number']" @change="select_classification_number_field"						v-if="user_group === '管理员' || (form_sub['registered_users_id'] && $check_field('set','classification_number')) || (!form_sub['registered_users_id'] && $check_field('add','classification_number'))">
						<el-option v-for="o in list_classification_number" :key="o['classification_number']" :label="o['classification_number']"
							:value="o['classification_number']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','classification_number')">{{form_sub['classification_number']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','classification_categories') || $check_field('add','classification_categories') || $check_field('set','classification_categories')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="分类类别" prop="classification_categories">
								<el-input id="classification_categories" v-model="form_sub['classification_categories']"
						v-if="user_group === '管理员' || (form_sub['registered_users_id'] && $check_field('set','classification_categories')) || (!form_sub['registered_users_id'] && $check_field('add','classification_categories'))" :disabled="true"></el-input>
					<div v-else-if="$check_field('get','classification_categories')">{{form_sub['classification_categories']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','label') || $check_field('add','label') || $check_field('set','label')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="标签" prop="label">
								<el-select id="label" v-model="label_multiple_value" multiple @change="select_label_multiple"
							   v-if="user_group === '管理员' || (form_sub['registered_users_id'] && $check_field('set','label')) || (!form_sub['registered_users_id'] && $check_field('add','label'))">
						<el-option v-for="o in list_label" :key="o['classification_categories']" :label="o['classification_categories']"
								   :value="o['classification_categories']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','label')">{{form_sub['label']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','id_card') || $check_field('add','id_card') || $check_field('set','id_card')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="身份证" prop="id_card">
												<el-input id="id_card" v-model="form_sub['id_card']" placeholder="请输入身份证"
							  v-if="user_group === '管理员' || (form_sub['registered_users_id'] && $check_field('set','id_card')) || (!form_sub['registered_users_id'] && $check_field('add','id_card'))"></el-input>
					<div v-else-if="$check_field('get','id_card')">{{form_sub['id_card']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','mobile_phone') || $check_field('add','mobile_phone') || $check_field('set','mobile_phone')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="手机" prop="mobile_phone">
								<el-input id="mobile_phone" v-model="form_sub['mobile_phone']" placeholder="请输入手机" type="tel"
						v-if="user_group === '管理员' || (form_sub['registered_users_id'] && $check_field('set','mobile_phone')) || (!form_sub['registered_users_id'] && $check_field('add','mobile_phone'))">
					</el-input>
					<div v-else-if="$check_field('get','mobile_phone')">{{form_sub['mobile_phone']}}</div>
							</el-form-item>
			</el-col>
			

		
	</el-row>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item v-if="$check_action('/registered_users/view','set') || $check_action('/registered_users/view','add') || $check_option('/registered_users/table','examine')">
					<el-button type="primary" @click="submit()">提交</el-button>
					<el-button @click="cancel()">取消</el-button>
				</el-form-item>
				<el-form-item v-else>
					<el-button @click="cancel()">返回</el-button>
				</el-form-item>
			</el-col>

		</el-form>
	</el-main>
</template>

<script>
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				field: "user_id",
				url_add: "~/api/user/register?",
				url_set: "~/api/user/set?",
				url_get_obj: "~/api/user/get_obj?",
				url_upload: "~/api/user/upload?",

				group_table: "registered_users",
				is_password: true,

				query: {
					"user_id": 0,
				},

				obj: {
					user_id: 0,
					username: '',
					nickname: '',
					password: '',
					avatar: '',
					// phone: '',
					email: '',
					user_group: "注册用户",
					// phone_state: 0,
					// email_state: 0,
					state: 1,
					vip_level: '',
					vip_discount: 0
				},

				form: {
					user_id: 0,
				    username: '',
					nickname: '',
				    password: '',
					avatar: '',
					// phone: '',
					email: '',
					user_group: "注册用户",
					// phone_state: 0,
					// email_state: 0,
					state: 1,
					vip_level: '',
					vip_discount: 0
				},

				disabledObj:{
								"name_isDisabled": false,
										"gender_isDisabled": false,
															"id_photo_isDisabled": false,
										"date_of_birth_isDisabled": false,
										"registration_time_isDisabled": false,
										"resume_isDisabled": false,
										"number_isDisabled": false,
										"classification_number_isDisabled": false,
										"classification_categories_isDisabled": false,
										"label_isDisabled": false,
										"id_card_isDisabled": false,
										"mobile_phone_isDisabled": false,
							},

				form_sub: {
								"name":  '', // 姓名
										"gender":  '', // 性别
										"age":  0, // 年龄
										"id_photo":  '', // 证件照
										"date_of_birth":  '', // 出生日期
										"registration_time":  '', // 注册时间
										"resume":  '', // 简历
										"number":  '', // 编号
										"classification_number":  '', // 分类编号
										"classification_categories":  '', // 分类类别
										"label":  '', // 标签
										"id_card":  '', // 身份证
										"mobile_phone":  '', // 手机
									    "user_id": 0,
					"registered_users_id": 0 // ID
				},

				list_state: [{
					value: 0,
					name: "未认证"
				}, {
					value: 1,
					name: "审核中"
				}, {
					value: 2,
					name: "已认证"
				}],

				list_user_state: [{
					value: 1,
					name: "可用"
				}, {
					value: 2,
					name: "异常"
				}, {
					value: 3,
					name: "已冻结"
				}, {
					value: 4,
					name: "已注销"
				}],
					list_user_vip_level:[],
	

	
								// 性别选项列表
				list_gender: ['男','女'],
	
		
		
		
		
		
								// 编号选项列表
				list_number: [""],
	
								// 分类编号选项列表
				list_classification_number: [""],
	
		
								label_multiple_value:[],
						// 标签选项列表
				list_label: [""],
	
		
		
	
			}
		},
		methods: {


	
	
			
	
			
	
						/**
			 * 上传证件照
			 * @param {Object} param 图片参数
			 */
			upload_id_photo(param){
						let _this = this;
				var form = new FormData() // FormData 对象
				form.append('file', param.file) // 文件对象
				this.$upload(this.url_upload, form, function(json) {
					if (json.result) {
						_this.form_sub['id_photo'] = json.result.url;
					} else {
						_this.$toast('上传失败！');
					}
				});
					},
	
	
			
	
			
	
						/**
			 * 上传简历
			 * @param {Object} param 文件参数
			 */
			upload_resume(param){
						let _this = this;
				var form = new FormData() // FormData 对象
				form.append('file', param.file) // 文件对象
				this.$upload(this.url_upload, form, function(json) {
					if (json.result) {
						_this.form_sub['resume'] = json.result.url;
					} else {
						_this.$toast('上传失败！');
					}
				});
					},
	
	
			
				/**
			 * 获取编号列表
			 */
			async get_list_number() {
				var json = await this.$get("~/api/classification_information/get_list?");
				if(json.result && json.result.list){
					this.list_number = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
					
			
				/**
			 * 获取分类编号列表
			 */
			async get_list_classification_number() {
				var json = await this.$get("~/api/classification_information/get_list?");
				if(json.result && json.result.list){
					this.list_classification_number = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
					select_classification_number_field(v){
				this.$get('~/api/classification_information/get_obj?classification_number='+v,{},(res)=>{
					if(res.result && res.result.obj){
																																																																																																																																																			this.form_sub.classification_categories = res.result.obj.classification_categories;
																																																																	}else{
						console.error(res.error);
					}
				})
			},
					
			
	
			
				/**
			 * 获取标签列表
			 */
			async get_list_label() {
				var json = await this.$get("~/api/classification_information/get_list?");
				if(json.result && json.result.list){
					this.list_label = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
							select_label_multiple(v){
									this.form_sub.label = "";
								if (v && v.length > 0) {
											this.form_sub.label = v.toString();
									}
			},
			
			
	
			
	
		
			/**
			 * 获取对象之前
			 * @param {Object} param
			 */
			get_obj_before(param) {
				var form = "";
														if(this.form && form){
					Object.keys(this.form).forEach(key => {
						Object.keys(form).forEach(dbKey => {
							// if(dbKey === "charging_standard"){
							// 	this.form['charging_rules'] = form[dbKey];
							// 	this.disabledObj['charging_rules_isDisabled'] = true;
							// };
							if(key === dbKey){
								this.disabledObj[key+'_isDisabled'] = true;
							}
						})
					})
				}
										        if (this.form["date_of_birth"] && this.form["date_of_birth"].indexOf("-")===-1){
          this.form["date_of_birth"] = this.$toTime(parseInt(this.form["date_of_birth"]),"yyyy-MM-dd")
        }
		        if (this.form["registration_time"] && this.form["registration_time"].indexOf("-")===-1){
            this.form["registration_time"] = this.$toTime(parseInt(this.form["registration_time"]),"yyyy-MM-dd hh:mm:ss")
        }
																				$.db.del("form");

				return param;
			},

			/**
			 * 获取对象之后
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json, func){
				var user = json.result.obj;
				this.is_password = user.password ? false : true;
				var user_id = user.user_id;
				this.$get("~/api/" + this.group_table + "/get_obj?" ,{user_id} ,(res)=>{
					if(res.result && res.result.obj){
						var o = res.result.obj;
						delete o["create_time"];
						delete o["update_time"];
						this.form_sub = res.result.obj;
																																							if (res.result.obj.label){
							this.label_multiple_value = res.result.obj.label.split(",")
						}
														}else if(res.error){
						console.log(res.error);
						console.log("获取不到相关信息");
					}
				})

																						if(json.result.obj["date_of_birth"]=="0000-00-00"){
				  json.result.obj["date_of_birth"] = null;
				}
				if(parseInt(json.result.obj["date_of_birth"]) > 9999){
					json.result.obj["date_of_birth"] = this.$toTime(parseInt(json.result.obj["date_of_birth"]),"yyyy-MM-dd")
				}
								if(json.result.obj["registration_time"]=="0000-00-00 00:00:00"){
				  json.result.obj["registration_time"] = null;
				}
				if(parseInt(json.result.obj["registration_time"]) > 9999){
					json.result.obj["registration_time"] = this.$toTime(parseInt(json.result.obj["registration_time"]),"yyyy-MM-dd hh:mm:ss")
				}
																												if (json.result.obj.label){
					this.label_multiple_value = json.result.obj.label.split(",")
				}
									

			},

			async submit(param, func){
				if (!param) {
					param = this.form;
				}
				var pm = this.events("submit_before", Object.assign({}, param)) || param;
				var msg = await this.events("submit_check", pm);
				var ret;
				if (msg) {
					this.$toast(msg, 'danger');
				} else {
					ret = this.events("submit_main", pm, func);
				}
				return ret;
			},

			// 提交前校验
			async submit_check(param){
				var ret = null;

				var email_regular = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				// var phone_regular = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

				// var {username ,password ,nickname ,user_group ,email ,phone} = param;
				var {username ,password ,nickname ,user_group ,email} = param;

				var confirm_password = this.confirm_password;

				console.log("表单校验username ,password ,email ,nickname ,user_group" ,username ,password ,email ,nickname ,user_group);

				if(!username){
					ret = "账号不能为空";
				}
				else if(username.length > 16 || username.length < 5){
					ret = "账号长度应为5到16个字符之间！";
				}
				else if(!password){
					ret = "密码不能为空!";
				}
				else if(this.is_password && (password.length > 16 || password.length < 5)){
					ret = "密码长度应为5到16个字符之间！";
				}
				else if(nickname && nickname.length > 12 || nickname.length < 2){
					ret = "昵称长度应为2个字符到12个字符之间";
				}
				else if(email && !email_regular.test(email)){
					ret = "请输入正确的邮箱地址 例：test@test.com!";
				}
				// else if(phone && !phone_regular.test(phone)){
				// 	ret = "请输入正确的手机号码 例：18955552312!";
				// }
				else if(!user_group){
					ret = "请选择用户组!";
				}

				var p = {"username": param.username};

				var form_sub = Object.assign({} ,this.form_sub);
																																																																	if (!ret && !form_sub["date_of_birth"]){
					return "出生日期不能为空";
				}
																					if (!ret && !form_sub["registration_time"]){
					return "注册时间不能为空";
				}
																																																																																																				let id_card_id_regular = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
				if(form_sub.id_card && !id_card_id_regular.test(form_sub.id_card)){
					return "身份证号格式错误"
				}
															let mobile_phone_phone_regular = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
				if(form_sub.mobile_phone && !mobile_phone_phone_regular.test(form_sub.mobile_phone)){
					return "手机号格式错误"
				}
											
				return ret;
			},

			// 提交成功后
			submit_after(json,func){
				var form = Object.assign({} ,this.form);
				delete form.password;
				console.log("查询表单form",form)
				this.get_register(form);
			},

			/**
			 * 获取注册表信息
			 * @param {Object} form
			 * @param {Object} table
			 */
			get_register(form){
				var form_sub = this.form_sub;
				this.$get("~/api/user/get_obj?",form,(res)=>{
					console.log("注册表信息res",res);
					if(res.result && res.result.obj){
						form_sub.user_id = res.result.obj.user_id;
						this.submit_sub(form_sub);
					}else if(res.error){
						console.error(res.error);
						this.$toast(res.error.message,"error");
					}
				})
			},

			// 提交附加信息
			submit_sub(form_sub){
        form_sub = this.events("submit_before", Object.assign({}, form_sub)) || form_sub;
				if(form_sub["registered_users_id"]){
					// 提交事件
					this.$post("~/api/" + this.group_table + "/set?registered_users_id=" + form_sub["registered_users_id"],form_sub,(res)=>{
						console.log("提交结果：" ,res)
						if(res.result){
							this.$toast("修改成功!" ,"success");
							this.$router.go(-1);
						}else if(res.error){
							console.error(res.error);
							this.$toast(res.error.message,"error");
						}
					});
				}
				else{
					// 提交事件
					this.$post("~/api/" + this.group_table + "/add?",form_sub,(res)=>{
						console.log("提交结果：" ,res)
						if(res.result){
							this.$toast("添加成功!" ,"success");
							this.$router.go(-1);
						}else if(res.error){
							var user_id = form_sub["user_id"];
							this.$get("~/api/user/del?",{user_id});
							console.error(res.error);
							this.$toast(res.error.message,"error");
						}
					});
				}
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/registered_users/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/registered_users/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/registered_users/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/registered_users/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/registered_users/view','get');
					console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
				}

				console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

				return bl;
			},
			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadimg(param) {
				this.uploadFile(param.file, "avatar");
			},
			async get_list_vip_level() {
				var list = await this.$get("~/api/vip_level/get_list?");
				this.list_user_vip_level = list.result.list;
			},
			vip_level_change(v){
				for (let i=0;i<this.list_user_vip_level.length;i++){
					if (v==this.list_user_vip_level[i].name){
						this.form.vip_discount = this.list_user_vip_level[i].discount
						this.obj.vip_discount = this.list_user_vip_level[i].discount
						break
					}
				}
			},

		},
		created() {
																		this.get_list_number();
						this.get_list_classification_number();
								this.get_list_label();
									this.get_list_vip_level();
		},
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
