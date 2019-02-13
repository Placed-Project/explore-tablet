<template>
  <div id="program-events-tile" class="explore-tile">
    <h2>{{$t('program-events-list-label')}}</h2>
    <div id="program-events-list-wrapper">
      <EventMicrotile v-for="event in childEvents" :key="event['event_id']" :pevent-data-id="event"></EventMicrotile>
    </div>
  </div>
</template>

<script>
import HelperMixin from '../helpers/HelperMixin'
import EventMicrotile from './microcomponent/EventMicrotile'

export default {
  mixins: [HelperMixin],
  components: { EventMicrotile },
  data: function () {
    return {
      childEvents: []
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.$route.params.eventId) {
        this.populateTile()
      }
    }
  },
  created: function () {
    this.populateTile()
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
  },
  methods: {
    populateTile: function () {
      fetch(`https://www.bm-lyon.fr/json_explore.php?action=listEvents&program=${this.eventData['event_mere']}`)
        .then((resp) => {
          if (resp.status !== 200) {
            return
          }
          return resp.json()
        })
        .then((data) => {
          this.childEvents = data
        })
    }
  }
}
</script>

<style>
#program-events-tile {
  grid-row: span 1;
  grid-column: span 2;
  background: white;
  border-radius: 6px;
  overflow: scroll;
}

#program-events-tile > h2 {
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 5px;
}

.event-prog-tile{
  margin-left: 20px;
}

#program-events-list-wrapper {
  overflow-x: scroll;
  white-space: nowrap;
}
</style>
