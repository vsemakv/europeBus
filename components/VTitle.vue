<template lang="pug">
.title(ref="refAnim" :class="{'for-news': isNews, 'for-section': isSection}" )
    h2(:class="{'before': line, 'for-pages': isPage, 'for-modal': isModal, 'for-faq': isFaq}").title__text {{ title }}
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: null
            },
            line: { 
                type: Boolean,
                default: false
            },
            isNews: { 
                type: Boolean,
                default: false
            },
            isPage: { 
                type: Boolean,
                default: false
            },
            isModal: {
                type: Boolean,
                default: false
            },
            isSection: {
                type: Boolean,
                default: false
            },
            isFaq: {
                type: Boolean,
                default: false
            },
            animLine: {
                type: Boolean,
                default: false
            },
            // refAnim: { 
            //     type: String,
            //     default: null
            // }
        },
        data() {
            return {
                isAnimatedTop: false
            }
        },
        methods: {
            
        },
        mounted () {
            
        },
    }
</script>

<style lang="scss" scoped>
.title { 
    padding-top: 24px;
    position: relative;

    @include mid { 
        padding-top: 2.778vw;
    }
    &__text { 
        font-weight: 700;
        font-size: 30px;
        line-height: 37px;
        background: linear-gradient(92.53deg, #13AD68 3.83%, #54D59B 99.14%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;

        @include mid { 
            font-size: 2.778vw;
            line-height: 3.403vw;
        }
    }
}
.before { 
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
.for-news { 
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    padding-bottom: 8px;
    padding-top: 40px;

    @include mid { 
        font-size: 2.431vw;
        line-height: 2.986vw;
        padding-bottom: 1.111vw;
    }
    &::after { 
        display: block;
        position: absolute;
        content: "";
        bottom: 0;
        left: 0;
        width: 60%;
        height: 3px;
        background: #13AD68;

        @include mid { 
            border-radius: 0.208vw;
            height: 0.208vw;
        }
    }
}
.for-faq { 
    padding-bottom: 8px;
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    background: #030303;
    background-clip: text;
    position: relative;
    @include mid { 
        font-size: 2.431vw;
        line-height: 2.986vw;
        padding-bottom: 1.111vw;
    }
    &::after { 
        display: block;
        position: absolute;
        content: "";
        bottom: 0;
        left: 0;
        width: 60%;
        height: 3px;
        background: #13AD68;

        @include mid { 
            border-radius: 0.208vw;
            height: 0.208vw;
        }
    }
}
.for-pages { 
    padding-bottom: 8px;
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    background: #030303;
    background-clip: text;
    position: relative;

    @include mid { 
        margin-top: 1.667vw;
        padding-bottom: 1.111vw;
        font-size: 2.431vw;
        line-height: 2.986vw
    }
    
}
.for-modal { 
    padding-bottom: 8px;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    background: #030303;
    background-clip: text;
    position: relative;

    @include mid { 
        padding-top: 0 !important;
        margin-top: 0;
        width: 24.028vw;
        font-size: 1.389vw;
        line-height: 1.667vw;
        padding-bottom: 0.556vw;
    }

    &::after { 
        position: absolute;
        display: block;
        content: "";
        left: 0%;
        bottom: 0%;
        height: 3px;
        width: 40%;
        background-color: #13AD68;
        border-radius: 3px;

        @include mid { 
            border-radius: 0.208vw;
            height: 0.208vw;
        }
    }
}
.for-section { 
    padding-bottom: 16px;
    
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
        width: 60%;
        background-color: #13AD68;
        border-radius: 3px;

        @include mid { 
            border-radius: 0.208vw;
            height: 0.208vw;
        }
    }
}


</style>