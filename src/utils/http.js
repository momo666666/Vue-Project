/**
 *  Create by staneyffer
 *  18-1-11
 */

import axios from 'axios'
import store from '../store'
import {LOGOUT} from '../store/mutation-types/user'
import router from '../router'

// axios 配置
axios.defaults.timeout = 5000
// axios.defaults.baseURL = 'http://120.25.227.42:9988'
axios.defaults.baseURL = 'http://123.207.236.107:8080'

axios.interceptors.request.use(
    config => {
      if (store.state.user.token) {
            // 如果存在登录信息则将其加到请求头中
        config.headers.Authorization = `token ${store.state.user.token}`   // 模板字符串，${}里放字符串中的变量
      }
      // alert('hehe')
      return config
    },
    err => {
        // 错误回调
      return Promise.reject(err)
    })

axios.interceptors.response.use(
    response => {
        // 没有错误，直接返回响应
      return response
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
              /**
               * 这里默认401是用户后台返回的用户登录验证失败的状态码
               * 验证失败，强制跳转登录界面
               */
          case 401:
            store.commit(LOGOUT)
              // console.log('验证信息有误')
            router.replace({
              path: 'login',
              query: {redirect: router.currentRoute.fullPath}
            })
        }
      }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
      return Promise.reject(error.response.data)  // 返回接口返回的错误信息
    })
const dataFilter = data => {
  let newData = new URLSearchParams()
  for (let k in data) {
    newData.append(k, data[k])
  }
  return newData
}
export const request = (url, options = {}, method = 'get') => {
  let key = ~['delete', 'get', 'head'].indexOf(method) ? 'params' : 'data'
  if (key === 'data') {
    options = dataFilter(options)
  }
  return axios(Object.assign({
    'url': url,
    'method': method,
        // 自定义成功响应为: 状态码200到300之间
    'validateStatus': (status) => { return status >= 200 && status < 300 }},
    {[key]: options})).then(
    res => res
  )
}
