const jwt = require('jsonwebtoken');
require('dotenv').config()

function generateAccessToken(username)  {
    return jwt.sign(username,process.env.SECRET_KEY, {expiresIn:'2h'});
    //return token;
}
function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    //const authHeader = req.headers.authorization;
    //const authHeader = req.headers['token']
    // const token = authHeader && authHeader.split(' ')[1]
    // if(token == null) return res.sendStatus(401)
   
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err,user) =>{
    //     //console.log(err)
    //     if(err) return res.sendStatus(403)
    //     req.user = user
    //     next()
    // })
    if(typeof authHeader !== 'undefined'){
        const bearer = authHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next()
    } else {
        res.sendStatus(403)
    }
    
}
module.exports =  generateAccessToken, authenticateToken;
                  