const Joi = require('joi');

// define the schema of the router here 
const schema = {
	u_id: Joi.string().required(),
	u_name: Joi.string().min(3).required(),
	u_mail: Joi.string().email().required(),
	u_mob: Joi.string().min(10).required(),
	u_fine: Joi.number().min(0).required(),
	u_role: Joi.string().min(2),
	pwd: Joi.string().min(3).required(),
	c_pwd: Joi.string().min(3).required(),
	n_pwd: Joi.string().min(3).required()
};

module.exports = schema;