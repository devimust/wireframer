import actions from './actions';
import mutations from './mutations';

const state = {
  pages: [],

  activePage: null,

  activeWidget: null,

  canvasAppearance: {
    mode: 'grid',
    color: '#cecece'
  }
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
  },

  canvasAppearance (state) {
    return state.canvasAppearance
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
