const { Tools } = require('../db/models');
const fs = require('fs');
const path = require('path');

module.exports = {
	createTool: async (req, res, next) => {
		const { name } = req.body;
		const tool_icon = req.file;
		if (!req.body || !req.file) {
			return res.status(400).json({
				code: 400,
				status: 'BAD_REQUEST',
				error: { message: 'required body' },
			});
		} else {
			try {
				const isToolExist = await Tools.findOne({ where: { name } });
				if (!isToolExist) {
					const slug = name.split(' ').join('-');
					await Tools.create({
						name,
						slug,
						icon: tool_icon.path,
					}).then((result) => {
						return res.status(201).json({
							code: 201,
							status: 'Created',
							message: 'Tool Added Succesfully',
							result
						});
					});
				} else {
					fs.unlinkSync(path.normalize(tool_icon.path));
					return res.status(406).json({
						code: 406,
						status: 'Not Acceptable',
						error: {
							message: 'Tool already exist',
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
	updateTool: async (req, res, next) => {
		const { id, newName } = req.body;
		const tool_icon = req.file;
		if (!req.body) {
			return res.status(400).json({
				code: 400,
				status: 'BAD_REQUEST',
				error: {
					message: 'required body',
				},
			});
		} else {
			try {
				const slug = newName.split(' ').join('-').toLowerCase();
				const isToolExist = await Tools.findOne({
					where: {
						id,
					},
				});

				if (!isToolExist) {
					if (tool_icon) {
						fs.unlinkSync(path.normalize(tool_icon.path));
					}
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
							icon: tool_icon ? tool_icon.path : isToolExist.icon,
						},
						{
							where: {
								id,
							},
						}
					).then(() => {
						if (tool_icon) fs.unlinkSync(path.normalize(isToolExist.icon));
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
				await Tools.findOne({
					where: {
						id,
					},
				}).then((result)=>{
					if (result) {
						try {
							fs.unlinkSync(path.normalize(result.icon));						
						} catch (err) {
							return res.status(500).json({
								code: 500,
								status: 'Internal Server Error',
								error: {
									message: err.message,
								},
							});
						}
						Tools.destroy({ where: { id } }).then(() => {
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
				})

				
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
