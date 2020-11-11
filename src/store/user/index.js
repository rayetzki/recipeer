import {
  setUser,
  setLoading,
  setError,
  updateUser,
  setAvatar
} from "./user.mutations";
import { login, logout, register, update, uploadAvatar } from "./user.actions";

export const user = {
  namespaced: true,
  state: {
    user: null,
    loading: false,
    error: ""
  },
  mutations: {
    setUser,
    setLoading,
    setError,
    updateUser,
    setAvatar
  },
  actions: {
    login,
    logout,
    register,
    update,
    uploadAvatar
  },
  getters: {
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error
  }
};
