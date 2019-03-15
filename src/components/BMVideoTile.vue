<template>
  <div class="explore-tile bmlvideo-tile" :class="{ 'focused-tile' : focused }" @click="focused = !focused">
    <h2 v-if="!focused" class="bmlvideo-h2-tile">{{link.label.slice(2)}}</h2>
    <img v-if="!focused" src="../assets/triangle.svg">
    <div v-if="focused">
      <video controls width="100%">
        <source :src="videoURL" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
import HelperMixinVue from '../helpers/HelperMixin.vue'
import LinksListMixinVue from '../helpers/LinksListMixin.vue'

export default {
  mixins: [HelperMixinVue, LinksListMixinVue],
  props: [
    'link'
  ],
  data: function () {
    return {
      videoURL: ''
    }
  },
  mounted: function () {
    fetch(this.link.url)
      .then(t => {
        return t.text()
      })
      .then(text => {
        this.videoURL = text.match(/.*<a class='download_video' .* href="(.*)" .*>.*<\/a>.*/)[1]
      })
  },
  computed: {
    feed () {
      return encodeURI(this.link.url)
    }
  }
}
</script>

<style>
.bmlvideo-tile {
  grid-row: span 2;
  grid-column: span 1;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  background-color: #3674D1;
}

.bmlvideo-tile.focused-tile {
  background-color: #221d23;
  position: fixed;
}

.bmlvideo-tile img {
  position: absolute;
  height: 75%;
  margin-left: 55%;
  margin-top: 12px;
  transform: translate(-50%, 0);
  z-index: 2;
}

.bmlvideo-tile h2 {
  position: absolute;
  background-color: #221d2388;
  color: white;
  margin-top: 10px;
  margin-left: 20px;
  font-size: 16px;
  font-weight: 700;
  z-index: 3;
}

</style>
