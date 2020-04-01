exports.logout = ((req, res) => {
  // this function remove user from req
  req.logout();
  res.redirect('/');
});
