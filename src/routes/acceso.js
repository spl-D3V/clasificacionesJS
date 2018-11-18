const express = require("express");
const router = express.Router();
const passport = require("passport");
const {User} = require("../models/Usuario");
const {userAuthenticated} = require('../middleware/checkPermissions');

router.use(function(req, res, next){
    res.locals.currentUser = req.user ? req.user.toJSON() : undefined;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

router.get("/", function(req, res, next){
    res.render("index");
});
router.get("/login", function(req, res){
    res.render("login");
});
router.get("/signup", function(req, res){
    res.render("signup");
});
router.get("/logout", userAuthenticated, function(req, res){
    req.logout();
    res.redirect("/");
});

router.post("/login", passport.authenticate('login', {
    successRedirect: "/inscripcion",
    failureRedirect: "/login",
    failureFlash: true
}));
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
            req.flash("info", "Registro exitoso");
            res.redirect("/");
        }).catch((e)=>{
            res.status(404).send(e);
        });
    });
});

module.exports = router;