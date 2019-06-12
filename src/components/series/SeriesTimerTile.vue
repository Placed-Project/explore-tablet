<template>
  <div class="series-tile grid-item">
    <div class="series-tile-header"><img src="../../assets/timer-icon.svg"/> &nbsp; {{$t('series-timer-tile-header')}}</div>
    <div class="series-tile-textpostheader">
      
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'eventObj'
  ]
}
</script>

<style scoped>
.series-tile-header > img {
  filter: invert(1);
}
</style>