import Vue from 'vue'
import VueRouter from 'vue-router'
import homeRoutes from './home'
import findHouseRoutes from './findHouse'
import recommendRoutes from './recommend'
import informationRoutes from './information'
import mineRoutes from './mine'
import store from '../store'
import newPropertyReportRoutes from './newPropertyReport'
import inviteDistributionRoutes from './inviteDistribution'

Vue.use(VueRouter)
/**
 * 设置路由
 */
const vueRouter = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, // 重定向
    ...homeRoutes,
    ...findHouseRoutes,
    ...recommendRoutes,
    ...informationRoutes,
    ...mineRoutes,
    ...newPropertyReportRoutes,
    ...inviteDistributionRoutes
  ]
})
vueRouter.beforeEach((to, from, next) => {
  let _this = new Vue()
  _this.closePopupVisible && _this.closePopupVisible()
  // 记录滚动条 位置信息
  from.matched.length && (from.meta.scrollTop = from.matched[0].instances.default.$refs.cont.scrollTop)
  // 添加title name
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.path === '/login') {
    next()
    return
  }
  // 跳转后返回顶部
  vueRouter.afterEach((to, from, next) => {
    window.scrollTo(0, 0)
  })
  let user = store.state.user.user
  if (window.jrfw.getIsWxClient()) {
    if (!user || !user.loginToken) { // 微信环境 && 未登录
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    } else {
      window.jrfw.getUserInfo({force: true}).then(res => {
        store.commit('user/setUser', {
          id: res.id,
          phone: res.phone,
          userName: res.userName,
          avatar: res.avatar,
          loginToken: res.loginToken,
          type: res.type,
          authenticationFlag: res.authenticationFlag
        })
        next()
      })
    }
  } else if (to.meta.requireLogin) { // 必须登陆的限制
    if (window.jrfw.isApp()) {
      if (!user || !user.loginToken) { // 微信环境 && 未登录
        next({
          path: '/login',
          query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    next()
  }
})
export default vueRouter
