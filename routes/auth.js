





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
const {isLogedIn, isLogedOut} = require("../authentication");
const {login, logOut, homeBlog} = require("../controller/auth");




router.post('/login', passport.authenticate('local',  { failureRedirect: '/login', failureMessage: true }), (req, res)=>{
    res.status(200).json({success: true, result: "LogedIn Succesfully"})
});


router.get('/login', (req, res, next) => {
    if(!req.isAuthenticated()){
        return next();
    }
    else if(req.isAuthenticated()){
        return res.status(404).json({success: false, result: "already loggedIn"});
    }
} ,login);


router.post('/logout', isLogedOut ,logOut);


router.get('/', isLogedIn ,homeBlog)


module.exports  =  router;
