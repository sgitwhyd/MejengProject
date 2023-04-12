const express = require('express');
const router = express.Router();
const con = require('../controllers');
const restrict = require('../middleware/restrict.js');
const rbac = require('../middleware/rbac');
const { MODUL } = require('../utils/module');
const {
	uploadHandler,
	fileFilter,
	userProfileImageFilter,
	userProfileUploadHandler,
	toolIconFilter,
	toolsIconUploadHandler,
} = require('../middleware/imageFileValidation');
const {
	requestCreatorsLimiter,
	reportProjectLimiter,
} = require('../middleware/rateLimiter');
const { creatorRequired } = require('../middleware/creatorRequired');

//auth
router.post('/auth/register', con.au.register);
router.post('/auth/login', con.au.login);

router.post(
	'/api/creators/request',
	restrict,
	requestCreatorsLimiter,
	con.au.requestCreatorsVerifications
);
router.get(
	'/api/creators/activate/:token',
	restrict,
	con.au.creatorsVerificationHandler
);

// project route
router.post(
	'/api/project/create-project',
	restrict,
	creatorRequired,
	uploadHandler,
	fileFilter,
	con.projectController.createProject
);
router.post(
	'/api/project/like-project',
	restrict,
	con.projectController.likeProject
);

router.delete(
	'/api/project/delete-project',
	restrict,
	con.projectController.deleteProject
);

// router.get('/api/project/get-all-project', con.projectController.getAllProject);

// router.get(
// 	'/api/project/category/:slug',
// 	con.projectController.getProjectByCategory
// );

router.post(
	'/api/project/report-project',
	restrict,
	reportProjectLimiter,
	con.projectController.reportProject
);

router.get('/api/project/detail/:id', con.projectController.getDetailProject);
router.put(
	'/api/project/ban-project',
	restrict,
	rbac(MODUL.AdminDashboard, true, true),
	con.projectController.banProject
);

// router.get('/api/project?', con.projectController.searchProjcet)
router.get('/api/project?', con.projectController.getAllProjectSearch);

// comment route
router.post(
	'/api/comment/create-comment',
	restrict,
	con.commentController.postComment
);
router.post(
	'/api/comment/reply-comment',
	restrict,
	con.commentController.replyCommentHandler
);
router.get(
	'/api/comment/:projectId',
	restrict,
	con.commentController.getCommentByProjectHanlder
);

router.post(
	'/api/project/view/:projectId',
	con.projectViewsController.addingViews
);

// user profile route
router.get('/api/user/profile', restrict, con.us.getProfile);

router.put(
	'/api/user/update-profile',
	restrict,
	userProfileUploadHandler,
	userProfileImageFilter,
	con.us.updateProfile
);

router.post('/api/user/forgot-password?', con.us.forgotPassword);

// Category
// user akses
router.get('/api/categories', con.categoriesController.getAllCategories);

// require admin
router.post(
	'/api/categories/create-category',
	restrict,
	rbac(MODUL.AdminDashboard, true, true),
	con.categoriesController.createCategory
);
router.put(
	'/api/categories/update-category',
	restrict,
	rbac(MODUL.AdminDashboard, true, true),
	con.categoriesController.updateCategory
);
router.delete(
	'/api/categories/delete-category',
	restrict,
	rbac(MODUL.AdminDashboard, true, true),
	con.categoriesController.deleteCategory
);

// tools require admin
router.get('/api/tools', con.toolsController.getTools);
router.post(
	'/api/tools/create-tools',
	restrict,
	toolsIconUploadHandler,
	toolIconFilter,
	rbac(MODUL.AdminDashboard, true, true),
	con.toolsController.createTool
);
router.post(
	'/api/tools/update-tools',
	restrict,
	toolsIconUploadHandler,
	toolIconFilter,
	rbac(MODUL.AdminDashboard, true, true),
	con.toolsController.updateTool
);
router.delete(
	'/api/tools/delete-tools',
	restrict,
	rbac(MODUL.AdminDashboard, true, true),
	con.toolsController.deleteTool
);

// admin route
router.get(
	'/api/admin/get-all-user',
	restrict,
	rbac(MODUL.AdminDashboard, true, true),
	con.adminController.getAllUsers
);
router.post(
	'/api/admin/user/ban-user',
	restrict,
	rbac(MODUL.AdminDashboard, true, true),
	con.adminController.banUser
);
router.post(
	'/api/admin/user/unban-user',
	restrict,
	rbac(MODUL.AdminDashboard, true, true),
	con.adminController.unBanUser
);

router.get(
	'/api/project/reported?',
	con.projectController.getAllProjectByReport
);

router.post(
	'/api/comment/post-comment',
	restrict,
	con.commentController.postComment
);

module.exports = router;
