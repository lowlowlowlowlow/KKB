//公共入口，entry-server\client-server都会执行
import Vue from 'vue'
import App from './App.vue'

import { createRouter } from './router/index';
import { createStore } from './store/index';

//适用于客户端数据预取的情况
//服务器端在entry-server中处理
//确保客户端每个组件如果有asyncData，都要执行）
//此时从entry-server中返回的$options中检查
//也可以写在entry-client.js中，必须是不影响首屏加载的地方（也就是可以操作客户端的位置而非服务端的位置）
//在Vue中加入mixin则说明此Vue实例中的所有组件都会调用这个beforeMount的方法
Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options;
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route,
      });
    }
  },
});

// 返回工厂函数，每次请求创建一个Vue实例
export function createApp(context) {
  // 1.创建路由器实例\vuex
  const router = createRouter()
  const store = createStore()

  // 2.创建Vue实例（传递了router\store\context三个参数）
  const app = new Vue({
    router,
    store,
    context, // 上下文用于给渲染器传递参数
    render: h => h(App)
  })
  
  return {app, router, store }
}
