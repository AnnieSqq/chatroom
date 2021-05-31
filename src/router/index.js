import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入生成好的规则
import routerRoutes from './modules/routes.js'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routerRoutes, // 使用
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router
