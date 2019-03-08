<template>
  <div id="main-view">
      <TitleTile @click.native="titleTileClicked"></TitleTile>
      <DescTile></DescTile>
      <PlusOneTile></PlusOneTile>
      <!--<PlaceTile></PlaceTile>-->
      <DatesTile v-if="eventData.dates.length > 1"></DatesTile>
      <GalleryTile></GalleryTile>
      <CalendarTile v-if="!$store.state.libraryDevice"></CalendarTile>
      <QRTile v-if="$store.state.libraryDevice" @click.native="QRTileClicked"></QRTile>
      <ProgramTile v-if="eventData.event_mere != 0"></ProgramTile>
      <program-events-tile v-if="eventData.event_mere != 0"></program-events-tile>
      <!--<ContactTile></ContactTile>-->
      <ClientLinksTile v-if="$store.state.nbOfLinks > 0"></ClientLinksTile>
      <FilesTile v-if="$store.state.nbOfFiles > 0"></FilesTile>
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
import ClientLinksTile from '../components/ClientLinksTile'
import FilesTile from '../components/FilesTile'
import DatesTile from '../components/DatesTile'
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
    ClientLinksTile,
    FilesTile,
    DatesTile,
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
      if (this.titleClickCount < 5) {
        this.titleClickCount += 1
      } else {
        this.titleClickCount = 0
      }
    },
    QRTileClicked () {
      if (this.titleClickCount === 5) {
        this.QRClickCount += 1
        if (this.titleClickCount === 5 && this.QRClickCount === 5) {
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
  grid-auto-columns: 22vw;
  grid-template-rows: repeat(12, 8.2vh);
  grid-auto-flow: column dense;
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
  min-height: 8.2vh;
  min-width: calc(22vw - 10px);
}

.explore-tile::-webkit-scrollbar {
  display: none;
}

.focused-tile {
  height: 84vh;
  width: 69vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  -webkit-box-shadow: 0px 0px 0px 30px rgba(0, 0, 0, 0.43);
  box-shadow: 0px 0px 0px 30px rgba(0, 0, 0, 0.43);
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  padding-left: 15vw;
  padding-right: 15vw;
  padding-top: 15vh;
  font-size: 18px;
}
</style>
