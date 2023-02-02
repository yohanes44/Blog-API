const Blog = require("../model/blog");
const User = require("../model/user");
const Category = require("../model/category");
const bcrypt = require("bcrypt");

async function getUser (req, res) {
    try{
        
        if(req.query.username){
            const users = await User.find({username: req.query.username}).select("-password");
            return res.status(200).json({success: true, result: users});
        }
        else if(!req.query.username){
            const users = await User.find().select("-password");
            return res.status(200).json({success: true, result: users});
        }
      
    }
    catch(error){
        res.status(500).json({success: false, result: error.message});
    }

}


// async function newUser (req, res) {
  
//     try{
//         const salt = await bcrypt.genSalt(10);
//         req.body.password = await bcrypt.hash(req.body.password, salt)
//         const newUser  = await new User(req.body)
//         newUser.save();
//         res.status(200).json({success: true, result: newUser});
//     }catch(error){
//         res.status(500).json({success: false, result: error.message})
//     }
// }


async function updateuser (req, res) {

    // if(req.body.userId == req.params.userId){
    //    const {userId, ...other} = req.body;
    //     try{
    //         const user = await User.findByIdAndUpdate(req.params.userId, {$set: other});
    //         if(user){

    //             const blogs = await Blog.updateMany({username: req.user.username},  {username: req.body.username});
          
    //             res.status(200).json({success: true, result: "Account Updated Succesfully"});
    //         }
    //         else if(!user){
    //             res.status(500).json({success: false, result: "User not found"});
    //         }
    
    //     }
    //     catch(error){
    //         res.status(500).json({success: false, result: error.message});
    //     }
    // }
    // else{
    //     res.status(403).json({success: false, result: "You can only update your Account"});
    // }

    try{

        const user = await User.findOne({_id: req.params.userId});
        if(user){
            if(user.username == req.user.username){
                if(req.body.username){
                    req.user.username = req.body.username;
                    user.username = req.body.username;
                }
                if(req.body.password){
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(req.body.password, salt);
                }
                const blogs = await Blog.updateMany({username: req.user.username},  {username: req.body.username});
                user.save();
                return res.status(200).json({success: true, result: "User Account updated succesfully"});
            }
            else if(user.username != req.user.username){
                return res.status(404).json({success: false, result: "You cant update others Account"});
            }   
        }else if(!user){
            return res.status(404).json({success: false, result: "user Not Found"});
        }
    }
    catch(error){
        res.status(500).json(error.message);
    }
  
}



async function deleteUser (req, res) {
    if(req.body.userId == req.params.userId){
        try{
            const user = await User.findByIdAndDelete(req.params.userId);
            if(user){
                res.status(200).json({success: true, result: "Account Deleted Succesfully"})
            }
            else if(!user){
                res.status(404).json({success: false, result: "Account Not Found"})
            }
        }
        catch(err){
            res.status(500).json({success: false, result: err.message})
        }
       
      
    }else{
        res.status(403).json({success: false, result: "You can only delete your Account"});
    }
}


module.exports = {getUser, deleteUser, updateuser}