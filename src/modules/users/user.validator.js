const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const options = {
  errors: {
    wrap: {
      label: ''
    }
  },
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
};

module.exports = {
  add: (httpRequest) => {
    const schema = Joi.object({
      email: Joi.string().required(),
      role: Joi.string().required(),
      password: Joi.string().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$#!%*?&]{8,}$')).optional(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      employeeNumber: Joi.string().required(),
      displayName: Joi.string().required()
    });
    return schema.validate(httpRequest.body, options);
  },
  update: (httpRequest) => {
    const schema = Joi.object({
      email: Joi.string().required(),
      role: Joi.string().required(),
      password: Joi.string().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$#!%*?&]{8,}$')).optional(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      employeeNumber: Joi.string().required(),
      displayName: Joi.string().required()
    });
    return schema.validate(httpRequest.body, options);
  }
};
