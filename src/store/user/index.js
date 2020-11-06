import getters from "./user.getters";
import { setUser, setLoading, setError } from "./user.mutations";
import { login, logout } from "./user.actions";

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
    logout
  },
  getters
};
