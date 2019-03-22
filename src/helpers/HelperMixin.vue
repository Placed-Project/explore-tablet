<script>
import parseDate from 'date-fns/parse'
export default {
  data: function () {
    return {
      focused: false
    }
  },
  methods: {
    beautifulDateFromString: function (dateString) {
      let dateObject = parseDate(dateString)
      return `${this.$t('week-day-' + dateObject.getDay())} ${dateObject.getDate()} ${this.$t('month-' + dateObject.getMonth())} ${dateObject.getFullYear()}`
    },
    beautifulDateTimeFromString: function (dateString) {
      let dateObject = parseDate(dateString)
      return `${this.$t('week-day-' + dateObject.getDay())} ${dateObject.getDate()} ${this.$t('month-' + dateObject.getMonth())} ${dateObject.getFullYear()}, ${dateObject.getHours()}:${("0" + dateObject.getMinutes()).slice(-2)}`
    },
    currentDateEndtime: function (datesArray) {
      let dateindex = 0
      for (let i = 0; i < datesArray.length; i++) {
        let date = parseDate(datesArray[i].date_start)
        if ((new Date()) < date) {
          dateindex = i
          break
        } else if (i === datesArray.length - 1) {
          dateindex = i
          break
        }
      }

      return parseDate(datesArray[dateindex].date_end)
    }
  },
  computed: {
    eventData () {
      return this.$store.state.eventData
    },
    eventId () {
      return this.$store.state.currentEventId
    },
    beautifulDate () {
      let dateObject = parseDate(this.eventData['dates'][this.$store.state.currentEventDate]['date_start'])
      return `${this.$t('week-day-' + dateObject.getDay())} ${dateObject.getDate()} ${this.$t('month-' + dateObject.getMonth())} ${dateObject.getFullYear()}`
    }
  }
}
</script>
