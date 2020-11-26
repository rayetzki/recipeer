import axios from "axios";
import { API_URL } from "../../config/API";

export const getRecipes = (page, userId = null, dayTime) => {
  return axios
    .get(`${API_URL}/recipes`, {
      params: {
        page,
        userId: userId || null,
        dayTime: dayTime || null
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

export const uploadRecipe = (userId, recipe) => {
  return axios
    .post(`${API_URL}/recipes?userId=${userId}`, recipe)
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
