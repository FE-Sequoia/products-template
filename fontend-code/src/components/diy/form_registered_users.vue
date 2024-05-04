<template>
	<div class="diy_form">
			<b-form-group v-if="$check_register_field('add','name','/registered_users/view')" id="input-group-${idx}" label="姓名" label-for="input-${idx}">
			<b-form-input id="input-${idx}" v-model="form['name']" type="text" placeholder="姓名" trim></b-form-input>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','gender','/registered_users/view')" id="input-group-${idx}" label="性别" label-for="input-${idx}">
			<b-form-select id="input-${idx}" v-model="form['gender']" :options="getDropList(list_gender)"></b-form-select>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','age','/registered_users/view')" id="input-group-${idx}" label="年龄" label-for="input-${idx}">
			<b-form-input id="input-${idx}" v-model="form['age']" type="number" placeholder="年龄" trim></b-form-input>
		</b-form-group>
				<div v-if="$check_register_field('add','id_photo','/registered_users/view')" class="diy_fg form-group">
			<div>证件照</div>
			<div class="diy_in">
				<input type="file" @change="uploadFile($event.target.files,'id_photo')" />
				<img v-if="form['id_photo']" style="width: 50px;height: 50px;" :src="$fullUrl(form['id_photo'])" />
			</div>
		</div>
				<b-form-group v-if="$check_register_field('add','date_of_birth','/registered_users/view')" id="input-group-${idx}" label="出生日期" label-for="input-${idx}">
			<b-form-input id="input-${idx}" v-model="form['date_of_birth']" type="date" placeholder="出生日期" trim></b-form-input>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','registration_time','/registered_users/view')" id="input-group-${idx}" label="注册时间" label-for="input-${idx}">
			<b-form-input id="input-${idx}" v-model="form['registration_time']" type="datetime-local" placeholder="注册时间" trim></b-form-input>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','resume','/registered_users/view')" id="input-group-${idx}" label="简历" label-for="input-${idx}">
			<b-form-file v-model="form['file']" :state="Boolean(form['file'])" placeholder="resume" drop-placeholder="resume"></b-form-file>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','number','/registered_users/view')" id="input-group-${idx}" label="编号" label-for="input-${idx}">
			<b-form-select id="input-${idx}" v-model="form['number']" :options="list_number"></b-form-select>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','classification_number','/registered_users/view')" id="input-group-${idx}" label="分类编号" label-for="input-${idx}">
			<b-form-select id="input-${idx}" v-model="form['classification_number']" :options="list_classification_number" @change="select_classification_number_field"></b-form-select>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','classification_categories','/registered_users/view')" id="input-group-${idx}" label="分类类别" label-for="input-${idx}">
			{{form['classification_categories']}}
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','label','/registered_users/view')" id="input-group-${idx}" label="标签" label-for="input-${idx}">
			<el-select id="input-${idx}" v-model="label_multiple_value" multiple
					   @change="select_label_multiple">
				<el-option v-for="o in list_label" :key="o['classification_categories']" :label="o['classification_categories']"
						   :value="o['classification_categories']">
				</el-option>
			</el-select>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','id_card','/registered_users/view')" id="input-group-${idx}" label="身份证" label-for="input-${idx}">
			<b-form-input id="input-${idx}" v-model="form['id_card']" type="text" placeholder="身份证" trim></b-form-input>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','mobile_phone','/registered_users/view')" id="input-group-${idx}" label="手机" label-for="input-${idx}">
			<b-form-input id="input-${idx}" v-model="form['mobile_phone']" type="tel" placeholder="手机" trim></b-form-input>
		</b-form-group>
		</div>
</template>

<script>
	import mixin from "@/mixins/component.js";

	export default {
		mixins: [mixin],
		model: {
			prop: "form",
			event: "change"
		},
		props: {
			form: {
				type: Object,
				default: () => {
					return {

					}
				}
			}
		},
		data(){
			return {
				url_upload: "~/api/registered_users/upload?",
				        list_gender: "男,女",
																						        // 编号选项列表
        list_number: [],
						        // 分类编号选项列表
        list_classification_number: [],
													label_multiple_value:[],
		        // 标签选项列表
        list_label: [],
											}
		},
		methods: {
			// 下拉数据列表转换
			getDropList(e){
				let resultArr = [];
				if(e){
					let arr = e.split(",");
					arr.forEach(item => {
						resultArr.push({
							value: item,
							text: item
						})
					});
				}
				return resultArr;
			},
																      /**
       * 获取编号列表
       */
      async get_list_number() {
        let json = await this.$get("~/api/classification_information/get_list?");
        if(json.result && json.result.list){
					this.list_number = [];
			json.result.list.forEach(item => {
				this.list_number.push({
					value: item.classification_number,
					text: item.classification_number
				})
			});
	            }
        else if(json.error){
          console.error(json.error);
        }
      },
            			      /**
       * 获取分类编号列表
       */
      async get_list_classification_number() {
        let json = await this.$get("~/api/classification_information/get_list?");
        if(json.result && json.result.list){
					this.list_classification_number = [];
			json.result.list.forEach(item => {
				this.list_classification_number.push({
					value: item.classification_number,
					text: item.classification_number
				})
			});
	            }
        else if(json.error){
          console.error(json.error);
        }
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
        let json = await this.$get("~/api/classification_information/get_list?");
        if(json.result && json.result.list){
					this.list_label = json.result.list
		        }
        else if(json.error){
          console.error(json.error);
        }
      },
            		select_label_multiple(v){
			this.form.label = "";
			if (v && v.length>0){
				this.form.label = v.toString();
			}
		},
      								/**
			 * 上传图片
			 * @param {Object} file 文件对象
			 * @param {key} 保存键名
			 */
			uploadFile(file, key = "img") {
				var _this = this;
				var form = new FormData() // FormData 对象
				form.append('file', file[0]) // 文件对象
				this.$upload(this.url_upload, form, function(json) {
					if (json.result) {
						// _this.form[key] = json.result.url;
						_this.$delete(_this.form,key);
						_this.$set(_this.form,key,json.result.url);
						console.log(_this.form[key])
					} else {
						_this.$toast('上传失败！');
					}
				});
			},
		},
    created() {
								      this.get_list_number();
		      this.get_list_classification_number();
			      this.get_list_label();
			    },
	mounted(){
														}
	}
</script>

<style>

.diy_fg.form-group {
    display: flex;
    justify-content: space-between;
}

.diy_in {
    width: 85%;
}
</style>
