//必须写在store里面，只在服务端执行
//在登录页面执行登录方法成功后，在cookie中set了token这个属性，所以如果是通过了登录
//则会在cookie中存有token，刷新首屏时，需要将token取回来并放到状态（store)中
export const actions = {
  nuxtServerInit({ commit }, { app }) {
    // nuxt-universal-cookie用法如下
    // app是server服务器实例也就是koa实例
    //此处的token命名与api.js中login方法里的ctx.cookies.set('token', token)对应
    const token = app.$cookies.get("token");
    // 表名是登录用户
    if (token) {
      console.log("nuxtServerInit: token:"+token);
      commit("user/init", token);
    }
  }
};