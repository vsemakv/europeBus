<template lang="pug">
section.about 
    .about__trigger(ref="aboutSection" id='about')
    .container 
        .about__wrapper
            .about__title(ref="aboutTitle" :class="{'in-vision-60': isAnimatedTop}" v-intersect="onIntersectionTop")
                VTitle(:title="$t('about.title')" line data-aos="fade-right" :data-aos-delay="100" :data-aos-duration="900")
            .about__content 
                p.about__text(v-html="$t('about.text')" data-aos="fade-right" :data-aos-delay="100" :data-aos-duration="900")
                .about__image(v-if="!$device.isDesktop" data-aos="fade-left" :data-aos-delay="400" :data-aos-duration="900")
                    img(data-src="/images/salon.webp", :alt="$t('about.altPhoto')" width="100%" height="100%" v-lazy-load )
                    .about__image-bg
        .about__image(v-if="$device.isDesktop" data-aos="fade-left" :data-aos-delay="100" :data-aos-duration="900")
            img(data-src="/images/salon-desktop.webp", :alt="$t('about.altPhoto')" width="100%" height="100%" v-lazy-load)
            .about__image-bg
</template>

<script>
import { mapGetters } from "vuex";
    export default {
        computed: {
            ...mapGetters({
                aboutBlock: "refs/getAbout",
            }),
        },
        data() {
            return {
                isAnimatedTop: false
            }
        },
        methods: {
            onIntersectionTop(entries) {
                if (entries.isIntersecting) {
                    this.isAnimatedTop = true;
                }
            },
        },
        mounted () {
            this.$store.commit("refs/setAbout", this.$refs.aboutSection);
            // setTimeout(() => {
            //     this.$store.commit("refs/setAbout", this.$refs.about);
                
            // }, 1);
            // this.$nextTick(() => {
            // });
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 1
            };
            const FirstLine = new IntersectionObserver(this.onIntersectionTop, options);
            FirstLine.observe(this.$refs.aboutTitle);
            
            if (this.$route.hash === '#about') {
                this.$nextTick(() => {
                    this.$scrollTo(this.$refs.about)
                })
            };
        },
    }
</script>

<style lang="scss" scoped>
.about { 
    padding-bottom: 41px;
    position: relative;
    @include mid { 
        padding-top: 13.278vw;
    }
    &__trigger { 
        position: absolute;
        top: -100px;
        left: 0px;
        width: 10px;
        height: 10px;
        @include mid { 
            top: 3.472vw;
        }
    }
    &__title { 
        position: relative;

        &::before { 
            position: absolute;
            content: "";
            display: block;
            top: 0%;
            left: 0%;
            height: 3px;
            width: 0px;
            background-color: #13AD68;

            @include mid { 
                width: 0%;
                height: 0.208vw;
            }
        }
    }
    &__content { 
        margin-top: 24px;

        @include mid { 
            margin-top: 3.889vw;
        }
    }
    &__text { 
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #030303;

        @include mid { 
            font-size: 1.111vw;
            line-height: 1.389vw;
            
        }
    }
    &__image {
        margin-top: 24px;
        position: relative;
        @media screen and (orientation: landscape) {
            max-width: 320px;
            max-height: 252px;
            margin: 24px auto 0;
        }
        @include mid { 
            margin: 0;
            // width: 50%;
            max-width: none;
            max-height: none;
        }

        & > img { 
            
            @include mid { 
                width: 28.889vw;
                height: 25.903vw;
            }
        }

        &-bg { 
            margin-left: 8px;
            height: 100%;
            width: 100%;
            border: 2px solid #13AD68;
            position: absolute;
            top: 8px;
            left: 0;
            z-index: -1;

            @include mid { 
                border: 0.139vw solid #13AD68;
                top: 0.764vw;
                margin-left: 0.764vw;
            }
        }
    }
    &__wrapper {
        @include mid { 
            width: 36.111vw;
        }
    }
}
.in-vision-60 { 
    &::before { 
        width: 195px;
        transition: all 1s;

        @include mid { 
            width: 60%;
        }
    }
}
.container { 
    @include mid { 
        display: flex;
        justify-content: space-between;
        gap: 6.111vw;
    }
}
</style>