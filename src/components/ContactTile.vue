<template>
  <div id="contact-tile" class="explore-tile" :class="{ 'focused-tile' : focused }" @click="focused = !focused">
    <!--<h2 id="contact-h2-tile">{{$t("address-label")}}</h2>
    <p>
      {{date['place_name']}}<br/>
      {{date['place_address']}}<br/>
      {{date['place_zipcode']}}<br/>
      {{date['place_town']}}
    </p>-->
    <h2>{{$t('contact-label')}} :</h2>
    <p>
      {{date['place_phone']}}
    </p>
  </div>
</template>

<script>
import HelperMixinVue from '../helpers/HelperMixin.vue'

export default {
  mixins: [HelperMixinVue],
  computed: {
    date () {
      return this.eventData.dates[this.$store.state.currentEventDate]
    }
  }
}
</script>

<style>
#contact-tile {
  grid-row: span 2;
  grid-column: span 1;
  background: white;
  border-radius: 6px;
  overflow: scroll;
}

#contact-tile h2 {
  margin-top: 10px;
  margin-left: 20px;
}

#contact-tile p {
  margin-top: 10px;
  margin-left: 20px;
}
</style>
