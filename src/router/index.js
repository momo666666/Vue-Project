import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Word from '../components/Word'
import ModifyWord from '../components/ModifyWord'
import HomePage from '../components/Homepage'
import AllDocument from '../components/homepage/AllDocument'
import MyDocument from '../components/homepage/MyDocu'
import MyModifyDocu from '../components/homepage/MyModifyDocu'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/word',
      name: 'Word',
      component: Word,
      meta: {
        requireAuth: true   // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/modifyWord',
      name: 'ModifyWord',
      component: ModifyWord,
      meta: {
        // requireAuth: true
      }
    },
    {
      path: '/homePage',
      name: 'HomePage',
      component: HomePage,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/allDocument',
          name: '/allDocument',
          component: AllDocument
        },
        {
          path: '/myDocument',
          name: '/myDocument',
          component: MyDocument
        },
        {
          path: '/myModifyDocument',
          name: '/myModifyDocument',
          component: MyModifyDocu
        }
      ]
    }
  ]
})
