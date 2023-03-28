const { ProjectView, Project } = require('../db/models');

module.exports = {
	addingViews: async (req, res) => {
		try {
			const { projectId } = req.params;
			const { ip_address } = req.body;
			const userAlreadyViews = await ProjectView.findOne({
				where: {
					ip_address,
					ProjectId: projectId,
				},
			});

			const isProjectExist = await Project.findOne({
				where: {
					id: projectId,
				},
			});

			if (!isProjectExist) {
				res.status(404).json({
					code: 404,
					status: 'NOT_FOUND',
					error: {
						message: 'project not found',
					},
				});
			} else {
				if (userAlreadyViews) {
					return res.status(406).json({
						code: 406,
						status: 'Not Acceptable',
						error: {
							message: 'user already views this project',
						},
					});
				} else {
					Promise.all([
						ProjectView.create({
							ip_address,
							ProjectId: projectId,
						}),
						Project.increment('total_views', { where: { id: projectId } }),
					]).then(() => {
						return res.status(201).json({
							code: 201,
							status: 'CREATED',
							message: 'views created',
						});
					});
				}
			}
		} catch (error) {
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
