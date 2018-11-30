import Vue from 'vue'
import Vuex from 'vuex'
// import { EventEmitter } from 'events';
// import firebase from 'firebase'

// var config = {
//   apiKey: 'AIzaSyB8puei6DqfHvAwJ5cJCqy7ad35_mGajZw',
//   authDomain: 'explore-tablet.firebaseapp.com',
//   databaseURL: 'https://explore-tablet.firebaseio.com',
//   storageBucket: 'explore-tablet.appspot.com'
// }

// let firebaseApp = firebase.initializeApp(config)

// You can retrieve services via the defaultApp variable...
// var defaultStorage = firebaseApp.storage()
// var defaultDatabase = firebaseApp.database()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    libraryApiUrl: 'https://www.bm-lyon.fr/json_explore.php?action=detail&id=',
    libraryQueryUrl: 'https://www.bm-lyon.fr/json_explore.php?action=search&query=',
    currentEventId: '4401',
    currentEventDate: 0,
    eventData: null
  },
  mutations: {
    CHANGE_EVENT_ID: function (state, newId) {
      state.currentEventId = newId
    },
    CHANGE_EVENT_DATE: function (state, newDate) {
      state.currentEventDate = newDate
    },
    CHANGE_EVENT_DATA: function (state, newData) {
      state.eventData = newData
      localStorage.setItem('eventData', JSON.stringify(newData))
    }
  },
  actions: {
    changeEventId: function ({ commit }, newId) {
      fetch(this.state.libraryApiUrl + newId)
        .then((resp) => {
          if (resp.ok) {
            resp.json().then((data) => {
              localStorage.setItem('eventId', newId)
              localStorage.setItem('eventData', JSON.stringify(data[0]))
              commit('CHANGE_EVENT_ID', newId)
              commit('CHANGE_EVENT_DATA', data[0])
            })
          }
        }).catch((e) => {
          console.log(`Error : ${e}`)
        })
    },
    initStore: function ({ commit }) {
      let eventId = localStorage.getItem('eventId')
      let eventData = localStorage.getItem('eventData')
      if (eventId && eventData) {
        commit('CHANGE_EVENT_ID', eventId)
        commit('CHANGE_EVENT_DATA', JSON.parse(eventData))
      } else {
        this.dispatch('changeEventId', '4401')
      }
    }
  }
})
