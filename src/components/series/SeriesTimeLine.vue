<template>
  <div id="series-timeline">
    <div id="line"></div>
    <div id="tick" :style="{'top': `${position}%`}"></div>
    <svg id="down-arrow" :style="{'opacity': `${arrowOpac}`}" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" x="0px" y="0px" viewBox="0 0 100 125"><g transform="translate(0,-952.36218)"><path d="m 50.000068,1029.3618 c 0.7149,-0.028 1.5413,-0.3223 2.0625,-0.8125 l 18.99996,-18.0001 c 1.24529,-1.051 1.22032,-3.0729 0.0982,-4.2545 -1.12211,-1.1816 -3.10929,-1.2786 -4.2232,-0.089 l -13.9375,13.1875 0,-41.03125 c 0,-1.6568 -1.34316,-3 -2.99996,-3 -1.6569,0 -3,1.3432 -3,3 l 0,41.03125 -13.9375,-13.1875 c -1.114,-1.1894 -3.1096,-1.092 -4.2317,0.09 -1.1221,1.1816 -1.127,3.2322 0.1067,4.2541 l 19,18.0001 c 0.5818,0.5475 1.2604,0.8045 2.0625,0.8125 z" style="text-indent:0;text-transform:none;direction:ltr;block-progression:tb;baseline-shift:baseline;color:#eee;enable-background:accumulate;" fill="#ffffff" fill-opacity="1" stroke="none" marker="none" visibility="visible" display="inline" overflow="visible"/></g></svg>
    <h1 v-html="seriesTitle"></h1>
    <div id="series-timeline-lead"></div>
    <SeriesEventTile v-for="ev in sortedEvents" :key="ev.eventdata.event_id" :eventObj="ev" @choosed="relayChoosed" :lastFocusedIndex="lastFocusedIndex"></SeriesEventTile>
  </div>
</template>

<script>
import parseDate from 'date-fns/parse'
import HelperMixin from '../../helpers/HelperMixin.vue'
//import EventMiniTile from '../hall/EventMiniTile'
import SeriesEventTile from './SeriesEventTile'

let getWeekNumber = function(d) {
  d = parseDate(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  var yearStart = parseDate(Date.UTC(d.getUTCFullYear(),0,1));
  var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
  return weekNo;
}

export default {
  data: function () {
    return {
      placeId: 132,
      bibId: 132,
      sortedEvents: [],
      position: 0,
      arrowOpac: 1,
      autoGoUpTimer: -1,
      lastFocusedIndex: -1
    }
  },
  components: {
    SeriesEventTile
  },
  mixins: [
    HelperMixin
  ],
  created: function () {
      this.bibId = this.placeId
  },
  mounted: function () {
    document.querySelector('#series-timeline').addEventListener('scroll', ev => {
      this.position = document.querySelector('#series-timeline').scrollTop / (document.querySelector('#series-timeline').scrollHeight - document.querySelector('#series-timeline').offsetHeight) * 100
      this.arrowOpac = 1 - document.querySelector('#series-timeline').scrollTop / 200
      if (this.autoGoUpTimer > 0) {
        clearTimeout(this.autoGoUpTimer)
      }
      this.autoGoUpTimer = setTimeout(() => {
        for (const ev of this.sortedEvents) {
          if (ev.focused) {
            let element = document.querySelector(`#a${ev.eventdata.event_id}`)
            element.scrollIntoView()
            document.querySelector('#series-timeline').scrollBy(0, -200)
          }
        }
      }, 60000*15)
    })
    setInterval(() => {
          fetch(`${this.$store.state.wsUrl}`)
            .then(resp => {
              return resp.json()
            })
            .catch((err) => {
              console.error(err)
              //return new Promise()
            })
            .then((data) => {
              if (data) {
                for (let ev of data.events) {
                  ev.focused = false
                }

                this.sortedEvents = data.events

                this.sortedEvents.sort((a, b) => {
                  return parseInt((parseDate(b.eventdata.dates[0].date_start)).getTime()) - parseInt((parseDate(a.eventdata.dates[0].date_start)).getTime())
                })

                let validIndex = -1
                for (let index = 0 ; index < this.sortedEvents.length ; index++) {
                  if (parseDate(this.sortedEvents[index].eventdata.dates[0].date_start) < (new Date())) {
                    validIndex = index
                  } else {
                    // if we reached a future event
                    break
                  }
                }
                if (validIndex >= 0) {
                  this.sortedEvents[validIndex].focused = true
                  this.lastFocusedIndex = validIndex
                }
                

                /*
                for (const ev of this.sortedEvents) {
                  if (ev.eventdata.focused) {
                    let element = document.querySelector(`#a${ev.eventdata.event_id}`)
                    element.scrollIntoView()
                    document.querySelector('#series-timeline').scrollBy(0, -200)
                  }
                }
                */
              }
            })
      }, 200000)
    fetch(`${this.$store.state.wsUrl}`)
      .then(resp => {
        return resp.json()
      })
      .catch((err) => {
        console.error(err)
        //return new Promise()
      })
      .then((data) => {
        if (data) {
          for (let ev of data.events) {
            ev.focused = false
          }

          this.sortedEvents = data.events

          this.sortedEvents.sort((a, b) => {
            return parseInt((parseDate(b.eventdata.dates[0].date_start)).getTime()) - parseInt((parseDate(a.eventdata.dates[0].date_start)).getTime())
          })

          let validIndex = -1
          for (let index = 0 ; index < this.sortedEvents.length ; index++) {
            if (parseDate(this.sortedEvents[index].eventdata.dates[0].date_start) < (new Date())) {
              validIndex = index
            } else {
              // if we reached a future event
              break
            }
          }
          if (validIndex >= 0) {
            this.sortedEvents[validIndex].focused = true
            this.lastFocusedIndex = validIndex
          }
          

          /*
          for (const ev of this.sortedEvents) {
            if (ev.eventdata.focused) {
              let element = document.querySelector(`#a${ev.eventdata.event_id}`)
              element.scrollIntoView()
              document.querySelector('#series-timeline').scrollBy(0, -200)
            }
          }
          */
        }
      })
  },
  computed: {
    seriesTitle: function () {
      if (window.location.hostname === 'aa.placed.eu') {
        return 'KREAværksted'
      } else if (window.location.hostname === 'lb.placed.eu') {
        return 'Lundby bibliotek'
      } else if (window.location.hostname === 'mm.placed.eu') {
        return 'Mini Maker Faire'
      } else if (window.location.hostname === 'localhost') {
        return 'Lundby bibliotek'
      }
    }
  },
  methods: {
    relayChoosed: function (obj) {
      this.$emit('choosed', obj)
      this.lastFocusedIndex = this.sortedEvents.indexOf(obj)
      for(let ev of this.sortedEvents) {
        if (ev.eventdata.event_id != obj.eventdata.event_id) {
          ev.focused = false
        }
      }
    },
    fillSortedEvents: function (data) {
      for (let ev of data.events) {
        ev.focused = false
      }

      this.sortedEvents = data.events

      this.sortedEvents.sort((a, b) => {
        return parseInt((parseDate(b.eventdata.dates[0].date_start)).getTime()) - parseInt((parseDate(a.eventdata.dates[0].date_start)).getTime())
      })

      let focusedExists = false
      if (this.lastFocusedIndex >= 0) {
        this.sortedEvents[this.lastFocusedIndex].focused = true
        focusedExists = true
      }

      if (!focusedExists) {
        let validIndex = -1
        for (let index = 0 ; index < this.sortedEvents.length ; index++) {
          if (parseDate(this.sortedEvents[index].eventdata.dates[0].date_start) < (new Date())) {
            validIndex = index
          } else {
            // if we reached a future event
            break
          }
        }
        if (validIndex >= 0) {
          this.sortedEvents[validIndex].focused = true
          this.lastFocusedIndex = validIndex
        }
      }
    }
  }
}
</script>

<style>
#series-timeline {
  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute;
  width: -webkit-fill-available;
  height: 100vh;
  background-color: white;
}

#series-timeline-lead {
  height: 160px;
}

#series-timeline > h1 {
  font-family: 'Myriad';
    font-weight: bold;
    font-size: 2.5vw;
    line-height: 54px;
    height: 125px;
    width: -webkit-fill-available;
    padding-left: 5%;
    padding-top: 30px;
    position: fixed;
    z-index: 5;
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.75) 54.17%, rgba(255, 255, 255, 0.6) 70.83%, rgba(255, 255, 255, 0) 100%);
    margin: 0;
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
  background-color: #E8E8E8;
}

#line {
  position: fixed;
  top: 0px;
  right: 5px;
  bottom: 0;
  width: 4px;
  height: 100%;
  background-color: #E8E8E8;
}
</style>
