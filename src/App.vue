<template>
  <div id="app">
    <div id="app-is-loading" v-if="eventData === null">
      <p>{{ $t('app_is_loading')}}</p>
      <img src="./assets/30.gif"/>
    </div>
    <div v-else id="app-content">
      <nav id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </nav>
      <div id="event-title">
        <h1>{{eventData['event_title']}}</h1>
        <h2>{{beautifulDate}}, {{eventData['dates'][0]['place_name']}}</h2>
      </div>
      <div id="app-body">
        <router-view/>
      </div>
    </div>
    <catch-screen v-if="showCatchScreen" v-on:hide-catch-screen="showCatchScreen = false"></catch-screen>
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
      libraryApiUrl: 'https://www.bm-lyon.fr/json_explore.php?action=detail&id=',
      eventId: '4401',
      timeoutId: -1,
      appObserver: null,
      showCatchScreen: false
    }
  },
  computed: {
    eventData () {
      return this.$store.state.eventData
    },
    beautifulDate () {
      let dateObject = new Date(this.eventData['dates'][0]['date_start'])
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
        console.log('showCatchScreen')
      }, 6000)
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
  grid-column: 1/3;
  grid-row: 2;
  padding: 30px;
}

#nav a {
  display: block;
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#app-body {
  grid-column: 4/12;
  grid-row: 2;
}

#event-title {
  grid-column: 4/12;
  grid-row: 1;
}
</style>
