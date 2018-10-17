<template>
  <div class="place">
    <!--<iframe
      frameborder="0" 
      style="width: 100%; border: none"
      v-bind:src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyAmPKzbCSkWDG8Jk-jJ2Ag8SfE_CYOC1Ro
        &q=${placeQuery}`">
    </iframe>-->
    <iframe
      style="width: 100%; border: none; pointer-events: none"
      :src="`https://maps.google.com/maps?q=${placeQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`"
      frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
    <h2>{{$t('address-label')}} :</h2>
    <p>
      {{date['place_name']}}<br/>
      {{date['place_address']}}<br/>
      {{date['place_zipcode']}}<br/>
      {{date['place_town']}}
    </p>
    <h2>{{$t('contact-label')}} :</h2>
    <p>
      {{date['place_phone']}}
    </p>
    <h2>{{$t('date-label')}} :</h2>
    <p>{{beautifulDate}}, </p>
  </div>
</template>

<script>
export default {
  name: 'place',
  computed: {
    eventData () {
      return this.$store.state.eventData
    },
    placeQuery () {
      let date = this.eventData.dates[this.$store.state.currentEventDate]
      return encodeURI(/*date['place_name']+*/date['place_address']+date['place_town'])
    },
    date () {
      return this.eventData.dates[this.$store.state.currentEventDate]
    },
    beautifulDate () {
      let dateObject = new Date(this.eventData['dates'][this.$store.state.currentEventDate]['date_start'])
      return `${this.$t('week-day-' + dateObject.getDay())} ${dateObject.getDate()} ${this.$t('month-' + dateObject.getMonth())} ${dateObject.getFullYear()}`
    },
    beautifulHour () {
      let dateObject = new Date(this.eventData['dates'][this.$store.state.currentEventDate]['date_start'])
      return `${dateObject.getHours()}:${dateObject.getMinutes()}`
    }
  }
}
</script>

<style>
.desc {
  display: grid;
  grid-template-columns: 6fr 3fr;
  font-size: 15px;
  gap: 18px
}

.desc p {
  margin-top: 0px;
}

.event-desc {
  grid-column: 1;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>

