<template lang="pug">
  .page 
    VHero

    VPluses(v-if="!$device.isDesktop")
    VAbout
    VAdvantages 
    VServices()
    VFaq
    VNewsSection
    VReviews
    VPresent
    VPartners
    VContact
</template>

<script>

import Vue from 'vue'



export default Vue.extend({
  name: 'IndexPage',

  computed:{
  
  },

})
</script>

<style>

.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 250ms;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}


</style>