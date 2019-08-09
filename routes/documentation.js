let express = require('express');
let router = express.Router();

router.get('/', function(req, res){
    res.render('./documentation/documentation', {
        title: 'Customer Support Platform: Documentation',
        req : req
    });
});

module.exports = router;