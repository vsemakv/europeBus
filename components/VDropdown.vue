<template lang="pug">
.dropdown(:class="{'open-dropdown': isShowBurger, 'fixed-dropdown': isSkiped}") 
    .container 
        .dropdown__content 
            ul.dropdown__links
                li(v-for="item in sections" :key="item.id" @click="openLink" :class="{'acive-link': activeMain}").dropdown__links-item
                    n-link(:to="`/${$i18n.locale}${item.route}`" :title="item.title" v-if="item.isNuxt").dropdown__links-item-text {{ $t(item.title) }}
                    //- span(v-else :title="item.title" @click="scrollToBlock(item.scroll)").dropdown__links-item-text {{ $t(item.title) }}
            .dropdown__info.d-flex-s 
                .dropdown__links-wrapper(@click="openLink")
                    n-link( :to="`/${$i18n.locale}/history`" :class="{'active-history': activeHistory}" ).dropdown__links-history {{ $t('header.links.history') }}
                a(href="tel:+380961017110" title="Зателефонувати").hero__links-tel +380961017110
            .dropdown__language.d-flex-c 
                span(@click="switchLocale('uk')",aria-label="Uk" :class="{'active-lang': lang}").header__info-language-ukr.pointer Укр
                p.span / 
                span(@click="switchLocale('ru')", aria-label="Ru" :class="{'active-lang': !lang}").header__info-language-rus.pointer Рус
       
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            faq: null,
            news: null,
            about: null,
            services: null,
            lang: true,
            sections: [
            {
                        id: 0,
                        isNuxt: true,
                        title: "header.links.main",
                        route: "/",
                    },
                    {
                        id: 1,
                        isNuxt: true,
                        title: "header.links.about",
                        route: `/about`
                    },
                    {
                        id: 2,
                        isNuxt: true,
                        title: "header.links.services",
                        route: "/services"
                    },
                    {
                        id: 3,
                        isNuxt: true,
                        title: "header.links.news",
                        route: "/news",
                    },
                    {
                        id: 4,
                        isNuxt: true,
                        title: "header.links.faq",
                        route: "/faq",
                    },
            ],
        }
    },
    computed: {
        ...mapGetters({
            isShowBurger: "burger/getBurger",
            isSkiped: "burger/getFixedBurger",
            servicesBlock: "refs/getServices",
            aboutBlock: "refs/getAbout",
            newsBlock: "refs/getNews",
            faqBlock: "refs/getFaq",
        }),
        activeMain(){
            if(this.$route.path == '/uk' || this.$route.path == '/ru') { 
                return true
            }
        },
        activeHistory(){
            if(this.$route.path == '/uk/history' || this.$route.path == '/ru/history') { 
                return true
            }
        },
    },
    mounted() {
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
        };
    },
    methods: {
        switchLocale(locale) {
                this.$i18n.setLocale(locale)

                // this.$router.app.refresh()

                setTimeout(() => {
                    window.location.reload(true)
                    
                }, 0);


                if (this.$i18n.locale == "ru") {
                this.lang = false;
                } else {
                    this.lang = true;
                }

                // window.location.

            },
        closeDropdown() {
            this.$store.dispatch("burger/close");
        },
        goToHome() {
            this.$store.commit("burger/unFixHeader");
        },
        openLink() {
            this.$store.commit("burger/fixHeader");
            this.$store.dispatch("burger/close");
            document.querySelector("body").style = "overflow-y: unset";
        },
    },
}
</script>

<style lang="scss" scoped>
.dropdown {
    position: fixed;
    top: 0%;
    left: 0%;
    height: 0;
    overflow: hidden;
    width: 100%;
    background: #5E5D62;
    transition: height 0.5s;

    &__content {
        padding-top: 111px;
    }

    &__links {
        margin-top: 8px;
        padding: 24px 0px;
        border-top: 1px solid #707070;
        border-bottom: 1px solid #707070;

        &-item {
            font-weight: 400;
            font-size: 34px;
            line-height: 41px;
            margin-bottom: 16px;

            &:last-child {
                margin-bottom: 0;
            }

            &-text {
                color: #FFFFFF;
            }

        }
        &-history { 
            font-weight: 400;
            font-size: 25px;
            line-height: 30px;
            color: #FFFFFF;

            &:first-child {
                margin-bottom: 16px;
            }
        }
    }

    &__info {
        padding: 24px 0;
        flex-direction: column;
        align-items: flex-start;

        border-bottom: 1px solid #707070;

        &>a {
            font-weight: 400;
            font-size: 25px;
            line-height: 30px;
            color: #FFFFFF;

            &:first-child {
                margin-bottom: 16px;
            }
        }
    }

    &__language {
        // margin-top: 42px;

        // a,p {

        //     font-weight: 500;
        //     font-size: 27px;
        //     line-height: 33px;
        //     color: #FFFFFF;
        // }

        // &-rus {
        //     color: #FFFFFF;
        // }
    }

    &__language { 
        margin-top: 42px;

            user-select: none;

            & > span { 
                color: #FFFFFF;
                font-weight: 500;
         //     font-weight: 500;
                font-size: 27px;
                line-height: 33px;
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

.active-lang {
    color: #13AD68 !important;
}
.acive-link:first-child  { 
    a { 
        font-weight: 700 !important;
        color: #13AD68 !important;
    }
}
.active-history { 
    font-weight: 700 !important;
    color: #13AD68 !important;
}
.span {
    margin: 0 0.817vw;
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

.open-dropdown {
    transition: height 0.5s;
    height: 200vh;
    // height: 150dvh;
}

.fixed-dropdown {
    background: #101010;
}</style>