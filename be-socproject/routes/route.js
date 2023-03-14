const express = require('express')
const router = express.Router()
const con = require('../controllers')
const multer = require('multer');
const restrict = require('../middleware/restrict.js')


//auth
router.post('/auth/register', con.au.register)
router.post('/auth/login', con.au.login)




const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) =>{
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg') {
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload =multer({storage: fileStorage, fileFilter: fileFilter}).single('thumbnail_product_image')
// const upload2 =multer({storage: fileStorage1, fileFilter: fileFilter1}).single('thumbnail_product_image')

router.post('/product/postProduct', restrict,  upload, con.pd.postProduct)
router.post('/product/:productId/toggle-like', restrict,  con.pd.toggle_like)
router.get('/product/total-like', restrict,  con.pd.total_like)


router.get('/profile/getProfile', restrict, con.pro.getProfile)

module.exports = router