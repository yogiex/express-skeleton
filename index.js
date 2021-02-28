const express = require('express');
const app = express();
const morgan = require('morgan');
const Mongoose =  require('mongoose');
const userModel = require('./model/user');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
//auth service
const generateAccessToken = require('./auth/jwt.strategy');
const authenticateToken = require('./auth/jwt.strategy');

require('dotenv').config()
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
Mongoose.connect(process.env.MONGO_URI_TEST,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
app.use(morgan('dev'));

app.use(function(req,res,next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next()
})
app.get('/ping', async (req,res) => {
   return await res.send({msg:'PONG!'})
})

app.get('/auth/testing', authenticateToken, (req,rest) => {
    // const users = new userModel()
    //  res.json(users.filter(user => user.username === req.users.email))
    //authenticateToken(req.token,process.env.ACCESS_TOKEN_SECRET)
    //res.header("x-auth-token")
    
    
    res.send({msg:"im reach heree guyssss"})
})

// app.get('/rahasia', passport.authenticate('jwt',{session:false}),(req,res,next) =>{
//  res.send('rahasia')
// })
// app.get('/token', async (req,res) =>{
//     const user = await new userModel()
//     const token = await generateAccessToken(user)
//     res.send({token})
// })
app.post('/auth/register', async (req,res) => {
    // do something stuff
    const {email, username, password} = req.body;
    
    //const hashp = await bcrypt.hash(req.body.password,10)
    // const user = await new userModel({
    //     email: req.body.email,
    //     username: req.body.username,
    //     password: req.body.password,
    // })

    try {
        const token = generateAccessToken({username}); // generate token pas register
        let ada = await userModel.findOne({email}); // nampung variable doang
        if(ada) return res.status(400).send("email already exist")    // ngecek user jika sudah ada
        const user = await userModel({email,username,password}) // destructuring user
        await user.save()
        console.log(user)
        console.log(token)
        //res.send('registered')
        res.status(201).json({      // response status dan jwt
            status:'success',       
            token,                  
            data:{                  
                user
            }
        })
        
    } catch (error) {
        res.status(400).send(error)
    }

})

app.post('/auth/login', async(req,res) => {
    
    try {
        const user = await userModel.findOne({email:req.body.email});
        if(user){
            const cmp = await bcrypt.compare(req.body.password,user.password)
            
            if(cmp){
                const token = generateAccessToken({email:req.body.email,role:user.role})
                //const token = generateAccessToken({user})
                res.status(200).json({
                    status:'auth works',
                    token: token
                })
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

app.get('/user', async (req, res) =>{
    const user = await userModel.find({})
    try {
        res.send(user)
    } catch (error) {
        res.status(400).send()
    }
})
app.listen(process.env.PORT, () => console.log(`app server running on ${process.env.PORT}`))