const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');     
const jwt = require('jsonwebtoken');
const secret = require('../../config');
module.exports = function(config) {
    return  new LocalStrategy(
        {
            usernameField: 'useremail',
            passwordField: 'password',
            session :false,
            passReqToCallback: true
        },
        (req,useremail,password, done) => {
                User.findOne({ 'user.useremail': useremail}, (err, user) => {
                    if (err)
                        return done(err);
                    if (!user || !user.validPassword(password)) {
                        return done(null,null,false);
                    }
                    else 
                    {
                        var token = jwt.sign({ user: user.user.nickname }, secret.jwtSecret);
                        return done(null,token,user.user.nickname);
                    }
                });
        });
}