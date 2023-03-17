const express = require('express');
const router = express.Router();
const con = require('../controllers');
const multer = require('multer');
const restrict = require('../middleware/restrict.js');
const rbac = require('../middleware/rbac');
const { MODUL } = require('../utils/module');

//auth
router.post('/auth/register', con.au.register);
router.post('/auth/login', con.au.login);

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, new Date().getTime() + '-' + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter }).single(
	'thumbnail_project_image'
);
// const upload2 =multer({storage: fileStorage1, fileFilter: fileFilter1}).single('thumbnail_product_image')

// router.post('/product/postProduct', restrict, upload, con.pd.postProduct);
// router.post('/product/:productId/toggle-like', restrict, con.pd.toggle_like);

// project require login
router.post(
	'/api/project/create-project',
	restrict,
	upload,
	con.projectController.createProject
);
router.post(
	'/api/project/like-project',
	restrict,
	con.projectController.likeProject
);

router.get('/api/project/get-all-project', con.projectController.getAllProject);

router.get('/profile/getProfile', restrict, con.us.getProfile);

// Category
// user akses
router.get('/api/categories', con.categoriesController.getAllCategories);

// require admin
router.post(
	'/api/categories/create-category',
	restrict,
	// rbac(MODUL.AdminDashboard, true, true),
	con.categoriesController.createCategory, upload
);
router.put(
	'/api/categories/update-category',
	con.categoriesController.updateCategory
);
router.delete(
	'/api/categories/delete-category',
	con.categoriesController.deleteCategory
);

router.get(
	'/api/admin/getAllUsers',
	restrict,
	rbac(MODUL.AdminDashboard, true, true),
	con.us.getAllUsers
);

// tools require admin
router.get('/api/tools', con.toolsController.getTools);
router.post('/api/tools/create-tools', con.toolsController.createTool);
router.post('/api/tools/update-tools', con.toolsController.updateTool);
router.post('/api/tools/delete-tools', con.toolsController.deleteTool);
router.get('/api/admin/getUserProject', restrict, con.us.getUserProject);


router.post('/api/comment/post-comment', restrict, con.commentController.postComment)

module.exports = router;
