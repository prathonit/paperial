const Joi = require('joi');

// define the schema of the router here 
const schema = {
	u_id: Joi.string().required(),
	b_id: Joi.number().required(),
	offset: Joi.number().required(),
	count: Joi.number().required(),
	categ: Joi.string().required(),
	sort: Joi.string().required()
};

module.exports = schema;