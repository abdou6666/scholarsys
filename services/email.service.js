const ErrorResponse = require('../util/helpers/ErrorResponse');
const nodemailer = require('nodemailer');
const sendEmail = async (to, subject, body) => {
	let transporter = nodemailer.createTransport({
		service: 'Hotmail',
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD
		}
	});
	try {
		await transporter.sendMail({
			from: `<${process.env.EMAIL_USERNAME}>`, // sender address
			// 'abdousfayhitest@gmail.com',
			to, // list of receivers
			subject, // Subject line
			text: 'this the teest text', // plain text body
			html: body // html body
		});
	} catch (error) {
		throw ErrorResponse.internalError();
	}
};

module.exports = sendEmail;
