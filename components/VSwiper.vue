<template lang="pug">
.swiper 
    .slider__swiper.reviews__slider(v-swiper:Album="swiperOptions" ref="feedback" )
        .swiper-wrapper.reviews__wrapper
            .swiper-slide.reviews__slide(v-for="(slide, idx) in reviews" :key="idx")
                .reviews__reviewer.d-flex-s
                    img(:src="slide.images", :alt="$t(slide.alter)" width="100%" height="100%")
                    .reviews__reviewer-name
                        p {{ slide.name }}
                        p {{ slide.date }}
                p.reviews__text {{ slide.text }}
        .swiper-pagination.reviews__pagiantion
        .reviews__buttons 
            .swiper-button-prev.reviews__prev
            .swiper-button-next.reviews__next
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            reviews: [
                {
                    id: 0,
                    images: "/images/slider/dima.png",
                    // imagesDesktop:"/images/review1__desktop.png",
                    alter: 'slider.altPhoto',
                    date: '01.08.2022',
                    name: 'Дмитро',
                    text: 'Велике дякую!!! Рекомендую. Дуже сподобались водії Андрій та Сергій, професіонали своєї справи, добрі та позитивні люди. Бажаю вам терпіння, здоров’я та адекватних пасажирів!'
                },
                {
                    id: 1,
                    images: "/images/slider/katerina.png",
                    // imagesDesktop:"/images/review2__desktop.png",
                    alter: 'slider.altPhoto',
                    date: '03.09.2022',
                    name: 'Катерина',
                    text: 'Я їхала без пересадок! Дуже відповідальні хлопці, рекомендую, і доставка, і посилки. Їхатиму тільки з ними, якщо мені знадобиться..'
                },
                {
                    id: 0,
                    images: "/images/slider/vika.png",
                    // imagesDesktop:"/images/review1__desktop.png",
                    alter: 'slider.altPhoto',
                    date: '12.02.2023',
                    name: 'Вікторія',
                    text: 'Користувалися послугами цієї фірми - враженнячудові!! Переїзд з Харкова до Польші пройшов ідеально. Організація на вищому рівні, людськеставлення, уважність!'
                },
                {
                    id: 0,
                    images: "/images/slider/masha.png",
                    // imagesDesktop:"/images/review1__desktop.png",
                    alter: 'slider.altPhoto',
                    date: '25.12.2022',
                    name: 'Марія',
                    text: 'Доброго ранку! Хочу подякувати Євробусу за оперативну роботу. Хлопці молодці, уважні, ввічливі. Велике спасибі! Рекомендуватиму вас своїм друзям'
                },
                {
                    id: 0,
                    images: "/images/slider/sveta.png",
                    // imagesDesktop:"/images/review1__desktop.png",
                    alter: 'slider.altPhoto',
                    date: '27.01.2023',
                    name: 'Світлана',
                    text: 'Вітаю усіх. Сьогодні добрались до Німеччини, було зручно та комфортно, дякую перевізникам. Водії чемні, бус зручний. Думаю, що наступний раз знову виберу вашу компанію.'
                },
                {
                    id: 0,
                    images: "/images/slider/nastya.png",
                    // imagesDesktop:"/images/review1__desktop.png",
                    alter: 'slider.altPhoto',
                    date: '21.08.2022',
                    name: 'Анастасія',
                    text: 'Дуже вдячна водієві Василю за те, що дуже чуйний, ввічливий та доброзичливий чоловік. Довіз мої посилочки в цілості та безпеці. Я дуже задоволена, тато теж, а мати на 7 небі)) Велике дякую за вашу працю!!'
                },
            ],
            swiperOptions: {
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination'
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                slidesPerView: 1,
                grabCursor: true,
                loop: true,
                breakpoints: {

                    375: {
                        slidesPerView: 1,
                    },

                    900: {
                        slidesPerView: 3,
                        pagination: false,
                        // slidesPerGroup: 2,
                    },
                },
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.reviews {
    &__slider {
        height: 300px;

        @include mid { 
            height: 24.792vw;
            overflow: visible;
        }
    }
    &__wrapper {
        display: flex;
    }
    &__reviewer {
        & > img { 
            width: 71px;
            height: 71px;
            @include mid { 
                width: 6.181vw;
                height: 6.181vw;
            }
        }
        &-name {
            margin-left: 16px;

            @include mid { 
                margin-left: 2.222vw;
            }
            & > p {
                &:first-child {
                    font-weight: 500;
                    font-size: 19px;
                    line-height: 23px;
                    color: #030303;
                    margin-bottom: 8px;

                    @include mid { 
                        font-size: 1.736vw;
                        line-height: 2.083vw;
                    }
                }

                &:last-child {
                    font-weight: 500;
                    font-size: 15px;
                    line-height: 18px;
                    color: #B5B5B5;

                    @include mid {
                        font-size: 1.250vw;
                        line-height: 1.528vw;
                    }
                }
            }
        }
    }
    &__buttons { 
        position: absolute;
        top: -4vw;
        right: 13.889vw;
        display: flex;
        justify-content: center;
        flex-direction: row-reverse;
    }
    &__text {
        margin-top: 16px;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #030303;

        @include mid { 
            margin-top: 1.667vw;
            font-size: 1.111vw;
            line-height: 1.389vw;
        }
    }
    &__slide {
        position: relative;
        background: linear-gradient(104.23deg, #F0F0F0 4.77%, #E0E0E0 97.77%);
        border-radius: 10px;
        padding: 24px;

        height: fit-content;
        min-height: 242px;

        @include mid { 
            margin-right: 4.375vw;
            padding: 1.667vw 2.222vw;
            border-radius: 0.694vw;
            min-height: 18.125vw;
        }

        &::before {
            position: absolute;
            display: block;
            content: "";
            background: url("/images/slider/corner.svg");
            background-repeat: no-repeat;
            background-size: contain;
            top: 0%;
            left: 0%;
            width: 94px;
            height: 73px;
            transform: rotate(180deg);
            transition: all .5s;
            opacity: 0;

            @include mid { 
                opacity: 1;
                width: 7.847vw;
                height: 6.133vw;
            }
        }

        &::after {
            position: absolute;
            display: block;
            content: "";
            background: url("/images/slider/corner.svg");
            background-repeat: no-repeat;
            background-size: contain;
            bottom: 0%;
            right: 0%;
            width: 94px;
            height: 73px;
            transition: all .5s;
            opacity: 0;
            @include mid { 
                opacity: 1;
                width: 7.847vw;
                height: 6.133vw;
            }
        }
    }
}

.swiper-slide-active {
    &::before {
        transition-delay: 0.3s;
        transition: all 1s;
        opacity: 1;
    }

    &::after {
        transition-delay: 0.3s;
        transition: all 1s;
        opacity: 1;
    }
}

</style>