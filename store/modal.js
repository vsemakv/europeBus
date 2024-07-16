export const state = () => ({
    isShowModal: false,
    isShowModalSurprise: false,
    isNot: false,

    currentSurprise: {
        draw: true,
        title: "modalPresents.drawings.title",
        descr: "modalPresents.drawings.descr",
        imageMobile: "/images/draw-mobile.png",
        imageDesktop: "/images/draw.png",
        alter: "modalPresents.drawings.alter"
    },
    showSocials: false,
    // currentCityFrom: { },
    // currentCityTo: { }
})

export const mutations = {
    open(state) {
        state.isShowModal = true
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
    openSurprise(state) { 
        state.isShowModalSurprise = true
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
    close(state) {
        state.isShowModal = false
        state.isShowModalCalc = false
        state.isShowModalSurprise = false
        state.isNot = false
        
        document.body.style.cssText=``;
        window.scroll({top: this.scrollPosition})
        document.documentElement.style.scrollBehavior="";
    },
    setSurprise(state, payload) { 
        state.currentSurprise = payload
        
    },
    openNot(state) {
        state.isNot = true
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
    openSocials(state) {
        state.showSocials = true
    },
    closeSocials(state) { 
        state.showSocials = false
    },
    // setCities(state, to, from) { 
    //     state.currentCityFrom = from
    //     state.currentCityTo = to
    // },
}

export const getters = {
    getModal: (state) => {
        return state.isShowModal;
    },
    getModalSurprise: (state) => { 
        return state.isShowModalSurprise;
    },
    getSurprise: (state) => { 
        return state.currentSurprise;
    },
    getSocials: (state) => { 
        return state.showSocials;
    },
    getNot: (state) => { 
        return state.isNot;
    },
    // getCityFrom: (state) => { 
    //     return state.currentCityFrom;
    // }, 
    // getCityTo: (state) => { 
    //     return state.currentCityTo;
    // },
}

export const actions = {
    toggle({ commit, state }) {
        if (state.isShowModal === true) {
            commit('close')
        } else {
            commit('open')
        }
    },
    toggleSurprise({commit, state}){
        if (state.isShowModalSurprise === true) {
            commit('close')
        } else {
            commit('openSurprise')
        }
    },
    toggleSocials({commit, state}){
        if (state.showSocials === true) {
            commit('closeSocials')
        } else {
            commit('openSocials')
        }
    },
    close({ commit }) {
        commit('close')
    },
}