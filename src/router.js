import Vue from 'vue'
import Router from 'vue-router'
import Admin from './views/Admin.vue'
import Main from './views/Main'
import Hall from './views/Hall'
import Series from './views/Series'
import TATable from './views/TATable-web'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/hall',
      name: 'hall',
      component: Hall
    },
    {
      path: '/hall/:bibId',
      name: 'hall',
      component: Hall
    },
    {
      path: '/series',
      name: 'series',
      component: Series
    },
    {
      path: '/tatableweb',
      name: 'tatable',
      component: TATable
    },
    {
      path: '/:eventId',
      name: 'event',
      component: Main
    }
  ]
})
