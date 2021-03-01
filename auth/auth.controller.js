const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../model/user');

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email,password,done) => {
            try {
                const user = await userModel.findOne({email});
                if(!user) {
                    return done(null,false, {message: 'User not found'})
                }
                const validate = await bcrypt.compare(password,user.password)
                if(!validate){
                    return done(null, false,{message:'wrong password'})
                }
                return done(null, user,{message: 'Logged in succesfully'})
            } catch (error) {
                return done(error)
            }
        }
    )
)