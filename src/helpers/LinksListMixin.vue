<script>
export default {
  data: function () {
    return {
      links: []
    }
  },
  methods: {
    loadLinkList: function (newItem, oldItem) {
      // Refresh link list
      if (oldItem && oldItem.event_id) {
        this.$store.state.database.ref(`event/${oldItem.event_id}/links`).off('child_added')
        this.$store.state.database.ref(`event/${oldItem.event_id}/links`).off('child_removed')
      }
      this.links = []
      this.$store.state.database.ref(`event/${newItem.event_id}/links`).on('child_added', (data) => {
        this.links.push(data)
      })
      this.$store.state.database.ref(`event/${newItem.event_id}/links`).on('child_removed', (data) => {
        this.links.splice(this.links.indexOf(data, 1))
      })
    }
  }
}
</script>
