const au = require('./auth');
const us = require('./user');
const categoriesController = require('./categoriesController');

const projectController = require('./projectController');

module.exports = {
	us,
	au,
	categoriesController,
	projectController,
};
