<template lang="pug">
.modal(:class="{'show-modal': isShowModal}")
    .modal__bg(@click="closeModal")
    .container.d-flex-c
        Notification(
                    type='error'
                    :fixed="true"
                    :messages='errorMessages'
                )
        .modal__content(:class="{'close-padding': isSended}")
            .modal__contact
                img(src="/images/icons/close.svg", :alt="$t('altClose')" width="100%" height="100%" @click="closeModal").modal__close.pointer
                .modal__title(v-if="!isSended")
                    VTitle(:title="$t('modal.title')" isModal=true)
                form.modal__form(@submit.prevent="handleSubmit" v-if="!isSended")
                    .modal__form-input
                        VField(v-bind="formData.name" v-model="$v.form.name.$model" @input="onFieldInput" @focus="onFieldFocus" @blur="onFieldBlur" :isError="$v.form.name.$icon_error" :isValid="$v.form.name.$icon_valid" :valueField="$v.form.name.$model" isModalContact oninput="this.value = this.value.replace(/[0-9.]/g, '');")
                    .modal__form-input
                        VField(v-bind="formData.phone" v-model="$v.form.phone.$model" @input="onFieldInput"  @focus="onFieldFocus" @blur="onFieldBlur" :isError="$v.form.phone.$icon_error" :isValid="$v.form.phone.$icon_valid" isModalContact isPhoneField)
                    .modal__form-button()
                        VButton(:title="$t('modal.button')" isModal=true)
                .modal__thanks.d-flex-c(v-else)
                    img(src="/images/icons/thanks.svg", :alt="$t('altDecorBus')" width="100%" height="100%").modal__thanks-image
                    .modal__thanks-text
                        p.modal__thanks-text-title {{ $t('modal.thanks.title') }}
                        p.modal__thanks-text-info {{ $t('modal.thanks.text') }}
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength} from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
    export default {
        mixins: [validationMixin],
        computed: {
            ...mapGetters({
                isShowModal: "modal/getModal",
                isSended: "thanks/getSend",
                cityFrom: "trip/getFrom",
                cityTo: "trip/getTo"
            }),
        },
        methods: {
            closeModal() {
                this.$store.dispatch("modal/close")
                document.querySelector("body").style = "overflow-y: unset";
                document.body.style.cssText=``;
                window.scroll({top: this.scrollPosition})
                document.documentElement.style.scrollBehavior="";
            },
            setErrorMessages() {
                const errorsMsgs = this.errors;
                const {form} = this.$v;
                const errorFields = Object.keys(form.$params).filter(key => (form[key].$error && form[key].$dirty));
                if(form.submit)
                    errorFields.push('submit');
                if(errorFields.length) {
                    const name = errorFields[0];
                    const errs = errorsMsgs[name];
                    const messages = [];
                    Object.keys(errs).forEach(key => {
                    if(form[name][key] == false)
                        messages.push(errs[key] ? errs[key] : errs.general);
                    });
                    this.setFieldIcon({name});
                    this.errorMessages = messages.length ? [messages[0]] : [errorsMsgs.general];
                } else {
                    this.errorMessages = [];
                    Object.keys(form.$params).forEach(name => {
                        this.setFieldIcon({name});
                    });
                }
            },

            setFieldIcon(field) {
                const f = this.$v.form[field.name];
                if(f && f.$error == true) {
                    f.$icon_error = true;
                    f.$icon_valid = false;
                } else if(f) {
                    f.$icon_error = false;
                    if(f.$dirty) f.$icon_valid = true;
                    else delete f.$icon_valid;
                }
            },

            clearFieldIcon(field) {
                this.setFieldIcon(field);  
                const f = this.$v.form[field.name];
                if(f && f.$icon_error) {
                    delete f.$icon_error;
                }
            },

            onFieldFocus(field) {
                delete this.$v.form.submit;
            },

            onFieldBlur(field) {
                this.setErrorMessages();
                if(field)
                    this.setFieldIcon(field);
            },

            onFieldInput(field, target) {
                if(target)
                    this.clearFieldIcon(target.target);

                this.$set(this, 'errorMessages', []);
            },

            resetV() {
                const {form} = this.$v;
                this.$v.form.$reset();
                delete form.submit;
            },

            handleSubmit() {
                this.resetV()
                this.$v.form.$touch();

                if (this.$v.form.$invalid) {
                    this.setErrorMessages();
                    return false;
                } else {
                    this.$store.dispatch("thanks/sendForm"); 
                    // console.log("FORM", this.form);
                    // this.$axios.post(
                    //     `https://api.telegram.org/bot/sendMessage?chat_id=-828369473&text= |==================%0A| ❗️ Нова заявка%0A|==================%0A| 🙎‍♂️ Ім'я: ${this.form.name}%0A| 📞 Телефон: ${this.form.phone}%0A|==================`
                    // );
                    // this.showRes=!this.showRes
                    // this.toggleModal()

                }
    
            }
        },
        data() {
            return {
                name: '',
                form:{
                    name:'',
                    phone:'',
                },
                formData:{
                    name: {
                        name: "name",
                        title: `${this.$t('modalCalc.urName')}`,
                        placeholder: `${this.$t('modalCalc.urNamePlaceholder')}`,
                        type: "text",
                    },
                    phone: {
                        name: "phone",
                        title: `${this.$t('modalCalc.urPhone')}`,
                        placeholder: `${this.$t('modalCalc.urPhonePlacholder')}`,
                        type: "text",
                    },
                },
                errors: {
                    general: 'ERROR',
                    submit: {
                        user_exists: 'signup.messages.user_exists',
                        general: 'errors.server',
                    },

                    name: {
                        required: 'error.name.required',
                        minLength: 'error.name.minLength',
                    },

                    phone: {
                        required: 'error.phone.required',
                        phone: "Invalid phone",
                        minLength: 'error.phone.minLength'
                    },
                },
                errorMessages: []
            }
        },
        validations(){
            return {
                form: {
                    name: {
                        required,
                        minLength: minLength(2),
                    },

                    phone: {
                        required,
                        minLength: minLength(17),
                    },
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.modal { 
    position: fixed;
    top: 0%;
    left: 0%;
    z-index: 10 !important;
    width: 100%;
    opacity: 0;
    transform: translateY(-100%);

    &__bg { 
        position: fixed;
        top: 0%;
        left: 0%;
        height: 100vh;
        height: 100dvh;
        width: 100%;
        background: rgba(5, 5, 5, 0.6);
    }
    &__close { 
        position: absolute;
        width: 12px;
        height: 12px;
        top: 16px;
        right: 16px;
        z-index: 2;

        @include mid { 
            width: 0.833vw;
            height: 0.833vw;
            top: 1.667vw;
            right: 2.222vw;
        }
    }
    &__content { 
        padding: 32px 24px 48px 24px;
        background: #f5f5f5;
        border-radius: 10px;
        position: relative;

        @include mid { 
            padding: 0 2.778vw 3.333vw 2.778vw;
            border-radius: 0.694vw;
        }
        &::before {
            position: absolute;
            display: block;
            content: "";
            background: url("/images/icons/modal-corner.svg");
            background-repeat: no-repeat;
            background-size: contain;
            bottom: calc(0% - 2px);
            left: calc(0% - 2px);
            width: 146px;
            height: 106px;
            transition: all .5s;
            // opacity: 0;
            z-index: 1;
            @include mid { 
                // opacity: 1;
                width: 10.139vw;
                height: 6.750vw;
                bottom: calc(0% - 0.139vw);
                left: calc(0% - 0.139vw);
            }
        }
        &::after {
            position: absolute;
            display: block;
            content: "";
            background: url("/images/icons/modal-corner.svg");
            background-repeat: no-repeat;
            background-size: contain;
            top: calc(0% - 2px);
            right: calc(0% - 2px);
            width: 146px;
            height: 106px;
            transform: rotate(180deg);
            transition: all .5s;
            // opacity: 0;
            z-index: 1;
            @include mid { 
                // opacity: 1;
                width: 10.139vw;
                height: 6.750vw;
                top: calc(0% - 0.139vw);
                right: calc(0% - 0.139vw);
            }
        }
    }
    &__title { 
        @include mid { 
            padding-right: 6.111vw;
        }
    }
    &__form { 
        margin-top: 24px;

        @include mid { 
            margin-top: 1.667vw;
        }
        &-input { 
            margin-bottom: 16px;
            @media screen and (orientation: landscape) {
                margin: 0;
            }
            @include mid { 
                margin-bottom: 1.111vw;
                // @media screen and (orientation: landscape) {
                //     margin: 0;
                // }
            }
        }
        &-button { 
            margin-top: 32px;
            @media screen and (orientation: landscape) {
                margin: 0;
            }
            @include mid { 
                margin-top: 2.222vw;
                @media screen and (orientation: landscape) {
                    margin: 0;
                }
            }
        }
    }
    &__thanks { 
        flex-direction: column;
        transition: all 1s;
        &-text { 
            margin-top: 40px;
            padding: 0 33px;

            @include mid { 
                margin-top: 2.778vw;
                padding: 0 2.778vw;
            }
            &-title { 
                position: relative;
                background: linear-gradient(92.53deg, #13AD68 3.83%, #54D59B 99.14%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-weight: 700;
                font-size: 25px;
                line-height: 30px;
                text-align: center;
                padding-bottom: 8px;

                @include mid { 
                    padding-bottom: 1.111vw;
                    font-size: 2.431vw;
                    line-height: 2.986vw;
                }
                &::after { 
                    position: absolute;
                    display: block;
                    content: "";
                    left: 50%;
                    bottom: 0%;
                    transform: translateX(-50%);
                    height: 3px;
                    width: 30%;
                    background-color: #13AD68;
                    border-radius: 3px;

                    @include mid { 
                        border-radius: 0.208vw;
                        height: 0.208vw;
                    }
                }
            }
            &-info  { 
                margin-top: 32px;
                font-weight: 500;
                font-size: 16px;
                line-height: 20px;
                text-align: center;
                color: #030303;

                @include mid { 
                    font-size: 1.250vw;
                    line-height: 1.528vw;
                    width: 18.750vw;
                    margin: 2.222vw auto 0;
                }
            }
        }
        
    }
}
.container { 
    height: 100dvh;
    height: 100vh;
    width: 100%;
    
    @include mid { 
        padding: 0;
    }
}
.show-modal { 
    opacity: 1;
    transform: translateY(0%);
    transition: opacity .5s;
}
.close-padding { 
    @include mid { 
        padding: 5.278vw 0 8.750vw 0;
    }
}
</style>