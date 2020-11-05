import { API_URL } from "../../config/API";
import axios from "axios";

export const user = {
  namespaced: true,
  state: {
    user: null,
    loading: false,
    error: ""
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, status) {
      state.loading = status;
    },
    setError(state, message) {
      state.error = message;
    }
  },
  actions: {
    async login({ commit, dispatch }, { email, password }) {
      try {
        const tokenResponse = await axios.post(`${API_URL}/users/login`, {
          email,
          password
        });

        if (tokenResponse.status === 201) {
          const { jwt, expiresIn, userId } = tokenResponse.data;
          const token = { jwt, expiresIn };
          localStorage.setItem("token", JSON.stringify(token));

          const userResponse = await axios.get(`${API_URL}/users/${userId}`);

          if (userResponse.status === 200) {
            commit("setUser", userResponse.data);
            commit("setError", "");
            dispatch("auth/login", null, { root: true });
          }
        }
      } catch (error) {
        commit(
          "setError",
          error.response ? error.response.data.message : error.message
        );
        localStorage.removeItem("token");
      } finally {
        commit("setLoading", false);
      }
    },
    async logout({ commit, dispatch }) {
      commit("setUser", null);
      dispatch("auth/logout", null, { root: true });
    }
  },
  getters: {
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error
  }
};
