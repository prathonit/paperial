const reqlib = require('app-root-path').require;
const config = reqlib('/config.js');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const authorizeRequest = (role = 'user', whitelist = []) => {
	return (req, res, next) => {
		// allowing whitelisted routes 
		if (whitelist.includes(req.path)) {
			return next();
		}
		if (!req.headers.authorization) {
			return next(createError(401, 'Access token not found'));
		}
		try {
			let accessToken = req.headers.authorization.split(' ')[1];
			let decodedAccessToken = jwt.verify(accessToken, config.JWT_SECRET);
			let claimedRole = decodedAccessToken.role || '';
			if (claimedRole === role) {
				if (role === 'user') {
					let u_id = decodedAccessToken.u_id;
					req.query.u_id = u_id;
					req.body.u_id = u_id;
				} else {
					let a_id = decodedAccessToken.a_id;
					req.query.a_id = a_id;
					req.body.a_id = a_id;
				}
				return next();
			}
			return next(createError(401, 'Unauthorized user'));
		} catch (e) {
			return next(e);
		}
	};
};

module.exports = authorizeRequest;