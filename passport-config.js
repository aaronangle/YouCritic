const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
var db = require("./models");

function initialize(passport, getUserById) {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ email: email }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (!user.verifyPassword(password)) { return done(null, false); }
                return done(null, user);
            });
        }
    ));
    // passport.use(new LocalStrategy({ usernameField: 'email' }))
    passport.serializeUser((user, done) => done(null, id))
    // passport.deserializeUser((id, done) => done(null, getUserById(id)))
}

module.exports = initialize;

