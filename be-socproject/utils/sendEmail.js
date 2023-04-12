const nodemailer = require('nodemailer');
const creatorActivation = require('../views/creatorActivation');
const projectBannedView = require('../views/projectBanned');
const forgot_password_email = require('../views/forgot_password');

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	requireTLS: true,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASS,
	},
});

const sendCreatorsVerification = async (res, email, token) => {
	const link = `${process.env.FE_BASE_URL_REQUEST_CREATOR}/${token}`;
	const mailOptions = {
		from: '"Mejeng 👻" <no-reply.gmail.com>',
		to: email,
		subject: 'Mejeng Creators Verification',
		html: creatorActivation(link),
	};

	await transporter
		.sendMail(mailOptions)
		.then(() => {
			return res.status(200).json({
				status: true,
				message: 'Creators Verification link has been sent to your email',
			});
		})
		.catch((err) => {
			return res.status(401).json({
				status: false,
				message: 'Creators Verification link failed to sent',
				error: err.message,
			});
		});
};

const sendBannedProjectNotification = async (res, client_url, { project }) => {
	const mailOptions = {
		from: '"Mejeng 👻" <no-reply.gmail.com>',
		to: project.user.email,
		subject: 'Project Banned',
		html: projectBannedView(project),
	};

	await transporter
		.sendMail(mailOptions)
		.then(() => {
			return res.status(200).json({
				status: true,
				message: 'Project Banned & Send Notif Successfully ',
			});
		})
		.catch((err) => {
			return res.status(401).json({
				status: false,
				message: 'Project Banned & Send Notif Successfully ',
				error: err.message,
			});
		});
};

const sendEmailForgotPassword = async (res, email, token) => {
	const mailOptions = {
		from: '"Mejeng 👻" <no-reply.gmail.com>',
		to: email,
		subject: 'Reset Your Mejeng Password',
		html: forgot_password_email(token, process.env.FE_BASE_URL),
	};

	await transporter
		.sendMail(mailOptions)

		.then(() => {
			return res.status(200).json({
				status: true,
				message: 'Link reset password has been sent to your email',
			});
		})
		.catch((err) => {
			return res.status(401).json({
				status: false,
				message: 'Link reset password failed to sent',
				error: err.message,
			});
		});
};

module.exports = {
	sendCreatorsVerification,
	sendBannedProjectNotification,
	sendEmailForgotPassword,
};
