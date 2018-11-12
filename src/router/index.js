import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Receive from '@/views/receive'
import ReceiveSuccess from '@/views/receivesuccess'
import Redenvelope from '@/views/Redenvelope'
import MyRedenvelope from '@/views/Redenvelope/myred'
import Account from '@/views/account'
import ACTransfer from '@/views/ACTransfer'
import Detail from '@/views/detail'
import Payment from '@/views/detail/payment.vue'
import About from '@/views/about'
import RedList from '@/views/Redenvelope/redlist'
import RedAbout from '@/views/Redenvelope/redabout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
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
    }, {
      path: '/account',
      name: 'Account',
      component: Account
    }, {
      path: '/acTransfer',
      name: 'ACTransfer',
      component: ACTransfer
    }, {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }, {
      path: '/payment',
      name: 'Payment',
      component: Payment
    }, {
      path: '/about',
      name: 'About',
      component: About
    }, {
      path: '/redlist',
      name: 'RedList',
      component: RedList
    }, {
      path: '/redabout',
      name: 'Redabout',
      component: RedAbout
    }
  ]
})
