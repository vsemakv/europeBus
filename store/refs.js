export const state = () => ({
    services: null,
    about: null,
    news: null,
    faq: null,
})

export const mutations = {
    setServices(state, payload) { 
        state.services = payload
    },
    setAbout(state, payload) { 
        state.about = payload
    },
    setNews(state, payload) { 
        state.news = payload
    },
    setFaq(state, payload) { 
        state.faq = payload
    }
}

export const getters = {
    getServices: (state) => {
        return state.services;
    },
    getAbout: (state) => {
        return state.about;
    },
    getNews: (state) => {
        return state.news;
    },
    getFaq: (state) => {
        return state.faq;
    }
}
