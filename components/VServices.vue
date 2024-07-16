<template lang="pug">
section(ref="decorationsDesktop").services 
    .services__trigger(id="services" )
    .container(ref="roadDesktop" :class="{'animated-road': isAnimatedRoad}" )
        VTitle(:title="$t('services.title')" data-aos="fade-right" :data-aos-delay="300" :data-aos-duration="900")
        .services__content( v-intersect="onSection" :class="{'animated-decor': isAnimatedDecor}") 
            ul.services__list 
                li(v-for="(service,idx) in services" :key="idx" data-aos="fade-left" :data-aos-delay="idx * 200").services__list-item.d-flex-s
                    img(src="/images/icons/done.svg", :alt="$t('services.altIcon')" width="100%" height="100%")
                    p {{ $t(service) }}
            .services__image(data-aos="fade-right" :data-aos-delay="300" :data-aos-duration="900")
                img(v-if="!$device.isDesktop" data-src="/images/bus.webp", :alt="$t('services.altPhoto')" width="100%" height="100%" v-lazy-load)
                img(v-if="$device.isDesktop" data-src="/images/bus-desktop.webp", :alt="$t('services.altPhoto')"  width="100%" height="100%" v-lazy-load)
    img(v-if="$device.isDesktop" src="/images/service-bg-road.svg", :alt="$t('altDecor')" width="100%" height="100%" v-intersect="onRoad" ).services__road

</template>

<script>
import { mapGetters } from "vuex";
    export default {
        computed: {
            ...mapGetters({
                servicesBlock: "refs/getServices",
            }),
        },
        data() {
            return {
                services: ["services.cards.trips","services.cards.client","services.cards.autopark","services.cards.packages"],
                isAnimatedRoad: false,
                isAnimatedDecor: false
            }
        },
        methods: {
            onRoad(entries) {
                if (entries.isIntersecting) {
                    this.isAnimatedRoad = true;
                }
            },
            onSection(entries) {
                if (entries.isIntersecting) {
                    this.isAnimatedDecor = true;
                }
            },

        },
        mounted () {
            this.$nextTick(() => {
                this.$store.commit("refs/setServices", this.$refs.servicesSection);
            });
            if (this.$route.hash === '#services') {
                this.$nextTick(() => {
                    this.$scrollTo(this.$refs.services)
                })
            }
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 1
            };
            const FirstLine = new IntersectionObserver(this.onRoad, options);
            FirstLine.observe(this.$refs.roadDesktop);
            const Lines = new IntersectionObserver(this.onSection, options);
            Lines.observe(this.$refs.roadDesktop);
        },
    }
</script>

<style lang="scss" scoped>
.services {
    padding-bottom: 41px;
    position: relative;

    &::after { 
        display: block;
        position: absolute;
        content: "";
        width: 116px;
        height: 2px;
        left: 31px;
        bottom: 0;
        background-color: #13AD68;

        @include mid { 
            display: none;
        }
    }
    &__trigger { 
        width: 10px;
        height: 10px;
        position: absolute;
        top: -200px;
        left: 0px;
        @include mid { 
            top: -10vw;
        }
    }
    &__content { 
        margin-top: 32px;
        padding-top: 8px;
        position: relative;

        @include mid { 
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
        }
        &::before {
            display: block;
            position: absolute;
            content: "";
            top: 0%;
            right: 0%;
            width: 50%;
            height: 2px;
            background: #13AD68;

            @include mid { 
                width: 0;
                height: 0.139vw;
            }
        }
        &::after { 
            @include mid { 
                display: block;
                position: absolute;
                content: "";
                top: 0%;
                right: 0%;
                width: 0.139vw;
                height: 0;
                background: #13AD68;

            }
        }
    }
    &__list { 
        @include mid {
            width: 36.389vw;
            padding-top: 3.264vw;
            padding-right: 5.347vw;
        }
        &-item { 
            margin-bottom: 24px;
            & > img { 
                width: 37px;
                height: 37px;

                @include mid { 
                    width: 2.986vw;
                    height: 2.986vw;
                }
            }
            & > p { 
                margin-left: 16px;
                font-weight: 500;
                font-size: 14px;
                line-height: 17px;
                color: #030303;

                @include mid { 
                    font-size: 1.111vw;
                    line-height: 1.389vw;
                }
            }
        }
    }
    &__image { 
        position: relative;
        overflow: hidden;
        border-radius: 10px;

        @media screen and (orientation: landscape) {
            max-width: 320px;
            max-height: 252px;
            margin: 24px auto 0;
        }

        @include mid { 
            width: 31.319vw;
            height: 25.625vw;
            border-radius: 0.347vw;
            max-width: none;
            max-height: none;
        }
        & > img { 
            transform: scale(1.2);
            
        }
        &::before { 
            display: block;
            position: absolute;
            content: "";
            height: 2px;
            width: 116px;
            left: 31px;
            bottom: -16px;
            background-color: #13AD68;
        }
    }
    &__road { 
        position: absolute;
        right: 0;
        bottom: 0;
        width: 6.250vw;
        height: 22.639vw;
        z-index: 1;
    }
}
.animated-decor { 

    &::before { 
        transition: all 1.5s;
        width: 50%;

        @include mid { 
            width: 9.931vw;
        }
    }
    &::after { 
        transition: all 1.5s;
        height: 9.931vw;
    }
}
.animated-road { 
    transition: all 1s;
    
    @include mid { 
        &::before { 
            transform: translateY(30vw);
            transition-delay: 10s;
            transition: transform 10s;
        }
    }
   
}
.container { 
    position: relative;

    @include mid { 
        &::before { 
            position: absolute;
            display: block;
            content: "";
            z-index: 2;
            // background-color: red;
            background: #F5F5F5;
            right: 0;
            top: 13.083vw;
            width: 8.333vw;
            height: 30.739vw;
        }
    }
}
</style>