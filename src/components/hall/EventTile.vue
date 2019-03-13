<template>
  <div class="hall-event-tile" v-on:click="showPopUp()">
    <img :src="eventImage"/>
    <h3 class="hall-event-tile-h3"> {{eventTitle}}</h3>
  </div>
</template>

<script>
export default {
  props: [
    'eventId'
  ],
  data: function () {
    return {
      eventImage: '',
      eventTitle: ''
    }
  },
  mounted: function () {
    fetch(`${this.$store.state.libraryApiUrl}${this.eventId}`)
      .then((resp) => {
        if (resp.ok) {
          resp.json().then((data) => {
            this.eventImage = data[0].image_url
            this.eventTitle = data[0].event_title
          })
        }
      })
      .catch((err) => {
        console.error(err)
      })
  },
  methods: {
    showPopUp: function () {
      this.$emit('showPopUp', this.eventId)
    }
  }
}
</script>

<style>
.hall-event-tile {
  position: relative;
  width: 100%;
  height: 30vh;
  grid-column: span 1;
}

.hall-event-tile img {
  max-width: 100%;
  max-height: 100%;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.hall-event-tile-h3 {
  position: relative;
  top: -300px;
  left: -8px;
  font-size: x-large;
  -webkit-box-shadow: 0px 0px 0px 5px black;
  box-shadow: 0px 0px 0px 5px white;
  /*box-shadow: 0px 0px 0px 5px white;*/
  display: inline;
  background-color: white;
  /*background-color: white;*/
  color: #221d23;
}

@media (orientation: portrait) {
.hall-event-tile-h3 {
  font-size: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
}
</style>
