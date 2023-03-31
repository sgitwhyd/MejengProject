const { User, Module, RoleAccess } = require('../db/models');

module.exports = (modulName, readAccess = false, writeAccess = false) => {
	return async (req, res, next) => {
		const { role } = req.user;
		if (!role)
			return res.status(401).json({
				code: 401,
				status: 'UNAUTHORIZED',
				error: { message: 'you are not authorized' },
			});

		// get role data
		const roleDB = await User.findOne({ where: { role: role } });
		if (!roleDB)
			return res.status(401).json({
				code: 401,
				status: 'UNAUTHORIZED',
				error: {
					message: 'your role data is undefined!',
				},
			});

		// get role modul
		const modul = await Module.findOne({ where: { name: modulName } });
		if (!modul)
			return res.status(401).json({
				code: 401,
				status: 'UNAUTHORIZED',
				error: {
					message: 'your modul is undefined',
				},
			});

		// get role access data
		const roleAcces = await RoleAccess.findOne({
			where: { user_id: roleDB.id, module_id: modul.id },
		});
		if (!roleAcces)
			return res.status(401).json({
				code: 401,
				status: 'UNAUTHORIZED',
				error: {
					message: 'your acces is denied',
				},
			});

		if (readAccess && !roleAcces.read) {
			return res.status(401).json({
				code: 401,
				status: 'UNAUTHORIZED',
				error: {
					message: 'you re not admin',
				},
			});
		}

		if (writeAccess && !roleAcces.write) {
			return res.status(401).json({
				code: 401,
				status: 'UNAUTHORIZED',
				error: {
					message: 'you re not admin',
				},
			});
		}

		next();
	};
};
