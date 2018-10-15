import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    libraryApiUrl: 'https://www.bm-lyon.fr/json_explore.php?action=detail&id=',
    currentEventId: '4401',
    eventData: null
  },
  mutations: {
    CHANGE_EVENT_ID: function (state, newId) {
      state.currentEventId = newId
    },
    CHANGE_EVENT_DATA: function (state, newData) {
      state.eventData = newData
      localStorage.setItem('event_data', JSON.stringify(newData))
    }
  },
  actions: {
    changeEventId: function ({ commit }, newId) {
      fetch(this.state.libraryApiUrl + this.state.currentEventId)
        .then((resp) => {
          if (resp.ok) {
            resp.json().then((data) => {
              commit('CHANGE_EVENT_DATA', data[0])
              commit('CHANGE_EVENT_ID', newId)
            })
          }
        }).catch((e) => {
          console.log(`Error : ${e}`)
        })
    }
  }
})
