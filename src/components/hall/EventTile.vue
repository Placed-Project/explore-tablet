<template>
  <div class="hall-event-tile" v-on:click="showPopUp()">
    <div id="touch-signifier" :style="{'opacity': touchOpacity}">
      <img src="../../assets/click-touch.svg">
    </div>
    <img :src="eventImage"/>
    <h3 class="hall-event-tile-h3"> {{eventTitle}}</h3>
    <h3 class="hall-event-tile-h3-date">{{beautifulDateFromString(eventDate)}}</h3>
  </div>
</template>

<script>
import parseDate from 'date-fns/parse'
import HelperMixinVue from '../../helpers/HelperMixin.vue'
import bmlLogo from '../../assets/bml-logo.jpg'

export default {
  mixins: [
    HelperMixinVue
  ],
  props: [
    'hEventId'
  ],
  data: function () {
    return {
      eventImage: '',
      eventTitle: '',
      eventDate: '',
      eventObj: null,
      touchOpacity: 1
    }
  },
  mounted: function () {
    setInterval(() => {
      this.touchOpacity === 1 ? this.touchOpacity = 0.5 : this.touchOpacity = 1
    }, 2000)
    fetch(`${this.$store.state.libraryApiUrl}${this.hEventId}`)
      .then((resp) => {
        if (resp.ok) {
          resp.json().then((data) => {
            this.eventObj = data[0]
            this.eventImage = data[0].image_url ? data[0].image_url : bmlLogo

            this.eventTitle = data[0].event_title

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
            let d = parseDate(data[0].dates[dateindex].date_start)
            if (d < new Date()) {
              this.eventDate = (new Date()).toISOString()
            } else {
              this.eventDate = data[0].dates[dateindex].date_start
            }
          })
        }
      })
      .catch((err) => {
        console.error(err)
      })
  },
  methods: {
    showPopUp: function () {
      this.$emit('showPopUp', this.eventObj)
    }
  }
}
</script>

<style>
.hall-event-tile {
  position: relative;
  width: 100%;
  height: 30vh;
  grid-column: span 1;
}

#touch-signifier {
  margin: 10px;
  width: 80px;
  height: 80px;
  border-radius: 60px;
  position: absolute;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  transition: opacity 2s;
}

#touch-signifier > img {
  width: 60px;
  height: auto;
  margin-top: 50%;
  margin-left: 50%;
  transform: translate(-50%, -50%);
}

.hall-event-tile > img {
  max-width: 100%;
  max-height: 100%;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.hall-event-tile-h3 {
  position: relative;
  top: -300px;
  left: -8px;
  font-size: xx-large;
  -webkit-box-shadow: 0px 0px 0px 5px black;
  box-shadow: 0px 0px 0px 5px white;
  /*box-shadow: 0px 0px 0px 5px white;*/
  display: inline;
  background-color: white;
  /*background-color: white;*/
  color: #221d23;
}

.hall-event-tile-h3-date {
  position: absolute;
  font-size: x-large;
  -webkit-box-shadow: 0px 0px 0px 5px black;
  box-shadow: 0px 0px 0px 5px white;
  background-color: white;
  color: #221d23;
  right: -8px;
  bottom: 25px;
}

@media (orientation: portrait) {
.hall-event-tile-h3 {
  font-size: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
}
</style>
