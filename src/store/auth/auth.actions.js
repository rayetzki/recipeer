import router from "../../router";

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
  commit("setToken", null);
};
