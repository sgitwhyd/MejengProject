const {
	User,
	Project,
	Tools,
	ProjectTools,
	Categories,
} = require('../db/models');
const fs = require('fs');
const path = require('path');

module.exports = {
	getProfile: async (req, res, next) => {
		await User.findOne({
			where: { id: req.user.id },
			attributes: { exclude: ['password'] },
			include: {
				model: Project,
				as: 'project',
				include: [
					{
						model: Tools,
						as: 'tools',
						attributes: ['name'],
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
		})
			.then((result) => {
				return res.status(201).json({
					status: true,
					message: 'Success get profile',
					data: result,
				});
			})
			.catch((err) => {
				return res.status(401).json({
					status: false,
					message: 'Failed get profile',
					error: err.message,
				});
			});
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
			await User.update(
				{
					name,
					description: desc,
					region,
					country,
					profile_image: user_image.path,
				},
				{
					where: {
						id,
					},
				}
			).then((result) => {
				fs.unlinkSync(path.normalize(user.profile_image));
				return res.status(201).json({
					status: true,
					message: 'Success update profile',
					data: result,
				});
			});
		} catch (error) {
			return res.status(401).json({
				status: false,
				message: 'Failed update profile',
				error: error.message,
			});
		}
	},
};
