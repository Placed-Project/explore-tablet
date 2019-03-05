<template>
  <div id="hall-view">
    <div id="grid-wrapper">
      <div id="left-pan">
        <h2>La BML vous invite à découvrir ses événements</h2>
        <svg width="157" height="34" viewBox="0 0 157 34" fill="none" xmlns="http://www.w3.org/2000/svg" id="emph">
          <rect width="147.876" height="8" transform="matrix(1 0 0 -1 -6 34)" fill="#215994"/>
          <rect width="163" height="8" transform="matrix(1 0 0 -1 -6 21)" fill="#215994"/>
          <rect width="126.031" height="8" transform="matrix(1 0 0 -1 -6 8)" fill="#215994"/>
        </svg>
        <div id="event-grid-wrapper">
          <EventTile v-for="hl in highlights" :key="hl" :eventId="hl"></EventTile>
        </div>
      </div>
      <div id="right-pan"></div>
    </div>
  </div>
</template>

<script>
import EventTile from '../components/hall/EventTile'

export default {
  data: function () {
    return {
      highlights: []
    }
  },
  components: {
    EventTile
  },
  mounted: function () {
    this.$store.state.database.ref('highlight').on('child_added', (data) => {
      this.highlights.push(data.key)
    })
  }
}
</script>

<style>
#hall-view {
  color: #215994;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #C2D1E1;
  z-index: -21;
  width: 100vw;
}

#grid-wrapper {
  margin: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 40px;
}

#event-grid-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  line-height: 69px;
  width: 1082px;
  height: 79px;
  margin-left: 131px;
  margin-top: 8px;

color: #215994;
}

#emph {
  position: absolute;
  width: 163px;
  height: 34px;
  left: -15px;
  top: 62px;
}

</style>
