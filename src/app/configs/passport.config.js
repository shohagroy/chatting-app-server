const { compareSync } = require("bcrypt");
const { Strategy: LocalStrategy } = require("passport-local");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/user/user.model");
const env = require("../../config");
const { hashSync } = require("bcrypt");

const passportConfig = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }

          if (!compareSync(password, user.password)) {
            return done(null, false, { message: "Incorrect password." });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL:
          env.node_env !== "development"
            ? env.google_call_back_url
            : "http://localhost:5000/auth/callback",
      },

      async function (accessToken, refreshToken, profile, cb) {
        const { sub, given_name, family_name, picture, email } = profile?._json;

        const gogleUser = {
          firstName: given_name,
          lastName: family_name,
          avatar: picture,
          email: email,
          password: hashSync(sub, 10),
        };

        try {
          const user = await User.findOne({ email: email });

          if (!user) {
            const newUser = await User.create(gogleUser);
            return cb(null, newUser);
          }

          const updatedUser = {
            firstName: given_name,
            lastName: family_name,
            avatar: picture,
          };

          const newUpdatedUser = await User.findOneAndUpdate(
            { email },
            updatedUser,
            { new: true }
          );

          return cb(null, newUpdatedUser);
        } catch (error) {
          return cb(error, null);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (_id, done) {
    User.findOne({ _id })
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error);
      });
  });
};

module.exports = passportConfig;
