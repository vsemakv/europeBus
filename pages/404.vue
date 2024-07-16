<template lang="pug">
section.error
    .container 
        .error__title 
            p {{ $t('errorPage.error') }}
            p 404 
        .error__info 
            p {{ $t('errorPage.page') }}
            p {{ $t('errorPage.text') }}
        .error__button
            n-link(:to="`/${$i18n.locale}`")
                VButton(:title="$t('errorPage.button')")
</template>

<script>
export default {
  layout: 'error',

  data() {
    return {

    }
  },

  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.error {
    // height: 100vh;
    padding-top: 88px;
    @include mid { 
        padding-top: 0;
    }
    &__title {
        padding-bottom: 16px;
        border-bottom: 1px solid #030303;

        
        & > p { 
            &:first-child { 
                margin-bottom: 8px;
                font-weight: 700;
                font-size: 35px;
                line-height: 43px;
                text-align: center;
                color: #030303;

                @include mid {
                    font-size: 3.472vw;
                    line-height: 4.236vw;
                }
            }
            &:last-child { 
                background: linear-gradient(92.53deg, #13AD68 3.83%, #54D59B 99.14%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-weight: 700;
                font-size: 80px;
                line-height: 98px;
                text-align: center;

                @include mid { 
                    font-size: 5.556vw;
                    line-height: 6.806vw;
                }
            }
        }
    }
    &__info { 
        margin-top: 24px;

        @include mid {
            margin-top: 1.667vw;
        }
        & > p { 
            &:first-child { 
                margin-bottom: 16px;
                font-weight: 700;
                font-size: 25px;
                line-height: 30px;
                text-align: center;
                color: #030303;

                @include mid { 
                    font-size: 2.778vw;
                    line-height: 3.403vw;
                }
            }
            &:last-child { 
                font-weight: 500;
                font-size: 16px;
                line-height: 20px;
                text-align: center;
                color: #030303;

                @include mid { 
                    font-size: 1.250vw;
                    line-height: 1.528vw;
                }
            }
        }
    }
    &__button { 
        margin-top: 32px;

        @include mid { 
            margin-top: 2.778vw;
        }
    }
}
.container { 
    @include mid { 
        padding: 0 27.778vw;
    }
}
</style>
