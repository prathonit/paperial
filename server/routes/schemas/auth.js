const Joi = require('Joi');

// define the schema of the router here 
const schema = {
	u_id: Joi.string().required(),
	a_id: Joi.string().required(),
	pwd: Joi.string().min(3).required()
};

module.exports = schema;