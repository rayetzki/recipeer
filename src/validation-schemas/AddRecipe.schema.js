import * as Yup from "yup";

export const AddRecipeValidationSchema = Yup.object({
  title: Yup.string()
    .required("Введи название рецепта")
    .min(6, "Минимум 6 символов")
    .max(100, "Максимум 100 символов"),
  description: Yup.string()
    .required("Введи описание рецепта")
    .min(10, "Минимум 10 символов")
    .max(100, "Максимум 100 символов"),
  cost: Yup.number()
    .nullable()
    .required("Введи примерную стоимость готового блюда")
    .typeError("Должно быть числом"),
  ingredients: Yup.array().of(
    Yup.object({
      unit: Yup.string().required("Пусто"),
      ingredient: Yup.string().required("Пусто")
    })
  ),
  body: Yup.array().of(Yup.string().required("Пусто")),
  cookingTime: Yup.string().required("Введи примерное время приготовление")
});
