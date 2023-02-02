const Post = require("../model/blog");
const User = require("../model/user");
const Category = require("../model/category");
const bcrypt = require("bcrypt");
const express = require("express");



const router = require("express").Router();

const {getUser, deleteUser, updateuser} = require("../controller/user");
const {auth, isLogedIn, isLogedOut} = require("../authentication");



// get users
router.get("/",isLogedIn, getUser);


// new user
// router.post("/");


// update user
router.put("/:userId",isLogedIn, updateuser)

// delete user
router.delete("/:userId",isLogedIn, deleteUser);


module.exports = router;