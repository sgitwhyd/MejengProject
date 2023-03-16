const au = require('./auth');
const us = require('./user');
const categoriesController = require('./categoriesController');
const adminController = require('./adminController');
const projectController = require('./projectController');
const toolsController = require('./toolsController');

module.exports = {
	us,
	au,
	categoriesController,
	adminController,
	projectController,
	toolsController,
};
