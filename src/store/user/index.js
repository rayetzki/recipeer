import {
  setUser,
  setLoading,
  setError,
  updateUser,
  setAvatar
} from "./user.mutations";
import { register, update, uploadAvatar, saveUserData } from "./user.actions";

export default {
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
    register,
    update,
    uploadAvatar,
    saveUserData
  },
  getters: {
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error
  }
};
