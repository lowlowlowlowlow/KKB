import Vue from 'vue'
import Vuex from 'vuex'
import {RootState} from '@/types'
import {user} from './user'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  state: {
    counter: 0,
  },
  getters: {
    doubleCounter(state) {
      // state.counter
      return state.counter * 2
    }
  },
  mutations: {
    add(state) {
      state.counter++
      // this.state
    }
  },
  actions: {
    add({ commit, dispatch }) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  modules: {
    user
  }
})
