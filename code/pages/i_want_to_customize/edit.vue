<template>
	<view class="diy_edit page_i_want_to_customize" id="i_want_to_customize_edit">
		<view class='warp'>
			<view class='container'>
				<view class='row'>
							<view v-if="$check_field('set','order_number') || $check_field('add','order_number') || $check_field('get','order_number')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								订单号:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_order_number" v-model="form['order_number']" placeholder="请输入订单号" v-if="(form['order_number'] && $check_field('set','order_number')) || (!form['order_number'] && $check_field('add','order_number'))" :disabled="true" />
							<text v-else-if="$check_field('get','order_number')">{{ form['order_number'] }}</text>
						</view>
										</view>
								<view v-if="$check_field('set','product_number') || $check_field('add','product_number') || $check_field('get','product_number')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								商品编号:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_product_number" v-model="form['product_number']" placeholder="请输入商品编号" v-if="(form['product_number'] && $check_field('set','product_number')) || (!form['product_number'] && $check_field('add','product_number'))" :disabled="disabledObj['product_number_isDisabled']" />
							<text v-else-if="$check_field('get','product_number')">{{ form['product_number'] }}</text>
						</view>
										</view>
								<view v-if="$check_field('set','product_name') || $check_field('add','product_name') || $check_field('get','product_name')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								商品名称:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_product_name" v-model="form['product_name']" placeholder="请输入商品名称" v-if="(form['product_name'] && $check_field('set','product_name')) || (!form['product_name'] && $check_field('add','product_name'))" :disabled="disabledObj['product_name_isDisabled']" />
							<text v-else-if="$check_field('get','product_name')">{{ form['product_name'] }}</text>
						</view>
										</view>
								<view v-if="$check_field('set','cover') || $check_field('add','cover') || $check_field('get','cover')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								封面:
							</text>
						</view>
								<!-- 图片 -->
						<!-- 修改权限 -->
						<view class="diy_field diy_img diy_text_row" v-if="form['cover'] && $check_field('set','cover')">
							<image v-if="disabledObj['cover_isDisabled']" :src="$fullUrl(form['cover'])" />
							<image v-if="!disabledObj['cover_isDisabled']" :src="$fullUrl(form['cover'])" @click="change_img('cover')" />
						</view>
						<!-- 添加权限 -->
						<view class="diy_field diy_img diy_text_row" v-else-if="!form['cover'] && $check_field('add','cover')">
							<view v-if="disabledObj['cover_isDisabled']" class="btn_add_img">
								<text>+</text>
							</view>
							<view v-if="!disabledObj['cover_isDisabled']" class="btn_add_img diy_text_row" @click="change_img('cover')">
								<text>+</text>
							</view>
						</view>
						<!-- 查询权限 -->
						<view class="diy_field diy_img diy_text_row" v-else-if="$check_field('get','cover')">
							<image :src="$fullUrl(form['cover'])" />
						</view>
						<uni-icons style="display: none;" class="forward" type="forward" id="form_img_cover"></uni-icons>
							</view>
								<view v-if="$check_field('set','money') || $check_field('add','money') || $check_field('get','money')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								金额:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_money" v-model="form['money']" placeholder="请输入金额" v-if="(form['money'] && $check_field('set','money')) || (!form['money'] && $check_field('add','money'))" :disabled="disabledObj['money_isDisabled']" />
							<text v-else-if="$check_field('get','money')">{{ form['money'] }}</text>
						</view>
										</view>
								<view v-if="$check_field('set','seller') || $check_field('add','seller') || $check_field('get','seller')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								卖家:
							</text>
						</view>
						<view class="diy_field diy_down diy_text_row diy_select_flex">
							<uni-data-select
									id="form_seller"
									v-model="form['seller']"
									:localdata="list_user_seller"
									:clear="!disabledObj['seller_isDisabled']"
									:disabled="disabledObj['seller_isDisabled']"
									v-if="(form['seller'] && $check_field('set','seller')) || (!form['seller'] && $check_field('add','seller'))"
							></uni-data-select>
							<text v-else-if="$check_field('get','seller')">{{ form['seller'] }}</text>
						</view>
					</view>
									<view v-if="$check_field('set','purchasing_users') || $check_field('add','purchasing_users') || $check_field('get','purchasing_users')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								购买用户:
							</text>
						</view>
						<view class="diy_field diy_down diy_text_row diy_select_flex">
							<uni-data-select
									id="form_purchasing_users"
									v-model="form['purchasing_users']"
									:localdata="list_user_purchasing_users"
									:clear="!disabledObj['purchasing_users_isDisabled']"
									:disabled="disabledObj['purchasing_users_isDisabled']"
									v-if="(form['purchasing_users'] && $check_field('set','purchasing_users')) || (!form['purchasing_users'] && $check_field('add','purchasing_users'))"
							></uni-data-select>
							<text v-else-if="$check_field('get','purchasing_users')">{{ form['purchasing_users'] }}</text>
						</view>
					</view>
									<view v-if="$check_field('set','purchase_quantity') || $check_field('add','purchase_quantity') || $check_field('get','purchase_quantity')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								购买数量:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_purchase_quantity" v-model="form['purchase_quantity']" placeholder="请输入购买数量" v-if="(form['purchase_quantity'] && $check_field('set','purchase_quantity')) || (!form['purchase_quantity'] && $check_field('add','purchase_quantity'))" :disabled="disabledObj['purchase_quantity_isDisabled']" />
							<text v-else-if="$check_field('get','purchase_quantity')">{{ form['purchase_quantity'] }}</text>
						</view>
										</view>
								<view v-if="$check_field('set','total_amount') || $check_field('add','total_amount') || $check_field('get','total_amount')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								总金额:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_total_amount" v-model="form['total_amount']" placeholder="请输入总金额" v-if="(form['total_amount'] && $check_field('set','total_amount')) || (!form['total_amount'] && $check_field('add','total_amount'))" @focus="set_total_amount()" :disabled="disabledObj['total_amount_isDisabled']" />
							<text v-else-if="$check_field('get','total_amount')">{{ form['total_amount'] }}</text>
						</view>
										</view>
								<view v-if="$check_field('set','customized_time') || $check_field('add','customized_time') || $check_field('get','customized_time')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								定制时间:
							</text>
						</view>
								<!-- 日长 -->
						<view class="diy_field diy_datetime diy_text_row">
							<uni-datetime-picker :disabled="disabledObj['customized_time_isDisabled']" type="datetime" id="form_customized_time" v-model="form['customized_time']" placeholder="请输入定制时间" v-if="(form['customized_time'] && $check_field('set','customized_time')) || (!form['customized_time'] && $check_field('add','customized_time'))" />
							<text v-else-if="$check_field('get','customized_time')">{{ form['customized_time'] }}</text>
						</view>
							</view>
								<view v-if="$check_field('set','requirement_document') || $check_field('add','requirement_document') || $check_field('get','requirement_document')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								需求文件:
							</text>
						</view>
								<!-- 文件 -->
						<!-- 查询权限 -->
						<view class="diy_field diy_file diy_text_row" v-if="$check_field('get','requirement_document')">
							<button @click="download_file($fullUrl(form['requirement_document']))" class="btn" v-if="form['requirement_document']">下载文件</button>
						</view>
						<uni-icons style="display: none;" class="forward diy_text_row" type="forward" id="form_file_requirement_document"></uni-icons>
							</view>
								<view v-if="$check_field('set','remarks') || $check_field('add','remarks') || $check_field('get','remarks')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								备注:
							</text>
						</view>
								<!-- 多文本 -->
						<view class="diy_field diy_desc diy_text_row">
							<textarea id="form_remarks" v-model="form['remarks']" v-if="(form['remarks'] && $check_field('set','remarks')) || (!form['remarks'] && $check_field('add','remarks'))" :disabled="disabledObj['remarks_isDisabled']"/>
							<text v-else-if="$check_field('get','remarks')">{{ form['remarks'] }}</text>
						</view>
							</view>
	
					<!-- 座位 -->
					<view class="col-12 col-md-6 row-item">
						<div class="seat-wrapper" :style="{ width: size + 'px', height: (size*0.76) + 'px' }">
							<div class="illustration">
								<div class="illustration-img-wrapper unselected-seat"></div>
								<span class="illustration-text">可选</span>
								<div class="illustration-img-wrapper selected-seat"></div>
								<span class="illustration-text">已选</span>
								<div class="illustration-img-wrapper bought-seat"></div>
								<span class="illustration-text">不可选</span>
								<div class="btn-buy" @click="buySeat">选定座位</div>
							</div>
							<div class="inner-seat-wrapper" id="innerSeatWrapper">
								<div v-for="(row ,i)  in seatRow">
									<!--这里的v-if很重要，如果没有则会导致报错，因为seatArray初始状态为空-->
									<div v-for="(col ,j) in seatCol" v-if="seatArray.length > 0" class="seat"
										 :style="{ width: seatSize + 'px', height: seatSize + 'px' }">
										<div class="inner-seat" @click="handleChooseSeat(i, j)"
											 v-if="seatArray[i][j] !== -1" :class="
											seatArray[i][j] === 2
											  ? 'bought-seat'
											  : seatArray[i][j] === 1
											  ? 'selected-seat'
											  : 'unselected-seat'">
										</div>
									</div>
								</div>
							</div>
						</div>
					</view>
				</view>
				<view class="row">
					<view class="col-12">
						<view class="btn_box">
							<button class="btn_submit primary_btn" @click="submit()">提交</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import mixin from "@/libs/mixins/page.js";
												export default {
	mixins:[mixin],
	data(){
		return{
			url_get_obj:"~/api/i_want_to_customize/get_obj?",
			url_add:"~/api/i_want_to_customize/add?",
			url_set:"~/api/i_want_to_customize/set?",

			// 登录权限
			oauth: {
				"signIn": true,
				"user_group": []
			},

			// 查询条件
			query: {
					"order_number": "",
						"product_number": "",
						"product_name": "",
						"cover": "",
						"money": "",
						"seller": 0,
						"purchasing_users": 0,
						"purchase_quantity": 0,
						"total_amount": "",
						"customized_time": "",
						"requirement_document": "",
						"remarks": "",
					"i_want_to_customize_id": 0
			},

			obj: {
					"order_number": this.$get_stamp(), // 订单号
						"product_number":  '', // 商品编号
						"product_name":  '', // 商品名称
						"cover":  '', // 封面
						"money":  '', // 金额
						"seller": 0, // 卖家
						"purchasing_users": 0, // 购买用户
						"purchase_quantity":  0 , // 购买数量
						"total_amount":  '', // 总金额
						"customized_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
						"requirement_document":  '', // 需求文件
						"remarks":  '', // 备注
					"i_want_to_customize_id": 0,

				"seat": "", // 座位
        		"user_id": this.$store.state.user.user_id,
			},

			// 表单字段
			form: {
					"order_number": this.$get_stamp(), // 订单号
						"product_number":  '', // 商品编号
						"product_name":  '', // 商品名称
						"cover":  '', // 封面
						"money":  '', // 金额
						"seller": 0, // 卖家
						"purchasing_users": 0, // 购买用户
						"purchase_quantity":  0 , // 购买数量
						"total_amount":  '', // 总金额
						"customized_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
						"requirement_document":  '', // 需求文件
						"remarks":  '', // 备注
					"i_want_to_customize_id": 0,
				"seat": "", // 座位
        		"user_id": this.$store.state.user.user_id,
			},
			disabledObj:{
					"order_number_isDisabled": false,
						"product_number_isDisabled": false,
						"product_name_isDisabled": false,
						"cover_isDisabled": false,
						"money_isDisabled": false,
						"seller_isDisabled": false,
						"purchasing_users_isDisabled": false,
								"total_amount_isDisabled": false,
						"customized_time_isDisabled": false,
						"requirement_document_isDisabled": false,
						"remarks_isDisabled": false,
				},

															// 用户列表
			list_user_seller: [],
						// 用户列表
			list_user_purchasing_users: [],
											
			field:"i_want_to_customize_id",
			table_key:"i_want_to_customize",

			//影院座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
			seatArray: [],
			//影院座位行数
			seatRow: 5,
			//影院座位列数
			seatCol: 8,
			//座位尺寸
			seatSize: "",
			seatArr: [],
			list_: [],
			seatList: "",
			size:"",
      limit_times:0, // 限制次数
      limit_type:0,
      act_limit_times:0,
		}
	},
	methods: {
    /**
     * 提交前验证事件
     * @param {Object} 请求参数
     * @return {String} 验证成功返回null, 失败返回错误提示
     */
    submit_check(param) {
		if(this.act_limit_times>=this.limit_times){
		return "已超过提交次数";
		}
																																							if (!param.customized_time){
			return "定制时间不能为空";
		}
												      return null;
    },

    check_limit(){
      /**
       * 提交前验证事件
       * @param {Object} 请求参数
       * @return {String} 验证成功返回null, 失败返回错误提示
       */
      let _this = this;
      if (_this.$store.state.user.user_group==='管理员'){
        _this.limit_times = 999;
      }else {
        _this.$get("~/api/customized_products/get_obj?",
            {"product_number":_this.form.product_number}, function(res) {
          if (res.result && res.result.obj) {
            _this.limit_times=res.result.obj.limit_times;
            _this.limit_type=res.result.obj.limit_type;
            let user_id = _this.$store.state.user.user_id;
            let limit_url = "~/api/i_want_to_customize/count?product_number="+_this.form.product_number+"&user_id="+user_id;
            if (_this.limit_type === 1){
              let day = _this.$toTime(parseInt((new Date()).getTime()), "yyyy-MM-dd");
              let time = "&create_time_min="+day+" 00:00:00&create_time_max="+day+" 23:59:59"
              limit_url = limit_url +time;
            }
            _this.$get(limit_url ,{}, function(res) {
              _this.act_limit_times = res.result;
            });
          }
        });
      }
    },
			
	
				
	
				
	
				
	
				
	
					/**
		 * 获取商城卖家用户列表
		 */
		async get_list_user_seller() {
			// if(this.user_group !== "管理员" && this.form["seller"] === 0) {
			//     this.form["seller"] = this.user.user_id;
			// }
			var json = await this.$get("~/api/user/get_list?user_group=商城卖家");
			if(json.result && json.result.list){
				json.result.list.map((o) => this.list_user_seller.push({value:o.user_id,text:o.nickname + '-' + o.username}));
			}
			else if(json.error){
				console.error(json.error);
			}
		},
		
	
					/**
		 * 获取注册用户用户列表
		 */
		async get_list_user_purchasing_users() {
			// if(this.user_group !== "管理员" && this.form["purchasing_users"] === 0) {
			//     this.form["purchasing_users"] = this.user.user_id;
			// }
			var json = await this.$get("~/api/user/get_list?user_group=注册用户");
			if(json.result && json.result.list){
				json.result.list.map((o) => this.list_user_purchasing_users.push({value:o.user_id,text:o.nickname + '-' + o.username}));
			}
			else if(json.error){
				console.error(json.error);
			}
		},
				async get_user_session_purchasing_users(){
			var _this = this;
			var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
			if(json.result && json.result.obj){
				var source_table = json.result.obj.source_table;
				var user_id = _this.$store.state.user.user_id;
				if (user_id){
					var url = "~/api/"+source_table+"/get_obj?"
					this.$get(url, {"user_id":_this.$store.state.user.user_id}, function(res) {
						if (res.result && res.result.obj) {
							var arr = []
							for (let key in res.result.obj) {
								arr.push(key)
							}
							var arrForm = []
							for (let key in _this.form) {
								arrForm.push(key)
							}
							_this.form["purchasing_users"] = user_id
							_this.disabledObj['purchasing_users' + '_isDisabled'] = true
							for (var i=0;i<arr.length;i++){
                if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
                  for (var j = 0; j < arrForm.length; j++) {
                    if (arr[i] === arrForm[j]) {
                      if (arr[i] !== "purchasing_users") {
                        _this.form[arrForm[j]] = res.result.obj[arr[i]]
                        _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                        break;
                      }
                    }
                  }
                }
							}
						}
					});
				}
			}
			else if(json.error){
				console.error(json.error);
			}
		},
	
	
				
	
				
	
								set_total_amount(){
			this.form.total_amount = parseFloat(this.form.money) * parseFloat(this.form.purchase_quantity)
			  let r = /^\+?[1-9][0-9]*$/; // 正整数
			  if(!r.test(this.form.total_amount) ){
				this.form.total_amount = this.form.total_amount.toFixed(2);
			  }
		},
									
	
				
	
				
	
			change_file(key_name){
			var _self = this;
				this.$chooseFile().then(res=>{
					console.log(res)

						const uploadTask = uni.uploadFile({
							url: _self.$fullUrl("/api/feedback/upload?"),
							filePath: res[0].path,
							name: "file",
							formData: {
								i_want_to_customize: "test",
							},
							header: {
								"x-auth-token": _self.$store.state.user.token,
							},
							success: function(uploadFileRes) {
								console.log(uploadFileRes)
								var filename = JSON.parse(uploadFileRes.data).result.url;
								_self.form[key_name] = filename;
							},
						});

						uploadTask.onProgressUpdate(function(res) {
							_self.percent = res.progress;
							console.log("上传进度" + res.progress);
							console.log("已经上传的数据长度" + res.totalBytesSent);
							console.log(
								"预期需要上传的数据总长度" + res.totalBytesExpectedToSend
							);
						});

				})
		},
		change_img(key_name) {
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
						url: _self.$fullUrl('/api/i_want_to_customize/upload?'),
						filePath: tempFilePaths[0],
						name: 'file',
						formData: {
							'i_want_to_customize': 'test'
						},
						header: {
							'x-auth-token': _self.$store.state.user.token
						},
						success: function(uploadFileRes) {
							var filename = JSON.parse(uploadFileRes.data).result.url
							var img_url = filename
							_self.form[key_name] = img_url
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

		/**
		 * 获取对象后获取缓存表单
		 * @param {Object} json
		 * @param {Object} func
		 */
		get_obj_before(param){
			var form = uni.db.get("form");
			if (form) {
        delete(form.examine_state)
        delete(form.examine_reply)
				this.obj = uni.push(this.obj ,form);
				this.form = uni.push(this.form ,form);
			}
			var arr = []
			for (let key in form) {
				arr.push(key)
			}
			for (var i=0;i<arr.length;i++){
				this.disabledObj[arr[i] + '_isDisabled'] = true
			}
																						if (this.form["customized_time"] && JSON.stringify(this.form["customized_time"]).indexOf("-")===-1) {
				this.form["customized_time"] = this.$toTime(parseInt(this.form["customized_time"]), "yyyy-MM-dd hh:mm:ss")
			}
									uni.db.del("form");
			this.get_list();
			return param;
		},

		/**
		 * 获取对象后获取缓存表单
		 * @param {Object} json
		 * @param {Object} func
		 */
		get_obj_after(json ,func){
			var form = uni.db.get("form");
			var obj = Object.assign({} ,form ,this.obj);
			if (form) {
				this.obj = uni.push(this.obj ,obj);
			}
			if (form) {
				this.form = uni.push(this.form ,form);
			}
			if(func){
				func(json);
			}
		},

		// 选座
		//选定且购买座位
		buySeat: function() {
			//遍历seatArray，将值为1的座位变为2
			let oldArray = this.seatArray.slice();
			for (let i = 0; i < this.seatRow; i++) {
				for (let j = 0; j < this.seatCol; j++) {
					if (oldArray[i][j] === 1) {
						oldArray[i][j] = 2;
					}
				}
			}
			this.seatArray = oldArray;
			let string = "";
			for (let x = 0; x < oldArray.length; x++) {
				let array = oldArray[x];
				for (let j = 0; j < array.length; j++) {
					if (oldArray[x][j] === 2) {
						if (string == "") {
							string = "" + (x * 8 + j);
						} else {
							string = string + "," + (x * 8 + j);
						}
					}
				}
			}
			// 对比判断哪些是新增的座位
			let seat = this.obj.seat;
			let seatB = "";
			if (string != "" && string != null) {
				let stringList = string.split(",");
				let seatList = this.seatList;
				if (seatList.length != 0) {
					let seatListArr = seatList.split(",");
					for (let v = 0; v < stringList.length; v++) {
						if (
							seatListArr.indexOf(stringList[v]) == -1 &&
							seat.indexOf(stringList[v]) == -1
						) {
							if (seat == "" || seat == null) {
								seat = stringList[v] + "";
								seatB = seat;
							} else {
								if (seat.indexOf(stringList[v]) == -1) {
									seat = seat + "," + stringList[v];
									if (seatB == "" || seatB == null) {
										seatB = stringList[v];
									} else {
										seatB = seatB + "," + stringList[v];
									}
								}
							}
						}
					}
				} else {
					seat = string;
				}
			}

			if (this.form.seat == "") {
				this.form.seat = seat;
			} else {
				if (seatB != "") {
					this.form.seat = this.form.seat + "," + seatB;
				}
			}
			this.seatList = string;

		},
		//处理座位选择逻辑
		handleChooseSeat: function(row, col) {
			let seatValue = this.seatArray[row][col];
			let newArray = this.seatArray;
			//如果是已购座位，直接返回
			if (seatValue === 2) return;
			//如果是已选座位点击后变未选
			if (seatValue === 1) {
				newArray[row][col] = 0;
			} else if (seatValue === 0) {
				newArray[row][col] = 1;
			}
			//必须整体更新二维数组，Vue无法检测到数组某一项更新,必须slice复制一个数组才行
			this.seatArray = newArray.slice();
		},
		/**
		 * 获取所有坐座位信息
		 */
		async get_list() {
			var json = await this.$get("~/api/i_want_to_customize/get_list"
							,{"product_number":this.form.product_number}
						);
			if (json.result && json.result.list) {
				this.list_ = json.result.list;
			} else if (json.error) {
				console.error(json.error);
			}
			console.log(json);
			let list = json.result.list;
			if (list != null && list.length != 0) {
				let seatArr = "";
				for (let j = 0; j < list.length; j++) {
					let seat = list[j].seat;
					if (seat != null && seat != "") {
						if (seatArr == "") {
							seatArr = seat + "";
						} else {
							seatArr = seatArr + "," + seat;
						}
					}
				}
				this.seatList = seatArr;
			}
			this.initSeatArray(5, 8);
		},

		//初始座位数组
		initSeatArray: function() {
			let seatList = this.seatList;
			let seatArr = seatList.split(",");
			if (seatList == "" || seatList == null) {
				seatArr = [];
			}
			this.seatArr = seatArr;

			let seatArray = Array(this.seatRow)
				.fill(0)
				.map(() => Array(this.seatCol).fill(0));
			this.seatArray = seatArray;
			for (let j = 0; j < seatArr.length; j++) {
				let i = Math.floor(seatArr[j] / 8);
				let x = seatArr[j] % 8;
				seatArray[i][x] = 2;
			}
			let _this = this;
			uni.createSelectorQuery().in(this).select("#innerSeatWrapper").boundingClientRect(function(data) {
				_this.seatSize = data ?
						parseInt(
								parseInt(
										data.width,
										10
								) / _this.seatCol,
								8
						) :
						0;
				_this.size = parseInt(data.width, 9);
			}).exec(function(res){
				// 注意：exec方法必须执行，即便什么也不做，否则不会获取到任何数据
			})
		},
	},
	onLoad(){
																				this.get_list_user_seller();
					this.get_user_session_purchasing_users();
				this.get_list_user_purchasing_users();
																	},
  watch: {
    'form.product_number': {
      handler: function() {
        this.check_limit();
      }
    }
  }
}
</script>

<style scoped>
	input{
		font-size: 10px;
	}

	.form_edit {
		background-color: #fff;
		margin-bottom: 0.5rem;
		padding: 1rem;
		font-size: 10px;
	}

	.item {
		display: flex;
		padding: 0.2rem 0;
	}

	.left_text {
		flex: 0 0 25%;
		display: flex;
		align-items: center;
	}

	.right_text {
		flex: 0 0 75%;
		border-bottom: 1px solid #eee;
	}
	.right_text.btn_warp{
		border-bottom: 0;
	}

	.btn_submit {
		text-align: center;
		background-color: #fff;
		padding: 0.3rem;
		margin: 0.1rem 1rem;
		border: 1px solid #eee;
		border-radius: 0.5rem;
	}

	.btn_submit:hover {
		opacity: 0.5;
	}
	.btn_add_img{
		color: #D3D3D3;
		text-align: center;
		border: 1px solid #eee;
		height: 5rem;
		width: 5rem;
		position: relative;
	}
	.btn_add_img text{
		font-size: 35px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}

	.seat-wrapper {
	height: 370px;
	width: 500px;
	border: 1px dotted #c5c5c5;
	/* margin: 0 auto; */
	position: relative;
	overflow: hidden;
	}

	.inner-seat-wrapper {
	position: absolute;
	bottom: 0;
	width: 100%;
	box-sizing: border-box;
	}
	.seat {
	float: left;
	display: flex;
	justify-content: center;
	align-items: center;
	}
	.inner-seat {
	width: 80%;
	height: 80%;
	cursor: pointer;
	}

	.btn-wrapper {
	margin: 20px auto;
	width: 1000px;
	height: 30px;
	text-align: center;
	}

	.btn-buy {
	height: 100%;
	line-height: 35px;
	font-size: 15px;
	border-radius: 5px;
	padding: 0 5px;
	background-color: #ffa349;
	color: #ffffff;
	display: inline-block;
	cursor: pointer;
	margin: 5px;
	}

	.illustration {
	position: absolute;
	left: 10px;
	top: 20px;
	height: 35px;
	width: 300px;
	}

	.illustration-img-wrapper {
	width: 25px;
	height: 25px;
	position: relative;
	top: 50%;
	display: inline-block;
	transform: translateY(-50%);
	margin-left: 10px;
	}

	.illustration-text {
	display: inline-block;
	height: 100%;
	line-height: 35px;
	font-size: 14px;
	position: relative;
	top: -2px;
	}


	.selected-seat {
	background: url("/static/img/selected2.png") center center no-repeat;
	background-size: 100% 100%;
	}

	.unselected-seat {
	background: url("/static/img/unselected2.png") center center no-repeat;
	background-size: 100% 100%;
	}

	.bought-seat {
	background: url("/static/img/bought2.png") center center no-repeat;
	background-size: 100% 100%;
	}

</style>
<style scoped>
/*新样式*/
.diy_text_row {
  display: inline-block;
}
.container {
	margin-top:1rem ;
	padding: 1rem;
    -webkit-box-shadow: 0px 0px 0px #888888;
    box-shadow: 0px 0px 0px #888888;
}
.primary_btn{
		background-color: #22B8B8;
		color: #FFFFFF;
	}
	.btn_submit{
		padding: 0;
		margin-top:1rem ;
	}
	.row-item {
		padding: 10px 10px;
	    background: #f8f6fc;
		margin-bottom: 1rem;
	}
	.diy_field{
		padding-left: 1rem;
	}
	.diy_title{
		align-items: center;
        font-size: 14px;
        color: #333;
	}

	.row-item{
		display: flex !important;
		align-items: baseline;
	}
	.diy_select_flex{
		flex: 1;
	}
	.query_select{
		flex: 1;
		border-color: rgb(229, 229, 229);
		background-color: rgb(255, 255, 255);
		border-radius: 4px;
		box-sizing: border-box;
		flex: 1;
		width: 100%;
		line-height: 2;
		font-size: 14px;
		height: 2.4em;
		min-height: 2.4em;
		display: block;
		outline:none;
	}
</style>

