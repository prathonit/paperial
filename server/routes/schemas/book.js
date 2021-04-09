const Joi = require('Joi');

// define the schema of the router here 
const schema = {
	u_id: Joi.string().required(),
	b_id: Joi.number().required(),
	offset: Joi.number().required(),
	count: Joi.number().required()
};

module.exports = schema;