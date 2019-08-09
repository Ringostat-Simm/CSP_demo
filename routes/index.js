let express = require('express');
let router = express.Router();
let check_auth = require('../config/check_authentication');

/* GET landing page. */
router.get('/', check_auth.public, function(req, res) {
  res.render('./landing/landing', {
    title: 'Customer Support Platform',
    req : req
  });
});

router.get('/index', check_auth.private, function(req, res){
  res.render('./index/index', {
    title: 'Главная страница | CSPlatform',
    req : req
  })
});

module.exports = router;
