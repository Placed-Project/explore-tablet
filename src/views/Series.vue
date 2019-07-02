<template>
  <div id="series-grid">
    <div id="series-detail">
      <SeriesTitleTile v-if="eventObj" :eventObj="eventObj"></SeriesTitleTile>
      <SeriesDescTile v-if="eventObj" :eventObj="eventObj"></SeriesDescTile>
      <SeriesCoverTile v-if="eventObj" :eventObj="eventObj"></SeriesCoverTile>
      <SeriesPlaceTile v-if="eventObj && eventObj.dates[0].place_name" :eventObj="eventObj"></SeriesPlaceTile>
      <SeriesTmpImg v-if="eventObj && (urlLocation.hostname === 'aa.placed.eu' || urlLocation.hostname === 'localhost')" :eventObj="'img/tmp-img-aa/IMG_5531.JPG'"></SeriesTmpImg>
      <SeriesTmpImg v-if="eventObj && (urlLocation.hostname === 'aa.placed.eu' || urlLocation.hostname === 'localhost')" :eventObj="'img/tmp-img-aa/IMG_5532.JPG'"></SeriesTmpImg>
      <SeriesTmpImg v-if="eventObj && (urlLocation.hostname === 'aa.placed.eu' || urlLocation.hostname === 'localhost')" :eventObj="'img/tmp-img-aa/IMG_5533.JPG'"></SeriesTmpImg>
      <SeriesTmpImg v-if="eventObj && (urlLocation.hostname === 'aa.placed.eu' || urlLocation.hostname === 'localhost')" :eventObj="'img/tmp-img-aa/IMG_5534.JPG'"></SeriesTmpImg>
      <SeriesTmpImg v-if="eventObj && (urlLocation.hostname === 'aa.placed.eu' || urlLocation.hostname === 'localhost')" :eventObj="'img/tmp-img-aa/IMG_5536.JPG'"></SeriesTmpImg>
      <SeriesImgComTile v-for="com in coms" :key="com.id" :comobj="com"></SeriesImgComTile>
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
import SeriesTmpImg from '../components/series/SeriesAaKreaTmpImgTile'
import SeriesImgComTile from '../components/series/SeriesImgComTile'
import Masonry from 'masonry-layout'

export default {
  methods: {
    popUp: async function (obj) {
      let self = this
      this.eventObj = obj
      await fetch(this.$store.state.wsUrl)
        .then((resp) => {
          return resp.json()
        })
        .then(data => {
          self.coms = data.posts
        })
    }
  },
  data: function () {
    return {
      eventObj:null,
      urlLocation: window.location,
      coms: []
    }
  },
  components: {
    SeriesTimeLine,
    SeriesDescTile,
    SeriesTitleTile,
    SeriesCoverTile,
    SeriesPlaceTile,
    SeriesTmpImg,
    SeriesImgComTile
  },
  mounted: function () {
    var msnry = new Masonry('#series-detail', {
      itemSelector: '.grid-item',
      columnWidth: 220,
      gutter: 20
    });

    setInterval(() => {
      let self = this
      fetch(this.$store.state.wsUrl)
        .then((resp) => {
          return resp.json()
        })
        .then(data => {
          self.coms = data.posts
        })
    }, 10000)
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
  width: 220px;
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
