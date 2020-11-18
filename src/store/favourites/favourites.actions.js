import { API_URL } from "../../config/API";
import axios from "axios";

export const addFavourite = (userId, recipeId) => {
  return axios
    .post(`${API_URL}/favourites?userId=${userId}&recipeId=${recipeId}`)
    .then(response => {
      if (response.status === 201) {
        return response.data;
      }
    })
    .catch(error => console.error(error));
};

export const removeFavourite = (userId, recipeId) => {
  return axios
    .delete(`${API_URL}/favourites?userId=${userId}&recipeId=${recipeId}`)
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch(error => console.error(error));
};
