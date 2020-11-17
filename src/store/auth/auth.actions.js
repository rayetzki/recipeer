import router from "../../router";
import axios from "axios";
import { API_URL } from "../../config/API";

export const saveToken = ({ commit }, token) => {
  commit("setToken", token);
};

export const login = ({ commit }) => {
  commit("setLoggedIn", true);
  router.push("/");
};

export const logout = ({ commit }) => {
  commit("setLoggedIn", false);
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  commit("setToken", null);
  router.push("/login");
  localStorage.clear();
};

export const refresh = async ({ commit }) => {
  localStorage.removeItem("token");
  commit("setToken", null);

  const refreshResponse = await axios.post(`${API_URL}/auth/refresh`, {
    refreshToken: JSON.parse(localStorage.getItem("refreshToken")).refreshToken
  });

  if (refreshResponse.status === 200) {
    const {
      token,
      expiresIn,
      refreshToken,
      refreshExpiresIn
    } = refreshResponse.data;

    const accessToken = { token, expiresIn };
    const refresh = { refreshToken, refreshExpiresIn };

    localStorage.setItem("token", JSON.stringify(accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(refresh));

    commit("setToken", accessToken);
  }
};
