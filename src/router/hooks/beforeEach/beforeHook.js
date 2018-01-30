/**
 *  Create by staneyffer
 *  18-1-13
 */

import store from '../../../store'
import {READ_USER} from '../../../store/mutation-types/user'

// import {getStore} from '../../../utils/localStorage'
export const beforeH = (to, from, next) => {
  if (to.path === '/') {  // 强制跳转到 '/index'
    next({
      path: '/index',
      query: {redirect: to.fullPath}
    })
  }
  if (to.matched.some(r => r.meta.requireAuth)) {  // 判断该路由是否需要登录权限
    store.commit(READ_USER)            // 读取用户信息（读取当前token）
    if (store.state.user.token !== null) {    // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
}
