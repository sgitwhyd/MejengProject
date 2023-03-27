const { User } = require('../db/models');

module.exports = {
	creatorRequired: async (req, res, next) => {
		const { id } = req.user;

		const user = await User.findOne({ where: { id } });
		if (!user)
			return res.status(401).json({
				status: false,
				message: 'Not found user',
				data: null,
			});

		if (!user.is_verify)
			return res.status(401).json({
				status: false,
				message:
					'you is not creator, request creator verification creator to upload your project',
				data: null,
			});

		next();
	},
};
