<template>
  <div id="admin-view">
    <form>
      <div>
        <p v-if="$store.state.currentEventIdLibrary">This tablet has a libraryEvent setup : {{$store.state.currentEventIdLibrary}}</p>
        <label for="event-autocomplete">{{$t("label-event-search")}}</label>
        <v-autocomplete
          id="event-autocomplete"
          :items="items"
          v-model="item"
          :get-label="getLabel"
          :component-item='template'
          @update-items="updateItems">
        </v-autocomplete>
      </div>
      <div>
        <label for="library-device-check" >{{$t("label-toggle-library-device")}}</label>
        <input id="library-device-check" type="checkbox" v-model="libraryDevice">
      </div>
      <div>
        <label>{{$t("label-link-list-label")}}</label>
        <div v-for="link in links" :key="eventData.event_id + link"><span @click="deleteLink(eventData.event_id)">X</span>{{link}}</div>
        <input id="link-list" type="url" v-model="addedLink">
        <button @click="addLink">Ajouter le lien</button>
      </div>
    </form>
    <router-link to="/">Return to Home screen</router-link>
  </div>
</template>

<script>
import Vue from 'vue'
import Autocomplete from 'v-autocomplete'
import ItemTemplate from '../components/microcomponent/AutocompleteItem.vue'
import HelperMixin from '../helpers/HelperMixin'

Vue.use(Autocomplete)

export default {
  name: 'admin',
  mixins: [HelperMixin],
  data () {
    return {
      item: this.eventData,
      items: [],
      template: ItemTemplate,
      libraryDevice: false,
      links: [],
      addedLink: ''
    }
  },
  methods: {
    getLabel (item) {
      return item.event_title
    },
    updateItems (text) {
      this.queryEventAPI(text).then((result) => {
        this.items = result
      })
    },
    queryEventAPI (text) {
      return fetch(this.$store.state.libraryQueryUrl + text).then((resp) => {
        return resp.json()
      }).then((json) => {
        return Promise.resolve(json)
      })
    },
    addLink: function () {
      let pushRef = this.$store.state.database.ref(`event/${this.eventData.event_id}/links`).push()
      pushRef.set(this.addedLink)
    }
  },
  created: function () {
    this.libraryDevice = this.$store.state.libraryDevice
    // Refresh link list
    this.links = []
    this.$store.state.database.ref(`event/${this.eventData.event_id}/links`).on('child_added', (data) => {
      this.links.push(data.val())
    })
  },
  watch: {
    item: function (newItem, oldItem) {

      this.$store.dispatch('changeEventId', `${newItem.event_id}`)
      this.$store.dispatch('changeEventIdLibrary', `${newItem.event_id}`)

      // Refresh link list
      if (oldItem.event_id) {
        this.$store.state.database.ref(`event/${oldItem.event_id}/links`).off('child_added')
        this.$store.state.database.ref(`event/${oldItem.event_id}/links`).off('child_removed')
      }
      this.links = []
      this.$store.state.database.ref(`event/${newItem.event_id}/links`).on('child_added', (data) => {
        this.links.push(data.val())
      })
    },
    libraryDevice: function (newVal, oldVal) {
      this.$store.dispatch('toggleLibraryDevice', newVal)
    }
  }
}
</script>

<style>
#admin-view {
  background: white;
  border-radius: 6px;
  overflow: scroll;
  padding: 10px;
  margin: 10px;
}

#admin-view input {
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  width:300px;
  border:none;
  border-bottom:1px solid #757575;
}

#admin-view input:focus {
  outline:none;
}
</style>
