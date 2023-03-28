const {
	User,
	Project,
	Tools,
	ProjectTools,
	Categories,
} = require('../db/models');
const fs = require('fs');

module.exports = {
	getProfile: async (req, res, next) => {
		try {
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
			).then(() => {
				if (
					!user.profile_image.includes(
						'jpeg' &&
							!user.profile_image.includes(
								'png' && !user.profile_image.includes('jpg')
							)
					)
				) {
					fs.unlinkSync(user.profile_image);
				}
				return res.status(200).json({
					code: 200,
					status: 'OK',
					message: 'Success update profile',
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
};
