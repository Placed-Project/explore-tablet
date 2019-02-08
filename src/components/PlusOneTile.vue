<template>
  <div id="plus-one-tile" class="explore-tile" @click="interest">
    <div id="plus-one-button">
      <h2>{{interestingLabel}}</h2>
      <span>+ {{clickNb}}</span>
    </div>
  </div>
</template>

<script>
import HelperMixinVue from '../helpers/HelperMixin.vue'

export default {
  mixins: [HelperMixinVue],
  data: function () {
    return {
      clicked: false,
      clickNb: 0
    }
  },
  computed: {
    interestingLabel: function () {
      if (this.clicked) {
        return this.$t('interesting-label')
      } else {
        return this.$t('interested-label')
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.$route.params.eventId) {
        this.getClickNb(this.$route.params.eventId)
      }
    }
  },
  mounted: function () {
    this.getClickNb(this.eventData.event_id)
  },
  methods: {
    getClickNb: function (eventId) {
      this.$store.state.database.ref(`event/${eventId}/interestCount`).on('value', (dataSnapshot) => {
        if (dataSnapshot.val() !== null) {
          this.clickNb = dataSnapshot.val()
        } else {
          this.clickNb = 0
        }
      })
    },
    interest: function () {
      // If already clicked, return
      if (this.clicked) {
        return
      }
      // Increment the firebase attribute
      this.incInterest()
      this.clicked = true
      document.querySelector('#plus-one-button').classList.add('clicked')
      setTimeout(() => {
        this.clicked = false
        document.querySelector('#plus-one-button').classList.remove('clicked')
      }, 4000)
    },
    incInterest: function () {
      this.$store.state.database.ref(`event/${this.eventData.event_id}/interestCount`).transaction(function(count) {
        return count + 1;
      }, (err, committed, snap) => {
        if (err) {
          console.log(err)
        }
      })
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
  margin-top: 50%;
  margin-left: 50%;
  height: 70px;
  transform: translate(-50%, -50%);
  width: 85%;
  transition: width 0.5s, background-color 0.5s;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
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

#plus-one-button > span {
  position: absolute;
  top: 40px;
  margin-left: 50%;
  transform: translateX(-50%);
}

#plus-one-button.clicked {
  background: white;
  width: 70px;
  height: 70px;
  margin-left: 50%;
  transform: translateX(-50%);
}

#plus-one-button.clicked  > h2 {
  position: absolute;
  top: -60px;
  color: white;
}

#plus-one-button.clicked > span {
  top: 0px;
  margin-top: 50%;
  transform: translate(-50%, -50%);
}


@media (max-width: 640px) {
  #plus-one-button {
    margin-top: 20%;
  }
}
</style>
