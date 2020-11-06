export const saveToken = ({ commit }, token) => {
  commit("setToken", token);
};

export const login = ({ commit }) => {
  commit("setLoggedIn", true);
};

export const logout = ({ commit }) => {
  commit("setLoggedIn", false);
  localStorage.removeItem("token");
};
