<template>
  <router-link :to="eventUrl">
    <div class="event-microtile">
      <h3>{{eventTitle}}</h3>
      <!--<h3>{{beautifulDate(peventData['dates'][0]['date_start'])}}</h3>-->
      <img :src="eventImage"/>
    </div>
  </router-link>
</template>

<script>
import HelperMixinVue from '../helpers/HelperMixin.vue'

export default {
  mixins: [HelperMixinVue],
  props:[
    'peventDataId'
  ],
  data: function () {
    return {
      peventData: null
    }
  },
  computed: {
    eventTitle: function () {
      return this.peventData ? this.peventData['event_title'] : ''
    },
    eventImage: function () {
      return this.peventData ? this.peventData['image_url'] : ''
    },
    eventUrl: function () {
      return this.peventData ? `/${this.peventData['event_id']}` : '/'
    }
  },
  created: function () {
    fetch(`${this.$store.state.libraryApiUrl}${this.peventDataId.event_id}`)
      .then((resp) => {
        if (resp.status !== 200) {
          return
        }
        return resp.json()
      })
      .then((data) => {
        this.peventData = data[0]
      })
  }
}
</script>

<style>
.event-microtile {
  background: black;
  border-radius: 6px;
  overflow: hidden;
  width: 350px;
  height: 140px;
  display: inline-block;
  margin-left: 5px;
  cursor: pointer;
}

.event-microtile img {
  object-fit: contain;
}

.event-microtile h2 {
  margin-top: 10px;
  margin-left: 20px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
}

.event-microtile h3 {
  margin-top: 10px;
  margin-left: 15px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  width: 90%;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
