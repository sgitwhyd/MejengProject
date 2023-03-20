'use strict';
var bcrypt = require('bcrypt');
var { MODUL } = require('../../utils/module');
var { Module, User, RoleAccess } = require('../models');
var dummyAdmin = {
	name: 'admin',
	email: 'admin',
	password: 'admin',
	is_verify: true,
};
var dummyUser = {
	name: 'user',
	email: 'user',
	password: '123',
};

module.exports = {
	async up(queryInterface, Sequelize) {
		for (var property in MODUL) {
			var modul = await Module.findOne({ where: { name: property } });
			if (!modul) {
				await Module.create({ name: property });
			}
		}

		var admin = await User.findOne({ where: { email: dummyAdmin.email } });
		if (!admin) {
			var password = await bcrypt.hash(dummyAdmin.password, 10);
			admin = await User.create({
				name: dummyAdmin.name,
				email: dummyAdmin.email,
				password: password,
				is_verify: dummyAdmin.is_verify,
				role: 'admin',
			});
		}

		var user = await User.findOne({ where: { email: dummyUser.email } });
		if (!user) {
			var password = await bcrypt.hash(dummyUser.password, 10);
			user = await User.create({
				name: dummyUser.name,
				email: dummyUser.email,
				password: password,
				role: 'user',
			});
		}

		for (var property in MODUL) {
			var modul = await Module.findOne({ where: { name: property } });
			var roleAdmin = await User.findOne({ where: { role: 'admin' } });
			var roleUser = await User.findOne({ where: { role: 'user' } });

			for (var property in MODUL) {
				var modul = await Module.findOne({ where: { name: property } });
				var roleAdmin = await User.findOne({ where: { role: 'admin' } });
				var roleUser = await User.findOne({ where: { role: 'user' } });

				// admin Acces Admin & User Dahboard
				var ra = await RoleAccess.findOne({
					where: { user_id: roleAdmin.id, module_id: modul.id },
				});
				if (!ra) {
					await RoleAccess.create({
						user_id: roleAdmin.id,
						module_id: modul.id,
						read: true,
						write: true,
					});
				}

				// user Acces userDashboard
				var ura = await RoleAccess.findOne({
					where: { user_id: roleUser.id, module_id: modul.id },
				});
				if (!ura) {
					await RoleAccess.create({
						user_id: roleUser.id,
						module_id: 1,
						read: true,
						write: true,
					});
				}

				//user accces AdminDashboard
				var ura1 = await RoleAccess.findOne({
					where: { user_id: roleUser.id, module_id: modul.id },
				});
				if (!ura1) {
					await RoleAccess.create({
						user_id: roleUser.id,
						module_id: 2,
						read: false,
						write: false,
					});
				}
			}
		}
	}
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
