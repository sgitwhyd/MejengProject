const pd = require('./product');
const au = require('./auth');
const us = require('./user');
const categoriesController = require('./categoriesController');
const adminController = require('./adminController');
const projectController = require('./projectController');

module.exports = { pd, au, us, categoriesController };
module.exports = {
	pd,
	au,
	pro,
	categoriesController,
	adminController,
	projectController,
};
