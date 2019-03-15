<template>
  <div class="explore-tile other-tile">     
    <a v-if="!$store.state.libraryDevice" target="_blank" rel="noopener noreferrer" :href="href">
      <h2 class="other-h2-tile">{{link.label.slice(2)}}</h2>
      <img src="https://images.unsplash.com/photo-1534774592507-488885376ad3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=550&q=80"/>
    </a>
    <a v-else :href="href">
      <h2 class="other-h2-tile">{{link.label.slice(2)}}</h2>
      <img src="https://images.unsplash.com/photo-1534774592507-488885376ad3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=550&q=80"/>
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

