<template>
  <div class="hall-event-mini-tile" v-on:click="showPopUp()">
    <img :src="imageSrc"/>
    <h3 class="hall-event-mini-tile-h3">{{eventObj.event_title}}</h3>
  </div>
</template>

<script>
import bmlLogo from '../../assets/bml-logo.png'

export default {
  props: [
    'eventObj'
  ],
  computed: {
    imageSrc: function () {
      return this.eventObj.image_url ? this.eventObj.image_url : bmlLogo
    }
  },
  methods: {
    showPopUp: function () {
      this.$emit('showPopUp', this.eventObj.event_id)
    }
  }
}
</script>

<style>
.hall-event-mini-tile {
  display: inline-block;
  position: relative;
  width: 220px;
  height: 90px;
  margin-right: 10px;
  margin-bottom: 50px;
  background-color: rgb(253, 254, 255);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.hall-event-mini-tile img {
  max-width: 100%;
  max-height: 100%;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.hall-event-mini-tile-h3 {
  position: absolute;
  padding-left: 10px;
  overflow: hidden;
  left: 0;
  right: 0;
  top: 75px;
  height: 2.8em;
  font-size: 14px;
  color: #221d23;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: rgb(253, 254, 255);

}

@media (orientation: portrait) {
.hall-event-mini-tile-h3 {
  font-size: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
}
</style>
