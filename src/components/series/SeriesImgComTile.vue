<template>
  <div class="series-tile grid-item img-com-tile">
    <img class="series-tile-img" v-if="comobj.img" :src="comobj.img" @click="clickaelem();zoomImg()" :class="{zoomed:zoomed}"/>
    <img class="series-tile-img" v-if="thumbImg" :src="thumbImg" @click="clickaelem"/>
    <div v-if="comobj.vid">
      <video :src="comobj.vid" :id="'a'+comobj.id+comobj.time" preload="metadata"></video>
      <div class="controls" v-if="!playing" @click="playPause"><img src="../../assets/triangle.svg"></div>
    </div>
    <div v-if="comobj.poll">
      <div v-for="answer in comobj.poll" :key="answer.answer" class="poll-answer">
        <div class="progress-bar" :style="{width: (answer.votes/totalVotes)*100 + '%'}">
          {{answer.votes}} {{answer.answer}}
        </div>
      </div>
    </div>
    <div class="series-img-close-button" @click="zoomImg()" v-if="zoomed"><img src="../../assets/close.svg"></div>
    <div v-if="vidurl">
      <video :src="vidurl" :id="'a'+comobj.id+comobj.time" preload="metadata"></video>
      <div class="controls" v-if="!playing" @click="playPause"><img src="../../assets/triangle.svg"></div>
    </div>
    <div v-if="ytVid">
      <iframe width="100%" height="200" :src="`https://www.youtube.com/embed/${ytVid}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div v-if="soundcloudfeed">
      <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" :src="`https://w.soundcloud.com/player/?url=${soundcloudfeed}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`"></iframe>
    </div>
    <div class="series-tile-text" v-html="comobj.text"></div>
    <div class="series-tile-librarian" v-if="false">{{$t('series-place-tile-librarian')}}</div>
  </div>
</template>

<script>
import influxImg from '../../assets/influx.jpg'
import linkImg from '../../assets/arrow.jpg'
import bmImg from '../../assets/bml-logo.jpg'

export default {
  props: [
    'comobj'
  ],
  data: function () {
    return {
      zoomed: false,
      playing: false,
      vidurl: null,
      ytVid: null,
      thumbImg: null,
      soundcloudfeed: null
    }
  },
  methods: {
    clickaelem: function () {
      this.$el.querySelector('a').click()
    },
    zoomImg: function () {
      this.zoomed = !this.zoomed
    },
    playPause: function () {
      let media = document.querySelector(`#a${this.comobj.id + this.comobj.time}`)
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
    upgradeVignette: function () {
      if (this.comobj.img) {
        return
      }

      // Test BmlVideo
      let bmlvid = this.comobj.text.match(/.*(www\.bm-lyon\.fr\/spip\.php\?page=video&id_video=[0-9]+).*/)
      //console.log(bmlvid)
      if (bmlvid) {
        fetch('https://' + bmlvid[1])
          .then(t => {
            return t.text()
          })
          .then(text => {
            console.log(text)
            let res = text.match(/.*<a class='download_video' .* href="(.*)" .*>.*<\/a>.*/)[1]
            this.vidurl = res
          })
      }
      let influx = this.comobj.text.match(/.*linflux\.com.*/)
      if (influx) {
        this.thumbImg = influxImg
      }
      let wikipedia = this.comobj.text.match(/.*wikipedia\.org.*/)
      if (wikipedia) {
        this.thumbImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png'
      }

      let ytVid = this.comobj.text.match(/^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|&vi?=)([^#&?]*).*/)
      if (ytVid) {
        this.ytVid = this.comobj.text.match(/^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|&vi?=)([^#&?<>]*).*/)[2]
      }

      let soundcloud = this.comobj.text.match(/.*soundcloud\.com.*/)
      if (soundcloud) {
        this.soundcloudfeed = this.comobj.text.match(/>.*(soundcloud\.com.*)<\/a>/)[1]
      }

      let guichet = this.comobj.text.match(/.*guichetdusavoir\.org.*/)
      if (guichet) {
        this.thumbImg = 'https://images.unsplash.com/photo-1557318041-1ce374d55ebf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60'
      }

      this.comobj.text = this.comobj.text.replace(/>http[s]?:\/\/[^./]*\.([^./]*\.[^./]*)(\/.*)?<\/a>/, '>$1/...</a>')
      let url = this.comobj.text.match(/<a.*>.*<\/a>/)
      let bmlyon = this.comobj.text.match(/.*bm-lyon\.fr.*/)

      if (bmlyon && !influx && !bmlvid) {
        this.thumbImg = bmImg
      }

      if (url && !ytVid && !wikipedia && !influx && !bmlvid && !soundcloud && !bmlyon && !guichet) {
        this.thumbImg = linkImg
      }
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
    }
  },
  mounted: function () {
    this.upgradeVignette()
  },
  beforeUpdate: function () {
    this.thumbImg = null
    this.ytVid = null
    this.vidurl = null
    this.soundcloudfeed = null
    this.upgradeVignette()
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
  object-fit: cover;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

iframe {
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

.series-tile-librarian {
  padding: 20px;
  font-size: 11px;
  color:#4AA4FF;
  font-style: italic;
  text-align: right;
}
</style>
