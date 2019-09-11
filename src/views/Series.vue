<template>
  <div id="series-grid">
    <div id="series-detail">
      <SeriesTitleTile v-if="eventObj" :eventObj="eventObj"></SeriesTitleTile>
      <SeriesDescTile v-if="eventObj" :eventObj="eventObj"></SeriesDescTile>
      <SeriesCoverTile v-if="eventObj" :eventObj="eventObj"></SeriesCoverTile>
      <SeriesPlaceTile v-if="eventObj && eventObj.dates[0].place_name" :eventObj="eventObj"></SeriesPlaceTile>
      <SeriesBookTile v-for="book in books" v-if="currentCom(book.eventTime)" :key="book.id" :book="book"></SeriesBookTile>
      <SeriesImgComTile v-for="com in coms" v-if="currentCom(com.time)" :key="com.pid" :comobj="com"></SeriesImgComTile>
    </div>
    <div id="series-list">
        <SeriesTimeLine @choosed="popUp"></SeriesTimeLine>
    </div>
  </div>
</template>

<script>
//v-if="eventObj && (urlLocation.hostname === 'aa.placed.eu' || urlLocation.hostname === 'localhost')"
import SeriesTimeLine from '../components/series/SeriesTimeLine'
import SeriesDescTile from '../components/series/SeriesDescTile'
import SeriesTitleTile from '../components/series/SeriesTitleTile'
import SeriesCoverTile from '../components/series/SeriesCoverTile'
import SeriesPlaceTile from '../components/series/SeriesPlaceTile'
import SeriesTmpImg from '../components/series/SeriesAaKreaTmpImgTile'
import SeriesImgComTile from '../components/series/SeriesImgComTile'
import SeriesBookTile from '../components/series/SeriesBookTile'
import Masonry from 'masonry-layout'
import parseDate from 'date-fns/parse'

let getWeekNumber = function(d){
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
}

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
    },
    currentCom: function (time) {
      if (!this.eventObj) {
        return false
      } else {
        let comWeek = getWeekNumber(new Date(parseInt(time)))
        let startWeek = getWeekNumber(parseDate(this.eventObj.dates[0].date_start))
        return comWeek === startWeek

      }
    }
  },
  data: function () {
    return {
      eventObj:null,
      urlLocation: window.location,
      coms: [],
      books: []
    }
  },
  components: {
    SeriesTimeLine,
    SeriesDescTile,
    SeriesTitleTile,
    SeriesCoverTile,
    SeriesPlaceTile,
    SeriesTmpImg,
    SeriesImgComTile,
    SeriesBookTile
  },
  mounted: function () {
    var msnry = new Masonry('#series-detail', {
      itemSelector: '.grid-item',
      columnWidth: 220,
      //gutter: 20
    });

    setInterval(() => {
      let self = this
      fetch(this.$store.state.wsUrl)
        .then((resp) => {
          return resp.json()
        })
        .then(data => {
          self.coms = data.posts
          self.books = data.books
        })
      msnry.layout()
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

.series-img-close-button {
  background-color: red;
  position: fixed;
  bottom: 3vh;
  left: 10vw;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50px;
  z-index: 26;
}

.series-img-close-button img {
  width: 25px;
  transform: translate(50%, 50%);
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
  width: 180px;
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
