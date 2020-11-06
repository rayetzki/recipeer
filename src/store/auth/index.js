import getters from "./auth.getters";
import { saveToken, login, logout } from "./auth.actions";
import { setLoggedIn, setToken } from "./auth.mutations";

export const auth = {
  namespaced: true,
  state: {
    isLoggedIn: !!localStorage.getItem("token"),
    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  },
  mutations: {
    setLoggedIn,
    setToken
  },
  actions: {
    saveToken,
    login,
    logout
  },
  getters
};
