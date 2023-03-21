const express = require('express');
const router = express.Router();
const con = require('../controllers');
const multer = require('multer');
const restrict = require('../middleware/restrict.js');
const rbac = require('../middleware/rbac');
const { MODUL } = require('../utils/module');
const {
	fileFilter,
	uploadHandler,
} = require('../middleware/imageFileValidation');

//auth
router.post('/auth/register', con.au.register);
router.post('/auth/login', con.au.login);

router.post(
	'/api/creators/request',
	restrict,
	con.au.requestCreatorsVerifications
);
router.get('/api/creators/activate/:token', con.au.creatorsVerificationHandler);

// project route
router.post(
	'/api/project/create-project',
	uploadHandler,
	fileFilter,
	restrict,
	con.projectController.createProject
);
router.post(
	'/api/project/:projectId/toggle-like',
	restrict,
	con.projectController.likeProject
);

router.post('/api/project/delete-project', con.projectController.deleteProject);

// project require login
router.post(
	'/api/project/create-project',
	restrict,
	con.projectController.createProject
);
router.post(
	'/api/project/like-project',
	restrict,
	con.projectController.likeProject
);

router.get('/api/project/get-all-project', con.projectController.getAllProject);

router.get('/api/user/profile', restrict, con.us.getProfile);

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
	rbac(MODUL.AdminDashboard, true, true),
	con.toolsController.createTool
);
router.post(
	'/api/tools/update-tools',
	restrict,
	rbac(MODUL.AdminDashboard, true, true),
	con.toolsController.updateTool
);
router.post(
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

module.exports = router;
