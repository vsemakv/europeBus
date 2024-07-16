<template lang="pug">
.partners 
    .container(ref="partners")  
        VTitle(:title="$t('partners.title')" data-aos="fade-right" )
        ul.partners__list(:class="{'animated-line': isAnimatedLine}")
            li.partners__list-item.d-flex-c(v-for="(partner, idx) in partnersList"  v-intersect="onPartners")
                a(:href="partner.link", target="_blank", :title="`Сайт ${partner.title}`").partners__list-item-link 
                    img(:src="partner.image", :alt="partner.alter" width="100%" height="100%").partners__list-item-img
</template>

<script>
    export default {
        data() {
            return {
                isAnimatedLine: false,
                partnersList: [
                    {
                        image: "/images/partners/montrans.svg",
                        alter: "MONO TRANS",
                        title: "MONO TRANS",
                        link: "https://youcontrol.com.ua/ru/catalog/company_details/42281117/",
                    },
                    {
                        image: "/images/partners/tac.svg",
                        alter: "TAC",
                        title: "TAC",
                        link: "https://sgtas.ua/",
                    },
                    {
                        image: "/images/partners/rubikon.svg",
                        alter: "RUBIKON.COM.UA",
                        title: "RUBIKON",
                        link: "https://rubikon.com.ua/",
                    },
                    {
                        image: "/images/partners/karnauhova.svg",
                        alter: "ФОП Карнаухова",
                        title: "ФОП Карнаухова",
                        link: "https://t.me/+oUCAR7M8hN44ODdi",
                    }
                ]
            }
        },
        methods: {
            onPartners(entries) {
                if (entries.isIntersecting) {
                    this.isAnimatedLine = true;
                }
            },
        },
        mounted () {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 1
            };
            const FirstLine = new IntersectionObserver(this.onPartners, options);
            FirstLine.observe(this.$refs.partners);
        },
    }
</script>

<style lang="scss" scoped>
.partners { 

    &__list { 
        padding-top: 32px;
        padding-bottom: 24px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        position: relative;

        @include mid { 
            padding: 3.333vw 5.069vw 2.778vw 5.069vw;
        }
        &::after { 
            display: block;
            position: absolute;
            content: "";
            bottom: 0%;
            right: 0%;
            width: 0%;
            height: 2px;
            border-radius: 3px;
            background: #13AD68;

            @include mid { 
                height: 0.208vw;
                width: 0%;
                border-radius: 0.208vw;
            }
        }
        &-item { 
            
            &:nth-child(1){ 
                
                img { 
                    width: 124px;
                    height: 101px;

                    @include mid { 
                        width: 11.597vw;
                        height: 9.444vw;
                    }
                }
                
            }
            &:nth-child(2){
                
                img { 
                    margin-top: 26px;
                    margin-left: 48px;
                    width: 155px;
                    height: 50px;
                    
                    @include mid { 
                        width: 14.236vw;
                        height: 4.583vw;
                        margin-left: 5.556vw;
                        margin-top: 2.431vw;
                    }
                }
                
            }
            &:nth-child(3){
                

                img { 
                    margin-top: 31px;
                    width: 157px;
                    height: 23px;
                    @media screen and (orientation: landscape) {
                        margin-left: 23px;
                    }
                    @include mid { 
                        width: 25.139vw;
                        height: 3.750vw;
                        margin-top: 2.431vw;
                        margin-left: 5.556vw;
                        
                    }
                }
                
            }
            &:nth-child(4){
                

                img { 
                    margin-left: 23px;
                    margin-top: 31px;
                    width: 147px;
                    height: 23px;

                    @include mid { 
                        width: 22.569vw;
                        height: 3.472vw;
                        margin-top: 2.778vw;
                        margin-left: 0;
                    }
                }
            }
        }
    }
}
.animated-line { 
    &::after { 
        transition: all 2s;
        width: 40%;

        @include mid { 
            width: 30%;
        }
    }
}
@media (max-width: 900px) {
  [data-aos="fade-right"] {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>