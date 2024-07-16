export const state = () => ({
    isOpenModal: false,
    isFrom: false,
    isTo: false,
    isFromDate: false,
    isToDate: false,
    state: null,

    formInfo: { 
        title:'Звідки',
        placeholder: 'Оберіть звідки',
        places: 'Україна',
        citiesList: [
            {
                city: "Київ",
                country: "Україна"
            },
            {
                city: "Чернігів",
                country: "Україна"
            },
        ],
        isDate: false,
    },

})

export const mutations = {
    open(state) {
        state.isOpenModal = true
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
        state.isOpenModal = false
        document.body.style.cssText=``;
        window.scroll({top: this.scrollPosition})
        document.documentElement.style.scrollBehavior="";
    
    },

    set(state, payload) {
        state.formInfo = payload;
    },

    setState(state, payload) {
        state.state = payload;
    },
}

export const getters = {
    getModal: (state) => { 
        return state.isOpenModal;
    },
    getToModal: (state) => { 
        return state.toModal;
    },
    getFromModal: (state) => { 
        return state.fromModal;
    },

    getFromInfo: (state) => { 
        return state.formInfo;
    },

    getState: (state) => { 
        return state.state;
    }


}

export const actions = {
    open({ commit}) { 
        commit('open')
    },
    close({ commit }) {
        commit('close')
    },

    
}