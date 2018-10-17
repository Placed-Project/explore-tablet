<template>
  <div class="home">
    <div class="event-desc" v-html="eventData['event_description']"></div>
  </div>
</template>

<script>
export default {
  name: 'home',
  computed: {
    eventData () {
      return this.$store.state.eventData
    }
  }
}
</script>

<style>
.home {
  display: grid;
  grid-template-columns: 5fr 4fr;
}

.home p {
  margin-top: 0px;
}

.event-desc {
  grid-column: 1;
}
</style>
