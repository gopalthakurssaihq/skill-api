const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: { label: '' }
  },
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
};

module.exports = {
  add: (httpRequest) => {
    const schema = Joi.object({
      name: Joi.string().trim().required(),
      email: Joi.string().trim().lowercase().email().required(),
      employeeNumber: Joi.string().trim().required(),
      skills: Joi.array()
        .items(
          Joi.object({
            category: Joi.string().required(),
            name: Joi.string().trim().lowercase().required(),
            expertise: Joi.string().required()
          })
        )
        .unique((a, b) => a.name === b.name)
        .optional()
    });
    return schema.validate(httpRequest.body, options);
  },
  update: (httpRequest) => {
    const schema = Joi.object({
      name: Joi.string().trim().optional(),
      email: Joi.string().trim().lowercase().email().optional(),
      employeeNumber: Joi.string().trim().optional(),
      skills: Joi.array()
        .items(
          Joi.object({
            category: Joi.string().required(),
            name: Joi.string().trim().lowercase().required(),
            expertise: Joi.string().required()
          })
        )
        .unique((a, b) => a.name === b.name)
        .optional()
    });
    return schema.validate(httpRequest.body, options);
  }
};
