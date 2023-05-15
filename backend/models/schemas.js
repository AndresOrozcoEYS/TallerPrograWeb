const Joi = require("joi");

const schemas = {
  user: Joi.object().keys({
    name: Joi.string().min(3).max(100).pattern(new RegExp('^[a-zA-Z0-9\ ]{1,30}$')).required(),
    lastname: Joi.string().min(3).max(100).pattern(new RegExp('^[a-zA-Z0-9\ ]{1,30}$')).required(),
    username: Joi.string().min(3).max(100).pattern(new RegExp('^[a-zA-Z0-9\ ]{8,30}$')).required(),
    password: Joi.string().min(8),
    identification: Joi.number().min(3).max(9999999999).required(),
    active: Joi.boolean().required(),
    token: [Joi.string(), Joi.number()]
  }),

  sede: Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(10).required(),
    phone: Joi.string().alphanum().min(3).max(10).required(),
    location: Joi.string().alphanum().min(3).max(10).required(),
    city: Joi.string().alphanum().min(3).max(10).required(),
    address: Joi.string().alphanum().min(6).max(6).required(),
    zipcode: Joi.string().alphanum().min(6).max(6).required(),
    owners: Joi.array().items(Joi.string().alphanum().min(6)).required(),
    active: Joi.boolean().required(),
  })
};

module.exports = schemas;
