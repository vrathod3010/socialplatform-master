const express = require("express");
const passport = require("passport");
const router = express.Router();

//to sign in
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

//to redirect
// router.get('/google/callback', passport.authenticate('google',{
//     successRedirect: '/users/',
//     failure: '/error/'
// }))

router.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res, next) => {
    res.redirect("/users");
  }
);

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

//twitter
router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter"),
  (req, res, next) => {
    res.redirect("/users");
  }
);


//facebook
router.get("/facebook", passport.authenticate("facebook", {
  scope: ['email']
}));


router.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  (req, res, next) => {
    res.redirect("/users");
  }
);


module.exports = router;
