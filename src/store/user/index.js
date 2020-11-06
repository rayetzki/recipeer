import { setUser, setLoading, setError } from "./user.mutations";
import { login, logout, register } from "./user.actions";

export const user = {
  namespaced: true,
  state: {
    user: null,
    loading: false,
    error: ""
  },
  mutations: {
    setUser,
    setLoading,
    setError
  },
  actions: {
    login,
    logout,
    register
  },
  getters: {
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error
  }
};
