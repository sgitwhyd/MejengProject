const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
		);
	},
});

const fileFilter = async (req, res, next) => {
	const { project_image, thumbnail_project_image } = req.files;
	try {
		// CHECK IF NO IMAGE FILE IS UPLOAD
		if (!req.files) {
			return res.status(400).json({
				status: false,
				error: 'No Image upload',
			});
		}

		// CHECK IMAGE FILE VALIDATE

		// if (
		// 	!image.mimetype.includes('jpeg') &&
		// 	!image.mimetype.includes('png') &&
		// 	!image.mimetype.includes('jpg')
		// ) {
		// 	fs.unlinkSync(image.path);
		// 	return res.json({
		// 		status: false,
		// 		error: 'Invalid file type. Only JPEG, PNG, JPG are allowed',
		// 	});
		// }

		// CHECK IMAGE SIZE
		let projectImageHasLargeImageSize = false;
		for (let image in project_image) {
			if (project_image[image].size > 1024 * 1024) {
				projectImageHasLargeImageSize = true;
			}
		}
		if (
			thumbnail_project_image[0].size > 1024 * 1024 ||
			projectImageHasLargeImageSize
		) {
			fs.unlinkSync(thumbnail_project_image[0].path);
			for (let image in project_image) {
				fs.unlinkSync(project_image[image].path);
			}
			return res.json({
				status: false,
				error: 'file too large. Max 1 MB',
			});
		}

		next();
	} catch (error) {
		fs.unlinkSync(thumbnail_project_image[0].path);
		for (let image in project_image) {
			fs.unlinkSync(project_image[image].path);
		}
		return res.json({
			status: false,
			error: 'Image Validate Error. Please Contact Developers',
			msg: error,
		});
	}
};

const uploadHandler = multer({
	storage: storage,
	limits: 1024 * 1024,
}).fields([
	{ name: 'thumbnail_project_image', maxCount: 1 },
	{ name: 'project_image', maxCount: 3 },
]);

module.exports = {
	uploadHandler,
	fileFilter,
};
