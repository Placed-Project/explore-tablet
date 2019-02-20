<template>
  <div id="client-files-tile" class="explore-tile" :class="{ 'focused-tile' : focused }" @click="focused = !focused">
    <h2 id="contact-h2-tile">{{$t("additional-files-label")}}</h2>
    <div v-for="file in files" :key="file.key" class="client-file">
      <a v-if="!$store.state.libraryDevice" target="_blank" rel="noopener noreferrer" :href="file.val().link">{{file.val().name}}</a>
    </div>
    <p v-if="$store.state.libraryDevice">{{$t("qrcode-additional-files-label")}} : {{files.length}}</p>
  </div>
</template>

<script>
import HelperMixinVue from '../helpers/HelperMixin.vue'
import LinksListMixinVue from '../helpers/LinksListMixin.vue'

export default {
  mixins: [HelperMixinVue, LinksListMixinVue],
  mounted: function () {
    this.loadFileList(this.eventData)
  },
  watch: {
    '$route' (to, from) {
      let oldItem = this.eventData
      let newItem = to.path.slice(1, to.path.length)

      this.loadFileList(newItem, oldItem)
    }
  }
}
</script>

<style>
#client-files-tile {
  grid-row: span 4;
  grid-column: span 1;
  background: white;
  border-radius: 6px;
  overflow: scroll;
}

#client-files-tile h2 {
  margin-top: 10px;
  margin-left: 20px;
}

#client-files-tile p {
  margin-top: 10px;
  margin-left: 20px;
}

.client-file {
  margin-left: 20px;
}

.client-file > span {
  text-decoration: underline;
  cursor: pointer;
}
</style>
