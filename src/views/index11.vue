<template>
  <div class="page_root" id="root_demo">
    <div class="warp banner">
      <div class="container swiper_box">
        <div class="row">
          <div class="col-12">
            <div class="sw_no">
              <!-- 轮播图组件 -->
              <div class="swiper_img">
                <swiper_img :list="list_slide" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixins/page.js";
import swiper_img from "@/components/diy/swiper_img.vue";

export default {
  mixins: [mixin],
  components: {
    swiper_img
  },
  data() {
    return {
      token: '',
      list_slide: [],
      list_menu: []
    };
  },
  created() {
    this.get_token();
  },
  methods: {
    getHashParams() {
      let key = "token";
      // / 获取所有参数
      let query = window.location.search.substring(1);
      let hash = window.location.hash.substring(1);
      // 如果锚点后面有参数，把锚点后面的参数加入到search参数中
      if (hash.indexOf("?") > -1) {
        query += "&" + hash.split("?")[1];
      }
      let key_values = query.split("&");
      let params = {};
      // 遍历参数并存入params对象
      key_values.map(function (key_val) {
        let key_val_arr = key_val.split("=");
        params[key_val_arr[0]] = key_val_arr[1];
      });
      // 如果找到了key对应的参数，返回对应值
      if (typeof params[key] != "undefined") {
        return params[key];
      }
      // 如果没找到，返回空字符串
      return "";
    },
    get_token() {
      // let token = this.$route.query.token
      let token = this.getHashParams();
      if (token) {
        $.db.set("token", token, 120);
        let new_href = window.location.href.replaceAll(
          "?token=" + encodeURIComponent(token)
        );
        location.href = new_href;
      }
    },
    // 获取轮播图
    get_slides() {
      this.$get("~/api/slides/get_list?", {}, (json) => {
        if (json.result) {
          this.list_slide = json.result.list;
        }
      });
    },
    // 获取导航栏
    get_menu() {
      var user_group = this.user_group;
      this.$get(
        "~/api/auth/get_list?",
        {
          page: "",
          user_group,
          get: 1,
          position: "top",
        },
        (json) => {
          if (json.result) {
            this.list_menu = json.result.list;
          }
        }
      );
    }
  },
  mounted() {
    this.get_menu();
    this.get_slides();
  }
}
</script>

<style scoped>
.page_root {
  position: relative;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 10px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 8px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0);
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}

.sw_no {
  margin: 0.5rem;
  display: flex;
  flex-wrap: wrap;
}
.swiper_img {
  width: 60%;
  height: 18.75rem;
}
.title {
  float: left;
  height: 4rem;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  padding-left: 1rem;
}

.more_box {
  float: right;
  height: 4rem;
  color: white;
  font-size: 1.5rem;
  padding-right: 1rem;
}

.more_box .more {
  border-radius: 0.5rem;
  border: 0.125rem solid white;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  justify-content: center;
  height: 3rem;
  width: 3.5rem;
}

.switch {
  float: right;
  height: 4rem;
  color: white;
  padding-right: 1rem;
}

.switch_box {
  border-radius: 0.5rem;
  border: 0.125rem solid white;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  justify-content: center;
  height: 3rem;
  width: 6rem;
}

.switch_box:hover,
.more:hover {
  background-color: white;
  color: var(--color_primary) !important;
}

.overflow-auto .table th,
.overflow-auto .table td {
  text-align: center;
  text-wrap: normal;
  font-size: 1rem;
  vertical-align: middle;
}

@media (max-width: 996px) {
  .swiper_img {
    width: 100%;
    height: 12.5rem;
  }

  .card_notice {
    width: 100%;
    padding-left: 0;
  }
}
</style>
