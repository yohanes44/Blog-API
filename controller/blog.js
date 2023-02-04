const Blog = require("../model/blog");
const User = require("../model/user");
const Category = require("../model/category");

 async function getBlog (req, res) {
    try{
            if(req.query.username){
                const blogs = await Blog.find({username: req.query.username});
                return res.status(200).json({success: true, result: blogs});
            }
            else if(!req.query.username){
                const blogs = await Blog.find();
                return res.status(200).json({success: true, result: blogs});
            }

    }
    catch(error){
        res.status(500).json({success: false, result: error.message});
    }
}

async function newBlog (req, res) {
 
    try{
        const newBlog = await new Blog(req.body);
        newBlog.username = req.user.username;
        newBlog.save();
        res.status(200).json({success: true, result: newBlog});
    }
    catch(error){
        res.status(500).json({success: false, result: error.message});
    }

}

async function updateBlog (req, res){
    try{

        const blog = await Blog.findOne({_id: req.params.blogId});
        if(blog){
            if(blog.username == req.user.username){
                if(req.body.title){
                    blog.title = req.body.title;
                }
                if(req.body.detail){
                    blog.detail = req.body.detail;
                }
                blog.save();
                return res.status(200).json({success: true, message: "blog updated succesfully"});
            }
            else if(blog.username != req.user.username){
                return res.status(404).json({success: false, message: "You cant update a blog other than yours"});
            }   
        }else if(!blog){
            return res.status(404).json({success: false, message: "blog Not Found"});
        }
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

async function deleteBlog (req, res) {
    try{

        const blog = await Blog.findById(req.params.blogId);
        
        if(blog){
            if(blog.username == req.user.username){
                blog.remove();
                return res.status(200).json({success: true, message: "blog deleted succesfully"});
            }
            else if(blog.username != req.user.username){
                return res.status(404).json({success: false, message: "You cant delete a blog other than yours"});
            }   
        }
        else if(!blog){
            return res.status(500).json({success: false, message: "There is No blog with this ID!"});
        }
       

    }
    catch(error){
        res.status(500).json({success: false, result: error.message});
    }
}




module.exports = {getBlog, newBlog, updateBlog, deleteBlog}