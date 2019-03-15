<template>
  <div id="admin-view">
    <form v-if="!libraryDevice && passwordString != '101093'">
      <label for="password-input">Password :</label>
      <input id="password-input" type="password" v-model="passwordString"/>
    </form>
    <form v-else>
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
      <hr/>
      <label>{{$t("label-file-list-label")}}</label>
      <div v-for="file in files" :key="file.key"><span @click="deleteFile(file.key)">X </span>{{file.val().name}} : <a :href="file.val().link">{{file.val().link}}</a></div>
      <input id="file-label-list" type="text" v-model="addedFileLabel" :placeholder="$t('write-file-label-here-label')">
      <input type="file" id="file-input"/>
      <button class="admin-button" @click="handleFiles" id="file-input-button">📎 Upload</button>
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
import LinksListMixin from '../helpers/LinksListMixin'

Vue.use(Autocomplete)

export default {
  name: 'admin',
  mixins: [HelperMixin, LinksListMixin],
  data () {
    return {
      item: this.eventData,
      items: [],
      template: ItemTemplate,
      libraryDevice: false,
      addedLink: '',
      addedLinkLabel: '',
      authed: false,
      passwordString: '',
      addedFileLabel: ''
    }
  },
  methods: {
    handleFiles () {
      let file = document.querySelector('#file-input').files[0]
      let filename = this.addedFileLabel.length > 0 ? this.addedFileLabel : file.name

      this.addedFileLabel = ''
      document.querySelector('#file-input-button').classList.add('disabled')

      let uploadref = this.$store.state.storage.ref(`${this.eventData.event_id}/${filename}`)
      uploadref.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then(dlURL => {
          document.querySelector('#file-input-button').classList.remove('disabled')
          this.$store.state.database.ref(`event/${this.eventData.event_id}/files`).push({
            name: filename,
            link: dlURL
          })
        })
      })

      document.querySelector('#file-input').value = ''
    },
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
      let linkType = ''
      // Empty URL
      if (this.addedLink.length === 0) {
        alert(this.$t('no-utl-provided-alert'))
        return
      }

      // Make the URL legal
      if (!this.addedLink.match(/^http[s]?:\/\/.*/gm)) {
        this.addedLink = `http://${this.addedLink}`
      }

      if (this.addedLink.match(/.*catalogue\.bm-lyon\.fr.*/gm)) { // If the url is from the catalogue
        this.addedLinkLabel = `📚 ${this.addedLinkLabel}`
        linkType = 'catalogue'
      } else if (this.addedLink.match(/.*linflux\.com.*/gm)) { // If the url is from the Influx
        this.addedLinkLabel = `📰 ${this.addedLinkLabel}`
        linkType = 'influx'
      } else if (this.addedLink.match(/.*bm-lyon\.fr\/nos-blogs.*/gm)) { // If the url is from the BML blogs www.bm-lyon.fr/nos-blogs
        this.addedLinkLabel = `📖 ${this.addedLinkLabel}`
        linkType = 'bml-blog'
      } else if (this.addedLink.match(/^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/gm)) { // If the url is from the BML blogs www.bm-lyon.fr/nos-blogs
        this.addedLinkLabel = `🎞 ${this.addedLinkLabel}`
        linkType = 'yt'
      } else if (this.addedLink.match(/.*bm-lyon\.fr\/spip\.php\?page=video.*/gm)) { // If the url is from the BML videos
        this.addedLinkLabel = `🎞 ${this.addedLinkLabel}`
        linkType = 'bml-video'
      } else if (this.addedLink.match(/.*soundcloud\.com.*/gm)) { // If the url is from soundcloud.com
        this.addedLinkLabel = `🎙 ${this.addedLinkLabel}`
        linkType = 'soundcloud'
      } else if (this.addedLink.match(/.*mixcloud\.com(.*)/gm)) { // If the url is from soundcloud.com
        this.addedLinkLabel = `🎙 ${this.addedLinkLabel}`
        linkType = 'mixcloud'
      } else if (this.addedLink.match(/.*wikipedia\.org.*/gm)) { // If the url is from soundcloud.com
        this.addedLinkLabel = `🦉 ${this.addedLinkLabel}`
        linkType = 'wikipedia'
      } else {
        this.addedLinkLabel = `🌐 ${this.addedLinkLabel}`
        linkType = 'other'
      }

      let pushRef = this.$store.state.database.ref(`event/${this.eventData.event_id}/links`).push()
      pushRef.set(
        {
          url: this.addedLink,
          label: this.addedLinkLabel,
          type: linkType
        })
      this.addedLink = ''
      this.addedLinkLabel = ''
    },
    deleteLink (key) {
      this.$store.state.database.ref(`event/${this.eventData.event_id}/links/${key}`).remove()
        .catch((err) => {
          console.error(err)
        })
    },
    deleteFile (key) {
      this.$store.state.database.ref(`event/${this.eventData.event_id}/files/${key}`).remove()
        .catch((err) => {
          console.error(err)
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
    this.loadFileList(this.eventData, null)
  },
  watch: {
    item: function (newItem, oldItem) {
      this.$store.dispatch('changeEventId', `${newItem.event_id}`)
      this.$store.dispatch('changeEventIdLibrary', `${newItem.event_id}`)

      this.loadLinkList(newItem, oldItem)
      this.loadFileList(newItem, oldItem)
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

.disabled {
  background-color:rgb(221, 221, 221);
  cursor: progress;
}
</style>
