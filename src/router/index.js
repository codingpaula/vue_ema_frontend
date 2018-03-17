import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import MatrixMain from '@/components/MatrixMain'
import NotFoundComponent from '@/components/NotFoundComponent'
import ProfileMain from '@/components/ProfileMain'
import LogInMain from '@/components/LogInMain'

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
      component: MatrixMain
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileMain
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogInMain
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
