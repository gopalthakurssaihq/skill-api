const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

module.exports = {
  /**
   * Validates user creation (registration) data.
   * @param {object} httpRequest - The HTTP request object.
   * @param {object} httpRequest.body - The request body.
   * @param {string} httpRequest.body.email - The email to validate.
   * @param {string} httpRequest.body.mobile - The mobile number to validate.
   * @param {string} httpRequest.body.password - The password to validate.
   * @param {string} httpRequest.body.role - The role to validate.
   * @returns {object} - The validation result.
   */
  validateUserCreation: (httpRequest) => {
    const schema = Joi.object({
      email: Joi.string()
        .email()
        .required()
        .messages({
          'string.email': 'Provide a valid email!',
          'any.required': 'Email is required!',
        }),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      employeeNumber: Joi.string().required(),
      password: Joi.string()
        .min(8)
        .required()
        .messages({
          'string.min': 'Password must be at least 8 characters!',
          'any.required': 'Password is required!',
        }),
      role: Joi.string()
        .valid('USER', 'ADMIN')
        .required()
        .messages({
          'any.only': 'Role must be either USER or ADMIN!',
          'any.required': 'Role is required!',
        }),
    });
    return schema.validate(httpRequest.body, options);
  },

  /**
   * Validates user login data.
   * @param {object} httpRequest - The HTTP request object.
   * @param {object} httpRequest.body - The request body.
   * @param {string} httpRequest.body.identifier - The email or mobile number to validate.
   * @param {string} httpRequest.body.password - The password to validate.
   * @returns {object} - The validation result.
   */
  validateUserLogin: (httpRequest) => {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string()
        .min(8)
        .required(),
    });
    return schema.validate(httpRequest.body, options);
  }
};
