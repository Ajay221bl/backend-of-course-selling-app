const jwt = require("jsonwebtoken");
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

function userMiddleware(req, res, next){
    const token = req.headers.token;

    const decoded_token = jwt.decode(token, JWT_USER_SECRET);


    if(!decoded_token){
        res.json("you are not signed in")
    }
    req.userId = decoded_token.userId;
    next()
}



module.exports = {
    userMiddleware : userMiddleware
}

