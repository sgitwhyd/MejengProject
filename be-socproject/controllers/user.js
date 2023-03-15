const {User, Project} = require('../db/models')

module.exports = {
    getAllUsers: async(req, res, next) =>{
        try {
            const totalUser = await User.count();
            const cekAll = await User.findAll();

            return res.status(201).json({
                status: true,
                message: 'Success get all data user',
                data: {
                    total: totalUser,
                    getAll: cekAll
                }
            })
        } catch (error) {
            next(error)
        }
    },    
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
    },getUserProject: async(req, res, next) =>{
        try {
            const userProject = await User.findAll({where: {id: req.user.id},
            include: [{
                module: Project,
                as: "project",
                attributes: {exclude: ["createdAt","updatedAt"]}
            }]
        })

        return res.status(200).json({
            status: true,
            message: 'Display User has Project Data',
            data: userProject
        });
        } catch (error) {
            
        }
    }

}