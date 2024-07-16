import Vue from 'vue'
import { Swiper as SwiperClass, Pagination, Navigation, Autoplay, Scrollbar } from 'swiper/js/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import 'swiper/css/swiper.min.css'


SwiperClass.use([Pagination, Navigation, Autoplay, Scrollbar])

Vue.use(getAwesomeSwiper(SwiperClass))
