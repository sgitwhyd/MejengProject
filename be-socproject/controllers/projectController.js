const {
	Project,
	productLikes,
	Categories,
	Tools,
	ProjectTools,
	ProjectReport,
	ReportCategories,
	User,
	Comment,
	RepliesComment,
} = require('../db/models');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const { sendBannedProjectNotification } = require('../utils/sendEmail');

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
				const slug = title.split(' ').join('-').toLowerCase();
				await Project.create({
					UserId: userId,
					CategoryId,
					title,
					slug,
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
						model: User,
						as: 'user',
						attributes: ['name'],
					},
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
						attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
					},
				],
			});

			return res.status(200).json({
				status: true,
				message: 'Display all project',
				ammount: tes.length,
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
				const alreadyReportProject = await ProjectReport.findOne({
					where: {
						UserId: req.user.id,
						ProjectId: projectId,
					},
				});

				if (!alreadyReportProject) {
					await ProjectReport.create({
						UserId: req.user.id,
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
				} else {
					return res.status(401).json({
						status: false,
						msg: 'You already report this project',
					});
				}
			}
		}
	},
	getDetailProject: async (req, res, next) => {
		const { slug } = req.params;
		try {
			const tes = await Project.findOne({
				where: {
					slug,
				},
				include: [
					{
						model: User,
						as: 'user',
						attributes: ['name'],
					},
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
						attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
					},
					{
						model: ReportCategories,
						as: 'projectReportCategories',
						attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
						through: {
							model: ProjectReport,
							as: 'projectReport',
							attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
						},
					},
					{
						model: Comment,
						as: 'comment',
						attributes: ['body'],
						include: [
							{
								model: User,
								as: 'user',
								attributes: ['name', 'email'],
							},
							{
								model: RepliesComment,
								as: 'repliesComment',
								attributes: ['body'],
								include: {
									model: User,
									as: 'user',
									attributes: ['name', 'email'],
								},
							},
						],
					},
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
	banProject: async (req, res, next) => {
		const CLIENT_URL = 'http://' + req.headers.host;
		const { id } = req.body;
		try {
			await Project.findOne({
				where: {
					id,
				},
				include: [
					{
						model: User,
						as: 'user',
						attributes: ['email', 'name'],
					},
					{
						model: ReportCategories,
						as: 'projectReportCategories',
						attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
						through: {
							model: ProjectReport,
							as: 'projectReport',
							attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
						},
					},
				],
			}).then((project) => {
				if (project) {
					Project.update(
						{
							is_active: false,
						},
						{
							where: {
								id,
							},
						}
					).then(async () => {
						await sendBannedProjectNotification(res, CLIENT_URL, { project });
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
				message: 'Ban project failed',
				error: error.message,
			});
		}
	},
	getProjectByCategory: async (req, res, next) => {
		try {
			const { slug } = req.params;

			if (!slug) {
				res.status(400).json({
					message: 'Name not found',
				});
			}
			const projectCategory = await Categories.findOne({
				where: { slug },
				include: [
					{
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
						],
					},
				],
			});
			return res.status(201).json({
				status: true,
				message: 'Succes get project by categories',
				data: projectCategory,
			});
		} catch (error) {
			next(error);
		}
	},
};
