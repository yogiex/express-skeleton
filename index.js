const express = require('express');
const app = express();
const morgan = require('morgan');
const Mongoose =  require('mongoose');
const userModel = require('./model/user');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyparser = require('body-parser');

//auth service
const generateAccessToken = require('./auth/jwt.strategy');
const authenticateToken = require('./auth/jwt.strategy');

require('dotenv').config()
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}))
Mongoose.connect(process.env.MONGO_URI_TEST,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
app.use(morgan('dev'));


app.get('/ping', async (req,res) => {
   return await res.send({msg:'PONG!'})
})

app.get('/auth/testing', authenticateToken, (req,rest) => {
    return res.send({msg:'works'})
})
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
        const token = generateAccessToken({username}) // generate token pas register
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
    const {username, password} = req.body;
    try {
        let ada = await userModel.findOne({username})
        if(!ada) return res.status(404).send('username doesnt exist');
        const user = await userModel({username,password})
    } catch (error) {
        res.status(400).send(error)
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