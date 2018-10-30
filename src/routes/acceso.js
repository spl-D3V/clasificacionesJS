const express = require("express");
const passport = require("passport");
const {Mongoose} = require('../models/db/mongoosedb');
const {User} = require("../models/Usuario");
const router = express.Router();

router.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

router.get("/", function(req, res, next){
        res.render("index", {users:["ramiro"]});
    }
);
router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate('login', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});
router.get("/signup", function(req, res){
    res.render("signup");
});

router.post("/signup", function(req, res, next){
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({username}, function(err, user){
        if(err){
            return next(err);
        }
        if(user){
            req.flash("error", "Usuario ya existente");
            return res.redirect("/signup");
        }
        let newUser = new User({
            username: username,
            password: password
        });
        newUser.save().then(() => {
            res.redirect("/");
        }).catch((e)=>{
            res.status(404).send(e);
        });
    });
});



module.exports = router;