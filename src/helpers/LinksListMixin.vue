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
      this.$store.state.nbOfLinks = 0
      this.$store.state.database.ref(`event/${newItem.event_id}/links`).on('child_added', (data) => {
        this.$store.state.nbOfLinks += 1
        this.links.push(data)
      })
      this.$store.state.database.ref(`event/${newItem.event_id}/links`).on('child_removed', (data) => {
        this.$store.state.nbOfLinks -= 1
        this.links.splice(this.links.indexOf(data, 1))
      })
    }
  }
}
</script>
