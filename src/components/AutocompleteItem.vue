<template>
  <div>
    <b>#{{item.event_id}}</b>
    <span> : {{ item.event_title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true }
  }
}
</script>
