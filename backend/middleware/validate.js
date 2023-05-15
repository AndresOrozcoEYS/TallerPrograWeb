const { valid } = require("joi");
const Joi = require("joi")

const validate = (schema) => {
  return (req, res, next)  => { 
    const {error } = schema.validate (req.body);

    if (error == undefined)
      next()
    else {
      const {details} = error
      const message = details.map (q=> q.message).join()
      res.status(422).json({error: message})
    }
  }
}


module.exports = validate
