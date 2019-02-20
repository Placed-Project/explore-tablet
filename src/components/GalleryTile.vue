<template>
  <div id="gallery-tile" class="explore-tile">
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
  grid-row: span 4;
  grid-column: span 1;
  background: black;
  border-radius: 6px;
  overflow: hidden;
}

#gallery-tile img {
  object-fit: contain;
}

#gallery-h2-tile {
  margin-top: 10px;
  margin-left: 20px;
  position: absolute;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
