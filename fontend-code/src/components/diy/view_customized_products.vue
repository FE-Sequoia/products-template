<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
		<el-row class="row_ce">
							<el-col v-if="user_group === '管理员' || $check_field('get','product_number') || $check_field('add','product_number') || $check_field('set','product_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商品编号" prop="product_number">
												<el-input id="product_number" v-model="form['product_number']" placeholder="请输入商品编号"
							  v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','product_number')) || (!form['customized_products_id'] && $check_field('add','product_number'))" :disabled="true"></el-input>
					<div v-else-if="$check_field('get','product_number')">{{form['product_number']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','product_name') || $check_field('add','product_name') || $check_field('set','product_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商品名称" prop="product_name">
												<el-input id="product_name" v-model="form['product_name']" placeholder="请输入商品名称"
							  v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','product_name')) || (!form['customized_products_id'] && $check_field('add','product_name'))" :disabled="disabledObj['product_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','product_name')">{{form['product_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','cover') || $check_field('add','cover') || $check_field('set','cover')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="封面" prop="cover">
								<el-upload :disabled="disabledObj['cover_isDisabled']" id="cover" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_cover"
						:show-file-list="false" v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','cover')) || (!form['customized_products_id'] && $check_field('add','cover'))">
						<img v-if="form['cover']" :src="$fullUrl(form['cover'])" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-image v-else-if="$check_field('get','cover')" style="width: 100px; height: 100px"
						:src="$fullUrl(form['cover'])" :preview-src-list="[$fullUrl(form['cover'])]">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','money') || $check_field('add','money') || $check_field('set','money')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="金额" prop="money">
								<el-input-number id="money" v-model.number="form['money']"
						v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','money')) || (!form['customized_products_id'] && $check_field('add','money'))" :disabled="disabledObj['money_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','money')">{{form['money']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','inventory') || $check_field('add','inventory') || $check_field('set','inventory')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="库存" prop="inventory">
								<el-input-number id="inventory" v-model.number="form['inventory']"
						v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','inventory')) || (!form['customized_products_id'] && $check_field('add','inventory'))" :disabled="disabledObj['inventory_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','inventory')">{{form['inventory']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','product_category') || $check_field('add','product_category') || $check_field('set','product_category')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商品类别" prop="product_category">
								<el-select id="product_category" v-model="form['product_category']"						v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','product_category')) || (!form['customized_products_id'] && $check_field('add','product_category'))">
						<el-option v-for="o in list_product_category" :key="o['classification_categories']" :label="o['classification_categories']"
							:value="o['classification_categories']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','product_category')">{{form['product_category']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','audio_frequency') || $check_field('add','audio_frequency') || $check_field('set','audio_frequency')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="音频" prop="audio_frequency">
												<el-upload v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','audio_frequency')) || (!form['customized_products_id'] && $check_field('add','audio_frequency'))" class="upload-demo" drag
						action="" style="max-width: 300px;width: 100%;" :http-request="upload_audio_frequency" :limit="1" accept="audio/ogg,audio/mp3,audio/wav">
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将音频拖到此处，或<em>点击上传</em></div>
					</el-upload>
					<div v-else-if="$check_field('get','audio_frequency')">
						<el-button type="primary" @click="download(form['audio_frequency'])">下载<i
								class="el-icon-download el-icon--right"></i></el-button>
					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','video') || $check_field('add','video') || $check_field('set','video')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="视频" prop="video">
												<el-upload v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','video')) || (!form['customized_products_id'] && $check_field('add','video'))" class="upload-demo" drag
						action="" style="max-width: 300px;width: 100%;" :http-request="upload_video" :limit="1" accept="video/ogg,video/mp4,video/webm">
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
					</el-upload>
					<div v-else-if="$check_field('get','video')">
						<el-button type="primary" @click="download(form['video'])">下载<i
								class="el-icon-download el-icon--right"></i></el-button>
					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','content') || $check_field('add','content') || $check_field('set','content')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="内容" prop="content">
								<el-input type="textarea" id="content" v-model="form['content']" placeholder="请输入内容"
						v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','content')) || (!form['customized_products_id'] && $check_field('add','content'))" :disabled="disabledObj['content_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','content')">{{form['content']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','seller') || $check_field('add','seller') || $check_field('set','seller')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="卖家" prop="seller">
																		<div v-if="user_group !== '管理员'">
							{{ get_user_session_seller(form['seller']) }}
							<!--<el-input id="business_name" v-model="form['seller']" placeholder="请输入卖家"-->
							<!--v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','seller')) || (!form['customized_products_id'] && $check_field('add','seller'))" :disabled="disabledObj['seller_isDisabled']"></el-input>-->
							<!--<div v-else-if="$check_field('get','seller')">{{form['seller']}}</div>-->
							<el-select v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','seller')) || (!form['customized_products_id'] && $check_field('add','seller'))" id="seller" v-model="form['seller']" :disabled="disabledObj['seller_isDisabled']">
								<el-option v-for="o in list_user_seller" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
							<el-select v-else-if="$check_field('get','seller')" id="seller" v-model="form['seller']" :disabled="true">
								<el-option v-for="o in list_user_seller" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
						</div>
						<el-select v-else id="seller" v-model="form['seller']" :disabled="disabledObj['seller_isDisabled']">
							<el-option v-for="o in list_user_seller" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
																</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','classification_number') || $check_field('add','classification_number') || $check_field('set','classification_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="分类编号" prop="classification_number">
								<el-select id="classification_number" v-model="form['classification_number']" @change="select_classification_number_field"						v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','classification_number')) || (!form['customized_products_id'] && $check_field('add','classification_number'))">
						<el-option v-for="o in list_classification_number" :key="o['classification_number']" :label="o['classification_number']"
							:value="o['classification_number']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','classification_number')">{{form['classification_number']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','classification_categories') || $check_field('add','classification_categories') || $check_field('set','classification_categories')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="分类类别" prop="classification_categories">
								<el-input id="classification_categories" v-model="form['classification_categories']"
						v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','classification_categories')) || (!form['customized_products_id'] && $check_field('add','classification_categories'))" :disabled="true"></el-input>
					<div v-else-if="$check_field('get','classification_categories')">{{form['classification_categories']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','details') || $check_field('add','details') || $check_field('set','details')" :xs="24" :sm="24" :lg="24" class="el_form_editor_warp">
				<el-form-item label="详情" prop="details">
					<quill-editor v-model.number="form['details']"
						v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','details')) || (!form['customized_products_id'] && $check_field('add','details')) ">
					</quill-editor>
					<div v-else-if="$check_field('get','details')" v-html="form['details']"></div>
				</el-form-item>
			</el-col>
							<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="审核状态" prop="examine_state">
					<el-select id="examine_state" v-model="form['examine_state']"
						v-if="user_group === '管理员' || (form['examine_state'] && $check_examine()) || (!form['examine_state'] && $check_examine())">
						<el-option key="未审核" label="未审核" value="未审核"></el-option>
						<el-option key="已通过" label="已通过" value="已通过"></el-option>
						<el-option key="未通过" label="未通过" value="未通过"></el-option>
					</el-select>
					<div v-else>{{form["examine_state"]}}</div>
				</el-form-item>
			</el-col>
					<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="审核回复" prop="examine_reply">
					<el-input id="examine_reply" v-model="form['examine_reply']" placeholder="请输入审核回复"
						v-if="user_group === '管理员' || (form['examine_reply'] && $check_examine()) || (!form['examine_reply'] && $check_examine())"></el-input>
					<div v-else>{{form["examine_reply"]}}</div>
				</el-form-item>
			</el-col>
	
				<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="二维码图片" prop="qrcode_img">
					<el-upload :disabled="disabledObj['qrcode_img_isDisabled']" id="qrcode_img" class="avatar-uploader" drag
							   accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_qrcode"
							   :show-file-list="false">
						<img v-if="form['qrcode_img']" :src="$fullUrl(form['qrcode_img'])" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="二维码标题" prop="qrcode_title">
					<el-input id="qrcode_title" v-model="form['qrcode_title']" placeholder="请输入二维码标题"
							  :disabled="disabledObj['qrcode_title_isDisabled']"></el-input>
				</el-form-item>
			</el-col>
	
				<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="计时器标题" prop="timer_title">
					<el-input id="timer_title" v-model="form['timer_title']" placeholder="请输入计时器标题"
							  v-if="user_group === '管理员' || $check_action('/customized_products/view','set') || $check_action('/customized_products/view','add')" :disabled="disabledObj['timer_title_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','timer_title')">{{form['timer_title']}}</div>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="计时开始时间" prop="timing_start_time">
					<el-date-picker id="timing_start_time" v-model="form['timing_start_time']" placeholder="选择计时器开始时间"
						v-if="user_group === '管理员' || $check_action('/customized_products/view','set') || $check_action('/customized_products/view','add')" :disabled="disabledObj['timing_start_time_isDisabled']" type="datetime" >
					</el-date-picker>
					<div v-else-if="$check_field('get','timing_start_time')">{{form['timing_start_time']}}</div>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="计时结束时间" prop="timing_end_time">
					<el-date-picker id="timing_end_time" v-model="form['timing_end_time']" placeholder="选择计时器开始时间"
						v-if="user_group === '管理员' || $check_action('/customized_products/view','set') || $check_action('/customized_products/view','add')" :disabled="disabledObj['timing_end_time_isDisabled']" type="datetime" >
					</el-date-picker>
					<div v-else-if="$check_field('get','timing_end_time')">{{form['timing_end_time']}}</div>
				</el-form-item>
			</el-col>
	
				<el-col
					v-if="user_group === '管理员' || $check_action('/customized_products/view', 'set') || $check_action('/customized_products/view', 'add')"
					:xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="当前位置" prop="location_address">
					<el-input style="width: 80%" id="location_address" v-model="form['location_address']"
							  :disabled="true"></el-input>
					<el-button size="mini" @click="getLongitudeLatitude()">定位</el-button>
				</el-form-item>
			</el-col>
	
	
	      <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
        <el-form-item label="限制次数" prop="limit_times">
          <el-input id="limit_times" v-model="form['limit_times']" placeholder="限制次数"
                    v-if="user_group === '管理员' || (form['customized_products_id}'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id}'] && $check_action('/customized_products/view','add')) "
          ></el-input>
          <div v-else-if="$check_action('/customized_products/view','get')" v-html="form['limit_times']"></div>
        </el-form-item>
      </el-col>
	
	
	</el-row>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item v-if="$check_action('/customized_products/view','set') || $check_action('/customized_products/view','add') || $check_option('/customized_products/table','examine')">
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
				field: "customized_products_id",
				url_add: "~/api/customized_products/add?",
				url_set: "~/api/customized_products/set?",
				url_get_obj: "~/api/customized_products/get_obj?",
				url_upload: "~/api/customized_products/upload?",

				query: {
					"customized_products_id": 0,
				},

				form: {
								"product_number": this.$get_stamp(), // 商品编号
										"product_name":  '', // 商品名称
										"cover":  '', // 封面
										"money":  0, // 金额
										"inventory":  0, // 库存
										"product_category":  '', // 商品类别
										"audio_frequency":  '', // 音频
										"video":  '', // 视频
										"content":  '', // 内容
										"seller": 0, // 卖家
										"classification_number":  '', // 分类编号
										"classification_categories":  '', // 分类类别
										"details":  '', // 详情
									"examine_state": "未审核",
							"examine_reply": "",
							"customized_products_id": 0, // ID
						"qrcode_img":'', // 图片
					"qrcode_title":'', // 二维码标题
							"location_address": "", // 定位地址
					"location_lng": "", // 定位地址经度
					"location_lat": "", // 定位地址纬度
								"timer_title":'', // 计时器标题
					"timing_start_time":'', // 计时开始时间
					"timing_end_time":'', // 计时结束时间
							"limit_times": "", // 限制次数
		          			"limit_type":2,
				
				},
				disabledObj:{
								"product_number_isDisabled": false,
										"product_name_isDisabled": false,
										"cover_isDisabled": false,
					          			"money_isDisabled": false,
					          			"inventory_isDisabled": false,
										"product_category_isDisabled": false,
										"audio_frequency_isDisabled": false,
										"video_isDisabled": false,
										"content_isDisabled": false,
										"seller_isDisabled": false,
										"classification_number_isDisabled": false,
										"classification_categories_isDisabled": false,
										"details_isDisabled": false,
									"qrcode_img_isDisabled": false,
					"qrcode_title_isDisabled": false,
							"timer_title_isDisabled": false,
					"timing_start_time_isDisabled": false,
					"timing_end_time_isDisabled": false,
							"limit_times_isDisabled": false, // 限制次数
					},

	
		
		
		
		
								// 商品类别选项列表
				list_product_category: [""],
	
		
		
		
		
					// 用户列表
				list_user_seller: [],
						// 用户组
				group_user_seller: "",
										// 分类编号选项列表
				list_classification_number: [""],
	
		
		
	
			}
		},
		methods: {


	
	
			
	
						/**
			 * 上传封面
			 * @param {Object} param 图片参数
			 */
			upload_cover(param){
						this.uploadFile(param.file, "cover");
					},
	
	
			
	
			
	
			
				/**
			 * 获取商品类别列表
			 */
			async get_list_product_category() {
				var json = await this.$get("~/api/classification_information/get_list?");
				if(json.result && json.result.list){
					this.list_product_category = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
					
						/**
			 * 上传音频
			 * @param {Object} param 音频参数
			 */
			upload_audio_frequency(param){
						this.uploadFile(param.file, "audio_frequency");
					},
	
	
						/**
			 * 上传视频
			 * @param {Object} param 视频参数
			 */
			upload_video(param){
						this.uploadFile(param.file, "video");
					},
	
	
			
	
			
	
				/**
			 * 获取商城卖家用户列表
			 */
			async get_list_user_seller() {
                var json = await this.$get("~/api/user/get_list?user_group=商城卖家");
                if(json.result && json.result.list){
                    this.list_user_seller = json.result.list;
                }
                else if(json.error){
                    console.error(json.error);
                }
			},
					/**
			 * 获取商城卖家用户组
			 */
			async get_group_user_seller() {
							this.form["seller"] = this.$store.state.user.user_id;
							var json = await this.$get("~/api/user_group/get_obj?name=商城卖家");
				if(json.result && json.result.obj){
					this.group_user_seller = json.result.obj;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_session_seller(id){
				var _this = this;
				var user_id = {"user_id":id}
				var url = "~/api/"+_this.group_user_seller.source_table+"/get_obj?"
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
												_this.form["seller"] = id
									_this.disabledObj['seller' + '_isDisabled'] = true
						for (var i=0;i<arr.length;i++){
						  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
							for (var j = 0; j < arrForm.length; j++) {
							  if (arr[i] === arrForm[j]) {
								if (arr[i] !== "seller") {
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
					get_user_seller(id){
				var obj = this.list_user_seller.getObj({"user_id":id});
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
																																																																																																																																																																													this.form.classification_categories = res.result.obj.classification_categories;
																																							}else{
						console.error(res.error);
					}
				})
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
																														$.db.del("form");

				return param;
			},

			/**
			 * 获取对象之后
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json, func){

																																																				
				if (json.result.obj["timing_end_time"] && JSON.stringify(json.result.obj["timing_end_time"]).indexOf("-")===-1) {
					json.result.obj["timing_end_time"] = this.$toTime(parseInt(json.result.obj["timing_end_time"]), "yyyy-MM-dd hh:mm:ss")
				}
				if (json.result.obj["timing_start_time"] && JSON.stringify(json.result.obj["timing_start_time"]).indexOf("-")===-1) {
					json.result.obj["timing_start_time"] = this.$toTime(parseInt(json.result.obj["timing_start_time"]), "yyyy-MM-dd hh:mm:ss")
				}

			},

			/**
			 * 提交前验证事件
			 * @param {Object} 请求参数
			 * @return {String} 验证成功返回null, 失败返回错误提示
			 */
			submit_check(param) {
																																																																																																																											return null;
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/customized_products/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/customized_products/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/customized_products/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/customized_products/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/customized_products/view','get');
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
			/**
			 * 上传二维码
			 * @param {Object} param图片参数
			 */
			upload_qrcode(param){
				this.uploadFile(param.file, "qrcode_img");
			},
			getLongitudeLatitude() {
				let _this = this;
				_this.form.location_address = "广东省深圳市南山区科技园";
				_this.form.location_lng = "113.946782";
				_this.form.location_lat = "22.556481";
				//如果该对象存在，那么地理位置服务可用。
				if ('geolocation' in navigator) {
					/* 地理位置服务可用 */
					let options = {
						enableHighAccuracy: true, //布尔值，表示系统是否使用最高精度来表示结果，注意，这会导致较慢的响应时间或者增加电量消耗（比如对于支持gps的移动设备来说）。如果值为false ，设备会通过更快响应以及/或者使用更少的电量等方法来尽可能的节约资源。默认值fasle
						timeout: 5000, //它表明的是设备必须在多长时间（单位毫秒）内返回一个位置。默认直到获取到位置才会返回值。
						maximumAge: 0 //表明可以返回多长时间（即最长年龄，单位毫秒）内的可获取的缓存位置。如果设置为 0, 说明设备不能使用一个缓存位置，而且必须去获取一个真实的当前位置。默认0
					}
					function success(position) {
						//position.coords (只读) 返回一个定义了当前位置的Coordinates对象。
						//position.timestamp (只读) 返回一个时间戳DOMTimeStamp， 这个时间戳表示获取到的位置的时间。
						let lat = position.coords.latitude //当前位置的纬度
						let lng = position.coords.longitude //当前位置精度
						let location=lng+","+lat;
						let url = "http://restapi.amap.com/v3/geocode/regeo?key=b6eb2819a6ba4c5119591614272fe7ca&location="+location;
						_this.$axios.get(url, {
						}).then((res) => {
							if (res.status===200){
								let data = res.data;
								if (data.status==='1'){
									_this.form.location_address = data.regeocode.formatted_address;
									_this.form.location_lng = JSON.stringify(lng);
									_this.form.location_lat = JSON.stringify(lat);
								}else {
									console.log(data.info)
								}
							}
						}).catch((res) => {
							console.log(res);
						});
					}
					function error(err) {
						let errorType = ['您拒绝共享位置信息', '获取不到位置信息', '获取位置信息超时']
						console.log(errorType[err.code - 1])
					}
					navigator.geolocation.getCurrentPosition(success, error, options)
				} else {
					/* 地理位置服务不可用 */
					console.log('无法获取您的位置，请检查定位是否开启或刷新重试')
				}
			},

		},
		created() {
														this.get_list_product_category();
													this.get_list_user_seller();
					this.get_group_user_seller();
							this.get_list_classification_number();
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
