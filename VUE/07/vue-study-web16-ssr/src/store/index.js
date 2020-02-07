import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// store工厂，给每一个用户请求创建独立状态管理
export function createStore() {
  return new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      add(state) {
        state.count += 1;
      },
      // 加一个初始化
      init(state, count) {
        state.count = count;
      },
    },
    actions: {
      // 加一个异步请求count的action
      //为说明问题，不是实际逻辑
      getCount({ commit }) {
        return new Promise(resolve => {
          setTimeout(() => {
            commit("init", Math.random() * 100);
            resolve();
          }, 1000);
        });
      },
    },
  })
}