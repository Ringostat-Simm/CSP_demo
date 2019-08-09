let LocalStrategy = require('passport-local').Strategy;
let bcrypt = require('bcryptjs');

const User = require('../models/user');

module.exports = function(passport){
    // Local Strategy
    passport.use(new LocalStrategy(function(username, password, done){
        // Match Username
        User.findOne({$or : [{'username' : username}, {'email' : username}]}, function(err, user){
            if(err) throw err;

            if(!user){
                return done(null, false, { message: 'Пользователь не найден или ещё не был создан.' });
            }

            if(!user.isVerified){
                return done(null, false, { message: 'Аккаунт не подтверждён! Пожалуйста, подтвердите Ваш email' });
            }

            // Match Password
            bcrypt.compare(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Неправильный пароль...'});
                }
            });
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};