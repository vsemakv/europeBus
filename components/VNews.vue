<template lang="pug">
.news
    ul.news__list   
        li(v-for="(item, idx) in news" data-aos="fade-left" :data-aos-delay="idx * 100").news__list-item
            NLink(:to="`/${$i18n.locale}/articles/${item.code}`").news__list-item
                img(v-if="!$device.isDesktop" :data-src="item.image", :alt="$t(item.alter)" width="100%" height="100%" v-lazy-load)
                img(v-if="$device.isDesktop" :data-src="item.imageDesktop", :alt="$t(item.alter)" width="100%" height="100%" v-lazy-load)
                .news__list-item-text 
                    p {{ $t(item.title) }}
                    p {{ $t(item.date) }}
                    p {{ $t(item.mainText) }}
                    p {{ $t('news.readMore') }}
</template>

<script>
export default {
    props: {
        news: {
            type: Array,
            default: null
        },
    },

}
</script>

<style lang="scss" scoped>
.news {
    &__list {
        &-item {
            margin-bottom: 24px;
            background-color: #E8E8E8;
            border-radius: 10px;
            
            @include mid { 
                display: flex;
                margin-bottom: 1.667vw;
                border-radius: 0.694vw;
            }

            & > img { 
                object-fit: cover;
                max-height: 150px;

                @include mid { 
                    max-height: 22.833vw;
                    width: 50%;
                    height: 18.083vw;
                }
            }
            &-text {
                padding: 16px 16px 24px 16px;

                @include mid { 
                    padding: 1.667vw 2.917vw 2.222vw 1.667vw;
                }
                a { 
                    margin-top: 16px;
                    font-weight: 500;
                    font-size: 13px;
                    line-height: 16px;
                    text-decoration-line: underline;
                    color: #13AD68;
                    position: relative;
                    width: fit-content;
                    transition: all .3s;
                    

                    &:hover { 
                        opacity: .7;
                        transition: all .3s;
                    }
                    @include mid { 
                        font-size: 1.042vw;
                        line-height: 1.250vw;
                        margin-top: 1.111vw;
                    }
                    
                }
                &>p {
                    color: #030303;

                    &:first-child {
                        font-weight: 700;
                        font-size: 14px;
                        line-height: 17px;
                        margin-bottom: 8px;

                        @include mid { 
                            font-size: 1.181vw;
                            line-height: 1.458vw;
                        }
                    }

                    &:nth-child(2) {
                        font-weight: 500;
                        font-size: 12px;
                        line-height: 15px;
                        color: #515151;
                        margin-bottom: 16px;

                        @include mid { 
                            font-size: 1.042vw;
                            line-height: 1.250vw;
                        }
                    }

                    &:nth-child(3) {
                        font-weight: 500;
                        font-size: 13px;
                        line-height: 16px;
                        margin-bottom: 16px;

                        @include mid { 
                            font-size: 1.042vw;
                            line-height: 1.250vw;
                        }
                    }

                    &:last-child {
                        font-weight: 500;
                        font-size: 13px;
                        line-height: 16px;
                        text-decoration-line: underline;
                        color: #13AD68;
                        position: relative;
                        width: fit-content;
                        transition: all .3s;
                        
                        &::after {
                            position: absolute;
                            display: block;
                            content: "";
                            background-image: url("/images/news/arrow.svg");
                            background-repeat: no-repeat;
                            background-size: cover;
                            width: 14px;
                            height: 7px;
                            right: -24px;
                            top: 50%;
                            transform: translateY(-50%);
                            @include mid { 
                                width: 0.972vw;
                                height: 0.486vw;
                                right: -1.667vw;
                            }
                        }
                    }
                }
            }
        }
    }
}</style>