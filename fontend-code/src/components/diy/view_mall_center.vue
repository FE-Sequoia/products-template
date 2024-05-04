<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
		<el-row class="row_ce">
	            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="封面图" prop="cart_avatar">
                    <el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg"
                               action="" :http-request="upload_cart_img" :show-file-list="false">
                        <img v-if="form.cart_img" :src="$fullUrl(form.cart_img)" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="主图_1" prop="cart_avatar">
                    <el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg"
                               action="" :http-request="upload_cart_img_1" :show-file-list="false">
                        <img v-if="form.cart_img_1" :src="$fullUrl(form.cart_img_1)" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="主图_2" prop="cart_avatar">
                    <el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg"
                               action="" :http-request="upload_cart_img_2" :show-file-list="false">
                        <img v-if="form.cart_img_2" :src="$fullUrl(form.cart_img_2)" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="主图_3" prop="cart_avatar">
                    <el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg"
                               action="" :http-request="upload_cart_img_3" :show-file-list="false">
                        <img v-if="form.cart_img_3" :src="$fullUrl(form.cart_img_3)" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="主图_4" prop="cart_avatar">
                    <el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg"
                               action="" :http-request="upload_cart_img_4" :show-file-list="false">
                        <img v-if="form.cart_img_4" :src="$fullUrl(form.cart_img_4)" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="主图_5" prop="cart_avatar">
                    <el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg"
                               action="" :http-request="upload_cart_img_5" :show-file-list="false">
                        <img v-if="form.cart_img_5" :src="$fullUrl(form.cart_img_5)" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="12" class="el_form_item_warp">
                <el-form-item label="标题" prop="cart_title">
                    <el-input v-model="form.cart_title" placeholder="请输入标题"></el-input>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="12" class="el_form_item_warp">
                <el-form-item label="描述" prop="cart_description">
                    <el-input v-model="form.cart_description" placeholder="请输入描述"></el-input>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="原价" prop="cart_price_ago">
                    <el-input-number v-model="form.cart_price_ago"></el-input-number>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="卖价" prop="cart_price">
                    <el-input-number v-model="form.cart_price"></el-input-number>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="库存" prop="cart_inventory">
                    <el-input-number v-model="form.cart_inventory" placeholder="请输入库存"></el-input-number>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="分类" prop="cart_type">
                    <el-select v-model="form.cart_type">
                        <el-option v-for="(o ,i) in list_cart_goods_type" :value="o.name" :key="i"
                                   :label="o.name"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
							<el-col v-if="user_group === '管理员' || $check_field('get','mall_seller') || $check_field('add','mall_seller') || $check_field('set','mall_seller')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商城卖家" prop="mall_seller">
																		<div v-if="user_group !== '管理员'">
							{{ get_user_session_mall_seller(form['mall_seller']) }}
							<!--<el-input id="business_name" v-model="form['mall_seller']" placeholder="请输入商城卖家"-->
							<!--v-if="user_group === '管理员' || (form['mall_center_id'] && $check_field('set','mall_seller')) || (!form['mall_center_id'] && $check_field('add','mall_seller'))" :disabled="disabledObj['mall_seller_isDisabled']"></el-input>-->
							<!--<div v-else-if="$check_field('get','mall_seller')">{{form['mall_seller']}}</div>-->
							<el-select v-if="user_group === '管理员' || (form['mall_center_id'] && $check_field('set','mall_seller')) || (!form['mall_center_id'] && $check_field('add','mall_seller'))" id="mall_seller" v-model="form['mall_seller']" :disabled="disabledObj['mall_seller_isDisabled']">
								<el-option v-for="o in list_user_mall_seller" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
							<el-select v-else-if="$check_field('get','mall_seller')" id="mall_seller" v-model="form['mall_seller']" :disabled="true">
								<el-option v-for="o in list_user_mall_seller" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
						</div>
						<el-select v-else id="mall_seller" v-model="form['mall_seller']" :disabled="disabledObj['mall_seller_isDisabled']">
							<el-option v-for="o in list_user_mall_seller" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
																</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','merchant_name') || $check_field('add','merchant_name') || $check_field('set','merchant_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商家姓名" prop="merchant_name">
												<el-input id="merchant_name" v-model="form['merchant_name']" placeholder="请输入商家姓名"
							  v-if="user_group === '管理员' || (form['mall_center_id'] && $check_field('set','merchant_name')) || (!form['mall_center_id'] && $check_field('add','merchant_name'))" :disabled="disabledObj['merchant_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','merchant_name')">{{form['merchant_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','production_date') || $check_field('add','production_date') || $check_field('set','production_date')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="生产日期" prop="production_date">
								<el-date-picker :disabled="disabledObj['production_date_isDisabled']" v-if="user_group === '管理员' || (form['mall_center_id'] && $check_field('set','production_date')) || (!form['mall_center_id'] && $check_field('add','production_date'))" id="production_date"
						v-model="form['production_date']" type="date" placeholder="选择日期">
					</el-date-picker>
					<div v-else-if="$check_field('get','production_date')">{{form['production_date']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','shelf_life') || $check_field('add','shelf_life') || $check_field('set','shelf_life')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="保质期" prop="shelf_life">
								<el-date-picker :disabled="disabledObj['shelf_life_isDisabled']" v-if="user_group === '管理员' || (form['mall_center_id'] && $check_field('set','shelf_life')) || (!form['mall_center_id'] && $check_field('add','shelf_life'))" id="shelf_life"
						v-model="form['shelf_life']" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
					<div v-else-if="$check_field('get','shelf_life')">{{form['shelf_life']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','label') || $check_field('add','label') || $check_field('set','label')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="标签" prop="label">
								<el-select id="label" v-model="form['label']"						v-if="user_group === '管理员' || (form['mall_center_id'] && $check_field('set','label')) || (!form['mall_center_id'] && $check_field('add','label'))">
						<el-option v-for="o in list_label" :key="o['classification_categories']" :label="o['classification_categories']"
							:value="o['classification_categories']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','label')">{{form['label']}}</div>
							</el-form-item>
			</el-col>
					
	
	
	
	
	
	            <el-col :xs="24" :sm="24" :lg="24" class="el_form_editor_warp">
                <el-form-item label="正文" prop="cart_content">
                    <quill-editor v-model="form.cart_content">
                    </quill-editor>
                </el-form-item>
            </el-col>
	
	</el-row>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item v-if="$check_action('/mall_center/view','set') || $check_action('/mall_center/view','add') || $check_option('/mall_center/table','examine')">
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
				field: "mall_center_id",
				url_add: "~/api/mall_center/add?",
				url_set: "~/api/mall_center/set?",
				url_get_obj: "~/api/mall_center/get_obj?",
				url_upload: "~/api/mall_center/upload?",

				query: {
					"mall_center_id": 0,
				},

				form: {
								"mall_seller": 0, // 商城卖家
										"merchant_name":  '', // 商家姓名
										"production_date":  '', // 生产日期
										"shelf_life":  '', // 保质期
										"label":  '', // 标签
						                    cart_title: "",
                    cart_img: "",
                    cart_description: "",
                    cart_price_ago: 0,
                    cart_price: 0,
                    cart_inventory: 0,
                    cart_type: '',
                    cart_content: "",
                    cart_img_1: "",
                    cart_img_2: "",
                    cart_img_3: "",
                    cart_img_4: "",
                    cart_img_5: "",
						"mall_center_id": 0, // ID
						
				},
				disabledObj:{
								"mall_seller_isDisabled": false,
										"merchant_name_isDisabled": false,
										"production_date_isDisabled": false,
										"shelf_life_isDisabled": false,
										"label_isDisabled": false,
										},

	
					// 用户列表
				list_user_mall_seller: [],
						// 用户组
				group_user_mall_seller: "",
				
		
		
								// 标签选项列表
				list_label: [""],
	
	                list_cart_goods_type: [],
				goods_form:{
					goods_id: 0,
					title: "",
					img: "",
					description: "",
					price_ago: 0,
					price: 0,
					inventory: 0,
					type: '',
					content: "",
					img_1: "",
					img_2: "",
					img_3: "",
					img_4: "",
					img_5: "",
					source_table: "",
					source_field: "",
					source_id: 0,
					user_id:this.$store.state.user.user_id
				},

			}
		},
		methods: {


	
	
				/**
			 * 获取商城卖家用户列表
			 */
			async get_list_user_mall_seller() {
                var json = await this.$get("~/api/user/get_list?user_group=商城卖家");
                if(json.result && json.result.list){
                    this.list_user_mall_seller = json.result.list;
                }
                else if(json.error){
                    console.error(json.error);
                }
			},
					/**
			 * 获取商城卖家用户组
			 */
			async get_group_user_mall_seller() {
							this.form["mall_seller"] = this.$store.state.user.user_id;
							var json = await this.$get("~/api/user_group/get_obj?name=商城卖家");
				if(json.result && json.result.obj){
					this.group_user_mall_seller = json.result.obj;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_session_mall_seller(id){
				var _this = this;
				var user_id = {"user_id":id}
				var url = "~/api/"+_this.group_user_mall_seller.source_table+"/get_obj?"
				this.$get(url, user_id, function(res) {
					if (res.result && res.result.obj) {
						var arr = []
						for (let key in res.result.obj) {
							arr.push(key)
						}
						var arrForm = []
									for (let key in _this.form) {
							arrForm.push(key)
						}
												_this.form["mall_seller"] = id
									_this.disabledObj['mall_seller' + '_isDisabled'] = true
						for (var i=0;i<arr.length;i++){
						  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
							for (var j = 0; j < arrForm.length; j++) {
							  if (arr[i] === arrForm[j]) {
								if (arr[i] !== "mall_seller") {
			                      _this.form[arrForm[j]] = res.result.obj[arr[i]]
			                      _this.disabledObj[arrForm[j] + '_isDisabled'] = true
								  break;
								} else {
								  _this.disabledObj[arrForm[j] + '_isDisabled'] = true
								}
							  }
							}
						  }
						}
					}
				});
			},
					get_user_mall_seller(id){
				var obj = this.list_user_mall_seller.getObj({"user_id":id});
				var ret = "";
				if(obj){
					if(obj.nickname){
						ret = obj.nickname;}
					else{
						ret = obj.username;
					}
				}
				return ret;
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
						        if (this.form["production_date"] && this.form["production_date"].indexOf("-")===-1){
          this.form["production_date"] = this.$toTime(parseInt(this.form["production_date"]),"yyyy-MM-dd")
        }
		        if (this.form["shelf_life"] && this.form["shelf_life"].indexOf("-")===-1){
            this.form["shelf_life"] = this.$toTime(parseInt(this.form["shelf_life"]),"yyyy-MM-dd hh:mm:ss")
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

														if(json.result.obj["production_date"]=="0000-00-00"){
				  json.result.obj["production_date"] = null;
				}
				if(parseInt(json.result.obj["production_date"]) > 9999){
					json.result.obj["production_date"] = this.$toTime(parseInt(json.result.obj["production_date"]),"yyyy-MM-dd")
				}
								if(json.result.obj["shelf_life"]=="0000-00-00 00:00:00"){
				  json.result.obj["shelf_life"] = null;
				}
				if(parseInt(json.result.obj["shelf_life"]) > 9999){
					json.result.obj["shelf_life"] = this.$toTime(parseInt(json.result.obj["shelf_life"]),"yyyy-MM-dd hh:mm:ss")
				}
								

			},

			/**
			 * 提交前验证事件
			 * @param {Object} 请求参数
			 * @return {String} 验证成功返回null, 失败返回错误提示
			 */
			submit_check(param) {
																										if (!param.production_date){
					return "生产日期不能为空";
				}
															if (!param.shelf_life){
					return "保质期不能为空";
				}
																						return null;
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/mall_center/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/mall_center/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/mall_center/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/mall_center/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/mall_center/view','get');
					console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
				}

				console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

				return bl;
			},
            /**
             * 获取商品分类
             */
            async get_cart_goods_type() {
                var res = await this.$get("~/api/goods_type/get_list?");
                this.list_cart_goods_type = res.result.list;
            },
            /**
             * 上传封面图
             * @param {Object} param
             */
            upload_cart_img(param) {
                this.uploadFile(param.file, "cart_img");
            },

            /**
             * 上传文件
             * @param {Object} param
             */
            upload_cart_img_1(param) {
                this.uploadFile(param.file, "cart_img_1");
            },

            /**
             * 上传文件
             * @param {Object} param
             */
            upload_cart_img_2(param) {
                this.uploadFile(param.file, "cart_img_2");
            },

            /**
             * 上传文件
             * @param {Object} param
             */
            upload_cart_img_3(param) {
                this.uploadFile(param.file, "cart_img_3");
            },

            /**
             * 上传文件
             * @param {Object} param
             */
            upload_cart_img_4(param) {
                this.uploadFile(param.file, "cart_img_4");
            },

            /**
             * 上传文件
             * @param {Object} param
             */
            upload_cart_img_5(param) {
                this.uploadFile(param.file, "cart_img_5");
            },

            submit_after(){
                console.log(this.form[this.field])
                if (this.form[this.field]){
                    this.submit_goods(this.form[this.field],"set");
                } else {
                    let query_form = {
                        cart_title:this.form.cart_title,
                        cart_description:this.form.cart_description
                    }
                    this.$get("~/api/mall_center/get_obj?",query_form,(res)=>{
                        console.log("商品息res",res);
                        if(res.result && res.result.obj){
                            this.submit_goods(res.result.obj[this.field],"add");
                        }else if(res.error){
                            console.error(res.error);
                            this.$toast(res.error.message,"error");
                        }
                    })
                }
            },
            submit_goods(source_id,add_flag){
				let customize_field = []
							customize_field.push({"field_name":"商城卖家","field_value":this.form.mall_seller});
									customize_field.push({"field_name":"商家姓名","field_value":this.form.merchant_name});
									customize_field.push({"field_name":"生产日期","field_value":this.form.production_date,"type":"date"});
									customize_field.push({"field_name":"保质期","field_value":this.form.shelf_life,"type":"datetime"});
									customize_field.push({"field_name":"标签","field_value":this.form.label});
			                this.goods_form = {
                    goods_id: 0,
                    title: this.form.cart_title,
                    img: this.form.cart_img,
                    description: this.form.cart_description,
                    price_ago: this.form.cart_price_ago,
                    price: this.form.cart_price,
                    inventory: this.form.cart_inventory,
                    type: this.form.cart_type,
                    content: this.form.cart_content,
                    img_1: this.form.cart_img_1,
                    img_2: this.form.cart_img_2,
                    img_3: this.form.cart_img_3,
                    img_4: this.form.cart_img_4,
                    img_5: this.form.cart_img_5,
                    source_table: "mall_center",
                    source_field: this.field,
                    source_id: source_id,
					customize_field: JSON.stringify(customize_field),
					user_id:this.$store.state.user.user_id
                }
                if (add_flag==='set'){
                    delete this.goods_form.goods_id;
					delete this.goods_form.user_id;
                    // 提交事件
                    this.$post("~/api/goods/set?source_table=mall_center&source_field=" + this.field + "&source_id=" + source_id,this.goods_form,(res)=>{
                        console.log("提交结果：" ,res)
                        if(res.result){
                            this.$toast("修改成功!" ,"success");
                            this.$router.go(-1);
                        }else if(res.error){
                            console.error(res.error);
                            this.$toast(res.error.message,"error");
                        }
                    });
                }else {
                    // 提交事件
                    this.$post("~/api/goods/add?",this.goods_form,(res)=>{
                        console.log("提交结果：" ,res)
                        if(res.result){
                            this.$toast("添加成功!" ,"success");
                            this.$router.go(-1);
                        }else if(res.error){
                            console.error(res.error);
                            this.$toast(res.error.message,"error");
                        }
                    });
                }
            },
			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadimg(param) {
				this.uploadFile(param.file, "avatar");
			},

		},
		created() {
					this.get_list_user_mall_seller();
					this.get_group_user_mall_seller();
													this.get_list_label();
		            this.get_cart_goods_type();
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
