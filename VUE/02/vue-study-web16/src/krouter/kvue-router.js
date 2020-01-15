import Link from './krouter-link'
import View from './krouter-view'

let Vue;

// 1.实现一个插件：挂载$router

class KVueRouter {
  constructor(options) {
    this.$options = options
    console.log(this.$options);
    
    //const routes=options.$router

    // 需要创建响应式的current属性
    // 利用Vue提供的defineReactive做响应化
    // 这样将来current变化的时候，依赖的组件会重新render
    //Vue.util.defineReactive(this, 'current', '/')
    this.current=window.location.hash.slice(1) || '/'


    //多重路由的时候，需要响应化一个路由表
    Vue.util.defineReactive(this,'matchedList',[])

    this.match();

    // this.app = new Vue({
    //   data() {
    //     return {
    //       current: '/'
    //     }
    //   }
    // })
    
    // 监控url变化
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))


    // 创建一个路由映射表
    this.routeMap = {}
    options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
  }

  onHashChange() {
    console.log(window.location.hash);

    this.current = window.location.hash.slice(1)

    //多重路由的时候，路由发生变化需要清空路由表
    this.matchedList=[]
    this.match()
  }
  //制作路由表
  match(routes){
    //不传入的时候，下边默认循环所有在router上的路由
    //有传入的话，则从该级路由开始向下循环找
    let thisRoutes=routes || this.$options.routes

    // routes.forEach(aRoute=>{
    //   if(aRoute.path==='/' && this.current ==='/'){
    //       this.matchedList.push(aRoute)
    //   }

    //   if(aRoute.path!=='/' && this.current.indexOf(aRoute.path)>-1){
    //     this.matchedList.push(aRoute)
    //     if(aRoute.children){

    //       this.match(aRoute.children)
          
    //     }
    //     return
    //   }
    // })

    for(const aRoute of thisRoutes){
      //为首页时
        if(aRoute.path==='/' && this.current ==='/'){
          this.matchedList.push(aRoute)
          return 
      }

      //非首页时
      if(aRoute.path!=='/' && this.current.indexOf(aRoute.path)>-1){
        this.matchedList.push(aRoute)
        //非首页且存在子路由时
        if(aRoute.children){

          //调用自身
          this.match(aRoute.children)
          
        }
        return
      }
      console.log('matchlist',this.matchedList)
    }
  }
}

KVueRouter.install = function (_Vue) {
  // 保存构造函数，在KVueRouter里面使用
  Vue = _Vue;

  // 挂载$router
  // 怎么获取根实例中的router选项
  Vue.mixin({
    beforeCreate() {
      // 确保根实例的时候才执行
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }

    }
  })


  // 任务2：实现两个全局组件router-link和router-view
  Vue.component('router-link', Link)
  Vue.component('router-view', View)
}

export default KVueRouter