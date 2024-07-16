<template lang="pug">
    .modal(:class="{'show-modal': isNot}")
        .modal__bg(@click="closeModal")
        .container.d-flex-c
            .modal__content()
                img(src="/images/icons/close.svg", :alt="$t('altClose')" width="100%" height="100%" @click="closeModal").modal__close.pointer
                p {{ $t('modalCalc.error') }}
                
</template>

<script>
import { mapGetters } from "vuex";
    export default {
        computed: {
            ...mapGetters({
                isNot: "modal/getNot",
            }),
        },
        methods: {
            closeModal() {
                this.$store.commit("modal/close")
                document.querySelector("body").style = "overflow-y: unset";
                document.body.style.cssText=``;
                window.scroll({top: this.scrollPosition})
                document.documentElement.style.scrollBehavior="";
            },
        },
    }
</script>

<style lang="scss" scoped>
.modal { 
    position: fixed;
    top: 0%;
    left: 0%;
    z-index: 10 !important;
    width: 100%;
    opacity: 0;
    transform: translateY(-100%);

    &__bg { 
        position: fixed;
        top: 0%;
        left: 0%;
        height: 100vh;
        height: 100dvh;
        width: 100%;
        background: rgba(5, 5, 5, 0.6);
    }
    &__close { 
        position: absolute;
        width: 12px;
        height: 12px;
        top: 16px;
        right: 16px;
        z-index: 2;

        @include mid { 
            width: 0.833vw;
            height: 0.833vw;
            top: 1.667vw;
            right: 2.222vw;
        }
    }
    &__content { 
        padding: 48px;
        background: #f5f5f5;
        border-radius: 10px;
        position: relative;

        p { 
            font-weight: 500;
            font-size: 20px;
            line-height: 26px;
            text-align: center;
            color: #030303;

            @include mid { 
                font-size: 1.550vw;
                line-height: 1.728vw;
                width: 18.750vw;
                margin: 2.222vw auto 0;
            }
        }
        @include mid { 
            padding: 2.222vw 3.333vw 4.333vw 3.333vw;
            border-radius: 0.694vw;
        }
        &::before {
            position: absolute;
            display: block;
            content: "";
            background: url("/images/icons/modal-corner.svg");
            background-repeat: no-repeat;
            background-size: contain;
            bottom: calc(0% - 2px);
            left: calc(0% - 2px);
            width: 146px;
            height: 106px;
            transition: all .5s;
            // opacity: 0;
            z-index: 1;
            @include mid { 
                // opacity: 1;
                width: 10.139vw;
                height: 6.750vw;
                bottom: calc(0% - 0.139vw);
                left: calc(0% - 0.139vw);
            }
        }
        &::after {
            position: absolute;
            display: block;
            content: "";
            background: url("/images/icons/modal-corner.svg");
            background-repeat: no-repeat;
            background-size: contain;
            top: calc(0% - 2px);
            right: calc(0% - 2px);
            width: 146px;
            height: 106px;
            transform: rotate(180deg);
            transition: all .5s;
            // opacity: 0;
            z-index: 1;
            @include mid { 
                // opacity: 1;
                width: 10.139vw;
                height: 6.750vw;
                top: calc(0% - 0.139vw);
                right: calc(0% - 0.139vw);
            }
        }
    }
}
.container { 
    height: 100dvh;
    height: 100vh;
    width: 100%;
    
    // @include mid { 
    //     padding: 0;
    // }
}
.show-modal { 
    opacity: 1;
    transform: translateY(0%);
    transition: opacity .5s;
}
</style>