<template>
  <el-main class="bg table_wrap">
    <el-form label-position="right" :model="query" class="form p_4" label-width="120">
      <el-row class="rows row1">

          
                                                              <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="订单号">
                                                      <el-input v-model="query.order_number"></el-input>
                                                </el-form-item>
                    </el-col>
                                                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="商品名称">
                                                      <el-input v-model="query.product_name"></el-input>
                                                </el-form-item>
                    </el-col>
                                                                                                                                                                                                                                                                                                                                                                    <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
            <el-form-item label="支付状态">
              <el-select v-model="query.pay_state">
                <el-option value="">全部</el-option>
                <el-option value="未支付">未支付</el-option>
                <el-option value="已支付">已支付</el-option>
              </el-select>
            </el-form-item>
          </el-col>
              </el-row>
      <el-row class="rows row2">
      	<el-col :xs="24" :sm="24" :lg="24" class="search_btn_wrap search_btns">
         <el-col :xs="24" :sm="10" :lg="8" class="search_btn_1 search_btn_wrap_1 btns">
                              <el-button type="primary" @click="search()" class="search_btn_find">查询</el-button>
                <el-button @click="reset()" style="margin-right: 74px;" class="search_btn_reset">重置</el-button>
                                                     
            <el-button v-if="user_group == '管理员' || $check_action('/i_want_to_customize/table','add') || $check_action('/i_want_to_customize/view','add')" @click="$router.push('./view?')" class="add">添加</el-button>
						
            <el-button v-if="user_group == '管理员' || $check_action('/i_want_to_customize/table','del') || $check_action('/i_want_to_customize/view','del')" class="search_btn_del" type="danger" @click="delInfo()">删除</el-button>
                        </el-col>
       
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="list" @selection-change="selectionChange" @sort-change="$sortChange" style="width: 100%" id="dataTable">
                <el-table-column fixed type="selection" tooltip-effect="dark" width="55">
            </el-table-column>
                                                  <el-table-column prop="order_number" @sort-change="$sortChange" label="订单号"
                               v-if="user_group == '管理员' || $check_field('get','order_number')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="product_number" @sort-change="$sortChange" label="商品编号"
                               v-if="user_group == '管理员' || $check_field('get','product_number')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="product_name" @sort-change="$sortChange" label="商品名称"
                               v-if="user_group == '管理员' || $check_field('get','product_name')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="cover" @sort-change="$sortChange" label="封面"
                               v-if="user_group == '管理员' || $check_field('get','cover')" min-width="200">
                                      <template slot-scope="scope">
                      <el-image style="width: 100px; height: 100px" :src="$fullUrl(scope.row['cover'])"
                                :preview-src-list="[$fullUrl(scope.row['cover'])]">
                        <div slot="error" class="image-slot">
                          <img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
                        </div>
                      </el-image>
                    </template>
                                </el-table-column>
                                              <el-table-column prop="money" @sort-change="$sortChange" label="金额"
                               v-if="user_group == '管理员' || $check_field('get','money')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="seller" @sort-change="$sortChange" label="卖家"
                               v-if="user_group == '管理员' || $check_field('get','seller')" min-width="200">
                                      <template slot-scope="scope">
                      {{ get_user_seller(scope.row['seller']) }}
                    </template>
                                </el-table-column>
                                              <el-table-column prop="purchasing_users" @sort-change="$sortChange" label="购买用户"
                               v-if="user_group == '管理员' || $check_field('get','purchasing_users')" min-width="200">
                                      <template slot-scope="scope">
                      {{ get_user_purchasing_users(scope.row['purchasing_users']) }}
                    </template>
                                </el-table-column>
                                              <el-table-column prop="purchase_quantity" @sort-change="$sortChange" label="购买数量"
                               v-if="user_group == '管理员' || $check_field('get','purchase_quantity')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="total_amount" @sort-change="$sortChange" label="总金额"
                               v-if="user_group == '管理员' || $check_field('get','total_amount')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="customized_time" @sort-change="$sortChange" label="定制时间"
                               v-if="user_group == '管理员' || $check_field('get','customized_time')" min-width="200">
                                      <template slot-scope="scope">
                      {{ $toTime(scope.row["customized_time"],"yyyy-MM-dd hh:mm:ss") }}
                    </template>
                                </el-table-column>
                                              <el-table-column prop="requirement_document" @sort-change="$sortChange" label="需求文件"
                               v-if="user_group == '管理员' || $check_field('get','requirement_document')" min-width="200">
                                      <template slot-scope="scope">
                      <a :href="$fullUrl(scope.row['requirement_document'])" target="_blank" style="color: rgb(64, 158, 255);">点击下载</a>
                    </template>
                                </el-table-column>
                                              <el-table-column prop="remarks" @sort-change="$sortChange" label="备注"
                               v-if="user_group == '管理员' || $check_field('get','remarks')" min-width="200">
                                </el-table-column>
                    
        
        
                  <el-table-column label="支付状态" prop="pay_state">
          </el-table-column>

          <el-table-column label="支付类型" prop="pay_type">
          </el-table-column>
                
      <el-table-column sortable prop="create_time" label="创建时间" min-width="200">
        <template slot-scope="scope">
          {{ $toTime(scope.row["create_time"],"yyyy-MM-dd hh:mm:ss") }}
        </template>
      </el-table-column>

      <el-table-column sortable prop="update_time" label="更新时间" min-width="200">
        <template slot-scope="scope">
          {{ $toTime(scope.row["update_time"],"yyyy-MM-dd hh:mm:ss") }}
        </template>
      </el-table-column>

        
                  <el-table-column
              prop="seat"	label="座位" v-if="user_group == '管理员' || $check_field('get', 'seat')"	min-width="200">
          </el-table-column>
        
        
        
        

                <el-table-column fixed="right" label="操作" min-width="120" v-if="user_group == '管理员' || $check_action('/i_want_to_customize/table','set') || $check_action('/i_want_to_customize/view','set') || $check_action('/i_want_to_customize/view','get') || $check_action('//table','add') || $check_action('//view','add')" >
        

      <template slot-scope="scope">
        <router-link class="el-button el-button--small is-plain el-button--success" style="margin: 5px !important;"
                     v-if="user_group == '管理员' || $check_action('/i_want_to_customize/table','set') || $check_action('/i_want_to_customize/view','set') || $check_action('/i_want_to_customize/view','get')"
                                 :to="'./view?' + field + '=' + scope.row[field]"
                                 size="small">
          <span>详情</span>
        </router-link>
                                <el-button class="el-button el-button--small is-plain el-button--default" style="margin: 5px !important;" size="small" @click="openPayModal(scope.row)" v-if="scope.row.pay_state==='未支付' && (user_group == '管理员' || $check_pay('/i_want_to_customize/table'))">
              <span>支付</span>
            </el-button>
                                              </template>
    </el-table-column>

    </el-table>

    <!-- 分页器 -->
    <div class="mt text_center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="query.page" :page-sizes="[7, 10, 30, 100]" :page-size="query.size"
                     layout="total, sizes, prev, pager, next, jumper" :total="count">
      </el-pagination>
    </div>
    <!-- /分页器 -->

                                                                                                                                                                                                                    <el-dialog
            title="支付"
            :visible.sync="payModalVisible"
            width="500px"
        >
          <el-tabs v-model="pay_obj.payActiveName" :stretch="true">
            <el-tab-pane label="微信" name="微信">
              <div style="width: 80%;margin: 0 auto;">
                <div style="width: 60%;margin: 30px auto;">
                  <el-image style="width: 100%;" :src="$fullUrl('/img/wx.png')"
                            :preview-src-list="[$fullUrl('/img/wx.png')]">
                    <div slot="error" class="image-slot">
                      <img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
                    </div>
                  </el-image>
                </div>
                <div style="width: 80%;margin: 0 auto;">
                  <div style="width: 100%;background-color: #409EFF;color: white;font-size: 14px;text-align: center;line-height: 40px;cursor: pointer" @click="submitPay()">确认支付</div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="支付宝" name="支付宝">
              <div style="width: 80%;margin: 0 auto;">
                <div style="width: 60%;margin: 30px auto;">
                  <el-image style="width: 100%;" :src="$fullUrl('/img/aplipay.png')"
                            :preview-src-list="[$fullUrl('/img/aplipay.png')]">
                    <div slot="error" class="image-slot">
                      <img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
                    </div>
                  </el-image>
                </div>
                <div style="width: 80%;margin: 0 auto;">
                  <div style="width: 100%;background-color: #409EFF;color: white;font-size: 14px;text-align: center;line-height: 40px;cursor: pointer" @click="submitPay()">确认支付</div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="网银" name="网银">
              <div style="width: 80%;margin: 0 auto;margin-top: 30px;">
                <div style="width: 80%;margin: 0 auto;">
                  <div style="line-height: 40px">请输入网银账号：</div>
                </div>
                <div style="width: 80%;margin: 0 auto;">
                  <el-input v-model="pay_obj.account" placeholder="请输入网银账号"></el-input>
                </div>
              </div>
              <div style="width: 80%;margin: 0 auto;margin-top: 20px;">
                <div style="width: 80%;margin: 0 auto;">
                  <div style="line-height: 40px">请输入支付密码，6位数字：</div>
                </div>
                <div style="width: 80%;margin: 0 auto;">
                  <el-input placeholder="请输入密码" v-model="pay_obj.password" show-password maxlength="6"></el-input>
                </div>
              </div>
              <div style="width: 80%;margin: 0 auto;margin-top: 40px;">
                <div style="width: 100%;background-color: #409EFF;color: white;font-size: 14px;text-align: center;line-height: 40px;cursor: pointer" @click="submitPay()">确认支付</div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-dialog>
            
    <div class="modal_wrap" v-if="showModal">
      <div class="modal_box">
        <!-- <div class="modal_box_close" @click="closeModal">X</div> -->
        <p class="modal_box_title">重要提醒</p>
        <p class="modal_box_text">当前有数据达到预警值！</p>
        <div class="btn_box">
          <span @click="closeModal">取消</span>
          <span @click="closeModal">确定</span>
        </div>
      </div>
    </div>


  </el-main>
</template>
<script>
  import mixin from "@/mixins/page.js";
  
  export default {
    mixins: [mixin],
    data() {
      return {
        // 弹框
        showModal: false,
        // 获取数据地址
        url_get_list: "~/api/i_want_to_customize/get_list?like=0",
        url_del: "~/api/i_want_to_customize/del?",

        // 字段ID
        field: "i_want_to_customize_id",

        // 查询
        query: {
          "size": 7,
          "page": 1,
                                                                      "order_number": "",
                                                                                                                                      "product_name": "",
                                                                                                                                                                                                                                                                                                                                          "pay_state":"",
                                "login_time": "",
          "create_time": "",
          "orderby": `create_time desc`
        },

                  // 数据
        list: [],
                      payModalVisible:false,
            pay_obj:{
              payActiveName:"微信",
              account:"",
              password:"",
              id:""
            },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              // 用户列表
                list_user_seller: [],
                                                                                      // 用户列表
                list_user_purchasing_users: [],
                                                                                                                                                                                                                            }
    },
    methods: {
      // 关闭弹框
      closeModal(){
        this.showModal = false;
      },
                
                  get_list_before(param){
            var user_group = this.$store.state.user.user_group;
            if(user_group != "管理员"){
                                  let sqlwhere = "(";
                                                                                                                                                                                                                                                                                                  if(user_group=="商城卖家"){
                            sqlwhere+= "seller = " + this.$store.state.user.user_id + " or ";
                          }
                                                                                              if(user_group=="注册用户"){
                            sqlwhere+= "purchasing_users = " + this.$store.state.user.user_id + " or ";
                          }
                                                                                                                                                                                                                                                                                          if (sqlwhere.length>1){
                    sqlwhere = sqlwhere.substr(0,sqlwhere.length-4);
                    sqlwhere += ")";
                    param["sqlwhere"] = sqlwhere;
                  }
                            }
            return param;
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

              get_user_seller(id){
                var obj = this.list_user_seller.getObj({"user_id":id});
                var ret = "";
                if(obj){
                  ret = obj.nickname+"-"+obj.username;
                  // if(obj.nickname){
                  // 	ret = obj.nickname;
                  // }
                  // else{
                  // 	ret = obj.username;
                  // }
                }
                return ret;
              },
                                                          /**
               * 获取注册用户用户列表
               */
              async get_list_user_purchasing_users() {
                var json = await this.$get("~/api/user/get_list?user_group=注册用户");
                if(json.result && json.result.list){
                  this.list_user_purchasing_users = json.result.list;
                }
                else if(json.error){
                  console.error(json.error);
                }
              },

              get_user_purchasing_users(id){
                var obj = this.list_user_purchasing_users.getObj({"user_id":id});
                var ret = "";
                if(obj){
                  ret = obj.nickname+"-"+obj.username;
                  // if(obj.nickname){
                  // 	ret = obj.nickname;
                  // }
                  // else{
                  // 	ret = obj.username;
                  // }
                }
                return ret;
              },
                                                                                                                                                                                                                  openPayModal(v){
            this.pay_obj.id = v.i_want_to_customize_id
            this.payModalVisible = true
          },
          submitPay(){
            let _this = this;
            let url = this.$toUrl(this.query, "~/api/i_want_to_customize/set?i_want_to_customize_id="+this.pay_obj.id);
            let param = {"pay_state":"已支付","pay_type":this.pay_obj.payActiveName}
            this.$post(url, param, function(json, status) {
              console.log("提交结果：" ,json);
              if (json.result) {
                _this.$toast('支付成功！', 'success');
                _this.payModalVisible = false;
                _this.get_list();
              } else if (json.error) {
                _this.$toast(json.error.message, 'danger');
              }
            });
          },
                              deleteRow(index, rows) {
        rows.splice(index, 1);
      }

    },
    created() {
                                                                                                                                                                                                                                      this.get_list_user_seller();
                                                                          this.get_list_user_purchasing_users();
                                                                                                                                                                                                }
  }
</script>

<style type="text/css">
  .bg {
    background: white;
  }

  .form.p_4 {
    padding: 1rem;
  }

  .form .el-input {
    width: initial;
  }

  .mt {
    margin-top: 1rem;
  }

  .text_center {
    text-align: center;
  }

  .float-right {
    float: right;
  }


  .modal_wrap{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    z-index: 9999999999;
  }
  .modal_wrap .modal_box{
    width: 400px;
    height: 200px;
    background: url("../../assets/modal_bg.jpg") no-repeat center;
    background-size: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -100px;
    border-radius: 10px;
  }
  .modal_wrap .modal_box .modal_box_close{
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  .modal_wrap .modal_box .modal_box_title{
    text-align: center;
    font-size: 18px;
    margin: 16px auto;
    color: #fff;
    border-bottom: 1px solid rgba(117, 116, 116,0.5);
    padding-bottom: 16px;
    width: 356px;
  }
  .modal_wrap .modal_box .modal_box_text{
    text-align: center;
    font-size: 15px;
    color: #fff;
    margin-top: 25px;
  }
  .modal_wrap .modal_box .btn_box{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 42px;
  }
  .modal_wrap .modal_box .btn_box span{
    display: inline-block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    font-size: 14px;
    cursor: pointer;
    color: #fff;
  }
  .modal_wrap .modal_box .btn_box span:nth-child(2){
    background: #409EFF;
    color: #fff;
    border-color: #409EFF;
    margin-left: 15px;
  }
</style>
