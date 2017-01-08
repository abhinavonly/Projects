'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');
var jwt = require('jsonwebtoken');
var secret = require('../../config');
module.exports = function (config) {
    return new LocalStrategy({
        usernameField: 'useremail',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    }, function (req, useremail, password, done) {
        User.findOne({ 'user.useremail': useremail }, function (err, user) {
            if (err) return done(err);
            if (!user || !user.validPassword(password)) {
                return done(null, null, false);
            } else {
                var token = jwt.sign({ user: user.nickname }, secret.jwtSecret);
                return done(null, token, user.nickname);
            }
        });
    });
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(LocalStrategy, 'LocalStrategy', '/Users/zh355245849/WebChat/server/passport/local-login.js');

    __REACT_HOT_LOADER__.register(User, 'User', '/Users/zh355245849/WebChat/server/passport/local-login.js');
}();

;

//# sourceMappingURL=local-login-compiled.js.map