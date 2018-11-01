function userAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        req.flash("info", "No estás autorizado");
        res.redirect("/login");
    }
};
module.exports = {userAuthenticated};