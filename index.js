const express = require('express');
const app = express();
const morgan = require('morgan');
const Mongoose =  require('mongoose');
const userModel = require('./model/user');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser')
const session = require('express-session')
//auth service
//const auth = require('./auth/jwt.strategy');
const passport = require('passport')
const {authenticateToken, generateAccessToken} = require('./auth/jwt.strategy');


require('dotenv').config()
app.use(express.json())
app.use(cors());
app.use(cookieParser()); //cookieee
// app.use(session({
//     secret: 'secretttttt',
//     cookie :{
//         maxAge: 60 * 300000,
//         httpOnly: true,
//         secure: true
//     }
// }))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
Mongoose.connect(process.env.MONGO_URI_TEST,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
},console.log('DB connect'))
app.use(morgan('dev'));

app.use(function(req,res,next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Set-Cookie');
    next()
})

app.get('/ping', async (req,res) => {
   return await res.send({msg:'PONG!'})
})

app.get('/auth/testing', authenticateToken, (req,res) => {
    res.send({msg:"im reach heree guyssss"})
})

app.post('/auth/register', async (req,res) => {
    // do something stuff
    const {email, username, password} = req.body;
    

    try {
        const token = generateAccessToken({username}); // generate token pas register
        let ada = await userModel.findOne({email}); // nampung variable doang
        if(ada) return res.status(400).send("email already exist")    // ngecek user jika sudah ada
        const user = await userModel({email,username,password}) // destructuring user
        await user.save()
        //console.log(user)
        console.log(token)
        //res.send('registered')
        res.status(201).json({      // response status dan jwt
            status:'success',       
            token                  
            
        })
        
    } catch (error) {
        res.status(400).send(error)
    }

})

app.post('/auth/login', async(req,res) => {
    
    try {
        const user = await userModel.findOne({email:req.body.email});
        const sess = await req.session;
        if(user){
            const cmp = await bcrypt.compare(req.body.password,user.password)
            
            if(cmp){
                const token = generateAccessToken({id:user._id,email:req.body.email,role:user.role})
                //res.setHeader('X-token',_token)
                //const token = generateAccessToken({user:req.body.email})
                res.status(200).json({
                    status:'auth works',
                    token: token
                })
                
                
                res.setHeader("Set-Cookie", token)
                //res.cookie("session_id",token)
                //res.cookie("SESSION_ID",token,{httpOnly:true,secure:true,maxAge:600000}).send('cookie set')
            }else{
                res.send(404)
            }
        } else {
            res.status(400).json({
                status:'failed'
            })
        }
    } catch (error) {
        res.send(error)
    }
})
app.get('/auth/logout',async (req,res) =>{
    const des = await req.session.destroy()
    return des
});

// function validateCookie(req,res,next){
//     const {cookie} = req
//     console.log(cookie)
//     next()
// }
// app.post('/tescookie', validateCookie,  (req,res)=>{
//     const {email,password} = req;
//     //const token =  generateAccessToken({email,password})
//     res.cookie('session_id','password')
//     res.status(200).json({msg:"sukses cookie"})
// })
app.get('/user', async (req, res) =>{
    const user = await userModel.find({})
    try {
        res.send(user)
    } catch (error) {
        res.status(400).send()
    }
})
app.listen(process.env.PORT, () => console.log(`app server running on ${process.env.PORT}`))