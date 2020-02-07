// 客户端也需要创建vue实例
// 浏览器端运行
// 调用时刻是服务端返回的一堆js中就包含了entry-client，在页面渲染的同时，在前端执行这堆js，
//执行完entry-client（main.js和entry-client.js都加上了defer,证明是相比其他js延迟加载）之后就可以进行交互
import { createApp } from './main';

const {app, router, store} = createApp()

// 判断是否存在state，则需要做初始化
if (window.__INITIAL_STATE__) {
  //还原store状态，数据从后台到达了前端
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  // 挂载激活，hydrating默认为true
  app.$mount('#app')
})