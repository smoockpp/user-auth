const User = require('../../models/user');

function deleteController(req, res, next) {
    if(! req.session.userId ) {
        var err = new Error('You are not authorized to view this page.');
        err.status = 403;
        return next(err);
    }
    User.remove({ _id: req.iserId }, function(err) {
        if (!err) {
            if (req.session) {
                req.session.destroy(function(err) {
                    if (err) {
                        return next(err);
                    } else {
                        console.log(req.body);
                        // return res.redirect('/deleted-user');
                    }
                });
            }
        } else {
            console.log(err);
        }
    });
}

module.exports.deleteController = deleteController;