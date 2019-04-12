var express = require('express');
var router = express.Router();


//authorize
const authorize = (req, res, next)=> {
  if(!req.user){
      res.redirect('/');
  } else{
    next()
  }
}

/* GET users listing. */
router.get('/', authorize, function(req, res, next) {
  // console.log(req.user)
  res.render('users',{
    user: req.user
  })
});

module.exports = router;
