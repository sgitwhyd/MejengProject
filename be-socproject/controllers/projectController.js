const {
	Project,
	productLikes,
	Categories,
	Tools,
	ProjectTools,
} = require('../db/models');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

module.exports = {
	createProject: async (req, res, next) => {
		try {
			const { CategoryId, ToolId, title, desc, url } = req.body;
			const userId = req.user.id;
			const pathProjectImage = [];
			const { project_image } = req.files;
			for (let image in project_image) {
				pathProjectImage.push(project_image[image].path);
			}
			if (!req.body) {
				return res.status(401).json({
					status: false,
					msg: 'Invalid payload',
				});
			} else if (!req.files) {
				return res.status(401).json({
					status: false,
					msg: 'File undifined',
				});
			} else {
				await Project.create({
					UserId: userId,
					CategoryId,
					title,
					desc,
					url,
					thumbnail_project_image: req.files.thumbnail_project_image[0].path,
					project_image: pathProjectImage,
				})
					.then(async (result) => {
						if (ToolId >= 1) {
							ProjectTools.create({
								ProjectId: result.id,
								ToolId,
							});
						} else {
							await Promise.all(
								ToolId.map((toolId) =>
									ProjectTools.create({
										ProjectId: result.id,
										ToolId: toolId,
									})
								)
							);
						}

						return res.status(200).json({
							status: true,
							msg: 'Project Upload Succesfully',
							data: result,
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
							await productLikes
								.destroy({
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
	getAllProject: async (req, res, next) => {
		try {
			const tes = await Project.findAll({
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
				],
			});

			return res.status(200).json({
				status: true,
				message: 'Display all project',
				data: tes,
			});
		} catch (error) {
			next(error);
		}
	},
	deleteProject: async (req, res, next) => {
		const { id } = req.body;
		try {
			await Project.findOne({
				where: {
					id,
				},
			}).then((result) => {
				if (result) {
					try {
						fs.unlinkSync(path.normalize(result.thumbnail_project_image));
						result.project_image.forEach((image) => {
							fs.unlinkSync(path.normalize(`${image}`));
						});
					} catch (error) {
						return res.status(401).json({
							status: false,
							message: 'Delete project failed',
							error: error.message,
						});
					}
					Project.destroy({
						where: {
							id,
						},
					}).then(async () => {
						await ProjectTools.findOne({
							where: {
								ProjectId: id,
							},
						}).then(async (result) => {
							await ProjectTools.destroy({
								where: {
									ProjectId: result.ProjectId,
								},
							});
						});

						await productLikes
							.findOne({
								where: {
									ProductId: id,
								},
							})
							.then(async (productLike) => {
								await productLikes.destroy({
									where: {
										ProductId: productLike.ProductId,
									},
								});
							});
						// jan lup buat hapus project report juga brow
						return res.status(200).json({
							status: true,
							message: 'Delete project success',
						});
					});
				} else {
					return res.status(401).json({
						status: false,
						message: 'Project not found',
					});
				}
			});
		} catch (error) {
			return res.status(401).json({
				status: false,
				message: 'Delete project failed',
				error: error.message,
			});
		}
	},
	reportProject: async (req, res, next) => {
		const { projectId, reportCategoryId } = req.body;

		if (!projectId || !reportCategoryId) {
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
				await ProjectReport.create({
					ProjectId: projectId,
					ReportCategoryId: reportCategoryId,
				})
					.then(() => {
						return res.status(200).json({
							status: true,
							msg: 'Report Succesfully',
						});
					})
					.catch((err) => {
						return res.status(401).json({
							status: false,
							msg: 'Report Failed',
						});
					});
			}
		}
	},
	getProductByCategory: async(req, res, next) =>{
		try {
			const { name } = req.body

			if(!name){
				res.status(400).json({
					message: 'Name not found'
				})
			}
			const projectCategory = await Categories.findOne({where: {name: name},
			include: [
					{
						model: Project,
						as: 'project',
						include:[ 
							{
								model: Tools,
								as: 'tools',
								attributes: ['slug', 'name'],
								through: {
									model: ProjectTools,
									as: 'projcetTools',
									attributes: { exclude: ['createdAt', 'updatedAt'] },
								},
							}
						]
					}
				]			
			})
			return res.status(201).json({
				status: true,
				message: 'Succes get project by categories',
				data: projectCategory
			})

		} catch (error) {
			next(error)
		}
	}

};
