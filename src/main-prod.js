import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
import VueSocketIO from 'vue-socket.io'

Vue.use(VueResource)
Vue.config.productionTip = false
Vue.http.options.emulateJSON = true
Vue.http.options.root = 'http://proxy.minco.club/'
Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://49.232.19.51:19999/',
}))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
