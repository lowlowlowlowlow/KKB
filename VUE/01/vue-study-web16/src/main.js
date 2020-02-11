import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import create from './utils/create'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()
//封装$notice之前的写法
//Vue.prototype.$create = create

//封装$notice后的写法，由于在create.js中export的是一个install方法，所以用use去使用
Vue.use(create)
new Vue({
  render: h => h(App),
}).$mount('#app')
