<template>
  <div id="place-tile" class="explore-tile">
    <iframe
      style="width: 100%; height: 100%; border: none; pointer-events: none"
      :src="`https://maps.google.com/maps?q=${placeQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`"
      frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
  </div>
</template>

<script>
import HelperMixin from '../helpers/HelperMixin'

export default {
  mixins: [HelperMixin],
  computed: {
    placeQuery () {
      let date = this.eventData.dates[this.$store.state.currentEventDate]
      return encodeURI(/*date['place_name']+*/date['place_address']+date['place_town'])
    },
    date () {
      return this.eventData.dates[this.$store.state.currentEventDate]
    }
  }
}
</script>

<style>
#place-tile {
  grid-row: span 1;
  grid-column: span 2;
  background: white;
  border-radius: 6px;
  overflow: hidden;
}

@media (max-width: 640px) {
  #place-tile {
    grid-column: span 1;
  }
}

#place-name-h2-tile {
  margin-top: 10px;
  margin-left: 20px;
  position: absolute;
}

#event-desc-tile {
  margin-top: 10px;
  margin-left: 20px;
  text-overflow: ellipsis;
}
</style>
