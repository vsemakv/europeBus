<template lang="pug">
section.reviews   
    .container 
        .reviews__title(data-aos="fade-right")
            VTitle(:title="$t('slider.title')" )
        .reviews__slider()
            VSwiper
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.reviews { 
    padding-bottom: 63px;
    @include mid { 
        padding: 0;
    }
    &__slider { 
        padding-top: 40px;

        @include mid  {
            padding-top: 3.333vw;
        }
    }
    &__title { 
        @include mid  {
            padding: 0 13.889vw;
        }
    }
}
.container { 
    @include mid { 
        padding: 0;
    }
}
@media (max-width: 900px) {
  [data-aos="fade-right"] {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>