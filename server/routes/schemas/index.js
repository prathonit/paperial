const Joi = require('joi');
const createError = require('http-errors');

const validateRequest = (routerName, requiredParams = [], reqType = 'get') => {
	return (req, res, next) => {
		const schema = require(`./${routerName}.js`);
		// we need to modify schema to only include the requiredParams
		let reqObject = (reqType == 'get') ? req.query : req.body;
		let requiredSchema = {};
		requiredParams.forEach(prop => {
			requiredSchema[prop] = schema[prop];
		});
		requiredSchema = Joi.object(requiredSchema);
            
		const options = {
			abortEarly: false,
			allowUnknown: true,
			stripUnknown: true
		};
    
		const { error, value } = requiredSchema.validate(reqObject, options);
    
		if (error) {
			return next(createError(400, `Validation error: ${error.details.map(x => x.message).join(', ')}`));
		} else {
			reqObject = value;
			return next();
		}
	};
};

module.exports = validateRequest;
