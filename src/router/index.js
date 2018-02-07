import Vue from 'vue'
import Router from 'vue-router'
import RegisterApplication from '@/components/RegisterApplication'
import Login from '@/components/Login'
import Register from '@/components/Register'
import SearchApplication from '@/components/SearchApplication'
import Profile from '@/components/Profile'
import Transfer from '@/components/Transfer'

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
