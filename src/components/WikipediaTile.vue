<template>
  <div class="explore-tile other-tile">     
    <a v-if="!$store.state.libraryDevice" target="_blank" rel="noopener noreferrer" :href="href">
      <h2 class="other-h2-tile">{{link.label.slice(2)}}</h2>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png"/>
    </a>
    <a v-else :href="href">
      <h2 class="other-h2-tile">{{link.label.slice(2)}}</h2>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png"/>
    </a>
  </div>
</template>

<script>
import HelperMixinVue from '../helpers/HelperMixin.vue'

export default {
  mixins: [HelperMixinVue],
  props: [
    'link'
  ],
  computed: {
    href () {
      return this.link.url
    }
  }
}
</script>
