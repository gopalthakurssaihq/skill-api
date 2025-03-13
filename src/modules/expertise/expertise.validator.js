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
      name: Joi.string().required(),
      sequence: Joi.string().required()
    });
    return schema.validate(httpRequest.body, options);
  },
  update: (httpRequest) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      sequence: Joi.string().required()
    });
    return schema.validate(httpRequest.body, options);
  }
};
