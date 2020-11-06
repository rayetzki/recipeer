import * as Yup from "yup";

export const SignupValidationSchema = Yup.object().shape({
  name: Yup.string().required("Введи имя"),
  age: Yup.number()
    .moreThan(0, "0 лет, серьезно?")
    .required("Введи свой возраст"),
  email: Yup.string()
    .email("E-mail не валидный")
    .required("Введи email"),
  password: Yup.string()
    .min(6, "Минимум 6 символов")
    .max(8, "Максимум 8 символов")
    .required("Введи пароль")
});
