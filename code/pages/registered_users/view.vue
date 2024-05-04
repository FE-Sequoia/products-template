<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">
              <uni-forms-item label="头像" name="avatar">
                <view class="diy_field diy_img" v-if="form_user['avatar']">
                  <image :src="$fullUrl(form_user['avatar'])" @click="change_avatar()" />
                </view>
                <view class="diy_field diy_img" v-else-if="!form_user['avatar']">
                  <view class="btn_add_img" @click="change_avatar()">
                    <text>+</text>
                  </view>
                </view>
                <uni-icons style="display: none;" class="forward" type="forward" id="form_user_img_avatar"></uni-icons>
              </uni-forms-item>

              <uni-forms-item label="账号" name="username">
                <span v-if="obj_user.username">{{obj_user.username}}</span>
                <uni-easyinput v-else type="text" v-model="form_user.username" placeholder="请输入账号" />
              </uni-forms-item>

              <uni-forms-item label="密码" name="password">
                <span v-if="obj_user.password">{{obj_user.password}}</span>
                <uni-easyinput v-else type="password" v-model="form_user.password" placeholder="请输入密码" />
              </uni-forms-item>

              <uni-forms-item label="昵称" name="nickname">
                <uni-easyinput type="text" v-model="form_user.nickname" placeholder="请输入昵称" />
              </uni-forms-item>


              <uni-forms-item label="邮箱" name="email">
                <uni-easyinput type="text" v-model="form_user.email" placeholder="请输入邮箱" />
              </uni-forms-item>



              <uni-forms-item label="状态" name="state">
                <uni-data-select
                    v-model="form_user.state"
                    :localdata="list_user_state"
                    :disabled="user_group!=='管理员'"
                ></uni-data-select>
              </uni-forms-item>

                  <uni-forms-item label="会员等级" name="vip_level">
                <uni-data-select
                    v-model="form_user.vip_level"
                    :localdata="list_user_vip_level"
                    :disabled="user_group!=='管理员'"
                    @change="vip_level_change"
                ></uni-data-select>
              </uni-forms-item>
              <uni-forms-item label="会员折扣" name="vip_discount">
                <uni-easyinput :disabled="true" type="text" v-model="form_user.vip_discount" placeholder="请输入会员折扣" />
              </uni-forms-item>
    
              <uni-forms-item v-if="$check_field('get','name') || ($check_field('add','name') || $check_field('set','name'))" label="姓名" name="name">
                            <uni-easyinput type="text" v-model="form['name']" v-if="user_group === '管理员' || (form['registered_users_id'] && $check_field('set','name')) || (!form['registered_users_id'] && $check_field('add','name'))" :disabled="disabledObj['name_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','name')">
                  {{ form['name'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','gender') || ($check_field('add','gender') || $check_field('set','gender'))" label="性别" name="gender">
                    <uni-data-select
                  v-model="form.gender"
                  :localdata="list_gender"
                  :clear="!disabledObj['gender_isDisabled']"
                  :disabled="disabledObj['gender_isDisabled']"
                  v-if="user_group === '管理员' || (form['registered_users_id'] && $check_field('set','gender')) || (!form['registered_users_id'] && $check_field('add','gender'))"
                ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','gender')">
                  {{ form['gender'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','age') || ($check_field('add','age') || $check_field('set','age'))" label="年龄" name="age">
                            <uni-easyinput type="text" v-model="form['age']" v-if="user_group === '管理员' || (form['registered_users_id'] && $check_field('set','age')) || (!form['registered_users_id'] && $check_field('add','age'))" :disabled="disabledObj['age_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','age')">
                  {{ form['age'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','id_photo') || ($check_field('add','id_photo') || $check_field('set','id_photo'))" label="证件照" name="id_photo">
                    <!-- 修改权限 -->
                <view class="diy_field diy_img" v-if="form['id_photo'] && $check_field('set','id_photo')">
                  <image v-if="disabledObj['id_photo_isDisabled']" :src="$fullUrl(form['id_photo'])" />
                  <image v-if="!disabledObj['id_photo_isDisabled']" :src="$fullUrl(form['id_photo'])" @click="change_img('id_photo')" />
                </view>
                <!-- 添加权限 -->
                <view class="diy_field diy_img" v-else-if="!form['id_photo'] && $check_field('add','id_photo')">
                  <view v-if="disabledObj['id_photo_isDisabled']" class="btn_add_img">
                    <text>+</text>
                  </view>
                  <view v-if="!disabledObj['id_photo_isDisabled']" class="btn_add_img" @click="change_img('id_photo')">
                    <text>+</text>
                  </view>
                </view>
                <!-- 查询权限 -->
                <view class="diy_field diy_img" v-else-if="$check_field('get','id_photo')">
                  <image :src="$fullUrl(form['id_photo'])" />
                </view>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','date_of_birth') || ($check_field('add','date_of_birth') || $check_field('set','date_of_birth'))" label="出生日期" name="date_of_birth">
                    <uni-datetime-picker v-if="user_group === '管理员' || (form['registered_users_id'] && $check_field('set','date_of_birth')) || (!form['registered_users_id'] && $check_field('add','date_of_birth'))" v-model="form['date_of_birth']" type="date" :disabled="disabledObj['date_of_birth_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','date_of_birth')">
                  {{ form['date_of_birth'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','registration_time') || ($check_field('add','registration_time') || $check_field('set','registration_time'))" label="注册时间" name="registration_time">
                    <uni-datetime-picker v-if="user_group === '管理员' || (form['registered_users_id'] && $check_field('set','registration_time')) || (!form['registered_users_id'] && $check_field('add','registration_time'))" @change="changeLog($event,'registration_time')" v-model="form['registration_time']" type="datetime" :disabled="disabledObj['registration_time_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','registration_time')">
                  {{ form['registration_time'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','resume') || ($check_field('add','resume') || $check_field('set','resume'))" label="简历" name="resume">
                    <!-- 查询权限 -->
                <view class="diy_field diy_file" v-if="$check_field('get','resume')">
					<button v-if="form['resume']" class="mini-btn" type="primary" size="mini" @click="download_file($fullUrl(form['resume']))">下载文件</button>
                    <text v-else>无文件</text>
				</view>
				<button v-else-if="$check_field('add','resume') || $check_field('set','resume')" class="mini-btn" type="primary" size="mini" @click="uploadFile_('resume')">上传文件</button>
				<view class="file-url" v-if="resume || form['resume']">
					<view class="close_" @click="close_('resume')">x</view>
					{{resume}}
				</view>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','number') || ($check_field('add','number') || $check_field('set','number'))" label="编号" name="number">
                    <uni-data-select
                  v-model="form.number"
                  :localdata="list_number"
                  :clear="!disabledObj['number_isDisabled']"
                  :disabled="disabledObj['number_isDisabled']"
                  v-if="user_group === '管理员' || (form['registered_users_id'] && $check_field('set','number')) || (!form['registered_users_id'] && $check_field('add','number'))"
                                  ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','number')">
                  {{ form['number'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','classification_number') || ($check_field('add','classification_number') || $check_field('set','classification_number'))" label="分类编号" name="classification_number">
                    <uni-data-select
                  v-model="form.classification_number"
                  :localdata="list_classification_number"
                  :clear="!disabledObj['classification_number_isDisabled']"
                  :disabled="disabledObj['classification_number_isDisabled']"
                  v-if="user_group === '管理员' || (form['registered_users_id'] && $check_field('set','classification_number')) || (!form['registered_users_id'] && $check_field('add','classification_number'))"
                  @change="select_classification_number_field"                ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','classification_number')">
                  {{ form['classification_number'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','classification_categories') || ($check_field('add','classification_categories') || $check_field('set','classification_categories'))" label="分类类别" name="classification_categories">
                    <uni-easyinput type="text" v-model="form['classification_categories']" v-if="user_group === '管理员' || (form['registered_users_id'] && $check_field('set','classification_categories')) || (!form['registered_users_id'] && $check_field('add','classification_categories'))" :disabled="true" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','classification_categories')">
                  {{ form['classification_categories'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','label') || ($check_field('add','label') || $check_field('set','label'))" label="标签" name="label">
                    <ld-select :multiple="true" :list="list_label"
                 label-key="text" value-key="value"
                 placeholder="请选择"
                 :clearable="!disabledObj['label_isDisabled']"
                 :disabled="disabledObj['label_isDisabled']"
                 v-model="label_multiple_value"
                 v-if="user_group === '管理员' || (form['registered_users_id'] && $check_field('set','label')) || (!form['registered_users_id'] && $check_field('add','label'))"
                 @confirm="select_label_multiple"></ld-select>
              <!-- 仅查看 -->
              <text v-else-if="$check_field('get','label')">
                {{ form['label'] }}
              </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','id_card') || ($check_field('add','id_card') || $check_field('set','id_card'))" label="身份证" name="id_card">
                            <uni-easyinput type="text" v-model="form['id_card']" v-if="user_group === '管理员' || (form['registered_users_id'] && $check_field('set','id_card')) || (!form['registered_users_id'] && $check_field('add','id_card'))" :disabled="disabledObj['id_card_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','id_card')">
                  {{ form['id_card'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','mobile_phone') || ($check_field('add','mobile_phone') || $check_field('set','mobile_phone'))" label="手机" name="mobile_phone">
                    <uni-easyinput type="number" v-model="form['mobile_phone']" v-if="user_group === '管理员' || (form['registered_users_id'] && $check_field('set','mobile_phone')) || (!form['registered_users_id'] && $check_field('add','mobile_phone'))" :disabled="disabledObj['mobile_phone_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','mobile_phone')">
                  {{ form['mobile_phone'] }}
                </text>
                  </uni-forms-item>


            </uni-forms>
            <view class="form_button" v-if="$check_action('/registered_users/view','set') || ($check_action('/registered_users/view','add') || $check_option('/registered_users/table','examine'))">
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
                                                        import ldSelect from "@/components/ld-select/ld-select.vue";
export default {
  mixins: [mixin],
  components: {ldSelect},
  data() {
    return {
      field_user: "user_id",
      url_add_user: "~/api/user/register?",
      url_set_user: "~/api/user/set?",
      url_get_obj_user: "~/api/user/get_obj?",
      url_upload_user: "~/api/user/upload?",
      form_user:{
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
      obj_user: {
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
      query_user: {
        "user_id": 0,
      },
      list_state: [{value:0,text:"未认证"},{value:1,text:"审核中"},{value:2,text:"已认证"}],

      list_user_state: [{value: 1,text: "可用"},{value: 2,text: "异常"},{value: 3,text: "已冻结"},{value: 4,text: "已注销"}],
      group_table: "registered_users",
      is_password: true,
          list_user_vip_level:[{value:"",text:""}],
      list_user_vip_level_data:[],
          field: "registered_users_id",
      url_add: "~/api/registered_users/add?",
      url_set: "~/api/registered_users/set?",
      url_get_obj: "~/api/registered_users/get_obj?",
      url_upload: "~/api/registered_users/upload?"
	  ,name: null
	  ,gender: null
	  ,age: null
	  ,id_photo: null
	  ,date_of_birth: null
	  ,registration_time: null
	  ,resume: null
	  ,number: null
	  ,classification_number: null
	  ,classification_categories: null
	  ,label: null
	  ,id_card: null
	  ,mobile_phone: null
      ,query: {
        "registered_users_id": 0,
      },

      form: {
            "name":  '', // 姓名
                    "gender":  '', // 性别
                    "age":  0 , // 年龄
                    "id_photo":  '', // 证件照
                    "date_of_birth": this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
                    "registration_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
                    "resume":  '', // 简历
                    "number":  '', // 编号
                    "classification_number":  '', // 分类编号
                    "classification_categories":  '', // 分类类别
                    "label":  '', // 标签
                    "id_card":  '', // 身份证
                    "mobile_phone":  '', // 手机
                                    "user_id": 0,
                "registered_users_id": 0, // ID
                
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
                                                      // 性别选项列表
          list_gender: [],
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
    /**
     * 提交前验证事件
     * @param {Object} 请求参数
     * @return {String} 验证成功返回null, 失败返回错误提示
     */
    submit_check(param) {
                                                                          if (!param.date_of_birth){
        return "出生日期不能为空";
      }
                          if (!param.registration_time){
        return "注册时间不能为空";
      }
                                                                                                                      let id_card_id_regular = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if(param.id_card && !id_card_id_regular.test(param.id_card)){
        return "身份证号格式错误"
      }
                  let mobile_phone_phone_regular = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if(param.mobile_phone && !mobile_phone_phone_regular.test(param.mobile_phone)){
        return "手机号格式错误"
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
				url: getApp().globalData.host + '/api/registered_users/upload', //仅为示例，非真实的接口地址
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
					if (type == 'name') this['name'] = this.form['name'] = ""
					if (type == 'gender') this['gender'] = this.form['gender'] = ""
					if (type == 'age') this['age'] = this.form['age'] = ""
					if (type == 'id_photo') this['id_photo'] = this.form['id_photo'] = ""
					if (type == 'date_of_birth') this['date_of_birth'] = this.form['date_of_birth'] = ""
					if (type == 'registration_time') this['registration_time'] = this.form['registration_time'] = ""
					if (type == 'resume') this['resume'] = this.form['resume'] = ""
					if (type == 'number') this['number'] = this.form['number'] = ""
					if (type == 'classification_number') this['classification_number'] = this.form['classification_number'] = ""
					if (type == 'classification_categories') this['classification_categories'] = this.form['classification_categories'] = ""
					if (type == 'label') this['label'] = this.form['label'] = ""
					if (type == 'id_card') this['id_card'] = this.form['id_card'] = ""
					if (type == 'mobile_phone') this['mobile_phone'] = this.form['mobile_phone'] = ""
			}
	,submit_() {
					if (this['name'] !== null) this.form['name'] = this['name']
					if (this['gender'] !== null) this.form['gender'] = this['gender']
					if (this['age'] !== null) this.form['age'] = this['age']
					if (this['id_photo'] !== null) this.form['id_photo'] = this['id_photo']
					if (this['date_of_birth'] !== null) this.form['date_of_birth'] = this['date_of_birth']
					if (this['registration_time'] !== null) this.form['registration_time'] = this['registration_time']
					if (this['resume'] !== null) this.form['resume'] = this['resume']
					if (this['number'] !== null) this.form['number'] = this['number']
					if (this['classification_number'] !== null) this.form['classification_number'] = this['classification_number']
					if (this['classification_categories'] !== null) this.form['classification_categories'] = this['classification_categories']
					if (this['label'] !== null) this.form['label'] = this['label']
					if (this['id_card'] !== null) this.form['id_card'] = this['id_card']
					if (this['mobile_phone'] !== null) this.form['mobile_phone'] = this['mobile_phone']
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
            url: _self.$fullUrl('/api/registered_users/upload?'),
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
            url: _self.$fullUrl('/api/registered_users/upload?'),
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
                                              if (this.form["date_of_birth"] && JSON.stringify(this.form["date_of_birth"]).indexOf("-")===-1) {
        this.form["date_of_birth"] = this.$toTime(parseInt(this.form["date_of_birth"]), "yyyy-MM-dd")
      }
              if (this.form["registration_time"] && JSON.stringify(this.form["registration_time"]).indexOf("-")===-1) {
        this.form["registration_time"] = this.$toTime(parseInt(this.form["registration_time"]), "yyyy-MM-dd hh:mm:ss")
      }
                                                                      uni.db.del("form");
      return param;
    },
        
            /**
     * 获取性别列表
     */
    async get_list_gender() {
                  ['男','女'].map((o) => this.list_gender.push({value:o,text:o}));
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
          select_classification_number_field(v){
          if (v) {
            this.$get('~/api/classification_information/get_obj?classification_number=' + v, {}, (res) => {
              if (res.result && res.result.obj) {
                                                                                                                                                                                                                                                                                                                                                                                                                                        this.form.classification_categories = res.result.obj.classification_categories;
                                                                                                                                                                              } else {
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
              select_label_multiple(v){
        this.form.label = "";
        if (v && v.length > 0) {
            this.form.label = v.toString();
        }
      },
            
            
            
    
    /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func){
      let user_id = this.form.user_id;
      this.$get("~/api/user/get_obj?" ,{user_id} ,(res)=>{
        if(res.result && res.result.obj){
          let o = res.result.obj;
          delete o["create_time"];
          delete o["login_time"];
          this.form_user = o;
          this.obj_user = o;
          this.is_password = this.obj_user.password ? false : true;
          this.query_user.user_id = user_id
        }else if(res.error){
          console.log(res.error);
          console.log("获取不到相关信息");
        }
      })
                                                              if (this.form["date_of_birth"] && JSON.stringify(this.form["date_of_birth"]).indexOf("-")===-1) {
        this.form["date_of_birth"] = this.$toTime(parseInt(this.form["date_of_birth"]),"yyyy-MM-dd")
      }
                  if (this.form["registration_time"] && JSON.stringify(this.form["registration_time"]).indexOf("-")===-1) {
        this.form["registration_time"] = this.$toTime(parseInt(this.form["registration_time"]), "yyyy-MM-dd hh:mm:ss")
      }
                                                                              if (this.form.label){
        this.label_multiple_value = this.form.label.split(",")
      }
                                },
    /**
     * 修改头像
     * @param {Object} param文件参数
     */
    change_avatar(){
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
            url: _self.$fullUrl('/api/user/upload?'),
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
              _self.form_user.avatar = filename
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
    async submit(param, func){
      if (!param) {
        param = this.form_user;
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
      //   ret = "请输入正确的手机号码 例：18955552312!";
      // }
      else if(!user_group){
        ret = "请选择用户组!";
      }

      var p = {"username": param.username};

      let form_sub = Object.assign({} ,this.form);
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

    submit_main(param, func) {
      var url = this.url;
      if (url) {
        if (this.field_user) {
          var id = param[this.field_user];
          if (id) {
            var q = {
              method: 'set'
            };
            q[this.field_user] = id;
            url = this.toUrl(q, url);
          } else {
            url += "method=add"
          }
        } else {
          url += "method=submit"
        }
      } else if (this.url_submit) {
        url = this.url_submit;
      } else if (this.field_user) {
        var id = param[this.field_user];
        if (id) {
          url = this.url_set_user;
        } else {
          url = this.url_add_user;
        }
      }

      // console.log('提交', url);
      if (url) {
        var _this = this;
        this.$post(this.$toUrl(this.query_user, url), param, function(json, status) {
          if (json.result) {
            _this.events("submit_after", json, func);
          } else if (json.error) {
            _this.$toast(json.error.message, 'danger');
          } else {
            _this.$toast("服务器连接失败！", "danger");
          }
        });
      }
    },

    // 提交成功后
    submit_after(json,func){
      var form = Object.assign({} ,this.form_user);
      console.log("查询表单form",form)
      this.get_register(form);
    },

    /**
     * 获取注册表信息
     * @param {Object} form
     * @param {Object} table
     */
    get_register(form){
      var form = this.form;
      var form_user = this.form_user;
      delete form_user.password;
      this.$get("~/api/user/get_obj?",form_user,(res)=>{
        console.log("注册表信息res",res);
        if(res.result && res.result.obj){
          form.user_id = res.result.obj.user_id;
          this.submit_sub(form);
        }else if(res.error){
          console.error(res.error);
          this.$toast(res.error.message,"error");
        }
      })
    },

    submit_sub(form_sub){
      if(form_sub["registered_users_id"]){
        // 提交事件
        this.$post("~/api/" + this.group_table + "/set?registered_users_id=" + form_sub["registered_users_id"],form_sub,(res)=>{
          console.log("提交结果：" ,res)
          if(res.result){
            this.$toast("修改成功!" ,"success");
            uni.navigateBack({
              delta: 1
            });
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
            uni.navigateBack({
              delta: 1
            });
          }else if(res.error){
            var user_id = form_sub["user_id"];
            this.$get("~/api/user/del?",{user_id});
            console.error(res.error);
            this.$toast(res.error.message,"error");
          }
        });
      }
    },
        async get_list_vip_level() {
        var list = await this.$get("~/api/vip_level/get_list?");
      if(list.result && list.result.list){
        this.list_user_vip_level_data = list.result.list;
        list.result.list.map((o) => this.list_user_vip_level.push({value:o.name,text:o.name}));
      }
    },
    vip_level_change(v){
        for (let i=0;i<this.list_user_vip_level_data.length;i++){
          if (v==this.list_user_vip_level_data[i].name){
            this.form_user.vip_level = this.list_user_vip_level_data[i].name
            this.obj_user.vip_level = this.list_user_vip_level_data[i].name
            this.form_user.vip_discount = this.list_user_vip_level_data[i].discount
            this.obj_user.vip_discount = this.list_user_vip_level_data[i].discount
            break
          }
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

  },
  created() {
                this.get_list_gender();
                                                        this.get_list_number();
                this.get_list_classification_number();
                        this.get_list_label();
                            this.get_list_vip_level();
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
