import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 当前登录的用户
    userInfo: {
      username: '',
      nickname: '',
      id: ''
    },
    // 正在聊天的用户
    chatUser: {
      username: 'sys',
      nickname: '系统消息'
    },
    // 需要刷新的地方
    needRefresh: ''
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data
    },
    setChatUser(state, data) {
      state.chatUser = data
    },
    setNeedRefresh(state, data) {
      state.needRefresh = data
    }
  },
  actions: {},
  modules: {}
})
