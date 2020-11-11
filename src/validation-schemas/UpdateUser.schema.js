import * as Yup from "yup";

export const UpdateUserValidationSchema = Yup.object().shape({
  name: Yup.string().required("Введи имя"),
  age: Yup.number()
    .typeError("Должно быть числом")
    .required("Введи свой возраст")
    .moreThan(0, "0 лет, серьезно?"),
  email: Yup.string()
    .email("E-mail не валидный")
    .required("Введи email"),
  avatar: Yup.string().optional()
});
