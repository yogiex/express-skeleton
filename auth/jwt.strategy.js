const jwt = require('jsonwebtoken');
require('dotenv').config()

function generateAccessToken(username)  {
    return jwt.sign(username,process.env.SECRET_KEY, {expiresIn:'12h'});
}
function authenticateToken(req,res,next){
    //const authHeader = req.header['authorization'];
    const authHeader = req.header.authorization;
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token,process.env.TOKEN_SECRET ,(err,user) =>{
        console.log(err)
        if(err) return res.sendStatus(403)
        req.user = user
        return next()
    })
}
module.exports =  generateAccessToken, authenticateToken;
                  