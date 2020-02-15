import {Module} from 'vuex'
import {UserState, RootState} from '@/types'

export const user: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    name: '',
    token: ''
  },
  mutations: {
    setUser(state, {name, token}) {
      state.name = name
      state.token = token
    }
  }
}