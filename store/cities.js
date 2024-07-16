export const state = () => ({
    citiesFrom: [
        "Одеса", 
        "Єгорівка",
        "Причепівка",
        "Старі Маяки",
        "Нові Маяки",
        "Троїцьке",
        "Любашівка",
        "Крясненьке",
        "Умань",
        "Гайсин",
        "Краснопілка",
        "Ситківці",
        "Немирів",
        "Вороновиця",
        "Вінниця",
        "Літин",
        "Дяківці",
        "Летичів",
        "Миджибіж",
        "Ружичанка",
        "Хмельницький",
        "Війтівці",
        "Волочинськ",
        "Кам’янка",
        "Великі Гаї",
        "Тернопіль",
        "Довжанка",
        "Озерна",
        "Зборів",
        "Золочів",
        "Червоне",
        "Велика Вільшаниця",
        "Словіта",
        "Куровичі",
        "Підберізці",
        "Винники",
        "Львів",
        "Київ",
        "Біла Церква", 
        "Житомир",
        "Звягень",
        "Корець",
        "Самостріли",
        "Гоща",
        "Дурне",
        "Рівне",
        "Вересневе",
        "Грушвиця Друга",
        "Привільне",
        "Тараканів",
        "Пустоіванне",
        "Крупець",
        "Броди",
        "Суходоли",
        "Підгірці",
        "Олесько",
        "Вербляни",
        "Буськ",
        "Банюнин",
        "Дидилів",
        "Запитів",
        "Малехів",
        "Чернівці",
        "Новоград",
        "Луцьк",
        "Млинів",
        "Бродів"
    ],
    citiesTo: [
        {
            city: "Берлін",
            country: "Німеччина"
        },
        {
            city: "Мюнхен",
            country: "Німеччина"
        },
        {
            city: "Кельн",
            country: "Німеччина"
        },
        {
            city: "Гамбург",
            country: "Німеччина"
        },
        {
            city: "Дюссельдорф",
            country: "Німеччина"
        },
        {
            city: "Бремен",
            country: "Німеччина"
        },
        {
            city: "Штутґарт",
            country: "Німеччина"
        },
        {
            city: "Дрезден",
            country: "Німеччина"
        },
        {
            city: "Кіль",
            country: "Німеччина"
        },
        {
            city: "Франкфурт",
            country: "Німеччина"
        },
        {
            city: "Нюрнберг",
            country: "Німеччина"
        },
        {
            city: "Ессен",
            country: "Німеччина"
        },
        {
            city: "Дортмунд",
            country: "Німеччина"
        },
        {
            city: "Ганновер",
            country: "Німеччина"
        },
        {
            city: "Лейпциг",
            country: "Німеччина"
        },
    ]
})

export const getters = {
    getCitiesFrom: (state) => {
        return state.citiesFrom
    },
    getCitiesTo: (state) => { 
        return state.citiesTo
    }
}

// export const mutations = {
//     showAnswer(state) {
//         state.isShowAnswer = true
//     },
//     hideAnswer(state) {
//         state.isShowAnswer = false
//     }
// }

// export const actions = {
//     show({ commit }, payload) {
//         commit('showAnswer', payload);
//     },
//     hide({ commit }) {
//         commit('hideAnswer')
//     },

// }