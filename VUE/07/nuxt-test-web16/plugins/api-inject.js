// 参数1上下文
// 参数2注入函数
export default ({ $axios }, inject) => {
  // 封装之后将来可用this.$login
  inject("login", user => {
    return $axios.$post("/api/login", user);
  });
};