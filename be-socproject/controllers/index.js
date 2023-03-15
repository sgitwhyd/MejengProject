const au = require('./auth');
const us = require('./user');
const categoriesController = require('./categoriesController');
const adminController = require('./adminController');
const projectController = require('./projectController');

module.exports = {
	us,
	au,
	pro,
	categoriesController,
	adminController,
	projectController,
};
