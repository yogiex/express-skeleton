//import mongoose from 'mongoose';
//import bcrypt from 'bcrypt';
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 8;
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        min: 6,
        max: 30,
    },

});

UserSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(saltRounds, function(err,salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
            user.password = hash;
            return next();
        })
    })
})
const User = mongoose.model("User",UserSchema);

module.exports = User;

