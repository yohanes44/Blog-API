

function login(req, res, next) {
    return res.status(200).json({Message: "Login Here"})
}


function logOut(req, res, next) {
    res.json({success: true, Message: "LogedOut Success"});
}

function homeBlog (req, res){
    res.json({success: true, Message:"Welcome to my BLOG API Project"}); 
 }



 module.exports = {login, logOut, homeBlog}