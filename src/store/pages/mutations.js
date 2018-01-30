export default {

  UPDATE_PAGES_MUTATION (state, payload) {
    state.pages = payload

    localStorage.setItem('pages', JSON.stringify(state.pages))
  },

  CREATE_PAGE_MUTATION (state, payload) {
    state.pages.push(payload)

    localStorage.setItem('pages', JSON.stringify(state.pages))
  },

  DELETE_PAGE_MUTATION (state, payload) {
    const pageId = payload
    const index = state.pages.findIndex(item => item.id === pageId)

    if (index == -1) {
      return
    }

    // clear activepage if it gets deleted
    if (state.activePage && state.activePage.id == pageId) {
      state.activePage = null
    }

    state.pages.splice(index, 1);

    localStorage.setItem('pages', JSON.stringify(state.pages))
    localStorage.removeItem('activePage')

    // @todo check if we can select another page to be active
    // ...
  },

  SET_PAGE_NAME_MUTATION (state, payload) {
    const item = state.pages.find(item => item.id === payload.id)

    item.name = payload.name

    localStorage.setItem('pages', JSON.stringify(state.pages))
  },

  SET_PAGE_ORDER_MUTATION (state, payload) {
    const index = state.pages.findIndex(item => item.id === payload.id)

    var from = index
    var to = index - 1

    if (payload.direction == 'down') {
      to = index + 1
    }

    state.pages.splice(to, 0, state.pages.splice(from, 1)[0]);

    localStorage.setItem('pages', JSON.stringify(state.pages))
  },

  SET_ACTIVE_PAGE_MUTATION (state, payload) {
    state.activePage = payload

    if (payload) {
      localStorage.setItem('activePage', JSON.stringify(payload.id))
    }
  },

  SET_PAGE_CANVAS_SIZE_MUTATION (state, payload) {
    if (!state.activePage) {
      return
    }

    state.activePage.w = payload.width
    state.activePage.h = payload.height

    const item = state.pages.find(item => item.id === state.activePage.id)

    item.w = payload.width
    item.h = payload.height

    localStorage.setItem('pages', JSON.stringify(state.pages))
  },

  CREATE_WIDGET_MUTATION (state, payload) {
    if (!state.activePage) {
      return
    }

    const page = state.pages.find(item => item.id === state.activePage.id)

    page.widgets.push(payload)

    localStorage.setItem('pages', JSON.stringify(state.pages))

    state.activePage = page
  },

  SET_PAGE_WIDGET_DIMENSIONS_MUTATION (state, payload) {
    if (!state.activePage) {
      return
    }

    const widget = state.activePage.widgets.find(item => item.id === payload.id)

    if (!widget) {
      return
    }

    // merge arguments with default values
    Object.assign(widget, payload)

    const page = state.pages.find(item => item.id === state.activePage.id)

    const pageWidget = page.widgets.find(item => item.id === payload.id)
    if (pageWidget) {
      // merge arguments with default values
      Object.assign(pageWidget, payload)
    } else {
      page.widgets.push(payload)
    }

    localStorage.setItem('pages', JSON.stringify(state.pages))
  },

  SET_PAGE_ACTIVE_WIDGET_MUTATION (state, payload) {
    state.activeWidget = payload
  },

  SET_PAGE_WIDGET_PROPERTIES_MUTATION (state, payload) {
    if (!payload) {
      return
    }

    if (!state.activePage) {
      return
    }

    const page = state.pages.find(item => item.id === state.activePage.id)

    if (!page) {
      return
    }

    const pageWidget = page.widgets.find(item => item.id === payload.id)

    if (!pageWidget) {
      return
    }

    // merge arguments with default values
    Object.assign(pageWidget, payload)

    localStorage.setItem('pages', JSON.stringify(state.pages))
  },

  DELETE_PAGE_WIDGET_MUTATION (state) {
    if (!state.activePage || !state.activeWidget) {
      return
    }

    const page = state.pages.find(item => item.id === state.activePage.id)

    if (!page) {
      return
    }

    const pageWidgetIndex = page.widgets.findIndex(item => item.id === state.activeWidget.id)

    if (pageWidgetIndex == -1) {
      return
    }

    page.widgets.splice(pageWidgetIndex, 1)

    state.activeWidget = null

    localStorage.setItem('pages', JSON.stringify(state.pages))
  }
}
