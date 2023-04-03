const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const token = req.headers['authorization'];
		if (!token) {
			return res.status(401).json({
				code: 401,
				status: 'UNAUTHORIZED',
				error: {
					message: 'your re not authorized',
				},
			});
		}

		const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = payload;

		next();
	} catch (err) {
		if (err.message == 'jwt malformed') {
			return res.status(500).json({
				code: 500,
				status: 'Internal Server Error',
				error: {
					message: err.message,
				},
			});
		}
		next(err);
	}
};
