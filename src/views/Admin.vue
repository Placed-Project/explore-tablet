<template>
  <div class="admin">
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
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Autocomplete from 'v-autocomplete'
import ItemTemplate from '../components/AutocompleteItem.vue'

Vue.use(Autocomplete)

export default {
  name: 'admin',
  data () {
    return {
      item: null,
      items: [],
      template: ItemTemplate
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
  watch: {
    item: function (newItem, oldItem) {
      this.$store.dispatch('changeEventId', `${newItem.event_id}`)
    }
  }
}
</script>

<style>
</style>
