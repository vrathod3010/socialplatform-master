const passport = require("passport");
let FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../../model/user");


module.exports = function() {
    passport.use(new FacebookStrategy({
        clientID: '441076183380594',
        clientSecret: '6392697056c21039df98138dee36cbfb',
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