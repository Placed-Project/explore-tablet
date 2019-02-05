<template>
  <div id="admin-view">
    <form>
      <div>
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
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import Autocomplete from 'v-autocomplete'
import ItemTemplate from '../components/AutocompleteItem.vue'
import HelperMixin from '../helpers/HelperMixin'

Vue.use(Autocomplete)

export default {
  name: 'admin',
  mixins: [HelperMixin],
  data () {
    return {
      item: null,
      items: [],
      template: ItemTemplate,
      libraryDevice: false
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
    }
  },
  mounted: function () {
    this.libraryDevice = this.$store.state.libraryDevice
  },
  watch: {
    item: function (newItem, oldItem) {
      this.$store.dispatch('changeEventId', `${newItem.event_id}`)
      this.$store.dispatch('changeEventIdLibrary', `${newItem.event_id}`)
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
</style>
