<template>
  <div id="qr-tile" class="explore-tile" :class="{ 'focused-tile' : focused }" @click="focused = !focused">
      <h2>{{$t('qr-label')}}</h2>
      <canvas id="qr-canvas"></canvas>
      <p id="qr-url-p">{{$store.state.exploreURL}}/#/{{eventData["event_id"]}}</p>
  </div>
</template>

<script>
import HelperMixin from '../helpers/HelperMixin'
import QRCode from 'qrcode'

export default {
  mixins: [HelperMixin],
  mounted: function () {
    var canvas = document.getElementById('qr-canvas')

    QRCode.toCanvas(canvas, `${this.$store.state.exploreURL}/#/${this.eventData['event_id']}`, function (error) {
      if (error) console.error(error)
    })
  }
}
</script>

<style>
#qr-tile {
  grid-row: span 2;
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
</style>
