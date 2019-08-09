module.exports = {
  public : function(req, res, next){
      if (!req.isAuthenticated()) {
          next();
      } else {
          res.redirect('/index')
      }
  },
  private : function(req, res, next){
      if (req.isAuthenticated()) {
          next();
      } else {
          req.toastr.error('Необходимо пройти авторизацию!');
          res.redirect('/users/login')
      }
  }
};