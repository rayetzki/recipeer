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

export const validateObject = (
  schema,
  field,
  property,
  index,
  object,
  errors,
  instance
) => {
  return schema
    .validateAt(field, object)
    .then(() => {
      instance.$set(errors, index, { ...errors[index], [property]: "" });
    })
    .catch(error => {
      instance.$set(errors, index, {
        ...errors[index],
        [property]: error.message
      });
    });
};

export const validateArray = (
  schema,
  field,
  index,
  object,
  errors,
  instance
) => {
  return schema
    .validateAt(field, object)
    .then(() => {
      instance.$set(errors, index, "");
    })
    .catch(error => {
      instance.$set(errors, index, error.message);
    });
};
