const Joi = require('joi')

const createPublicationSchema = Joi.object({
  publication_type_id: Joi.string().required(),
  city_id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  content: Joi.string().required(),
  tags: Joi.array().required(),
  // images: Joi.array().min(1).max(3).required(),
})

module.exports = {
  createPublicationSchema
}