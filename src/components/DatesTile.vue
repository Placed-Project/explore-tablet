<template>
  <div id="dates-tile" class="explore-tile" :class="{ 'focused-tile' : focused }" @click="focused = !focused">
    <h2>{{$t('dates-tile-label')}}</h2>
    <ul>
      <li v-for="date in revertedDates" :key="date.date_id" :class="{current : date == eventData['dates'][$store.state.currentEventDate]}">{{beautifulDateFromString(date.date_start)}}</li>
    </ul>
  </div>
</template>

<script>
import HelperMixin from '../helpers/HelperMixin'

export default {
  mixins: [HelperMixin],
  computed: {
    revertedDates () {
      return this.eventData.dates.slice().reverse()
    }
  }
}
</script>

<style>
#dates-tile {
  grid-row: span 1;
  grid-column: span 1;
  background: white;
  border-radius: 6px;
  overflow: scroll;
}

#dates-tile h2 {
  margin-top: 10px;
  margin-left: 20px;
}

#dates-tile ul {
  margin-top: 10px;
  margin-left: 20px;
  list-style-type: none;
  padding: 0;
}

.current {
  text-decoration: underline;
}
</style>
