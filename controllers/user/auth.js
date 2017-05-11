const User = require('../../models/user');

function loginUser(req, res, next, redirect) {
    if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        const accountName = user.name.replace(' ', '-').toLowerCase();
        return res.redirect(redirect);
      }
    });
  } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
}

module.exports.loginUser = loginUser;