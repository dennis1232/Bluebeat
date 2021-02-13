import vue from 'vue'
import vuex from 'vuex'
import { beatStore } from './beatStore.js'
import { userStore } from './userStore.js'
import vueYoutube from 'vue-youtube'

vue.use(vueYoutube)
vue.use(vuex)

export default new vuex.Store({
  strict: true,
  state: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {
    beatStore,
    userStore
  }
})


