const User = require('../models/user.model.js');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');
const {isValidEmail} = require('../../middleware/UserValidation');
require('dotenv').config();

exports.registerUser = async (req,res) => {
    try {
        const {username , email , password , repeatPassword} = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
        return res.status(400).json({msg : 'you have already registred'})
    if (!isValidEmail(email)){
        return res.status(400).json({msg :'Invalid email address format.'});
    }
    if(password.length <8 || !/[A-Z]/.test(password)){
        return res.status(400).json({
            msg : 'Password au moins 8 char et une lettre majuscule'
        });
    }
    if (password !== repeatPassword){
        return res.status(400).json({
            status: 'error',
            message: 'Password do not match'
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.create({username,email, password:hashedPassword});
    return res.status(201).json({
        status:'success',
        data:{
            user: user,
        }
    });


    } catch(err) {
        console.log(err.message);
        return res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
};
exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});

    if(!user){
            return res.status(400).json({
                status: 'error',
                message: 'invalide email or password'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({
                status: 'error',
                message: 'email or password not match'
            });
        }

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {expiresIn : '24h'} );
        res.json({
            status:"succes",
            result: {
                token: token,
                userId: user._id
            },
            message: "log in succes "
        });
    }

