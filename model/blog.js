const mongoose = require("mongoose");


const BlogSchema = new mongoose.Schema({
    categories: [String],
    username: String,
    title: String,
    detail: String
});



module.exports = mongoose.model("Blog", BlogSchema);