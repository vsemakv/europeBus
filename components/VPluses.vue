<template lang="pug">
.container
    .pluses
        ul.pluses__list
            li(v-for="(item,idx) in pluses" :key="idx" data-aos="fade-up" :data-aos-delay="idx * animationDuration" data-aos-easing="ease-in-sine").pluses__list-item.d-flex-c
                img(:src="item.image", :alt="item.alter" width="100%" height="100%")
                p {{ $t(item.title) }}
                p {{ $t(item.descr) }}
</template>

<script>
    export default {
        data() {
            return {
                pluses: [
                    {
                        title: "pluses.wifi.title",
                        image: "/images/icons/wifi.svg",
                        descr: "pluses.wifi.text",
                        alter: "Зображення wifi"
                    },
                    {
                        title: "pluses.candy.title",
                        image: "/images/icons/candy.svg",
                        descr: "pluses.candy.text",
                        alter: "Зображення цукерки"
                    },
                    {
                        title: "pluses.percent.title",
                        image: "/images/icons/percent.svg",
                        descr: "pluses.percent.text",
                        alter: "Зображення відсотків"
                    },
                ],
                animationDuration: 400
                
            }
        },
        mounted () {
            if (window.innerWidth < 900) {
                this.animationDuration = 100;
            } else {
                this.animationDuration = 400;
            };
        },
    }
</script>

<style lang="scss" scoped>
.pluses {
    overflow: hidden;
    padding: 32px 35px;
    background: #F5F5F5;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    margin-top: 32px;
    margin-bottom: 63px;
    
    @include mid { 
        padding: 1.667vw 5.556vw;
        box-shadow: 0 0.278vw 1.042vw rgba(0, 0, 0, 0.15);
        border-radius: 1.042vw;
    }
    &__list { 
        @include mid { 
            display: flex;
            gap: 7.986vw;
        }
        &-item { 
            flex-direction: column;
            justify-content: flex-start;
            &:nth-child(2){ 
                margin: 24px 0px;
                @include mid { 
                    margin: 0;
                    min-width: 20.486vw;
                }
            }
            &:nth-child(1){ 
                @include mid { 
                    min-width: 17.569vw;
                }
            }
            &:nth-child(3){ 
                @include mid { 
                    min-width: 17.847vw;
                }
            }
            & > img { 
                margin-bottom: 16px;
                width: 24px;
                height: 24px;

                @include mid { 
                    width: 2.153vw;
                    height: 2.153vw;
                    margin-bottom: 0.556vw;
                }
            }
            & > p { 
                text-align: center;
                font-weight: 600;
                font-size: 16px;
                line-height: 20px;

                @include mid { 
                    font-size: 1.389vw;
                    line-height: 1.667vw;
                }
                &:last-child { 
                    margin-top: 8px;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 17px;

                    @include mid { 
                        font-size: 0.972vw;
                        line-height: 1.181vw;
                    }
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