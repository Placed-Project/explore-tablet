<template>
  <div id="plus-one-tile" class="explore-tile" @click="interest">
    <div id="plus-one-button">
      <h2>Je suis intéressé !</h2>
    </div>
  </div>
</template>

<script>
import HelperMixinVue from '../helpers/HelperMixin.vue'

export default {
  mixins: [HelperMixinVue],
  methods: {
    interest: function () {
      // Increment the firebase attribute
      document.querySelector('#plus-one-button').classList.add('clicked')
      setTimeout(() => {
        document.querySelector('#plus-one-button').classList.remove('clicked')
      }, 2000)
    }
  }
}
</script>

<style>
#plus-one-tile {
  grid-row: span 1;
  grid-column: span 1;
  overflow: hidden;
}

#plus-one-button {
  border-radius: 50px;
  background: #FFC83D;
  padding: 4px;
  vertical-align: middle;
  text-align: center;
  margin-top: 50%;
  margin-left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 85%;
  height: 60px;
  transition: width 0.5s, background-color 0.5s;
  cursor: pointer;
}

#plus-one-button > h2 {
  margin-left: 50%;
  position: absolute;
  top: 0;
  color: black;
  transform: translateX(-50%);
  width: max-content;
  font-size: 18px;
  transition: all 0.5s;
}

#plus-one-button.clicked {
  background: white;
  width: 60px;
  height: 60px;
  margin-left: 50%;
  transform: translateX(-50%);
}

#plus-one-button.clicked  > h2 {
  position: absolute;
  top: -60px;
  color: white;
}
</style>
