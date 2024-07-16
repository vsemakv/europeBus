<template lang="pug">
.field(:class="fieldClass")
    p(:class="{ 'before-pass': passIcons, 'before-vid-do': fromToIcons, 'before-date': dateIcons, 'for-modal': isModalContact}").field__title {{ title }}
        span.field__title-required(:class="{'show': notRequired}") {{ $t('form.notRequired') }}
    input(
        v-if="isPhoneField"
        :type="type" 
        ref="input"
        v-bind="$attrs"
        v-mask="'+38(0##) ###-####'"
        :placeholder="placeholder" 
        :class="{'modal-input': isModal, 'placeholder-modal': isModalContact}" 
        @input="$emit('input', $event.target.value, $event)"
        @keyup="$emit('keyup', $event)"
        @blur="$emit('blur', $event.target)"
        @focus="$emit('focus', $event.target)"
        
        autocomplete="off"
    ).field__placeholder-input.pointer
    input(
        v-else
        ref="input"
        v-bind="$attrs"
        :type="type" 
        :placeholder="placeholder" 
        :class="{'outline-input': styledInput, 'modal-input': isModal, 'placeholder-modal': isModalContact, 'from-field': isFrom, 'to-field': isTo, 'number-field': isNumbers}" 
        @input="$emit('input', $event.target.value, $event)"
        @keyup="$emit('keyup', $event)"
        @blur="$emit('blur', $event.target)"
        @focus="$emit('focus', $event.target)"
        @change="$emit('change', $event.target)"
        autocomplete="off"
        :value="valueField"
    ).field__placeholder-input.pointer
</template>

<script>
export default {
    props: {
        styledInput: { 
            type: Boolean,
            default: false,
        },
        fieldModel: { 
            type: String,
            default: null
        },
        isNumbers: { 
            type: Boolean,
            default: false,
        },
        passIcons: {
            type: Boolean,
            default: false,
        },
        isTo: {
            type: Boolean,
            default: false,
        },
        isFrom: {
            type: Boolean,
            default: false,
        },
        valueField: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        },

        value: {
            type: String,
            default: null
        },
        fromToIcons: {
            type: Boolean,
            default: false
        },
        dateIcons: {
            type: Boolean,
            default: false,
        },
        isModal: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: null
        },
        notRequired: {
            type: Boolean,
            default: false
        },
        isModalContact: {
            type: Boolean,
            default: false
        },
        isPhoneField: {
            type: Boolean,
            default: false
        },
        isError: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        isValid: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        fieldClass() {
            return {
                'is-error': this.isError,
                'is-valid': this.isValid,
                'is-disabled': this.disabled
            };
        },

    },
    data() {
        return {
            inputValue: '           '
        }
    },
}
</script>

<style lang="scss" scoped>
.field {
    &__title {
        padding-left: 16px;
        position: relative;
        margin-bottom: 8px;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: #030303;
        text-align: start;

        @include mid {
            font-size: 0.972vw;
            line-height: 1.181vw;
            margin-bottom: 0.556vw;
            padding-left: 1.597vw;
        }

        &-required {
            display: none;
            margin-left: 6px;
            font-size: 10px;
            line-height: 13px;
        }
    }

    &>input {
        padding: 12px 24px 12px 16px;
        background-color: #F5F5F5;
        border: none;
        font-weight: 500;
        font-size: 11px;
        line-height: 13px;
        color: #7D7D7D;
        outline: none;

        width: 100%;
        border: 1px solid #C1C1C1;
        border-radius: 5px;
        margin-bottom: 8px;
        position: relative;

        z-index: 1;
        transition: all .3s;

        &::after { 
                position: absolute;
                top: 50%;
                right: 24px;
                transform: translate(0, -50%) rotate(270deg);
                background-image: url("/images/icons/triange.svg");
                background-repeat: no-repeat;
                background-size: contain;
                width: 7px;
                height: 6px;
                
                @include mid { 
                    right: 1.667vw;
                    width: 0.486vw;
                    height: 0.417vw;
                }
            }
        &:focus { 
            border-color: #13AD68 !important;
        }
        &:hover { 
            transition: all .3s;
            border-color: #13AD68 !important;
        }   
        @include mid {
            padding: 0.833vw 1.667vw 0.833vw 1.111vw;
            width: 100%;
            border-radius: 0.347vw;
            border: 0.069vw solid #C1C1C1;
            border-radius: 0.347vw;
            margin: 0;
            font-size: 0.903vw;
            line-height: 1.111vw;
        }
    }

    &__placeholder { 

        &-input { 
            position: relative;

            &::after { 
                position: absolute;
                top: 50%;
                right: 24px;
                transform: translate(0, -50%) rotate(270deg);
                background-image: url("/images/icons/triange.svg");
                background-repeat: no-repeat;
                background-size: contain;
                width: 7px;
                height: 6px;
                
                @include mid { 
                    right: 1.667vw;
                    width: 0.486vw;
                    height: 0.417vw;
                }
            }
        }
    }
}

.before-vid-do {
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

.before-date {
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
}
.before-pass { 
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
.modal-input {
    padding: 16px 32px 16px 16px !important;
    font-weight: 500 !important;
    font-size: 15px !important;
    line-height: 18px !important;
}

.for-modal {
    padding-left: 0;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #030303;

    @include mid {
        font-size: 0.903vw;
        line-height: 1.111vw;
    }
}

.placeholder-modal {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;

    @include mid {
        font-size: 0.903vw;
        line-height: 1.111vw;
    }
}

.show {
    display: inline-block;

    @include mid {
        font-size: 0.486vw;
        line-height: 0.486vw;
        display: none;
    }
}

.focusedInput {
    border: 1px solid #FFFFFF;
}

.focusedText {
    color: #FFFFFF;
}

.is-error {
    transition: all 0.3s;

    .field__placeholder-input {
        border: 1px solid red;

    }
}

.is-valid {
    transition: all 0.3s;

    .field__placeholder-input {
        border: 1px solid green;

        @include mid {
            border: 0.069vw solid green;
        }

    }

}
.outline-input { 
    outline: solid #13AD68 1px !important;
    // border: 1px solid #13AD68 !important;
}
</style>