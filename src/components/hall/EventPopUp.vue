<template>
  <div id="event-popup">
    <div id="event-popup-bg" @click="closePopUp"></div>
    <div id="event-popup-body" v-if="eventObj">
      <img :src="imageSrc">
      <QRTile :event-id-prop="eventProp.event_id"></QRTile>
      <ContactTile :event-obj-prop="eventObj"></ContactTile>
      <div id="event-popup-text-wrapper">
        <h3>{{eventObj.event_title}}</h3>
        <span class="event-popup-date">{{beautifulDateFromString(nextDate)}}</span>
        <div>{{eventObj['event_description_courte']}}</div>
        <div v-html="cleanedDescription"></div>
      </div>
    </div>
  </div>
</template>

<script>
import HelperMixinVue from '../../helpers/HelperMixin'
import QRTile from '../QRTile'
import ContactTile from '../ContactTile'
import parseDate from 'date-fns/parse'
import bmlLogo from '../../assets/bml-logo.png'

export default {
  props: [
    'eventProp'
  ],
  mixins: [
    HelperMixinVue
  ],
  components: {
    QRTile,
    ContactTile
  },
  data: function () {
    return {
      eventObj: null,
      popuptimer: -1
    }
  },
  mounted: function () {
    document.querySelector('#hall-view #grid-wrapper').classList.add('blurry')

    this.eventObj = this.eventProp

    fetch(`${this.$store.state.libraryApiUrl}${this.eventProp.event_id}`)
      .then((resp) => {
        if (resp.ok) {
          resp.json().then((data) => {
            this.eventObj = data[0]
          })
        }
      })
      .catch((err) => {
        console.error(err)
      })

    this.popuptimer = setTimeout(() => {
      this.$emit('close-popup')
    }, 120000)
  },
  beforeDestroy: function () {
    clearTimeout(this.popuptimer)
    document.querySelector('#hall-view #grid-wrapper').classList.remove('blurry')
  },
  methods: {
    closePopUp: function () {
      this.$emit('close-popup')
    }
  },
  computed: {
    imageSrc: function () {
      return this.eventObj.image_url ? this.eventObj.image_url : bmlLogo
    },
    cleanedDescription: function () {
      return this.eventObj.event_description.replace(/<a.*>(.*)<\/a>/gm, '$1')
    },
    nextDate: function () {
      if (this.eventObj) {
        let dateindex = 0
        for (let i = 0; i < this.eventObj.dates.length; i++) {
          let date = parseDate(this.eventObj.dates[i].date_start)
          if ((new Date()) < date) {
            dateindex = i
            break
          } else if (i === this.eventObj.dates.length - 1) {
            dateindex = i
            break
          }
        }
        let d = parseDate(this.eventObj.dates[dateindex].date_start)
        if (d < new Date()) {
          return (new Date()).toISOString()
        } else {
          return this.eventObj.dates[dateindex].date_start
        }
      } else {
        return (new Date()).toISOString()
      }
    }
  }
}
</script>

<style>
#event-popup-body {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 40vw;
  background-color: white;
  min-height: 66vh;
  border-radius: 6px;
  color: #221d23;
  box-shadow: 0px 10px 10px 5px rgba(0, 0, 0, 0.25);
  margin-bottom: 100px;
}

#event-popup-body > img {
  position: fixed;
  height: 200px;
  top: 50px;
  right: calc(40vw - 100px);
  border-radius: 6px;
}

#event-popup-body h3 {
  font-size: 30px;
  margin-block-start: 0;
  margin-block-end: 0.5em;
}

.event-popup-date {
  font-weight: 700;
  margin-block-start: 0;
  text-transform: capitalize;
}

#event-popup-text-wrapper {
  margin-left: 140px;
  margin-right: 70px;
  margin-top: 50px;
  margin-bottom: 50px;
}

#event-popup-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
}

#hall-view #grid-wrapper.blurry {
  filter: blur(4px);
  overflow: hidden;
}

#emph.blurry {
  filter: blur(4px);
}
</style>
