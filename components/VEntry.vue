<template lang="pug">
.entry(@click="toggleSocial" :class="{'stop-anim': stopAnim}")
    img(:src="currentIcon" alt="Зображення зв'язку" width="100%" height="100%" 
    :class="{'carousel-image-transition': true,   }"
    @click="stopCarousel"
    ).entry__button.pointer 
    ul.entry__socials(:class="{'show-buttons': showSocials}")  
        li(v-for="(icon, idx) in icons" :key="idx")
            div(v-if="icon.isModal" @click="toggleModal")
                img(:src="icon.image" :alt="icon.alter" width="100%" height="100%").entry__socials-tel.pointer 
            a(:href="icon.link", v-else target="_blank" :title="icon.alter").entry__socials-link
                img(:src="icon.image" :alt="icon.alter" width="100%" height="100%").entry__socials-tel.pointer 
</template>
    
<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters({
            showSocials: 'modal/getSocials'
        }),
        currentIcon() { 
            return this.images[this.currentImageIndex];
        }
    },
    data() {
        return {
            intervalId: null,
            currentImageIndex: 0,
            stopAnim: false,
            images: [
                "/images/icons/bus.svg","/images/icons/facebook-color.svg","/images/icons/inst-color.svg","/images/icons/telegram-color.svg","/images/icons/viber-color.svg"
            ],
            icons: [
                {
                    link: "https://www.facebook.com/europe.bus.com.ua",
                    alter: "Facebook",
                    image: "/images/icons/facebook-color.svg"
                },
                {
                    link: "https://instagram.com/europe.bus?igshid=YmMyMTA2M2Y=",
                    alter: "Instagram",
                    image: "/images/icons/inst-color.svg"
                },
                {
                    link: "https://t.me/europabus",
                    alter: "Telegram",
                    image: "/images/icons/telegram-color.svg"
                },
                {
                    link: "tel:+380961017110",
                    alter: "Viber",
                    image: "/images/icons/viber-color.svg"
                },
                {
                    link: "https://wa.me/380961017110",
                    alter: "WhatsApp",
                    image: "/images/icons/whatsapp-color.svg"
                },
                {
                    isModal: true,
                    link: "#",
                    alter: "Call",
                    image: "/images/icons/call.svg"
                },
            ]
        }
    },
    methods: {
        toggleSocial() {
            this.$store.dispatch("modal/toggleSocials");
        },

        toggleModal() {
                // this.$store.commit("burger/fixHeader");
                this.$store.commit("burger/unFixHeader");

                this.$store.dispatch("modal/toggle")
                document.querySelector("body").style = "overflow-y: hidden";
                this.scrollPosition=window.scrollY;
                document.body.style.cssText=`
                    overflow:hidden;
                    position:fixed;
                    top:-${this.scrollPosition}px;
                    left:0'
                    height:100%;
                    width:100%;
                `;
                document.documentElement.style.scrollBehavior="unset";
        },
        changeImage() {
            this.currentImageIndex++;
            if (this.currentImageIndex >= this.images.length) {
                this.currentImageIndex = 0;
            }
        },
        stopCarousel() {
            if(this.showSocials == false ) { 
                clearInterval(this.intervalId);
                this.currentImageIndex = 0;
                this.stopAnim = true
            }else { 
                this.intervalId = setInterval(this.changeImage, 3000);
                this.stopAnim = false
            }
            
        },
    },
    mounted() {
        this.intervalId = setInterval(this.changeImage, 3000);
    },
}
</script>
    
<style lang="scss" scoped>
.entry {
    position: fixed;
    // padding: 14px;
    z-index: 2;
    // animation: pulse 1.5s infinite;
    // box-shadow: 0 0 0 0 rgba(216, 13, 50, 0.48);
    right: 17px;
    bottom: 30px;

    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;

    animation-name: my-animation;
    animation-duration: 1s;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    img {
        
        width: 52px;
        height: 58px;

        @include mid { 
            height: 5.125vw;
            width: 4.847vw;
        }
    }

    @include mid {
        // padding: 1.572vw;
        right: 2.656vw;
        bottom: 2.672vw;
    }

    &__button {
        height: 59px;
        width: 55px;
        position: relative;
        z-index: 2;
        @include mid {
            height: 12.125vw;
            width: 11.847vw;
        }
    }
    &__socials {
        position: absolute;
        left: 50%;
        bottom: 60%;
        transform: translateX(-50%);
        height: 0px;
        transition: all .8s;
        overflow: hidden;
        z-index: 1;

        @media screen and (orientation: landscape) {
            display: flex;
            gap: 8px;
            width: 0;
            bottom: 0px;
            opacity: 0;
            transition: all .5s;
        }

        @include mid {
            display: flex;
            flex-direction: column;
            width: fit-content;
            bottom: 20px;
        }

        &-tel { 
            width: 12px;
            height: 18px;
            margin-bottom: 8px;
            @include mid {
                bottom: 90%;
                height: 4.961vw !important;
                width: 3.431vw !important;
                margin-bottom: 0.181vw;
            }
        }
    }
}
.carousel-image-transition {
  transition: opacity 0.5s;
}
.show-buttons { 
    height: 420px;
    transition: all .8s;
    @media screen and (orientation: landscape) {
        width: 800px;
        height: 58px;
        opacity: 1;
        transition: all .8s;
    }
    @include mid { 
        height: 38.417vw;
        width: fit-content;
    }
}
.stop-anim {
    animation-name: none !important;
}
@keyframes rotate {
  0%{
    
    transform: rotate(0deg)
  }
  50%{
    transform: rotate(-15deg)
  }
  100%{
    transform: rotate(0deg)

  }
}

@keyframes my-animation {
  0% {
    /* начальное состояние */
    transform: rotate(0deg)
  }
  21% {
    /* анимация в течение 1 секунды */
    transform: rotate(-5deg)
  }
  22% {
    /* начало перезарядки в течение 3 секунд */
    transform: rotate(20deg)
  }
  23% {
    /* начало перезарядки в течение 3 секунд */
    transform: rotate(0deg)
  }
  100% {
    /* окончание перезарядки в течение 3 секунд */
    transform: rotate(0deg)
  }
}

</style>