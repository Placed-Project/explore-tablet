<template>
  <div class="grid-item grid-item--width5">
    <h1>{{eventObj.event_title}}</h1>
    <div class="series-time-flexwrapper">
      <div class="series-time-title">{{(parseDate(activeDate.date_start)).toLocaleDateString('da', { year: 'numeric', month: 'long', day: 'numeric' })}}</div>
      <div class="series-time-title stick-right">{{(parseDate(activeDate.date_start)).getHours()}}:{{("0"+(parseDate(activeDate.date_start)).getMinutes()).slice(-2)}} - {{(parseDate(activeDate.date_end)).getHours()}}:{{("0"+(parseDate(activeDate.date_end)).getMinutes()).slice(-2)}}</div>
    </div>
  </div>
</template>

<script>
import parseDate from 'date-fns/parse'

export default {
  props: [
    'eventObj'
  ],
  computed: {
    activeDate: function () {
      let now = new Date()
      // dates are sorted from bigger to smaller
      for (let index = this.eventObj.dates.length -1; index >= 0 ; index--) {
        const date = this.eventObj.dates[index];
        if (index === 0) {
          return date
        } else {
          if (now < parseDate(date.date_start)) {
            return date
          }
        }
      }
    }
  },
  methods: {
    parseDate: function (string) {
      return parseDate(string)
    }
  }
}
</script>

<style scoped>
h1 {
  font-style: normal;
  font-weight: bold;
  font-size: 4vw;
  line-height: 54px;
}

.series-time-title {
  font-style: normal;
  font-weight: normal;
  font-size: 35px;
  line-height: 42px;
}

.series-time-flexwrapper {
  display: flex;
  justify-content: space-between;
}
</style>
