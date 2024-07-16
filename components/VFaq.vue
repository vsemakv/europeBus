<template lang="pug">
.faq()
    .faq__trigger(ref="faqSection" id="faq")
    .container 
        .faq__title(ref="faqTitle" v-intersect="onTitle" :class="{'animated-line': isAnimatedLine}" )
            VTitle(:title="$t('faq.title')" data-aos="fade-right" :data-aos-delay="animationDelay" :data-aos-duration="animationDuration" data-aos-offset="50")
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
                isAnimatedLine: false,
                animationDuration: 900,
                animationDelay: 100
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.$store.commit("refs/setFaq", this.$refs.faqSection);
            });
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 1
            };
            const FirstLine = new IntersectionObserver(this.onTitle, options);
            FirstLine.observe(this.$refs.faqTitle);


            if (window.innerWidth < 900) {
                this.animationDuration = 0;
                this.animationDelay = 0
            } else {
                this.animationDuration = 900;
                this.animationDelay = 100
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
            onTitle(entries) {
                if (entries.isIntersecting) {
                    this.isAnimatedLine = true;
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
.faq { 
    position: relative;

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
    &__trigger { 
        position: absolute;
        top: -150px;
        left: 0px;
        width: 10px;
        height: 10px;
        @include mid { 
            top: -10.944vw;
        }
    }
    &__title { 
        position: relative;
        padding-bottom: 8px;

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
            width: 0%;
            background-color: #13AD68;
            border-radius: 3px;

            @include mid { 
                border-radius: 0.208vw;
                height: 0.208vw;
            }
        }
    }
}
.show-answer { 
    max-height: 500px;
    padding-bottom: 16px;
    margin-bottom: 16px;
    transition: padding-bottom none;
    border-bottom: 1px solid #BFBFBF;
    @include mid { 
        max-height: 27.778vw;
        padding-bottom: 1.111vw;
        border-bottom: 0.069vw solid #BFBFBF;
        margin-bottom: 1.111vw;
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
.animated-line { 
    &::after { 
        transition: all 1.5s;
        width: 60%;
    }
}
.rotate { 
    transition: all .3s;
    transform: rotate(0deg) !important;
}
</style>