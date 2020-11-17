export const setLoggedIn = (state, status) => {
  state.isLoggedIn = status;
};

export const setToken = (state, token) => {
  state.token = token;
};

export const setRefreshToken = (state, refreshToken) => {
  state.refreshToken = refreshToken;
};

export const setError = (state, error) => {
  state.error = error;
};

export const setLoading = (state, status) => {
  state.loading = status;
};
