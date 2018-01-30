
import {request} from '../../utils/http'
// import {getStore} from '../../utils/localStorage'

const userLogin = params => {
  return request('/WordEdit/login', params, 'post')
}
const userRegister = params => {
  // return request('/auth/users/admin', params, 'post')
  return request('/WordEdit/register', params, 'post')
}
// const getUser = () => {
//   return request('/WordEdit/getUserInfoByID' + {id: 18})
// }

export default {
  userLogin,
  // getUser,
  userRegister
}
