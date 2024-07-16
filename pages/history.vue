<template lang="pug">
section.history 
    .container  
        .history__title
            VTitle(:title="$t('history.title')" data-aos="fade-right")
        .history__content 
            .history__empty(v-if="isOjects")
                p.history__empty-text {{ $t('history.empty') }}
            ul.history__list(v-else)
                li(v-for="(item,idx) in objects").history__list-item
                    .history__list-item-place
                        p {{ $t('form.inputs.to') }}
                        p {{ item.to }}
                    .history__list-item-place
                        p {{ $t('form.inputs.from') }}
                        p {{ item.from }}
                    .history__list-item-date
                        p {{ $t('form.inputs.dateTo') }}
                        p {{ item.dateFrom }}
                    .history__list-item-pass
                        p {{ $t('form.inputs.dateBack') }}
                        p {{ item.numPass }}
                    //- .history__list-item-date(v-else)
                    .history__list-item-button(@click="deleteCard(item.id)")
                        VButton(:title="$t('history.button')" isHistory=true)
</template> 

<script>
import { mapGetters } from "vuex";
    export default {
        computed: {
            ...mapGetters({
                // historyList: "history/getHistory",
                objects: "history/getList"
            }),
            isOjects(){
                if(this.objects < 1 || this.objects == undefined) {
                    return true
                }else { 
                    return false
                }
            }
        },
        created() {
        },
        mounted () {
            this.$store.dispatch('history/init')
        },
        data() {
            return {
            }
        },
        methods: {
            // scrollTo(){
            //     this.$scrollTo('/#about', 500, { easing: 'linear' })
            // },
            deleteCard(id) {
                // console.log(idx);
                this.$store.commit('history/removeFromList', id)
            }
        },
    }
</script>

<style lang="scss" scoped>
.history { 
    padding-top: 16px;
    @include mid { 
        padding-top: 0;
    }
    &__title  {
        padding-bottom: 8px;
        position: relative;
        @include mid { 
            padding-bottom: 0.556vw;
        }
        &::after { 
            position: absolute;
            display: block;
            content: "";
            left: 0%;
            bottom: 0%;
            height: 3px;
            width: 30%;
            background-color: #13AD68;
            border-radius: 3px;

            @include mid { 
                border-radius: 0.208vw;
                height: 0.208vw;
            }
        }
    }
    &__content { 
        margin-top: 32px;

        @include mid { 
            margin-top: 1.944vw;
        }
    }
    &__empty { 
        padding: 16px;
        background: #E8E8E8;
        border: 1px solid #DCDCDC;

        &-text { 
            text-align: center;
            font-weight: 500;
            font-size: 14px;
            line-height: 17px;
            color: #030303;
        }
    }
    &__list { 

        &-item { 
            padding: 25px 24px;
            margin-bottom: 16px;    
            background: #E8E8E8;
            border: 1px solid #DCDCDC;
            box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            position: relative;
            z-index: 3;

            &::before { 
                @include mid { 
                    display: block;
                    position: absolute;
                    content: "";
                    background-image: url("/images/icons/triangles-history2.svg");
                    background-repeat: no-repeat;
                    background-size: cover;
                    width: 3.472vw;
                    height: 109.1%;
                    top: calc(0% - 0.11vw);
                    right: -5.6vh;
                    z-index: 1;
                }
            }
            &::after { 
                @include mid { 
                    display: block;
                    position: absolute;
                    content: "";
                    // background-image: url("/images/icons/triangles-history.svg");
                    // background-repeat: no-repeat;
                    // background-size: cover;
                    background-color: #E8E8E8;
                    width: 0.9vw;
                    height: 100.5%;
                    border-top: 0.035vw solid #DCDCDC;
                    // top: calc(0% - 0.089vw);
                    top: -0.5%;
                    right: -0.5vh;
                    z-index: 2;
                }
            }
            @include mid { 
                display: flex;
                // gap: 48px;
                padding: 1.667vw 5.486vw 1.778vw 2.778vw;
                margin-right: 3.472vw;
                margin-bottom: 1.111vw;
                border: 0.069vw solid #DCDCDC;
                box-shadow: 0 0.278vw 0.347vw rgba(0, 0, 0, 0.1);
                border-radius: 0.347vw;
            }

            &-place { 
                margin-bottom: 24px;

                @include mid { 
                    margin-bottom: 0;
                    // margin-right: 80px;
                    width: 100%;
                }
                & > p { 
                    &:nth-child(1), &:nth-child(3){ 
                        margin-bottom: 16px;
                        padding-left: 18px;
                        position: relative;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 17px;

                        @include mid { 
                            margin-bottom: 1.667vw;
                            padding-left: 1.250vw;
                            font-size: 0.972vw;
                            line-height: 1.181vw;
                        }
                        &::before { 
                            display: block;
                            content: "";
                            background-image: url("/images/icons/place.svg");
                            background-repeat: no-repeat;
                            background-size: contain;
                            position: absolute;
                            top: 50%;
                            left: 0%;
                            transform: translateY(-50%);
                            width: 8px;
                            height: 11px;

                            @include mid { 
                                width: 0.903vw;
                                height: 1.181vw;
                            }
                        }
                    }
                    &:nth-child(2),&:nth-child(4){ 
                        margin-bottom: 24px;
                        font-style: italic;
                        font-weight: 600;
                        font-size: 15px;
                        line-height: 18px;

                        @include mid { 
                            margin-bottom: 0;
                            font-size: 0.972vw;
                            line-height: 1.181vw;
                        }
                    }
                }
            }
            &-date { 
                @include mid { 
                    margin-bottom: 0;
                    // margin-right: 80px;
                    width: 100%;
                }
                & > p { 
                    
                    &:nth-child(1),&:nth-child(3) { 
                        padding-left: 18px;
                        position: relative;
                        margin-bottom: 16px;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 17px;

                        @include mid { 
                            margin-bottom: 1.667vw;
                            padding-left: 1.550vw;
                            font-size: 0.972vw;
                            line-height: 1.181vw;
                        }

                        &::before { 
                            display: block;
                            content: "";
                            background-image: url("/images/icons/date.svg");
                            background-repeat: no-repeat;
                            background-size: contain;
                            width: 12px;
                            height: 12px;
                            position: absolute;
                            top: 50%;
                            left: 0%;
                            transform: translateY(-50%);

                            @include mid { 
                                width: 1.181vw;
                                height: 1.181vw;
                            }
                        };
                    }

                    &:nth-child(2),&:nth-child(4) { 
                        margin-bottom: 24px;
                        font-style: italic;
                        font-weight: 600;
                        font-size: 15px;
                        line-height: 18px;

                        @include mid { 
                            margin-bottom: 0;
                            font-size: 0.972vw;
                            line-height: 1.181vw;
                        }
                    }
                }
                
            }
            &-pass { 
                @include mid { 
                    margin-bottom: 0;
                    // margin-right: 80px;
                    width: 100%;
                }
                & > p { 
                    
                    &:nth-child(1) { 
                        padding-left: 18px;
                        position: relative;
                        margin-bottom: 16px;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 17px;

                        @include mid { 
                            margin-bottom: 1.667vw;
                            padding-left: 1.550vw;
                            font-size: 0.972vw;
                            line-height: 1.181vw;
                        }

                        &::before { 
                            display: block;
                            content: "";
                            background-image: url("/images/icons/pass.svg");
                            background-repeat: no-repeat;
                            background-size: contain;
                            width: 12px;
                            height: 12px;
                            position: absolute;
                            top: 50%;
                            left: 0%;
                            transform: translateY(-50%);

                            @include mid { 
                                width: 1.181vw;
                                height: 1.181vw;
                            }
                        };
                    }

                    &:nth-child(2) { 
                        margin-bottom: 24px;
                        font-style: italic;
                        font-weight: 600;
                        font-size: 15px;
                        line-height: 18px;

                        @include mid { 
                            margin-bottom: 0;
                            font-size: 0.972vw;
                            line-height: 1.181vw;
                        }
                    }
                }
            }
            &-button { 
                margin: 40px auto 0;
                padding: 0 62px;

                @include mid { 
                    margin: 0;
                    padding: 0;
                    // width: 10.139vw;
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }
            }
        }
    }
}
</style>