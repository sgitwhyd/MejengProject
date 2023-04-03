const { User } = require('../db/models');

module.exports = {
	getAllUsers: async (req, res, next) => {
		try {
			const totalUser = await User.count();
			const users = await User.findAll(
				{
					attributes: { exclude: ['password'] },
				},
				{
					include: 'project',
				}
			);

			return res.status(200).json({
				code: 200,
				status: 'OK',
				message: 'Success get all data user',
				amountUsers: totalUser,
				data: users,
			});
		} catch(err) {
			return res.status(500).json({
				code: 501,
				status: 'INTERNAL_SERVER_ERROR',
				error: {
					message: err.message,
				},
			});
		}
	},
	banUser: async (req, res, next) => {
		const { id } = req.body;

		if (!id) {
			return res.status(400).json({
				code: 400,
				status: 'BAD_REQUEST',
				error: {
					message: 'required body',
				},
			});
		} else {
			const isUserExist = await User.findOne({ where: { id } });
			if (isUserExist) {
				await User.update(
					{
						is_active: false,
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
							message: `user has been banned`,
						});
					})
					.catch((err) => {
						return res.status(500).json({
							code: 500,
							status: 'INTERNAL_SERVER_ERROR',
							error: {
								message: err.message,
							},
						});
					});
			} else {
				return res.status(404).json({
					code: 404,
					status: 'NOT_FOUND',
					error: {
						message: 'user not exist',
					},
				});
			}
		}
	},
	unBanUser: async (req, res, next) => {
		const { id } = req.body;

		if (!id) {
			return res.status(400).json({
				code: 400,
				status: 'BAD_REQUEST',
				error: {
					message: 'required body',
				},
			});
		} else {
			const isUserExist = await User.findOne({ where: { id } });
			if (isUserExist) {
				await User.update(
					{
						is_active: true,
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
							message: 'the user is no longer banned',
						});
					})
					.catch((err) => {
						return res.status(500).json({
							code: 500,
							status: 'INTERNAL_SERVER_ERROR',
							error: {
								message: err.message,
							},
						});
					});
			} else {
				return res.status(404).json({
					code: 404,
					status: 'NOT_FOUND',
					error: {
						message: 'user not exist',
					},
				});
			}
		}
	},
};
