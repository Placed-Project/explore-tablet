<template>
  <div id="hall-view">
    <div id="grid-wrapper">
      <div id="left-pan">
        <h2>La BML vous invite à découvrir</h2>
        <div id="event-grid-wrapper">
          <EventTile v-for="hl in highlights" :key="hl" :hEventId="hl" @showPopUp="popUp"></EventTile>
          <div id="logos" @dblclick="reloadPage">
            <img src="../assets/CNRS-logo.png">
            <img src="../assets/Enssib-logo.svg">
          </div>
        </div>
      </div>
      <div id="right-pan">
        <TimeLine @showPopUp="popUp" :bibId="bibId"></TimeLine>
      </div>
    </div>
    <EventPopUp :event-prop="choosedEvent" v-if="showPopUp" @close-popup="closePopUp"></EventPopUp>
  </div>
</template>

<script>
import EventTile from '../components/hall/EventTile'
import EventPopUp from '../components/hall/EventPopUp'
import TimeLine from '../components/hall/TimeLine'

export default {
  data: function () {
    return {
      highlights: [],
      showPopUp: false,
      choosedEvent: null,
      bibId: ''
    }
  },
  components: {
    EventTile,
    EventPopUp,
    TimeLine
  },
  created: function () {
    if (this.$route.params.bibId) {
      this.bibId = this.$route.params.bibId
    }
  },
  mounted: function () {
    this.$store.state.database.ref('highlight' + this.bibId).on('child_added', (data) => {
      this.highlights.push(data.key)
    })

    this.$store.state.database.ref(`highlight` + this.bibId).on('child_removed', (data) => {
      this.highlights.splice(this.highlights.indexOf(data.key, 1))
    })
  },
  methods: {
    popUp: function (obj) {
      this.choosedEvent = obj
      this.showPopUp = true
    },
    closePopUp: function () {
      this.showPopUp = false
    },
    reloadPage: function () {
      location.reload(true)
    }
  }
}
</script>

<style>
#hall-view {
  color: #2541B2;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #efeee7;
  width: 100vw;
  overflow: scroll;
}

#grid-wrapper {
  position: fixed;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 80px;
}

#event-grid-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-left: 80px;
  grid-gap: 40px;
}

#left-pan {
  grid-column: 1/3;
}

#right-pan {
  grid-column: 3;
}

#hall-view h2 {
  font-size: 50px;
  font-weight: 400;
  font-family: 'Lora';
  line-height: 69px;
  width: 1082px;
  height: 79px;
  margin-left: 80px;
  margin-top: 100px;

color: #215994;
}

#logos {
  position: absolute;
  bottom: 10px;
  left: 80px;
  height: 50px;
}

#logos img {
  height: 100%;
  margin-right: 20px;
  opacity: 0.8;
}
</style>
