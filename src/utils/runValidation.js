export const validateField = (schema, field, values, errors) => {
  return schema
    .validateAt(field, values)
    .then(() => {
      errors[field] = "";
    })
    .catch(error => {
      errors[field] = error.message;
    });
};
