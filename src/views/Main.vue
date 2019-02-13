<template>
  <div id="main-view">
      <TitleTile @click.native="titleTileClicked"></TitleTile>
      <DescTile></DescTile>
      <PlusOneTile></PlusOneTile>
      <PlaceTile></PlaceTile>
      <GalleryTile></GalleryTile>
      <CalendarTile v-if="!$store.state.libraryDevice"></CalendarTile>
      <QRTile v-if="$store.state.libraryDevice" @click.native="QRTileClicked"></QRTile>
      <ProgramTile v-if="eventData.event_mere != 0"></ProgramTile>
      <program-events-tile v-if="eventData.event_mere != 0"></program-events-tile>
      <ContactTile></ContactTile>
      <catch-screen v-if="showCatchScreen && $store.state.libraryDevice" v-on:hide-catch-screen="showCatchScreen = false"></catch-screen>
      <night-screen v-if="showNightScreen && $store.state.libraryDevice"></night-screen>
  </div>
</template>

<script>
// @ is an alias to /src
import CatchScreen from '../components/CatchScreen'
import DescTile from '../components/DescTile'
import TitleTile from '../components/TitleTile'
import PlaceTile from '../components/PlaceTile'
import ContactTile from '../components/ContactTile'
import GalleryTile from '../components/GalleryTile'
import CalendarTile from '../components/CalendarTile'
import QRTile from '../components/QRTile'
import HelperMixin from '../helpers/HelperMixin'
import ProgramTile from '../components/ProgramTile'
import ProgramEventsTile from '../components/ProgramEventsTile'
import PlusOneTile from '../components/PlusOneTile'
import NightScreen from '../components/NightScreen'

export default {
  name: 'main-view',
  mixins: [HelperMixin],
  components: {
    CatchScreen,
    TitleTile,
    DescTile,
    PlaceTile,
    GalleryTile,
    ContactTile,
    CalendarTile,
    QRTile,
    ProgramTile,
    ProgramEventsTile,
    PlusOneTile,
    NightScreen
  },
  data: function () {
    return {
      timeoutId: -1,
      appObserver: null,
      showCatchScreen: true,
      showNightScreen: false,
      titleClickCount: 0,
      QRClickCount: 0
    }
  },
  methods: {
    titleTileClicked () {
      console.log('coucou')
      if (this.titleClickCount < 5) {
        this.titleClickCount += 1
      } else {
        this.titleClickCount = 0
      }
    },
    QRTileClicked () {
      if (this.titleClickCount == 5) {
        this.QRClickCount += 1
        if (this.titleClickCount == 5 && this.QRClickCount == 5) {
          this.$router.push('admin')
        }
      } else {
        this.QRClickCount = 0
      }
    },
    resetCatchScreenTimeout (event) {
      if (this.timeoutId !== -1) {
        clearTimeout(this.timeoutId)
      }
      this.timeoutId = setTimeout(() => {
        this.showCatchScreen = true
        if (this.$store.state.libraryDevice) {
          this.$store.dispatch('changeEventId', `${this.$store.state.currentEventIdLibrary}`)
        }
      }, 60000)
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.$route.params.eventId) {
        this.$store.dispatch('changeEventId', `${this.$route.params.eventId}`)
      }
    }
  },
  created () {
    setInterval(() => {
      let currentTime = new Date()
      if (currentTime.getDay() < 2 || currentTime.getHours() >= 19 || currentTime.getHours() < 9) {
        this.showNightScreen = true
      } else {
        this.showNightScreen = false
      }
    }, 60000)
    window.addEventListener('scroll', this.resetCatchScreenTimeout)
    if (this.$route.params.eventId) {
      this.$store.dispatch('changeEventId', `${this.$route.params.eventId}`)
    }
  },
  mounted () {
    var targetNode = document.getElementById('app')
    var config = { attributes: true, childList: true, subtree: true }
    this.appObserver = new MutationObserver((mutationsList, observer) => {
      this.resetCatchScreenTimeout()
    })
    this.appObserver.observe(targetNode, config)
  },
  destroyed () {
    window.removeEventListener('scroll', this.resetCatchScreenTimeout)
    this.appObserver.disconnect()
  }
}
</script>

<style>

#main-view {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 28vh);
  /*gap: 10px;
  grid-gap: 10px;*/
  grid-auto-flow: dense;
  width: calc(100vw - 16px);
  margin: 8px;
}

@media (max-width: 640px) {
  #main-view {
    display: flex;
    flex-direction: column;
    width: calc(100vw - 16px);
    margin: 2px;
  }

  .explore-tile {
    max-height: 210px;
  }

  .focused-tile {
    max-height: 98vh;
    height: 96vh;
    width: 95vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    box-shadow: 0px 0px 0px 30px rgba(0, 0, 0, 0.43);
    transition: all 0.2s;
  }

}

.explore-tile {
  margin: 5px;
  min-height: 150px;
}

.explore-tile::-webkit-scrollbar {
  display: none;
}
</style>
