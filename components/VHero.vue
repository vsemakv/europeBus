<template lang="pug">
section.hero 
    img(v-if="$device.isDesktop"  src="/images/hero-bg-desktop.webp", alt="Фонове зображення" width="100%" height="100%").hero__bg
    img(v-if="!$device.isDesktop" src="/images/hero-bg-mobile.webp", alt="Фонове зображення" width="100%" height="100%").hero__bg
    .container 
        .hero__content 
            .hero__links.d-flex-b(v-if="!$device.isDesktop")
                a(href="tel:+380961017110" title="Зателефонувати").hero__links-tel +380961017110
                n-link(:to="`/${$i18n.locale}/history`").hero__links-history {{ $t('header.links.history') }}
            .hero__title(data-aos="fade-down") 
                h1.hero__title-text {{ $t('hero.title') }}
            h2.hero__text(data-aos="fade-down") {{ $t('hero.ukraine') }}
            .hero__form(data-aos="zoom-in") 
                VForm
            .hero__about.d-flex-b(v-if="$device.isDesktop")
                p(data-aos="fade-left").hero__trip {{ $t('hero.trips.text') }}
                    span {{ $t('hero.trips.span') }}
                p(data-aos="fade-right").hero__trip {{ $t('hero.trips.text2') }}
                    span {{ $t('hero.trips.span2') }}
            p(v-if="!$device.isDesktop").hero__trip {{ $t('hero.trips.text2') }}
                    span {{ $t('hero.trips.span2') }}
            .hero__documents.d-flex-b(v-if="$device.isDesktop")
                n-link(:to="`/${$i18n.locale}/faq`" data-aos="fade-down" ).hero__documents-item {{ $t('hero.docs') }}
                .hero__documents-text(v-if="$device.isDesktop" data-aos="fade-down") 
                    p {{ $t('hero.countries.white') }}
                    p {{ $t('hero.countries.green') }}
            .hero__pluses(v-if="$device.isDesktop") 
                VPluses
</template>

<script>
    export default {
        
    }   
</script>

<style lang="scss" scoped>
.hero{ 
    position: relative;
    
    // height: 100vh;

    @include mid {
        height: 100vh;
        padding-top: 2.778vw;
    }
    
    &__bg { 
        background: #5E5D62;
        position: fixed;
        top: 0%;
        left: 0%;
        // height: 100dvh;
        height: 120vh;
        width: 100%;
        z-index: -1;
    }
    &__pluses { 
        position: absolute;
        bottom: -20%;
        left: 0;
    }
    &__about { 
        position: relative;
        z-index: -1;
        @include mid { 
            padding: 0 5.556vw;
        }
    }
    &__links { 
        font-weight: 500;
        font-size: 13px;
        line-height: 16px;
        padding: 10px 5px 0px 5px;

        @include mid { 
            margin-bottom: 2.222vw;
        }
        &-tel { 
            position: relative;
            padding-left: 22px;
            color: #FFFFFF;

            &::before { 
                display: block;
                position: absolute;
                content: url("/images/icons/hero-tel.svg");
                top: 0;
                left: 0;
            }
        }
        &-history { 
            position: relative;
            padding-left: 28px;
            color: #FFFFFF;
            @media screen and (max-width: 330px) {
                text-align: center;
                padding-left: 55px;

            }
            
            &::before { 
                display: block;
                position: absolute;
                content: "";
                background-image: url("/images/icons/history.svg");
                background-repeat: no-repeat;
                background-size: contain;
                top: 50%;
                left: 0;
                width: 18px;
                height: 16px;
                transform: translateY(-50%);

                @media screen and (max-width: 330px) {
                    left: 30px;
                    
                }
            }
        }
        
    }
    &__title { 
        min-width: 30.847vw;
        &-text { 
            margin-top: 32px;
            color: #FFFFFF;
            font-weight: 700;
            font-size: 31px;
            line-height: 107%;
            text-align: center;
            text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.35);

            @include mid { 
                margin: 0 auto;
                max-width: 62.847vw;
                text-shadow: 0 0.278vw 0.278vw rgba(0, 0, 0, 0.35);
                font-size: 3.819vw;
                line-height: 4.653vw;
            }
        }
    }
    &__text { 
        margin-top: 8px;
        font-weight: 400;
        font-size: 13px;
        line-height: 16px;
        color: #FFFFFF;
        text-align: center;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

        @include mid { 
            margin-top: 1.111vw;
            font-size: 1.389vw;
            line-height: 1.667vw;
            text-shadow: 0 0.278vw 0.278vw rgba(0, 0, 0, 0.25);
        }
    }
    &__form { 
        position: relative;
        z-index: 3;
        margin-top: 16px;

        @include mid { 
            margin-top: 2.222vw;
        }
    }
    &__trip { 
        margin-top: 8px;
        font-weight: 400;
        font-size: 17px;
        line-height: 21px;
        text-align: center;
        color: #FFFFFF;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

       @include mid{ margin-top: 2.222vw;
            text-align: center;
            font-weight: 400;
            font-size: 1.389vw;
            line-height: 1.667vw;
            text-shadow: 0 0.278vw 0.278vw rgba(0, 0, 0, 0.25);
        }
        & > span { 
            color: #13AD68;
        }
    }
    &__documents { 
        margin-top: 50px;
        
        position: relative;
        z-index: 0;
        @include mid { 
            margin-top: 4.931vw;
            padding: 0 5.556vw;
        }
        &-item { 
            color: #FFFFFF;
            font-weight: 500;
            font-size: 17px;
            line-height: 21px;
            text-align: center;
            padding-left: 26px;
            position: relative;
            transition: all .3s;
            
            &:hover { 
                transition: all .3s;
                color: #13AD68;
            }
            @include mid { 
                font-size: 1.389vw;
                line-height: 1.667vw;
                padding-left: 2.083vw;
            }

            &::before { 
                display: block;
                position: absolute;
                content: "";
                background-image: url("/images/icons/documents.svg");
                background-repeat: no-repeat;
                background-size: contain;
                width: 10px;
                height: 12px;
                top: 50%;
                transform: translateY(-50%);
                left: 0;

                @include mid { 
                    width: 0.972vw;
                    height: 1.111vw;
                }
            }
            &::after { 
                display: block;
                position: absolute;
                content: "";
                bottom: -8px;
                left: 0;
                height: 1px;
                width: 100%;
                background-color: #FFFFFF;
                transition: all .3s;

                @include mid { 
                    height: 0.069vw;
                }
            }
        }
        &-text { 

            & > p { 
                font-weight: 500;
                font-size: 1.389vw;
                line-height: 1.667vw;
                color: #FFFFFF;
                text-shadow: 0 0.278vw 0.278vw rgba(0, 0, 0, 0.25);

                &:last-child { 
                    color: #13AD68;
                    margin-top: 1.111vw;
                }
            }
            

        }
    }
}
.container { 
    @include mid { 
        padding: 0 8.333vw;
    }
}
</style>