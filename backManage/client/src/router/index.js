import Vue from 'vue'
import Router from 'vue-router'
// 引入组件
// import Login from '@/components/Login'
// import Index from '@/components/Index'
// 异步加载
const Login = () => import('@/components/Login')
const Index = () => import('@/components/Index')
const userlist = () => import('@/components/userlist')
const useradd = () => import('@/components/useradd')
const passwordedit = () => import('@/components/passwordedit')
const home = () => import('@/components/home')

// 注册路由
Vue.use(Router)

// 导出路由
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      children:[
        {
          path: '/',
          name: 'home',
          component: home
        },
        {
          path: '/userlist',
          name: 'userlist',
          component: userlist
        },
        {
          path: '/useradd',
          name: 'useradd',
          component: useradd
        },
        {
          path: '/passwordedit',
          name: 'passwordedit',
          component: passwordedit
        }
      ]
    }
  ]
})
