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
    }
  },
  computed: {
    eventData () {
      return this.$store.state.eventData
    },
    beautifulDate () {
      let dateObject = parseDate(this.eventData['dates'][this.$store.state.currentEventDate]['date_start'])
      return `${this.$t('week-day-' + dateObject.getDay())} ${dateObject.getDate()} ${this.$t('month-' + dateObject.getMonth())} ${dateObject.getFullYear()}`
    }
  }
}
</script>
