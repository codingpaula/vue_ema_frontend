import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import MainMatrix from '@/components/MainMatrix'
import NotFoundComponent from '@/components/NotFoundComponent'
import MainProfile from '@/components/MainProfile'
import MainLogIn from '@/components/MainLogIn'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/matrix',
      name: 'Matrix',
      component: MainMatrix
    },
    {
      path: '/profile',
      name: 'Profile',
      component: MainProfile
    },
    {
      path: '/login',
      name: 'LogIn',
      component: MainLogIn
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
