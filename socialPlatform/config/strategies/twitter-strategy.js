const passport = require("passport");
let TwitterStrategy = require("passport-twitter").Strategy;
const User = require("../../model/user");

module.exports = function() {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: '4g4i7QgD0dqP3ZEaI2FmsgIpb',
        consumerSecret: '0HcY991mgq02jb1XOS4GAo9xknv2WyccwfhhKkWVpPZGHiLZnL',
        callbackURL: "http://localhost:3000/auth/twitter/callback"
      },
      function(token, tokenSecret, profile, done) {
        User.findOne({sId:profile._json.id})
        .then(newUser => {
            if(newUser) {
               console.log(`already existing user ${newUser}`);
               done(null, newUser);
            } else {
                new User({
                    sId: profile._json.id,
                    name: profile._json.name,
                    email: profile._json.email,
                    image: profile._json.profile_image_url
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
