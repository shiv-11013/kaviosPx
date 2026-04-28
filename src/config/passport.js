const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userModel = require("../models/user.model"); // baad mein banayenge

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {

      const email = profile.emails[0].value;

      
      let user = await userModel.findOne({ email });
  

      if (!user) {
        user = await userModel.create({
          email,
          name: profile.displayName,
          googleId: profile.id,
        });
      }

      return done(null, user);
    },
  ),
);
