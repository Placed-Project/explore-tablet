<template>
  <div id="desc-tile" class="explore-tile" :class="{ 'focused-tile' : focused }" @click="focused = !focused">
    <div class="event-desc-tile" v-html="eventData['event_description_courte']"></div>
    <div class="event-desc-tile" v-html="eventData['event_description']"></div>
  </div>
</template>

<script>
import HelperMixin from '../helpers/HelperMixin'

export default {
  mixins: [HelperMixin]
}
</script>

<style>
#desc-tile {
  grid-row: span 2;
  grid-column: span 1;
  background: white;
  border-radius: 6px;
  overflow: scroll;
}

#event-title-h2-tile {
  margin-top: 10px;
  margin-left: 20px;
}

.event-desc-tile {
  margin-top: 10px;
  margin-left: 20px;
}
</style>
