<template>
  <div>
    <h2>用户登录</h2>
    <el-input v-model="user.username"></el-input>
    <el-input type="password" v-model="user.password"></el-input>
    <el-button @click="onLogin">登录</el-button>
  </div>
</template>

<script>
export default {
  //对login页面使用blank的布局
  layout: "blank",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    onLogin() {
      this.$store.dispatch("user/login", this.user).then(ok => {
        // 登录成功重定向
        if (ok) {
          const redirect = this.$route.query.redirect || "/";
          this.$router.push(redirect);
          //此时存在token，执行中间件时则不会再跳转到登录页面
        }
      });
    }
  }
};
</script>