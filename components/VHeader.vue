<template lang="pug">
    header.header(:class="{'fix-header': !isPage, 'middlePoint': shouldHideHeader, 'fix-to-top': topHeader, 'fix-bg': background, 'opened-burger': isShowBurger}" )
        .container 
            .header__support()
                VSupport
            .header__wrapper.d-flex-b
                .header__logo(@click="goToHome" )
                    n-link(:to="`/${$i18n.locale}`")
                        img(src="/images/icons/logo.svg", alt="Логотип Євробус" width="100%" height="100%" :class="{'logo-back': logoBack || !isPage}").header__logo-img
                ul.header__burger.d-flex-c.pointer(v-if="!$device.isDesktop" @click="toggleDropdown")
                    li(:class="{'opened-burger-top': isShowBurger}")
                    li(:class="{'opened-burger-center': isShowBurger}")
                    li(:class="{'opened-burger-bottom': isShowBurger}")
                ul(v-if="$device.isDesktop").header__links   
                    li(v-for="item in sections" :key="item.id" :class="{'acive-link': activeMain}" ).header__links-item
                        n-link( :to="`/${$i18n.locale}${item.route}`" :title="item.title" @click.native="cleanHash(item.hash)").header__links-item-text {{ $t(item.title) }}
                        //- span( :title="item.title"  :class="{'active-span': activeMain}").header__links-item-text.pointer  {{ $t(item.title) }}
                .header__info.d-flex-s(v-if="$device.isDesktop")
                    a(href="tel:+380961017110" title="Зателефонувати").header__info-tel +380961017110
                    n-link(:to="`/${$i18n.locale}/history`" :class="{'active-history': activeHistory}" ).header__info-history {{ $t('header.links.history') }}
                    .header__info-language.d-flex-c
                        span(@click="switchLocale('uk')",aria-label="Uk" :class="{'active-lang': lang}").header__info-language-ukr.pointer Укр
                        span.span / 
                        span(@click="switchLocale('ru')", aria-label="Ru" :class="{'active-lang': !lang}").header__info-language-rus.pointer Рус
        VDropdown

</template>

<script>
import { mapGetters } from "vuex";
import debounce from 'lodash/debounce'

export default {
    computed: {
        ...mapGetters({
            isShowBurger: "burger/getBurger",
            isSkiped: "burger/getFixedBurger",
            servicesBlock: "refs/getServices",
            aboutBlock: "refs/getAbout",
            newsBlock: "refs/getNews",
            faqBlock: "refs/getFaq",
            getModal: "modal/getModal"
        }),

        activeMain(){
            if(this.$route.path == '/uk' || this.$route.path == '/ru' || this.$route.path == '/uk#faq' || this.$route.path == '/uk#services' || this.$route.path == '/uk#about' || this.$route.path == '/uk#news') {
                return true
            }
        },
        activeHistory(){
            if(this.$route.path == '/uk/history' || this.$route.path == '/ru/history') { 
                return true
            }
        },
        isPage() {
            return this.$route.path == '/uk' || this.$route.path == '/ru';
        },
    },
    data() {
        return {
            logoBack: false,
            background: false,
            topHeader: true,
            lastScrollPosition: 0,
            shouldHideHeader: false,
            fix: false,
            faq: null,
            news: null,
            about: null,
            services: null,
            lang: true,
            height: null,
            middleHeight: false,
            lowHeight: false,
            sections: [
                {
                    id: 0,
                    isNuxt: true,
                    title: "header.links.main",
                    route: `/`,
                    
                },
                {
                    id: 1,
                    isNuxt: true,
                    title: "header.links.about",
                    route: `/about`,
                    scroll: "about",
                    hash: "#about"
                },
                {
                    id: 2,
                    isNuxt: true,
                    title: "header.links.services",
                    route: "/services",
                    scroll: "services",
                    hash: "#services"
                },
                {
                    id: 3,
                    isNuxt: true,
                    title: "header.links.news",
                    route: "/news",
                    scroll: "news",
                    hash: "#news"
                },
                {
                    id: 4,
                    isNuxt: true,
                    title: "header.links.faq",
                    route: "/faq",
                    scroll: "faq",
                    hash: "#faq"
                },
            ],
        }
    },
    methods: {
        handleScroll(){
            if(!this.isShowBurger){
                const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop

                if (currentScrollPosition > this.lastScrollPosition) {
                    // Скролл вниз
                    this.shouldHideHeader = false
                } else {
                    this.shouldHideHeader = true
                    // Скролл вверх
                }
                this.lastScrollPosition = currentScrollPosition

            }
            },
        cleanHash(scroll) { 
            setTimeout(() => {
                // location.hash=""
                if (location.hash === scroll || location.hash === "" || location.hash === "/ru") {
                    var element = document.querySelector(scroll);
                    console.log(element);
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            }, 1);
        },
        switchLocale(locale) {
            this.$i18n.setLocale(locale)

            setTimeout(() => {
                window.location.reload(true)
                
            }, 0);


            if (this.$i18n.locale == "ru") {
            this.lang = false;
            } else {
                this.lang = true;
            }

        },
        toggleDropdown(){
            this.$store.dispatch("burger/toggle");
        },
        closeDropdown() {
            this.$store.dispatch("burger/close");
        },
        updateScrollLength() {
            if(!this.isShowBurger && !this.getModal){this.height = window.scrollY
            // console.log(this.height);
            if(this.height > 1) {
                this.logoBack = true
                this.background = true
            }else { 
                this.background = false
                this.logoBack = false
            }
            if(this.height > 400) { 
                this.topHeader = false
                this.middleHeight = true
                
            }else { 
                this.middleHeight = false
                this.topHeader = true
                this.shouldHideHeader = false
            }
            if(this.height > 800) { 
                this.$store.commit("burger/fixHeader");
                this.lowHeight = false
            }else { 
                this.lowHeight = true
                this.$store.commit("burger/unFixHeader");
            }}
        },
        goToHome(){
            this.$store.commit("burger/unFixHeader");
            document.querySelector("body").style = "overflow-y: inherit";
            window.scrollTo({top: 0, behavior: "smooth"})
        },
        // scrollToBlock(scroll) {    
        //     if(this.$route.name.includes('/uk/#services')){
        //          this.$route.push('/uk')
        //     }
        //     if(scroll == "services"){ 
        //         this.services.scrollIntoView({
        //             behavior: 'smooth',
        //             block: 'center',
        //         });
        //     }else if(scroll == "about") { 
        //         this.about.scrollIntoView({
        //             behavior: 'smooth',
        //             block: 'center',
        //         });
        //     }else if(scroll == "news") { 
        //         this.news.scrollIntoView({
        //             behavior: 'smooth',
        //             block: 'end',
        //         });
        //     }else if(scroll == "faq") { 
        //         this.faq.scrollIntoView({
        //             behavior: 'smooth',
        //             block: 'center',
        //         });
        //     }
        // },
    }, 
    
 
    mounted(){
        // console.log(this.$route.path);
        // this.lowHeight = false
        window.addEventListener('scroll', this.handleScroll)

        // this.$store.commit("burger/fixHeader");
        // this.$router.afterEach(() => {
        //     if (window.location.hash) {
        //         history.replaceState(null, null, '');
        //     }
        // });
        setTimeout(() => {
            this.services = this.servicesBlock
            this.about = this.aboutBlock
            this.faq = this.faqBlock
            this.news = this.newsBlock
        }, 1);
        
        if (this.$i18n.locale == "ru") {
            this.lang = false;
        } else {
            this.lang = true;
        }

        window.addEventListener('scroll', this.updateScrollLength);
        
        
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll)
    },
}
</script>

<style lang="scss" scoped>
.header { 
    height: 120px;
    width: 100%;
    position: fixed;
    top: 0%;
    left: 0%;
    border-bottom: 1px solid #707070;
    padding-top: 0px;
    padding-left: 0px;
    z-index: 3;
    transition: opacity .5s;
    opacity: 0;

    @include mid { 
        border: none;
        // padding-top: 32px;
        padding: 0 0 2.222vw 0;
        height: 8vw;
    }
    &__support {
        margin-bottom: 8px;

        @include mid { 
            margin-bottom: 0.556vw;
        }
    }
    &__wrapper { 

        @include mid { 
            align-items: flex-start;
            padding: 0 8.333vw;
        }
        & > img { 
            z-index: 2;
        }
    }
    &__info{ 
        display: flex;
        align-items: flex-start;
        gap: 1.667vw;

        @include mid { 
            // border: none;
            padding-top: 1.944vw;
            // padding: 2.222vw 8.333vw 2.222vw 8.333vw;
            // height: 6.250vw;
        }
        &-tel { 
            position: relative;
            padding-left: 1.528vw;
            color: #FFFFFF;
            font-weight: 500;
            font-size: 1.042vw;
            line-height: 1.250vw;

            &::after { 
                position: absolute;
                display: block;
                content: "";
                width: 0%;
                height: 0.069vw;
                background-color: #13AD68;
                bottom: -0.208vw;
                right: 0;
                transition: all 0.3s;
            }
            
            &:hover { 
                transition: all 0.3s;
                color: #13AD68;

                &::after { 
                    transition: all 0.3s;
                    height: 0.089vw;
                    width: 50%;
                }
            }
            &::before { 
                display: block;
                position: absolute;
                content: "";
                background-image: url("/images/icons/hero-tel.svg");
                background-repeat: no-repeat;
                background-size: contain;
                width: 1.181vw;
                height: 1.181vw;
                top: 50%;
                transform: translateY(-50%);
                left: 0;
            }
        }
        &-history { 
            position: relative;
            padding-left: 1.736vw;
            color: #FFFFFF;
            font-weight: 500;
            font-size: 1.042vw;
            line-height: 1.250vw;
            
            &::after { 
                position: absolute;
                display: block;
                content: "";
                width: 0%;
                height: 0.069vw;
                background-color: #13AD68;
                bottom: -0.208vw;
                right: 0;
                transition: all 0.3s;
            }
            
            &:hover { 
                transition: all 0.3s;
                color: #13AD68;
                &::after { 
                    transition: all 0.3s;
                    height: 0.089vw;
                    width: 50%;
                }
            }
            &::before { 
                display: block;
                position: absolute;
                content: "";
                background-image: url("/images/icons/history.svg");
                background-repeat: no-repeat;
                background-size: contain;
                width: 1.285vw;
                height: 1.111vw;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
            }
        }
        &-language { 
            user-select: none;

            & > span { 
                color: #FFFFFF;
                font-weight: 500;
                font-size: 1.042vw;
                line-height: 1.250vw;
                position: relative;
                transition: all .3s;

                &::before { 
                    display: block;
                    position: absolute;
                    content: "";
                    background-color: #13AD68;
                    bottom: -0.208vw;
                    left: 50%;
                    height: 0.069vw;
                    width: 0%;
                    transition: all .3s;
                }
                &::after { 
                    display: block;
                    position: absolute;
                    content: "";
                    background-color: #13AD68;
                    bottom: -0.208vw;
                    right: 50%;
                    height: 0.069vw;
                    width: 0%;
                    transition: all .3s;
                }

                &:hover { 
                    transition: all .3s;
                    color: #13AD68;

                    &::after { 
                        transition: all .3s;
                        width: 50%;
                    }
                    &::before { 
                        transition: all .3s;
                        width: 50%;
                    }
                }
            }
        }
    }
    &__links { 
        display: flex;
        align-items: flex-start;
        gap: 1.667vw;
        padding-left: 6.944vw;

        @include mid { 
            // border: none;
            padding-top: 1.944vw;
            // padding: 2.222vw 8.333vw 2.222vw 8.333vw;
            // height: 6.250vw;
        }
        &-item { 
            position: relative;
            display: inherit;

            span { 
                user-select: none;
            }
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
            &-text { 
                font-weight: 400;
                font-size: 1.042vw;
                line-height: 1.250vw;
                color: #FFFFFF;
                transition: all 0.3s;

                &:hover { 
                    transition: all 0.3s;
                    color: #13AD68;
                }
            }
        }
    }
    &__logo { 
        padding-left: 24px;

        @include mid { 
            padding-left: 0;
        }
        &-img { 
            transition: all .3s;
            width: 80px;
            height: 80px;
            @include mid { 
                width: 8.056vw;
                height: 8.056vw;
            }
            
        }
    }
    &__burger { 
        position: relative;
        height: 51px;
        width: 81px;
        padding: 16px 0px;
        border-top: 1px solid #707070;
        border-bottom: 1px solid #707070;
        flex-direction: column;

        & > li { 
            width: 30px;
            height: 3px;
            background: #F5F5F5;
            border-radius: 5px;
            transition: all 0.3s;
            
            &:nth-child(2){
                margin: 5px 0px;
            }
        }
    }
}
.container { 
    position: relative;
    z-index: 5;
    padding: 0;
}
.opened-burger-center { 
    // opacity: 0;
    width: 0px !important;
}
.opened-burger-top { 
    transform: translateY(300%) rotate(-45deg);
    transition: all 0.3s;
}
.opened-burger-bottom { 
    transform: translateY(-300%) rotate(45deg);
    transition: all 0.3s;
}
.opened-burger { 
    background-color: transparent !important;
}
.fix-header { 
    position: fixed;
    background: rgba(16, 16, 16, 0.85);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.22);
    backdrop-filter: blur(4px);
    // transition: all .5s;
    
    @include mid { 
        // padding-top: 0.556vw;
    }
}
.middlePoint { 
    position: fixed;
    background: rgba(16, 16, 16, 0.85);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.22);
    transition: opacity height 1s;
    opacity: 1 !important;
    height: 96px !important;
    @include mid { 
        // transition: none;
        // padding-top: 0.556vw;
        transition: opacity height 1s;
        opacity: 1 !important;
        height: 7.850vw !important;

    }
}
.acive-link:first-child  { 
    a { 
        font-weight: 700 !important;
        color: #13AD68 !important;
    }
    span { 
        font-weight: 700 !important;
        color: #13AD68 !important;
    }
}
.active-history { 
    font-weight: 700 !important;
    color: #13AD68 !important;
}
.logo-back { 
    transition: all .3s;
    width: 56px;
    height: 57px;
    @include mid { 
        // transition: width  height .3s;
        width: 5.208vw;
        height: 5.208vw;
    }
}
.opacity { 
    transition: opacity 1s;
    // backdrop-filter: none;

    // height: 0;
}
.fix-to-top { 
    // position: absolute;
    opacity: 1;
    transition: opacity 1s;
}
.fix-bg { 
    background-color: rgba(16, 16, 16, 0.85);
    backdrop-filter: blur(4px) !important;
    transition: background-color height 1s;
    backdrop-filter: none;
    height: 96px;
    @include mid { 
        backdrop-filter: blur(4px);
        height: 8vw;
    }
}
.span { 
    margin: 0 0.417vw;
    color: #FFFFFF;

    &:hover { 
        color: #FFFFFF !important;
        &::after { 
            display: none;
        }
        &::before { 
            display: none;
        }
    }
}
.active-lang { 
    color: #13AD68 !important;
}
</style>