// TODO: LOW 4 Block routes based on admin
// Example in the auth files deviationDB
function loginRequired (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}


exports.required = loginRequired;
