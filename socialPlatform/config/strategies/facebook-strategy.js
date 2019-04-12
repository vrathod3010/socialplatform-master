const passport = require("passport");
let FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../../model/user");


module.exports = function() {
    passport.use(new FacebookStrategy({
        clientID: '579528725862138',
        clientSecret: '934d813c325b9f3e9f83629de30cf1c9',
        callbackURL: "http://localhost:3000/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOne({sId:profile._json.id})
        .then(newUser => {
            if(newUser) {
               console.log(`already existing user ${newUser}`);
               done(null, newUser);
            } else {
                new User({
                    sId: profile._json.id,
                    name: profile._json.name
                  })
                    .save()
                    .then(res => {
                      console.log(`new user created ${res}`);
                      done(null, res)
                    });
            }
        })
      }
    ));
}