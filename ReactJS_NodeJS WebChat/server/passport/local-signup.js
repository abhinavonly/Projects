const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');     

module.exports = function(config) {
    return  new LocalStrategy(
        {
            usernameField: 'useremail',
            passwordField: 'password',
            session :false,
            passReqToCallback: true
        },
        (req,useremail,password, done) => {
                User.findOne({ 'user.useremail': useremail }, (err, user) => {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false);
                    } else {
                        var newUser = new User();
                        newUser.user.useremail = useremail;
                        newUser.user.password = newUser.generateHash(password);
                        newUser.user.nickname = req.body.nickname;
                        newUser.save((err) => {
                            if (err)
                                throw err;
                            
                            return done(null, newUser);
                        });
                    }
                });
        });
}
