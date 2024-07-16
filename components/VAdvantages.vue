<template lang="pug">
section.advantages(:class="{'animated-road': isAnimatedRoad}" ) 
    .container 
        VTitle(:title="$t('advantages.title')" data-aos="fade-right" :data-aos-delay="100" :data-aos-duration="900")
        .advantages__content 
            ul.advantages__list( ref="roadDesktop") 
                li(v-for="(item, idx) in advantages" :key="idx" data-aos="fade-up" :data-aos-delay="idx * animationDuration").advantages__list-item.d-flex-s
                    img(:src="item.image", :alt="item.alter" width="100%" height="100%")
                    p {{ $t(item.text) }}
    img(v-if="!$device.isDesktop" src="/images/road1-mobile.svg", alt="Декоративне ображення дороги" width="100%" height="100%" ref="roadMobile").advantages__road
    img(v-if="$device.isDesktop" src="/images/advan-bg-road.svg", alt="Декоративне зображення дороги" width="100%" height="100%"  v-intersect="onRoad" ).advantages__road-desktop
</template>

<script>
    export default {
        data() {
            return {
                advantages: [
                    {
                        text: "advantages.cards.trips",
                        image: "/images/icons/per1.svg",
                        alter: "1"
                    },
                    {
                        text: "advantages.cards.packages",
                        image: "/images/icons/per2.svg",
                        alter: "2"
                    },
                    {
                        text: "advantages.cards.test",
                        image: "/images/icons/per3.svg",
                        alter: "3"
                    },
                    {
                        text: "advantages.cards.wifi",
                        image: "/images/icons/per4.svg",
                        alter: "4"
                    },
                ],
                isAnimatedRoad: false,
                animationDuration: 1000
            }
        },
        methods: {
            onRoad(entries) {
                if (entries.isIntersecting) {
                    this.isAnimatedRoad = 400;
                }
            },
        },
        mounted () {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 1
            };
            const FirstLine = new IntersectionObserver(this.onRoad, options);
            FirstLine.observe(this.$refs.roadDesktop);

            if (window.innerWidth < 900) {
                this.animationDuration = 200;
            } else {
                this.animationDuration = 400;
            }

        },
    }
</script>

<style lang="scss" scoped>
.advantages { 
    position: relative;
    padding-bottom: 49px;
    
    @include mid {
        &::after { 
            position: absolute;
            display: block;
            content: "";
            background: #F5F5F5;
            // background-color: red;
            min-height: 14.083vw;
            width: 100%;
            // left: 0%;
            transform: translateX(0%);
            top: 8.986vw;
            z-index: 2;
        }
    }
    
    &__content { 
        margin-top: 24px;

        @include mid { 
            margin-top: 5.556vw;
        }
    }
    &__list { 
        
        @include mid { 
            display: flex;
        }
        &-item { 
            margin-bottom: 8px;
            position: relative;
            z-index: 3;
            &:nth-child(2) { 
                @include mid { 
                    padding-top: 3.472vw;
                }
            }
            &:nth-child(4) { 
                @include mid { 
                    padding-top: 3.472vw;
                }
            }
            @include mid { 
                margin: 0;
                flex-direction: column;
            }
            & > p { 
                margin-left: 8px;
                font-weight: 500;
                font-size: 14px;
                line-height: 17px;
                color: #030303;
                padding-right: 31px;

                @include mid { 
                    font-size: 1.111vw;
                    line-height: 1.389vw;
                    text-align: center;
                }
            }
            & > img { 
                width: 75px;
                height: 72px;

                @include mid { 
                    width: 6.528vw;
                    height: 6.250vw;
                }
            }
        }
    }
    &__road { 
        position: absolute;
        right: 0;
        bottom: -10%;
        width: 32px;
        height: 0px;
        overflow: hidden;

        &-desktop { 
            
            @include mid { 
                position: absolute;
                top: 8.986vw;
                left: 0%;
                width: 100%;
                z-index: -1;
                height: 12.383vw;
                // min-height: 100%;
                object-fit: cover;
            }
        }
       
    }
}
.animated-road { 
    // height: 152px;

    @include mid { 
        // height: 13.183vw;
        // transition: width 5s;
        // width: 100%;
        &::after { 
            transform: translateX(100%);
            transition: transform 4s;
        }
    }
}
</style>