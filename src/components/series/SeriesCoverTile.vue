<template>
  <div id="series-cover-tile" class="series-tile grid-item image-tile">
    <img :src="eventObj.image_url"/>
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
#series-cover-tile {
  padding: 0;
}

img {
  max-width: 100%;
  min-width: 100%;
  object-fit: cover;
  border-radius: 6px;
}
</style>
