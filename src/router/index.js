import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Receive from '@/views/receive'
import ReceiveSuccess from '@/views/receivesuccess'
import Redenvelope from '@/views/Redenvelope'
import MyRedenvelope from '@/views/MyRedenvelope'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/receive',
      name: 'Receive',
      component: Receive
    }, {
      path: '/success',
      name: 'ReceiveSuccess',
      component: ReceiveSuccess
    }, {
      path: '/red',
      name: 'Redenvelope',
      component: Redenvelope
    }, {
      path: '/myred',
      name: 'MyRedenvelope',
      component: MyRedenvelope
    }
  ]
})
