const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs")

module.exports = (passport, user) => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        user.findByPk(id).then(user => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use("local", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
        function (req, email, password, done) {
            user.findOne({ where: { email: email } }).then(username => {
                if (!username) {
                    return (null, false, { message: "That email isn't registered" })
                }
                if (!bcrypt.compareSync(password, username.password)) {
                    return (null, false, { message: "Incorrect Password" })
                }

                return done(null, username.get())
            })
        }))
}
