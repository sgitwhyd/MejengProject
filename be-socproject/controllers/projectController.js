const { Project, productLikes, Categories } = require('../db/models');
const { validationResult } = require('express-validator');

module.exports = {
	createProject: async (req, res, next) => {
		try {
			const { CategoryId, ToolId, title, desc, url } = req.body;
			const userId = req.user.id;
			if (!title || !desc) {
				return res.status(401).json({
					status: false,
					msg: 'Invalid payload',
				});
			} else {
				await Project.create({
					UserId: userId,
					CategoryId: CategoryId,
					ToolId: [ToolId],
					title,
					desc,
					url,
					// thumbnail_product_image,
					// product_image,
					// total_likes,
					// total_views
				})
					.then((result) => {
						return res.status(200).json({
							status: true,
							msg: 'Project Upload Succesfully',
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
			const all = await Project.findAll({
				include:[{
					model: Categories,
					as: "categories",
					attributes: {exclude: ["id","createdAt","updatedAt"]}
				}]
			})
			return res.status(200).json({
				status: true,
				message: 'Display all project',
				data: all
			});
	
		} catch (error) {
			next(error)
		}
	}    	
};
