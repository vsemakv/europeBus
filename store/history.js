export const state = () => ({
    list: []
})

export const mutations = {
    addToList(state, item) {
        state.list.push(item)
        // console.log("item", item);
        // console.log("list", state.list);
        localStorage.setItem('list', JSON.stringify(state.list))
    },
    removeFromList(state, id) {
        // находим элемент с заданным id
        const obj = state.list.find(obj => obj.id === id);
        // если элемент найден, удаляем его
        if (obj) {
        // находим индекс элемента, который нужно удалить
        const index = state.list.indexOf(obj);
        // удаляем элемент с заданным индексом
        state.list.splice(index, 1);
        // обновляем localStorage
        localStorage.setItem('list', JSON.stringify(state.list));
        }},
    setList(state, list) {
        state.list = list
        localStorage.setItem('list', JSON.stringify(state.list))
    }
}

export const actions = {
    init({ commit }) {
        const list = localStorage.getItem('list')
        if (list) {
            commit('setList', JSON.parse(list))
        }
    }
}

export const getters = {
    getList: (state) => state.list
}
