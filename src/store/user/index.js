import { API_URL } from '../../config/API'
import router from '../../router'
import axios from 'axios'

export const user = {
    namespaced: true,
    state: {
        user: null,
        token: null,
        loading: false,
        error: '',
        isLoggedIn: !!localStorage.getItem('token')
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setToken(state, token) {
            state.token = token
        },
        setLoading(state, status) {
            state.loading = status
        },
        setError(state, message) {
            state.error = message
        },
        setLoggedIn(state, status) {
            state.loggedIn = status;
        }
    },
    actions: {
        async login({ commit }, { email, password }) {
            try {
                const tokenResponse = await axios.post(`${API_URL}/users/login`, { email, password })
                if (tokenResponse.status === 201) {
                    const tokenData = { 
                        token: tokenResponse.data.jwt, 
                        expiresIn: tokenResponse.data.expiresIn 
                    }

                    localStorage.setItem('token', tokenData.token)
                    commit('setToken', tokenData)

                    const userResponse = await axios.get(`${API_URL}/users/${tokenResponse.data.userId}`)

                    if (userResponse.status === 200) {
                        commit('setUser', userResponse.data)
                        commit('setError', '')
                        commit('setLoggedIn', true)
                        router.push('/')
                    }
                }
            } catch (error) {
                commit('setError', error.response ? error.response.data.message : error.message)
                localStorage.removeItem('token')
            } finally {
                commit('setLoading', false)
            }
        },
        async logout({ commit }) {
            commit('setUser', null)
            commit('setLoggedIn', false)
            localStorage.removeItem('token')
            router.push('/login')
        }
    },
    getters: {
        user: state => state.user,
        loading: state => state.loading,
        error: state => state.error,
        isLoggedIn: state => state.isLoggedIn
    }
}