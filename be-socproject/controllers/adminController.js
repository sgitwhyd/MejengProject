const {
	User,
	Project,
	ProjectReport,
	ReportCategories,
} = require('../db/models');
const { Sequelize } = require('sequelize');

module.exports = {
	getAllUsers: async (req, res, next) => {
		try {
			const totalUser = await User.count();
			const userActive = await User.count({
				where: {
					is_active : true
				}
			})
			const totalCreator = await User.count({
				where : {
					is_verify : true
				}
			})
			await User.findAll({
				attributes: {
					exclude: ['id', 'password', 'createdAt', 'updatedAt'],
				},

				include: {
					model: Project,
					as: 'project',
					attributes: {
						exclude: ['id', 'UserId', 'CategoryId'],
					},
					include: {
						model: ReportCategories,
						as: 'projectReportCategories',
						through: {
							model: ProjectReport,
							as: 'report',
							attributes: [],
						},
						attributes: {
							exclude: ['id', 'createdAt', 'updatedAt'],
						},
					},
				},
			})
				.then((result) => {
					const users = result.map((user) => {
						const { project } = user;
						const total_project_report = project.reduce((acc, cur) => {
							return acc + cur.projectReportCategories.length;
						}, 0);

						const total_project_like = project.reduce((acc, cur) => {
							return acc + cur.total_likes;
						}, 0);

						const total_views_project = project.reduce((acc, cur) => {
							return acc + cur.total_views;
						}, 0)

						const total_project = project.length;


						return {
							total_project_report,
							total_project_like,
							total_views_project,
							total_project,
							...user.dataValues,

						};
					});

					return res.status(200).json({
						code: 200,
						status: 'OK',
						message: 'Success get all data user',
						amountUsers: totalUser,
						totalUserActive: userActive,
						totalUserCreator : totalCreator,
						data: users,
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
		} catch (err) {
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
