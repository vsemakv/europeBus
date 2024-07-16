<template lang="pug">
.modal(:class="{'show-modal': isOpenModal}")
    //- .modal__header.d-flex-c 
    //-     //- p test
    //-     p.modal__header-title {{ modal.title }}
    //-     img(src="/images/icons/close.svg", alt="Закрити" width="100%" height="100%" @click="closeModal").modal__header-button
    //- .container
    //-     .modal__input 
    //-         VField(:placeholder="modal.placeholder" isModal=true type="text" focus=true)
    //- .modal__places 
    //-     .container 
    //-         p.modal__places-title {{ modal.places }}
    //- .container
    //-     ul.modal__list
    //-         li(v-for="(item,idx) in modal.citiesList" @click="chooseCountry(item)").modal__list-item    
    //-             p {{ item.city }}
    //-             p {{ item.country }} 
            
</template>

<script>
import { mapGetters } from "vuex";
    export default {
        props: {
            objectModal: {
                type: Object,
                default: null
            },
        },
        data() {
            return {
                currentModal: {}
            }
        },
        mounted () {
            this.currentModal = this.objectModal;
        },

      
        computed: {
            ...mapGetters({
                isOpenModal: "formModal/getModal",
                modal: "formModal/getFromInfo",
                modalState: "formModal/getState",
                // test: "trip/get"
            }),
        },


        watch: {
            test() {
            }

        },

    

     
        methods: {
            chooseCountry(country) {
                this.$store.dispatch("formModal/close");
                document.querySelector("body").style = "overflow-y: unset";
                switch (this.modalState) {
                    case "from":
                        this.$store.commit("trip/setFrom", country)
                        break;
                    case "to":
                        this.$store.commit("trip/setTo", country)
                        break;
                    default:
                        break;
                }
            },

            closeModal() {
                this.$store.dispatch("formModal/close");
                document.querySelector("body").style = "overflow-y: inherit";
            }
        },
    }
</script>

<style lang="scss" scoped>
.modal { 
    position: absolute;
    top: 0%;
    left: -100%;
    z-index: 4;
    height: 100vh;
    width: 100%;
    background: #F5F5F5;
    transition: all 0.4s;

    &__header{
        width: 100%;
        min-height: 70px;
        background: #E8E8E8;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.12);
        position: relative;

        &-title { 
            font-weight: 600;
            font-size: 18px;
            line-height: 22px;
        }
        &-button { 
            position: absolute;
            top: 50%;
            right: 32px;
            transform: translate(0, -50%);
            width: 12px;
            height: 12px;
        }
    }
    &__input { 
        margin: 20px 0;
    }
    &__places { 
        background: #E8E8E8;
        border-bottom: 1px solid #CBCBCB;
        padding: 10px 0;
    }
    &__list { 
        margin-top: 24px;

        &-item { 
            margin-bottom: 24px;

            & > p { 
                font-weight: 500;
                font-size: 15px;
                line-height: 18px;
                color: #030303;

                &:last-child { 
                    font-size: 14px;
                    line-height: 17px;
                }
            }
        }
    }
}
.show-modal { 
    position: fixed;
    transition: all 0.4s;
    top: 0%;
    left: 0%;
}
</style>