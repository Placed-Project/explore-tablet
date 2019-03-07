<template>
  <div id="event-popup">
    <div id="event-popup-bg"></div>
    <div id="event-popup-body"></div>
  </div>
</template>

<script>
export default {
  mounted: function () {
    document.querySelector('#hall-view #grid-wrapper').classList.add('blurry')
  },
  beforeDestroy: function () {
    document.querySelector('#hall-view #grid-wrapper').classList.remove('blurry')
  }
}
</script>


<style>
#event-popup-body {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 33vw;
}

#event-popup-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
}

#hall-view #grid-wrapper.blurry {
  filter: blur(4px);
}
</style>

