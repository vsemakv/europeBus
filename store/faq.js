export const state = () => ({
    questions: [
        {
            question: "faq.questionDocs",
            answer: "faq.answerDocs",
            show: false
        },
        {
            question: "faq.questionItems1",
            answer: "faq.answerItems1",
            show: false
        },
        {
            question: "faq.questionItems2",
            answer: "faq.answerItems2",
            show: false
        },
        {
            question: "faq.questionItems3",
            answer: "faq.answerItems3",
            show: false
        },
        {
            question: "faq.questionMedic",
            answer: "faq.answerMedic",
            show: false
        },
        {
            question: "faq.questionAlco",
            answer: "faq.answerAlco",
            show: false
        },
        {
            question: "faq.questionFood",
            answer: "faq.answerFood",
            show: false
        },

    ],
})

export const getters = {
    getQuestions: (state) => {
        return state.questions
    },
    getAnswer: (state) => { 
        return state.isShowAnswer
    }
}

export const mutations = {
    showAnswer(state) {
        state.isShowAnswer = true
    },
    hideAnswer(state) {
        state.isShowAnswer = false
    }
}

export const actions = {
    show({ commit }, payload) {
        commit('showAnswer', payload);
    },
    hide({ commit }) {
        commit('hideAnswer')
    },

}