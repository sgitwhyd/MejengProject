const { User, Project } = require('../db/models');

module.exports = {
	getProfile: async (req, res, next) => {
		await User.findOne({
			where: { id: req.user.id },
			attributes: { exclude: ['password'] },
			include: 'project',
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
