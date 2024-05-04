<template>
  <div class="page_pay" id="page_pay">
    <div class="warp">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6">
            <b-card no-body style="">
              <template #header>
                <h4 class="text-center">总支付：￥{{ query.sum_price }}</h4>
              </template>
              <div class="row">
                <div class="col">
                  <div style="width: 40%;margin: 0 auto"><img :src="pay_qrcode"></div>
                  <b-card-footer style="margin-top: 10px" class="text-center">
                    <b-button variant="outline-primary" @click="pay" block
                    >已支付</b-button
                    >
                  </b-card-footer>
                </div>
              </div>
            </b-card>
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
      query: {
        sum_price: "",
        order_number:"",
        remark:"",
        selected: ""
      },
      pay_obj:{
        payActiveName:"微信",
        account:"",
        password:"",
        id:""
      },
      pay_qrcode:"",
    };
  },

  methods: {
    async update_goods_inventory(o){
      await this.$get("~/api/goods/get_obj?", {"goods_id":o.goods_id}, (json) => {
        if (json.result && json.result.obj) {
          let inventory = {"inventory":json.result.obj.inventory-o.num};
          this.$post('~/api/goods/set?goods_id='+o.goods_id, inventory, (res) => {
            if(res.result && json.result.obj.source_table && json.result.obj.source_field && json.result.obj.source_id){
              let inventory_sub = {"cart_inventory":inventory.inventory};
              this.$post('~/api/'+json.result.obj.source_table+'/set?'+json.result.obj.source_field+'='+json.result.obj.source_id, inventory_sub, (res_sub) => {
                console.log(res_sub)
              })
            }
          })
        }
      })
    },
    pay() {
      let _this = this;
      this.$post("~/api/order/set?order_number="+_this.query.order_number,{
        state:"已付款",
        price_count: _this.query.sum_price,
        remark:_this.query.remark
      },(res)=>{
        if(res.result){
          console.log(res.result);
          this.$get("~/api/order/get_list?", {"order_number":_this.query.order_number}, (json) => {
            if (json.result && json.result.list) {
              //修改数量
              for(let i=0;i<json.result.list.length;i++){
                _this.update_goods_inventory(json.result.list[i]);
              }
            }
          })

          this.$toast("支付成功")
          const coupon_id = this.$route.query.coupon_id
          if(coupon_id !== "undefined"){
            this.$post("~/api/coupon_user/set?id=" + coupon_id,{
              is_use: 1
            })
          }
          this.$router.push("/order/list?state=已付款")
        }
      })
    },
  },
  mounted() {
    setTimeout(() => {
      let _this = this;
      this.$get("~/api/order/get_list?order_number="+this.query.order_number,{}, (json) => {
        if (json.result && json.result.list){
          if (json.result.list.length>0) {
            let goods_name = "";
            if (json.result.list.length === 1) {
              goods_name = json.result.list[0].title;
            } else {
              goods_name = json.result.list[0].title + "等多件";
            }
            this.$get("~/api/order/alipay?goods_name=" + goods_name + "&pay_money=" + this.query.sum_price, {}, (json) => {
              if (json.result) {
                this.pay_qrcode = "https://api.mhjz1.cn/qr/?size=250&text=" + json.result;
              } else if (json.error) {
                console.error(json.error);
              }
            });
          }
        }
      })
    }, 1000)
  },
};
</script>

<style scoped>
.container {
  min-height: 800px;
}
</style>
