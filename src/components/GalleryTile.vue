<template>
  <div id="gallery-tile" class="explore-tile" :class="{ 'focused-tile' : focused }" @click="focused = !focused">
    <!--<h2 id="gallery-h2-tile">{{$t('gallery-label')}}</h2>-->
    <img :src="eventData['image_url']"/>
  </div>
</template>

<script>
import HelperMixinVue from '../helpers/HelperMixin.vue'

export default {
  mixins: [HelperMixinVue]
}
</script>

<style>
#gallery-tile {
  grid-row: span 3;
  grid-column: span 1;
  background: black;
  border-radius: 6px;
  overflow: hidden;
  top:0;
  left: 0;
}

#gallery-tile img {
  object-fit: contain;
  margin-left: 50%;
  transform: translate(-50%);
}

#gallery-h2-tile {
  margin-top: 10px;
  margin-left: 20px;
  position: absolute;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
