const localStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');

// Load user model 
const User = require('../models/Users')


module.exports = function(passport) {
    passport.use(
        new localStrategy({ usernameField: 'email' }, (email,password,done) => {
            // Match user
            User.findOne({ email: email })
                .then(user => {
                    if( !user ) {
                        return done(null, false, { message: 'That email is not registered' })
                    } 

                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if( err ) throw err

                        if( isMatch ) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: 'Password incorrect' })
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
        });
        
        passport.deserializeUser((id, done) => {
            User.findById(id, function(err, user) {
                done(err, user);
            });
        });
}