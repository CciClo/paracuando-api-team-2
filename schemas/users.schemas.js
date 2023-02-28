const Joi = require('joi')

const updatedUserSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  country_id: Joi.string().required(), /// se puede cambiar por number si es necesario
})

module.exports = {
  updatedUserSchema
}