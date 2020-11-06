export const setUser = (state, payload) => {
  state.user = payload;
};

export const setLoading = (state, status) => {
  state.loading = status;
};

export const setError = (state, message) => {
  state.error = message;
};
