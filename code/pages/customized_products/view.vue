<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','product_number') || ($check_field('add','product_number') || $check_field('set','product_number'))" label="商品编号" name="product_number">
                            <uni-easyinput type="text" v-model="form['product_number']" v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','product_number')) || (!form['customized_products_id'] && $check_field('add','product_number'))"  :disabled="true" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','product_number')">
                  {{ form['product_number'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','product_name') || ($check_field('add','product_name') || $check_field('set','product_name'))" label="商品名称" name="product_name">
                            <uni-easyinput type="text" v-model="form['product_name']" v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','product_name')) || (!form['customized_products_id'] && $check_field('add','product_name'))" :disabled="disabledObj['product_name_isDisabled']" />
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
                            <uni-easyinput type="text" v-model="form['money']" v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','money')) || (!form['customized_products_id'] && $check_field('add','money'))" :disabled="disabledObj['money_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','money')">
                  {{ form['money'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','inventory') || ($check_field('add','inventory') || $check_field('set','inventory'))" label="库存" name="inventory">
                            <uni-easyinput type="text" v-model="form['inventory']" v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','inventory')) || (!form['customized_products_id'] && $check_field('add','inventory'))" :disabled="disabledObj['inventory_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','inventory')">
                  {{ form['inventory'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','product_category') || ($check_field('add','product_category') || $check_field('set','product_category'))" label="商品类别" name="product_category">
                    <uni-data-select
                  v-model="form.product_category"
                  :localdata="list_product_category"
                  :clear="!disabledObj['product_category_isDisabled']"
                  :disabled="disabledObj['product_category_isDisabled']"
                  v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','product_category')) || (!form['customized_products_id'] && $check_field('add','product_category'))"
                                  ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','product_category')">
                  {{ form['product_category'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','audio_frequency') || ($check_field('add','audio_frequency') || $check_field('set','audio_frequency'))" label="音频" name="audio_frequency">
                    <!-- 查询权限 -->
                <view class="diy_field diy_audio" v-if="$check_field('get','audio_frequency') && form['audio_frequency']">
				<view class="close_"@click="close_('audio_frequency')">x</view>
					<video
							style="text-align: left"
							:src="$fullUrl(form['audio_frequency'])"
							controls
					></video>
				</view>
				<button v-else-if="$check_field('add','audio_frequency') || $check_field('set','audio_frequency')" class="mini-btn" type="primary" size="mini" @click="uploadFile_('audio_frequency')">上传音频</button>
				<view class="file-url" v-if="audio_frequency">{{audio_frequency}}</view>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','video') || ($check_field('add','video') || $check_field('set','video'))" label="视频" name="video">
                    <!-- 查询权限 -->
                <view class="diy_field diy_video" v-if="$check_field('get','video') && form['video']">
				<view class="close_" @click="close_('video')">x</view>
					<video
						:src="$fullUrl(form['video'])"
						controls
					></video>
				</view>
				<button v-else-if="$check_field('add','video') || $check_field('set','video')" class="mini-btn" type="primary" size="mini" @click="uploadFile_('video')">上传视频</button>
				<view class="file-url" v-if="video">{{video}}</view>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','content') || ($check_field('add','content') || $check_field('set','content'))" label="内容" name="content">
                    <uni-easyinput type="textarea" v-model="form['content']" v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','content')) || (!form['customized_products_id'] && $check_field('add','content'))" :disabled="disabledObj['content_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','content')">
                  {{ form['content'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','seller') || ($check_field('add','seller') || $check_field('set','seller'))" label="卖家" name="seller">
                    <uni-data-select
                  id="form_seller"
                  v-model="form['seller']"
                  :localdata="list_user_seller"
                  :clear="!disabledObj['seller_isDisabled']"
                  :disabled="disabledObj['seller_isDisabled']"
                  v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','seller')) || (!form['customized_products_id'] && $check_field('add','seller'))"
                ></uni-data-select>
                <uni-data-select
                  v-model="form['seller']"
                  :localdata="list_user_seller"
                  :clear="false"
                  :disabled="true"
                  v-else-if="$check_field('get','seller')" id="seller"
                ></uni-data-select>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','classification_number') || ($check_field('add','classification_number') || $check_field('set','classification_number'))" label="分类编号" name="classification_number">
                    <uni-data-select
                  v-model="form.classification_number"
                  :localdata="list_classification_number"
                  :clear="!disabledObj['classification_number_isDisabled']"
                  :disabled="disabledObj['classification_number_isDisabled']"
                  v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','classification_number')) || (!form['customized_products_id'] && $check_field('add','classification_number'))"
                  @change="select_classification_number_field"                ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','classification_number')">
                  {{ form['classification_number'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','classification_categories') || ($check_field('add','classification_categories') || $check_field('set','classification_categories'))" label="分类类别" name="classification_categories">
                    <uni-easyinput type="text" v-model="form['classification_categories']" v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','classification_categories')) || (!form['customized_products_id'] && $check_field('add','classification_categories'))" :disabled="true" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','classification_categories')">
                  {{ form['classification_categories'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','details') || ($check_field('add','details') || $check_field('set','details'))" label="详情" name="details">
                    <uni-easyinput type="textarea" v-model="form['details']" v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','details')) || (!form['customized_products_id'] && $check_field('add','details'))" :disabled="disabledObj['details_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','details')">
                  {{ form['details'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item label="审核状态" name="examine_state">
                <uni-data-select
                    v-model="form['examine_state']"
                    :localdata="list_examine_state"
                    v-if="user_group === '管理员' || (form['examine_state'] && $check_examine()) || (!form['examine_state'] && $check_examine())"
                ></uni-data-select>
                <text v-else>{{form["examine_state"]}}</text>
              </uni-forms-item>
              <uni-forms-item label="审核回复" name="examine_reply">
                <uni-easyinput type="text" placeholder="请输入审核回复" v-model="form['examine_reply']"
                               v-if="user_group === '管理员' || (form['examine_reply'] && $check_examine()) || (!form['examine_reply'] && $check_examine())" />
                <!-- 仅查看 -->
                <text v-else>{{form["examine_reply"]}}</text>
              </uni-forms-item>

              <uni-forms-item label="计时器标题" name="timer_title">
                <uni-easyinput v-if="user_group === '管理员' || (form['customized_products_id'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id'] && $check_action('/customized_products/view','add'))" v-model="form['timer_title']" type="text" :disabled="disabledObj['timer_title_isDisabled']" />
                <text v-else-if="$check_field('get','timer_title')">
                  {{ form['timer_title'] }}
                </text>
              </uni-forms-item>
              <uni-forms-item label="计时开始时间" name="timing_start_time">
                <uni-datetime-picker v-if="user_group === '管理员' || (form['customized_products_id'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id'] && $check_action('/customized_products/view','add'))" @change="changeLog($event,'timing_start_time')" v-model="form['timing_start_time']" type="datetime" :disabled="disabledObj['timing_start_time_isDisabled']" />
                <text v-else-if="$check_field('get','timing_start_time')">
                  {{ form['timing_start_time'] }}
                </text>
              </uni-forms-item>
              <uni-forms-item label="计时结束时间" name="timing_end_time">
                <uni-datetime-picker v-if="user_group === '管理员' || (form['customized_products_id'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id'] && $check_action('/customized_products/view','add'))" @change="changeLog($event,'timing_end_time')" v-model="form['timing_end_time']" type="datetime" :disabled="disabledObj['timing_end_time_isDisabled']" />
                <text v-else-if="$check_field('get','timing_end_time')">
                  {{ form['timing_end_time'] }}
                </text>
              </uni-forms-item>
              <uni-forms-item label="当前位置" name="location_address">
                <uni-easyinput type="text" placeholder="当前位置":disabled="true" v-model="form['location_address']" />
                <button size="mini" @click="getLongitudeLatitude()">定位</button>
              </uni-forms-item>
              <uni-forms-item label="限制次数" name="limit_times">
                <uni-easyinput v-if="user_group === '管理员' || (form['customized_products_id'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id'] && $check_action('/customized_products/view','add'))" v-model="form['limit_times']" type="number" :disabled="disabledObj['limit_times_isDisabled']" />
                <text v-else-if="$check_action('/customized_products/view','get')">
                  {{ form['limit_times'] }}
                </text>
              </uni-forms-item>
         <uni-forms-item label="二维码图片" name="qrcode_img">
                <!-- 修改权限 -->
                <view
                  class="diy_field diy_img"
                  v-if="form['qrcode_img'] && (user_group === '管理员' || (form['customized_products_id'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id'] && $check_action('/customized_products/view','add')))"
                >
                  <image
                    v-if="disabledObj['qrcode_img_isDisabled']"
                    :src="$fullUrl(form['qrcode_img'])"
                  />
                  <image
                    v-if="!disabledObj['qrcode_img_isDisabled']"
                    :src="$fullUrl(form['qrcode_img'])"
                    @click="change_img('qrcode_img')"
                  />
                </view>
                <!-- 添加权限 -->
                <view
                  class="diy_field diy_img"
                  v-else-if="!form['qrcode_img'] && (user_group === '管理员' || (form['customized_products_id'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id'] && $check_action('/customized_products/view','add')))"
                >
                  <view
                    v-if="disabledObj['qrcode_img_isDisabled']"
                    class="btn_add_img"
                  >
                    <text>+</text>
                  </view>
                  <view
                    v-if="!disabledObj['qrcode_img_isDisabled']"
                    class="btn_add_img"
                    @click="change_img('qrcode_img')"
                  >
                    <text>+</text>
                  </view>
                </view>
                <!-- 查询权限 -->
                <view
                  class="diy_field diy_img"
                  v-else-if="$check_action('/customized_products/view','get')"
                >
                  <image :src="$fullUrl(form['qrcode_img'])" />
                </view>
         </uni-forms-item>
       <uni-forms-item label="二维码标题" name="qrcode_title">
            <uni-easyinput  v-model="form['qrcode_title']" placeholder="请输入二维码标题"
                    v-if="user_group === '管理员' || (form['customized_products_id'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id'] && $check_action('/customized_products/view','add'))" :disabled="disabledObj['qrcode_title_isDisabled']"></uni-easyinput>
            <text v-else-if="$check_action('/customized_products/view','get')">{{form['qrcode_title']}}</text>
        </uni-forms-item>

            </uni-forms>
            <view class="form_button" v-if="$check_action('/customized_products/view','set') || ($check_action('/customized_products/view','add') || $check_option('/customized_products/table','examine'))">
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
      field: "customized_products_id",
      url_add: "~/api/customized_products/add?",
      url_set: "~/api/customized_products/set?",
      url_get_obj: "~/api/customized_products/get_obj?",
      url_upload: "~/api/customized_products/upload?"
	  ,product_number: null
	  ,product_name: null
	  ,cover: null
	  ,money: null
	  ,inventory: null
	  ,product_category: null
	  ,audio_frequency: null
	  ,video: null
	  ,content: null
	  ,seller: null
	  ,classification_number: null
	  ,classification_categories: null
	  ,details: null
      ,query: {
        "customized_products_id": 0,
      },

      form: {
            "product_number": this.$get_stamp(), // 商品编号
                    "product_name":  '', // 商品名称
                    "cover":  '', // 封面
                    "money":  0 , // 金额
                    "inventory":  0 , // 库存
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
                "timer_title":'', // 计时器标题
            "timing_start_time":'', // 计时开始时间
            "timing_end_time":'', // 计时结束时间
                    "limit_times": "", // 限制次数
                    "limit_type":2,
                                "qrcode_img":'', // 图片
            "qrcode_title":'', // 二维码标题
    
                "location_address": "", // 定位地址
            "location_lng": "", // 定位地址经度
            "location_lat": "", // 定位地址纬度
              },
          disabledObj:{
                        "product_number_isDisabled": false,
                                "product_name_isDisabled": false,
                                "cover_isDisabled": false,
                                                                        "product_category_isDisabled": false,
                                "audio_frequency_isDisabled": false,
                                "video_isDisabled": false,
                                "content_isDisabled": false,
                                "seller_isDisabled": false,
                                "classification_number_isDisabled": false,
                                "classification_categories_isDisabled": false,
                                "details_isDisabled": false,
                            "timer_title_isDisabled": false, // 计时器标题
            "timing_start_time_isDisabled": false, // 计时开始时间
            "timing_end_time_isDisabled": false, // 计时结束时间
                    "limit_times_isDisabled": false, // 限制次数
                    "qrcode_img_isDisabled": false,
            "qrcode_title_isDisabled": false,
              },
                                                                                                                                      // 商品类别选项列表
          list_product_category: [],
                                                                                                            // 用户列表
            list_user_seller: [],
                        // 用户组
            group_user_seller: "",
                                                      // 分类编号选项列表
          list_classification_number: [],
                                                                                list_examine_state:[{value:"未审核",text:"未审核"},{value:"已通过",text:"已通过"},{value:"未通过",text:"未通过"}],
                  }
  },
  methods: {
    /**
     * 提交前验证事件
     * @param {Object} 请求参数
     * @return {String} 验证成功返回null, 失败返回错误提示
     */
    submit_check(param) {
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
				url: getApp().globalData.host + '/api/customized_products/upload', //仅为示例，非真实的接口地址
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
					if (type == 'product_number') this['product_number'] = this.form['product_number'] = ""
					if (type == 'product_name') this['product_name'] = this.form['product_name'] = ""
					if (type == 'cover') this['cover'] = this.form['cover'] = ""
					if (type == 'money') this['money'] = this.form['money'] = ""
					if (type == 'inventory') this['inventory'] = this.form['inventory'] = ""
					if (type == 'product_category') this['product_category'] = this.form['product_category'] = ""
					if (type == 'audio_frequency') this['audio_frequency'] = this.form['audio_frequency'] = ""
					if (type == 'video') this['video'] = this.form['video'] = ""
					if (type == 'content') this['content'] = this.form['content'] = ""
					if (type == 'seller') this['seller'] = this.form['seller'] = ""
					if (type == 'classification_number') this['classification_number'] = this.form['classification_number'] = ""
					if (type == 'classification_categories') this['classification_categories'] = this.form['classification_categories'] = ""
					if (type == 'details') this['details'] = this.form['details'] = ""
			}
	,submit_() {
					if (this['product_number'] !== null) this.form['product_number'] = this['product_number']
					if (this['product_name'] !== null) this.form['product_name'] = this['product_name']
					if (this['cover'] !== null) this.form['cover'] = this['cover']
					if (this['money'] !== null) this.form['money'] = this['money']
					if (this['inventory'] !== null) this.form['inventory'] = this['inventory']
					if (this['product_category'] !== null) this.form['product_category'] = this['product_category']
					if (this['audio_frequency'] !== null) this.form['audio_frequency'] = this['audio_frequency']
					if (this['video'] !== null) this.form['video'] = this['video']
					if (this['content'] !== null) this.form['content'] = this['content']
					if (this['seller'] !== null) this.form['seller'] = this['seller']
					if (this['classification_number'] !== null) this.form['classification_number'] = this['classification_number']
					if (this['classification_categories'] !== null) this.form['classification_categories'] = this['classification_categories']
					if (this['details'] !== null) this.form['details'] = this['details']
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
            url: _self.$fullUrl('/api/customized_products/upload?'),
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
            url: _self.$fullUrl('/api/customized_products/upload?'),
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
                                                                                                              uni.db.del("form");
      return param;
    },
        
            
            
            
            
            /**
     * 获取商品类别列表
     */
    async get_list_product_category() {
                          var json = await this.$get("~/api/classification_information/get_list?");
          if(json.result && json.result.list){
            json.result.list.map((o) => this.list_product_category.push({value:o.classification_categories,text:o.classification_categories}));
          }
          else if(json.error){
            console.error(json.error);
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
     * 获取商城卖家用户组
     */
    async get_group_user_seller() {
      this.form["seller"] = this.user.user_id;
      var json = await this.$get("~/api/user_group/get_obj?name=商城卖家");
      if(json.result && json.result.obj){
        this.group_user_seller = json.result.obj;
        this.get_user_session_seller(this.form['seller'])
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
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func){
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
    getLongitudeLatitude() {
        let _this = this;
        _this.form.location_address = "广东省深圳市南山区科技园";
        _this.form.location_lng = "113.946782";
        _this.form.location_lat = "22.556481";
        uni.getLocation({
            type: 'gcj02',
            success: function (res) {
                let lat = res.latitude //当前位置的纬度
                let lng = res.longitude //当前位置精度
                let location=lng+","+lat;
                let url = "http://restapi.amap.com/v3/geocode/regeo?key=b6eb2819a6ba4c5119591614272fe7ca&location="+location;
                uni.request({url, method: "GET",dataType: "json",
                    success: function (res) {
                        if (res.statusCode===200){
                            let data = res.data;
                            if (data.status==='1'){
                                _this.form.location_address = data.regeocode.formatted_address;
                                _this.form.location_lng = JSON.stringify(lng);
                                _this.form.location_lat = JSON.stringify(lat);
                            }else {
                                console.log(data.info)
                            }
                        }
                    },error: function (err) {
                    console.log(err);
                    }
                })
            },error: function (err) {
                console.log(err);
            }
        })
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
