import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'

// 注册路由
Vue.use(Router)

// 导出路由
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
