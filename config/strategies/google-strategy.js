const passport = require("passport");
// const mongoose = require('mongoose');
let GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../model/user");

module.exports = function() {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "600923711725-oelmep4jshlpugr0ob1sgciiid3b6dfu.apps.googleusercontent.com",
        clientSecret: "NGLcASMc7ygnXcrTLQHegSf1",
        callbackURL: "http://localhost:3000/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        // console.log(profile._json);
        // // done(null, profile);
        User.findOne({gId:profile._json.sub})
        .then(newUser => {
            if(newUser) {
               console.log(`already existing user ${newUser}`);
               done(null, newUser);
            } else {
                new User({
                    sId: profile._json.sub,
                    name: profile._json.name,
                    email: profile._json.email,
                    image: profile._json.picture
                  })
                    .save()
                    .then(res => {
                      console.log(`new user created ${res}`);
                      done(null, res)
                    });
            }
        })

        
      }
    )
  );
};
