<template lang="pug">
section.contact 
    .container(:class="{'anim-road': isAnimatedRoad}" ref="roadDesktop")  
        .contact__button(@click="toggleModal")
            VButton(:title="$t('contact.button')")
    img(v-if="$device.isDesktop" src="/images/footer-bg-road.svg", alt="Декоративне зображення дороги" width="100%" height="100%" v-intersect="onRoad" ).contact__road
</template>

<script>
import { mapGetters } from "vuex";
    export default {
        computed: {
            ...mapGetters({
                isShowModal: "modal/getModal",
            }),
        },
        methods: {
            toggleModal() {
                // this.$store.commit("burger/fixHeader");
                this.$store.commit("burger/unFixHeader");

                this.$store.dispatch("modal/toggle")
                document.querySelector("body").style = "overflow-y: hidden";
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
            onRoad(entries) {
                if (entries.isIntersecting) {
                    this.isAnimatedRoad = true;
                }
            },
        },
        data() {
            return {
                isAnimatedRoad: false,
            }
        },
        mounted () {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 1
            };
            const FirstLine = new IntersectionObserver(this.onRoad, options);
            FirstLine.observe(this.$refs.roadDesktop);
        },
    }
</script>

<style lang="scss" scoped>
.contact { 
    padding-top: 45px;
    padding-bottom: 40px;
    position: relative;

    @include mid { 
        padding-top: 6.667vw;
        padding-bottom: 2.222vw;
    }

    &__button { 
        @include mid { 
            margin: 0 auto;
            width: 33.056vw;
        }
    }
    &__road { 
        position: absolute;
        right: 0;
        top: -25%;
        width: 8.333vw;
        height: 16.667vw;
        z-index: 1;
    }
}
.container { 
    position: relative;

    @include mid { 

        &::after { 
            position: absolute;
            z-index: 2;
            display: block;
            content: "";
            width: 8.333vw;
            min-height: 36.667vw;
            right: 0;
            top: -200%;
            background-color: #f5f5f5;
        }
        
    }
}
.anim-road { 
    @include mid { 
        &::after { 
            transform: translateY(100%);
            transition-delay: 10s;
            transition: transform 10s;
        }
    }
}
</style>