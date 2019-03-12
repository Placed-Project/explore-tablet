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
  position: absolute;
  padding-left: 10px;
  top: 15px;
  left: 25px;
  font-size: xx-large;
  margin-bottom: 0;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  width: calc(100% - 2* 25px);
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
