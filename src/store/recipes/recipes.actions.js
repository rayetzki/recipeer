import axios from "axios";
import router from "../../router";
import { API_URL } from "../../config/API";

export const getRecipes = (page, limit = 5, dayTime) => {
  return axios
    .get(`${API_URL}/recipes`, {
      params: {
        page,
        limit,
        dayTime: dayTime || null
      }
    })
    .then(response => response.data)
    .catch(error => Promise.reject(error));
};

export const getRecipesByUser = (userId, page, limit = 5) => {
  return axios
    .get(`${API_URL}/recipes/byUser`, {
      params: {
        page: page || null,
        limit,
        userId
      }
    })
    .then(response => response.data)
    .catch(error => Promise.reject(error));
};

export const getRecipeById = id => {
  return axios
    .get(`${API_URL}/recipes?id=${id}`)
    .then(response => response.data)
    .catch(error => console.error(error));
};

export const getRandomRecipe = () => {
  return axios
    .get(`${API_URL}/recipes/recommendation`)
    .then(response => response.data)
    .catch(error => console.error(error));
};

export const deleteRecipe = id => {
  return axios
    .delete(`${API_URL}/recipes/${id}`)
    .then(response => response.data)
    .catch(error => console.error(error));
};

export const findRecipe = condition => {
  return axios
    .get(`${API_URL}/recipes/search?condition=${condition}`)
    .then(response => response.data)
    .catch(error => console.error(error));
};

export const uploadRecipeBanner = (recipeId, file) => {
  const formData = new FormData();
  formData.append("banner", file);
  return axios
    .post(`${API_URL}/recipes/banner?id=${recipeId}`, formData)
    .then(response => response.data)
    .catch(error => console.error(error));
};

export const uploadRecipe = recipeData => {
  const { banner, body, ...rest } = recipeData;
  const recipe = {
    ...rest,
    body: body.join(". "),
    banner: ""
  };
  return axios.post(`${API_URL}/recipes`, recipe).then(response => {
    if (response.status === 201) {
      uploadRecipeBanner(response.data.id, banner).then(() => {
        router.push("/my-recipes");
      });
    }
  });
};

export const editRecipe = (recipeId, recipeData) => {
  const { banner, body, ...rest } = recipeData;
  const recipe = {
    ...rest,
    body: body.join(". "),
    banner: ""
  };
  return axios
    .put(`${API_URL}/recipes/${recipeId}`, recipe)
    .then(async response => {
      if (typeof banner !== "string") {
        await uploadRecipeBanner(recipeId, banner);
      }
      return response.data;
    })
    .catch(error => console.error(error));
};
