<template>
  <div class="series-tile grid-item img-com-tile" @click="expandRecette" v-lazy-container="{selector:'img'}">
    <img class="series-tile-img" v-if="comobj.img" :data-src="comobj.img" :class="{zoomed:zoomed}"/>
    <div v-if="comobj.vid">
      <video :src="comobj.vid" :id="'a'+comobj.id+comobj.time" preload="metadata"></video>
      <div class="controls" v-if="!playing" @click="playPause"><img src="../../assets/triangle.svg"></div>
    </div>
    <div class="series-img-close-button" @click="zoomImg()" v-if="zoomed"><img src="../../assets/close.svg"></div>
    <div class="series-tile-text">
      <div class="series-tile-title" v-html="recetteObj.title"></div>
      <em class="series-tile-author" v-html="recetteObj.author"></em>
      <div class="atable-recette-button">Lire la recette</div>
    </div>
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
    },
    expandRecette: function () {
      this.$emit('expand-recette', this.comobj)
    }
  },
  computed: {
    totalVotes: function () {
      if (this.comobj.poll) {
        let total = 0
        for (const ans of this.comobj.poll) {
          total += ans.votes
        }
        return total
      }
    },
    recetteObj: function (){
      let recetteObj = {
        title: '',
        author: '',
        content: null
      }
      if (this.comobj.text) {
        let element = document.createElement('div')
        element.innerHTML = this.comobj.text
        recetteObj.title = element.childNodes[0].innerText
        recetteObj.author = element.childNodes[1].innerText
        element.childNodes[0].remove()
        element.childNodes[0].remove()
        recetteObj.content = element
      }

      return recetteObj
    }
  }
}
</script>

<style scoped>

.poll-answer {
  border-radius: 1em;
  background-color: grey;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 10px;
}

.poll-answer .progress-bar {
  background-color: #4AA4FF;
  border-radius: 1em;
  color: white;
  overflow: visible;
  white-space: nowrap;
  padding-left: 5px;
}

.series-tile-img {
  max-width: 100%;
  min-width: 100%;
  height: 100px;
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
  background-color: #4AA4FF;
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

.series-tile-title {
  font-weight: bold;
}

.atable-recette-button {
  background-color: white;
  border-radius: 30px;
  color: #3e0449;
  text-align: right;
  width: max-content;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 20px;
}
</style>
