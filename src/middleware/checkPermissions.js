function userAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        req.flash("info", "No estás autorizado");
        res.redirect("/login");
    }
};
function adminAuthenticated(req, res, next){
    if(req.isAuthenticated() && res.locals.currentUser.permissionLevel === 1){
        next();
    }else{
        req.flash("info", "No estás autorizado");
        res.redirect("/login");
    }
};
module.exports = {userAuthenticated, adminAuthenticated};