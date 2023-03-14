const {Product, productLike, User } = require("../db/models");
const cloudinary = require('cloudinary');
const { validationResult } = require('express-validator');
const e = require("express");
module.exports = {
    postProduct: async(req, res, next) => {
        try {
                const errors = validationResult(req)
                // console.log(req.file)
                if (!errors.isEmpty()) {
                    const err = new Error('Input value tidak sesuai')
                    err.errorStatus = 400;
                    err.data = errors.array();
                    throw err;
                }

                if (!req.file) {
                    const err = new Error('Gambar value tidak sesuai')
                    err.errorStatus = 422;
                    throw err
                }

                const {CategoryId, ToolId, tittle, desc, url} = req.body
                const img = req.file.path
                // const img1 = req.files.path
                // console.log(img1)
                // console.log(CategoryId, ToolId)
                const product = await Product.create({
                    UserId: req.user.id,
                    CategoryId:[req.body.CategoryId],
                    ToolId:[ToolId],
                    tittle,
                    // product_image: img,
                    thumbnail_product_image: img,
                    desc,
                    url
            })

            return res.status(201).json({
                status: true,
                message:'Success Upload',
                data: product
            })
        } catch (error) {
            next(error)
            // message.error
        }
    },
    toggle_like: async(req, res, next ) =>{
        try {
            let productId = +req.params.productId
    
            const cekProduct = await Product.findOne({where: {id : productId}})
            if (!cekProduct) {
                res.status(401).json({
                    status: false,
                    message: 'Product Not Found'
                })
            }else{
                let current_user=req.user;
                // console.log('bbababababababababab', current_user.id)
                productLike.findOne({
                        where: {ProductId: productId,
                        UserId: current_user.id}
                }).then(async(product_like) =>{
                    if (!product_like){
                        let productLikeDoc = new productLike({
                            ProductId: productId,
                            UserId: current_user.id
                        })  
                        await productLikeDoc.save();  
                        console.log('AKAKAKAKAKA',current_user.id, productId) 
                        res.status(201).json({
                            status: true,
                            message: 'Succesfully Liked'
                        })
                    }else{
                        await productLike.destroy({ where: {id: product_like.id}})
                        res.status(200).json({
                            status: true,
                            message: 'Successfully removed like'
                        })
                    }
                    const total = await productLike.count({where:{ProductId: productId}})
                    
                    await Product.update({
                        total_likes: total
                    },{
                        where: {id: productId}
                    })
                }).catch((err) => {
                    res.status(401).json({
                        status: false,
                        message: err.message,
                        data:err
                    })
                })
            }    
        } catch (error) {
            next(error)
        }

    },
    total_like: async(req,res,next) =>{
        const total = await productLike.count({where:{ProductId: 1}})

        productUpdate = await Product.update({

        })
        res.status(201).json({
            data: total
        })

    }
}