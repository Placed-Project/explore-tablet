<template>
  <div class="hall-event-tile">
    <img :src="eventImage"/>
    <h3 class="hall-event-tile-h3">{{eventTitle}}</h3>
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
  }
}
</script>

<style>
.hall-event-tile {
  position: relative;
  width: 100%;
  grid-column: span 1;
}

.hall-event-tile img {
  width: 100%;
  border-radius: 6px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.hall-event-tile-h3 {
  position: absolute;
  bottom: 25px;
  left: 25px;
  font-size: 40px;
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
