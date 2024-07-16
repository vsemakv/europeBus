<template lang="pug">
    .page(:class="{'error-page': isErrorPage, 'modal-active': currentDropdown}")
        .page-header 
            VHeader
            VFormModal
            VModal
            VModalSurprise
            VModalCalc
            VModalNotification

        .page-content 
            .page-body
                NuxtChild
        .page-footer 
            VFooter
        VEntry


</template>

<script>
import { mapGetters } from 'vuex';
import seoMixin from '~/mixins/seo.js';
export default {

    mixins: [
        seoMixin
    ],
    
    computed: {
            ...mapGetters({
                currentDropdown: 'dropdown/getCurrent'
            }),
            isErrorPage() {
                if (this.$route.name.includes("404")) {
                    return true;
                }
            },
    },


   beforeMount() {
    window.scrollTo({ top: 0, behavior: 'instant' });

   },

    mounted() {
    },

    }
</script>

<style lang="scss" scoped>

.page {
    transition: 0.3s ease;
    &-body {
        padding-top: 125px;
        position: relative;

        @include mid { 
            padding-top: 11.250vw;
        }
    }

    &-content {
        will-change: transform;
        overflow: hidden;
    }
    &-dropdown { 
        z-index: 3;
    }
}
.error-page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
}
.page-header { 

}
.modal-active {
  background: rgba(20, 20, 20, 0.26);
}

</style>