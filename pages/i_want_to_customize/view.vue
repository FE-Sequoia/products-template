<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','order_number') || ($check_field('add','order_number') || $check_field('set','order_number'))" label="订单号" name="order_number">
                            <uni-easyinput type="text" v-model="form['order_number']" v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','order_number')) || (!form['i_want_to_customize_id'] && $check_field('add','order_number'))"  :disabled="true" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','order_number')">
                  {{ form['order_number'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','product_number') || ($check_field('add','product_number') || $check_field('set','product_number'))" label="商品编号" name="product_number">
                            <uni-easyinput type="text" v-model="form['product_number']" v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','product_number')) || (!form['i_want_to_customize_id'] && $check_field('add','product_number'))" :disabled="disabledObj['product_number_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','product_number')">
                  {{ form['product_number'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','product_name') || ($check_field('add','product_name') || $check_field('set','product_name'))" label="商品名称" name="product_name">
                            <uni-easyinput type="text" v-model="form['product_name']" v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','product_name')) || (!form['i_want_to_customize_id'] && $check_field('add','product_name'))" :disabled="disabledObj['product_name_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','product_name')">
                  {{ form['product_name'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','cover') || ($check_field('add','cover') || $check_field('set','cover'))" label="封面" name="cover">
                    <!-- 修改权限 -->
                <view class="diy_field diy_img" v-if="form['cover'] && $check_field('set','cover')">
                  <image v-if="disabledObj['cover_isDisabled']" :src="$fullUrl(form['cover'])" />
                  <image v-if="!disabledObj['cover_isDisabled']" :src="$fullUrl(form['cover'])" @click="change_img('cover')" />
                </view>
                <!-- 添加权限 -->
                <view class="diy_field diy_img" v-else-if="!form['cover'] && $check_field('add','cover')">
                  <view v-if="disabledObj['cover_isDisabled']" class="btn_add_img">
                    <text>+</text>
                  </view>
                  <view v-if="!disabledObj['cover_isDisabled']" class="btn_add_img" @click="change_img('cover')">
                    <text>+</text>
                  </view>
                </view>
                <!-- 查询权限 -->
                <view class="diy_field diy_img" v-else-if="$check_field('get','cover')">
                  <image :src="$fullUrl(form['cover'])" />
                </view>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','money') || ($check_field('add','money') || $check_field('set','money'))" label="金额" name="money">
                            <uni-easyinput type="text" v-model="form['money']" v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','money')) || (!form['i_want_to_customize_id'] && $check_field('add','money'))" :disabled="disabledObj['money_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','money')">
                  {{ form['money'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','seller') || ($check_field('add','seller') || $check_field('set','seller'))" label="卖家" name="seller">
                    <uni-data-select
                  id="form_seller"
                  v-model="form['seller']"
                  :localdata="list_user_seller"
                  :clear="!disabledObj['seller_isDisabled']"
                  :disabled="disabledObj['seller_isDisabled']"
                  v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','seller')) || (!form['i_want_to_customize_id'] && $check_field('add','seller'))"
                ></uni-data-select>
                <uni-data-select
                  v-model="form['seller']"
                  :localdata="list_user_seller"
                  :clear="false"
                  :disabled="true"
                  v-else-if="$check_field('get','seller')" id="seller"
                ></uni-data-select>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','purchasing_users') || ($check_field('add','purchasing_users') || $check_field('set','purchasing_users'))" label="购买用户" name="purchasing_users">
                    <uni-data-select
                  id="form_purchasing_users"
                  v-model="form['purchasing_users']"
                  :localdata="list_user_purchasing_users"
                  :clear="!disabledObj['purchasing_users_isDisabled']"
                  :disabled="disabledObj['purchasing_users_isDisabled']"
                  v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','purchasing_users')) || (!form['i_want_to_customize_id'] && $check_field('add','purchasing_users'))"
                ></uni-data-select>
                <uni-data-select
                  v-model="form['purchasing_users']"
                  :localdata="list_user_purchasing_users"
                  :clear="false"
                  :disabled="true"
                  v-else-if="$check_field('get','purchasing_users')" id="purchasing_users"
                ></uni-data-select>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','purchase_quantity') || ($check_field('add','purchase_quantity') || $check_field('set','purchase_quantity'))" label="购买数量" name="purchase_quantity">
                            <uni-easyinput type="text" v-model="form['purchase_quantity']" v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','purchase_quantity')) || (!form['i_want_to_customize_id'] && $check_field('add','purchase_quantity'))" :disabled="disabledObj['purchase_quantity_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','purchase_quantity')">
                  {{ form['purchase_quantity'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','total_amount') || ($check_field('add','total_amount') || $check_field('set','total_amount'))" label="总金额" name="total_amount">
                            <uni-easyinput type="text" v-model="form['total_amount']" v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','total_amount')) || (!form['i_want_to_customize_id'] && $check_field('add','total_amount'))"  @focus="set_total_amount()" :disabled="disabledObj['total_amount_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','total_amount')">
                  {{ form['total_amount'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','customized_time') || ($check_field('add','customized_time') || $check_field('set','customized_time'))" label="定制时间" name="customized_time">
                    <uni-datetime-picker v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','customized_time')) || (!form['i_want_to_customize_id'] && $check_field('add','customized_time'))" @change="changeLog($event,'customized_time')" v-model="form['customized_time']" type="datetime" :disabled="disabledObj['customized_time_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','customized_time')">
                  {{ form['customized_time'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','requirement_document') || ($check_field('add','requirement_document') || $check_field('set','requirement_document'))" label="需求文件" name="requirement_document">
                    <!-- 查询权限 -->
                <view class="diy_field diy_file" v-if="$check_field('get','requirement_document')">
					<button v-if="form['requirement_document']" class="mini-btn" type="primary" size="mini" @click="download_file($fullUrl(form['requirement_document']))">下载文件</button>
                    <text v-else>无文件</text>
				</view>
				<button v-else-if="$check_field('add','requirement_document') || $check_field('set','requirement_document')" class="mini-btn" type="primary" size="mini" @click="uploadFile_('requirement_document')">上传文件</button>
				<view class="file-url" v-if="requirement_document || form['requirement_document']">
					<view class="close_" @click="close_('requirement_document')">x</view>
					{{requirement_document}}
				</view>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','remarks') || ($check_field('add','remarks') || $check_field('set','remarks'))" label="备注" name="remarks">
                    <uni-easyinput type="textarea" v-model="form['remarks']" v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','remarks')) || (!form['i_want_to_customize_id'] && $check_field('add','remarks'))" :disabled="disabledObj['remarks_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','remarks')">
                  {{ form['remarks'] }}
                </text>
                  </uni-forms-item>

              <uni-forms-item label="选座" name="choose_seat">
                <!-- 座位 -->
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
              </uni-forms-item>

            </uni-forms>
            <view class="form_button" v-if="$check_action('/i_want_to_customize/view','set') || ($check_action('/i_want_to_customize/view','add') || $check_option('/i_want_to_customize/table','examine'))">
              <button size="mini" type="primary" @click="submit_()" class="primary_btn">提交</button>
              <button size="mini" @click="cancel()">取消</button>
            </view>
            <view class="form_button" v-else>
              <button size="mini" @click="cancel()">返回</button>
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
  mixins: [mixin],
  data() {
    return {
      field: "i_want_to_customize_id",
      url_add: "~/api/i_want_to_customize/add?",
      url_set: "~/api/i_want_to_customize/set?",
      url_get_obj: "~/api/i_want_to_customize/get_obj?",
      url_upload: "~/api/i_want_to_customize/upload?"
	  ,order_number: null
	  ,product_number: null
	  ,product_name: null
	  ,cover: null
	  ,money: null
	  ,seller: null
	  ,purchasing_users: null
	  ,purchase_quantity: null
	  ,total_amount: null
	  ,customized_time: null
	  ,requirement_document: null
	  ,remarks: null
      ,query: {
        "i_want_to_customize_id": 0,
      },

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
                                "seat": "", // 座位
                    "i_want_to_customize_id": 0, // ID
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
                        // 用户组
            group_user_purchasing_users: "",
                                                                                                                                            limit_times: 0, // 限制次数
            limit_type:0,
            act_limit_times:0,
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
    changeLog(v,value){
      this.form[value] = v
    }
	,uploadFile_(type) {
			// #ifdef APP-VUE
				uni.chooseFile({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						this.successChoose(tempFilePaths[0], type)
					}
				});
			// #endif
			// #ifdef !APP-VUE
				if (uni.getSystemInfoSync().uniPlatform != "mp-weixin" || uni.getSystemInfoSync().platform == "devtools") {
					uni.chooseImage({
						count: 1,
						success: (chooseImageRes) => {
							const tempFilePaths = chooseImageRes.tempFilePaths;
							this.successChoose(tempFilePaths[0], type)
						}
					});
				} else {
					wx.chooseMessageFile({
						count: 1,
						success: (chooseImageRes) => {
							const tempFilePaths = chooseImageRes.tempFiles;
							this.successChoose(tempFilePaths[0].path, type)
						}
					})
				}
			// #endif

		}
		,successChoose(filePath, type) {
			uni.uploadFile({
				url: getApp().globalData.host + '/api/i_want_to_customize/upload', //仅为示例，非真实的接口地址
				filePath,
				name: 'file',
				success: (uploadFileRes) => {
					if (uploadFileRes.data.error) {
						uni.showToast({title: uploadFileRes.data.error.message, icon: "none"})
					} else {
						this[type] = JSON.parse(uploadFileRes.data).result.url
					}
				}
			});
		}
	,close_(type) {
					if (type == 'order_number') this['order_number'] = this.form['order_number'] = ""
					if (type == 'product_number') this['product_number'] = this.form['product_number'] = ""
					if (type == 'product_name') this['product_name'] = this.form['product_name'] = ""
					if (type == 'cover') this['cover'] = this.form['cover'] = ""
					if (type == 'money') this['money'] = this.form['money'] = ""
					if (type == 'seller') this['seller'] = this.form['seller'] = ""
					if (type == 'purchasing_users') this['purchasing_users'] = this.form['purchasing_users'] = ""
					if (type == 'purchase_quantity') this['purchase_quantity'] = this.form['purchase_quantity'] = ""
					if (type == 'total_amount') this['total_amount'] = this.form['total_amount'] = ""
					if (type == 'customized_time') this['customized_time'] = this.form['customized_time'] = ""
					if (type == 'requirement_document') this['requirement_document'] = this.form['requirement_document'] = ""
					if (type == 'remarks') this['remarks'] = this.form['remarks'] = ""
			}
	,submit_() {
					if (this['order_number'] !== null) this.form['order_number'] = this['order_number']
					if (this['product_number'] !== null) this.form['product_number'] = this['product_number']
					if (this['product_name'] !== null) this.form['product_name'] = this['product_name']
					if (this['cover'] !== null) this.form['cover'] = this['cover']
					if (this['money'] !== null) this.form['money'] = this['money']
					if (this['seller'] !== null) this.form['seller'] = this['seller']
					if (this['purchasing_users'] !== null) this.form['purchasing_users'] = this['purchasing_users']
					if (this['purchase_quantity'] !== null) this.form['purchase_quantity'] = this['purchase_quantity']
					if (this['total_amount'] !== null) this.form['total_amount'] = this['total_amount']
					if (this['customized_time'] !== null) this.form['customized_time'] = this['customized_time']
					if (this['requirement_document'] !== null) this.form['requirement_document'] = this['requirement_document']
					if (this['remarks'] !== null) this.form['remarks'] = this['remarks']
				console.log(this.form)
		this.submit()
	}
    /**
     * 上传文件
     * @param {Object} param文件参数
     */
    ,change_file(key_name){
      var _self = this;
      // 选择图像方法
      uni.chooseFile({
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
              _self.form[key_name] = filename
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
              _self.form[key_name] = filename
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
            /**
     * 获取注册用户用户组
     */
    async get_group_user_purchasing_users() {
      this.form["purchasing_users"] = this.user.user_id;
      var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
      if(json.result && json.result.obj){
        this.group_user_purchasing_users = json.result.obj;
        this.get_user_session_purchasing_users(this.form['purchasing_users'])
      }
      else if(json.error){
        console.error(json.error);
      }
    },
    get_user_session_purchasing_users(id){
      var _this = this;
      var user_id = {"user_id":id}
      var url = "~/api/"+_this.group_user_purchasing_users.source_table+"/get_obj?"
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
          _this.form["purchasing_users"] = id
          _this.disabledObj['purchasing_users' + '_isDisabled'] = true
          for (var i=0;i<arr.length;i++){
            if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
              for (var j = 0; j < arrForm.length; j++) {
                if (arr[i] === arrForm[j]) {
                  if (arr[i] !== "purchasing_users") {
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
            
            
            
                            set_total_amount(){
      this.form.total_amount = parseFloat(this.form.money) * parseFloat(this.form.purchase_quantity)
      let r = /^\+?[1-9][0-9]*$/; // 正整数
      if(!r.test(this.form.total_amount) ){
        this.form.total_amount = this.form.total_amount.toFixed(2);
      }
    },
                                
            
            
    
    /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func){
                                                                                                                      if (this.form["customized_time"] && JSON.stringify(this.form["customized_time"]).indexOf("-")===-1) {
        this.form["customized_time"] = this.$toTime(parseInt(this.form["customized_time"]), "yyyy-MM-dd hh:mm:ss")
      }
                                        },

    is_view(){
      var bl = this.user_group == "管理员";

      if(!bl){
        bl = this.$check_action('/i_want_to_customize/table','add');
        console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
      }
      if(!bl){
        bl = this.$check_action('/i_want_to_customize/table','set');
        console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
      }
      if(!bl){
        bl = this.$check_action('/i_want_to_customize/view','add');
        console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
      }
      if(!bl){
        bl = this.$check_action('/i_want_to_customize/view','set');
        console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
      }
      if(!bl){
        bl = this.$check_action('/i_want_to_customize/view','get');
        console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
      }

      console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

      return bl;
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
  created() {
                                                    this.get_list_user_seller();
                        this.get_list_user_purchasing_users();
            this.get_group_user_purchasing_users();
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

.form_button{
  padding-bottom: 15px;
  display: flex;
}
.form_button button{
  width: 40%;
}
.query_select{
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

.query_option{
  width: 100%;
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.form_button {
  padding-bottom: 15px;
  display: flex;
}
.form_button button {
  width: 40%;
}
.query_select {
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
  outline: none;
}

.query_option {
  width: 100%;
}

.btn_add_img {
  color: #d3d3d3;
  text-align: center;
  border: 1px solid #eee;
  height: 5rem;
  width: 5rem;
  position: relative;
}
.btn_add_img text {
  font-size: 35px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/*新样式*/
.uni-forms{
padding-top:1rem;
}
.uni-forms-item {
	padding: 6px 10px;
    background: #f8f6fc;
}
.uni-forms .is-input-border{
	border: 0;
}
.container{
	    -webkit-box-shadow: 0px 0px 0px #888888;
	    box-shadow: 0px 0px 0px #888888;
}
.form_button .primary_btn{
		background-color: #22B8B8;
		color: #FFFFFF;
	}
.file-url {
	font-size: 12px;
	color: #ccc;
}
	.diy_field, .file-url {
		position: relative;
	}
	.close_ {
		position: absolute;
		top: -18px;
		left: -7px;
		font-size: 22px;
		color: #22B8B8;
		font-weight: 600;
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
