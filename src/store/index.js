import Vue from 'vue'
import Vuex from 'vuex'
import locate from './modules/locate'
import user from './modules/user'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    locate,
    user
  }
  // state: {
  //   locate: {}
  // },
  // mutations: {
  //   setLocation (state, status) {
  //     localStorage.setItem('location', JSON.stringify(status))
  //     state.locate = status
  //     console.log(11111, state)
  //  }
  // }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
