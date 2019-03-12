// 引入vue
import Vue from 'vue'
import Vuex from 'vuex'

// 注册
Vue.use(Vuex)

// 状态
const state = {
  userinfo: JSON.parse(localStorage.getItem('userinfo'))
}

console.log(state.userinfo)

// mutations  只要用来操作state
const mutations = {
  // 保存用户数据
  SAVE_USERINFO(state,userinfo) {
    // 先把数据存入本地存储
    localStorage.setItem('userinfo',JSON.stringify(userinfo))
    // 再更新数据
    state.userinfo = userinfo
    // console.log(state.userinfo)
  }
}

// 创建仓库暴露出去
export default new Vuex.Store({
  state,
  mutations
})
