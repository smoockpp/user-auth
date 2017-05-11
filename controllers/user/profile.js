const User = require('../../models/user');

function profileController(req, res, next) {
    if(! req.session.userId ) {
        var err = new Error('You are not authorized to view this page.');
        err.status = 403;
        return next(err);
    }
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
            return next(error);
            } else {
            return res.render('profile', {title: 'Profile', name: user.name, favorite: user.favoriteBook, email: user.email, userId: user._id});
            }
        })
}

module.exports.profileController = profileController;