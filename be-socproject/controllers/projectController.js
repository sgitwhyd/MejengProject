const { Project, productLikes, Categories, Tools, ProjectTools } = require('../db/models');
const { validationResult } = require('express-validator');

module.exports = {
	createProject: async (req, res, next) => {
		try {
			const { CategoryId, ToolId, title, desc, url } = req.body;
			const userId = req.user.id;
			const img = req.file.path
			if (!title || !desc) {
				return res.status(401).json({
					status: false,
					msg: 'Invalid payload',
				});
			}
			else if (!req.file) {
				return res.status(401).json({
					status: false,
					msg: 'File undifined',
				});
			}
			 else {
				await Project.create({
					UserId: userId,
					CategoryId,
					title,
					desc,
					url,
					thumbnail_project_image:  img
					// product_image,
					// total_likes,
					// total_views
				})
					.then(async(result) => {
						// await ProjectTools.create({
						// 	ProjectId: result.id,
						// 	ToolId
						// })
						await Promise.all(ToolId.map(toolId => 
							ProjectTools.create({
								ProjectId: result.id, 
								ToolId: toolId
							})
						))
						return res.status(200).json({
							status: true,
							msg: 'Project Upload Succesfully',
							data: result
						});
					})
					.catch((err) => {
						return res.status(401).json({
							status: false,
							msg: 'Project Upload Failed',
							error: err.message,
						});
					});
					
			}
		} catch (error) {
			return res.status(401).json({
				status: false,
				msg: 'Project Upload Failed',
				err: error.message,
			});
		}
	},
	likeProject: async (req, res, next) => {
		const { projectId } = req.body;

		if (!projectId) {
			return res.status(401).json({
				status: false,
				msg: 'Invalid payload',
			});
		} else {
			const isProjectExist = await Project.findOne({
				where: {
					id: projectId,
				},
			});

			if (!isProjectExist) {
				return res.status(401).json({
					status: false,
					message: 'Project Not Found',
				});
			} else {
				const userId = req.user.id;
				console.log(userId);
				await productLikes
					.findOne({
						where: {
							ProductId: projectId,
							UserId: userId,
						},
					})
					.then(async (product_like) => {
						if (!product_like) {
							await productLikes
								.create({
									ProductId: projectId,
									UserId: userId,
								})
								.then(() => {
									return res.status(200).json({
										status: true,
										msg: 'Liked Succesfully',
									});
								})
								.catch((err) => {
									return res.status(401).json({
										status: false,
										msg: 'Liked Failed',
									});
								});
						} else {
							await productLikes.destroy({
									where: {
										id: product_like.id,
									},
								})
								.then(() => {
									return res.status(200).json({
										status: true,
										message: 'Successfully removed like',
									});
								});
						}

						const totalLikes = await productLikes.count({
							where: {
								ProductId: projectId,
							},
						});

						await Project.update(
							{
								total_likes: totalLikes,
							},
							{
								where: {
									id: projectId,
								},
							}
						);
					})
					.catch((err) => {
						return res.status(401).json({
							status: false,
							err: err.message,
						});
					});
			}
		}
	},
	getAllProject: async(req, res,next) => {
		try {
			const tes = await Project.findAll({include: [{
				model: Tools,
				as: 'tools',
				attributes: ['id', 'name'],
				through: {
					model: ProjectTools,
					as: 'projcetTools',
					attributes: {exclude: ['createdAt', 'updatedAt']}
				}
			}]})

			return res.status(200).json({
				status: true,
				message: 'Display all project',
				data: tes
			});
	
		} catch (error) {
			next(error)
		}
	},
	// postProjectTool: async(req, res, next) => {
	// 	try {
	// 		const {ProjectId, ToolId} = req.body

	// 		await ProjectTools.create
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }    	
};
