import { API_URL } from "../../config/API";
import axios from "axios";
import router from "../../router";

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
      router.push("/");
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

export const saveUserData = ({ commit }, userData) => {
  commit("setUser", userData);
};
