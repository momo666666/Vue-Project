/**
 *  Create by staneyffer
 *  18-1-11
 */

import {LOGOUT, LOGIN, REGISTER, SAVE_USER, READ_USER} from '../../mutation-types/user'
import {setStore, removeStore, getStore} from '../../../utils/localStorage'
import authApi from '../../../api/auth/user'

const state = {
  user: {},
  token: null
}

const getters = {
  getToken: state => state.token,
  getUser: state => state.user
}

const actions = {
  login ({commit, state}, loginData) {
    commit(LOGIN, loginData)
  },
  register ({commit, state}, registerData) {
    commit(REGISTER, registerData)
  },
  logout ({commit}) {
    commit(LOGOUT)
  },
  getUserInfo ({commit, state}) {
    authApi.getUser().then(res => {
      commit(SAVE_USER, res.data)
    }).catch(res => {
      console.log('获取用户信息失败, status: ' + res.status)
      commit(LOGOUT)
    })
  }
}

const mutations = {
  /**
   * 登录，并将token和用户id存在localStorage中
   * @param state
   * @param loginData： {access_token: '', user: {}}
   */
  [LOGIN] (state, loginData) {
    state.token = loginData.access_token
    state.user = loginData.user
    setStore('token', loginData.access_token)
    setStore('user_id', loginData.user.id)
  },
  /**
   * 退出登录 并清除token和用户id
   * @param state
   */
  [LOGOUT] (state) {
    state.user = {}
    state.token = null
    removeStore('user_id')
    removeStore('token')
  },
  [SAVE_USER] (state, userInfo) {
    state.user = userInfo.object
  },
  // 读取存在本地的token信息
  [READ_USER] (state) {
    // alert(getStore('token'))
    state.token = getStore('token')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
