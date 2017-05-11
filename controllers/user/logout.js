function logoutUser(req, res, next, redirect) {
    if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect(redirect);
      }
    });
  }
}

module.exports.logoutUser = logoutUser;

