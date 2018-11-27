import Vue from 'vue'
import Router from 'vue-router'
import Desc from './views/Desc.vue'
import Place from './views/Place.vue'
import Admin from './views/Admin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'description',
      component: Desc
    },
    {
      path: '/place',
      name: 'place',
      component: Place
    },
    {
      path: '/event/:eventId',
      name: 'event',
      component: Desc
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})
