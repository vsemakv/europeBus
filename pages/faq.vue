<template lang="pug">
.faq 
    .container 
        VTitle(:title="$t('faq.title')" isFaq=true)
        ul.faq__list 
            li(v-for="(item, idx) in questions").faq__list-item
                .faq__list-item-wrapper
                    .spans
                        .spans-wrapper
                            span(:class="{'rotate': item.show}")
                            span
                    p(@click="toggle(idx)" :class="{'open-question': item.show}").faq__list-item-question.pointer {{ $t(item.question) }}
                p(v-html="$t(item.answer)" :class="{'show-answer': item.show}").faq__list-item-answer

</template>

<script>
import { mapGetters } from "vuex";
    export default {
        computed: {
            ...mapGetters({
                questions: "faq/getQuestions",
            }),
        },
        data() {
            return {
                activeItem: null,
            }
        },
        methods: {
            toggle(idx) {
                if (this.questions[idx].show) {
                    this.questions[idx].show = false;
                } else {
                    for (let i = 0; i < this.questions.length; i++) {
                        if (i !== idx) {
                            this.questions[i].show = false;
                        }
                    }
                    this.questions[idx].show = true;
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
.faq { 

    &__list { 
    margin-top: 24px;

    @include mid { 
        margin-top: 2.222vw;
    }
    &-item { 
        // margin-bottom: 16px;
        
        @include mid { 
            margin-bottom: 1.111vw;
        }
        &-wrapper { 
            position: relative;
        }
        &-question { 
            width: fit-content;
            padding-left: 15px;
            margin-bottom: 16px;
            font-weight: 700;
            font-size: 15px;
            line-height: 18px;
            text-decoration-line: underline;
            color: #030303;
            transition: all .3s;
            
            position: relative;
            
            user-select: none;
            
            &:hover { 
                transition: all .3s;
                color: #13AD68;
            }
            @include mid { 
                padding-left: 1.242vw;
                margin-bottom: 1.111vw;
                font-size: 1.250vw;
                line-height: 1.528vw;
            }
            // &::before { 
            //     display: block;
            //     position: absolute;
            //     content: "";
            //     width: 7px;
            //     height: 7px;
            //     top: 50%;
            //     transform: translateY(-50%);
            //     left: 0;
            //     background: #13AD68;

            //     @include mid { 
            //         width: 0.486vw;
            //         height: 0.486vw;
            //     }
            // }
        }
        &-answer { 
            user-select: none;
            overflow: hidden;
            transition: all 1s;
            transition: padding-bottom none !important;
            max-height: 0;
            font-weight: 500;
            font-size: 13px;
            line-height: 16px;
            color: #030303;
            border-bottom: 1px solid transparent;
            @include mid { 
                font-size: 1.042vw;
                line-height: 1.250vw;
            }
        }
    }
}
}
.show-answer { 
    max-height: 500px;
    padding-bottom: 16px;
    border-bottom: 1px solid #BFBFBF;

    @include mid { 
        max-height: 27.778vw;
        padding-bottom: 1.111vw;
        border-bottom: 0.069vw solid #BFBFBF;
    }
}
.spans { 
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 9px;
    height: 9px;

    @include mid { 
        width: 0.903vw;
        height: 0.903vw;
    }
    &-wrapper { 
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        // background-color: #13AD68;

        & > span { 
            position: absolute;
            border-radius: 1px;
            display: block;
            width: 9px;
            height: 2px;
            background-color: #13AD68;

            @include mid { 
                width: 0.903vw;
                height: 0.158vw;
            }
            &:first-child { 
                transition: all .3s;
                transform: rotate(90deg);
                background-color: #13AD68;
            }
        }
        
    }
}
.rotate { 
    transition: all .3s;
    transform: rotate(0deg) !important;
}
</style>