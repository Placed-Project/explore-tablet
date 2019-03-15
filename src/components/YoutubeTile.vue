<template>
  <div class="explore-tile youtube-tile" :class="{ 'focused-tile' : focused }" @click="focused = !focused">
    <h2 v-if="!focused" class="youtube-h2-tile">{{link.label.slice(2)}}</h2>
    <img v-if="!focused" src="../assets/triangle.svg">
    <div>
      <!--<iframe width="560" height="315" src="https://www.youtube.com/embed/qT1jnon2Cd0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>-->
      <iframe v-if="focused" width="100%" height="400" :src="`https://www.youtube.com/embed/${id}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
    id () {
      return this.link.url.match(/^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|&vi?=)([^#&?]*).*/)[2]
    }
  }
}
</script>

<style>
.youtube-tile {
  grid-row: span 2;
  grid-column: span 1;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  background-color: red;
}

.youtube-tile.focused-tile {
  background-color: #221d23;
}

.youtube-tile img {
  position: absolute;
  height: 75%;
  margin-left: 55%;
  margin-top: 12px;
  transform: translate(-50%, 0);
  z-index: 2;
}

.youtube-tile h2 {
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
