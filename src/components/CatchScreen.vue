<template>
  <div class="catchscreen" @click="$emit('hide-catch-screen')">
    <h1>catchscreen</h1>
  </div>
</template>

<script>
export default {
  name: 'catchscreen'
}
</script>

<style>
.catchscreen {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: white;
  cursor: pointer;
}
</style>

