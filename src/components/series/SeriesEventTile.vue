<template>
  <div class="series-event-mini-tile" v-on:click="showPopUp()">
    <h3 class="series-event-mini-tile-h3">{{eventObj.event_title}}</h3>
    <img v-if="eventObj.focused" src="../../assets/selected.svg" class="series-selected"/>
    <img :src="imageSrc" class="series-event-img"/>
    <div v-for="date in eventObj.dates" :key="date.date_id" class="series-date-box" :class="{seriesupcoming: (new Date()).getTime() < (new Date(eventObj.dates[0].date_start)).getTime()}">
      {{(new Date(date.date_start)).toLocaleDateString('da', { year: 'numeric', month: 'long', day: 'numeric' })}}
    </div>
  </div>
</template>

<script>
import bmlLogo from '../../assets/bml-logo.jpg'

export default {
  props: [
    'eventObj'
  ],
  data: function () {
    return {
      currentWeek: false
    }
  },
  computed: {
    imageSrc: function () {
      return this.eventObj.image_url ? this.eventObj.image_url : bmlLogo
    }
  },
  methods: {
    showPopUp: function () {
      this.$emit('choosed', this.eventObj)
      this.eventObj.focused = true
    }
  },
  mounted: function () {
    let getWeekNumber = function(d) {
      // Copy date so don't modify original
      d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      // Set to nearest Thursday: current date + 4 - current day number
      // Make Sunday's day number 7
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
      // Get first day of year
      var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
      // Calculate full weeks to nearest Thursday
      var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
      // Return array of year and week number
      return weekNo;
    }

    if (getWeekNumber(new Date(this.eventObj.dates[0].date_start)) === getWeekNumber(new Date())) {
      this.currentWeek = true
      this.$emit('choosed', this.eventObj)
      this.eventObj.focused = true
    } else {
      this.currentWeek = false
    }

    setInterval(() => {
      if (getWeekNumber(new Date(this.eventObj.dates[0].date_start)) === getWeekNumber(new Date())) {
        this.currentWeek = true
        this.$emit('choosed', this.eventObj)
        this.eventObj.focused = true
      } else {
        this.currentWeek = false
      }
    }, 60000*10)
  }
}
</script>

<style>
.series-event-mini-tile {
  position: relative;
  width: 63%;
  margin-left: 20%;
  margin-bottom: 40px;
  background-color: rgb(253, 254, 255);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.series-event-img {
  max-width: 100%;
  min-width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
}

.series-event-mini-tile-h3 {
  overflow: hidden;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  color: #221d23;
  margin-bottom: 2px;
}

.series-selected {
  position: absolute;
  left: -32%;
  width: 32%;
}

.series-date-box {
  background-color: #E8E8E8;
  text-align: center;
  border-radius: 6px;
  padding-top: 13px;
  padding-bottom: 10px;
  margin-top: 10px;
}

.seriesupcoming {
  background-color: #4AA4FF;
}

@media (orientation: portrait) {
.series-event-mini-tile-h3 {
  font-size: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
}
</style>
