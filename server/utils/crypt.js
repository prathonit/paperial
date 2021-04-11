const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const hashPassword = async (plainTextPassword) => {
	let salt = await bcrypt.genSalt(10);
	let hashedPassword = await bcrypt.hash(plainTextPassword, salt);
	return hashedPassword;
};

const comparePassword = async (plainTextPassword, hashedPassword) => {
	try {
		let compareResult = await bcrypt.compare(plainTextPassword, hashedPassword);
		return compareResult;
	} catch (e) {
		return false;
	}
};

const generateRandomToken = async () => {
	let buffer = await crypto.randomBytes(32);
	return buffer.toString('hex');
};

module.exports = {
	hashPassword: hashPassword, 
	comparePassword: comparePassword,
	generateRandomToken: generateRandomToken
};