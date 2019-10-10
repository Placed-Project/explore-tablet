<template>
  <div class="series-tile grid-item book-tile">
    <img v-if="book.img" :src="book.img" @click="zoomImg()" :class="{zoomed:zoomed}" class="img-book-tile"/>
    <div class="series-img-close-button" @click="zoomImg()" v-if="zoomed"><img src="../../assets/close.svg"></div>
    <div v-html="book.title" class="book-title"></div>
  </div>
</template>

<script>
export default {
  props: [
    'book'
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

.img-book-tile {
  max-width: 80%;
  min-width: 80%;
  object-fit: cover;
  margin: 10%;
}

video {
  max-width: 100%;
  min-width: 100%;
  object-fit: cover;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}


img.zoomed {
  z-index: 25;
  width: auto;
  max-width: 80vw;
  max-height: 80vh;
  min-width: 0;
  min-height: 80vh;
  position: fixed;
  top: 10vh;
  left: 10vw;
  box-shadow: 0px 0px 41px 35px #545454;
  margin: 0;
}

.book-tile {
  padding: 0;
  width: 220px;
}

.book-title {
  padding: 20px;
}

</style>
