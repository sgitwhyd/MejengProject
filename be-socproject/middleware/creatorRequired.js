const { User } = require('../db/models');

module.exports = {
	creatorRequired: async (req, res, next) => {
		const { id } = req.user;

		const user = await User.findOne({ where: { id } });
		if (!user)
			return res.status(404).json({
				code: 404,
				status: 'NOT_FOUND',
				error: {
					message: 'Not found user',
				},
			});

		if (!user.is_verify)
			return res.status(401).json({
				code: 401,
				status: 'UNAUTHORIZED',
				error: {
					message:
						'you is not creator, request creator verification creator to upload your project',
				},
			});

		next();
	},
};
