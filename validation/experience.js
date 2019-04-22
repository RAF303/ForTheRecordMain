const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.band = !isEmpty(data.band) ? data.band : "";
  data.title = !isEmpty(data.title) ? data.title : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title field is required";
  }

  if (Validator.isEmpty(data.band)) {
    errors.band = "band field is required";
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
