<template>
  <div id="app">
    <div id="app-is-loading" v-if="eventData === null">
      <p>{{ $t('app_is_loading')}}</p>
      <img src="./assets/30.gif"/>
    </div>
    <div v-else id="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HelperMixin from './helpers/HelperMixin'

export default {
  name: 'app',
  mixins: [HelperMixin]
}
</script>

<style>
body {
  /*background: linear-gradient(305.2deg, #F2B135 -8%, #B62525 34.31%, #1A2A6C 106.3%);*/
  background-attachment: fixed;
  font-family: 'renner_mediummedium', sans-serif;
  height: 100vh;
  width: 100vw;
  margin: 0;
}

::-webkit-scrollbar {
    display: none;
}
</style>
