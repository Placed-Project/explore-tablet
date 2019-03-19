<template>
  <div id="main-view" :style="{'background-color': colors[bgColorIndex]}">
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
      <!--<ClientLinksTile v-if="$store.state.nbOfLinks > 0"></ClientLinksTile>-->
      <FilesTile v-if="$store.state.nbOfFiles > 0"></FilesTile>
      <YoutubeTile v-for="link in youtubeLinks" :key="link.url" :link="link"></YoutubeTile>
      <MixCloudTile v-for="link in mixcloudLinks" :key="link.url" :link="link"></MixCloudTile>
      <OtherTile v-for="link in otherLinks" :key="link.url" :link="link"></OtherTile>
      <InfluxTile v-for="link in influxLinks" :key="link.url" :link="link"></InfluxTile>
      <CatalogueTile v-for="link in catalogueLinks" :key="link.url" :link="link"></CatalogueTile>
      <BMLBlogTile v-for="link in bmlBlogLinks" :key="link.url" :link="link"></BMLBlogTile>
      <SoundCloudTile v-for="link in soundcloudLinks" :key="link.url" :link="link"></SoundCloudTile>
      <BMVideoTile v-for="link in bmlVideoLinks" :key="link.url" :link="link"></BMVideoTile>
      <WikipediaTile v-for="link in wikiLinks" :key="link.url" :link="link"></WikipediaTile>
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
import YoutubeTile from '../components/YoutubeTile'
import MixCloudTile from '../components/MixCloudTile'
import LinksListMixinVue from '../helpers/LinksListMixin.vue'
import OtherTile from '../components/OtherTile'
import InfluxTile from '../components/InfluxTile'
import CatalogueTile from '../components/CatalogueTile'
import BMLBlogTile from '../components/BMBlogTile'
import SoundCloudTile from '../components/SoundCloudTile'
import BMVideoTile from '../components/BMVideoTile'
import WikipediaTile from '../components/WikipediaTile'

export default {
  name: 'main-view',
  mixins: [HelperMixin, LinksListMixinVue],
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
    NightScreen,
    YoutubeTile,
    MixCloudTile,
    OtherTile,
    InfluxTile,
    CatalogueTile,
    BMLBlogTile,
    SoundCloudTile,
    BMVideoTile,
    WikipediaTile
  },
  data: function () {
    return {
      timeoutId: -1,
      appObserver: null,
      showCatchScreen: true,
      showNightScreen: false,
      titleClickCount: 0,
      QRClickCount: 0,
      bgColorIndex: 0,
      colors: [
        '#2c2c2a',
        '#0f2944',
        '#111e51',
        '#221d23',
        '#0d0630'
      ]
    }
  },
  computed: {
    youtubeLinks () {
      let ytLinks = []
      if (this.$store.state.nbOfLinks > 0) {
        for (const lk of this.links) {
          if (lk.val().type === 'yt') {
            ytLinks.push(lk.val())
          }
        }
      }
      return ytLinks
    },
    mixcloudLinks () {
      let mcLinks = []
      if (this.$store.state.nbOfLinks > 0) {
        for (const lk of this.links) {
          if (lk.val().type === 'mixcloud') {
            mcLinks.push(lk.val())
          }
        }
      }
      return mcLinks
    },
    wikiLinks () {
      let wikiLinks = []
      if (this.$store.state.nbOfLinks > 0) {
        for (const lk of this.links) {
          if (lk.val().type === 'wikipedia') {
            wikiLinks.push(lk.val())
          }
        }
      }
      return wikiLinks
    },
    catalogueLinks () {
      let ctLinks = []
      if (this.$store.state.nbOfLinks > 0) {
        for (const lk of this.links) {
          if (lk.val().type === 'catalogue') {
            ctLinks.push(lk.val())
          }
        }
      }
      return ctLinks
    },
    influxLinks () {
      let infLinks = []
      if (this.$store.state.nbOfLinks > 0) {
        for (const lk of this.links) {
          if (lk.val().type === 'influx') {
            infLinks.push(lk.val())
          }
        }
      }
      return infLinks
    },
    bmlBlogLinks () {
      let bmblLinks = []
      if (this.$store.state.nbOfLinks > 0) {
        for (const lk of this.links) {
          if (lk.val().type === 'bml-blog') {
            bmblLinks.push(lk.val())
          }
        }
      }
      return bmblLinks
    },
    soundcloudLinks () {
      let scLinks = []
      if (this.$store.state.nbOfLinks > 0) {
        for (const lk of this.links) {
          if (lk.val().type === 'soundcloud') {
            scLinks.push(lk.val())
          }
        }
      }
      return scLinks
    },
    bmlVideoLinks () {
      let bmvidLinks = []
      if (this.$store.state.nbOfLinks > 0) {
        for (const lk of this.links) {
          if (lk.val().type === 'bml-video') {
            bmvidLinks.push(lk.val())
          }
        }
      }
      return bmvidLinks
    },
    otherLinks () {
      let otLinks = []
      if (this.$store.state.nbOfLinks > 0) {
        for (const lk of this.links) {
          if (lk.val().type === 'other') {
            otLinks.push(lk.val())
          }
        }
      }
      return otLinks
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
        this.loadLinkListFromId(this.$route.params.eventId, this.eventId)
        this.$store.dispatch('changeEventId', `${this.$route.params.eventId}`)
        this.bgColorIndex = (this.bgColorIndex + 1) % this.colors.length
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
    this.loadLinkListFromId(this.eventId)
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
  width: 100vw;
  height: 100vh;
  background-attachment: fixed;
  overflow-y: hidden;
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

@media (max-width: 640px) {
  #main-view {
    display: flex;
    flex-direction: column;
    margin: 2px;
    overflow-y: scroll;
  }

  .explore-tile {
    max-height: 210px;
    min-height: 20vh;
  }

  .focused-tile {
    max-height: 98vh;
    height: 98vh;
    width: 98vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    box-shadow: 0px 0px 0px 30px rgba(0, 0, 0, 0.43);
    transition: all 0.2s;
    padding: 0;
  }

}
</style>
