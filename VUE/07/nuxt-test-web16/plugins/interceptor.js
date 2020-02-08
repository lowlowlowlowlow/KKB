//全局注册后，会为每一个请求都添加token
//首先解构出axios、store
export default function({ $axios, store }) {
  // onRequest是@nuxtjs/axios模块提供的帮助方法
  //修改一下config
  $axios.onRequest(config => {
    // 附加令牌
    if (store.state.user.token) {
      config.headers.Authorization = "Bearer " + store.state.user.token;
    }
    return config;
  });
}