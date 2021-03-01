const jwt = require('jsonwebtoken');
require('dotenv').config()

function generateAccessToken(username)  {
    return jwt.sign(username,process.env.SECRET_KEY, {expiresIn:'99h'});
    //return token;
}
function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]
    if(token == null) return res.sendStatus(401)
   
    jwt.verify(token, process.env.SECRET_KEY , (err,user) =>{
        if(err) return res.sendStatus(403)
        req.user = user._id
        next()
    })
    
}


module.exports =  {
    generateAccessToken, 
    authenticateToken
}
                  
