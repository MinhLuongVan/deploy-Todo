const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('../router/auth');
const authController = {
    registerUser : async(req,res) =>{
        try {
            const sailt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password,sailt);

            // create user

            const newUser =  new User({
                fullname:req.body.fullname,
                username: req.body.username,
                password:hashed,
            });
            // save to db
            const user = await newUser.save();
            return res.json({
                success:true,
                message :"Register success"
            });
        } catch (error) {
        console.log(error)
           return res.json(error);
        }
    },

    createAccessToken : (user) =>{
        return  jwt.sign({
            id : user._id,
            isAdmin : user.isAdmin
        },
        process.env.JWT_ACCESS_KEY,{
            expiresIn : '100d',
           
            } 
        );
    },
    createRefreshToken : (user) =>{
        return  jwt.sign({
            id : user._id,
            isAdmin : user.isAdmin
        },
        process.env.JWT_REFRESH_KEY,{
            expiresIn : '365d',
            } 
        );
    },
    
    loginUser: async(req,res) =>{
        try {
            const user = await User.findOne({username: req.body.username});
    
            if(user){
                const checkPassword = await bcrypt.compare(
                    req.body.password,
                    user.password
                );
                if (checkPassword) {
                    const Token = authController.createAccessToken(user);
                    const refreshToken = authController.createRefreshToken(user);
                    res.cookie("cookieRefesh", refreshToken)
                    const {password, ...others } = user._doc;
                   return res.json({
                        data: {...others,Token}, message: "Login successfully",
                        success: true,
                    });
                } else {
                   return res.json({message:"Sai password!"});
                }
            } else {
                return res.json({message:"Sai username!"}); //C??c file ???????c y??u c???u kh??ng c?? tr??n m??y ch???
            }
        } catch (error) {
           return res.json(error);
        }
    },
    
}; 
module.exports = authController;