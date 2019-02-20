<template>
  <div id="client-links-tile" class="explore-tile" :class="{ 'focused-tile' : focused }" @click="focused = !focused">
    <h2 id="contact-h2-tile">{{$t("additional-links-label")}}</h2>
    <div v-for="link in links" :key="link.key" class="client-link">
      <a v-if="!$store.state.libraryDevice" target="_blank" rel="noopener noreferrer" :href="link.val().url">{{link.val().label}}</a>
      <a v-else :href="link.val().url">{{link.val().label}}</a>
      <!--<span v-else class="iframe-link" @click.stop="openIframe(link.val().url)">{{link.val().label}}</span>-->
    </div>
    <!--
    <div id="link-opening-iframe" v-show="iframeVisible" @click="closeIframe">
      <img src="../assets/ripple-loading.gif"/>
      <div id="link-opening-iframe-wrapper">
        <iframe scrolling="no"></iframe>
      </div>
      <div id="link-opening-iframe-close"><span>&times;</span></div>
    </div>
    -->
  </div>
</template>

<script>
import HelperMixinVue from '../helpers/HelperMixin.vue'
import LinksListMixinVue from '../helpers/LinksListMixin.vue'

export default {
  mixins: [HelperMixinVue, LinksListMixinVue],
  data: function () {
    return {
      iframeVisible: false
    }
  },
  mounted: function () {
    this.loadLinkList(this.eventData)
  },
  watch: {
    '$route' (to, from) {
      let oldItem = this.eventData
      let newItem = to.path.slice(1, to.path.length)

      this.loadLinkList(newItem, oldItem)
    }
  },
  methods: {
    openIframe: function (url) {
      // Influx website does not accept to be in iframe
      if (url.match(/.*www\.linflux\.com.*/gm)) {
        alert('Hélas, le site de l\'Influx n\'est disponible que si vous ouvrez cette page sur votre propre appareil 😥')
        return
      }

      // www.bm-lyon.fr website does not accept to be in iframe
      if (url.match(/.*www\.bm-lyon\.fr.*/gm)) {
        alert('Hélas, le site de www.bm-lyon.fr n\'est disponible que si vous ouvrez cette page sur votre propre appareil 😥')
        return
      }

      this.iframeVisible = true
      document.querySelector('#link-opening-iframe-wrapper > iframe').setAttribute('src', url)
    },
    closeIframe: function () {
      this.iframeVisible = false
      document.querySelector('#link-opening-iframe-wrapper > iframe').setAttribute('src', '')
    }
  }
}
</script>

<style>
#client-links-tile {
  grid-row: span 4;
  grid-column: span 1;
  background: white;
  border-radius: 6px;
  overflow: scroll;
}

#client-links-tile h2 {
  margin-top: 10px;
  margin-left: 20px;
}

.client-link {
  margin-left: 20px;
}

.client-link > span {
  text-decoration: underline;
  cursor: pointer;
}

#link-opening-iframe {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

#link-opening-iframe > img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
}

#link-opening-iframe-wrapper {
  max-width: 90vw;
  max-height: 90vh;
  width: 90vw;
  height: 90vh;
  margin-top: 5vh;
  margin-left: 5vw;
}

#link-opening-iframe-wrapper > iframe {
  /*max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;*/
  border: 0;
  width: 1px;
  min-width: 100%;
  *width: 100%;
  height: 1px;
  min-height: 100%;
  *height: 100%;
}

#link-opening-iframe-close {
  position: fixed;
  top: 5vh;
  right: 5vw;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: orangered;
  transform: translate(50%, -50%);
}

#link-opening-iframe-close > span {
  margin-top: 50%;
  margin-left: 50%;
  display: block;
  transform: translate(-15%, -50%);
}
</style>
