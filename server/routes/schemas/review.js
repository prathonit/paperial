const Joi = require('Joi');

// define the schema of the router here 
const schema = {
	b_id: Joi.number().required(),
	offset: Joi.number().required(),
	count: Joi.number().required(),
	rating: Joi.number().required(),
	review: Joi.string(),
	o_id: Joi.number().required()
};

module.exports = schema;