// auth/passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; //for auth with email and password
const JwtStrategy = require('passport-jwt').Strategy;       //for auth with JWT
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');                         //password encryption
const User = require('../models/User');

// Local strategy for login
passport.use(new LocalStrategy({
    //for auth users based on email and password instead of deafult
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {   //verification function
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return done(null, false, { message: 'Incorrect email.' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
        return done(null, user); //success auth
    } catch (error) {
        return done(error);   //error
    }
}));

// JWT strategy for protected routes
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret',     //secret to verify JWT
}, async (jwtPayload, done) => {
    try {
        const user = await User.findByPk(jwtPayload.id); //find user id to fetch User from db
        if (!user) return done(null, false);
        return done(null, user);  //user exists
    } catch (error) {
        return done(error);       //false user
    }
}));

module.exports = passport;
