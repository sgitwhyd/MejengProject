const {Comment, Project, User} = require('../db/models')

module.exports = {
    postComment: async(req, res, next) => {
        try {
            const {content, projectId} = req.body
            const userId = req.user.id

            if (!projectId) {
                return res.status(401).json({
                    status: false,
                    msg: 'Invalid payload',
                });
            } else {
                const isProjectExist = await Project.findOne({
                    where: {
                        id: projectId,
                    },
                });
    
                if (!isProjectExist) {
                    return res.status(401).json({
                        status: false,
                        message: 'Project Not Found',
                    });
                } else{
                    const commentSection = Comment.create({
                        UserId: userId,
                        ProjectId: projectId,
                        content
                    })
                    return res.status(201).json({
                        status: true,
                        message: 'Comment is added',
                        data: {content}
                    })
                }
            }

        } catch (error) {
            next(error)
        }
    },
    getComment: async(req,res, next) =>{
        try {
            
        } catch (error) {
            next(error)
        }
    }
}