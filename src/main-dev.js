import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import $ from 'jquery'
import VueSocketIO from 'vue-socket.io'
import ElementUI from 'element-ui'

import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'admin-lte/dist/js/adminlte.min'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/skin-blue.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'ionicons/dist/css/ionicons.min.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.http.options.emulateJSON = true
Vue.http.options.root = 'http://127.0.0.1:5000/api/'
// Vue.use(new VueSocketIO({
//   debug: false,
//   connection: 'http://127.0.0.1:5000',
// }))


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

