const jwt = require("jsonwebtoken");
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

function adminMiddleware(req, res, next){
    const token = req.headers.token;

    const decoded_token = jwt.decode(token, JWT_ADMIN_SECRET);


    if(!decoded_token){
        res.json("you are not signed in")
    }
    req.adminId = decoded_token.adminId;
    next()
}



module.exports = {
    adminMiddleware : adminMiddleware
}

