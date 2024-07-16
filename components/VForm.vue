<template lang="pug">
.form   
    .container 
        .form__content
            p.form__title {{ $t('form.title') }}
            .notification(:class="{'show-error': isShowError}")  
                    p.notification-text {{ $t('form.choose') }}
            .form__wrapper
                .form__input(@click="openList('citiesFrom')")
                    VField(:title="$t('form.inputs.from')" :placeholder="cityFromModel" fromToIcons=true type="text" v-model="cityFromModel" @input="searchCityFrom" isFrom :valueField="cityFromModel" @focus="clear(cityFromModel)" :styledInput="styleFromInput")
                    ul.form__list(:class="{'show-list': openUkraine}")
                        li(v-for="(city, idx) in citiesFrom" @click="chooseCity(city)").form__list-item.pointer
                            p.form__list-item-city {{ city }}
                            p.form__list-item-country {{ $t('citiesFrom.Ukraine') }}
                .form__input(@click="openList('citiesTo')")
                    VField(:title="$t('form.inputs.to')" :placeholder="cityToModel" fromToIcons=true type="text" v-model="cityToModel" @input="searchCityTo" isTo :valueField="cityToModel" @focus="clear(cityToModel)" :styledInput="styleToInput")
                    ul.form__list(:class="{'show-list': openEurope}")
                        li(v-for="(item, idx) in citiesTo" @click="chooseCity(item, item)").form__list-item.pointer
                            p.form__list-item-city {{ item.city }}
                            p.form__list-item-country {{ item.country }}
                .form__date     
                    VDatePicker(:title="$t('form.inputs.dateTo')" :readonly="true" v-model="startDate" ref="datePicker" :type="'button'")
                .form__input(@click="openList('numbersPass')")
                    VField(:title="$t('form.inputs.passangaers')" :placeholder="numberPass" passIcons=true type="text" readonly v-model="numberPass" :valueField="numberPass" isNumbers=true )
                    ul.form__list(:class="{'show-list': openNumbers}")
                        li(v-for="(number, idx) in numbersPass" @click="chooseNumber(number)").form__list-item.pointer
                            p.form__list-item-city {{ number }}
                .form__button(@click="calculateTripPrice(city1, city2)")
                    VButton(:title="$t('form.button')" isForm=true)
            
</template>

<script>
import { mapGetters } from "vuex";
    export default {

        data() {
            return {
                styleToInput: false,
                styleFromInput: false,
                numberPass: "1",
                startDate: new Date(),
                endDate: '',
                cityToModel: this.$t('modalCalc.chooseTo'),
                cityFromModel: this.$t('modalCalc.chooseFrom'),
                valueTo: "",
                placeFrom: "",
                valueFrom: "",
                citiesFromFiltered: [
                    // "Бердичів", "Березівка", "Бориспіль", "Бородянка", "Бровари", "Васильків", "Вінниця", "Вознесенськ", "Дубно", "Житомир", "Жмеринка", "Звягель", "Київ", "Луцьк", "Львів", "Немирів", "Одеса", "Первомайськ", "Рівне", "Славута", "Старокостянтинів", "Тернопіль", "Умань", "Хмельницький", "Хмільник", "Шепетівка", "Южноукраїнськ", "Ірпінь", "Фастів"
                    `${this.$t('citiesFrom.Berdychiv')}`,
                    `${this.$t('citiesFrom.Berezivka')}`,
                    `${this.$t('citiesFrom.Boryspil')}`,
                    `${this.$t('citiesFrom.Borodyanka')}`,
                    `${this.$t('citiesFrom.Brovary')}`,
                    `${this.$t('citiesFrom.Vasylkiv')}`,
                    `${this.$t('citiesFrom.Vinnytsia')}`,
                    `${this.$t('citiesFrom.Voznesensk')}`,
                    `${this.$t('citiesFrom.Dubno')}`,
                    `${this.$t('citiesFrom.Zhytomyr')}`,
                    `${this.$t('citiesFrom.Zhmerynka')}`,
                    `${this.$t('citiesFrom.Zvyahel')}`,
                    `${this.$t('citiesFrom.Kyiv')}`,
                    `${this.$t('citiesFrom.Lutsk')}`,
                    `${this.$t('citiesFrom.Lviv')}`,
                    `${this.$t('citiesFrom.Nemyriv')}`,
                    `${this.$t('citiesFrom.Odessa')}`,
                    `${this.$t('citiesFrom.Pervomaisk')}`,
                    `${this.$t('citiesFrom.Rivne')}`,
                    `${this.$t('citiesFrom.Slavuta')}`,
                    `${this.$t('citiesFrom.Starokostiantyniv')}`,
                    `${this.$t('citiesFrom.Ternopil')}`,
                    `${this.$t('citiesFrom.Uman')}`,
                    `${this.$t('citiesFrom.Khmelnytskyi')}`,
                    `${this.$t('citiesFrom.Khmilnyk')}`,
                    `${this.$t('citiesFrom.Shepetivka')}`,
                    `${this.$t('citiesFrom.Yuzhne')}`,
                    `${this.$t('citiesFrom.Irpin')}`,
                    `${this.$t('citiesFrom.Fastiv')}`
                ],
                citiesToFiltered: [
                    {
                    city: this.$t('citiesTo.cities.berlin'),
                    country: this.$t('citiesTo.countries.germany')
                    },
                    {
                    city: this.$t('citiesTo.cities.munich'),
                    country: this.$t('citiesTo.countries.germany')
                    },
                    {
                    city: this.$t('citiesTo.cities.cologne'),
                    country: this.$t('citiesTo.countries.germany')
                    },
                    {
                    city: this.$t('citiesTo.cities.hamburg'),
                    country: this.$t('citiesTo.countries.germany')
                    },
                    {
                    city: this.$t('citiesTo.cities.dusseldorf'),
                    country: this.$t('citiesTo.countries.germany')
                    },
                    {
                    city: this.$t('citiesTo.cities.bremen'),
                    country: this.$t('citiesTo.countries.germany')
                    },
                    {
                    city: this.$t('citiesTo.cities.stuttgart'),
                    country: this.$t('citiesTo.countries.germany')
                    },
                    {
                    city: this.$t('citiesTo.cities.dresden'),
                    country: this.$t('citiesTo.countries.germany')
                    },
                    {
                    city: this.$t('citiesTo.cities.kiel'),
                    country: this.$t('citiesTo.countries.germany')
                    },
                    {
                    city: this.$t('citiesTo.cities.frankfurt'),
                    country: this.$t('citiesTo.countries.germany')
                    },
                    {
                    city: this.$t('citiesTo.cities.nuremberg'),
                    country: this.$t('citiesTo.countries.germany')
                    },
                    {
                    city: this.$t('citiesTo.cities.essen'),
                    country: this.$t('citiesTo.countries.germany')
                    },
                    {
                    city: this.$t('citiesTo.cities.dortmund'),
                    country: this.$t('citiesTo.countries.germany')
                    },
                    {
                    city: this.$t('citiesTo.cities.hannover'),
                    country: this.$t('citiesTo.countries.germany')
                    },
                    {
                    city: this.$t('citiesTo.cities.leipzig'),
                    country: this.$t('citiesTo.countries.germany')
                    },
                    {
                    city: this.$t('citiesTo.cities.zurich'),
                    country: this.$t('citiesTo.countries.switzerland')
                    },
                    {
                    city: this.$t('citiesTo.cities.prague'),
                    country: this.$t('citiesTo.countries.czech')
                    }
                    // {
                    //     city: "Берлін",
                    //     country: "Німеччина"
                    // },
                    // {
                    //     city: "Мюнхен",
                    //     country: "Німеччина"
                    // },
                    // {
                    //     city: "Кельн",
                    //     country: "Німеччина"
                    // },
                    // {
                    //     city: "Гамбург",
                    //     country: "Німеччина"
                    // },
                    // {
                    //     city: "Дюссельдорф",
                    //     country: "Німеччина"
                    // },
                    // {
                    //     city: "Бремен",
                    //     country: "Німеччина"
                    // },
                    // {
                    //     city: "Штутґарт",
                    //     country: "Німеччина"
                    // },
                    // {
                    //     city: "Дрезден",
                    //     country: "Німеччина"
                    // },
                    // {
                    //     city: "Кіль",
                    //     country: "Німеччина"
                    // },
                    // {
                    //     city: "Франкфурт",
                    //     country: "Німеччина"
                    // },
                    // {
                    //     city: "Нюрнберг",
                    //     country: "Німеччина"
                    // },
                    // {
                    //     city: "Ессен",
                    //     country: "Німеччина"
                    // },
                    // {
                    //     city: "Дортмунд",
                    //     country: "Німеччина"
                    // },
                    // {
                    //     city: "Ганновер",
                    //     country: "Німеччина"
                    // },
                    // {
                    //     city: "Лейпциг",
                    //     country: "Німеччина"
                    // },
                    // {
                    //     city: "Швейцарія",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Чехія",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Прага",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Брно",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Острава",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Пльзень",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Ліберець",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Градец-Кралове",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Усті-над-Лабем",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Гавіржов",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Тепліце",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Карлові Вари",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Храдец-Кралове",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Цюрих",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Женева",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Базель",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Лозанна",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Берн",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Люцерн",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Інтерлакен",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Церматт",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Сьон",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Фрібур",
                    //     country: "Швейцарія"
                    // }
                ],
                citiesFrom: [
                // "Бердичів", "Березівка", "Бориспіль", "Бородянка", "Бровари", "Васильків", "Вінниця", "Вознесенськ", "Дубно", "Житомир", "Жмеринка", "Звягель", "Київ", "Луцьк", "Львів", "Немирів", "Одеса", "Первомайськ", "Рівне", "Славута", "Старокостянтинів", "Тернопіль", "Умань", "Хмельницький", "Хмільник", "Шепетівка", "Южноукраїнськ", "Ірпінь", "Фастів"
                `${this.$t('citiesFrom.Berdychiv')}`,
                `${this.$t('citiesFrom.Berezivka')}`,
                `${this.$t('citiesFrom.Boryspil')}`,
                `${this.$t('citiesFrom.Borodyanka')}`,
                `${this.$t('citiesFrom.Brovary')}`,
                `${this.$t('citiesFrom.Vasylkiv')}`,
                `${this.$t('citiesFrom.Vinnytsia')}`,
                `${this.$t('citiesFrom.Voznesensk')}`,
                `${this.$t('citiesFrom.Dubno')}`,
                `${this.$t('citiesFrom.Zhytomyr')}`,
                `${this.$t('citiesFrom.Zhmerynka')}`,
                `${this.$t('citiesFrom.Zvyahel')}`,
                `${this.$t('citiesFrom.Kyiv')}`,
                `${this.$t('citiesFrom.Lutsk')}`,
                `${this.$t('citiesFrom.Lviv')}`,
                `${this.$t('citiesFrom.Nemyriv')}`,
                `${this.$t('citiesFrom.Odessa')}`,
                `${this.$t('citiesFrom.Pervomaisk')}`,
                `${this.$t('citiesFrom.Rivne')}`,
                `${this.$t('citiesFrom.Slavuta')}`,
                `${this.$t('citiesFrom.Starokostiantyniv')}`,
                `${this.$t('citiesFrom.Ternopil')}`,
                `${this.$t('citiesFrom.Uman')}`,
                `${this.$t('citiesFrom.Khmelnytskyi')}`,
                `${this.$t('citiesFrom.Khmilnyk')}`,
                `${this.$t('citiesFrom.Shepetivka')}`,
                `${this.$t('citiesFrom.Yuzhne')}`,
                `${this.$t('citiesFrom.Irpin')}`,
                `${this.$t('citiesFrom.Fastiv')}`
                ],
                citiesTo: [
                // {
                //         city: "Берлін",
                //         country: "Німеччина"
                //     },
                //     {
                //         city: "Мюнхен",
                //         country: "Німеччина"
                //     },
                //     {
                //         city: "Кельн",
                //         country: "Німеччина"
                //     },
                //     {
                //         city: "Гамбург",
                //         country: "Німеччина"
                //     },
                //     {
                //         city: "Дюссельдорф",
                //         country: "Німеччина"
                //     },
                //     {
                //         city: "Бремен",
                //         country: "Німеччина"
                //     },
                //     {
                //         city: "Штутґарт",
                //         country: "Німеччина"
                //     },
                //     {
                //         city: "Дрезден",
                //         country: "Німеччина"
                //     },
                //     {
                //         city: "Кіль",
                //         country: "Німеччина"
                //     },
                //     {
                //         city: "Франкфурт",
                //         country: "Німеччина"
                //     },
                //     {
                //         city: "Нюрнберг",
                //         country: "Німеччина"
                //     },
                //     {
                //         city: "Ессен",
                //         country: "Німеччина"
                //     },
                //     {
                //         city: "Дортмунд",
                //         country: "Німеччина"
                //     },
                //     {
                //         city: "Ганновер",
                //         country: "Німеччина"
                //     },
                //     {
                //         city: "Лейпциг",
                //         country: "Німеччина"
                //     },
                //     {
                //         city: "Швейцарія",
                //         country: "Швейцарія"
                //     },
                //     {
                //         city: "Чехія",
                //         country: "Чехія"
                //     },
                {
                city: this.$t('citiesTo.cities.berlin'),
                country: this.$t('citiesTo.countries.germany')
                },
                {
                city: this.$t('citiesTo.cities.munich'),
                country: this.$t('citiesTo.countries.germany')
                },
                {
                city: this.$t('citiesTo.cities.cologne'),
                country: this.$t('citiesTo.countries.germany')
                },
                {
                city: this.$t('citiesTo.cities.hamburg'),
                country: this.$t('citiesTo.countries.germany')
                },
                {
                city: this.$t('citiesTo.cities.dusseldorf'),
                country: this.$t('citiesTo.countries.germany')
                },
                {
                city: this.$t('citiesTo.cities.bremen'),
                country: this.$t('citiesTo.countries.germany')
                },
                {
                city: this.$t('citiesTo.cities.stuttgart'),
                country: this.$t('citiesTo.countries.germany')
                },
                {
                city: this.$t('citiesTo.cities.dresden'),
                country: this.$t('citiesTo.countries.germany')
                },
                {
                city: this.$t('citiesTo.cities.kiel'),
                country: this.$t('citiesTo.countries.germany')
                },
                {
                city: this.$t('citiesTo.cities.frankfurt'),
                country: this.$t('citiesTo.countries.germany')
                },
                {
                city: this.$t('citiesTo.cities.nuremberg'),
                country: this.$t('citiesTo.countries.germany')
                },
                {
                city: this.$t('citiesTo.cities.essen'),
                country: this.$t('citiesTo.countries.germany')
                },
                {
                city: this.$t('citiesTo.cities.dortmund'),
                country: this.$t('citiesTo.countries.germany')
                },
                {
                city: this.$t('citiesTo.cities.hannover'),
                country: this.$t('citiesTo.countries.germany')
                },
                {
                city: this.$t('citiesTo.cities.leipzig'),
                country: this.$t('citiesTo.countries.germany')
                },
                {
                city: this.$t('citiesTo.cities.zurich'),
                country: this.$t('citiesTo.countries.switzerland')
                },
                {
                city: this.$t('citiesTo.cities.prague'),
                country: this.$t('citiesTo.countries.czech')
                }
                    // {
                    //     city: "Прага",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Цюрих",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Женева",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Базель",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Лозанна",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Берн",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Люцерн",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Інтерлакен",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Церматт",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Сьон",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Фрібур",
                    //     country: "Швейцарія"
                    // },
                    // {
                    //     city: "Брно",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Острава",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Пльзень",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Ліберець",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Градец-Кралове",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Усті-над-Лабем",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Гавіржов",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Тепліце",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Карлові Вари",
                    //     country: "Чехія"
                    // },
                    // {
                    //     city: "Храдец-Кралове",
                    //     country: "Чехія"
                    // }
                ],
                numbersPass: ["1","2","3","4","5","6","7","8","9","10"],

                city1: null,
                city2: null,

                cityToInput: "",
                cityFromInput: "",
                        
                blockCityTo: false,
                blockCityFrom: false,

                citiesFirst: [
                    { 
                        id: 0,
                        name: this.$t('citiesFirst.odessa'),
                        country: "Ukraine"
                    },
                    {
                        id: 1,
                        name: this.$t('citiesFirst.voznesensk'),
                        country: "Ukraine"
                    },
                    {
                        id: 2,
                        name: this.$t('citiesFirst.berezivka'),
                        country: "Ukraine"
                    },
                    {
                        id: 3,
                        name: this.$t('citiesFirst.yuzhno-ukrainsk'),
                        country: "Ukraine"
                    },
                    {
                        id: 4,
                        name: this.$t('citiesFirst.pervomaysk'),
                        country: "Ukraine"
                    },
                    {
                        id: 5,
                        name: this.$t('citiesFirst.uman'),
                        country: "Ukraine"
                    },
                    {
                        id: 6,
                        name: this.$t('citiesFirst.gaysin'),
                        country: "Ukraine"
                    }
                ],

                citiesSecond: [
                    {
                        id: 0,
                        name: this.$t('citiesSecond.vinnitsia'),
                        country: "Ukraine"
                    },
                    {
                        id: 1,
                        name: this.$t('citiesSecond.nemyriv'),
                        country: "Ukraine"
                    },
                    {
                        id: 2,
                        name: this.$t('citiesSecond.zhmerynka'),
                        country: "Ukraine"
                    },
                    {
                        id: 3,
                        name: this.$t('citiesSecond.khmilnyk'),
                        country: "Ukraine"
                    },
                    {
                        id: 4,
                        name: this.$t('citiesSecond.berdychiv'),
                        country: "Ukraine"
                    },
                    {
                        id: 5,
                        name: this.$t('citiesSecond.zhytomyr'),
                        country: "Ukraine"
                    },
                    {
                        id: 6,
                        name: this.$t('citiesSecond.khmelnytskyi'),
                        country: "Ukraine"
                    },
                    {
                        id: 7,
                        name: this.$t('citiesSecond.starokostiantyniv'),
                        country: "Ukraine"
                    },
                    {
                        id: 8,
                        name: this.$t('citiesSecond.shepetivka'),
                        country: "Ukraine"
                    },
                    {
                        id: 9,
                        name: this.$t('citiesSecond.slavuta'),
                        country: "Ukraine"
                    },
                    {
                        id: 10,
                        name: this.$t('citiesSecond.zvyahel'),
                        country: "Ukraine"
                    },
                    {
                        id: 11,
                        name: this.$t('citiesSecond.rivne'),
                        country: "Ukraine"
                    },
                    {
                        id: 12,
                        name: this.$t('citiesSecond.dubno'),
                        country: "Ukraine"
                    },
                    {
                        id: 13,
                        name: this.$t('citiesSecond.ternopil'),
                        country: "Ukraine"
                    },
                    {
                        id: 14,
                        name: this.$t('citiesSecond.lutsk'),
                        country: "Ukraine"
                    }
                ],

                citiesThird: [
                    {
                        id: 0,
                        name: this.$t('citiesThird.kyiv'),
                        country: "Ukraine"
                    },
                    {
                        id: 1,
                        name: this.$t('citiesThird.irpin'),
                        country: "Ukraine"
                    },
                    {
                        id: 2,
                        name: this.$t('citiesThird.boryspil'),
                        country: "Ukraine"
                    },
                    {
                        id: 3,
                        name: this.$t('citiesThird.fastiv'),
                        country: "Ukraine"
                    },
                    {
                        id: 4,
                        name: this.$t('citiesThird.vasylkiv'),
                        country: "Ukraine"
                    },
                    {
                        id: 5,
                        name: this.$t('citiesThird.brovary'),
                        country: "Ukraine"
                    },
                    {
                        id: 6,
                        name: this.$t('citiesThird.borodyanka'),
                        country: "Ukraine"
                    }
                ],

                citiesFourth: [
                    {
                        id: 0,
                        name: this.$t('citiesFourth.lviv'),
                        country: "Ukraine"
                    },
                ],
                openUkraine: false,
                openEurope: false,
                openNumbers: false,
            }
        },
        computed: {
            ...mapGetters({
                isOpenModal: "formModal/getModal",
                cityFrom: "trip/getFrom",
                cityTo: "trip/getTo",
                isShowError: "trip/getError",
                isDefault: "trip/getDefault",
            }),
        },

        watch: {
            startDate(newValue) {
                this.$store.commit("trip/setDateFrom", newValue)
            },
            cityToModel(){
                this.cityToInput = this.cityToModel 
                // console.log(this.cityToInput);
                // console.log(this.cityToInput);
                this.citiesToFiltered.find(item => {
                    if(this.cityToInput.toLowerCase() == item.city.toLowerCase() ){
                        // console.log('toyes', item.city);
                        this.blockCityTo = true
                        this.city2 = item.country
                        this.styleToInput = true
                        this.$store.commit("trip/setTo", item.city);
                        return this.blockCityTo, this.city2, this.styleToInput 
                    }else { 
                        this.blockCityTo = false
                        // console.log('tono');
                        // this.$store.commit("trip/setTo", "");
                        this.city2 = ""

                        this.styleToInput = false
                        return false

                    }
                })
            },
            cityFromModel(){
                this.cityFromInput = this.cityFromModel 
                // console.log(this.cityToInput);
                // console.log(this.cityToInput);
                this.citiesFromFiltered.find(item => {
                    if(this.cityFromInput.toLowerCase() == item.toLowerCase() ){
                        // console.log("fromyes", item);
                        this.blockCityFrom = true
                        this.city1 = item
                        this.styleFromInput = true
                        this.$store.commit("trip/setFrom", item);
                        return this.blockCityFrom, this.city1, this.styleFromInput 
                    }else { 
                        // console.log("fromno");
                        this.blockCityFrom = false
                        // this.$store.commit("trip/setTo", "");
                        this.city1 = ""
                        this.styleFromInput = false
                        return false
                    }
                })
            },
            isDefault(){
                this.cityToModel = this.$t('modalCalc.chooseTo')
                this.cityFromModel = this.$t('modalCalc.chooseFrom')
                this.city1 = null
                this.city2 = null
                this.blockCityTo = false
                this.blockCityFrom = false
                this.styleToInput = false
                this.styleFromInput = false
            }
        },
        mounted () {

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                this.$refs.datePicker.$el.querySelector('input').addEventListener('focus', (e) => {
                    e.target.blur();
                });
            }

            this.$store.commit("formModal/set", this.fromModal)
            this.valueFrom = this.cityFromModel
            this.valueTo = this.cityToModel
            if(this.isOpenModal){
                this.$nextTick(() => {
                    this.$refs.inputRef.focus();
                });
            };
            document.addEventListener('click', (event) => {
                if (!event.target.classList.contains('field__placeholder-input') && !event.target.classList.contains('form__list')) {
                    this.openUkraine = false
                    this.openEurope = false
                    this.openNumbers = false
                }
                if(event.target.classList.contains('from-field')) {
                    this.openEurope = false
                    this.openNumbers = false
                }else if (event.target.classList.contains('to-field')) { 
                    this.openUkraine = false
                    this.openNumbers = false
                }else if (event.target.classList.contains('number-field')) { 
                    this.openUkraine = false
                    this.openEurope = false
                }
                if(!event.target.classList.contains('from-field') && this.cityFromModel == ""){
                    this.cityFromModel= this.$t('modalCalc.chooseFrom')
                }
                if(!event.target.classList.contains('to-field') && this.cityToModel == ""){
                    this.cityToModel= this.$t('modalCalc.chooseTo')
                }
            })
        },
        methods: {
            searchCityFrom(){
                this.citiesFrom = this.citiesFromFiltered.filter(item => {
                    return item.toLowerCase().includes(this.cityFromModel.toLowerCase())
                })
            },
            searchCityTo(){
                this.citiesTo = this.citiesToFiltered.filter(item => {
                    return item.city.toLowerCase().includes(this.cityToModel.toLowerCase())
                })
            },
            calculateTripPrice(cityFrom, countryTo) {
                // console.log(this.cityToModel);
                // console.log(this.blockCityTo, "to");
                // console.log(this.blockCityFrom, "from");
                if (this.blockCityTo && this.blockCityFrom) {
                    
                    
                    
                    if(this.cityFromModel == this.$t('modalCalc.chooseFrom') || this.cityToModel == this.$t('modalCalc.chooseTo') ) { 
                        this.$store.commit("trip/openError");
                    }else { 
                        this.$store.commit("trip/closeError");
                        this.openModal()
                    }
                    if (countryTo) {
                        this.citiesFirst.forEach(el => {
                            if (cityFrom.toLowerCase() == el.name.toLowerCase()) {
                                // console.log(this.$t('citiesTo.countries.germany') );
                                if(countryTo == this.$t('citiesTo.countries.germany') || countryTo == this.$t('citiesTo.countries.czech')) { 
                                    this.$store.commit("trip/setPrice", 200);
                                }else if (countryTo == this.$t('citiesTo.countries.switzerland')) { 
                                    this.$store.commit("trip/setPrice", 250);
                                }
                                return
                            }
                        });

                        this.citiesSecond.forEach(el => {
                            if (cityFrom.toLowerCase() == el.name.toLowerCase()) {
                                if(countryTo == this.$t('citiesTo.countries.germany') || countryTo == this.$t('citiesTo.countries.czech')) { 
                                    this.$store.commit("trip/setPrice", 180);
                                }else if (countryTo == this.$t('citiesTo.countries.switzerland')) { 
                                    this.$store.commit("trip/setPrice", 220);
                                }
                                return
                            }
                        });

                        this.citiesThird.forEach(el => {
                            if (cityFrom.toLowerCase() == el.name.toLowerCase()) {
                                if(countryTo == this.$t('citiesTo.countries.germany') || countryTo == this.$t('citiesTo.countries.czech')) { 
                                    this.$store.commit("trip/setPrice", 180);
                                }else if (countryTo == this.$t('citiesTo.countries.switzerland')) { 
                                    this.$store.commit("trip/setPrice", 220);
                                }
                                return
                            }
                        });

                        this.citiesFourth.forEach(el => {
                            if (cityFrom.toLowerCase() == el.name.toLowerCase()) {
                                if(countryTo == this.$t('citiesTo.countries.germany') || countryTo == this.$t('citiesTo.countries.czech')) { 
                                    this.$store.commit("trip/setPrice", 170);
                                }else if (countryTo == this.$t('citiesTo.countries.switzerland')) { 
                                    this.$store.commit("trip/setPrice", 200);
                                }
                                return
                            }
                        });
                    }
                }else { 
                    this.$store.commit("modal/openNot")
                }
            },
            openModal() { 
                this.$store.commit("trip/openCalc");
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
            openList(listName){
                if(listName == 'citiesFrom'){ 
                    this.citiesFrom = this.citiesFromFiltered 
                    this.openUkraine = true
                }else if(listName == 'citiesTo') {
                    this.citiesTo = this.citiesToFiltered 
                    this.openEurope = true
                }else if(listName == 'numbersPass') { 
                    this.openNumbers = true
                }
            },

            clear(model) {
                if(model == this.cityFromModel ) {
                    // console.log("clear1");
                    this.cityFromModel = "";
                }else if(model == this.cityToModel ) {
                    // console.log("clear2");
                    this.cityToModel = "";
                }
            },

            chooseCity(city, country){
                if(country){

                    this.blockCityTo = true;
                    
                    this.$store.commit("trip/setTo", city.city);
                    this.city2 = city.country;
                    this.cityToModel = city.city;
                    
                }else { 
                    this.blockCityFrom = true;
                    // console.log("choose", this.blockCityFrom);
                    this.$store.commit("trip/setFrom", city);
                    this.city1 = city;
                    this.cityFromModel = city 

                    // this.placeFrom = city;

                }

                // console.log("cityFromModel", this.cityFromModel);
                setTimeout(() => {
                    this.openUkraine = false
                    this.openEurope = false
                }, 1);
            },
            chooseNumber(number) { 
                this.numberPass = number
                this.$store.commit("trip/setPass", number)
            }
        },

        
    }
</script>

<style lang="scss" scoped>
.form { 
    padding-top: 16px;
    background: #F5F5F5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    width: 100%;
    position: relative;
    z-index: 2;

    @include mid { 
        // width: fit-content;
        padding-top: 1.111vw;
        padding-bottom: 1.667vw;
        border-radius: 1.042vw;
        box-shadow: 0 0.278vw 0.278vw rgba(0, 0, 0, 0.25);
    }
    &__content { 
        position: relative;
    }
    &__title { 
        margin-bottom: 16px;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        color: #030303;

        @include mid { 
            font-size: 1.736vw;
            line-height: 2.083vw;
            margin-bottom: 1.111vw;
        }
    }
    &__input { 
        position: relative;
    }
    &__list { 
        height: 0px;
        // padding: 0 16px;
        overflow: hidden;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: #F5F5F5;
        z-index: 3;
        transition: all .3s;
        @include mid{
            width: 20vw;
        }
        li{
            padding: 8px 16px;
        }
        &-item { 
            // margin-bottom: 16px;

            &:hover { 
                transition: all .3s;
                background-color: #dfdfdf;
            }
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
    &__date { 
        margin-bottom: 8px;
        
        @include mid { 
            margin: 0;
        }
    }
    &__wrapper { 
        position: relative;
        @include mid { 
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            gap: 1.667vw;
            align-items: flex-end;
        }
    }
    &__button { 
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end ;
    }

}
.show-list { 
    height: fit-content;
    max-height: 200px;
    overflow-y: scroll;
    padding: 0px 0px;
    transition: all .3s;

    li{
        padding: 8px 16px;
    }
    @include mid{
        width: 20vw;
        height: fit-content;
        max-height: 24.514vw;

    }
}
.container { 
    padding: 0 24px;
    
    @include mid { 
        padding: 0 2.778vw;
    }
}
.notification { 
    display: none;
    position: absolute;
    color: #F5F5F5;
    background: #F33B3B;
    top: calc(0% - 16px);
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    padding-block: 5px;
    text-align: center;
    border-radius: 0px 0px 5px 5px;
    
    p { 
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: #FFFFFF;

        @include mid { 
            font-size: 0.833vw;
            line-height: 1.042vw;
        }
    }
    @include mid { 
        padding-block: 0.347vw;
        width: 37.903vw;
        top: calc(0% - 1.111vw);
        border-radius: 0px 0px 0.347vw 0.347vw;
    }
}
.show-error { 
    display: block;
}
.green-input { 
    border: 1px solid red;
}
</style>
