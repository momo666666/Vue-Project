// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

// import {mapActions} from 'vuex'
import hooks from './router/hooks'

import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)  // UI框架注册
Vue.config.productionTip = false
hooks(router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
