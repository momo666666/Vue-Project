
import {simpleLogger} from './afterEach/simpleLogger'
import {beforeH} from './beforeEach/beforeHook'

export default (router) => {
  // console.log('not development')
  router.beforeEach(beforeH)
  if (process.env.NODE_ENV === 'development') {
    router.afterEach(simpleLogger)    // 开发环境打印路由日志
  }
}
