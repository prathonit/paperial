const reqlib = require('app-root-path').require;
const config = reqlib('/config.js');
const database = reqlib('/utils/db');
const response = reqlib('/utils/response').response;
const crypt = reqlib('/utils/crypt.js');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports.user_get_profile = async (req, res, next) => {
	let u_id = req.query.u_id;
	let sql = 'SELECT * FROM user WHERE u_id = ? LIMIT 1';
	let params = [u_id];
	try {
		let result = await database.call(sql, params);
		if (result.length === 1) {
			response.success(res, result[0]);
		} else {
			response.bad(res, {}, 'User does not exist', true);
		}
        
	} catch (e) {
		return next(e);
	}
};

module.exports.user_update_profile = async (req, res, next) => {
	let u_id = req.body.uid;
	let profile = {};
	profile.u_name = req.body.u_name;
	profile.u_mail = req.body.u_mail;
	profile.u_mob = req.body.u_mob;
	try {
		let sql = 'UPDATE user SET ? WHERE u_id = ?';
		let params = [u_id];
		await database.call(sql, params);
	} catch (e) {
		return next(e);
	}
    
};

module.exports.user_delete_profile = async (req, res, next) => {
	let u_id = req.body.u_id;
	let sql = 'DELETE FROM user WHERE u_id = ? LIMIT 1';
	try {
		await database.call(sql, []);
	} catch (e) {
		return next(e);
	}
};

module.exports.user_signup_profile = async (req, res, next) => {
	let user_profile = {};
	user_profile.u_name = req.body.u_name;
	user_profile.u_mail = req.body.u_mail;
	user_profile.u_id = user_profile.u_mail.split('@')[0]; // part before @ in the email for u_id
	user_profile.u_mob = req.body.u_mob;
	user_profile.u_fine = 0;
	user_profile.u_role = req.body.u_role;

	try {
		// first try to insert the user
		let sql = 'INSERT INTO user SET ?';
		let params = [user_profile];
		await database.call(sql, params);
		let pwd = req.body.pwd;
		console.log(pwd);
		let hashedPwd = await crypt.hashPassword(pwd);
		sql = 'INSERT INTO authentication SET ?';
		params = [{
			l_id: user_profile.u_id,
			l_pwd: hashedPwd
		}];
		await database.call(sql, params);
		// user is authorized create access token
		let accessTokenBody = {
			exp: Math.floor(Date.now() / 1000) + 24*60*60,
			u_id: user_profile.u_id,
			role: 'user'
		};
		try {
			let accessToken = jwt.sign(accessTokenBody, config.JWT_SECRET);
			response.created(res, {accessToken: accessToken}, 'Registered successfully');
		} catch (e) {
			next(createError(500, 'Error generating user token'));
		}
	} catch (e) {
		if (e.code === 'ER_DUP_ENTRY') {
			return next(createError(400, 'User with this email already exist'));
		}
		return next(e);
	}
};
