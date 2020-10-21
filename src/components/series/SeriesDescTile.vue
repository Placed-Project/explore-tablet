<template>
  <div class="series-tile grid-item grid-item--width2" v-html="cleanedDesc"></div>
</template>

<script>
export default {
  props: [
    'eventObj'
  ],
  computed: {
    cleanedDesc: function () {
      let stepOne = this.eventObj.event_description.replace(/<a/g,'<span')
      stepOne = stepOne.replace(/width="\d+"/g, 'width="420"')
      return stepOne.replace(/<\/span>/g,'</span>')
    }
  }
}
</script>

<style scoped>

</style>
