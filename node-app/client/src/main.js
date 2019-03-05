import Vue from 'vue'
import App from './App.vue'
import axios from './http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios;//做的好处是在vue实例或组件中不用再去重复引用Axios 直接用this.$axios就能执行axios 方法

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
