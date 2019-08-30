import Vue from 'vue'
import App from './App.vue'
import store from './store'
import api from './util/api'
import token from './util/token'
import toast from './components/toast'

Vue.config.productionTip = false

Vue.prototype.$toast = toast
Vue.prototype.$api = api
Vue.prototype.$token = token

const bus = new Vue()
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return bus
    }
  }
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
