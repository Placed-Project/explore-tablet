<template>
  <div class="series-tile grid-item img-com-tile">
    <img :src="comobj.img" @click="zoomImg()" :class="{zoomed:zoomed}"/>
    <div>{{comobj.text}}</div>
  </div>
</template>

<script>
export default {
  props: [
    'comobj'
  ]
}
</script>

<style scoped>

img {
  max-width: 100%;
  min-width: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.img-com-tile {
  padding: 0;
}

.img-com-tile > div {
  padding: 20px;
}
</style>
