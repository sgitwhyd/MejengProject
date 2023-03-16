const { Tools } = require('../db/models');

module.exports = {
	createTool: async (req, res, next) => {
		const { name } = req.body;
		if (!name) {
			return res.status(401).json({
				status: false,
				msg: 'body required',
			});
		} else {
			try {
				const isToolExist = await Tools.findOne({ where: { name } });
				if (!isToolExist) {
					const slug = name.split(' ').join('-');
					await Tools.create({
						name,
						slug,
					})
						.then(() => {
							return res.status(200).json({
								status: true,
								msg: 'Tool Added Succesfully',
							});
						})
						.catch((err) => {
							return res.status(401).json({
								status: false,
								msg: 'Add Tool Failed',
							});
						});
				} else {
					return res.status(401).json({
						status: false,
						msg: 'Tool already exist',
					});
				}
			} catch (error) {
				return res.status(401).json({
					status: false,
					msg: 'error when trying to add tool',
					error: error.message,
				});
			}
		}
	},
	getTools: async (req, res, next) => {
		try {
			await Tools.findAll().then((result) => {
				return res.status(200).json({
					status: true,
					data: result,
				});
			});
		} catch (error) {
			return res.status(401).json({
				status: false,
				msg: 'Error while trying get all tools',
				error: error.message,
			});
		}
	},
	updateTool: async (req, res, next) => {
		const { id, newName } = req.body;
		if (!newName) {
			return res.status(401).json({
				status: false,
				msg: 'body required',
			});
		} else {
			try {
				const slug = newName.split(' ').join('-');
				await Tools.update(
					{
						name: newName,
						slug,
					},
					{
						where: {
							id,
						},
					}
				)
					.then(() => {
						return res.status(200).json({
							status: true,
							msg: 'Update Tool Successfully',
						});
					})
					.catch((err) => {
						return res.status(401).json({
							status: false,
							msg: 'Update Tool Failed',
						});
					});
			} catch (err) {
				return res.status(401).json({
					status: true,
					msg: 'Error while trying update tool',
					error: err.message,
				});
			}
		}
	},
	deleteTool: async (req, res, next) => {
		const { id } = req.body;

		if (!id) {
			return res.status(401).json({
				status: false,
				msg: 'Body required',
			});
		} else {
			const isToolExist = await Tools.findOne({
				where: {
					id,
				},
			});
			if (isToolExist) {
				await Tools.destroy({ where: { id } })
					.then((result) => {
						return res.status(200).json({
							status: true,
							msg: 'Delete Tool Successfully',
						});
					})
					.catch((err) => {
						return res.status(401).json({
							status: false,
							msg: 'Error while trying delete tool',
							error: err.message,
						});
					});
			} else {
				return res.status(401).json({
					status: false,
					msg: "tools doesn't exist",
				});
			}
		}
	},
};
