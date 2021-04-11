const Joi = require('Joi');

// define the schema of the router here 
const schema = {
	a_id: Joi.string().required(),
	u_id: Joi.string().required(),
	pwd: Joi.string().min(3).required(),
	offset: Joi.number().required(),
	count: Joi.number().required()
};

module.exports = schema;