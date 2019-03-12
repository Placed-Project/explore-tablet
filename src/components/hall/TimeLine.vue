<template>
  <div id="timeline">
    <div id="line"></div>
    <div v-for="(val, key, index) in sortedEvents" :key="index" class="day-wrapper">
      <span class="day-label" :uselessAtt="index">{{beautifulDateFromString(key)}}</span>
      <div>
        <EventMiniTile v-for="ev in val" :key="ev.event_id" :eventObj="ev" @showPopUp="relayPopUp"></EventMiniTile>
      </div>
    </div>
  </div>
</template>

<script>
import parseDate from 'date-fns/parse'
import HelperMixin from '../../helpers/HelperMixin.vue'
import EventMiniTile from './EventMiniTile'

export default {
  data: function () {
    return {
      placeId: 16,
      events: [],
      datedEvents: [],
      sortedEvents: {}
    }
  },
  components: {
    EventMiniTile
  },
  mixins: [
    HelperMixin
  ],
  mounted: function () {
    fetch(`${this.$store.state.libraryApiUpcoming}${this.placeId}`)
      .then((resp => {
        return resp.json()
      }))
      .catch((err) => {
        console.error(err)
        return Promise()
      })
      .then((data) => {
        if (data) {
          this.events = data
          this.populateDates()
        }
      })
  },
  methods: {
    relayPopUp: function (id) {
      this.$emit('showPopUp', id)
    },
    populateDates: async function () {
      let self = this
      let gatherDate = async function (eventId, index) {
        await fetch(`${self.$store.state.libraryApiUrl}${eventId}`)
          .then((resp) => {
            return resp.json()
          })
          .then((data => {
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
            let tmpEv = self.events[index]
            tmpEv.date = data[0].dates[dateindex]
            tmpEv.image_url = data[0].image_url
            self.datedEvents.push(tmpEv)
            // Add key to sortedEvents if necessary
            let date = parseDate(tmpEv.date.date_start)
            if (date < new Date()) {
              date = new Date()
            }
            let dayString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
            if (!self.sortedEvents[dayString]) {
              //self.sortedEvents[dayString] = {}
              self.$set(self.sortedEvents, dayString, {})
            }
            //self.sortedEvents[dayString][tmpEv.event_id] = tmpEv
            self.$set(self.sortedEvents[dayString], tmpEv.event_id, tmpEv)
          }))
      }

      for (let index = 0; index < self.events.length; index++) {
        const event = self.events[index];
        await gatherDate(event.event_id, index)
      }
    }
  }
}
</script>

<style>
#timeline {
  overflow: scroll;
  position: relative;
  height: 100vh;
  width: 36vw;
  background-color: #fffdf4;
}

#line {
  position: fixed;
  top: 0px;
  right: calc(36vw - 15px);
  bottom: 0;
  width: 4px;
  height: 100%;
  background-color: black;
}

.day-wrapper {
  margin: 10px;
  margin-left: 30px;
  margin-top: 30px;
}

.day-label {
  font-size: 20px;
  font-weight: bold;
  color: black;
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: #fffdf4;
}
</style>

