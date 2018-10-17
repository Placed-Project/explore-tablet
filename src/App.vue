<template>
  <div id="app">
    <div id="app-is-loading" v-if="eventData === null">
      <p>{{ $t('app_is_loading')}}</p>
      <img src="./assets/30.gif"/>
    </div>
    <div v-else id="app-content">
      <nav id="nav">
        <router-link to="/"><div class="nav-item"><span>{{$t('nav-description')}}</span></div></router-link>
        <router-link to="/place"><div class="nav-item"><span>{{$t('nav-place')}}</span></div></router-link>
      </nav>
      <div id="event-title">
        <h1>{{eventData['event_title']}}</h1>
        <h2>{{beautifulDate}}, {{eventData['dates'][$store.state.currentEventDate]['place_name']}}</h2>
      </div>
      <div id="app-body">
        <router-view/>
      </div>
      <catch-screen v-if="showCatchScreen" v-on:hide-catch-screen="showCatchScreen = false"></catch-screen>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CatchScreen from './components/CatchScreen'

export default {
  name: 'app',
  components: {
    CatchScreen
  },
  data: function () {
    return {
      timeoutId: -1,
      appObserver: null,
      showCatchScreen: true
    }
  },
  computed: {
    eventData () {
      return this.$store.state.eventData
    },
    beautifulDate () {
      let dateObject = new Date(this.eventData['dates'][this.$store.state.currentEventDate]['date_start'])
      return `${this.$t('week-day-' + dateObject.getDay())} ${dateObject.getDate()} ${this.$t('month-' + dateObject.getMonth())} ${dateObject.getFullYear()}`
    }
  },
  methods: {
    resetCatchScreenTimeout (event) {
      if (this.timeoutId != -1) {
        clearTimeout(this.timeoutId)
      }
      this.timeoutId = setTimeout(() => {
        this.showCatchScreen = true
      }, 60000)
    }
  },
  created () {
    window.addEventListener('scroll', this.resetCatchScreenTimeout)
  },
  mounted () {
    var targetNode = document.getElementById('app')
    var config = { attributes: true, childList: true, subtree: true }
    this.appObserver = new MutationObserver((mutationsList, observer) => {
      this.resetCatchScreenTimeout()
    })
    this.appObserver.observe(targetNode, config)
  },
  destroyed () {
    window.removeEventListener('scroll', this.resetCatchScreenTimeout)
    this.appObserver.disconnect()
  }
}
</script>

<style>
#app-content {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 164px 1fr;
  gap: 18px;
}

#nav {
  grid-column: 1/4;
  grid-row: 2;
}

#nav > a {
  text-decoration: none !important;
  cursor: pointer;
}

.nav-item:hover {
  color: white;
  background: linear-gradient(270deg, #F2B135 0%, rgba(255, 255, 255, 0) 57.28%), #B62525;
}

.nav-item {
  display: block;
  margin-bottom: 20px;
  background: #FFFFFF;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  height: 40px;
  color: black;
  font-family: 'source_code_promedium', monospace;
  font-size: 20px;
}

.nav-item > span {
  padding-top: 6px;
  margin-left: 40px;
  display: block;
}

nav > a.router-link-exact-active > .nav-item {
  color: white;
  background: linear-gradient(270deg, #F2B135 0%, rgba(255, 255, 255, 0) 57.28%), #B62525;
}

#app-body {
  grid-column: 5/13;
  grid-row: 2;
  font-family: 'renner_mediummedium', sans-serif;
}

#event-title {
  grid-column: 5/13;
  grid-row: 1;
  font-family: 'rennerbold', sans-serif;
}

h1 {
  font-size: 36px;
  margin-bottom: 0;
}

h2 {
  font-size: 15px;
  margin-top: 0.5em;
}

body {
  background-color: #f7f7f7;
}
</style>
