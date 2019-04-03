<template>
  <div id="desc-tile" class="explore-tile" :class="{ 'focused-tile' : focused }" @click="focused = !focused">
    <div class="event-desc-tile event-short-desc" v-html="eventData['event_description_courte']"></div>
    <p class="desc-learnmore" v-if="!focused">{{$t('learn-more-label')}}</p>
    <div v-if="focused" class="event-desc-tile" v-html="eventData['event_description']"></div>
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
  grid-row: span 4;
  grid-column: span 2;
  background: white;
  border-radius: 6px;
  overflow: scroll;
  position: relative;
}

#desc-tile.focused-tile {
  position: fixed;
}

#event-title-h2-tile {
  margin-top: 10px;
  margin-left: 20px;
}

.desc-learnmore {
  margin-left: 20px;
  position: absolute;
  right: 20px;
  bottom: 5px;
}

.event-desc-tile {
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 40px;
}

.event-short-desc {
  line-height: 1.5em;
  max-height: calc(7 * 1.5em);
  overflow: hidden;
}

@media (max-width: 640px) {
.event-short-desc {
  max-height: calc(3 * 1.5em);
}
}

</style>
