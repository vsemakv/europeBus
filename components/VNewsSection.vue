<template lang="pug">
.news 
    .news__trigger(ref="newsSection" id="news")
    .container(:class="{'animated-line-button': isAnimatedLineButton}") 
        .news__title(ref="newsTitle" v-intersect="onTitle" :class="{'animated-line': isAnimatedLine}") 
            VTitle(:title="$t('news.title')" data-aos="fade-right" :data-aos-delay="animationDelay" :data-aos-duration="animationDuration")
        .news__content
        p.news__content-text {{ $t('news.text') }}
        VNews(:news="section")
        .news__button(ref="newsButton" v-intersect="onButton" )
            n-link(:to="`/${$i18n.locale}/news`")
                VButton(:title="$t('news.button')")
</template>

<script>
import { mapGetters } from "vuex";
    export default {
        computed: {
            ...mapGetters({
                section: "articles/getSection",
            }),
        },
        data() {
            return {
                isAnimatedLine: false,
                isAnimatedLineButton: false,
                animationDuration: 900,
                animationDelay: 100,
            }
        },
        methods: {
            onTitle(entries) {
                if (entries.isIntersecting) {
                    this.isAnimatedLine = true;
                }
            },
            onButton(entries) {
                if (entries.isIntersecting) {
                    this.isAnimatedLineButton = true;
                }
            },
        },
        mounted () {
            if (window.innerWidth < 900) {
                this.animationDuration = 0;
                this.animationDelay = 0;
            } else {
                this.animationDuration = 1000;
                this.animationDelay = 100;
            }
            this.$nextTick(() => {
                this.$store.commit("refs/setNews", this.$refs.newsSection);
            });
            if (this.$route.hash === '#about') {
                this.$nextTick(() => {
                    this.$scrollTo(this.$refs.about)
                })
            }
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 1
            };
            const FirstLine = new IntersectionObserver(this.onTitle, options);
            FirstLine.observe(this.$refs.newsTitle);
            const SecondLine = new IntersectionObserver(this.onButton, options);
            SecondLine.observe(this.$refs.newsButton);
        },
    }
</script>

<style lang="scss" scoped>
.news { 
    position: relative;
    
    
    @include mid { 

    }
    &__content { 
        padding-top: 16px;
        
        @include mid { 
            padding-top: 1.667vw;
            padding-bottom: 1.667vw;
            position: relative;
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
        @include mid { 
            width: 33.056vw;
            padding-top: 1.111vw;
            margin: 0 auto;
        }
    }
    &__title { 
        position: relative;
        padding-bottom: 8px;

        @include mid { 
            padding-bottom: 1.111vw;
        }
        &::after { 
            position: absolute;
            display: block;
            content: "";
            left: 0%;
            bottom: 0%;
            height: 3px;
            width: 0%;
            background-color: #13AD68;
            border-radius: 3px;

            @include mid { 
                border-radius: 0.208vw;
                height: 0.208vw;
            }
        }
    }
    &__trigger { 
        position: absolute;
        top: -100px;
        left: 0px;
        width: 10px;
        height: 10px;

        @include mid { 
            top: -3.944vw;
        }
    }
}
.container { 
    position: relative;
    padding-bottom: 32px;

    @include mid {
        padding-bottom: 1.667vw;
    }
    &::after { 
        position: absolute;
        display: block;
        content: "";
        right: 24px;
        bottom: 0%;
        height: 3px;
        width: 0%;
        background-color: #13AD68;
        border-radius: 3px;

        @include mid { 
            right: 13.889vw;
            border-radius: 0.208vw;
            height: 0.208vw;
            width: 0%;
        }
    }
}
.animated-line { 
    &::after { 
        transition: all 1s;
        width: 40%;
    }
}
.animated-line-button { 

    &::after { 
        transition: all 1.5s;
        width: 60%;

        @include mid { 
            width: 30%;
        }
    }
    
}
</style>