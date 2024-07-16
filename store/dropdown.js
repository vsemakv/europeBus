export const state = () => ({
  current: null
})

export const getters = {
  getCurrent(state){
    return state.current
  }
}

export const mutations = {
  setCurrent(state, payload=null){
    state.current = payload;
  }
}

export const actions = {
  show({ commit }, payload) {
    commit('setCurrent', payload);
  },
  hide({ commit }){
    commit('setCurrent') 
  },

}