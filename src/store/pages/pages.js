import actions from './actions';
import mutations from './mutations';

const state = {
  pages: [],

  activePage: null,

  activeWidget: null
};

const getters = {
  pages (state) {
    return state.pages
  },

  activePage (state) {
    return state.activePage
  },

  activeWidget (state) {
    return state.activeWidget
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
