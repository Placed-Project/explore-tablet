<template>
  <div class="explore-tile partner-tile" :class="{ 'focused-tile' : focused }" @click="toggleFocus()">
    <h2 class="partner-h2-tile">{{$t('partner-label')}} : {{partnerObj.partenaire_nom}}</h2>
    <span v-if="hasDesc && !focused" class="partner-learnmore">{{$t('partner-learnmore-label')}}</span>
    <div v-if="focused" class="partner-desciption-body" v-html="partnerObj.partenaire_description"></div>
    <p v-if="focused && hasLink">{{$t('visit-partnerwebsite-label')}}</p>
    <a v-if="!hasDesc && hasLink && !$store.state.libraryDevice" target="_blank" rel="noopener noreferrer" :href="partnerObj.partenaire_url">
      {{$t('partner-website-label')}}
    </a>
    <a v-else-if="hasLink" :href="partnerObj.partenaire_url">
      {{$t('partner-website-label')}}
    </a>
  </div>
</template>

<script>
import HelperMixinVue from '../helpers/HelperMixin.vue'

export default {
  mixins: [HelperMixinVue],
  props: [
    'partnerObj'
  ],
  data: function () {
    return {
      hasLink: false
    }
  },
  created: function () {
    if (this.partnerObj.partenaire_url.match(/http[s]?\:\/\/.+\..+/)) {
      this.hasLink = true
    }
  },
  computed: {
    hasDesc: function () {
      return this.partnerObj.partenaire_description.length > 0
    }
  },
  methods: {
    toggleFocus: function () {
      if (this.partnerObj.partenaire_description.length === 0 && !this.hasLink) {
        this.focused = false
        return
      }
      this.focused = !this.focused
    }
  }
}
</script>

<style>
.partner-tile {
  color: black;
  grid-row: span 2;
  grid-column: span 1;
  background: #aec2d8;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.partner-tile.focused-tile {
  background: white;
}

.partner-h2-tile {
  margin-top: 10px;
  margin-left: 20px;
  max-height: 60px;
  color: black;
  max-width: 80%;
  font-size: 20px;
  font-weight: 700;
  overflow: hidden;
}

.partner-learnmore {
  margin-left: 20px;
  position: absolute;
  right: 10px;
  bottom: 5px;
}

.partner-tile a {
  margin-left: 20px;
  color: black;
}

.partner-tile p {
  margin-left: 20px;
}

.partner-desciption-body {
  margin: 20px;
}
</style>
