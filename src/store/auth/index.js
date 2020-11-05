import router from "../../router";

export const auth = {
  namespaced: true,
  state: {
    isLoggedIn: !!localStorage.getItem("token"),
    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  },
  mutations: {
    setLoggedIn(state, status) {
      state.isLoggedIn = status;
    },
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    saveToken({ commit }, token) {
      commit("setToken", token);
    },
    login({ commit }) {
      commit("setLoggedIn", true);
      router.push("/");
    },
    logout({ commit }) {
      commit("setLoggedIn", false);
      localStorage.removeItem("token");
    }
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    token: state => state.token
  }
};
