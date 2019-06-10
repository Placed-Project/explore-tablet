<template>
  <div class="series-tile grid-item grid-item--width2" v-html="eventObj.event_description"></div>
</template>

<script>
export default {
  props: [
    'eventObj'
  ]
}
</script>

<style scoped>

</style>
