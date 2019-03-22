<template>
  <div id="title-tile" class="explore-tile">
    <h1 id="event-title-h1-tile">{{eventData['event_title']}}</h1>
    <h2 id="event-date-h2-tile">{{beautifulDate}}, {{eventData['dates'][$store.state.currentEventDate]['place_name']}}, {{eventData['dates'][$store.state.currentEventDate]['place_phone']}}</h2>
  </div>
</template>

<script>
import HelperMixin from '../helpers/HelperMixin'

export default {
  mixins: [HelperMixin]
}
</script>

<style>
#title-tile {
  grid-column: span 3;
  grid-row: span 3;
  /*background: #F2EFE8;
  border-radius: 6px;*/
}

@media (max-width: 640px) {
  #title-tile {
    grid-column: span 1;
    min-height: fit-content;
  }
}

#event-title-h1-tile {
  font-weight: 800;
  font-size: 40px;
  color: white;
  font-family: 'rennerbold', sans-serif;
  line-height: 1.2;
  margin-bottom: 0;
  margin-left: 40px;
}

#event-date-h2-tile {
  font-weight: 800;
  font-size: 20px;
  color: white;
  font-family: 'rennerbold', sans-serif;
  margin-top: 0;
  margin-left: 40px;
}
</style>
