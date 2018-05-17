const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateLoginInput = function (data) {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  // Email
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid email'
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required'
  }
  // Password
  if (!Validator.isLength(data.password, {
      min: 2,
      max: 30
    })) {
    errors.password = 'Password should be between 2 and 30 characters'
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }
  // End
  return ({
    errors,
    isValid: isEmpty(errors)
  })
}