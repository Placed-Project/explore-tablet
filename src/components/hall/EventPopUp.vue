<template>
  <div id="event-popup">
    <div id="event-popup-bg" @click="closePopUp"></div>
    <div id="event-popup-body" v-if="eventObj">
      <img :src="imageSrc">
      <QRTile :event-id-prop="eventProp.event_id"></QRTile>
      <ContactTile :event-obj-prop="eventObj" :dateIndex="dateIndex"></ContactTile>
      <div id="event-popup-move-invite" v-if="moveInvite.length > 0">{{moveInvite}}</div>
      <div id="event-popup-text-wrapper">
        <h3>{{eventObj.event_title}}</h3>
        <p v-if="currentDateObject(eventObj.dates).lex_date_statut_id == '1'" class="cancel-warning">{{$t('event-canceled')}}</p>
        <span class="event-popup-date">{{beautifulDateTimeFromString(nextDate())}} - {{displayedEndTime}}</span>
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
import bmlLogo from '../../assets/bml-logo.jpg'

export default {
  props: [
    'eventProp',
    'bibId'
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
      popuptimer: -1,
      moveInvite: '',
      dateIndex: 0
    }
  },
  mounted: function () {
    document.querySelector('#hall-view #grid-wrapper').classList.add('blurry')

    this.eventObj = this.eventProp

    this.$store.state.database.ref('highlight' + this.bibId + '/' + this.eventObj.event_id).once('value', (data) => {
      this.moveInvite = data.val() ? data.val() : ''
    })

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
    },
    nextDate: function () {
      if (this.eventObj) {
        let dateindex = 0
        let thereisavaliddateinthisplace = false
        for (let i = 0; i < this.eventObj.dates.length; i++) {
          let date = parseDate(this.eventObj.dates[i].date_start)
          if (this.eventObj.dates[i].place_id !== this.bibId) {
            continue
          }
          if ((new Date()) < date) {
            thereisavaliddateinthisplace = true
            dateindex = i
            break
          } else if (i === this.eventObj.dates.length - 1) {
            thereisavaliddateinthisplace = true
            dateindex = i
            break
          }
        }
        if (!thereisavaliddateinthisplace) {
          return
        }
        this.dateIndex = dateindex
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
  },
  computed: {
    imageSrc: function () {
      return this.eventObj.image_url ? this.eventObj.image_url : bmlLogo
    },
    cleanedDescription: function () {
      return this.eventObj.event_description.replace(/<a.*>(.*)<\/a>/gm, '$1')
    },
    displayedEndTime: function () {
      // if start and end are the same day
      let d1 = new Date(this.nextDate())
      let d2 = this.currentDateEndtime(this.eventObj.dates)
      if (d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()) {
        return this.beautifulTimeFromString(this.currentDateEndtime(this.eventObj.dates))
      } else {
        return this.beautifulDateTimeFromString(this.currentDateEndtime(this.eventObj.dates))
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

.cancel-warning {
  font-size: 30px;
  color: red;
}

#event-popup-move-invite {
  position: absolute;
  max-width: 230px;
  min-width: 230px;
  top: 140px;
  left: calc(40vw - 35px);
  background-color: #dd6e42;
  color: white;
  border-radius: 6px;
  padding-top: 10px;
  padding-left: 20px;
  padding-bottom: 10px;
}
</style>
