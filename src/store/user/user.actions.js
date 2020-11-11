import { API_URL } from "../../config/API";
import axios from "axios";

export const register = async (
  { commit, dispatch },
  { name, email, password, nutrition, age, role }
) => {
  commit("setLoading", true);

  try {
    const registerResponse = await axios.post(`${API_URL}/users`, {
      name,
      email,
      password,
      nutrition,
      age: Number(age),
      role
    });

    if (registerResponse.status === 201) {
      dispatch("user/login", { email, password }, { root: true });
      commit("setError", "");
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

export const login = async ({ commit, dispatch }, { email, password }) => {
  try {
    const tokenResponse = await axios.post(`${API_URL}/users/login`, {
      email,
      password
    });

    if (tokenResponse.status === 201) {
      const { jwt, expiresIn, userId } = tokenResponse.data;
      const token = { jwt, expiresIn };
      localStorage.setItem("token", JSON.stringify(token));
      dispatch("auth/saveToken", token, { root: true });

      const userResponse = await axios.get(`${API_URL}/users/${userId}`);

      if (userResponse.status === 200) {
        commit("setUser", userResponse.data);
        commit("setError", "");
        dispatch("auth/login", null, { root: true });
      }
    }
  } catch (error) {
    console.error(error);
    commit(
      "setError",
      error.response ? error.response.data.message : error.message
    );
    localStorage.removeItem("token");
  } finally {
    commit("setLoading", false);
  }
};

export const update = async (
  { commit },
  { id, name, age, email, nutrition }
) => {
  try {
    const updateResult = await axios.put(`${API_URL}/users/${id}`, {
      name,
      age,
      email,
      nutrition
    });

    if (updateResult.status === 200) {
      commit("setError", "");
      commit("updateUser", { name, age, email, nutrition });
    }
  } catch (error) {
    console.error(error);
    commit(
      "setError",
      error.response ? error.response.data.message : error.message
    );
  } finally {
    commit("setLoading", false);
  }
};

export const uploadAvatar = async ({ commit }, { id, avatar }) => {
  const formData = new FormData();
  formData.append("avatar", avatar);

  try {
    const uploadResponse = await axios.post(
      `${API_URL}/users/avatar?id=${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (uploadResponse.status === 201) {
      const avatar = uploadResponse.data.avatar;
      commit("setAvatar", avatar);
      return avatar;
    }
  } catch (error) {
    console.error(error);
  }
};

export const logout = ({ commit, dispatch }) => {
  commit("setUser", null);
  dispatch("auth/logout", null, { root: true });
};
