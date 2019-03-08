<template>
  <div id="event-popup">
    <div id="event-popup-bg" @click="closePopUp"></div>
    <div id="event-popup-body">
      <img>
      <h3>{{eventObj.event_title}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'eventId'
  ],
  data: function () {
    return {
      eventObj: null
    }
  },
  created: function () {
    document.querySelector('#hall-view #grid-wrapper').classList.add('blurry')
    document.querySelector('#emph').classList.add('blurry')

    fetch(`${this.$store.state.libraryApiUrl}${this.eventId}`)
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
  },
  beforeDestroy: function () {
    document.querySelector('#hall-view #grid-wrapper').classList.remove('blurry')
    document.querySelector('#emph').classList.remove('blurry')
  },
  methods: {
    closePopUp: function () {
      this.$emit('close-popup')
    }
  }
}
</script>

<style>
#event-popup-body {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 33vw;
  background-color: white;
  min-height: 66vh;
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
