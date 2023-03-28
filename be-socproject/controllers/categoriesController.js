const { Categories } = require('../db/models');

module.exports = {
	createCategory: async (req, res, next) => {
		const { name } = req.body;

		if (!name) {
			return res.status(400).json({
				code: 400,
				status: 'BAD_REQUEST',
				error: {
					message: 'required body',
				},
			});
		}

		const isCategoryExist = await Categories.findOne({ where: { name } });

		if (isCategoryExist) {
			return res.status(406).json({
				code: 406,
				status: 'Not Acceptable',
				error: {
					message: 'Category already exist',
				},
			});
		} else {
			const slug = name.toLowerCase().split(' ').join('-');

			try {
				await Categories.create({
					name,
					slug,
				});

				return res.status(201).json({
					code: 201,
					status: 'Created',
					message: 'Create Category Successfully',
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
		}
	},
	getAllCategories: async (req, res, next) => {
		try {
			const categoires = await Categories.findAll();
			const ammount = await Categories.count();

			if (categoires.length > 0) {
				return res.status(200).json({
					code: 200,
					status: 'OK',
					ammountCategory: ammount,
					data: categoires,
				});
			} else {
				return res.status(404).json({
					code: 404,
					status: 'Not Found',
					error: {
						message: 'No Category Found',
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
	},
	updateCategory: async (req, res, next) => {
		try {
			const { id, name } = req.body;

			if (!id || !name) {
				return res.status(406).json({
					code: 406,
					status: 'Not Acceptable',
					error: {
						message: 'Body Is Not Valid',
					},
				});
			}

			const slug = name.toLowerCase().split(' ').join('-');
			await Categories.update(
				{ name, slug },
				{
					where: {
						id,
					},
				}
			).then(() => {
				return res.status(200).json({
					code: 200,
					status: 'OK',
					message: 'Category has been updated',
				});
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
	deleteCategory: async (req, res, next) => {
		const { id } = req.body;

		if (!id) {
			return res.status(406).json({
				code: 406,
				status: 'Not Acceptable',
				error: {
					message: 'Body Is Not Valid',
				},
			});
		}

		try {
			const isCategoryExist = await Categories.findOne({
				where: { id },
			});

			if (isCategoryExist) {
				await Categories.destroy({
					where: {
						id,
					},
				}).then(() => {
					return res.status(200).json({
						code: 200,
						status: 'OK',
						message: 'Delete Category Succesfully',
					});
				});
			} else {
				return res.status(404).json({
					code: 404,
					status: 'Not Found',
					error: {
						message: 'Category Not Found',
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
	},
};
