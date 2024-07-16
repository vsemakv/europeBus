<template lang="pug">
.modal(:class="{'show-modal': isShowModalSurprise}")
    .modal__bg(@click="closeModal")
    .container.d-flex-c
        .modal__content()
            .modal__content-info
                img(src="/images/icons/close.svg", :alt="$t('altClose')" width="100%" height="100%" @click="closeModal").modal__close.pointer
                VTitle(:title="$t(currentSurprise.title)")
                p(v-html="$t(currentSurprise.descr)").modal__content-info-text
                .modal__content-social.d-flex-c(v-if="$device.isDesktop")
                    a(href="https://www.facebook.com/europe.bus.com.ua", target="_blank", title="Facebook").modal__content-social-link 
                        img(src="/images/icons/facebook-green.svg", alt="Facebook" width="100%" height="100%").modal__content-social-image
                    a(href="https://instagram.com/europe.bus?igshid=YmMyMTA2M2Y=", target="_blank", title="Instagram").modal__content-social-link 
                        img(src="/images/icons/inst-green.svg", alt="Instagram" width="100%" height="100%").modal__content-social-image
            img(v-if="$device.isDesktop" :src="currentSurprise.imageDesktop", :alt="currentSurprise.alter" width="100%" height="100%").modal__content-image
            img(v-if="!$device.isDesktop" :src="currentSurprise.imageMobile", :alt="currentSurprise.alter" width="100%" height="100%").modal__content-image
            .modal__content-social.flex-direction.d-flex-c 
                a(href="https://www.facebook.com/europe.bus.com.ua", target="_blank", title="Facebook").modal__content-social-link 
                    img(src="/images/icons/facebook-green.svg", alt="Facebook" width="100%" height="100%").modal__content-social-image
                a(href="https://instagram.com/europe.bus?igshid=YmMyMTA2M2Y=", target="_blank", title="Instagram").modal__content-social-link 
                    img(src="/images/icons/inst-green.svg", alt="Instagram" width="100%" height="100%").modal__content-social-image
</template>

<script>
import { mapGetters } from "vuex";
    export default {
        computed: {
            ...mapGetters({
                isShowModalSurprise: "modal/getModalSurprise",
                currentSurprise: "modal/getSurprise",
            }),
        },
        methods: {
            closeModal() {
                this.$store.dispatch("modal/close")
                document.body.style.cssText=``;
                window.scroll({top: this.scrollPosition})
                document.documentElement.style.scrollBehavior="";
            }
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
    display: none;

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

        @include mid { 
            width: 0.833vw;
            height: 0.833vw;
            top: 1.667vw;
            right: 2.222vw;
        }
    }
    &__content { 
        position: relative;


        background-color: #f5f5f5;
        background: #F5F5F5;
        box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.09);
        border-radius: 10px;

        height: fit-content;
        overflow-y: scroll;

        @include mid { 
            display: flex;
            height: 36.458vw;
            gap: 3.750vw;
            padding: 0 4.167vw;
            border-radius: 0.694vw;
            box-shadow: 0px 0.278vw 0.764vw rgba(0, 0, 0, 0.09);
        }
        &-info {
            padding: 0 24px 24px 24px;

            @include mid { 
                padding: 0;
            }
            &-text { 
                margin-top: 16px;
                padding-bottom: 16px;

                position: relative;

                font-weight: 500;
                font-size: 13px;
                line-height: 16px;
                color: #030303;

                &::after { 
                    position: absolute;
                    display: block;
                    content: "";
                    left: 0%;
                    bottom: 0%;
                    height: 3px;
                    width: 60%;
                    background-color: #13AD68;
                    border-radius: 3px;

                    @include mid { 
                        border-radius: 0.208vw;
                        height: 0.208vw;
                    }
                }

                @include mid { 
                    margin-top: 1.667vw;
                    padding-bottom: 1.667vw;
                    
                    width: 27.986vw;

                    font-size: 1.111vw;
                    line-height: 1.389vw;
                }
            }
        }
        &-image { 
            max-height: 340px;
            @include mid { 
                object-fit: cover;
                max-height: none;
                height: 100%;
                width: 22.847vw;
            }
        }
        &-social { 
            padding: 32px 0;
            gap: 24px;

            @include mid {
                padding: 2.222vw 0;
                gap: 1.667vw;
            }
            &-image { 
                width: 30px;
                height: 30px;

                @include mid {
                    width: 2.222vw;
                    height: 2.222vw;
                }
            }
        }
    }
    &__title { 
        @include mid { 
            padding-right: 6.111vw;
        }
    }
}
.container { 
    height: 100dvh;
    height: 100vh;
    width: 100%;
    
    @include mid { 
        padding: 0;
    }
}
.show-modal { 
    display: block;
}
.flex-direction{ 
    @include mid { 
        flex-direction: column;

    }
}
</style>