import axios from 'axios'
import { message } from 'ant-design-vue'
import store from '@/store'
axios.defaults.baseURL = 'http://api.chatroom.anniesqq.com'
// 响应拦截
axios.interceptors.response.use(
  (response) => {
    // 该处为后端返回整个内容
    const res = response.data // 该处可将后端数据取出，提前做一个处理
    if (res.code === '200') {
      return res // 该处将结果返回，下一步可用于前端页面渲染用
    } else {
      message.error(res.msg)
      return res
    }
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)
// 请求拦截
axios.interceptors.request.use(
  (config) => {
    const { username, id } = store.state.userInfo
    if (username && id) {
      config.headers.username = username
      config.headers.id = id
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default axios
