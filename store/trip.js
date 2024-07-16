export const state = () => ({
  cityFrom: "modalCalc.chooseFrom",
  cityTo: "modalCalc.chooseTo",
  isShowModalCalc: false,
  dateFrom: null,
  dateBack: "",
  isShowError: false,
  currentPrice: 0,
  thanks: false,
  numPass: 1,
  default: false
})

export const mutations = {
  setFrom(state, payload) {
    state.cityFrom = payload
  },
  setTo(state, payload) {
    state.cityTo = payload
  },
  setPass(state, payload) {
    state.numPass = payload
  },
  setDefault(state) {
    state.default = true
  },

  setDateFrom(state, payload) {
    const date = new Date(payload);

    const day = date.getDate();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;

    state.dateFrom = formattedDate
  },
  setDateBack(state, payload) {
    const date = new Date(payload);

    const day = date.getDate();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;
    
    state.dateBack = formattedDate
  },

  openCalc(state) { 
    state.isShowModalCalc = true
  },
  closeCalc(state) { 
    state.isShowModalCalc = false
  },

  openError(state) { 
    state.isShowError = true
  },
  closeError(state) { 
    state.isShowError = false
  },

  setPrice(state, payload) {
    state.currentPrice = payload
  },

  openThanks(state) { 
    state.thanks = true
  },
  closeThanks(state) { 
    state.thanks = false
  },
}

export const getters = {
  getFrom: (state) => {
    return state.cityFrom;
  },
  getTo: (state) => {
    return state.cityTo;
  },
  getModalCalc: (state) => {
    return state.isShowModalCalc;
  },
  getDateFrom: (state) => { 
    return state.dateFrom;
  },
  getDateTo: (state) => { 
    return state.dateBack;
  },
  getError: (state) => { 
    return state.isShowError
  },
  getPrice: (state) => { 
    return state.currentPrice
  },
  getThanks: (state) => { 
    return state.thanks
  },
  getPass: (state) => { 
    return state.numPass
  },
  getDefault: (state) => { 
    return state.default
  },
}

export const actions = {
  toggle({ commit, state }) {
      if (state.isShowError === true) {
          commit('closeError')
      } else {
          commit('openError')
      }
  },
  close({ commit }) {
      commit('closeError')
  },
}