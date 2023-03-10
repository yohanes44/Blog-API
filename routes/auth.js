





const express = require("express");
const app = express();
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const session = require("express-session");
const  User = require("../model/user");
const Blog = require("../model/blog");
const Category = require("../model/category");

const router = require("express").Router();
const {isLogedIn, isLogedOut, isLogedOutRegister} = require("../authentication");
const {login, logOut, homeBlog, register} = require("../controller/auth");




router.post('/login',(req, res, next) => {
        const isLogedIn = req.isAuthenticated();
        console.log(isLogedIn);
        if(isLogedIn){
            return  res.json({success: false, message: 'you already LogedIn'});  
        }
        else if(!isLogedIn){
            return next();
        }
    }, passport.authenticate('local',  { failureRedirect: '/loginFailure', failureMessage: true }), (req, res)=>{
    res.status(200).json({success: true, message: "LogedIn Succesfully"})
});


// router.get('/login',() => {
//     const isLogedIn = req.isAuthenticated();
//     console.log(isLogedIn);
//     if(isLogedIn){
//         return  res.json('already LogedIn');  
//     }
//     else if(!isLogedIn){
//         return next();
//     }
// } ,login);


router.post('/logout', isLogedOut ,logOut);

router.post('/register', isLogedOutRegister, register);

router.get('/', isLogedIn ,homeBlog)
router.get('/loginFailure' ,(req, res) => {
    res.status(403).json({success: false, message: "Login Failed"});
})



module.exports  =  router;
