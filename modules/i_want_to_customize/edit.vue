<template>
	<div class="diy_edit page_i_want_to_customize" id="i_want_to_customize_edit">
		<div class='warp'>
			<div class='container'>
				<div class='row diy_edit_content_box'>
						<div v-if="$check_field('set','order_number') || $check_field('add','order_number') || $check_field('get','order_number')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								订单号:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<input type="text" id="form_order_number" v-model="form['order_number']" placeholder="请输入订单号" v-if="(form['order_number'] && $check_field('set','order_number')) || (!form['order_number'] && $check_field('add','order_number'))" :disabled="true"/>
							<span v-else-if="$check_field('get','order_number')">{{ form['${obj.name}'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','product_number') || $check_field('add','product_number') || $check_field('get','product_number')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								商品编号:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<input type="text" id="form_product_number" v-model="form['product_number']" placeholder="请输入商品编号" v-if="(form['product_number'] && $check_field('set','product_number')) || (!form['product_number'] && $check_field('add','product_number'))"  :disabled="disabledObj['product_number_isDisabled']"/>
							<span v-else-if="$check_field('get','product_number')">{{ form['${obj.name}'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','product_name') || $check_field('add','product_name') || $check_field('get','product_name')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								商品名称:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<input type="text" id="form_product_name" v-model="form['product_name']" placeholder="请输入商品名称" v-if="(form['product_name'] && $check_field('set','product_name')) || (!form['product_name'] && $check_field('add','product_name'))"  :disabled="disabledObj['product_name_isDisabled']"/>
							<span v-else-if="$check_field('get','product_name')">{{ form['${obj.name}'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','cover') || $check_field('add','cover') || $check_field('get','cover')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								封面:
							</span>
						</div>
								<!-- 图片 -->
						<input type="file" :disabled="disabledObj['cover_isDisabled']" style="display: none;" id="form_img_cover" title="cover" @change="change_file($event.target.files,'cover')"/>
						<!-- 修改权限 -->
						<div class="diy_field diy_img" v-if="form['cover'] && $check_field('set','cover')">
							<label for="form_img_cover">
								<img :src="$fullUrl(form['cover'])" />
							</label>
						</div>
						<!-- 添加权限 -->
						<div class="diy_field diy_img" v-else-if="!form['cover'] && $check_field('add','cover')">
							<label for="form_img_cover">
								<div class="btn_add_img">
									<span>+</span>
								</div>
							</label>
						</div>
						<!-- 查询权限 -->
						<div class="diy_field diy_img" v-else-if="$check_field('get','cover')">
							<img :src="$fullUrl(form['cover'])" />
						</div>
							</div>
							<div v-if="$check_field('set','money') || $check_field('add','money') || $check_field('get','money')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								金额:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<input type="text" id="form_money" v-model="form['money']" placeholder="请输入金额" v-if="(form['money'] && $check_field('set','money')) || (!form['money'] && $check_field('add','money'))"  :disabled="disabledObj['money_isDisabled']"/>
							<span v-else-if="$check_field('get','money')">{{ form['${obj.name}'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','seller') || $check_field('add','seller') || $check_field('get','seller')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								卖家:
							</span>
						</div>
						<div class="diy_field diy_down">
							<select id="form_seller" :disabled="disabledObj['seller_isDisabled']" v-model="form['seller']" v-if="(form['seller'] && $check_field('set','seller')) || (!form['seller'] && $check_field('add','seller'))" >
								<option v-for="o in list_user_seller" :value="o['user_id']">
									{{o['nickname'] + '-' + o['username']}}
								</option>
							</select>
							<span v-else-if="$check_field('get','seller')">{{ form['seller'] }}</span>
						</div>
					</div>
							<div v-if="$check_field('set','purchasing_users') || $check_field('add','purchasing_users') || $check_field('get','purchasing_users')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								购买用户:
							</span>
						</div>
						<div class="diy_field diy_down">
							<select id="form_purchasing_users" :disabled="disabledObj['purchasing_users_isDisabled']" v-model="form['purchasing_users']" v-if="(form['purchasing_users'] && $check_field('set','purchasing_users')) || (!form['purchasing_users'] && $check_field('add','purchasing_users'))" >
								<option v-for="o in list_user_purchasing_users" :value="o['user_id']">
									{{o['nickname'] + '-' + o['username']}}
								</option>
							</select>
							<span v-else-if="$check_field('get','purchasing_users')">{{ form['purchasing_users'] }}</span>
						</div>
					</div>
							<div v-if="$check_field('set','purchase_quantity') || $check_field('add','purchase_quantity') || $check_field('get','purchase_quantity')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								购买数量:
							</span>
						</div>
								<!-- 数字 -->
						<div class="diy_field diy_number">
							<input type="number" id="form_purchase_quantity" v-model.number="form['purchase_quantity']" placeholder="请输入购买数量" v-if="(form['purchase_quantity'] && $check_field('set','purchase_quantity')) || (!form['purchase_quantity'] && $check_field('add','purchase_quantity'))" :disabled="disabledObj['purchase_quantity_isDisabled']" />
							<span v-else-if="$check_field('get','purchase_quantity')">{{ form['${obj.name}'] }}</span>
						</div>
							</div>
							<div v-if="$check_field('set','total_amount') || $check_field('add','total_amount') || $check_field('get','total_amount')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								总金额:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<input type="text" id="form_total_amount" v-model="form['total_amount']" placeholder="请输入总金额" v-if="(form['total_amount'] && $check_field('set','total_amount')) || (!form['total_amount'] && $check_field('add','total_amount'))"  @focus="set_total_amount()" :disabled="disabledObj['total_amount_isDisabled']"/>
							<span v-else-if="$check_field('get','total_amount')">{{ form['${obj.name}'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','customized_time') || $check_field('add','customized_time') || $check_field('get','customized_time')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								定制时间:
							</span>
						</div>
								<!-- 日长 -->
						<div class="diy_field diy_datetime">
							<input type="datetime-local" :disabled="disabledObj['customized_time_isDisabled']" id="form_customized_time" v-model="form['customized_time']" placeholder="请输入定制时间" v-if="(form['customized_time'] && $check_field('set','customized_time')) || (!form['customized_time'] && $check_field('add','customized_time'))" />
							<span v-else-if="$check_field('get','customized_time')">{{ form['${obj.name}'] }}</span>
						</div>
							</div>
							<div v-if="$check_field('set','requirement_document') || $check_field('add','requirement_document') || $check_field('get','requirement_document')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								需求文件:
							</span>
						</div>
								<!-- 文件 -->
						<input type="file" style="display: none;" id="form_file_requirement_document" title="requirement_document" @change="change_file($event.target.files,'requirement_document')"/>
						<!-- 修改权限 -->
						<div class="diy_field diy_img" v-if="form['requirement_document'] && $check_field('set','requirement_document')">
							<label for="form_file_requirement_document">
								<!--<span>{{form['requirement_document']}} </span>-->
								<a :href="$fullUrl(form['requirement_document'])" target="_blank" style="color: rgb(64, 158, 255);">点击下载</a>
							</label>
						</div>
						<!-- 添加权限 -->
						<div class="diy_field diy_img" v-else-if="!form['requirement_document'] && $check_field('add','requirement_document')">
							<label for="form_file_requirement_document">
								<div class="btn_add_img">
									<span>+</span>
								</div>
							</label>
						</div>
						<!-- 查询权限 -->
						<div class="diy_field diy_img" v-else-if="$check_field('get','requirement_document')">
							<span>{{form['requirement_document']}} </span>
						</div>
							</div>
							<div v-if="$check_field('set','remarks') || $check_field('add','remarks') || $check_field('get','remarks')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								备注:
							</span>
						</div>
								<!-- 多文本 -->
						<div class="diy_field diy_desc">
							<textarea id="form_remarks" v-model="form['remarks']" v-if="(form['remarks'] && $check_field('set','remarks')) || (!form['remarks'] && $check_field('add','remarks'))" :disabled="disabledObj['remarks_isDisabled']" />
							<span v-else-if="$check_field('get','remarks')">{{ form['${obj.name}'] }}</span>
						</div>
							</div>
	




					<!-- 座位 -->
					<div class="form-item selected_seat_box col-12 col-md-6">
						<div class="seat-wrapper">
						  <div class="illustration">
							<div class="illustration-img-wrapper unselected-seat"></div>
							<span class="illustration-text">可选</span>
							<div class="illustration-img-wrapper selected-seat"></div>
							<span class="illustration-text">已选</span>
							<div class="illustration-img-wrapper bought-seat"></div>
							<span class="illustration-text">不可选</span>
							<div class="btn-buy" @click="buySeat">选定座位</div>
						  </div>
						  <div class="inner-seat-wrapper" ref="innerSeatWrapper">
							<div v-for="row in seatRow" :key="row">
							  <!--这里的v-if很重要，如果没有则会导致报错，因为seatArray初始状态为空-->
							  <div
								v-for="col in seatCol"
								v-if="seatArray.length > 0"
								class="seat"
								:style="{ width: seatSize + 'px', height: seatSize + 'px' }"
							  >
								<div
								  class="inner-seat"
								  @click="handleChooseSeat(row - 1, col - 1)"
								  v-if="seatArray[row - 1][col - 1] !== -1"
								  :class="
									seatArray[row - 1][col - 1] === 2
									  ? 'bought-seat'
									  : seatArray[row - 1][col - 1] === 1
									  ? 'selected-seat'
									  : 'unselected-seat'
								  "
								></div>
							  </div>
							</div>
						  </div>
						</div>
					</div>
				</div>
				<div class="diy_edit_submit_box row">
					<div class="col-12">
						<div class="btn_box">
							<button class="btn_submit" @click="submit()">提交</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import mixin from "@/mixins/page.js";
	export default {
		mixins: [mixin],
		components: {},
		data() {
			return {
				url_get_obj: "~/api/i_want_to_customize/get_obj?",
				url_add: "~/api/i_want_to_customize/add?",
				url_set: "~/api/i_want_to_customize/set?",

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
						"i_want_to_customize_id": 0,
					"seat": "", // 座位
				},

				obj: {
						"order_number": this.$get_stamp(), // 订单号
							"product_number":  '', // 商品编号
							"product_name":  '', // 商品名称
							"cover":  '', // 封面
							"money":  '', // 金额
							"seller": 0, // 卖家
							"purchasing_users": 0, // 购买用户
							"purchase_quantity":  0, // 购买数量
							"total_amount":  '', // 总金额
							"customized_time": new Date().getTime(),
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
							"purchase_quantity":  0, // 购买数量
							"total_amount":  '', // 总金额
							"customized_time": new Date().getTime(),
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
											
				// ID字段
				field: "i_want_to_customize_id",

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
        limit_times: 0, // 限制次数
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
					this.list_user_seller = json.result.list;
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
					this.list_user_purchasing_users = json.result.list;
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
									
				
				
	
			/**
			 * 修改文件
			 * @param { Object } files 上传文件对象
			 * @param { String } str 表单的属性名
			 */
			change_file(files, str) {
				var form = new FormData();
				form.append("file", files[0]);
				this.$post("~/api/i_want_to_customize/upload?", form, (res) => {
					if (res.result) {
						this.form[str] = res.result.url;
					} else if (res.error) {
						this.$toast(res.error.message);
					}
				});
			},

			/**
			 * 获取对象后获取缓存表单
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_before(param){
				var form = $.db.get("form");
				// if (form) {
        //   delete(form.examine_state)
        //   delete(form.examine_reply)
        //   this.obj = $.push(this.obj ,form);
				// 	this.form = $.push(this.form ,form);
				// }
				// var arr = []
				// for (let key in form) {
				// 	arr.push(key)
				// }
				// for (var i=0;i<arr.length;i++){
				// 	this.disabledObj[arr[i] + '_isDisabled'] = true
				// }
        if (form) {
          var arr = []
          for (let key in form) {
            arr.push(key)
          }
          var arrForm = []
          for (let key in this.form) {
            arrForm.push(key)
          }
          for (var i=0;i<arr.length;i++){
            if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
              for (var j = 0; j < arrForm.length; j++) {
                if (arrForm[j] === arr[i]) {
                  this.form[arrForm[j]] = form[arr[i]]
                  this.obj[arrForm[j]] = form[arr[i]]
                  this.disabledObj[arrForm[j] + '_isDisabled'] = true
                  break;
                }
              }
            }
          }
        }
																			        if (this.form["customized_time"] && JSON.stringify(this.form["customized_time"]).indexOf("-")===-1) {
          this.form["customized_time"] = this.$toTime(parseInt(this.form["customized_time"]), "yyyy-MM-ddThh:mm")
        }
						
        $.db.del("form");
				this.get_list();
				return param;
			},

			/**
			 * 获取对象后获取缓存表单
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json ,func){
				// var form = $.db.get("form");
				// var obj = Object.assign({} ,form ,this.obj);
				// if (obj) {
        //   delete(obj.examine_state)
        //   delete(obj.examine_reply)
				// 	this.obj = $.push(this.obj ,obj);
				// }
				// if (form) {
        //   delete(form.examine_state)
        //   delete(form.examine_reply)
				// 	this.form = $.push(this.form ,form);
				// }

				if(func){
					func(json);
				}
			},

			// 选座
			//选定且购买座位
			buySeat: function () {
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
			handleChooseSeat: function (row, col) {
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
			initSeatArray: function () {
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
			  this.seatSize = this.$refs.innerSeatWrapper
				? parseInt(
					parseInt(
					  window.getComputedStyle(this.$refs.innerSeatWrapper).width,
					  10
					) / this.seatCol,
					10
				  )
				: 0;
			},
		},
		created() {
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

<style>


	.seat-wrapper {
	  margin-top: 20px;
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
		background: url("../../../public/img/selected2.png") center center no-repeat;
		background-size: 100% 100%;
		}

		.unselected-seat {
		background: url("../../../public/img/unselected2.png") center center no-repeat;
		background-size: 100% 100%;
		}

		.bought-seat {
		background: url("../../../public/img/bought2.png") center center no-repeat;
		background-size: 100% 100%;
		}

</style>
