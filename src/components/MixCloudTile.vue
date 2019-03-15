<template>
  <div class="explore-tile mixcloud-tile" :class="{ 'focused-tile' : focused }" @click="focused = !focused">
    <h2 v-if="!focused" class="mixcloud-h2-tile">{{link.label.slice(2)}}</h2>
    <img v-if="!focused" src="../assets/triangle.svg">
    <div>
      <!--<iframe width="560" height="315" src="https://www.youtube.com/embed/qT1jnon2Cd0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>-->
      <iframe v-if="focused" width="100%" height="400" :src="`https://www.mixcloud.com/widget/iframe/?feed=${feed}`" frameborder="0" ></iframe>
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
      return encodeURI(this.link.url.match(/.*\.mixcloud\.com(.*)/)[1])
    }
  }
}
</script>

<style>
.mixcloud-tile {
  grid-row: span 2;
  grid-column: span 1;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  background-color: #273a4b;
}

.mixcloud-tile.focused-tile {
  background-color: #221d23;
  position: fixed;
}

.mixcloud-tile img {
  position: absolute;
  height: 75%;
  margin-left: 55%;
  margin-top: 12px;
  transform: translate(-50%, 0);
  z-index: 2;
}

.mixcloud-tile h2 {
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
