const express = require('express');
const app = express();
const morgan = require('morgan');
const Mongoose =  require('mongoose');
const userModel = require('./model/user');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const generateAccessToken = require('./auth/jwt.strategy');
require('dotenv').config()
app.use(cors());
//app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
Mongoose.connect(process.env.MONGO_URI_TEST,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
app.use(morgan('dev'));

app.post('/auth/login',async (req,res,next) =>{
    passport.authenticate(
        'login',
        async (err,user,info) =>{
            try {
                if(err || !user) {
                    const error = new Error('An error occured');
                    return next(error)
                }
                req.login(
                    user,
                    {session:false},
                    async (error)=>{
                        if(error) return next(error)
                        const body = {_id:user._id,email:user.email}
                        const token = generateAccessToken({user:body})
                        return res.json({token})
                    }
                )
            } catch (error) {
                return next(error)
            }
        })(req,res,next)
})



app.listen(process.env.PORT, () => console.log(`app server running on ${process.env.PORT}`))