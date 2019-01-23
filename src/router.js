import Vue from 'vue'
import Router from 'vue-router'
import Admin from './views/Admin.vue'
import Main from './views/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'description',
      component: Main
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})
