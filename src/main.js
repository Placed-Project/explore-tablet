import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created: function () {
    // this.$store.dispatch('initStore')
  }
}).$mount('#app')

let userLocale = navigator.language || navigator.userLanguage
let vuelocale = 'fr'

if (userLocale.match(/^fr.*$/)) {
  vuelocale = 'fr'
} else if (userLocale.match(/^sv.*$/)) {
  vuelocale = 'sv'
} else {
  vuelocale = 'en'
}

i18n.locale = vuelocale

console.log(vuelocale)
