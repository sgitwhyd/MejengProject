const { Comment, Project, User, RepliesComment } = require('../db/models');

module.exports = {
	postComment: async (req, res, next) => {
		try {
			const { body, projectId } = req.body;
			const userId = req.user.id;

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
					await Comment.create({
						UserId: userId,
						ProjectId: projectId,
						body: body,
					}).then((comment) => {
						return res.status(201).json({
							status: true,
							message: 'Comment is added',
							data: { comment },
						});
					});
				}
			}
		} catch (error) {
			next(error);
		}
	},
	replyCommentHandler: async (req, res, next) => {
		try {
			const { body, commentId, projectId } = req.body;
			const userId = req.user.id;
			const isCommentExist = await Comment.findOne({
				where: {
					id: commentId,
					ProjectId: projectId,
				},
			});
			if (!isCommentExist) {
				return res.status(401).json({
					status: false,
					message: 'Comment Not Found',
				});
			} else {
				await RepliesComment.create({
					UserId: userId,
					ProjectId: projectId,
					body: body,
					CommentId: commentId,
				}).then((replyComment) => {
					return res.status(201).json({
						status: true,
						message: 'Reply is added',
						data: { replyComment },
					});
				});
			}
		} catch (error) {
			return res.status(404).json({
				status: false,
				message: 'Comment Not Found',
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
							status: true,
							message: 'Comment is found',
							data: comment,
						});
					} else {
						return res.status(401).json({
							status: false,
							message: 'Comment Not Found',
						});
					}
				})
				.catch((err) => {
					return res.status(401).json({
						status: false,
						message: 'Comment Not Found',
						data: err,
					});
				});
		} catch (error) {
			next(error);
		}
	},
};
