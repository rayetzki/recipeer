import { saveToken, login, logout, refresh } from "./auth.actions";
import {
  setLoggedIn,
  setToken,
  setRefreshToken,
  setError,
  setLoading
} from "./auth.mutations";

export const auth = {
  namespaced: true,
  state: {
    loading: false,
    error: "",
    isLoggedIn: !!localStorage.getItem("token"),
    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null,
    refreshToken: localStorage.getItem("refreshToken")
      ? JSON.parse(localStorage.getItem("refreshToken"))
      : null
  },
  mutations: {
    setLoggedIn,
    setToken,
    setRefreshToken,
    setLoading,
    setError
  },
  actions: {
    saveToken,
    login,
    logout,
    refresh
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    token: state => state.token,
    refreshToken: state => state.refreshToken,
    loading: state => state.loading,
    error: state => state.error
  }
};
