import Vue from 'vue'
import Vuex from 'vuex'
import pages from './pages/pages';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    pages
  }
})
