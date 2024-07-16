<template lang="pug">
.modal(:class="{'show-modal': isShowModalCalc}")
    .modal__bg(@click="closeModal")
    .container.d-flex-c.mod
        Notification(
            type='error'
            :fixed="true"
            :messages='errorMessages'
        )
        .modal__content()
            img(src="/images/icons/close.svg", :alt="$t('altClose')" width="100%" height="100%" @click="closeModal").modal__close.pointer
            .modal__calc(v-if="!thanks")
                VTitle(:title="$t('modalCalc.title')" isModal=true)
                .modal__content-info()
                    .modal__content-wrapper
                        .modal__content-cities
                            .modal__content-place
                                p {{ $t('form.inputs.from') }}
                                p {{ cityFrom }}
                            .modal__content-place
                                p {{ $t('form.inputs.to') }}
                                p {{ cityTo }}
                        .modal__content-more
                            .modal__content-date(v-if="dateFrom")
                                p {{ $t('form.inputs.dateTo') }}
                                p {{ dateFrom }}
                            .modal__content-date(v-else)
                                p {{ $t('form.inputs.dateTo') }}
                                p {{ formattedDate }}
                            .modal__content-pass()
                                p {{ $t('form.inputs.dateBack') }}
                                p {{ numPass }}
                    .modal__content-price   
                        p {{ $t('modalCalc.price') }}: 
                            span {{ currentPrice }} &#8364; 
                form.modal__form(@submit.prevent="handleSubmit")
                    .modal__form-input
                        VField(v-bind="formData.name" v-model="$v.form.name.$model" @input="onFieldInput" @focus="onFieldFocus" @blur="onFieldBlur" :isError="$v.form.name.$icon_error" :isValid="$v.form.name.$icon_valid" :valueField="$v.form.name.$model" isModalContact oninput="this.value = this.value.replace(/[0-9.]/g, '');")
                    .modal__form-input
                        VField(v-bind="formData.phone" v-model="$v.form.phone.$model" @input="onFieldInput"  @focus="onFieldFocus" @blur="onFieldBlur" :isError="$v.form.phone.$icon_error" :isValid="$v.form.phone.$icon_valid" isModalContact isPhoneField)
                    .modal__form-button()
                        VButton(:title="$t('modalCalc.button')" isModal=true)
            .modal__thanks.d-flex-c(v-else)
                .modal__thanks-text
                    p.modal__thanks-text-title {{ $t('modal.thanks.title') }}
                    p.modal__thanks-text-info {{ $t('modal.thanks.text') }}
                
</template>

<script>
import { mapGetters } from "vuex";
import { validationMixin } from 'vuelidate'
import { required, minLength, alpha } from "vuelidate/lib/validators";

export default {
    mixins: [validationMixin],
    computed: {
        ...mapGetters({
            isShowModalCalc: "trip/getModalCalc",
            cityFrom: "trip/getFrom",
            cityTo: "trip/getTo",
            dateFrom: "trip/getDateFrom",
            dateTo: "trip/getDateTo",
            currentPrice: 'trip/getPrice',
            thanks: 'trip/getThanks',
            numPass: "trip/getPass"
        }),
        formattedDate() {
            const today = new Date();
            const day = today.getDate();
            const monthIndex = today.getMonth();
            const year = today.getFullYear();

            const formattedDay = day < 10 ? `0${day}` : day;
            const formattedMonth = monthIndex + 1 < 10 ? `0${monthIndex + 1}` : monthIndex + 1;

            return `${formattedDay}-${formattedMonth}-${year}`;
        }
    },
    data() {
        return {
            id: -1,
            form: {
                name: '',
                phone: '',
            },
            formData: {
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
                    // alpha: "Ім'я повинно складатись з букв"
                },

                phone: {
                    required: 'error.phone.required',
                    phone: "Invalid phone",
                    minLength: 'error.phone.minLength'
                },
            },
            errorMessages: [],
            months: [
                'січня',
                'лютого',
                'березня',
                'квітня',
                'травня',
                'червня',
                'липня',
                'серпня',
                'вересня',
                'жовтня',
                'листопада',
                'грудня'
            ]
        }
    },

    methods: {
        sendRequest(){
            
        },
        closeModal() {
            this.$store.commit("trip/closeCalc");
            document.querySelector("body").style = "overflow-y: unset";
            this.$store.commit("trip/closeThanks");
            this.$store.commit("trip/setDefault");
            document.body.style.cssText=``;
            window.scroll({top: this.scrollPosition})
            document.documentElement.style.scrollBehavior="";
        },
        setErrorMessages() {
            const errorsMsgs = this.errors;
            const { form } = this.$v;
            const errorFields = Object.keys(form.$params).filter(key => (form[key].$error && form[key].$dirty));
            if (form.submit)
                errorFields.push('submit');
            if (errorFields.length) {
                const name = errorFields[0];
                const errs = errorsMsgs[name];
                const messages = [];
                Object.keys(errs).forEach(key => {
                    if (form[name][key] == false)
                        messages.push(errs[key] ? errs[key] : errs.general);
                });
                this.setFieldIcon({ name });
                this.errorMessages = messages.length ? [messages[0]] : [errorsMsgs.general];
            } else {
                this.errorMessages = [];
                Object.keys(form.$params).forEach(name => {
                    this.setFieldIcon({ name });
                });
            }
        },

        setFieldIcon(field) {
            const f = this.$v.form[field.name];
            if (f && f.$error == true) {
                f.$icon_error = true;
                f.$icon_valid = false;
            } else if (f) {
                f.$icon_error = false;
                if (f.$dirty) f.$icon_valid = true;
                else delete f.$icon_valid;
            }
        },

        clearFieldIcon(field) {
            this.setFieldIcon(field);
            const f = this.$v.form[field.name];
            if (f && f.$icon_error) {
                delete f.$icon_error;
            }
        },

        onFieldFocus(field) {
            delete this.$v.form.submit;
        },

        onFieldBlur(field) {
            this.setErrorMessages();
            if (field)
                this.setFieldIcon(field);
        },

        onFieldInput(field, target) {
            if (target)
                this.clearFieldIcon(target.target);

            this.$set(this, 'errorMessages', []);
        },

        resetV() {
            const { form } = this.$v;
            this.$v.form.$reset();
            delete form.submit;
        },

        handleSubmit() {

            this.id++ 

            if(this.dateFrom === null) {
                this.$store.commit("trip/setDateFrom", new Date())
            }
            

            this.resetV()
            this.$v.form.$touch();

            if (this.$v.form.$invalid) {
                this.setErrorMessages();
                return false;
            } else {
                this.$store.commit("trip/openThanks");
                const requesObject = {
                    id: this.id,
                    to: this.cityTo, 
                    from: this.cityFrom,
                    dateFrom: this.dateFrom,
                    numPass: this.numPass
                }
                // console.log(requesObject);
                this.$store.commit("history/addToList", requesObject)
                
                
                console.log("FORM", requesObject);
                // this.$axios.post(
                //     `https://api.telegram.org/bot/sendMessage?chat_id=-828369473&text= |==================%0A| ❗️ Нова заявка%0A|==================%0A| 🙎‍♂️ Ім'я: ${this.form.name}%0A| 📞 Телефон: ${this.form.phone}%0A|==================%0A| 📌 Подорож з ${this.cityFrom} до ${this.cityTo} %0A|==================%0A|📌 Дата подорожі ${this.dateFrom} %0A|==================%0A|📌 Кількість пасажирів ${this.numPass} %0A|==================`
                // );
            }
        }
    },
    validations() {
        return {
            form: {
                name: {
                    required,
                    minLength: minLength(2),
                    // alpha,
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

        @include mid {
            width: 0.833vw;
            height: 0.833vw;
            top: 1.667vw;
            right: 2.222vw;
        }
    }

    &__content {
        position: relative;

        padding: 8px 24px 24px;

        background-color: #f5f5f5;
        background: #F5F5F5;
        box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.09);
        border-radius: 10px;
        width: 100%;

        // height: 100%;
        overflow-y: scroll;

        @include mid {
            padding: 0 2.778vw 2.778vw 2.778vw;
            width: 37.500vw;

            height: auto;
        }
        &-pass { 

            p { 
               &:nth-child(1){
                    padding-left: 18px;
                    position: relative;
                    margin-bottom: 8px;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 17px;

                    @include mid {
                        margin-bottom: 0.556vw;
                        padding-left: 1.550vw;
                        font-size: 0.972vw;
                        line-height: 1.181vw;
                    }

                    &::before {
                        display: block;
                        content: "";
                        background-image: url("/images/icons/pass.svg");
                        background-repeat: no-repeat;
                        background-size: contain;
                        width: 12px;
                        height: 12px;
                        position: absolute;
                        top: 50%;
                        left: 0%;
                        transform: translateY(-50%);

                        @include mid {
                            width: 1.181vw;
                            height: 1.181vw;
                        }
                    }
                } 
                &:nth-child(2){ 
                    margin-bottom: 16px;
                    font-style: italic;
                    font-weight: 600;
                    font-size: 15px;
                    line-height: 18px;

                    @include mid {
                        margin-bottom: 1.111vw;
                        font-size: 0.972vw;
                        line-height: 1.181vw;
                    }
                }
            }
            
        }
        &-date {
            @include mid {
                margin-bottom: 0;
                // margin-right: 80px;
                width: 100%;
            }

            &>p {

                &:nth-child(1),
                &:nth-child(3) {
                    padding-left: 18px;
                    position: relative;
                    margin-bottom: 8px;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 17px;

                    @include mid {
                        margin-bottom: 0.556vw;
                        padding-left: 1.550vw;
                        font-size: 0.972vw;
                        line-height: 1.181vw;
                    }

                    &::before {
                        display: block;
                        content: "";
                        background-image: url("/images/icons/date.svg");
                        background-repeat: no-repeat;
                        background-size: contain;
                        width: 12px;
                        height: 12px;
                        position: absolute;
                        top: 50%;
                        left: 0%;
                        transform: translateY(-50%);

                        @include mid {
                            width: 1.181vw;
                            height: 1.181vw;
                        }
                    }

                    ;
                }

                &:nth-child(2),
                &:nth-child(4) {
                    margin-bottom: 16px;
                    font-style: italic;
                    font-weight: 600;
                    font-size: 15px;
                    line-height: 18px;

                    @include mid {
                        margin-bottom: 1.111vw;
                        font-size: 0.972vw;
                        line-height: 1.181vw;
                    }
                }
            }

        }

        &-price {
            margin-bottom: 16px;
            font-style: italic;
            font-weight: 600;
            font-size: 15px;
            line-height: 18px;
            span { 
                font-weight: 700;
                font-size: 18px;
                line-height: 22px;
                color: #099456;

                @include mid { 
                    font-size: 1.250vw;
                    line-height: 1.528vw;
                }
            }
            @include mid {
                margin-bottom: 1.111vw;
                font-size: 0.972vw;
                line-height: 1.181vw;
            }
        }

        &-place {
            // margin-bottom: 8px;

            
            @include mid {
                margin-bottom: 0;
                // margin-right: 80px;
                width: 100%;
            }

            &>p {

                &:nth-child(1),
                &:nth-child(3) {
                    margin-bottom: 8px;
                    padding-left: 18px;
                    position: relative;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 17px;

                    @include mid {
                        margin-bottom: 0.556vw;
                        padding-left: 1.250vw;
                        font-size: 0.972vw;
                        line-height: 1.181vw;
                    }

                    &::before {
                        display: block;
                        content: "";
                        background-image: url("/images/icons/place.svg");
                        background-repeat: no-repeat;
                        background-size: contain;
                        position: absolute;
                        top: 50%;
                        left: 0%;
                        transform: translateY(-50%);
                        width: 8px;
                        height: 11px;

                        @include mid {
                            width: 0.903vw;
                            height: 1.181vw;
                        }
                    }
                }

                &:nth-child(2),
                &:nth-child(4) {
                    margin-bottom: 16px;
                    font-style: italic;
                    font-weight: 600;
                    font-size: 15px;
                    line-height: 18px;

                    @include mid {
                        margin-bottom: 1.111vw;
                        font-size: 0.972vw;
                        line-height: 1.181vw;
                    }
                }
            }
        }

        &-info {
            margin-top: 16px;
            
            @include mid { 
                margin-top: 1.111vw;
            }
        }
        &-wrapper { 
            @include mid { 
                display: flex;
                width: 100%;
                height: 100%;
            }
        }
        &-cities {
            @include mid { 
                width: 100%;
            }
        }
        &-more { 
            @include mid { 
                width: 100%;
            }
        }
    }

    &__form {

        &-button {
            margin-top: 32px;

            @include mid {
                margin-top: 2.222vw;
            }
        }

        &-input {
            margin-bottom: 8px;

            @include mid {
                margin-bottom: 0.556vw;
            }
        }
    }
    &__thanks { 
        flex-direction: column;
        height: 100%;


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


.mod {
    padding-block: 20px;

    // @include mid {
    // }
}
.show-modal {
    opacity: 1;
    transform: translateY(0%);
    transition: opacity .3s;
}</style>