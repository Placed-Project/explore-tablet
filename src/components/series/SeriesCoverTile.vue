<template>
  <div id="series-cover-tile" class="series-tile grid-item image-tile">
    <img :src="eventObj.image_url" @click="zoomImg()" :class="{zoomed:zoomed}"/>
    <div class="series-img-close-button" @click="zoomImg()" v-if="zoomed"><img src="../../assets/close.svg"></div>
  </div>
</template>

<script>
export default {
  props: [
    'eventObj'
  ],
  data: function () {
    return {
      zoomed: false
    }
  },
  methods: {
    zoomImg: function () {
      this.zoomed = !this.zoomed
    }
  }
}
</script>

<style scoped>
#series-cover-tile {
  padding: 0;
  width: 220px;
}

img {
  max-width: 100%;
  object-fit: cover;
  border-radius: 6px;
}

img.zoomed {
  z-index: 25;
  width: 80vw;
  max-width: 80vw;
  max-height: 80vh;
  min-width: 80vw;
  min-height: 80vh;
  position: fixed;
  top: 10vh;
  left: 10vw;
  box-shadow: 0px 0px 41px 35px #545454;
}
</style>
