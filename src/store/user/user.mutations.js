export const setUser = (state, payload) => {
  state.user = payload;
};

export const updateUser = (state, updatedFields) => {
  state.user = { ...state.user, ...updatedFields };
};

export const setLoading = (state, status) => {
  state.loading = status;
};

export const setError = (state, message) => {
  state.error = message;
};

export const setAvatar = (state, avatar) => {
  state.user = { ...state.user, avatar };
};
