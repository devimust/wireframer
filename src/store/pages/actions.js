export default {

  loadPagesFromLocalStorage ({commit, state}) {
    var pages = localStorage.getItem('pages')

    // create a new page in state when app gets hard-refreshed if nothing
    // exists (for a better experience)
    if (!pages || JSON.parse(pages).length == 0) {
      pages = [{
        id: 1,
        name: 'New page',
        w: 650,
        h: 550,
        widgets: []
      }]

      pages = JSON.stringify(pages)
      // return
    }

    commit('UPDATE_PAGES_MUTATION', JSON.parse(pages))

    var activePageId = localStorage.getItem('activePage')

    if (!activePageId) {
      // @todo a page might have existed before with a different id to 1,
      // make this more dynamic
      activePageId = 1
    }

    const page = state.pages.find(item => item.id == activePageId)

    if (!page) {
      return
    }

    commit('SET_ACTIVE_PAGE_MUTATION', page)
  },

  loadPagesFromFileImport ({commit, state}, payload) {
    commit('SET_PAGE_ACTIVE_WIDGET_MUTATION', null)
    commit('SET_ACTIVE_PAGE_MUTATION', null)
    commit('UPDATE_PAGES_MUTATION', JSON.parse(payload))
  },

  createPage ({commit, state}, payload) {
    // default values
    var item = {
      id: 0,
      name: 'New page',
      w: 650,
      h: 550,
      widgets: []
    }

    // merge arguments with default values
    Object.assign(item, payload);

    // find max id
    var maxId = 0
    for (var i=0; i<state.pages.length; i++) {
      if (state.pages[i].id > maxId) {
        maxId = state.pages[i].id
      }
    }

    // generate unique id
    Object.assign(item, {
      id: maxId + 1
    });

    commit('CREATE_PAGE_MUTATION', item)
  },

  deletePage ({commit}, payload) {
    commit('DELETE_PAGE_MUTATION', payload.id)
  },

  savePageName ({commit}, payload) {
    commit('SET_PAGE_NAME_MUTATION', {
      id: payload.page.id,
      name: payload.name
    })
  },

  updatePageOrder ({commit}, payload) {
    commit('SET_PAGE_ORDER_MUTATION', {
      id: payload.page.id,
      direction: payload.direction
    })
  },

  setActivePage ({commit}, payload) {
    commit('SET_ACTIVE_PAGE_MUTATION', payload)
  },

  updatePageCanvasSize ({commit}, payload) {
    commit('SET_PAGE_CANVAS_SIZE_MUTATION', payload)
  },

  createWidget ({commit, state}, payload) {
    if (!state.activePage) {
      return
    }

    // find max id
    var maxId = 0
    for (var i=0; i<state.activePage.widgets.length; i++) {
      if (state.activePage.widgets[i].id > maxId) {
        maxId = state.activePage.widgets[i].id
      }
    }

    // default widget properties
    var widget = {
      id: maxId + 1,
      type: '',
      x: 10,      /* left starting coordinate from the canvas */
      y: 10,      /* top starting coordinate from the canvas */
      w: 100,     /* container width */
      h: 100,     /* container height */
      z: 10,      /* container z-index */
      c: 'auto',  /* text color if applicable */
      bc: 'auto', /* background color if applicable */
      t: '',      /* main text if applicable */
      a: '',      /* text-alignment if applicable */
      f: '',      /* font size if applicable */
      d: [],      /* data related to widget (e.g. lists) if applicable */
      s: '',      /* shape type (e.g. rectangle) if applicable */
      l: ''       /* image url (e.g. https://url/image.png) if applicable */
    }

    // merge payload with default widget properties
    Object.assign(widget, payload);

    commit('CREATE_WIDGET_MUTATION', widget)
  },

  updateWidgetDimensions ({commit}, payload) {
    commit('SET_PAGE_WIDGET_DIMENSIONS_MUTATION', payload)
  },

  setActiveWidget ({commit}, payload) {
    commit('SET_PAGE_ACTIVE_WIDGET_MUTATION', payload)
  },

  updateWidgetProperties ({commit}, payload) {
    commit('SET_PAGE_WIDGET_PROPERTIES_MUTATION', payload)
  },

  deleteWidget ({commit, state}) {
    commit('DELETE_PAGE_WIDGET_MUTATION')
  }
}
