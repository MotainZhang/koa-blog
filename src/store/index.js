import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import blog from './modules/blog'

Vue.use(Vuex)

const modules = { common, blog }

const store = new Vuex.Store({
  modules
})

export default store
