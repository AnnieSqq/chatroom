import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './plugins/ant-design-vue.js'
import Antd from 'ant-design-vue'
import './assets/styles/theme/default.less'
import './assets/styles/global/index.less'
console.log('xxx')
console.log(Antd)
Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
