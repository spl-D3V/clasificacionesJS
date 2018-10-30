const passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
const {Mongose} = require('../models/db/mongoosedb');
let {User} = require('../models/Usuario');

passport.use('login', new LocalStrategy(
    function(username, password, done){
        User.findOne({username}, function(err, user){
            if(err){
                return done(err);
            }
            if(!user){
                return done(null, false, {message: "No existe el usuario"});
            }
            user.checkPassword(password, function(err, res){
                if(err){
                    return done(err);
                }
                if(res){
                    return done(null, user);
                }else{
                    return done(null, false, {message:"Password erroneo"});
                }
            });
        });
    }
));

module.exports = function(){
    passport.serializeUser(function(user, done){
        done(null, user._id);
    });
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });
}