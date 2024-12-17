import express from "express";
import routes from "./routes/index.js";

import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { createProxyMiddleware } from "http-proxy-middleware";

import { handler } from "./frontend/build/handler.js";

const app = express();

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      // Save user info in your database or session
      return done(null, profile);
    }
  )
);

// Serialize user data into the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user data from the session
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use("/api", routes);

app.use(
  "*",
  createProxyMiddleware({
    target: "http://localhost:5173",
    changeOrigin: true
  })
);

// app.use("/", handler);

app.listen(80, () => {
  console.log("App up");
});
