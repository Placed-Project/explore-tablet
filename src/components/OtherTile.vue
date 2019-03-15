<template>
  <div class="explore-tile other-tile">
    <a v-if="!$store.state.libraryDevice" target="_blank" rel="noopener noreferrer" :href="href">
      <h2 class="other-h2-tile">{{link.label.slice(2)}}</h2>
      <img src="https://images.unsplash.com/photo-1525011268546-bf3f9b007f6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=550&q=80"/>
    </a>
    <a v-else :href="href">
      <h2 class="other-h2-tile">{{link.label.slice(2)}}</h2>
      <img src="https://images.unsplash.com/photo-1525011268546-bf3f9b007f6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=550&q=80"/>
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

<style>

.other-tile {
  grid-row: span 2;
  grid-column: span 1;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.other-tile img {
  max-width: 100%;
  min-width: 100%;
  min-height: 100%;
  object-fit: contain;
}

.other-h2-tile {
  margin-top: 10px;
  margin-left: 20px;
  position: absolute;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  max-width: 80%;
  font-size: 20px;
  font-weight: 700;
}
</style>
