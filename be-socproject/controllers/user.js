const { User, Project, Tools, ProjectTools, Categories } = require('../db/models');

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
						attributes: ['slug', 'name'],
						through: {
							model: ProjectTools,
							as: 'projcetTools',
							attributes: { exclude: ['createdAt', 'updatedAt'] },
						},
					},
					{
						model: Categories,
						as: 'categories',
						attributes: {exclude: ['id','createdAt', 'updatedAt']}
					}
				]

				
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
};
