const { Categories } = require('../db/models');

module.exports = {
	createCategory: async (req, res, next) => {
		const { name } = req.body;

		if (!name) {
			return res.status(400).json({
				status: false,
				msg: 'Body Is Not Valid',
			});
		}

		const isCategoryExist = await Categories.findOne({ where: { name } });

		if (isCategoryExist) {
			return res.status(400).json({
				status: false,
				msg: 'Category already exist',
			});
		} else {
			const slug = name.toLowerCase().split(' ').join('-');

			try {
				await Categories.create({
					name,
					slug,
				});

				return res.status(200).json({
					status: true,
					msg: 'Add Category Successfully',
				});
			} catch (error) {
				return res.status(401).json({
					status: false,
					msg: 'Add Category Failure',
					error: error.message,
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
					status: true,
					ammount,
					categoires,
				});
			} else {
				return res.status(400).json({
					status: false,
					msg: 'No Category Found',
				});
			}
		} catch (error) {
			return res.status(400).json({
				status: false,
				error: error.message,
			});
		}
	},
	updateCategory: async (req, res, next) => {
		try {
			const { id, name } = req.body;

			if (!id || !name) {
				return res.status(400).json({
					status: false,
					msg: 'Body Is Not Valid',
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
			);

			return res.status(200).json({
				status: true,
				msg: 'Category has been updated',
			});
		} catch (error) {
			return res.status(401).json({
				status: false,
				msg: 'Update Category Failure',
				err: error.message,
			});
		}
	},
	deleteCategory: async (req, res, next) => {
		const { id } = req.body;

		if (!id) {
			return res.status(400).json({
				status: false,
				msg: 'Body Is Not Valid',
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
				});

				return res.status(200).json({
					status: true,
					msg: 'Delete Category Succesfully',
				});
			} else {
				return res.status(401).json({
					status: false,
					msg: 'Category Not Found',
				});
			}
		} catch (error) {
			return res.status(401).json({
				status: false,
				msg: 'Delete Category Failed',
				err: error.message,
			});
		}
	},
};
