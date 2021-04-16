const Joi = require('joi');

// define the schema of the router here 
const schema = {
	a_id: Joi.string().required(),
	u_id: Joi.string().required(),
	pwd: Joi.string().min(3).required(),
	offset: Joi.number().required(),
	count: Joi.number().required(),
	r_type: Joi.string().required(),
	b_id: Joi.number().required(),
	b_name: Joi.string().required(),
	b_author: Joi.string().required(),
	b_genre: Joi.string().required(),
	b_desc: Joi.string().required(),
	b_img: Joi.string().required(),
	u_mail: Joi.string().email().required(),
	m_subject: Joi.string().required(),
	m_body: Joi.string().required(),
};

module.exports = schema;