/* eslint-disable*/
// 保存构造函数引用，避免import
let Vue;

class Store {
  constructor(options) {
    // this.$options = options;
    this._mutations = options.mutations;
    this._actions = options.actions;
    //获取用户传入的getters数据
    this.getGetters=options.getters;

    const computed={}

    //store中暴露给用户的getters
    this.getters={}
    const store=this
    Object.keys(this.getGetters).forEach(key=>{
      //获取key对应的函数
      const fn=store.getGetters[key]

      //由于computed接收的是无参数的函数，所以要对fn进行更深一层封装
      //返回一个不需传入参数的函数
      //此时的computed是一个对象{}，没有key，所以在下面this._vm中是
      //data:{},
      //{doubleCounter:0}        (computed)
      
      computed[key]=function(){
        return fn(store.state)
      }

      //将暴露的getters的key对应的函数设置为只读模式
      Object.defineProperty(store.getters,key,{
        get:()=>{
          //console.log('vm',store._vm)
          //由于在下面this._vm中,computed是
          //data:{},
          //{doubleCounter:0}        (computed)
          //所以可以直接用store._vm[key]获取对应函数
          return store._vm[key]
        }
      })
    })
    // 响应化处理state
    // this.state = new Vue({
    //   data: options.state
    // })
    this._vm = new Vue({
      data: {
        // 加两个$，Vue不做代理
        $$state: options.state
      },
      computed
    })

    // 绑定commit、dispatch的上下文问store实例
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  // 存取器， store.state
  get state() {
    console.log(this._vm);
    
    return this._vm._data.$$state
  }

  set state(v) {
    console.error('你造吗？你这样不好！');
    
  }

  // store.commit('add', 1)
  // type: mutation的类型
  // payload：载荷，是参数
  commit(type, payload) {
    const entry = this._mutations[type]
    if (entry) {
      entry(this.state, payload)
    }
  }

  dispatch(type, payload) {
    const entry = this._actions[type]
    if (entry) {
      entry(this, payload)
    }
  }

}

function install(_Vue) {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })

}

// Vuex
export default {
  Store,
  install
}