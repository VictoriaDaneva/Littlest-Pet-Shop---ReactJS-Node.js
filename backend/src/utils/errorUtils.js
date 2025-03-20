export const getErrrorMessage = (err) => {
  if (err.name === "ValidationError") {
    const validationErrors = Object.values(err.errors);
    return validationErrors.length > 0
      ? validationErrors[0].message
      : "Validation error";
  }
  return err.message || "An unexpected error occurred.";
};
