//verify the jwt token here which is sent in headers once a user is logged in
const { JWT_SECRET } = require('./config')
const jwt = require('jsonwebtoken')

//middleware function
const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({});
    }
    const jwt_token = jwt.verify(jwt_token,JWT_SECRET).split(' ')[1] //becuse it's <Bearer jadlfjadfadjfakf>

    try{
        const decoded = jwt.verify(jwt_token,JWT_SECRET);
        //add one more field in headers
        req.userId = decoded.userId;
        next();
    }catch{
        return res.status(413).json({
            message: "Invalid token"
        })
    }
}

module.exports = {
    authMiddleware
}