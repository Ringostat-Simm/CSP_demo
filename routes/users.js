let express = require('express');
let router = express.Router();
let passport = require('passport');
let check_auth = require('../config/check_authentication');

const User = require('../models/user');

/* GET users login page. */
router.get('/login',  check_auth.public, function(req, res) {
  res.render('./users/login', {
    title : 'Авторизация | CSPlatform',
    req : req
  })
});

/* POST user login */
router.post('/login', check_auth.public, function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    req.toastr.error('Пожалуйста, заполните все поля!', 'Ошибка!');
    return res.redirect('/users/login');
  }
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      req.toastr.error(err.message, 'Ошибка!');
      return res.redirect('/users/login');
    }
    if (!user) {
      req.toastr.error(info.message);
      return res.redirect('/users/login')
    }
    req.logIn(user, function (err) {
      if (err) {
        req.toastr.error(err.message, 'Ошибка!');
        return res.redirect('/users/login');
      }
      return res.redirect('/index');
    });
  })(req, res, next);
});

/* GET user logout */
router.get('/logout', check_auth.private, function (req, res) {
  req.toastr.info(`Хорошего дня, ${req.user.firstname}!`);
  req.logout();
  return res.redirect('/')
});

/* GET user profile page */
router.get('/profile', check_auth.private, function(req, res){
  res.render('./users/profile', {
    title : `Профиль пользователя ${req.user.username} | CSPlatform`,
    req : req
  })
});

router.post('/profile/update/:user/:token', check_auth.private, function(req, res){
  let userId = req.params.user,
      userToken = req.params.token,
      firstname = req.body.username,
      lastname = req.body.usersurname,
      city = req.body.usercity;

    User.findOne({'_id': userId}, function(err, user){
      if (err) {
        res.status(500).send({'error':error}).end()
      }
      if (!user) {
        res.status(404).send(undefined).end()
      }

      user.firstname = firstname;
      user.lastname = lastname;
      user.city = city;

      user
          .save()
          .then( () => {
            res.status(200).send({result : 'User info saved'})
          })
          .catch( err => {
            res.status(400).send({error : 'Something went wrong. User don\'t saved to DB'})
          });
  });

});
module.exports = router;
