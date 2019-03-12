<template>
  <div class="hall-event-mini-tile" v-on:click="showPopUp()">
    <img :src="eventObj.image_url"/>
    <h3 class="hall-event-mini-tile-h3">{{eventObj.event_title}}</h3>
  </div>
</template>

<script>
export default {
  props: [
    'eventObj'
  ],
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
  width: 150px;
  height: 75px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: black;
  border-radius: 6px;
}

.hall-event-mini-tile img {
  max-width: 100%;
  max-height: 100%;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.hall-event-mini-tile-h3 {
  position: absolute;
  padding-left: 10px;
  top:0;
  left: 5px;
  right: 5px;
  font-size: 10px;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
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
