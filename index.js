const express = require('express');
const app = express();
var morgan = require('morgan');
const Mongoose =  require('mongoose');
const userModel = require('./model/user');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyparser = require('body-parser');
//import User from './model/user.js';
require('dotenv').config()
app.use(cors());
app.use(bodyparser());
Mongoose.connect(process.env.MONGO_URI_TEST,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
app.use(morgan('dev'));


app.get('/ping', async (req,res) =>{
   return await res.send({msg:'PONG!'})
})

app.post('/auth/register', async (req,res) =>{
    // do something stuff
    const {email, username, password} = req.body;
    
    //const hashp = await bcrypt.hash(req.body.password,10)
    // const user = await new userModel({
    //     email: req.body.email,
    //     username: req.body.username,
    //     password: req.body.password,
    // })

    try {
        let ada = await userModel.findOne({email});
        if(ada) return res.status(400).send("email already exist")    
        const user = await userModel({email,username,password})
        await user.save()
        console.log(user)
        res.send('registered')
        
    } catch (error) {
        res.status(400).send(error)
    }

})

app.post('/auth/login', async(req,res) =>{
    try {
        // todo something
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