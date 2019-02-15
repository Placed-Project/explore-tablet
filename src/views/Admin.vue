<template>
  <div id="admin-view">
    <form>
      <div>
        <p v-if="$store.state.currentEventIdLibrary">Main event for this tablet : {{$store.state.currentEventIdLibrary}}</p>
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
      <hr/>
      <div>
        <label for="library-device-check" >{{$t("label-toggle-library-device")}}</label>
        <input id="library-device-check" type="checkbox" v-model="libraryDevice">
      </div>
      <hr/>
      <div>
        <label>{{$t("label-link-list-label")}}</label>
        <div v-for="link in links" :key="link.key"><span @click="deleteLink(link.key)">X </span>{{link.val().label}} : {{link.val().url}}</div>
        <input id="link-list" type="url" v-model="addedLink" :placeholder="$t('write-link-here-label')">
        <input id="link-label-list" type="text" v-model="addedLinkLabel" :placeholder="$t('write-link-label-here-label')">
        <button class="admin-button" @click="addLink">➕ Add the link</button>
      </div>
    </form>
    <hr/>
    <button class="admin-button" @click="refresh">🔄 Refresh</button>
    <hr/>
    <router-link class="admin-button" to="/">🔙 Return to Home screen</router-link>
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
      addedLink: '',
      addedLinkLabel: ''
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
      // Empty URL
      if (this.addedLink.length === 0) {
        alert(this.$t('no-utl-provided-alert'))
        return
      }

      // Make the URL legal
      if (!this.addedLink.match(/^http[s]?:\/\/.*/gm)) {
        this.addedLink = `http://${this.addedLink}`
      }

      let pushRef = this.$store.state.database.ref(`event/${this.eventData.event_id}/links`).push()
      pushRef.set(
        {
          url: this.addedLink,
          label: this.addedLinkLabel
        })
      this.addedLink = ''
      this.addedLinkLabel = ''
    },
    deleteLink (eventid) {
      this.$store.state.database.ref(`event/${this.eventData.event_id}/links/${eventid}`).remove()
        .catch((err) => {
          console.error(err)
        })
    },
    loadLinkList: function (newItem, oldItem) {
      // Refresh link list
      if (oldItem && oldItem.event_id) {
        this.$store.state.database.ref(`event/${oldItem.event_id}/links`).off('child_added')
        this.$store.state.database.ref(`event/${oldItem.event_id}/links`).off('child_removed')
      }
      this.links = []
      this.$store.state.nbOfLinks = 0
      this.$store.state.database.ref(`event/${newItem.event_id}/links`).on('child_added', (data) => {
        this.$store.state.nbOfLinks += 1
        this.links.push(data)
      })
      this.$store.state.database.ref(`event/${newItem.event_id}/links`).on('child_removed', (data) => {
        this.$store.state.nbOfLinks -= 1
        this.links.splice(this.links.indexOf(data, 1))
      })
    },
    refresh: function () {
      document.location.reload(true)
    }
  },
  created: function () {
    this.libraryDevice = this.$store.state.libraryDevice
    // Refresh link list
    this.loadLinkList(this.eventData, null)
  },
  watch: {
    item: function (newItem, oldItem) {
      this.$store.dispatch('changeEventId', `${newItem.event_id}`)
      this.$store.dispatch('changeEventIdLibrary', `${newItem.event_id}`)

      this.loadLinkList(newItem, oldItem)
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

.admin-button  {
  background-color:#B62525;
  -moz-border-radius:28px;
  -webkit-border-radius:28px;
  border-radius:28px;
  display:inline-block;
  cursor:pointer;
  color:#ffffff;
  font-family:Arial;
  font-size:17px;
  padding:16px 31px;
  text-decoration:none;
  border-style: none;
  margin-top: 10px;
}
</style>
