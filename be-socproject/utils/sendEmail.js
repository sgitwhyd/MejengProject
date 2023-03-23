const nodemailer = require('nodemailer');

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
	const mailOptions = {
		from: '"Mejeng 👻" <no-reply.gmail.com>',
		to: email,
		subject: 'Mejeng Creators Verification',
		html: `<p>Silahkan klik link dibawah ini  untuk aktivasi email anda</p><a href="${client_url}/api/creators/activate/${token}">
						Verification Email
						</a>
            <p>Link akan expired dalam waktu 15 Menit`,
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
		html: `<p>Project anda telah di banned oleh admin</p><a href="${client_url}/api/project/detail/${project.slug}">
link to your project
						</a>`,
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
