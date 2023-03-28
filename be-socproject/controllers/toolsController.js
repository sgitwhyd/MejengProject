const { Tools } = require('../db/models');

module.exports = {
	createTool: async (req, res, next) => {
		const { name } = req.body;
		if (!name) {
			return res.status(400).json({
				code: 400,
				status: 'BAD_REQUEST',
				error: 'required body',
			});
		} else {
			try {
				const isToolExist = await Tools.findOne({ where: { name } });
				if (!isToolExist) {
					const slug = name.split(' ').join('-');
					await Tools.create({
						name,
						slug,
					}).then(() => {
						return res.status(201).json({
							code: 201,
							status: 'Created',
							message: 'Tool Added Succesfully',
						});
					});
				} else {
					return res.status(406).json({
						code: 406,
						status: 'Not Acceptable',
						error: {
							message: 'Tool already exist',
						},
					});
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
		}
	},
	getTools: async (req, res, next) => {
		try {
			await Tools.findAll().then((result) => {
				if (result.length > 0) {
					return res.status(200).json({
						code: 200,
						status: 'OK',
						message: 'Get All Tools Successfully',
						ammount: result.length,
						data: result,
					});
				} else {
					return res.status(404).json({
						code: 404,
						status: 'Not Found',
						error: {
							message: 'No Tools Found',
						},
					});
				}
			});
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
	updateTool: async (req, res, next) => {
		const { id, newName } = req.body;
		if (!newName) {
			return res.status(400).json({
				code: 400,
				status: 'BAD_REQUEST',
				error: {
					message: 'required body',
				},
			});
		} else {
			try {
				const slug = newName.split(' ').join('-');
				const isToolExist = await Tools.findOne({
					where: {
						id,
					},
				});

				if (!isToolExist) {
					return res.status(404).json({
						code: 404,
						status: 'Not Found',
						error: {
							message: 'Tool Not Found',
						},
					});
				} else {
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
					).then(() => {
						return res.status(200).json({
							code: 200,
							status: 'OK',
							message: 'Update Tool Successfully',
						});
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
		}
	},
	deleteTool: async (req, res, next) => {
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
			try {
				const isToolExist = await Tools.findOne({
					where: {
						id,
					},
				});
				if (isToolExist) {
					await Tools.destroy({ where: { id } }).then(() => {
						return res.status(200).json({
							code: 200,
							status: 'OK',
							message: 'Delete Tool Successfully',
						});
					});
				} else {
					return res.status(404).json({
						code: 404,
						status: 'Not Found',
						error: {
							message: "tools doesn't exist",
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
		}
	},
};
