const stringValidator = str => {
  if (!str || str.length === 0 || typeof str !== "string") {
     return false;
  }
  return true;
};

export const emptyStringValidator = str => {
  if (!str || typeof str !== "string") {
     return false;
  }
  return true;
};

export default stringValidator;
