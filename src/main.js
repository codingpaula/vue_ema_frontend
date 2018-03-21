// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueKonva from 'vue-konva'
// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
// imported now in index.html via <script>
// import '@/assets/fontawesome-all.js'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App'
import router from './router'

Vue.use(VueKonva)
// Vue.use(BootstrapVue)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
