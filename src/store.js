import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import parseDate from 'date-fns/parse'

var config = {
  apiKey: 'AIzaSyB8puei6DqfHvAwJ5cJCqy7ad35_mGajZw',
  authDomain: 'explore-tablet.firebaseapp.com',
  databaseURL: 'https://explore-tablet.firebaseio.com',
  storageBucket: 'explore-tablet.appspot.com'
}

let firebaseApp = firebase.initializeApp(config)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    libraryApiUrl: 'https://www.bm-lyon.fr/json_explore.php?action=detail&id=',
    libraryQueryUrl: 'https://www.bm-lyon.fr/json_explore.php?action=search&query=',
    exploreURL: 'https://explore.placed.eu',
    currentEventId: '5006',
    currentEventIdLibrary: '5006',
    currentEventDate: 0,
    eventData: null,
    eventGallery: [],
    libraryDevice: false,
    database: firebaseApp.database(),
    storage: firebaseApp.storage(),
    nbOfLinks: 1,
    nbOfFiles: 1
  },
  mutations: {
    CHANGE_LIBRARY_DEVICE: function (state, newVal) {
      state.libraryDevice = newVal
    },
    CHANGE_EVENT_ID: function (state, newId) {
      state.currentEventId = newId
    },
    CHANGE_EVENT_DATE: function (state, newDate) {
      state.currentEventDate = newDate
    },
    CHANGE_EVENT_DATA: function (state, newData) {
      state.eventData = newData
      localStorage.setItem('eventData', JSON.stringify(newData))
    },
    CHANGE_EVENT_ID_LIBRARY: function (state, newId) {
      state.currentEventIdLibrary = newId
      localStorage.setItem('eventIdLibrary', newId)
    }
  },
  actions: {
    changeEventId: function ({ commit }, newId) {
      fetch(this.state.libraryApiUrl + newId)
        .then((resp) => {
          if (resp.ok) {
            resp.json().then((data) => {
              // Check data[0].dates to see wich is the closest one
              let dateindex = 0
              for (let i = 0; i < data[0].dates.length; i++) {
                let date = parseDate(data[0].dates[i].date_start)
                if ((new Date()) < date) {
                  dateindex = i
                  break
                } else if (i === data[0].dates.length - 1) {
                  dateindex = i
                  break
                }
              }
              commit('CHANGE_EVENT_DATE', dateindex)

              localStorage.setItem('eventId', newId)
              localStorage.setItem('eventData', JSON.stringify(data[0]))
              commit('CHANGE_EVENT_ID', newId)
              commit('CHANGE_EVENT_DATA', data[0])

              // Create firebase entity
              this.state.database.ref(`event/${newId}`).once('value')
                .then((snap) => {
                  if (snap.val() === null) {
                    this.state.database.ref(`event/${newId}`).set({
                      eventName: data[0].event_title,
                      interestCount: 0
                    })
                  }
                })
            })
          }
        }).catch((e) => {
          console.log(`Error : ${e}`)
        })
    },
    changeEventIdLibrary: function ({ commit }, newId) {
      commit('CHANGE_EVENT_ID_LIBRARY', newId)
    },
    initStore: function ({ commit }) {
      let eventId = localStorage.getItem('eventId')
      let eventData = localStorage.getItem('eventData')
      let libraryDevice = localStorage.getItem('libraryDevice')
      let eventIdLibrary = localStorage.getItem('eventIdLibrary')
      if (eventId && eventData) {
        commit('CHANGE_EVENT_ID', eventId)
        commit('CHANGE_EVENT_DATA', JSON.parse(eventData))
      } else {
        this.dispatch('changeEventId', '4401')
      }
      if (libraryDevice) {
        commit('CHANGE_LIBRARY_DEVICE', libraryDevice === 'true')
      }
      if (eventIdLibrary) {
        commit('CHANGE_EVENT_ID_LIBRARY', eventIdLibrary)
      }
    },
    toggleLibraryDevice: function ({ commit }, newVal) {
      commit('CHANGE_LIBRARY_DEVICE', newVal)
      localStorage.setItem('libraryDevice', newVal)
    }
  }
})
