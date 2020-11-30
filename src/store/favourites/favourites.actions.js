import { API_URL } from "../../config/API";
import axios from "axios";

export const getFavourites = () => {
  return axios
    .get(`${API_URL}/favourites`)
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch(error => console.error(error));
};

export const addFavourite = recipeId => {
  return axios
    .post(`${API_URL}/favourites?recipeId=${recipeId}`)
    .then(response => {
      if (response.status === 201) {
        return response.data;
      }
    })
    .catch(error => console.error(error));
};

export const removeFavourite = recipeId => {
  return axios
    .delete(`${API_URL}/favourites?recipeId=${recipeId}`)
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch(error => console.error(error));
};
