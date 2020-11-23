import axios from "axios";
import router from "../../router";
import { API_URL } from "../../config/API";

export const saveToken = ({ commit }, token) => {
  commit("setToken", token);
};

export const logout = ({ commit }) => {
  commit("setLoggedIn", false);
  commit("setToken", null);
  commit("setRefreshToken", null);
  localStorage.clear();
  router.push("/login");
};

export const login = async ({ commit, dispatch }, { email, password }) => {
  try {
    const tokenResponse = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });

    if (tokenResponse.status === 201) {
      const {
        accessToken,
        expiresIn,
        refreshToken,
        refreshExpiresIn,
        userId
      } = tokenResponse.data;
      const token = { accessToken, expiresIn };
      const refresh = { refreshToken, refreshExpiresIn };
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("refreshToken", JSON.stringify(refresh));
      commit("setToken", token);
      commit("setRefreshToken", refresh);

      const userResponse = await axios.get(`${API_URL}/users/${userId}`);

      if (userResponse.status === 200) {
        dispatch("user/saveUserData", userResponse.data, { root: true });
        commit("setError", "");
        commit("setLoggedIn", true);
        router.push("/");
      }
    }
  } catch (error) {
    commit(
      "setError",
      error.response ? error.response.data.message : error.message
    );
  } finally {
    commit("setLoading", false);
  }
};

export const refresh = async ({ commit }, { userId, refreshToken }) => {
  commit("setToken", null);

  const refreshResponse = await axios.post(
    `${API_URL}/auth/refresh?id=${userId}`,
    { refreshToken }
  );

  if (refreshResponse.status === 201) {
    const {
      accessToken,
      expiresIn,
      refreshToken,
      refreshExpiresIn
    } = refreshResponse.data;

    const access = { accessToken, expiresIn };
    const refresh = { refreshToken, refreshExpiresIn };

    localStorage.setItem("token", JSON.stringify(access));
    localStorage.setItem("refreshToken", JSON.stringify(refresh));

    commit("setToken", access);
    commit("setRefreshToken", refresh);
  }
};
