var express = require('express');
var router = express.Router();



router.use(function(req, res, next) {
  res.locals.user = null;
  next();
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('testView');
});

router.post('/setUser',(req,res,next)=>{
    let user = req.body.user;
    res.render('index');
});

router.post('/jaja',(req,res,next)=>{
    let test = req.body.name;
    res.send(test);
});

module.exports = router;
