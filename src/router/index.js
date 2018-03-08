import Vue from 'vue'
import Router from 'vue-router'

import RegisterApplication from '@/components/pages/RegisterApplication'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import SearchApplication from '@/components/pages/SearchApplication'
import ViewApplication from '@/components/pages/ViewApplication'
import AccountMigration from '@/components/pages/AccountMigration'
import Home from '@/components/pages/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
      path: '/application/view/:id',
      name: 'ViewApplication',
      component: ViewApplication
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/migrate',
      name: 'AccountMigration',
      component: AccountMigration
    }
  ]
})
