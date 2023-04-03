const { Comment, Project, User, RepliesComment } = require('../db/models');

module.exports = {
	postComment: async (req, res, next) => {
		try {
			const { body, projectId } = req.body;
			const userId = req.user.id;

			if (!projectId) {
				return res.status(400).json({
					code: 400,
					status: 'BAD_REQUEST',
					error: {
						message: 'required body',
					},
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
					await Comment.create({
						UserId: userId,
						ProjectId: projectId,
						body: body,
					}).then(() => {
						return res.status(201).json({
							code: 201,
							status: 'CREATED',
							message: 'Comment is created',
						});
					});
				}
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
	replyCommentHandler: async (req, res, next) => {
		try {
			const { body, commentId } = req.body;
			const userId = req.user.id;
			const isCommentExist = await Comment.findOne({
				where: {
					id: commentId,
				},
			});
			if (!isCommentExist) {
				return res.status(404).json({
					code: 404,
					status: 'NOT_FOUND',
					error: {
						message: 'Comment Not Found',
					},
				});
			} else {
				await RepliesComment.create({
					UserId: userId,
					body: body,
					CommentId: commentId,
				}).then(() => {
					return res.status(201).json({
						code: 201,
						status: 'Created',
						message: 'Reply Comment is created',
					});
				});
			}
		} catch (err) {
			return res.status(404).json({
				code: 404,
				status: 'NOT_FOUND',
				error: {
					message: 'Comment Not Found',
				},
			});
		}
	},
	getCommentByProjectHanlder: async (req, res, next) => {
		try {
			await Comment.findAll({
				where: {
					ProjectId: req.params.projectId,
				},
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
			})
				.then((comment) => {
					if (comment.length > 0) {
						return res.status(200).json({
							code: 200,
							status: 'OK',
							message: 'Comment is found',
							data: comment,
						});
					} else {
						return res.status(404).json({
							code: 404,
							status: 'NOT_FOUND',
							error: {
								message: 'Comment Not Found',
							},
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
};
