const nodemailer = require('nodemailer');
const reqlib = require('app-root-path').require;
const config = reqlib('./config');

const isProduction = config.production || 0;

const transporter = nodemailer.createTransport({
	service: 'gmail', 
	auth: {
		user: config.MAIL_USER,
		pass: config.MAIL_PASSWORD, 
	},
});


const sendMail = async (mailRecipient, mailSubject, mailBody) => {
	if (isProduction === 1) {
		console.log('Not in production will not send actual mails');
		console.log('To:', mailRecipient, ' Subject:', mailSubject, 'Body:', mailBody);
		return;
	}
	try {
		let mailInfo = await transporter.sendMail({
			to: mailRecipient,
			subject: mailSubject,
			text: mailBody 
		});
		console.log(mailInfo);
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	sendMail: sendMail
};