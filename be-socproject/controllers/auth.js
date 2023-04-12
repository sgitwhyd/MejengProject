require('dotenv').config();
const { User, Profile } = require('../db/models');
const { use } = require('../routes/route');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendCreatorsVerification } = require('../utils/sendEmail');

const { JWT_SECRET_KEY } = process.env;
module.exports = {
	register: async (req, res, next) => {
		try {
			const { email, password, name } = req.body;

			const existUser = await User.findOne({ where: { email: email } });
			if (existUser) {
				return res.status(406).json({
					code: 406,
					status: 'Not Acceptable',
					error: 'Email Already Used!',
				});
			}

			const encryptPassword = await bcrypt.hash(password, 10);
			let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			if (!email.match(regex)) {
				return res.status(406).json({
					code: 406,
					status: 'Not Acceptable',
					error: 'email is not valid',
				});
			}
			// let strongRegex = /^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$/
			// if (!password.match(strongRegex)) {
			//     return res.status(400).json({
			//         message: 'password must have Capital, number and special character(minimum 8 character) '
			//     })
			// };

			await User.create({
				email: email,
				password: encryptPassword,
				name: name,
				profile_image: `https://ui-avatars.com/api/?name=${name}`,
			})
				.then(() => {
					return res.status(201).json({
						code: 201,
						status: 'Created',
						message: 'User has been created',
					});
				})
				.catch(() => {
					return res.status(500).json({
						code: 500,
						status: 'Internal Server Error',
						error: {
							message: 'User has not been created',
						},
					});
				});
		} catch (err) {
			return res.status(500).json({
				code: 500,
				status: 'Internal Server Error',
				error: {
					message: err.message,
				},
			});
		}
	},
	requestCreatorsVerifications: async (req, res, next) => {
		const { id, email, name } = req.user;

		const payload = {
			id,
			email,
			name,
		};

		const token = jwt.sign(payload, JWT_SECRET_KEY, {
			expiresIn: '15m',
		});

		await sendCreatorsVerification(res, email, token);
	},
	creatorsVerificationHandler: async (req, res, next) => {
		const token = req.params.token;

		if (token) {
			jwt.verify(token, JWT_SECRET_KEY, async (err, decodedToken) => {
				if (err) {
					return res.status(406).json({
						code: 406,
						status: 'Not Acceptable',
						error: {
							message: 'Incorret or expired link!. Please register again',
						},
					});
				} else {
					const { id } = decodedToken;
					const { is_verify } = await User.findOne({ where: { id: id } });
					if (is_verify) {
						return res.status(200).json({
							code: 200,
							status: 'OK',
							message: 'You re already is creator',
						});
					} else {
						await User.update(
							{
								is_verify: true,
							},
							{
								where: {
									id,
								},
							}
						)
							.then(() => {
								return res.status(200).json({
									code: 200,
									status: 'OK',
									message: 'You re now is creator',
								});
							})
							.catch((err) => {
								return res.status(500).json({
									code: 500,
									status: 'Internal Server Error',
									error: {
										message: err.message,
									},
								});
							});
					}
				}
			});
		}
	},
	login: async (req, res, next) => {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ where: { email: email } });
			if (!user) {
				return res.status(404).json({
					code: 404,
					status: 'Not Found',
					error: {
						message: 'User Not Found',
					},
				});
			}
			const isPassCorrect = await bcrypt.compare(password, user.password);
			if (!isPassCorrect) {
				return res.status(400).json({
					code: 400,
					status: 'Bad Request',
					error: {
						message: 'Password is not correct',
					},
				});
			}

			payload = {
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role,
				is_verify: user.is_verify,
			};
			const token = jwt.sign(payload, JWT_SECRET_KEY);

			return res.status(200).json({
				code: 200,
				status: 'OK',
				data: {
					token,
					role: user.role,
				},
			});
		} catch (err) {
			return res.status(500).json({
				code: 500,
				status: 'Internal Server Error',
				error: {
					message: err.message,
				},
			});
		}
	},
};
