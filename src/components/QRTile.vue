<template>
  <div id="qr-tile" class="explore-tile" :class="{ 'focused-tile' : focused }" @click="focus">
      <h2 v-if="!isInPopup">{{$t('qr-label')}}</h2>
      <canvas id="qr-canvas"></canvas>
      <p id="qr-url-p">{{$store.state.exploreURL}}/#/{{id}}</p>
  </div>
</template>

<script>
import HelperMixin from '../helpers/HelperMixin'
import QRCode from 'qrcode'

export default {
  mixins: [HelperMixin],
  props: [
    'eventIdProp'
  ],
  data: function () {
    return {
      id: ''
    }
  },
  computed: {
    isInPopup: function () {
      return !!this.eventIdProp
    }
  },
  methods: {
    focus: function () {
      if (!this.eventIdProp) {
        this.focused = !this.focused
      }
    }
  },
  mounted: function () {
    var canvas = document.getElementById('qr-canvas')
    this.id = this.eventIdProp ? this.eventIdProp : this.eventData['event_id']

    if (this.eventIdProp) {
      document.querySelector('#qr-tile').classList.add('in-popup')
    }

    QRCode.toCanvas(canvas, `${this.$store.state.exploreURL}/#/${this.id}`, function (error) {
      if (error) console.error(error)
    })
  }
}
</script>

<style>
#qr-tile {
  grid-row: span 4;
  grid-column: span 1;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: fit-content;
}

#qr-tile h2 {
  margin-top: 10px;
  margin-left: 20px;
  size: 20px;
}

#qr-url-p {
  font-size: 13px;
  margin-top: 0;
}

#qr-tile.in-popup {
  position: absolute;
  max-width: 250px;
  min-width: 250px;
  height: 250px;
  top: 400px;
  right: calc(40vw - 100px);
}

#qr-tile.in-popup > h2{
  display: none;
}
</style>
