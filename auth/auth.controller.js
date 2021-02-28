const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('../model/user')
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, 
    function(jwtPayload, done){
        return userModel.findById(jwtPayload.sub)
        .then(user => {
            return done(null, user)
        }
        ).catch(err =>{
            return done(err)
        })
    }))