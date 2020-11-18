import { getRecipes, getRecipeById, getRandomRecipe } from "./recipes.actions";

export const recipes = {
  namespaced: true,
  actions: {
    getRecipes,
    getRecipeById,
    getRandomRecipe
  }
};
