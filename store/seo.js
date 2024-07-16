export const state = () => ({
    page: null,
    path: null
  });
  
  export const mutations = {
    set(state, data) {
      state.page = data;
    },
    setPath(state, data) {
      state.path = data;
    }
  };
  
  export const getters = {
    page: (state) => {
      return state.page;
    },
    path: (state) => {
      return state.path;
    }
  };
  
  export const actions = {
    get({ commit }, payload) {


        // commit('setPath', path);
        commit('set', payload);

    //   const path = pathname != '/' ? pathname.replace(/\/$/, "") : pathname;
    //   const url = `/seo/page?page=${path}`;
    //   return this.$axios
    //     .get(url)
    //     .then(({ data }) => {
    //       commit('set', data.status ? data.page : {});
    //       return Promise.resolve(data.status ? data.page : {});
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       //throw error; //do not throw anything, die like a ninja
    //     });
    }
  };
  