<template>
  <div class="series-tile grid-item">
    <div class="series-tile-header"><img src="../../assets/placeholder.svg"/> &nbsp; {{$t('series-place-tile-header')}}</div>
    <div class="series-tile-textpostheader">{{$t('series-place-tile-text')}}<strong>{{eventObj.dates[0].place_name}}</strong></div>
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