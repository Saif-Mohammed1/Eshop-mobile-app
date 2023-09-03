import {
  validateConfirmPassword,
  validateEmail,
  validateLength,
  validatePassword,
  validateString,
} from "./validationConstraints";

export const validateInput = (inputId, inputValue) => {
  if (inputId === "name") {
    return validateString(inputId, inputValue);
  } else if (inputId === "email") {
    return validateEmail(inputId, inputValue);
  } else if (inputId === "password") {
    return validatePassword(inputId, inputValue);
  } else if (inputId === "confirmPassword") {
    return validateConfirmPassword(inputId, inputValue);
  } else if (inputId === "message") {
    return validateLength(inputId, inputValue, 10, 150, true);
  }
};
