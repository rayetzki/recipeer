import * as Yup from "yup";

export const SignupValidationSchema = Yup.object().shape({
  name: Yup.string().required("Введи имя"),
  age: Yup.number()
    .typeError("Должно быть числом")
    .required("Введи свой возраст")
    .moreThan(0, "0 лет, серьезно?"),
  email: Yup.string()
    .email("E-mail не валидный")
    .required("Введи email"),
  password: Yup.string()
    .min(6, "Минимум 6 символов")
    .max(10, "Максимум 10 символов")
    .required("Введи пароль")
});
