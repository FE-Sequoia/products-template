<template>
  <el-menu
    class="side el-menu-vertical-demo"
    default-active="/"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#38f"
    :collapse="isCollapse"
    :router="true"
  >
    <span class="hide-avatar" style="display: none">
      <img :src="$fullUrl($store.state.user.avatar)" alt="avatar" />
    </span>
    <span class="hide-username" style="display: none">
      {{ $store.state.user.nickname || $store.state.user.username }}
    </span>

    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">后台首页</span>
    </el-menu-item>

    <el-submenu
      index="user"
      v-show="
        user_group == '管理员' ||
        $check_group([
          '/user/table',
          '/user_group/table',
          '/registered_users/table',
          '/mall_seller/table',
        ])
      "
    >
      <template slot="title"
        ><i class="el-icon-s-custom"></i
        ><span ref="customTemplate8">系统用户</span></template
      >
      <el-menu-item
        index="/user/table"
        v-show="user_group == '管理员'"
        @click="handleButtonClick(8)"
        ><span>管理员</span></el-menu-item
      >
      <!-- <el-menu-item
        index="/registered_users/table"
        v-show="
          user_group == '管理员' || $check_action('/registered_users/table')
        "
        @click="handleButtonClick(8)"
      >
        <span>注册用户</span></el-menu-item
      >
      <el-menu-item
        index="/mall_seller/table"
        v-show="user_group == '管理员' || $check_action('/mall_seller/table')"
        @click="handleButtonClick(8)"
      >
        <span>商城卖家</span></el-menu-item
      > -->
      <!-- <el-menu-item index="/user_group/table"><span>用户组</span></el-menu-item> -->
    </el-submenu>

    <!-- <el-submenu
      class="Cust"
      :index="index"
      v-for="(i, index) in auth"
      :key="i.auth_id"
      v-show="user_group == '管理员' || $check_action(i.path)"
    >
      <template slot="title"
        ><i class="el-icon-news"></i
        ><span>{{ i.mod_name + "管理" }}</span></template
      >
      <el-menu-item
        menu-trigger
        :index="i.path"
        :class="{ active: $route.path === i.path }"
        @click="handleButtonClick(` ${i.mod_name}管理`)"
        ><span>{{ i.page_title + "列表" }}</span></el-menu-item
      >
      <el-menu-item
        v-if="
          i.has_add &&
          (user_group == '管理员' ||
            $check_action(i.path.replace(/(.*)table/, '$1view'), 'add'))
        "
        :index="i.path.replace(/(.*)table/, '$1view')"
        :class="{ sactive: $route.path === i.path }"
        @click="handleButtonClick(` ${i.mod_name}管理`)"
      >
        <span> {{ i.page_title + "添加" }}</span>
      </el-menu-item>
    </el-submenu> -->

    <el-submenu
      index="web"
      v-show="
        user_group == '管理员' ||
        $check_group([
          '/nav/table',
          '/link/table',
          '/slides/table',
          '/ad/table',
          '/sensitive_vocabulary/table',
        ])
      "
    >
      <template slot="title"
        ><i class="el-icon-picture-outline"></i
        ><span ref="customTemplate1">系统管理</span></template
      >
      <!-- <el-menu-item
        v-show="user_group == '管理员' || $check_action('/link/table')"
        index="/link/table"
        @click="handleButtonClick(1)"
      >
        <span>友情链接</span>
      </el-menu-item> -->
      <el-menu-item
        v-show="user_group == '管理员' || $check_action('/slides/table')"
        index="/slides/table"
        @click="handleButtonClick(1)"
      >
        <span>轮播图管理</span>
      </el-menu-item>
      <!-- <el-menu-item
        v-show="user_group == '管理员' || $check_action('/ad/table')"
        index="/ad/table"
        @click="handleButtonClick(1)"
      >
        <span>广告管理</span>
      </el-menu-item>
      <el-menu-item
        v-show="
          user_group == '管理员' || $check_action('/sensitive_vocabulary/table')
        "
        index="/sensitive_vocabulary/table"
        @click="handleButtonClick(1)"
      >
        <span>敏感词管理</span>
      </el-menu-item> -->
    </el-submenu>
    
    <!-- <el-submenu index="auth" v-show="user_group == '管理员'">
      <template slot="title"
        ><i class="el-icon-s-custom"></i
        ><span ref="customTemplate9">权限管理</span></template
      >
      <el-menu-item
        index="/auth/table"
        v-show="user_group == '管理员'"
        @click="handleButtonClick(9)"
        ><span>权限列表</span></el-menu-item
      >
    </el-submenu> -->
  </el-menu>
</template>

<script>
export default {
  props: {
    isCollapse: {
      trye: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      user_group: this.$store.state.user.user_group,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },

    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleButtonClick(buttonId) {
      let lis_title;
      const templateRefs = [
        null, // 索引 0 不使用
        this.$refs.customTemplate1,
        this.$refs.customTemplate2,
        this.$refs.customTemplate3,
        this.$refs.customTemplate4,
        this.$refs.customTemplate5,
        this.$refs.customTemplate6,
        this.$refs.customTemplate7,
        this.$refs.customTemplate8,
        this.$refs.customTemplate9,
        this.$refs.customTemplate10,
      ];

      if (buttonId >= 1 && buttonId <= templateRefs.length) {
        lis_title = templateRefs[buttonId];
        sessionStorage.setItem("title-text", buttonId.toString());
      } else {
        sessionStorage.setItem("title-text", buttonId);
      }

      if (lis_title) {
        this.text = lis_title.innerText;
        console.log(this.text);
        sessionStorage.setItem("title-text", this.text);
      }
      // sessionStorage.setItem('title-text', buttonId)
    },
  },
  computed: {
    auth() {
      var tables = this.$store.state.web.auth;
      var lt = [];
      let site_list = [];
      site_list.push("i_want_to_customize");
      let list = [
        "exam",
        "article",
        "article_type",
        "comment",
        "goods",
        "order",
        "logistics_delivery",
        "forum",
        "forum_type",
        "notice",
        "message",
        "subject",
        "exam_question_database",
        "subject_exam",
        "user_answer_wrong",
      ];
      list.push("mall_center");
      list.push("registered_users");
      list.push("mall_seller");
      for (var i = 0; i < tables.length; i++) {
        var o = tables[i];
        if (o.path.indexOf("/table") !== -1) {
          if (list.indexOf(o.table_name) === -1) {
            o.has_add = site_list.indexOf(o.table_name) === -1;
            lt.push(o);
          }
        }
      }
      return lt;
    },
  },
};
</script>


<style scoped="scoped">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 16rem;
}

.side {
  float: left;
  background: #545c64;
  color: #fff;
  overflow-y: scroll;
  height: 100vh;
}
.active {
  color: #409eff !important;
}

.sactive {
  color: #fdfcfb !important;
}
.side::-webkit-scrollbar {
  display: none;
}
</style>
