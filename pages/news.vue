<template lang="pug">
.news
    .container
        VTitle(:title="$t('news.title')" isNews=true data-aos="fade-right")
        .news__content 
            p.news__content-text(data-aos="fade-right") {{ $t('news.text') }}
            .news__content-news(:class="{'show': isSHowMore}")
                VNews(:news="articles")
            .news__button(@click="showMore") 
                VButton(:title="$t('news.button')")
</template>

<script>
import { mapGetters } from "vuex";
    export default {
        computed: {
            ...mapGetters({
                articles: "articles/getArticles",
            }),
        },
        data() {
            return {
                isSHowMore: false
            }
        },
        methods: {
            showMore() {
                this.isSHowMore = true
            }
        },
    }
</script>

<style lang="scss" scoped>
.news { 
    padding-bottom: 6.667vw;
    &__content { 
        
        padding-top: 16px;
        @include mid { 
            padding-top: 1.667vw;
            padding-bottom: 1.667vw;
            position: relative;
            &::after { 
                display: block;
                position: absolute;
                content: "";
                bottom: 0;
                right: 0;
                width: 26.042vw;
                height: 0.208vw;
                background: #13AD68;
                border-radius: 0.208vw;
            }
        }
        &-news  {
            overflow: hidden;
            transition: height 1s;
            max-height: 1100px;
            @include mid { 
                max-height: 63.861vw;
            }
        }
        &-text { 
            margin-bottom: 40px;
            font-weight: 500;
            font-size: 14px;
            line-height: 17px;
            color: #030303;

            @include mid { 
                margin-bottom: 3.333vw;
                font-size: 1.111vw;
                line-height: 1.389vw;
            }
        }
    }

    
    &__button { 
        margin-top: 8px;

        @include mid { 
            margin: 0 auto;
            // margin-top: 130vw;

            // margin-top: 2.778vw;
            max-width: 32.917vw;
        }
    }
}
.show { 
    transition: height 1s;
    max-height: none;
}
</style>