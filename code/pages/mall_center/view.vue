<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','mall_seller') || ($check_field('add','mall_seller') || $check_field('set','mall_seller'))" label="商城卖家" name="mall_seller">
                    <uni-data-select
                  id="form_mall_seller"
                  v-model="form['mall_seller']"
                  :localdata="list_user_mall_seller"
                  :clear="!disabledObj['mall_seller_isDisabled']"
                  :disabled="disabledObj['mall_seller_isDisabled']"
                  v-if="user_group === '管理员' || (form['mall_center_id'] && $check_field('set','mall_seller')) || (!form['mall_center_id'] && $check_field('add','mall_seller'))"
                ></uni-data-select>
                <uni-data-select
                  v-model="form['mall_seller']"
                  :localdata="list_user_mall_seller"
                  :clear="false"
                  :disabled="true"
                  v-else-if="$check_field('get','mall_seller')" id="mall_seller"
                ></uni-data-select>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','merchant_name') || ($check_field('add','merchant_name') || $check_field('set','merchant_name'))" label="商家姓名" name="merchant_name">
                            <uni-easyinput type="text" v-model="form['merchant_name']" v-if="user_group === '管理员' || (form['mall_center_id'] && $check_field('set','merchant_name')) || (!form['mall_center_id'] && $check_field('add','merchant_name'))" :disabled="disabledObj['merchant_name_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','merchant_name')">
                  {{ form['merchant_name'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','production_date') || ($check_field('add','production_date') || $check_field('set','production_date'))" label="生产日期" name="production_date">
                    <uni-datetime-picker v-if="user_group === '管理员' || (form['mall_center_id'] && $check_field('set','production_date')) || (!form['mall_center_id'] && $check_field('add','production_date'))" v-model="form['production_date']" type="date" :disabled="disabledObj['production_date_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','production_date')">
                  {{ form['production_date'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','shelf_life') || ($check_field('add','shelf_life') || $check_field('set','shelf_life'))" label="保质期" name="shelf_life">
                    <uni-datetime-picker v-if="user_group === '管理员' || (form['mall_center_id'] && $check_field('set','shelf_life')) || (!form['mall_center_id'] && $check_field('add','shelf_life'))" @change="changeLog($event,'shelf_life')" v-model="form['shelf_life']" type="datetime" :disabled="disabledObj['shelf_life_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','shelf_life')">
                  {{ form['shelf_life'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','label') || ($check_field('add','label') || $check_field('set','label'))" label="标签" name="label">
                    <uni-data-select
                  v-model="form.label"
                  :localdata="list_label"
                  :clear="!disabledObj['label_isDisabled']"
                  :disabled="disabledObj['label_isDisabled']"
                  v-if="user_group === '管理员' || (form['mall_center_id'] && $check_field('set','label')) || (!form['mall_center_id'] && $check_field('add','label'))"
                                  ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','label')">
                  {{ form['label'] }}
                </text>
                  </uni-forms-item>


            </uni-forms>
            <view class="form_button" v-if="$check_action('/mall_center/view','set') || ($check_action('/mall_center/view','add') || $check_option('/mall_center/table','examine'))">
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
      field: "mall_center_id",
      url_add: "~/api/mall_center/add?",
      url_set: "~/api/mall_center/set?",
      url_get_obj: "~/api/mall_center/get_obj?",
      url_upload: "~/api/mall_center/upload?"
	  ,mall_seller: null
	  ,merchant_name: null
	  ,production_date: null
	  ,shelf_life: null
	  ,label: null
      ,query: {
        "mall_center_id": 0,
      },

      form: {
            "mall_seller": 0, // 商城卖家
                    "merchant_name":  '', // 商家姓名
                    "production_date": this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
                    "shelf_life": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
                    "label":  '', // 标签
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
          list_label: [],
                                          }
  },
  methods: {
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
				url: getApp().globalData.host + '/api/mall_center/upload', //仅为示例，非真实的接口地址
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
					if (type == 'mall_seller') this['mall_seller'] = this.form['mall_seller'] = ""
					if (type == 'merchant_name') this['merchant_name'] = this.form['merchant_name'] = ""
					if (type == 'production_date') this['production_date'] = this.form['production_date'] = ""
					if (type == 'shelf_life') this['shelf_life'] = this.form['shelf_life'] = ""
					if (type == 'label') this['label'] = this.form['label'] = ""
			}
	,submit_() {
					if (this['mall_seller'] !== null) this.form['mall_seller'] = this['mall_seller']
					if (this['merchant_name'] !== null) this.form['merchant_name'] = this['merchant_name']
					if (this['production_date'] !== null) this.form['production_date'] = this['production_date']
					if (this['shelf_life'] !== null) this.form['shelf_life'] = this['shelf_life']
					if (this['label'] !== null) this.form['label'] = this['label']
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
            url: _self.$fullUrl('/api/mall_center/upload?'),
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
            url: _self.$fullUrl('/api/mall_center/upload?'),
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
                              if (this.form["production_date"] && JSON.stringify(this.form["production_date"]).indexOf("-")===-1) {
        this.form["production_date"] = this.$toTime(parseInt(this.form["production_date"]), "yyyy-MM-dd")
      }
              if (this.form["shelf_life"] && JSON.stringify(this.form["shelf_life"]).indexOf("-")===-1) {
        this.form["shelf_life"] = this.$toTime(parseInt(this.form["shelf_life"]), "yyyy-MM-dd hh:mm:ss")
      }
                      uni.db.del("form");
      return param;
    },
            /**
     * 获取商城卖家用户列表
     */
    async get_list_user_mall_seller() {
      // if(this.user_group !== "管理员" && this.form["mall_seller"] === 0) {
      //     this.form["mall_seller"] = this.user.user_id;
      // }
      var json = await this.$get("~/api/user/get_list?user_group=商城卖家");
      if(json.result && json.result.list){
        json.result.list.map((o) => this.list_user_mall_seller.push({value:o.user_id,text:o.nickname + '-' + o.username}));
      }
      else if(json.error){
        console.error(json.error);
      }
    },
            /**
     * 获取商城卖家用户组
     */
    async get_group_user_mall_seller() {
      this.form["mall_seller"] = this.user.user_id;
      var json = await this.$get("~/api/user_group/get_obj?name=商城卖家");
      if(json.result && json.result.obj){
        this.group_user_mall_seller = json.result.obj;
        this.get_user_session_mall_seller(this.form['mall_seller'])
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
                
    
    /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func){
                                      if (this.form["production_date"] && JSON.stringify(this.form["production_date"]).indexOf("-")===-1) {
        this.form["production_date"] = this.$toTime(parseInt(this.form["production_date"]),"yyyy-MM-dd")
      }
                  if (this.form["shelf_life"] && JSON.stringify(this.form["shelf_life"]).indexOf("-")===-1) {
        this.form["shelf_life"] = this.$toTime(parseInt(this.form["shelf_life"]), "yyyy-MM-dd hh:mm:ss")
      }
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

  },
  created() {
            this.get_list_user_mall_seller();
            this.get_group_user_mall_seller();
                                            this.get_list_label();
          },
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


</style>
