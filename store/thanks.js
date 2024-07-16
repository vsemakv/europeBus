export const state = () => ({
  isSended: false,
})

export const mutations = {
  send(state) {
    state.isSended = true
  },
}

export const getters = {
  getSend: (state) => {
    return state.isSended;
  }
}

export const actions = {
  sendForm({ commit, state }) {
    if (state.isSended === false) {
      commit('send')
    }
  },
}