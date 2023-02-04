const Blog = require("../model/blog");
const User = require("../model/user");
const Category = require("../model/category");
const bcrypt = require("bcrypt");

function login(req, res, next) {
    return res.status(200).json({Message: "Login Here"})
}


function logOut(req, res, next) {
    res.json({success: true, Message: "LogedOut Succesfully"});
}

function homeBlog (req, res){
    res.json({success: true, Message:"Welcome to my BLOG API Project"}); 
 }

 async function register (req, res) {
  
    try{
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt)
        const newUser  = await new User(req.body)
        newUser.save();
        res.status(200).json({success: true, result: newUser});
    }catch(error){
        res.status(500).json({success: false, result: error.message})
    }
}


 module.exports = {login, logOut, homeBlog, register}