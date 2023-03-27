const nodemailer = require('nodemailer');
const creatorActivation = require('../views/creatorActivation');
const projectBannedView = require('../views/projectBanned');

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

const sendCreatorsVerification = async (res, email, token, client_url) => {
	const link = `${client_url}/api/creators/activate/${token}`;
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

module.exports = {
	sendCreatorsVerification,
	sendBannedProjectNotification,
};
