<template>
  <div id="series-grid">
    <div id="series-detail">
      <p v-if="coms.length == 0" class="recette-loader">
        Chargement des recettes 😋
      </p>
      <SeriesRecetteTile v-for="com in coms" :key="com.pid" :comobj="com" @expand-recette="expandRecette"></SeriesRecetteTile>
      <SeriesExpandedRecetteTile :comobj="expandedcom" v-if="expandedcom && openExpand"  @close-expand="openExpand = false"></SeriesExpandedRecetteTile>
    </div>
    <!--<div id="series-list">
        <SeriesTimeLine @choosed="popUp"></SeriesTimeLine>
    </div>-->
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
import SeriesRecetteTile from '../components/series/SeriesRecetteTile'
import SeriesExpandedRecetteTile from '../components/series/SeriesExpandedRecetteTile'
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
      this.eventObj = obj
      this.coms = obj.posts
      this.books = obj.books
      /*
      await fetch(this.$store.state.wsUrl)
        .then((resp) => {
          return resp.json()
        })
        .then(data => {
          self.coms = data.posts
        })
        */
    },
    currentCom: function (time) {
      if (!this.eventObj) {
        return false
      } else {
        const nbOfDates = this.eventObj.dates.length - 1
        let comWeek = getWeekNumber(new Date(parseInt(time)))
        let startWeek = getWeekNumber(parseDate(this.eventObj.dates[0].date_start))
        let endWeek = getWeekNumber(parseDate(this.eventObj.dates[nbOfDates].date_start))
        return comWeek >= startWeek && comWeek <= endWeek

      }
    },
    expandRecette: function (param) {
      this.openExpand = true
      this.expandedcom = param
    }
  },
  data: function () {
    return {
      eventObj:null,
      urlLocation: window.location,
      coms: [],
      books: [],
      expandedcom: null,
      openExpand: true
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
    SeriesBookTile,
    SeriesRecetteTile,
    SeriesExpandedRecetteTile
  },
  mounted: function () {
    var msnry = new Masonry('#series-detail', {
      itemSelector: '.grid-item',
      columnWidth: 220,
      //gutter: 20
    });

    let wsUrl = 'https://noble-stoplight.herokuapp.com/ws2/atable'// + encodeURIComponent('https://placed.cc.au.dk/Y2p7kat0Vu/')
    fetch(`${wsUrl}`)
      .then(resp => {
        return resp.json()
      })
      .catch((err) => {
        console.error(err)
        //return new Promise()
      })
      .then((data) => {
        if (data) {
          this.eventObj = data.events[0]
          this.coms = data.events[0].posts
          this.books = data.events[0].books
        }
      })

/*
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
    }, 20000)*/
  }
}
</script>


<style scoped>
.series-tile-text {
  background-color: #3e0449;
  color: white;
}

#series-grid {
  display: grid;
  grid-template-columns: 100vw;
  width: 100%;
  background-color: white;
  font-family: 'Myriad';
  overflow: auto;
  overflow-x: hidden;
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
  background-color: #3e0449;
  position: fixed;
  bottom: 3vh;
  left: 10vw;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50px;
  z-index: 26;
  border: solid 2px white;
}

.series-img-close-button img {
  width: 25px;
  transform: translate(50%, 50%);
}

.series-tile {
  background-color: #ffcc33;
  color: #3e0449;
  border-radius: 6px;
  cursor: pointer;
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

.recette-loader {
  animation:blink normal 1s infinite ease-in-out;
}

@keyframes blink {
    0% {
        color : rgba(255,0,0,1);
    }
    50% {
        color : rgba(255,0,0,0.5);
    }
    100% {
        color : rgba(255,0,0,1);
    }
}

.grid-item {
  margin: 10px;
  width: 180px;
  padding: 2px;
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
