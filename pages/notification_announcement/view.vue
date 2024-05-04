<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','announcement_title') || ($check_field('add','announcement_title') || $check_field('set','announcement_title'))" label="公告标题" name="announcement_title">
                            <uni-easyinput type="text" v-model="form['announcement_title']" v-if="user_group === '管理员' || (form['notification_announcement_id'] && $check_field('set','announcement_title')) || (!form['notification_announcement_id'] && $check_field('add','announcement_title'))" :disabled="disabledObj['announcement_title_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','announcement_title')">
                  {{ form['announcement_title'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','publisher') || ($check_field('add','publisher') || $check_field('set','publisher'))" label="发布人" name="publisher">
                            <uni-easyinput type="text" v-model="form['publisher']" v-if="user_group === '管理员' || (form['notification_announcement_id'] && $check_field('set','publisher')) || (!form['notification_announcement_id'] && $check_field('add','publisher'))" :disabled="disabledObj['publisher_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','publisher')">
                  {{ form['publisher'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','release_time') || ($check_field('add','release_time') || $check_field('set','release_time'))" label="发布时间" name="release_time">
                    <uni-datetime-picker v-if="user_group === '管理员' || (form['notification_announcement_id'] && $check_field('set','release_time')) || (!form['notification_announcement_id'] && $check_field('add','release_time'))" @change="changeLog($event,'release_time')" v-model="form['release_time']" type="datetime" :disabled="disabledObj['release_time_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','release_time')">
                  {{ form['release_time'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','announcement_type') || ($check_field('add','announcement_type') || $check_field('set','announcement_type'))" label="公告类型" name="announcement_type">
                    <uni-data-select
                  v-model="form.announcement_type"
                  :localdata="list_announcement_type"
                  :clear="!disabledObj['announcement_type_isDisabled']"
                  :disabled="disabledObj['announcement_type_isDisabled']"
                  v-if="user_group === '管理员' || (form['notification_announcement_id'] && $check_field('set','announcement_type')) || (!form['notification_announcement_id'] && $check_field('add','announcement_type'))"
                                  ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','announcement_type')">
                  {{ form['announcement_type'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','announcement_content') || ($check_field('add','announcement_content') || $check_field('set','announcement_content'))" label="公告内容" name="announcement_content">
                    <uni-easyinput type="textarea" v-model="form['announcement_content']" v-if="user_group === '管理员' || (form['notification_announcement_id'] && $check_field('set','announcement_content')) || (!form['notification_announcement_id'] && $check_field('add','announcement_content'))" :disabled="disabledObj['announcement_content_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','announcement_content')">
                  {{ form['announcement_content'] }}
                </text>
                  </uni-forms-item>


            </uni-forms>
            <view class="form_button" v-if="$check_action('/notification_announcement/view','set') || ($check_action('/notification_announcement/view','add') || $check_option('/notification_announcement/table','examine'))">
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
      field: "notification_announcement_id",
      url_add: "~/api/notification_announcement/add?",
      url_set: "~/api/notification_announcement/set?",
      url_get_obj: "~/api/notification_announcement/get_obj?",
      url_upload: "~/api/notification_announcement/upload?"
	  ,announcement_title: null
	  ,publisher: null
	  ,release_time: null
	  ,announcement_type: null
	  ,announcement_content: null
      ,query: {
        "notification_announcement_id": 0,
      },

      form: {
            "announcement_title":  '', // 公告标题
                    "publisher":  '', // 发布人
                    "release_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
                    "announcement_type":  '', // 公告类型
                    "announcement_content":  '', // 公告内容
                                    "notification_announcement_id": 0, // ID
                
              },
          disabledObj:{
                        "announcement_title_isDisabled": false,
                                "publisher_isDisabled": false,
                                "release_time_isDisabled": false,
                                "announcement_type_isDisabled": false,
                                "announcement_content_isDisabled": false,
                                  },
                                                                                              // 公告类型选项列表
          list_announcement_type: [],
                                                              }
  },
  methods: {
    /**
     * 提交前验证事件
     * @param {Object} 请求参数
     * @return {String} 验证成功返回null, 失败返回错误提示
     */
    submit_check(param) {
                                          if (!param.release_time){
        return "发布时间不能为空";
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
				url: getApp().globalData.host + '/api/notification_announcement/upload', //仅为示例，非真实的接口地址
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
					if (type == 'announcement_title') this['announcement_title'] = this.form['announcement_title'] = ""
					if (type == 'publisher') this['publisher'] = this.form['publisher'] = ""
					if (type == 'release_time') this['release_time'] = this.form['release_time'] = ""
					if (type == 'announcement_type') this['announcement_type'] = this.form['announcement_type'] = ""
					if (type == 'announcement_content') this['announcement_content'] = this.form['announcement_content'] = ""
			}
	,submit_() {
					if (this['announcement_title'] !== null) this.form['announcement_title'] = this['announcement_title']
					if (this['publisher'] !== null) this.form['publisher'] = this['publisher']
					if (this['release_time'] !== null) this.form['release_time'] = this['release_time']
					if (this['announcement_type'] !== null) this.form['announcement_type'] = this['announcement_type']
					if (this['announcement_content'] !== null) this.form['announcement_content'] = this['announcement_content']
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
            url: _self.$fullUrl('/api/notification_announcement/upload?'),
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
            url: _self.$fullUrl('/api/notification_announcement/upload?'),
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
                          if (this.form["release_time"] && JSON.stringify(this.form["release_time"]).indexOf("-")===-1) {
        this.form["release_time"] = this.$toTime(parseInt(this.form["release_time"]), "yyyy-MM-dd hh:mm:ss")
      }
                              uni.db.del("form");
      return param;
    },
        
            
            
            /**
     * 获取公告类型列表
     */
    async get_list_announcement_type() {
                          var json = await this.$get("~/api/classification_information/get_list?");
          if(json.result && json.result.list){
            json.result.list.map((o) => this.list_announcement_type.push({value:o.classification_categories,text:o.classification_categories}));
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
                                  if (this.form["release_time"] && JSON.stringify(this.form["release_time"]).indexOf("-")===-1) {
        this.form["release_time"] = this.$toTime(parseInt(this.form["release_time"]), "yyyy-MM-dd hh:mm:ss")
      }
                                        },

    is_view(){
      var bl = this.user_group == "管理员";

      if(!bl){
        bl = this.$check_action('/notification_announcement/table','add');
        console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
      }
      if(!bl){
        bl = this.$check_action('/notification_announcement/table','set');
        console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
      }
      if(!bl){
        bl = this.$check_action('/notification_announcement/view','add');
        console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
      }
      if(!bl){
        bl = this.$check_action('/notification_announcement/view','set');
        console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
      }
      if(!bl){
        bl = this.$check_action('/notification_announcement/view','get');
        console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
      }

      console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

      return bl;
    },

  },
  created() {
                                this.get_list_announcement_type();
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
