<template>
  <div class="desc">
    <div class="event-desc" v-html="eventData['event_description']"></div>
    <img :src="eventData['image_url']"/>
  </div>
</template>

<script>
export default {
  name: 'description',
  computed: {
    eventData () {
      return this.$store.state.eventData
    }
  },
  created: function () {
    if(this.$route.params.eventId)
    this.$store.dispatch('changeEventId', `${this.$route.params.eventId}`)
  }
}
</script>

<style>
.desc {
  display: grid;
  grid-template-columns: 6fr 3fr;
  font-size: 15px;
  gap: 18px
}

.desc p {
  margin-top: 0px;
}

.event-desc {
  grid-column: 1;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
