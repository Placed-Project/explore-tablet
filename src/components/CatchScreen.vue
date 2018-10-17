<template>
  <div class="catchscreen" @click="$emit('hide-catch-screen')">
    <div id="catchscreen-background">
      <div class="text-band" id="text-band-1">
        <p>{{eventData['event_title']}}</p>
        <p id="short-desc" v-html="eventData['event_description_courte']"></p></div>
      <div class="text-band" id="text-band-2">
        <p>{{beautifulDate}}</p>
        <p id="call-to-action">Cliquez pour en savoir plus</p>
      </div>
      <div class="seethrough-band" v-bind:class="{ halftone: halfTone }" v-bind:style="{ backgroundImage: `url(${this.eventData['image_url']})`}" id="seethrough-band-1"><div class="halftone-child" v-bind:style="{ backgroundImage: `url(${this.eventData['image_url']})`}" v-if="halfTone"></div></div>
      <div class="seethrough-band" v-bind:class="{ halftone: halfTone }" v-bind:style="{ backgroundImage: `url(${this.eventData['image_url']})`}" id="seethrough-band-2"><div class="halftone-child" v-bind:style="{ backgroundImage: `url(${this.eventData['image_url']})`}" v-if="halfTone"></div></div>
      <div class="seethrough-band" v-bind:class="{ halftone: halfTone }" v-bind:style="{ backgroundImage: `url(${this.eventData['image_url']})`}" id="seethrough-band-3"><div class="halftone-child" v-bind:style="{ backgroundImage: `url(${this.eventData['image_url']})`}" v-if="halfTone"></div></div>
    </div>
    <video id="video" width="320" height="240" preload autoplay loop muted></video>
  </div>
</template>

<script>
import {} from 'tracking/build/tracking-min.js'
import {} from 'tracking/build/data/face-min.js'
import baffle from 'baffle'

export default {
  name: 'catchscreen',
  computed: {
    eventData () {
      return this.$store.state.eventData
    },
    beautifulDate () {
      let dateObject = new Date(this.eventData['dates'][0]['date_start'])
      return `${this.$t('week-day-' + dateObject.getDay())} ${dateObject.getDate()} ${this.$t('month-' + dateObject.getMonth())} ${dateObject.getFullYear()}`
    }
  },
  data: function () {
    return {
      trackingInterval: -1,
      cameraInterval: -1,
      halfTone: true
    }
  },
  beforeDestroy: function () {
    clearInterval(this.trackingInterval)
    clearInterval(this.cameraInterval)
  },
  mounted: function () {
    var streaming = false,
          video        = document.querySelector('#video'),
          canvas       = document.createElement('canvas'),
          width = 320,
          height = 0
    let keepDetail = false
    let detailKeeperTimer = -1


    let bandOne = document.querySelector('#seethrough-band-1')
    let bandTwo = document.querySelector('#seethrough-band-2')
    let bandThree = document.querySelector('#seethrough-band-3')

    //bandOne.style.backgroundImage = `url(${this.eventData['image_url']})`
    //bandTwo.style.backgroundImage = `url(${this.eventData['image_url']})`
    //bandThree.style.backgroundImage = `url(${this.eventData['image_url']})`

    navigator.mediaDevices.getUserMedia(
      {
        video: true,
        audio: false
      }).then(
      function(stream) {
        video.srcObject = stream
        video.play();
      }).catch(function(err) {
        console.log("An error occured! " + err);
      })
    

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
        video.setAttribute('width', width)
        video.setAttribute('height', height)
        canvas.setAttribute('width', width)
        canvas.setAttribute('height', height)
        streaming = true;
      }
    }, false)

    function takepicture() {
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(video, 0, 0, width, height)
    }

    this.cameraInterval = setInterval(function(ev){
      takepicture();
    }, 500);


    var video = document.getElementById('video');
    var tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    this.trackingInterval = setInterval(() => {tracking.track(canvas, tracker)}, 1000)
    tracker.on('track', function(event) {
      let facefound = false;
      event.data.forEach(function(face) {
        facefound = true
      })
      
      if(facefound) {
        if(!keepDetail) {
          bandThree.style.width = bandTwo.style.width = bandOne.style.width = `50vw`
          bandThree.style.height = bandTwo.style.height = bandOne.style.height = `20vh`
          bandTwo.style.left = `25vw`

          document.querySelector('#short-desc').style.height = 'auto'
          document.querySelector('#call-to-action').style.height = 'auto'
          let b = baffle(document.querySelector('#call-to-action')).start()
          b.reveal(1500)
          
          keepDetail = true
        }
        
        clearTimeout(detailKeeperTimer)
        detailKeeperTimer = setTimeout(() => {
          keepDetail = false
        }, 3000)
      } else if (!keepDetail){
        bandThree.style.width = bandTwo.style.width = bandOne.style.width = `100vw`
        bandTwo.style.height = bandOne.style.height = `33vh`
        bandThree.style.height = `34vh`
        bandTwo.style.left = `0vw`
        document.querySelector('#short-desc').style.height = '0'
        document.querySelector('#call-to-action').style.height = '0'
      }
    })
  }
}
</script>

<style>
.catchscreen {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: white;
  cursor: pointer;
}

#catchscreen-background {
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.seethrough-band {
  /*background-image: url("https://images.unsplash.com/photo-1530061738406-233b0e977ea7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6b652fbe3813716c0f321ddd75fa85a6&auto=format&fit=crop&w=2176&q=80");*/
  background-size: 100vw;
  background-attachment: fixed;
  width: 33vw;
  height: 11vh;
  position: fixed;
  z-index: -1;
  transition: width 0.5s, height 0.5s, left 0.5s ;
}

#seethrough-band-1 {
  top:0;
  left: 0;
}

#seethrough-band-2 {
  top:33vh;
  left: 50%;
}
#seethrough-band-3 {
  bottom:0;
  right: 0;
}

.text-band {
  color: white;
  background-color: black;
  font-family: 'rennerbold', sans-serif;
  z-index: 10;
  font-size: 32px;
  font-weight: 800;
  width: auto;
  padding: 20px;
  position: fixed;
}

.text-band p {
  margin-top: 16px;
  margin-bottom: 16px;
}

#short-desc {
  font-family: 'rennerbold', sans-serif;
  font-size: 16px;
  font-weight: 600;
  height: 0;
  overflow: hidden;
  width: 40vw;
  transition: height 1s;
}

#call-to-action {
  font-family: monospace;
  font-weight: 600;
  height: 0;
  overflow: hidden;
  transition: height 1s;
  background: linear-gradient(to right, #F2B135 0%, #B62525 100%);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
}

#text-band-1 {
  top: 20vh;
  left: 64px;
}

#text-band-2 {
  bottom: 20vh;
  right: 64px;
  text-align: right;
}

.halftone {
    background: white;
    filter: contrast(25000%) grayscale(50%);
    overflow: hidden;
    transform: translateZ(0); /* force a HW accelerated layer */
}

.halftone > * {
    filter: brightness(0.5) blur(4px);
  background-image: url("https://www.bm-lyon.fr/agenda/documents/images/mediums/med_100718142748.jpg");
  background-attachment: fixed;
    background-size: 100vw;
  /*width: 100vw;*/
  height: 100vh;
}
.halftone::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right:0;
    bottom: 0;
    background-blend-mode: multiply;
    background:
        radial-gradient(8px 8px, cyan, white),
        radial-gradient(8px 8px, magenta, white),
        radial-gradient(8px 8px, yellow, white);
    background-size: 8px 8px;
    background-position: 0 -3px, -2px 0, 2px 0;
    mix-blend-mode: screen;
    pointer-events: none;
    z-index: 1;
}

</style>

