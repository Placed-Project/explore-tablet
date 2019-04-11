<script>
export default {
  data: function () {
    return {
      links: [],
      files: []
    }
  },
  methods: {
    findIndexFromArray(firebaseitem, array) {
      console.log('wat')
      for (let i = 0 ; i < array.length ; i++) {
        if (array[i].key === firebaseitem.key) {
          return i
        }
      }
      return -1
    },
    loadLinkList: function (newItem, oldItem) {
      if (oldItem && oldItem.event_id) {
        this.loadLinkListFromId(newItem.event_id, oldItem.event_id)
      }
      this.loadLinkListFromId(newItem.event_id)
    },
    loadLinkListFromId: function (newItem, oldItem) {
      // Refresh link list
      if (oldItem) {
        this.$store.state.database.ref(`event/${oldItem}/links`).off('child_added')
        this.$store.state.database.ref(`event/${oldItem}/links`).off('child_removed')
      }
      this.links = []
      this.$store.state.nbOfLinks = 0
      this.$store.state.database.ref(`event/${newItem}/links`).on('child_added', (data) => {
        this.$store.state.nbOfLinks += 1
        this.links.push(data)
      })
      this.$store.state.database.ref(`event/${newItem}/links`).on('child_removed', (data) => {
        this.$store.state.nbOfLinks -= 1
        this.links.splice(this.findIndexFromArray(data, this.links), 1)
      })
    },
    loadFileList: function (newItem, oldItem) {
      // Refresh link list
      if (oldItem && oldItem.event_id) {
        this.$store.state.database.ref(`event/${oldItem.event_id}/files`).off('child_removed')
        this.$store.state.database.ref(`event/${oldItem.event_id}/files`).off('child_added')
      }
      this.files = []
      this.$store.state.nbOfFiles = 0
      this.$store.state.database.ref(`event/${newItem.event_id}/files`).on('child_added', (data) => {
        this.$store.state.nbOfFiles += 1
        this.files.push(data)
      })
      this.$store.state.database.ref(`event/${newItem.event_id}/files`).on('child_removed', (data) => {
        this.$store.state.nbOfFiles -= 1
        this.files.splice(this.findIndexFromArray(data, this.files), 1)
      })
    }
  }
}
</script>
