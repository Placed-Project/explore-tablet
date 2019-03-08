<template>
  <div id="timeline">
    <div v-for="ev in datedEvents" :key="ev.event_id">{{ev.event_title}}</div>
  </div>
</template>

<script>
import parseDate from 'date-fns/parse'

export default {
  data: function () {
    return {
      placeId: 16,
      events: [],
      datedEvents: []
    }
  },
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

