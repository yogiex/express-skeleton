const jwt = require('jsonwebtoken');
require('dotenv').config()

function generateAccessToken(username)  {
    const token = jwt.sign(username,process.env.SECRET_KEY, {expiresIn:'2h',algorithm:'HS512'});
    return token;
}
function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    //const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET ,(err,user) =>{
        //console.log(err)
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
module.exports =  generateAccessToken, authenticateToken;
                  