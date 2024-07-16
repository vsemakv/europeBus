<template lang="pug">
.article 
    .container
        .article__content(v-for="item of currentArticle") 
            .article__link 
                n-link(:to="`/${$i18n.locale}/news`") Повернутись
            VTitle(:title="$t(item.title)" isPage=true)
            p.article__date {{ item.date }}
            .article__image 
                img(v-if="!$device.isDesktop" :src="item.image", :alt="$t(item.alter)" width="100%" height="100%" )
                img(v-if="$device.isDesktop" :src="item.imageSlug", :alt="$t(item.alter)" width="100%" height="100%" )
            ul.article__text    
                li(v-for="(item,idx) in item.info").article__text-item 
                    p.article__text-item-title {{ $t(item.titleArticle) }}
                    p(v-html="$t(item.textArticle)").article__text-item-info
            .article__more 
                p {{ $t('news.readToo') }}:
                .article__more-news
                    VNews(:news="moreNews")
</template>

<script>
import { mapGetters } from "vuex";
    export default {

        data() {
            return {
                // newList: [],
            }
        },

        computed: {
            ...mapGetters({
                currentArticle: "articles/getCurrentArticle",
                articles: "articles/getArticles",
                articlesMore: "articles/getMore",
                moreNews: "articles/getMoreNews"
            }),

        },
        async asyncData({ store, params, redirect, route}) {
            const { slug } = params;
            const projects = store.state.articles.articles;
            const project = projects.find(project => project.code === slug);
            if (!project) {
                return redirect('/404');
            }
            await store.dispatch("articles/getArticle", route.params.slug);
        },


        mounted() {
            this.runListPush(); 
        },
        
        watch: {
            currentArticle() {
                    this.runListPush();
            },

            async '$route.params.slug'(newSlug) {
                // window.location.reload()
                await this.$store.dispatch('articles/getArticle', newSlug);
            },

        },

        methods: {
            runListPush() {
                this.$store.dispatch('articles/getMoreArticles',  this.currentArticle[0].id)

            }
        }
        
    }
</script>

<style lang="scss" scoped>
.article { 
    padding-top: 24px;

    @include mid { 
        padding-top: 2.222vw;
    }
    &__link { 
        padding-left: 18px;
        position: relative;
        font-weight: 500;
        font-size: 13px;
        line-height: 16px;

        @include mid { 
            font-size: 0.903vw;
            line-height: 1.111vw;
            padding-left: 1.250vw;
        }
        &::before { 
            position: absolute;
            display: block;
            content: "";
            top: 50%;
            left: 0%;
            transform: translateY(-50%);
            background-image: url("/images/icons/arrow-back.svg");
            background-repeat: no-repeat;
            background-size: cover;
            width: 10px;
            height: 7px;

            @include mid { 
                width: 0.694vw;
                height: 0.486vw;
            }
        }
    }
    
    &__date { 
        margin-top: 16px;
        padding-left: 20px;
        position: relative;

        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #515151;

        @include mid { 
            margin-top: 1.667vw;
            padding-left: 1.389vw;
            font-size: 1.111vw;
            line-height: 1.389vw;
        }
        &::before { 
            position: absolute;
            display: block;
            content: "";
            width: 12px;
            height: 12px;
            background-image: url("/images/icons/clock.svg");
            background-size: cover;
            background-repeat: no-repeat;
            left: 0%;
            top: 50%;
            transform: translateY(-50%);

            @include mid { 
                width: 0.833vw;
                height: 0.833vw;
            }
        }
    }
    &__image { 
        margin-top: 32px;
        padding-bottom: 8px;
        position: relative;
        width: 100%;

        @include mid { 
            margin-top: 1.667vw;
            padding-bottom: 1.111vw;
        }
        & > img { 
            object-fit: cover;
            min-height: 220px;
            border-radius: 5px;
            max-height: 252px;
            padding-bottom: 8px;

            @include mid { 
                max-height: 20.833vw;
                padding-bottom: 1.111vw;
            }
        }
        &::after { 
            position: absolute;
            display: block;
            content: "";
            right: 0%;
            bottom: 0%;
            height: 3px;
            width: 87px;
            background-color: #13AD68;
            border-radius: 3px;

            @include mid { 
                width: 5.764vw;
                height: 0.208vw;
                border-radius: 0.208vw;
            }
        }
    }
    &__text { 
        margin-top: 24px;
        padding-bottom: 24px;

        position: relative;

        @include mid { 
            margin-top: 1.111vw;
            padding-bottom: 1.667vw;
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
                width: 5.208vw;
                height: 0.208vw;
                border-radius: 0.208vw;
            }
        }
        &-item { 
            margin-bottom: 16px;

            @include mid { 
                margin: 1.667vw;
            }
            &-title { 
                margin-bottom: 16px;
                font-weight: 700;
                font-size: 16px;
                line-height: 20px;
                color: #030303;

                position: relative;

                @include mid { 
                    // margin: 1.667vw;
                    font-size: 1.389vw;
                    line-height: 1.667vw;
                }
                &::before { 
                    position: absolute;
                    display: block;
                    content: "";
                    left: -8px;
                    bottom: 50%;
                    transform: translateY(50%);
                    height: 70%;
                    width: 3px;
                    background-color: #13AD68;
                    border-radius: 3px;

                    @include mid { 
                        width: 0.208vw;
                        border-radius: 0.208vw;
                        left: -0.556vw;
                    }
                }
            }
            &-info { 
                font-weight: 500;
                font-size: 14px;
                line-height: 17px;
                color: #030303;

                @include mid { 
                    font-size: 1.111vw;
                    line-height: 1.389vw;
                }
            }
        }
    }
    &__more { 
        margin-top: 16px;
        @include mid { 
            margin-top: 1.667vw;
        }
        & > p { 
            font-weight: 700;
            font-size: 16px;
            line-height: 20px;
            color: #030303;
            position: relative;

            @include mid { 
                font-size: 1.250vw;
                line-height: 1.528vw;
            }
            &::before { 
                position: absolute;
                display: block;
                content: "";
                left: -8px;
                bottom: 50%;
                transform: translateY(50%);
                height: 70%;
                width: 3px;
                background-color: #13AD68;
                border-radius: 3px;

                @include mid { 
                    width: 0.208vw;
                    border-radius: 0.208vw;
                    left: -0.556vw;
                }
            }
        }
        &-news { 
            margin-top: 40px;
            overflow: hidden;
            transition: height 1s;
            max-height: 1100px;
            @include mid { 
                margin-top: 2.222vw;
                max-height: 63.861vw;
            }
        }
    }
}
</style>