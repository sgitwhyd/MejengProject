const {User, Profile} = require('../db/models');
const { use } = require('../routes/route');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const {
    JWT_SECRET_KEY
} = process.env
module.exports = {
    register: async (req, res, next) => {
        try {
            const { email, password, name } = req.body;

            const existUser = await User.findOne({ where: { email: email } });
            if (existUser) {                            
                return res.status(400).json({ 
                    status: false,
                    message: 'email already used!'
                });
            }

            const encryptPassword = await bcrypt.hash(password, 10);
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!email.match(regex)) {
                return res.status(400).json({
                    message: 'email is not valid'
                })
            };
            // let strongRegex = /^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$/
            // if (!password.match(strongRegex)) {
            //     return res.status(400).json({
            //         message: 'password must have Capital, number and special character(minimum 8 character) '
            //     })
            // };
            const user = await User.create({        
                email,
                password: encryptPassword,
                name,
                isVerify: false                                
            });
            console.log(user)
            const payload = {
                id: user.id,
                email: user.email,  
                name: user.id              
            }
            console.log(payload)
            const token = jwt.sign(payload, JWT_SECRET_KEY);

            return res.status(201).json({
                status: true,
                message: 'Succes Register',
                data: {
                    email: user.email,
                    name: user.name
                }
            });
        } catch (err) {
            next(err);
        }
    },
    login: async(req, res, next) =>{
        try {
            
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email: email } })
            if (!user) {
            return res.status(404).json({
                status: false,
                message: 'user not found!'
            });
            }
            const isPassCorrect = await bcrypt.compare(password, user.password)
            if (!isPassCorrect) {
                return res.status(404).json({
                    status: false,
                    message: 'password is not correct'
                });
            }
            payload = {
                id: user.id,
                email: user.email,
                name: user.name

            }
            const token = jwt.sign(payload, JWT_SECRET_KEY)

            return res.status(201).json({
                status: true,
                token
            })
        } catch (error) {
        next(error)
        }
        
    }
}