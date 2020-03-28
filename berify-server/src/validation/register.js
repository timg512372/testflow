const Validator = require("validator");
const isEmpty = require("./empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password_confirm = !isEmpty(data.password_confirm)
    ? data.password_confirm
    : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email must be a real address";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 to 30 chars";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (!Validator.isLength(data.password_confirm, { min: 6, max: 30 })) {
    errors.password_confirm = "Password must be between 6 to 30 chars";
  }

  if (!Validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = "Password and Confirm Password must match";
  }

  if (Validator.isEmpty(data.password_confirm)) {
    errors.password_confirm = "Confirm Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
