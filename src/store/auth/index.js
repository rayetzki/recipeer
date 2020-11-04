import router from "../../router"

export const auth = {
    namespaced: true,
    state: {
        isLoggedIn: !!localStorage.getItem('token')
    },
    mutations: {
        setLoggedIn(state, status) {
            state.isLoggedIn = status
        }
    },
    actions: {
        logout({ commit }) {
            commit('setLoggedIn', false)
            localStorage.removeItem('token')
            router.push('/login')
        }
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn
    }
}