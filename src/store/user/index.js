import { API_URL } from '../../config/API'
import router from '../../router'
import axios from 'axios'

export const user = {
    namespaced: true,
    state: {
        user: null,
        token: null,
        loading: false,
        error: null
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
        }
    },
    actions: {
        async login ({ commit }, { email, password }) {
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
            localStorage.removeItem('token')
        }
    },
    getters: {
        user: state => state.user,
        loading: state => state.loading,
        error: state => state.error
    }
}