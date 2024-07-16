<template lang="pug">
footer.footer    
    .container 
        VTitle(:title="$t('footer.title')" v-if="!isErrorPage" data-aos="fade-right")
        .footer__content(v-if="!isErrorPage")
            ul.footer__tel() 
                li.footer__tel-title
                    p Телефон
                li.footer__tel-item
                    a(href="tel:+380961017110" :title="$t('footer.hovers.call')") + 38 (096) 101 71 10
                li.footer__tel-info 
                    p {{ $t('footer.tel') }}
            ul.footer__email 
                li.footer__email-title
                        p E-mail
                li.footer__email-item   
                    a(href="mailto:europebus.fb@gmail.com" :title="$t('footer.hovers.write')") europebus.fb@gmail.com
            ul.footer__social
                li.footer__social-title
                    p {{ $t('footer.social') }}
                li(v-for="(item, idx) in socials" :key="idx").footer__social-item
                    a(:href="item.link" :title="item.title" target="_blank").footer__social-item {{ item.name }}
        .footer__copy
            .footer__copy-info.d-flex-b() 
                p &#169; EUROPE BUS
                .footer__copy-developed.d-flex-c(v-if="$device.isDesktop")
                    p Developed by 
                        span 
                            a(href="https://maze-digital.studio/" target="_blank" title="Сайт MAZE Studio").footer__copy-developed-studio Maze Studio
                p {{ $t('footer.rules') }}
            .footer__copy-developed.d-flex-c(v-if="!$device.isDesktop")
                p Developed by 
                    span 
                        a(href="https://maze-digital.studio/" target="_blank" title="Сайт MAZE Studio").footer__copy-developed-studio Maze Studio
</template>

<script>
    export default {
        data() {
            return {
                socials: [
                    {
                        name: "Instagram",
                        link: "https://instagram.com/europe.bus?igshid=YmMyMTA2M2Y=",
                        title: "Instagram"
                    },
                    {
                        name: "Facebook",
                        link: "https://www.facebook.com/europe.bus.com.ua",
                        title: "Facebook"
                    },
                    {
                        name: "Telegram",
                        link: "https://t.me/europabus",
                        title: "Telegram"
                    },
                    {
                        name: "Viber",
                        link: "tel:+380961017110",
                        title: "Viber",
                    },
                    {
                        name: "WhatsApp",
                        link: "https://wa.me/380961017110",
                        title: "WhatsApp",
                    }
                ]
            }
        },

        computed: {
            isErrorPage() {
                return this.$route.path.includes('404');
            },
        },
    }
</script>

<style lang="scss" scoped>
.footer { 
    padding-bottom: 40px;

    @include mid {
        padding-bottom: 3.889vw;
        position: relative;
    }
    &__content { 
        margin-top: 32px;
        padding-bottom: 55px;
        border-bottom: 1px solid #C9C9C9;

        & > ul { 

            & > li { 
                & > p {
                    @include mid { 
                        font-size: 1.250vw;
                        line-height: 1.528vw;
                    }
                    
                }
                & > a { 
                    @include mid { 
                        font-size: 1.181vw;
                        line-height: 1.458vw;
                    }
                }
            }
        }
        @include mid { 
            padding: 0 8.819vw 6.667vw 8.819vw;
            margin-top: 2.778vw;
            display: flex;
            gap: 5.222vw;
            border-bottom: 0.069vw solid #C9C9C9;
        }
    }
    &__tel { 
        margin-bottom: 24px;
        
        @include mid { 
            width: 100%;
        }
        &-title { 
            position: relative;
            padding-left: 28px;

            margin-bottom: 16px;

            font-weight: 500;
            font-size: 18px;
            line-height: 22px;
            color: #030303;

            @include mid { 
                margin-bottom: 1.111vw;
                padding-left: 2.292vw;
            }
            &::before { 
                display: block;
                position: absolute;
                content: "";
                background-image: url("/images/icons/tel.svg");
                background-repeat: no-repeat;
                background-size: contain;
                width: 17px;
                height: 17px;
                left: 0%;
                top: 50%;
                transform: translate(0, -50%);

                @include mid { 
                    width: 1.181vw;
                    height: 1.181vw;
                }
            }
        }
        &-item { 
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            color: #030303;

            position: relative;
            transition: all 0.3s;

            &::after { 
                position: absolute;
                display: block;
                content: "";
                width: 0%;
                height: 0.069vw;
                background-color: #13AD68;
                bottom: -0.208vw;
                left: 0;
                transition: all 0.3s;
            }
            
            &:hover { 
                &::after { 
                    transition: all 0.3s;
                    height: 0.089vw;
                    width: 50%;
                }
            }
        }
        &-info { 
            margin-top: 8px;
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            color: #8B8B8B;

            @include mid { 
                font-size: 1.181vw;
                line-height: 1.458vw;
            }
        }
    }
    &__email {
        margin-bottom: 24px;
        @include mid { 
             width: 100%;

        }
        &-title{
            position: relative;
            padding-left: 28px;
            
            margin-bottom: 16px;

            font-weight: 500;
            font-size: 18px;
            line-height: 22px;
            color: #030303;

            @include mid { 
                margin-bottom: 1.111vw;
                padding-left: 2.292vw;
            }
            &::before { 
                display: block;
                position: absolute;
                content: "";
                background-image: url("/images/icons/mail.svg");
                background-repeat: no-repeat;
                background-size: contain;
                width: 20px;
                height: 13px;
                left: 0%;
                top: 50%;
                transform: translate(0, -50%);

                @include mid { 
                    width: 1.389vw;
                    height: 0.903vw;
                }
            }
        }
        &-item { 
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            color: #030303;

            position: relative;
            transition: all 0.3s;

            &::after { 
                position: absolute;
                display: block;
                content: "";
                width: 0%;
                height: 0.069vw;
                background-color: #13AD68;
                bottom: -0.208vw;
                left: 0;
                transition: all 0.3s;
            }
            
            &:hover { 
                &::after { 
                    transition: all 0.3s;
                    height: 0.089vw;
                    width: 50%;
                }
            }
        }
    }
    &__social {

        &-title{
            position: relative;
            padding-left: 28px;
            
            margin-bottom: 16px;

            font-weight: 500;
            font-size: 18px;
            line-height: 22px;
            color: #030303;

            @include mid { 
                margin-bottom: 1.111vw;
                padding-left: 2.292vw;
            }
            &::before { 
                display: block;
                position: absolute;
                width: 17px;
                height: 17px;
                content: "";
                background-image: url("/images/icons/social.svg");
                background-repeat: no-repeat;
                background-size: contain;
                left: 0%;
                top: 50%;
                transform: translate(0, -50%);

                @include mid { 
                    width: 1.181vw;
                    height: 1.181vw;
                }
            }
        }
        &-item { 
            
            margin-bottom: 8px;
            &:nth-child(2),&:nth-child(3),&:nth-child(4),&:nth-child(5),&:nth-child(6) { 
                padding-left: 26px;
                position: relative;

                a { 
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 20px;
                    color: #030303;

                    transition: all .3s;

                    @include mid { 
                        font-size: 1.181vw;
                        line-height: 1.458vw;
                    }
                }

                @include mid { 
                    padding-left: 2.014vw;
                }
                &::before { 
                    display: block;
                    position: absolute;
                    content: "";
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 18px;
                    height: 18px;
                    background-repeat: no-repeat;
                    background-size: contain;

                    @include mid { 
                        width: 1.458vw;
                        height: 1.458vw;
                    }
                }
            }
            &:nth-child(3) { 
                a { 
                    &:hover { 
                        transition: all .3s;
                        color: #1877F2;
                    }
                }
                
                &::before { 
                    background-image: url("/images/icons/facebook-color.svg");
                }
            }
            &:nth-child(2) { 
                a { 
                    &:hover { 
                        transition: all .3s;
                        color: #BD3999;
                    }
                }

                &::before { 
                    background-image: url("/images/icons/inst-color.svg");
                }
            }
            &:nth-child(4) { 
                a { 
                    &:hover { 
                        transition: all .3s;
                        color: #239FDC;
                    }
                }

                &::before { 
                    background-image: url("/images/icons/telegram-color.svg");
                }
            }
            &:nth-child(5) {
                a { 
                    &:hover { 
                        transition: all .3s;
                        color: #7360F2;
                    }
                }

                &::before { 
                    background-image: url("/images/icons/viber-color.svg");
                }
            }
            &:nth-child(6) {
                a { 
                    &:hover { 
                        transition: all .3s;
                        color: #10bb1e;
                    }
                }

                &::before { 
                    background-image: url("/images/icons/whatsapp-color.svg");
                }
            }
            &-link { 
                
            }
            
            @include mid { 
                margin-bottom: 0.556vw;
            }
        }
        @include mid { 
            width: 100%;
        }
    }
    &__copy { 
        padding-top: 16px;

        @include mid { 
            padding-top: 2.222vw;
        }
        &-info { 
            margin-bottom: 32px;
            & > p  {
                font-weight: 400;
                font-size: 14px;
                line-height: 17px;
                color: #030303;

                @include mid { 
                    font-size: 0.972vw;
                    line-height: 1.181vw;
                }
            }
        }
        &-developed { 
            font-weight: 500;
            font-size: 15px;
            line-height: 18px;
            color: #030303;

            @include mid { 
                font-size: 0.972vw;
                line-height: 1.181vw;
            }
            &-studio { 
                font-weight: 700;
                font-size: 15px;
                line-height: 18px;
                text-decoration-line: underline;
                color: #13AD68;

                @include mid { 
                    font-size: 0.972vw;
                    line-height: 1.181vw;
                }
            }
        }
    }
}
.error-page { 
    padding-bottom: 0;
}
@media (max-width: 900px) {
  [data-aos="fade-right"] {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>