const reqlib = require('app-root-path').require;
const config = reqlib('/config.js');
const database = reqlib('/utils/db');
const response = reqlib('/utils/response').response;
const jwt = require('jsonwebtoken');
const crypt = reqlib('/utils/crypt.js');
const createError = require('http-errors');

module.exports.auth_login_user = async (req, res, next) => {
	let u_id = req.body.u_id;
	let pwd = req.body.pwd;
    
	try {
		let sql = 'SELECT authentication.l_pwd FROM authentication INNER JOIN user ON user.u_id = authentication.l_id WHERE authentication.l_id = ? LIMIT 1';
		let params = [u_id];
		let result = await database.call(sql, params);
		if (result.length === 0) {
			throw createError(400, 'User not found');
		}
		let passwordMatch = await crypt.comparePassword(pwd, result[0].l_pwd);
		if (passwordMatch) {
			// user is authorized create access token
			let accessTokenBody = {
				exp: Math.floor(Date.now() / 1000) + 24*60*60,
				u_id: u_id,
				role: 'user'
			};
			try {
				let accessToken = jwt.sign(accessTokenBody, config.JWT_SECRET);
				response.success(res, {accessToken: accessToken}, 'Login successful');
			} catch (e) {
				next(createError(500, 'Error generating user token'));
			}
		} else {
			throw createError(401, 'Incorrect username/password');
		}
	} catch (e) {
		return next(e);
	}
};

module.exports.auth_login_admin = async (req, res, next) => {
	let a_id = req.body.a_id;
	let pwd = req.body.pwd;
    
	try {
		let sql = 'SELECT authentication.l_pwd FROM authentication INNER JOIN admin ON admin.a_id = authentication.l_id WHERE authentication.l_id = ? LIMIT 1';
		let params = [a_id];
		let result = await database.call(sql, params);
		if (result.length === 0) {
			throw createError(400, 'Admin user not found');
		}
		let passwordMatch = await crypt.comparePassword(pwd, result[0].l_pwd);
		if (passwordMatch) {
			// user is authorized create access token
			let accessTokenBody = {
				exp: Math.floor(Date.now() / 1000) + 24*60*60, // 24 hrs 
				a_id: a_id,
				role: 'admin'
			};
			try {
				let accessToken = jwt.sign(accessTokenBody, config.JWT_SECRET);
				response.success(res, {accessToken: accessToken}, 'Login successful');
			} catch {
				next(createError(500, 'Error generating admin user token'));
			}
		} else {
			throw createError(401, 'Incorrect username/password');
		}
	} catch (e) {
		return next(e);
	}
};