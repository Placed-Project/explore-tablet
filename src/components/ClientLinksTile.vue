<template>
  <div id="client-links-tile" class="explore-tile" :class="{ 'focused-tile' : focused }" @click="focused = !focused">
    <h2 id="contact-h2-tile">{{$t("additional-links-label")}}</h2>
    <div v-for="link in links" :key="link.key" class="client-link">
      <a target="_blank" rel="noopener noreferrer" :href="link.val().url">{{link.val().label}}</a>
    </div>
  </div>
</template>

<script>
import HelperMixinVue from '../helpers/HelperMixin.vue'

export default {
  mixins: [HelperMixinVue],
  data: function () {
    return {
      links: []
    }
  },
  methods: {
    loadLinkList: function (newItem, oldItem) {
      // Refresh link list
      if (oldItem && oldItem.event_id) {
        this.$store.state.database.ref(`event/${oldItem.event_id}/links`).off('child_added')
        this.$store.state.database.ref(`event/${oldItem.event_id}/links`).off('child_removed')
      }
      this.links = []
      this.$store.state.database.ref(`event/${newItem.event_id}/links`).on('child_added', (data) => {
        this.links.push(data)
      })
      this.$store.state.database.ref(`event/${newItem.event_id}/links`).on('child_removed', (data) => {
        this.links.splice(this.links.indexOf(data, 1))
      })
    }
  },
  mounted: function () {
    this.loadLinkList(this.eventData)
  },
  watch: {
    '$route' (to, from) {
      let oldItem = this.eventData
      let newItem = to.path.slice(1, to.path.length)

      this.loadLinkList(newItem, oldItem)
    }
  }
}
</script>

<style>
#client-links-tile {
  grid-row: span 1;
  grid-column: span 1;
  background: white;
  border-radius: 6px;
  overflow: scroll;
}

#client-links-tile h2 {
  margin-top: 10px;
  margin-left: 20px;
}

.client-link {
  margin-left: 20px;
}
</style>
