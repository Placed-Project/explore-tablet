import Vue from 'vue'
import Router from 'vue-router'
import Admin from './views/Admin.vue'
import Main from './views/Main'

Vue.use(Router)

export default new Router({
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
      path: '/:eventId',
      name: 'event',
      component: Main
    }
  ]
})
