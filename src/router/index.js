import Vue from 'vue'
import Router from 'vue-router'

import RegisterApplication from '@/components/pages/RegisterApplication'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import SearchApplication from '@/components/pages/SearchApplication'
import Profile from '@/components/pages/Profile'
import Transfer from '@/components/pages/Transfer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Profile
    },
    {
      path: '/application/create',
      name: 'RegisterApplication',
      component: RegisterApplication
    },
    {
      path: '/application/search',
      name: 'SearchApplication',
      component: SearchApplication
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile/transfer',
      name: 'Transfer',
      component: Transfer
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
