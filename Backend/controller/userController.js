const User = require('../model/userModel');
const ListTD = require('../model/listModel')
const bcrypt = require('bcrypt');
const userController = {
    // get all user
    getAllUsers : async(req,res)=>{
        try { 
            const isAdmin = req.user.isAdmin;
            if(isAdmin){
            const user = await User.find({});
            return res.json({user});
            }else {
              return res.json('Bạn không có quyền truy cập')
            }
            
        } catch (error) {
            return res.json(error); //phẩn hồi xảy ra khi có sự cố
        } 
    },
    
    // delete user 
    deleteUser : async(req,res) =>{
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            return res.json("Delete succesfully");
        } catch (error) {
            return res.json(error);
        }
    },

    //findId
    findOneUser : async(req,res) => {
        try {
            const user = await User.findById(req.params.id)
            return res.json({
                data:user,
                message :"Thành công"
            })

        } catch (error) {
            return res.json(error);
        }
    },
   // update user
    updateUser : async(req,res) =>{
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password,salt);
        const updateUser = await User.findByIdAndUpdate(req.params.id,
            { 
                username: req.body.username,
                password:hashed,
            },
            {new : true}
            )
            return res.json({
                data:updateUser,
                mesage:"Update thành công",
            })
        } catch (error) {
            return res.json(error);
        }
    }
}
module.exports = userController;