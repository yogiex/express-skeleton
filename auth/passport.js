const passport = require('passport')
const passportJWT = require('passport-jwt')
const JWTstrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

require('dotenv').config()
passport.use(
    new JWTstrategy({
        secretOrKey: process.env.SECRET_KEY,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token,done)=>{
        try {
            return done(null,token.user)
        } catch (error) {
            done(error)
        }
    })
)