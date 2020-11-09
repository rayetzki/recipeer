import * as Yup from "yup";

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email не валидный")
    .required("Введи email"),
  password: Yup.string()
    .min(6, "Минимум 6 символов")
    .max(10, "Максимум 10 символов")
    .required("Введи пароль")
});
