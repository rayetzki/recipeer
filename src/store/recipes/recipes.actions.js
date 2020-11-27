import axios from "axios";
import router from "../../router";
import { API_URL } from "../../config/API";

export const getRecipes = (page, userId = null, dayTime) => {
  return axios
    .get(`${API_URL}/recipes`, {
      params: {
        page,
        limit: 5,
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

export const uploadRecipeBanner = (recipeId, file) => {
  const formData = new FormData();
  formData.append("banner", file);
  return axios
    .post(`${API_URL}/recipes/banner?id=${recipeId}`, formData)
    .then(response => response.data)
    .catch(error => console.error(error));
};

export const uploadRecipe = (userId, recipeData) => {
  const { banner, body, ...rest } = recipeData;
  const recipe = {
    ...rest,
    body: body.join(". "),
    banner:
      "https://img1.russianfood.com/dycontent/images_upl/132/big_131907.jpg"
  };

  return axios
    .post(`${API_URL}/recipes?userId=${userId}`, recipe)
    .then(response => {
      if (response.status === 201) {
        uploadRecipeBanner(response.data.id, banner).then(() => {
          router.push("/my-recipes");
        });
      }
    });
};

export const editRecipe = (recipeId, recipe) => {
  return axios
    .put(`${API_URL}/recipes/${recipeId}`, recipe)
    .then(response => response.data)
    .catch(error => console.error(error));
};
