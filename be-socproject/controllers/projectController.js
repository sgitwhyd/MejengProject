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
	ProjectView,
	Sequelize,
} = require('../db/models');
const fs = require('fs');
const path = require('path');
const { sendBannedProjectNotification } = require('../utils/sendEmail');

module.exports = {
	createProject: async (req, res, next) => {
		const { CategoryId, ToolId, title, desc, url } = req.body;
		const userId = req.user.id;
		const pathProjectImage = [];
		const { project_image, thumbnail_project_image } = req.files;
		try {
			for (let image in project_image) {
				pathProjectImage.push(project_image[image].path);
			}
			if (!req.body || !req.files) {
				return res.status(400).json({
					code: 400,
					status: 'BAD_REQUEST',
					error: { message: 'required body' },
				});
			} else {
				const isProjectTitleTaken = await Project.findOne({ where: { title } });
				const slug = title.split(' ').join('-').toLowerCase();

				if (isProjectTitleTaken) {
					fs.unlinkSync(thumbnail_project_image[0].path);
					for (let image in project_image) {
						fs.unlinkSync(project_image[image].path);
					}
					return res.status(406).json({
						code: 406,
						status: 'NOT_ACCEPTABLE',
						error: {
							message: 'Project title already taken',
						},
					});
				} else {
					await Project.create({
						UserId: userId,
						CategoryId,
						title,
						slug,
						desc,
						url,
						thumbnail_project_image: req.files.thumbnail_project_image[0].path,
						project_image:
							pathProjectImage.length < 1 ? null : pathProjectImage,
					}).then(async (result) => {
						if (ToolId >= 1) {
							ProjectTools.create({
								ProjectId: result.id,
								ToolId,
							});
						} else {
							await Promise.all(
								ToolId.split(',').map((toolId) =>
									ProjectTools.create({
										ProjectId: result.id,
										ToolId: toolId,
									})
								)
							);
						}

						return res.status(201).json({
							code: 201,
							status: 'CREATED',
							message: 'Project Upload Succesfully',
							data: result,
						});
					});
				}
			}
		} catch (err) {
			fs.unlinkSync(thumbnail_project_image[0].path);
			for (let image in project_image) {
				fs.unlinkSync(project_image[image].path);
			}
			return res.status(500).json({
				code: 500,
				status: 'Internal Server Error',
				error: {
					message: err.message,
				},
			});
		}
	},
	likeProject: async (req, res, next) => {
		const { projectId } = req.body;

		if (!projectId) {
			return res.status(400).json({
				code: 400,
				status: 'BAD_REQUEST',
				error: { message: 'required body' },
			});
		} else {
			const isProjectExist = await Project.findOne({
				where: {
					id: projectId,
				},
			});

			if (!isProjectExist) {
				return res.status(404).json({
					code: 404,
					status: 'NOT_FOUND',
					error: {
						message: 'Project Not Found',
					},
				});
			} else {
				const userId = req.user.id;
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
								.then(async () => {
									await Project.increment('total_likes', {
										where: {
											id: projectId,
										},
									});
									return res.status(200).json({
										code: 200,
										status: 'OK',
										message: 'Liked Succesfully',
									});
								})
								.catch((err) => {
									return res.status(500).json({
										code: 500,
										status: 'Internal Server Error',
										error: {
											message: err.message,
										},
									});
								});
						} else {
							await productLikes
								.destroy({
									where: {
										id: product_like.id,
									},
								})
								.then(async () => {
									await Project.decrement('total_likes', {
										where: {
											id: projectId,
										},
									});
									return res.status(200).json({
										code: 200,
										status: 'OK',
										message: 'Successfully removed like',
									});
								});
						}
					})
					.catch((err) => {
						return res.status(500).json({
							code: 500,
							status: 'Internal Server Error',
							error: {
								message: err.message,
							},
						});
					});
			}
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
					} catch (err) {
						return res.status(500).json({
							code: 500,
							status: 'Internal Server Error',
							error: {
								message: err.message,
							},
						});
					}
					Project.destroy({
						where: {
							id,
						},
					}).then(async () => {
						// hapus project tools, report, like, view, comment
						Promise.all([
							ProjectTools.destroy({
								where: {
									ProjectId: id,
								},
							}),
							ProjectReport.destroy({
								where: {
									ProjectId: id,
								},
							}),
							productLikes.destroy({
								where: {
									ProductId: id,
								},
							}),
							ProjectView.destroy({
								where: {
									ProjectId: id,
								},
							}),
							Comment.findOne({
								where: {
									ProjectId: id,
								},
							}).then((comment) => {
								Promise.all([
									Comment.destroy({
										where: {
											ProjectId: id,
										},
									}),
									comment?.id
										? RepliesComment.destroy({
												where: {
													CommentId: comment.id,
												},
										  })
										: null,
								]);
							}),
						]).then(() => {
							return res.status(200).json({
								code: 200,
								status: 'OK',
								message: 'Delete project success',
							});
						});
					});
				} else {
					return res.status(404).json({
						code: 404,
						status: 'NOT_FOUND',
						error: {
							message: 'Project not found',
						},
					});
				}
			});
		} catch (err) {
			return res.status(500).json({
				code: 500,
				status: 'Internal Server Error',
				error: {
					message: err.message,
				},
			});
		}
	},
	reportProject: async (req, res, next) => {
		const { projectId, reportCategoryId, name } = req.body;

		if (!req.body) {
			return res.status(400).json({
				code: 400,
				status: 'BAD_REQUEST',
				error: { message: 'required body' },
			});
		} else {
			const isProjectExist = await Project.findOne({
				where: {
					id: projectId,
				},
			});

			if (!isProjectExist) {
				return res.status(400).json({
					code: 400,
					status: 'BAD_REQUEST',
					error: { message: 'Project NOT FOUND' },
				});
			} else {
				try {
					console.log(req.user, projectId)					
					const alreadyReportProject = await ProjectReport.findOne({
						where: {
							UserId: req.user.id,
							ProjectId: projectId,
						},
					});
					let reportCategory = await ReportCategories.findOne({
						where: {
							name
						}
					})

					if (!reportCategory) {
						reportCategory = await ReportCategories.create({
							name: name,
							slug: name.split(' ').join('-').toLowerCase()
						})
					}
					console.log(alreadyReportProject)
					if (!alreadyReportProject) {
						await ProjectReport.create({
							UserId: req.user.id,
							ProjectId: projectId,
							ReportCategoryId: reportCategory.id
						}).then(()=>{
							return res.status(201).json({
								code: 201,
								status: 'Created',
								message: 'Report Project Created'
							})
						})
					} 
					else if (reportCategoryId){
						await ProjectReport.update({
							ReportCategoryId: reportCategoryId
						},{
							where: {
								id: alreadyReportProject.id
							}
						}).then(()=>{
							return res.status(201).json({
								code: 201,
								status: 'Created',
								message: 'Report Project Created'
							})
						})
					} 
					else {						
						return res.status(406).json({
							code: 406,
							statusb: 'Not Acceptable',
							message: 'You already report this project'
						})
					}

				} catch (err) {
					return res.status(500).json({
						code: 500,
						status: 'Internal Server Error',
						error: {
							message: err.message,
						},
					});
				}
			}
		}
	},
	getDetailProject: async (req, res, next) => {
		const { id } = req.params;
		try {
			const project = await Project.findOne({
				where: {
					id,
				},
				include: [
					{
						model: User,
						as: 'user',
						attributes: ['id', 'name', 'profile_image'],
					},
					{
						model: Tools,
						as: 'tools',
						attributes: {
							exclude: ['id', 'createdAt', 'updatedAt'],
						},
						through: {
							model: ProjectTools,
							as: 'projcetTools',
							attributes: { exclude: ['createdAt', 'updatedAt'] },
						},
					},
					{
						model: Categories,
						as: 'categories',
						attributes: { exclude: ['id',  'createdAt', 'updatedAt'] },
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
								attributes: ['name', 'profile_image'],
							},
							{
								model: RepliesComment,
								as: 'repliesComment',
								attributes: ['body'],
								include: {
									model: User,
									as: 'user',
									attributes: ['name', 'profile_image'],
								},
							},
						],
					},
				],
			});


			const projectByUser = await Project.findAll({
				where: {
					UserId : project.UserId
				},
				limit: 4
			});

			const projectByCategory = await Project.findAll({
				where: {
					CategoryId: project.CategoryId
				},
				limit: 4
			});

			if (project) {
				return res.status(200).json({
					code: 200,
					status: 'OK',
					message: 'Get detail project success',
					data: {
						project,
						projectByUser,
						projectByCategory
					}
				});
			} else {
				return res.status(404).json({
					code: 404,
					status: 'NOT_FOUND',
					error: {
						message: 'Project not found',
					},
				});
			}
		} catch (err) {
			return res.status(500).json({
				code: 500,
				status: 'Internal Server Error',
				error: {
					message: err.message,
				},
			});
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
						attributes: ['name', 'profile_image'],
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
					return res.status(404).json({
						code: 404,
						status: 'NOT_FOUND',
						error: {
							message: 'Project not found',
						},
					});
				}
			});
		} catch (err) {
			return res.status(500).json({
				code: 500,
				status: 'Internal Server Error',
				error: {
					message: err.message,
				},
			});
		}
	},
	getAllProjectSearch: async(req, res, next) => {
		try {
			let title = "";
			let category = "";
			let tool = [];
			
			if(req.query.title){
				title = req.query.title
			}
			if(req.query.category){
				category = req.query.category
			}
			if(req.query.tool){
				tool = req.query.tool.split(',')
			}

			if (!req.query) {
				await Project.findAll({
					where :{
						is_active : true
					},
					include: [
						{
							model: User,
							as: 'user',
							attributes: ['name', 'profile_image'],
						},
						{
							model: Tools,
							as: 'tools',
							attributes: {
								exclude: ['id', 'createdAt', 'updatedAt'],
							},
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
					]
				}).then((project) => {
					return res.status(201).json({
						code: 201,
						status: 'Succes Find Project',
						project
					})
				})
			}else{
				const whereFilter = {
					[Sequelize.Op.and]: [
						{title: {[Sequelize.Op.iLike]: `%${title}%`}},
						{"$categories.slug$" : {[Sequelize.Op.iLike]: `%${category}%`}}
					]
				}
				
				if (tool.length > 0) {
					whereFilter[Sequelize.Op.and].push({'$tools.slug$': {[Sequelize.Op.in]: tool}})
				}
				
				Project.findAll({
					include: [					
						{
							model: Tools,
							as: 'tools',
							attributes: {
								exclude: ['id', 'createdAt', 'updatedAt'],
							},
							through: {
								model: ProjectTools,
								as: 'projcetTools',
								attributes: { exclude: ['createdAt', 'updatedAt'] },
							},
						},
						{
							model: Categories,
							as: 'categories',
							attributes:  ['slug', 'name'],
						},
					],
					where: {
						[Sequelize.Op.and]: [
							{is_active: true},
							whereFilter
						]
					},
					order: [['updatedAt', 'DESC']]
				}).then((filter) => {
					if (filter.length == 0) {					
						return res.status(404).json({
							code: 404,
							status: 'Project NOT FOUND'
						})
					}else{									
						return res.status(201).json({
							code: 201,
							status: 'Succes Find Project',
							filter
						})
					}
				})
			}
		} catch (error) {
			return res.status(500).json({
				code: 500,
				status: 'Internal Server Error',
				error: {
					message: error.message,
				},
			});
		}
	},
	getAllProjectByReport: async (req, res, next) => {
		try {						
				await ProjectReport.findAll({					
					attributes: [],
					include: [
						{
							model: Project,
							as: 'project',
							attributes: {
								exclude: [, 'createdAt', 'updatedAt', 'UserId', 'CategoryId'],
							},
							include: [
								{
									model: User,
									as: 'user',
									attributes: ['name', 'profile_image'],
								},
								{
									model: ReportCategories,
									as: 'projectReportCategories',
									group: ['projectReportCategories.name'],
									attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
									through: {
										model: ProjectReport,
										as: 'projectReport',
										attributes: [],
									},
								},
							],
						},
					],
				}).then((result) => {
					const projects = result.map((item) => {
						total_report = item.project.projectReportCategories.length;
						return {
							total_report,
							...item.project.dataValues,
						};
					});	
					return res.status(200).json({
						code: 200,
						status: 'OK',
						message: 'Success get all project by report',
						data: projects,
					});					
				}).catch(()=>{
					return res.status(404).json({
						code: 404,
						message: 'Project NOT FOUND'
					});
				})					
		} catch (error) {
			return res.status(500).json({
				code: 500,
				status: 'Internal Server Error',
				error: {
					message: error.message,
				},
			});
		}
	},
	// getProjectByCategory: async (req, res, next) => {
	// 	try {
	// 		const { slug } = req.params;

	// 		if (!slug) {
	// 			return res.status(400).json({
	// 				code: 400,
	// 				status: 'BAD_REQUEST',
	// 				error: 'required params',
	// 			});
	// 		}
	// 		const projectCategory = await Categories.findOne({
	// 			where: { slug },
	// 			attributes: { exclude: ['id', 'name', 'createdAt', 'updatedAt'] },
	// 			include: [
	// 				{
	// 					model: Project,
	// 					as: 'project',
	// 					include: [
	// 						{
	// 							model: Tools,
	// 							as: 'tools',
	// 							attributes: ['slug', 'name'],
	// 							through: {
	// 								model: ProjectTools,
	// 								as: 'projcetTools',
	// 								attributes: { exclude: ['createdAt', 'updatedAt'] },
	// 							},
	// 						},
	// 					],
	// 				},
	// 			],
	// 		});
	// 		return res.status(200).json({
	// 			code: 200,
	// 			status: 'OK',
	// 			message: 'Success get project by categories',
	// 			data: projectCategory,
	// 		});
	// 	} catch (err) {
	// 		return res.status(500).json({
	// 			code: 500,
	// 			status: 'Internal Server Error',
	// 			error: {
	// 				message: err.message,
	// 			},
	// 		});
	// 	}
	// },
	// getAllProject: async (req, res, next) => {
	// 	try {
	// 		const projects = await Project.findAll({
	// 			include: [
	// 				{
	// 					model: User,
	// 					as: 'user',
	// 					attributes: ['name', 'profile_image'],
	// 				},
	// 				{
	// 					model: Tools,
	// 					as: 'tools',
	// 					attributes: {
	// 						exclude: ['id', 'createdAt', 'updatedAt'],
	// 					},
	// 					through: {
	// 						model: ProjectTools,
	// 						as: 'projcetTools',
	// 						attributes: { exclude: ['createdAt', 'updatedAt'] },
	// 					},
	// 				},
	// 				{
	// 					model: Categories,
	// 					as: 'categories',
	// 					attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
	// 				},
	// 			],
	// 		});

	// 		if (projects.length > 0) {
	// 			return res.status(200).json({
	// 				code: 200,
	// 				status: 'OK',
	// 				message: 'All project found',
	// 				ammount: projects.length,
	// 				data: projects,
	// 			});
	// 		} else {
	// 			return res.status(404).json({
	// 				code: 404,
	// 				status: 'NOT_FOUND',
	// 				error: {
	// 					message: 'No project found',
	// 				},
	// 			});
	// 		}
	// 	} catch (err) {
	// 		return res.status(500).json({
	// 			code: 500,
	// 			status: 'Internal Server Error',
	// 			error: {
	// 				message: err.message,
	// 			},
	// 		});
	// 	}
	// },
	// searchProjcet: async(req, res ,next) =>{
	// 	try {
	// 		let search = ""

	// 		if (req.query.search){
	// 			search = req.query.search
	// 		}
	// 		Project.findAll({
	// 			where: {
	// 				title: {[Sequelize.Op.iLike]: `%${search}%`}				
	// 			},
	// 			order: [['updatedAt', 'DESC']]
	// 		}).then((filter) => {
	// 			if (filter.length == 0) {					
	// 				return res.status(404).json({
	// 					code: 404,
	// 					status: 'Project NOT FOUND'
	// 				})
	// 			}else{									
	// 				return res.status(201).json({
	// 					code: 201,
	// 					status: 'Succes Find Project',
	// 					filter
	// 				})
	// 			}
	// 		})
	// 	} catch (error) {
	// 		return res.status(500).json({
	// 			code: 500,
	// 			status: 'Internal Server Error',
	// 			error: {
	// 				message: error.message,
	// 			},
	// 		});
	// 	}
	// },
	// searchProjectByCatandTool: async(req,res, next) => {
	// 	try {
		// 		const {cat, tool} = req.query
	// 		await Categories.findAll({
	// 			where: {
					
	// 			}
	// 		})
	// 	} catch (error) {
	// 		return res.status(500).json({
	// 			code: 500,
	// 			status: 'Internal Server Error',
	// 			error: {
	// 				message: error.message,
	// 			},
	// 		});
	// 	}
	// },
};
