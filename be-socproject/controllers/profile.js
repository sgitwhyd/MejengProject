const {User} = require('../db/models')

module.exports = {
    getProfile: async(req, res, next) =>{
        try {
            const profile = await User.findOne({where: {id: req.user.id},
            attributes:{exclude: ['password']}})

            return res.status(201).json({
                status: true,
                message: 'Success get profile',
                data: profile
            })
        } catch (error) {
            next(error)
        }
    }
}