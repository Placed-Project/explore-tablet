<template>
  <div class="series-tile grid-item image-tile tmp-img-aa">
    <img :src="eventObj" @click="zoomImg()" :class="{zoomed:zoomed}"/>
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
.tmp-img-aa {
  padding: 0;
}

img {
  max-width: 100%;
  min-width: 100%;
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
