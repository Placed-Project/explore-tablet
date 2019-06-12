<template>
  <div id="series-grid">
    <div id="series-detail">
      <SeriesTitleTile v-if="eventObj" :eventObj="eventObj"></SeriesTitleTile>
      <SeriesDescTile v-if="eventObj" :eventObj="eventObj"></SeriesDescTile>
      <SeriesCoverTile v-if="eventObj" :eventObj="eventObj"></SeriesCoverTile>
      <SeriesPlaceTile v-if="eventObj" :eventObj="eventObj"></SeriesPlaceTile>
    </div>
    <div id="series-list">
        <SeriesTimeLine @choosed="popUp"></SeriesTimeLine>
    </div>
  </div>
</template>

<script>

import SeriesTimeLine from '../components/series/SeriesTimeLine'
import SeriesDescTile from '../components/series/SeriesDescTile'
import SeriesTitleTile from '../components/series/SeriesTitleTile'
import SeriesCoverTile from '../components/series/SeriesCoverTile'
import SeriesPlaceTile from '../components/series/SeriesPlaceTile'
import Masonry from 'masonry-layout'

export default {
  methods: {
    popUp: function (obj) {
      this.eventObj = obj
    }
  },
  data: function () {
    return {
      eventObj:null
    }
  },
  components: {
    SeriesTimeLine,
    SeriesDescTile,
    SeriesTitleTile,
    SeriesCoverTile,
    SeriesPlaceTile
  },
  mounted: function () {
    var msnry = new Masonry('#series-detail', {
      itemSelector: '.grid-item',
      columnWidth: 220,
      gutter: 20
    });
  }
}
</script>


<style>
#series-grid {
  display: grid;
  grid-template-columns: 75vw 25vw;
  width: 100%;
  background-color: #E8E8E8;
  font-family: 'Myriad';
  overflow: scroll;
  min-height: 100vh;
  position: fixed;
}

#series-detail {
  margin-left: 120px;
  margin-right: 120px;
}

#series-list {
  position: fixed;
  width: 25vw;
  right: 0;
}

.series-tile {
  background-color: white;
  border-radius: 6px;
}

.series-tile-header {
  background-color: #4AA4FF;
  position: relative;
  margin: -20px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 20px;
  text-align: center;
  color: white;
}

.series-tile-header > img {
  height: 1.5em;
  vertical-align: bottom;
}

.series-tile-textpostheader {
  margin-top: 40px;
}

.grid-item {
  margin: 10px;
  width: 200px;
  padding: 20px;
  float: left;
}

.grid-item--width2 {
  width: 420px;
}


.grid-item--width3 {
  width: 640px;
}

.grid-item--width5 {
  width: 100%;
}
</style>
