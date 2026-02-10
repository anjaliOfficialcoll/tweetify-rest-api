module.exports = (req, res, next) => {
  if (!req.session.userId) {
    req.flash('error', 'Please login to continue');
    return res.redirect("/login");
  }
  next();
};
