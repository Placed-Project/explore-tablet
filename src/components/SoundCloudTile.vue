<template>
  <div class="explore-tile soundcloud-tile" :class="{ 'focused-tile' : focused }" @click="focused = !focused">
    <h2 v-if="!focused" class="soundcloud-h2-tile">{{link.label.slice(2)}}</h2>
    <img v-if="!focused" src="../assets/triangle.svg">
    <div>
      <iframe v-if="focused" width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" :src="`https://w.soundcloud.com/player/?url=${feed}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`"></iframe>
    </div>
  </div>
</template>

<script>
import HelperMixinVue from '../helpers/HelperMixin.vue'
import LinksListMixinVue from '../helpers/LinksListMixin.vue'

export default {
  mixins: [HelperMixinVue, LinksListMixinVue],
  props: [
    'link'
  ],
  computed: {
    feed () {
      return encodeURI(this.link.url)
    }
  }
}
</script>

<style>
.soundcloud-tile {
  grid-row: span 2;
  grid-column: span 1;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  background-color: #f50;
}

.soundcloud-tile.focused-tile {
  background-color: #221d23;
  position: fixed;
}

.soundcloud-tile img {
  position: absolute;
  height: 75%;
  margin-left: 55%;
  margin-top: 12px;
  transform: translate(-50%, 0);
  z-index: 2;
}

.soundcloud-tile h2 {
  position: absolute;
  background-color: #221d2388;
  color: white;
  margin-top: 10px;
  margin-left: 20px;
  font-size: 16px;
  font-weight: 700;
  z-index: 3;
}

</style>
