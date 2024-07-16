<template lang="pug">
.date
    p.date__title {{ title }}
        span.date__title-required(:class="{'show': notRequired}") {{ $t('form.notRequired') }}
    .data__input()
        date-picker(
            ref="myInputElement"
            readonly
            v-model="selectedDate"
            :default-value="new Date()"
            :disabled-date="notBeforeToday"
            :placeholder="placeholder"
            :format="customFormat"
            full-month-name=true
            monday-first=true
            :language="locale"
            :clearable="false"
        )
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
// import locale from '@/store/localeDate.js'

// import ru from 
// import uk from 'vue2-datepicker/locale/uk'


export default {
    components: { DatePicker },
    data() {
        return {
            selectedDate: this.value,
            customFormat: 'DD-MM-YYYY',
            // language: locale,

            // locales: {
            //     uk: require('vue2-datepicker/locale/uk'),
            //     ru: require('vue2-datepicker/locale/ru'),
            // }
        };
    },


    methods: {
        notBeforeToday(date) {
            return date < new Date(new Date().setHours(0, 0, 0, 0));
        },
        onInputBlur() {
            this.$refs.myInputElement.blur();
        },
    },

    computed: {
        locale() {
            let locale;
            if (this.$i18n.locale == 'ru') {
                locale = require('vue2-datepicker/locale/ru');
            } else {
                locale = require('vue2-datepicker/locale/uk');
            }
            return locale;
        }
    },

    watch: {
        selectedDate(newValue) {
            this.$emit('input', newValue);
        },
    },
    props: {
        title: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        },
        notRequired: {
            type: Boolean,
            default: false
        },
        value: {
            type: null,
            default: null,
        },
    }
};
</script>

<style lang="scss" scoped>
.date { 
    // width: 100%;
    &__input { 
        input { 
            caret-color: transparent;
        }
    }
    &__title { 
        padding-left: 16px;
        font-weight: 500;
        font-size: 13px;
        line-height: 16px;
        margin-bottom: 8px;
        position: relative;

        @include mid { 
            font-size: 0.972vw;
            line-height: 1.181vw;
            margin-bottom: 0.556vw;
            padding-left: 1.597vw;
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
        &-required {
            display: none;
            margin-left: 6px;
            font-size: 10px;
            line-height: 13px;
        }


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
</style>