<template>
  <div id="prog-tile" class="explore-tile" :class="{ 'focused-tile' : focused }" @click="focused = !focused">
    <h2>{{$t('program-begin-label')}} {{progName}}</h2>
    <div class="event-prog-tile" v-html="progDesc"></div>
  </div>
</template>

<script>
import HelperMixin from '../helpers/HelperMixin'

export default {
  mixins: [HelperMixin],
  data: function () {
    return {
      eventMere: null
    }
  },
  created: function () {
    fetch(`${this.$store.state.libraryApiUrl}${this.eventData['event_mere']}`)
      .then((resp) => {
        if (resp.status !== 200) {
          return
        }
        return resp.json()
      })
      .then((data) => {
        this.eventMere = data[0]
      })
  },
  computed: {
    progName: function () {
      if (this.eventMere) {
        return this.eventMere['event_title']
      }
      return ''
    },
    progDesc: function () {
      if (this.eventMere) {
        return this.eventMere['event_description_courte'] + this.eventMere['event_description']
      }
    }
  }
}
</script>

<style>
#prog-tile {
  grid-row: span 2;
  grid-column: span 1;
  background: white;
  border-radius: 6px;
  overflow: scroll;
}

#prog-tile h2 {
  margin-left: 20px;
  margin-right: 20px;
}

.event-prog-tile{
  margin-left: 20px;
}
</style>
