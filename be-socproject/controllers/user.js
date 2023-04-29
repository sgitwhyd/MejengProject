const {
	User,
	Project,
	Tools,
	ProjectTools,
	Categories,
	productLikes
} = require('../db/models');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { sendEmailForgotPassword } = require('../utils/sendEmail');
const bcrypt = require('bcrypt');
const project = require('../db/models/project');

module.exports = {
	getProfile: async (req, res, next) => {
		try {
			const profile = await User.findOne({
				where: { id: req.user.id },
				attributes: { exclude: ['password'] },
				include: {
					model: Project,
					as: 'project',
					include: [
						{
							model: User,
							as :'user',
							attributes: ['name', 'profile_image']
						},
						{
							model: Tools,
							as: 'tools',
							attributes: ['name', 'icon'],
							through: {
								model: ProjectTools,
								as: 'projcetTools',
								attributes: { exclude: ['createdAt', 'updatedAt'] },
							},
						},
						{
							model: Categories,
							as: 'categories',
							attributes: { exclude: ['id', 'slug', 'createdAt', 'updatedAt'] },
						},
					],					
				},
				order: [[{ model: Project, as: 'project' }, 'createdAt', 'DESC']]
			})

			const userLike = await productLikes.findAll({
				where: {
					UserId : req.user.id
				},
				attributes: ['ProjectId']
			})			
			return res.status(200).json({
				code: 200,
				status: 'OK',
				message: 'Success get profile',
				projectAmmount: profile.project.length,
				data: {
					profile,
					userLike
				}
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
	getOtherProfile: async (req, res, next) => {
		try {
			const { id } = req.body;
			await User.findOne({
				where: { id },
				attributes: { exclude: ['id', 'password'] },
				include: {
					model: Project,
					as: 'project',
					include: [
						{
							model: User,
							as :'user',
							attributes: ['name', 'profile_image']
						},
						{
							model: Tools,
							as: 'tools',
							attributes: ['name', 'icon'],
							through: {
								model: ProjectTools,
								as: 'projcetTools',
								attributes: { exclude: ['createdAt', 'updatedAt'] },
							},
						},
						{
							model: Categories,
							as: 'categories',
							attributes: { exclude: ['id', 'slug', 'createdAt', 'updatedAt'] },
						},
					],
				},
			}).then((result) => {
				return res.status(200).json({
					code: 200,
					status: 'OK',
					message: 'Success get profile',
					projectAmmount: result.project.length,
					data: result,
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
	updateProfile: async (req, res, next) => {
		const { id } = req.user;
		const { name, desc, region, country } = req.body;
		const user_image = req.file;

		const user = await User.findOne({
			where: { id },
			attributes: { exclude: ['password'] },
		});

		try {
			if (user_image) {
				if (user.profile_image.includes('api')) {
					await User.update(
						{
							name,
							description: desc,
							region,
							country,
							profile_image: user_image.path,
						},
						{ where: { id } }
					);
				} else {
					fs.unlinkSync(path.normalize(user.profile_image));
					await User.update(
						{
							name,
							description: desc,
							region,
							country,
							profile_image: user_image.path,
						},
						{ where: { id } }
					);
				}
			} else {
				await User.update(
					{
						name,
						description: desc,
						region,
						country,
					},
					{ where: { id } }
				);
			}

			return res.status(200).json({
				code: 200,
				status: 'OK',
				message: 'Success update profile',
			});
			// end logic
		} catch (err) {
			if (user_image) {
				fs.unlinkSync(user_image.path);
			}
			console.log(err);
			return res.status(500).json({
				code: 500,
				status: 'Internal Server Error',
				error: {
					message: err.message,
				},
			});
		}
	},
	forgotPassword: async (req, res) => {
		const { email } = req.body;

		if (!req.query.token) {
			if (!email) {
				return res.status(400).json({
					code: 400,
					status: 'Bad Request',
					message: 'Email is required',
				});
			} else {
				try {
					const user = await User.findOne({
						where: { email },
					});

					if (!user) {
						return res.status(404).json({
							code: 404,
							status: 'Not Found',
							message: 'Email not found',
						});
					} else {
						const token = jwt.sign(
							{
								email: user.email,
								id: user.id,
							},
							process.env.JWT_SECRET_KEY,
							{
								expiresIn: '5m',
							}
						);

						await sendEmailForgotPassword(res, user.email, token);
					}
				} catch (err) {
					return res.status(500).json({
						code: 500,
						status: 'Internal Server Error',
						error: {
							message: err.message,
						},
					});
				}
			}
		} else {
			const { token } = req.query;
			const { new_password } = req.body;

			if (!new_password) {
				return res.status(400).json({
					code: 400,
					status: 'Bad Request',
					message: 'New password is required',
				});
			} else {
				try {
					const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
					if (!decoded) {
						return res.status(401).json({
							code: 401,
							status: 'Unauthorized',
							message: 'Token is invalid',
						});
					} else {
						const encryptPassword = await bcrypt.hash(new_password, 10);
						await User.update(
							{
								password: encryptPassword,
							},
							{ where: { id: decoded.id } }
						);

						return res.status(200).json({
							code: 200,
							status: 'OK',
							message: 'Success update password',
						});
					}
				} catch (err) {
					return res.status(500).json({
						code: 500,
						status: 'Internal Server Error',
						error: {
							message: err.message,
						},
					});
				}
			}
		}
	},
};
