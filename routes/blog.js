const Blog = require("../model/blog");
const User = require("../model/user");
const Category = require("../model/category");

const router = require("express").Router();
const {getBlog, newBlog, updateBlog, deleteBlog} = require("../controller/blog");
const {auth, isLogedIn, isLogedOut} = require("../authentication");


// get posts
router.get("/", getBlog)


// new Post
router.post("/", newBlog)


// update post
router.put("/:blogId", updateBlog)


// delete post
router.delete("/:blogId", deleteBlog)

module.exports = router;