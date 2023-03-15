const pd = require('./product');
const au = require('./auth');
const pro = require('./profile');
const categoriesController = require('./categoriesController');
const adminController = require('./adminController');
const projectController = require('./projectController');

module.exports = {
	pd,
	au,
	pro,
	categoriesController,
	adminController,
	projectController,
};
