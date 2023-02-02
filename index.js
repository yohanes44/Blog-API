require('dotenv').config();
const express = require("express");
const app = express();
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const session = require("express-session");
const  User = require("./model/user");
const cors = require("cors");
require("./db");
 const {auth, isLogedIn, isLogedOut} = require("./authentication");
app.use(express.json());


const routerUser = require("./routes/user");
const routerBlog = require("./routes/blog");
 const routerAuth = require("./routes/auth");

const {login, logOut, homeBlog} = require("./controller/auth");
const {getBlog} = require("./controller/blog");

 auth(app);

 app.use(cors())
 app.use(express.static('public'))


app.use("/api/user", routerUser);
app.use("/api/blog",isLogedIn, routerBlog);
app.use("/api/auth", routerAuth);




app.get("/",isLogedIn, (req, res) => {
    res.sendFile(__dirname + "/view/home.html");
})
app.get("/login", (req, res, next) => {
    if(!req.isAuthenticated()){
        return next();
    }
    else if(req.isAuthenticated()){
        return res.status(404).json({success: false, result: "You are already loggedIn"});
    }
},login)

app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`);
})