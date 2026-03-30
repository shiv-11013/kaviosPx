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
      // YAHAN TERA KAAM HAI:
      // 1. profile.emails[0].value se email nikalo

      const email = profile.emails[0].value;

      // 2. DB mein check karo user exist karta hai?
      let user = await userModel.findOne({ email });
      // 3. Nahi karta toh create karo

      if (!user) {
        user = await userModel.create({
          email,
          name: profile.displayName,
          googleId: profile.id,
        });
      }
      // 4. done(null, user) call karo
      return done(null, user);
    },
  ),
);
