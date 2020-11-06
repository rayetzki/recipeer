export const validateField = (schema, values, errors) => {
  schema
    .validate(values)
    .then(() => {
      errors = null;
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
