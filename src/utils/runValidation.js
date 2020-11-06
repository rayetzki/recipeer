export const validateField = (schema, field, values, errors) => {
  schema
    .validateAt(field, values)
    .then(() => {
      errors[field] = "";
    })
    .catch(e => {
      e.inner.forEach(error => {
        errors = { ...errors, [error.path]: error.message };
      });
    });
};

export const validateFormValues = (schema, values, errors) => {
  schema
    .validate(values, { abortEarly: false })
    .then()
    .catch(err => {
      err.inner.forEach(error => {
        errors = { ...errors, [error.path]: error.message };
      });
    });
};
