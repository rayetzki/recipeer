import router from "../../router";

export const auth = {
  namespaced: true,
  state: {
    isLoggedIn: !!localStorage.getItem("token")
  },
  mutations: {
    setLoggedIn(state, status) {
      state.isLoggedIn = status;
    }
  },
  actions: {
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
    isLoggedIn: state => state.isLoggedIn
  }
};
