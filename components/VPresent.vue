<template lang="pug">
section.presents 
    .container 
        VTitle(:title="$t('presents.title')" line=true data-aos="fade-right")
        .presents__content(  :class="{'animated-line': isAnimatedLine}" ref="cards")
            ul.presents__list 
                li(v-for="(card,idx) in cards" :key="idx" @click="openModal(card.modal)"  v-intersect="onCards").presents__list-item
                    .presents__card.pointer
                        p.presents__card-title {{ $t(card.title) }}
                        p.presents__card-descr {{ $t(card.descr) }}
                        p.presents__card-link {{ $t('presents.more') }}
                        img(:src="card.bg", :alt="card.alter" width="100%" height="100%").presents__card-bg
                        img(:src="card.icon", :alt="card.altIcon" width="100%" height="100%").presents__card-icon
</template>

<script>
import { mapGetters } from "vuex";
    export default {
        computed: {
            ...mapGetters({
                currentSurprise: "modal/getSurprise",
            }),
        },
        data() {
            return {
                isAnimatedLine: false,
                cards: [
                    {
                        title: "presents.titleDollars",
                        descr: "presents.descrDollars",
                        bg: "/images/bg-dollars.svg",
                        icon: "/images/icons/dollar.svg",
                        alter: "presents.alterCard",
                        altIcon: "presents.alterIcon",
                        route: "https://www.instagram.com/europe.bus/?igshid=YmMyMTA2M2Y%3D",
                        modal: {
                            draw: true,
                            title: "modalPresents.drawings.title",
                            descr: "modalPresents.drawings.descr",
                            imageMobile: "/images/draw-mobile.webp",
                            imageDesktop: "/images/draw.webp",
                            alter: "modalPresents.drawings.alter"
                        }
                    },
                    {
                        title: "presents.titleSurprise",
                        descr: "presents.descrSurprise",
                        bg: "/images/bg-surpize.svg",
                        icon: "/images/icons/surprise.svg",
                        alter: "presents.alterCard",
                        altIcon: "presents.alterIcon",
                        route: "https://www.instagram.com/europe.bus/?igshid=YmMyMTA2M2Y%3D",
                        modal: {
                            draw: false,
                            title: "modalPresents.surprises.title",
                            descr: "modalPresents.surprises.descr",
                            imageMobile: "/images/surprises-mobile.webp",
                            imageDesktop: "/images/surprises.webp",
                            alter: "modalPresents.surprises.alter"
                        }
                    },
                ]
            }
        },
        methods: {
            openModal(modal) {
                this.$store.dispatch("modal/toggleSurprise")
                this.$store.commit("modal/setSurprise", modal)
                this.scrollPosition=window.scrollY;
                document.body.style.cssText=`
                    overflow:hidden;
                    position:fixed;
                    top:-${this.scrollPosition}px;
                    left:0'
                    height:100%;
                    width:100%;
                `;
                document.documentElement.style.scrollBehavior="unset";
            },
            onCards(entries) {
                if (entries.isIntersecting) {
                    this.isAnimatedLine = true;
                }
            },
        },
        mounted () {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 1
            };
            const FirstLine = new IntersectionObserver(this.onCards, options);
            FirstLine.observe(this.$refs.cards);
        },
    }
</script>

<style lang="scss" scoped>
.presents { 

    &__content { 
        position: relative;
        margin-top: 40px;
        padding-bottom: 48px;

        @include mid { 
            margin-top: 3.333vw;
            padding-bottom: 3.889vw;
        }

        &::before {
            display: block;
            position: absolute;
            content: "";
            bottom: 0%;
            right: 0%;
            width: 0%;
            height: 2px;
            background: #13AD68;

            @include mid { 
                height: 0.208vw;
                width: 0%;
            }
        }
    }
    &__list { 
        @include mid { 
            display: flex;
            justify-content: space-between;
            gap: 2.778vw;
        }
        &-item { 
            @include mid { 
                width: 100%;
            }
        }
    }
    &__card { 
        position: relative;
        width: 100%;
        background: #1BB16E;
        box-shadow: 0px 3px 12px 1px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        flex-direction: column;
        margin-bottom: 24px;
        padding: 16px;
        transition: all .3s;

        &:hover { 
            transition: all .3s;
            box-shadow: 0px 4px 17px 1px rgba(0, 0, 0, 0.35);
        }
        @include mid { 
            box-shadow: 0px 0.208vw 0.833vw 0.069vw rgba(0, 0, 0, 0.2);
            margin: 0;
            padding: 1.111vw 1.667vw 2.778vw 1.667vw;
            border-radius: 0.694vw;
        }
        & > p { 
            position: relative;
            z-index: 2;
        }
        &-bg { 
            position: absolute;
            top: 0%;
            left: 0%;
            height: 100%;
            width: 100%;
            z-index: 1;
        }
        &-icon {
            position: absolute;
            top: 16px;
            left: 16px;
            height: 32px;
            width: 32px;
            
            @include mid { 
                object-fit: cover;
                height: 3.194vw;
                width: 3.194vw;
                top: 1.111vw;
                left: 1.667vw;
            }
        }
        &-title { 
            font-weight: 700;
            font-size: 30px;
            line-height: 37px;
            text-align: center;
            color: #F5F5F5;
            margin-top: 39px;

            @include mid { 
                font-size: 3.125vw;
                line-height: 3.819vw;
                margin: 0;
                padding-top: 4.722vw;
            }
        }
        &-descr { 
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            text-align: center;
            color: #F5F5F5;
            margin-top: 8px;

            @include mid { 
                font-size: 1.389vw;
                line-height: 1.667vw;
                margin-top: 0.556vw;
            }
        }
        &-link { 
            font-weight: 400;
            font-size: 15px;
            line-height: 18px;
            text-align: center;
            text-decoration-line: underline;
            color: #F5F5F5;
            margin-top: 24px;

            @include mid { 
                font-size: 1.389vw;
                line-height: 1.667vw;
                margin-top: 3.472vw;
            }
        }
    }
}
.animated-line { 
    &::before { 
        transition: all 1.5s;
        width: 60%;

        @include mid { 
            width: 30%;
        }
    }
}
@media (max-width: 900px) {
  [data-aos="fade-right"] {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>