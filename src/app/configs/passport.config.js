const { compareSync } = require("bcrypt");
const { PassportStatic } = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const {
  Strategy: GoogleStrategy,
  Profile,
} = require("passport-google-oauth20");
const User = require("../models/user/user.model");

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
  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: envConfig.GOOGGLE_CLIENT_ID!,
  //       clientSecret: envConfig.GOOGGLE_CLIENT_SECRET!,
  //       callbackURL: envConfig.GOOGGLE_CALL_BACK_URL,
  //     },
  //     async function (
  //       accessToken,
  //       refreshToken,
  //       profile,
  //       cb
  //     ) {
  //       const { sub, given_name, family_name, picture, email, email_verified } =
  //         profile?._json;

  //       const gogleUser = {
  //         firstName: given_name,
  //         lastName: family_name,
  //         avatar: picture,
  //         email: email,
  //         password: hashSync(sub, 10),
  //         phone: "",
  //         address: "",
  //         role: "user",
  //         verified: email_verified,
  //         wishList: [],
  //         cartList: [],
  //         buyerList: [],
  //       };

  //       try {
  //         const user = await User.findOne({ email: email });

  //         if (!user) {
  //           const newUser = await User.create(gogleUser);
  //           return cb(null, newUser);
  //         }

  //         const updatedUser = {
  //           firstName: given_name,
  //           lastName: family_name,
  //           avatar: picture,
  //           email: email,
  //           phone: "",
  //           address: "",
  //           verified: email_verified,
  //         };

  //         const newUpdatedUser = await User.findOneAndUpdate(
  //           { email },
  //           updatedUser,
  //           { new: true }
  //         );

  //         return cb(null, newUpdatedUser);
  //       } catch (error) {
  //         return cb(error, null);
  //       }
  //     }
  //   )
  // );

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (_id, done) {
    console.log(_id);
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
