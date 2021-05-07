import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
import VueSocketIO from 'vue-socket.io'

Vue.use(VueResource)
Vue.config.productionTip = false
Vue.http.options.emulateJSON = true
// Vue.http.options.root = 'http://proxy.mincox.club/'
Vue.http.options.root = 'http://47.102.134.101:19999/'
Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://47.102.134.101:19999/',
}))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
