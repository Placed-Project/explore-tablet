<template>
  <div id="main-view">
      <DescTile></DescTile>
      <PlaceTile></PlaceTile>
      <GalleryTile></GalleryTile>
      <TitleTile></TitleTile>
      <ContactTile></ContactTile>
      <catch-screen v-if="showCatchScreen" v-on:hide-catch-screen="showCatchScreen = false"></catch-screen>
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
import HelperMixin from '../helpers/HelperMixin'

export default {
  name: 'main-view',
  mixins: [HelperMixin],
  components: {
    CatchScreen,
    TitleTile,
    DescTile,
    PlaceTile,
    GalleryTile,
    ContactTile
  },
  data: function () {
    return {
      timeoutId: -1,
      appObserver: null,
      showCatchScreen: true
    }
  },
  methods: {
    resetCatchScreenTimeout (event) {
      if (this.timeoutId != -1) {
        clearTimeout(this.timeoutId)
      }
      this.timeoutId = setTimeout(() => {
        this.showCatchScreen = true
      }, 60000)
    }
  },
  created () {
    window.addEventListener('scroll', this.resetCatchScreenTimeout)
    if(this.$route.params.eventId) {
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
  grid-template-rows: repeat(3, 1fr);
  /*gap: 10px;
  grid-gap: 10px;*/
  grid-auto-flow: dense;
  height: calc(100vh - 16px);
  width: calc(100vw - 16px);
  margin: 8px;
}

.explore-tile {
  margin: 5px;
}

.explore-tile::-webkit-scrollbar {
  display: none;
}
</style>
