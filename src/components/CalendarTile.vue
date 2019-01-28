<template>
  <div id="calendar-tile" class="explore-tile" @click="dlICS()">
    <h2 id="calendar-h2-tile">{{$t("calendar-label")}}</h2>
    <img src="https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"/>
  </div>
</template>

<script>
import HelperMixinVue from '../helpers/HelperMixin.vue'
import { saveAs } from 'file-saver'
import ical from 'ical-generator'
import parseDate from 'date-fns/parse'

export default {
  mixins: [HelperMixinVue],
  computed: {
    date () {
      return this.eventData.dates[this.$store.state.currentEventDate]
    }
  },
  methods: {
    dlICS: function () {
      const cal = ical({ domain: 'placexplore.eu', name: 'Test' })
      cal.createEvent({
        start: parseDate(this.eventData['dates'][this.$store.state.currentEventDate]['date_start']),
        end: parseDate(this.eventData['dates'][this.$store.state.currentEventDate]['date_end']),
        summary: this.eventData['event_title'],
        description: this.eventData['event_description_courte'],
        location: `${this.date['place_name']}
                   ${this.date['place_address']}
                   ${this.date['place_zipcode']}
                   ${this.date['place_town']}`
      })

      var fileName = `event-${this.$store.state.currentEventId}.ics`

      saveAs(new File([cal.toString()], fileName, { type: 'text/calendar' }))
    }
  }
}
</script>

<style>

#calendar-tile {
  grid-row: span 1;
  grid-column: span 1;
  background: white;
  border-radius: 6px;
  overflow: hidden;
}

#calendar-tile img {
  object-fit: contain;
}

#calendar-h2-tile {
  margin-top: 10px;
  margin-left: 20px;
  position: absolute;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  max-width: 20%;
}

@media (max-width: 640px) {
  #calendar-h2-tile {
    max-width: 80%;
  }
}
</style>
