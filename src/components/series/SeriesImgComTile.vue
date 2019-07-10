<template>
  <div class="series-tile grid-item img-com-tile">
    <img class="series-tile-img" v-if="comobj.img" :src="comobj.img" @click="zoomImg()" :class="{zoomed:zoomed}"/>
    <div v-if="comobj.vid">
      <video :src="comobj.vid" :id="'a'+comobj.id+comobj.time"></video>
      <div class="controls" v-if="!playing" @click="playPause"><img src="../../assets/triangle.svg"></div>
    </div>
    <div class="series-img-close-button" @click="zoomImg()" v-if="zoomed"><img src="../../assets/close.svg"></div>
    <div class="series-tile-text" v-html="comobj.text"></div>
  </div>
</template>

<script>
export default {
  props: [
    'comobj'
  ],
  data: function () {
    return {
      zoomed: false,
      playing: false
    }
  },
  methods: {
    zoomImg: function () {
      this.zoomed = !this.zoomed
    },
    playPause: function () {
      let media = document.querySelector(`#a${this.comobj.id+this.comobj.time}`)
      if (media.paused) {
        media.play()
        this.playing = true
        media.controls = true
      }
      media.addEventListener('pause', () => {
        this.playing = false
        media.controls = false
      })
    }
  }
}
</script>

<style scoped>

.series-tile-img {
  max-width: 100%;
  min-width: 100%;
  object-fit: cover;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
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
}

.img-com-tile {
  padding: 0;
  width: 220px;
}

.img-com-tile .series-tile-text {
  padding: 20px;
}

.controls {
  position: absolute;
  transform: translate(20px, -120%);
}

.controls img {
  width: 50px;
}
</style>
