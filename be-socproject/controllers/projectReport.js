const { projectReportController } = require('.');
const { ReportCategories, ProjectReport, Project} = require('../db/models')

module.exports = {
    // getProjectCategories: async(req, res, next)=>{
    //     await ProjectReport.findAll({
    //         attributes: [],
    //         where: {
    //             UserId : 1
    //         },
    //         include : [{
    //             model: ReportCategories,
    //             as: 'reportCategories',
    //             attributes: {exclude: ['createdAt', 'updatedAt']}   
    //         }]
    //     }).then((result) =>{
    //         if (result.length > 0) {
    //             return res.status(200).json({
    //                 code: 200,
    //                 status: 'OK',
    //                 message: 'Get All Categories Successfully',
    //                 ammount: result.length,
    //                 data: result,
    //             });
    //         } else {
    //             return res.status(404).json({
    //                 code: 404,
    //                 status: 'Not Found',
    //                 error: {
    //                     message: 'No Categories Found',
    //                 },
    //             });
    //         }
    //     })
    // }
    createReportCategories: async(req, res, next) => {
        const { name } = req.body
        if (!req.body) {
            return res.status(400).json({
				code: 400,
				status: 'BAD_REQUEST',
				error: { message: 'required body' },
			});
        } else {
            try {
                const isCategoriesExist = await ReportCategories.findOne({ where: { name }})
                if(!isCategoriesExist){
                    await ReportCategories.create({
                        name,
                        slug : name.split(' ').join('-')
                    }).then((result) => {
                        return res.status(201).json({
							code: 201,
							status: 'Created',
							message: 'Report Categories Succesfully Created',
							result
						});
                    });
                } else{
                    return res.status(406).json({
						code: 406,
						status: 'Not Acceptable',
						error: {
							message: 'Categories already exist',
						}
					}); 
                }
            } catch (err) {
                return res.status(500).json({
					code: 500,
					status: 'Internal Server Error',
					error: {
						message: err.message,
					},
				});			
            }            
        }
    },
    getReportCategories: async(req, res) => {
        try {
            await ReportCategories.findAll({
                include: [
                    {
                        model: Project,
                        as: 'project',
                        attributes: [],
                        through: {
                            model: ProjectReport,
                            as: 'projectReportCategories',
                            attributes: ['UserId'],
                        },
                    },
                ],
                where: {
                    '$project.projectReportCategories.UserId$': 1
                }
            }).then((result) => {
				if (result.length > 0) {
					return res.status(200).json({
						code: 200,
						status: 'OK',
						message: 'Get All Report Categories Successfully',
						ammount: result.length,
						data: result,
					});
				} else {
					return res.status(404).json({
						code: 404,
						status: 'Not Found',
						error: {
							message: 'Categories Not Found',
						},
					});
				}
			});
        } catch (err) {
            return res.status(500).json({
				code: 500,
				status: 'Internal Server Error',
				error: {
					message: err.message,
				},
			});
        }
    },
    updateReportCategories: async(req, res) =>{
        const { id, newName } = req.body;
        if (!req.body) {
            return res.status(400).json({
				code: 400,
				status: 'BAD_REQUEST',
				error: {
					message: 'required body',
				},
			});
        } else {
            try {
                
                const isCategoriesExist = await ReportCategories.findOne({
                  where: {
                      id
                  }
                });

                if (!isCategoriesExist) {
                    return res.status(404).json({
						code: 404,
						status: 'Not Found',
						error: {
							message: 'Categories Not Found',
						}
					});
                } else {
                    await ReportCategories.update({
                        name: newName,
                        slug: newName.split(' ').join('-').toLowerCase()
                    },
                    {
                        where: {
                            id
                        }
                    }).then(() =>{
                        return res.status(200).json({
							code: 200,
							status: 'OK',
							message: 'Update Categories Successfully',
						});
                    });
                }
            } catch (err) {
                return res.status(500).json({
					code: 500,
					status: 'Internal Server Error',
					error: {
						message: err.message,
					},
				});
            }
        }
    },
    deleteReportCategories: async(req, res) =>{
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
				code: 400,
				status: 'BAD_REQUEST',
				error: {
					message: 'required body',
				}
			});
        } else {
            try {
                await ReportCategories.findOne({
                    where: {
                        id
                    }
                }).then(async(result) => {
                    if (result) {
                        await ReportCategories.destroy({ where: { id }}).then(() =>{
                            return res.status(200).json({
                                code: 200,
                                status: 'OK',
                                message: 'Delete Report Categories Successfully',
                            });
                        })
                    } else {
                        return res.status(404).json({
							code: 404,
							status: 'Not Found',
							error: {
								message: "Report Categories doesn't exist",
							}
						}); 
                    }
                })
            } catch (err) {
                return res.status(500).json({
					code: 500,
					status: 'Internal Server Error',
					error: {
						message: err.message,
					}
				});
            }
        }
    }
}
