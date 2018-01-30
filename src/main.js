import Vue from 'vue'

// import BootstrapVue from 'bootstrap-vue'

// Vue.use(BootstrapVue);

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import store from './store/store'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
