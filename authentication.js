const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const session = require("express-session");
const  User = require("./model/user");



function auth (app){
        
    app.use(session({
        secret: 'John-Blog-API',
        resave: false,
        saveUninitialized: true
    }))


    app.use(passport.initialize());
    app.use(passport.session())

    passport.use(new localStrategy(async function(username, password,done){
        console.log("password ==", password);
        
        try{
            const user = await User.findOne({ username: username });
            if(user){
                const passwordMatch = await bcrypt.compare(password, user.password);
                console.log("passwordMatch == ", passwordMatch);

                if(passwordMatch){
                    return done(null, user);
                }
                else if(!passwordMatch){
                    return done(null, false, { message: 'Password doesnot found.' });
                }
                
            }else if(!user) { 
                return done(null, false, { message: 'User not found.' });
            }

        }catch(err){
            return done(err); 
        }

    }))

    passport.serializeUser(function(user, cb) {
        return cb(null, user);
    });

    passport.deserializeUser(function(user, cb) {
        return cb(null, user);
    });

}



function isLogedIn(req, res, next) {
    const isLogedIn = req.isAuthenticated();
    if(isLogedIn){
        return next();
    }
    else if(!isLogedIn){
    return res.status(401).json({"success": false, result: "You need to login first"});
    }
}

function isLogedOut(req, res, next) {
    const isLogedIn = req.isAuthenticated();
    console.log(isLogedIn);
    if(isLogedIn){
        req.logout(function(err) {
            if (err) {
                return err; 
            }
        });
        // return  res.json('Succesfully LogedIn');
        return next();
    }
    else if(!isLogedIn){
        // return next();
        return  res.json({"success": false, message: 'you already Logedout'});
    }
}

function isLogedOutRegister(req, res, next) {
    const isLogedIn = req.isAuthenticated();
    if(!isLogedIn){
        return next();
    }
    else if(isLogedIn){
    return res.status(401).json({"success": false, result: "You need to logOut first to Signup"});
    }
}


// function loginAuthenticator (req, res, next) {
//     const logedIn = req.isAuthenticated();
//     console.log(logedIn);
//     if(logedIn){
//         req.logout(function(err) {
//             if (err) {
//                 return err; 
//             }
//         });
//         // return  res.json('Succesfully LogedIn');
//         return next();
//     }
//     else if(!logedIn){
//         // return next();
//         return  res.json('already Logedout');
//     }
// }





module.exports = {auth, isLogedIn, isLogedOut, isLogedOutRegister};