const { rateLimit } = require('express-rate-limit');

const requestCreatorsLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1, // Limit each IP to 1 requests per `window`
	message: (req, res, next) => {
		res.status(429).json({
			code: 429,
			status: 'to many request',
			error: {
				message: 'You have exceeded the 15 minutes limit!',
			},
		});
	},
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const reportProjectLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 1, // Limit each IP to 1 requests per `window`
	message: (req, res, next) => {
		res.status(429).json({
			code: 429,
			status: 'to many request',
			error: {
				message: 'You have exceeded the 5 minutes limit!',
			},
		});
	},
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = {
	requestCreatorsLimiter,
	reportProjectLimiter,
};
