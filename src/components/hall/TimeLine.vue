<template>
  <div id="timeline">
    <div id="line"></div>
    <div id="tick" :style="{'top': `${position}%`}"></div>
    <svg id="down-arrow" :style="{'opacity': `${arrowOpac}`}" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" x="0px" y="0px" viewBox="0 0 100 125"><g transform="translate(0,-952.36218)"><path d="m 50.000068,1029.3618 c 0.7149,-0.028 1.5413,-0.3223 2.0625,-0.8125 l 18.99996,-18.0001 c 1.24529,-1.051 1.22032,-3.0729 0.0982,-4.2545 -1.12211,-1.1816 -3.10929,-1.2786 -4.2232,-0.089 l -13.9375,13.1875 0,-41.03125 c 0,-1.6568 -1.34316,-3 -2.99996,-3 -1.6569,0 -3,1.3432 -3,3 l 0,41.03125 -13.9375,-13.1875 c -1.114,-1.1894 -3.1096,-1.092 -4.2317,0.09 -1.1221,1.1816 -1.127,3.2322 0.1067,4.2541 l 19,18.0001 c 0.5818,0.5475 1.2604,0.8045 2.0625,0.8125 z" style="text-indent:0;text-transform:none;direction:ltr;block-progression:tb;baseline-shift:baseline;color:#eee;enable-background:accumulate;" fill="#ffffff" fill-opacity="1" stroke="none" marker="none" visibility="visible" display="inline" overflow="visible"/></g></svg>
    <h3>Agenda</h3>
    <div v-for="(val, key, index) in sortedEvents" :key="index" class="day-wrapper">
      <span class="day-label" :uselessAtt="index">{{beautifulDateFromString(new Date(parseInt(key)).toDateString())}}</span>
      <div class="tiles-day-wrapper">
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
      sortedEvents: {},
      position: 0,
      arrowOpac: 1
    }
  },
  components: {
    EventMiniTile
  },
  mixins: [
    HelperMixin
  ],
  mounted: function () {
    document.querySelector('#timeline').addEventListener('scroll', ev => {
      this.position = document.querySelector('#timeline').scrollTop / (document.querySelector('#timeline').scrollHeight - document.querySelector('#timeline').offsetHeight) * 100
      this.arrowOpac = 1 - document.querySelector('#timeline').scrollTop/200
    })
    fetch(`${this.$store.state.libraryApiUpcoming}${this.placeId}`)
      .then(resp => {
        return resp.json()
      })
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
          .then(data => {
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
            let dayTime = date.getTime() - date.getHours()*60*60*1000 - date.getMinutes()*60*1000 - date.getSeconds()*1000 - date.getMilliseconds()
            let dayString = `${dayTime}`
            if (!self.sortedEvents[dayString]) {
              // self.sortedEvents[dayString] = {}
              self.$set(self.sortedEvents, dayString, {})
            }
            // self.sortedEvents[dayString][tmpEv.event_id] = tmpEv
            self.$set(self.sortedEvents[dayString], tmpEv.event_id, tmpEv)
          })
      }

      for (let index = 0; index < self.events.length; index++) {
        const event = self.events[index]
        await gatherDate(event.event_id, index)
      }
    }
  }
}
</script>

<style>
#timeline {
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  height: 100vh;
  width: 36vw;
  background-color: #221d23;
}

#timeline > h3 {
  font-size: 30px;
  font-weight: 400;
  font-family: 'Lora';
  line-height: 69px;
  height: 79px;
  margin-left: 80px;
  margin-top: 110px;
  margin-bottom: -40px;
  color: #efeee7;
}

#down-arrow {
  position: fixed;
  bottom: 0px;
  right: 10px;
  width: 60px;
}

#tick {
  position: fixed;
  margin-top: -2px;
  right: 3px;
  width: 10px;
  height: 4px;
  background-color: rgb(253, 254, 255);
}

#line {
  position: fixed;
  top: 0px;
  right: 5px;
  bottom: 0;
  width: 4px;
  height: 100%;
  background-color: rgb(253, 254, 255);
}

.day-wrapper {
  margin: 10px;
  margin-right: 150px;
  margin-left: 80px;
  margin-top: 30px;
}

.tiles-day-wrapper {
  padding-top: 10px;
}

.day-label {
  font-size: 20px;
  font-weight: bold;
  color: rgb(253, 254, 255);
  /*background-color: black;*/
}
</style>
