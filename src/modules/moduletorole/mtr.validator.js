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
      roleSlug: Joi.string().required(),
      modules: Joi.array().items(
        Joi.object({
          value: Joi.string().required(),
          operations: Joi.array().items(Joi.string()).required()
        }).required()
      ).required()
    });
    return schema.validate(httpRequest.body, options);
  },
  update: (httpRequest) => {
    const schema =  Joi.object({
      roleSlug: Joi.string().required(),
      modules: Joi.array().items(
        Joi.object({
          value: Joi.string().required(),
          operations: Joi.array().items(Joi.string()).required()
        }).required()
      ).required()
    });
    return schema.validate(httpRequest.body, options);
  }
};
