const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({
                status: false,
                message: 'you\'re not authorized!'
            });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = payload;

        next();
    } catch (err) {
        if (err.message == 'jwt malformed') {
            return res.status(401).json({
                status: false,
                message: err.message,
            });
        }
        next(err);
    }
};