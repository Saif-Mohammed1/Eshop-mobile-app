import { validate } from "validate.js";

export const validateLength = (id, value, minLength, maxLength, allowEmpty) => {
  const constraints = {
    presence: { allowEmpty },
  };

  if (!allowEmpty || value !== "") {
    constraints.length = {};

    if (minLength != null) {
      constraints.length.minimum = minLength;
    }

    if (maxLength != null) {
      constraints.length.maximum = maxLength;
    }
  }

  const validationResult = validate({ [id]: value }, { [id]: constraints });

  return validationResult && validationResult[id];
};

export const validateString = (id, value) => {
  const constraints = {
    presence: { allowEmpty: false },
  };

  if (value !== "") {
    constraints.format = {
      pattern: "[a-z]+",
      flags: "i",
      message: "value can only contain letters",
    };
  }

  const validationResult = validate({ [id]: value }, { [id]: constraints });

  return validationResult && validationResult;
};

export const validateEmail = (id, value) => {
  const constraints = {
    presence: { allowEmpty: false },
  };

  if (value !== "") {
    constraints.email = true;
  }

  const validationResult = validate({ [id]: value }, { [id]: constraints });

  return validationResult && validationResult;
};

export const validatePassword = (id, value) => {
  const constraints = {
    presence: { allowEmpty: false },
  };

  if (value !== "") {
    constraints.length = {
      minimum: 8,
      message: "must be at least 8 characters",
    };
  }

  const validationResult = validate({ [id]: value }, { [id]: constraints });

  return validationResult && validationResult;
};
export const validateConfirmPassword = (id, value) => {
  const { password, confirmPassword } = value;
  const constraints = {
    presence: { allowEmpty: false },
  };

  //   if (confirmPassword !== "") {
  //     constraints.equality = {
  //       attribute: "password", // The attribute to compare against
  //       message: "must match the original password",
  //     };
  //   }
  if (confirmPassword !== "") {
    if (confirmPassword !== password) {
      return { [id]: ["must match the original password"] };
    }
  }

  //   const validationResult = validate({ [id]: value }, { [id]: constraints });
  const validationResult = validate(
    { [id]: confirmPassword },
    { [id]: constraints }
  );

  return validationResult && validationResult;
};
