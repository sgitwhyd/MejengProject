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
				code: 400,
				status: 'Bad Request',
				error: {
					message: 'No Image upload',
				},
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
			return res.status(406).json({
				code: 406,
				status: 'Not Acceptable',
				error: {
					message: 'file too large. Max 1 MB',
				},
			});
		}

		next();
	} catch (error) {
		fs.unlinkSync(thumbnail_project_image[0].path);
		for (let image in project_image) {
			fs.unlinkSync(project_image[image].path);
		}
		return res.status(500).json({
			code: 500,
			status: 'Internal Server Error',
			error: {
				message: error.message,
			},
		});
	}
};

const userProfileImageFilter = async (req, res, next) => {
	const user_image = req.file;
	try {
		// CHECK IF NO IMAGE FILE IS UPLOAD
		if (!req.file) {
			return res.status(400).json({
				code: 400,
				status: 'Bad Request',
				error: {
					message: 'No Image upload',
				},
			});
		}

		// CHECK IMAGE FILE VALIDATE

		if (
			!user_image.mimetype.includes('jpeg') &&
			!user_image.mimetype.includes('png') &&
			!user_image.mimetype.includes('jpg')
		) {
			fs.unlinkSync(user_image.path);
			return res.status(400).json({
				status: false,
				error: 'Invalid file type. Only JPEG, PNG, JPG are allowed',
			});
		}

		// CHECK IMAGE SIZE
		if (user_image.size > 1024 * 1024) {
			fs.unlinkSync(user_image.path);
			return res.status(406).json({
				code: 406,
				status: 'Not Acceptable',
				error: {
					error: 'file too large. Max 1 MB',
				},
			});
		} else {
			next();
		}
	} catch (error) {
		fs.unlinkSync(user_image.path);
		return res.status(500).json({
			code: 500,
			status: 'Internal Server Error',
			error: {
				message: error.message,
			},
		});
	}
};

const userProfileUploadHandler = multer({
	storage: storage,
	limits: 1024 * 1024,
}).single('user_image');

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
	userProfileImageFilter,
	userProfileUploadHandler,
};
