import { nutritionTypes } from "../data/nutritionTypes";

export const convertNutritionType = type => {
  return nutritionTypes.find(nutrition => nutrition.value === type).label;
};
