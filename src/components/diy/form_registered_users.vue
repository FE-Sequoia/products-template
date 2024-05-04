<template>
	<div>
			<el-form-item v-if="$check_register_field('add','name','/registered_users/view')" label="姓名" prop="name">
				<el-input id="name" v-model="form['name']" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item v-if="$check_register_field('add','gender','/registered_users/view')" label="性别" prop="gender">
				<el-select id="gender" v-model="form['gender']">
			<el-option v-for="o in list_gender" :key="o" :label="o" :value="o">
			</el-option>
		</el-select>
				</el-form-item>
				<el-form-item v-if="$check_register_field('add','age','/registered_users/view')" label="年龄" prop="age">
				<el-input-number id="age" v-model.number="form['age']"></el-input-number>
				</el-form-item>
				<el-form-item v-if="$check_register_field('add','id_photo','/registered_users/view')" label="证件照" prop="id_photo">
				<el-upload id="id_photo" class="avatar-uploader" drag
			accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="uploadimg_id_photo"
			:show-file-list="false" >
			<img v-if="form['id_photo']" :src="$fullUrl(form['id_photo'])" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
				</el-form-item>
				<el-form-item v-if="$check_register_field('add','date_of_birth','/registered_users/view')" label="出生日期" prop="date_of_birth">
				<el-date-picker id="date_of_birth" v-model="form['date_of_birth']" type="date" placeholder="选择日期">
		</el-date-picker>
				</el-form-item>
				<el-form-item v-if="$check_register_field('add','registration_time','/registered_users/view')" label="注册时间" prop="registration_time">
				<el-date-picker v-model="form['registration_time']" type="datetime" placeholder="选择日期时间">
		</el-date-picker>
				</el-form-item>
				<el-form-item v-if="$check_register_field('add','resume','/registered_users/view')" label="简历" prop="resume">
				<el-upload class="upload-demo" drag
			action="" :http-request="uploadfile">
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		</el-upload>
				</el-form-item>
				<el-form-item v-if="$check_register_field('add','number','/registered_users/view')" label="编号" prop="number">
				<el-select id="number" v-model="form['number']">
			<el-option v-for="o in list_number" :key="o.classification_number" :label="o.classification_number"
				:value="o.classification_number">
			</el-option>
		</el-select>
				</el-form-item>
				<el-form-item v-if="$check_register_field('add','classification_number','/registered_users/view')" label="分类编号" prop="classification_number">
				<el-select id="classification_number" v-model="form['classification_number']" @change="select_classification_number_field">
			<el-option v-for="o in list_classification_number" :key="o.classification_number" :label="o.classification_number"
				:value="o.classification_number">
			</el-option>
		</el-select>
				</el-form-item>
				<el-form-item v-if="$check_register_field('add','classification_categories','/registered_users/view')" label="分类类别" prop="classification_categories">
				<el-input id="classification_categories" v-model="form['classification_categories']"
			:disabled="true"></el-input>
				</el-form-item>
				<el-form-item v-if="$check_register_field('add','label','/registered_users/view')" label="标签" prop="label">
				<el-select id="label" v-model="label_multiple_value" multiple @change="select_label_multiple">
			<el-option v-for="o in list_label" :key="o.classification_categories" :label="o.classification_categories"
					   :value="o.classification_categories">
			</el-option>
		</el-select>
				</el-form-item>
				<el-form-item v-if="$check_register_field('add','id_card','/registered_users/view')" label="身份证" prop="id_card">
				<el-input id="id_card" v-model="form['id_card']" placeholder="请输入身份证"></el-input>
				</el-form-item>
				<el-form-item v-if="$check_register_field('add','mobile_phone','/registered_users/view')" label="手机" prop="mobile_phone">
				<el-input id="mobile_phone" v-model="form['mobile_phone']" placeholder="请输入手机" type="tel">
		</el-input>
				</el-form-item>
	
	</div>
</template>

<script>
	import mixin from "@/mixins/component.js";

	export default {
		mixins: [mixin],
		props:{

			form:{
				type: Object,
				default: function(){
					return {
							"name":  '' ,
								"gender":  '' ,
								"age":  0 ,
								"id_photo":  '' ,
								"date_of_birth":  '' ,
								"registration_time":  '' ,
								"resume":  '' ,
								"number":  '' ,
								"classification_number":  '' ,
								"classification_categories":  '' ,
								"label":  '' ,
								"id_card":  '' ,
								"mobile_phone":  '' ,
						}
				}
			},

		},
		data() {
			return {
				field: "registered_users_id",
				url_add: "~/api/registered_users/add?",
				url_set: "~/api/registered_users/set?",
				url_upload: "~/api/registered_users/upload?",

								list_gender: ['男','女'],
													list_number: [""],
								list_classification_number: [""],
									label_multiple_value:[],
						list_label: [""],
							rules: {
					"name": [    {required: true,message: '姓名不能为空'},  ],
					"gender": [    {required: true,message: '性别不能为空'},  ],
					"age": [     {type: 'number',required: true,message: '年龄不能为空'},  ],
					"id_photo": [    {required: true,message: '证件照不能为空'},  ],
					"date_of_birth": [    {required: true,message: '出生日期不能为空'},  ],
					"registration_time": [    {required: true,message: '注册时间不能为空'},  ],
					"resume": [    {required: true,message: '简历不能为空'},  ],
					"number": [    {required: true,message: '编号不能为空'},  ],
					"classification_number": [    {required: true,message: '分类编号不能为空'},  ],
					"classification_categories": [    {required: true,message: '分类类别不能为空'},  ],
					"label": [    {required: true,message: '标签不能为空'},  ],
					"id_card": [    {required: true,message: '身份证不能为空'},  ],
					"mobile_phone": [   {validator: this.$is_phone,trigger: 'blur'},   {required: true,message: '手机不能为空'},  ],
				}

			}
		},
		methods: {

	
	
	

	
	
	

	
	
	

				/**
			 * 上传证件照
			 * @param {Object} param 图片参数
			 */
			uploadimg_id_photo(param) {
				this.uploadFile(param.file, "id_photo");
			},
	
	
	

	
	
	

	
	
	

	
				/**
			 * 上传简历
			 * @param {Object} param 文件参数
			 */
			uploadimg(param) {
				this.uploadFile(param.file, "resume");
			},
	
	

	
	
				/**
			 * 获取编号列表
			 */
			async get_list_number() {
				var list = await this.$get("~/api/classification_information/get_list?");
				this.list_number = list.result.list;
			},
					

	
	
				/**
			 * 获取分类编号列表
			 */
			async get_list_classification_number() {
				var list = await this.$get("~/api/classification_information/get_list?");
				this.list_classification_number = list.result.list;
			},
					select_classification_number_field(v){
				this.$get('~/api/classification_information/get_obj?classification_number='+v,{},(res)=>{
					if(res.result && res.result.obj){
																																																																																		this.$set(this.form,"classification_categories",res.result.obj.classification_categories);
																																	}else{
						console.error(res.error);
					}
				})
			},
					

	
	
	

	
	
				/**
			 * 获取标签列表
			 */
			async get_list_label() {
				var list = await this.$get("~/api/classification_information/get_list?");
				this.list_label = list.result.list;
			},
							select_label_multiple(v){
				this.form.label = "";
				if (v && v.length>0){
					this.form.label = v.toString();
				}
			},
			

	
	
	

	
	
	

		},
		created() {
											this.get_list_number();
					this.get_list_classification_number();
						this.get_list_label();
					}
	}
</script>
