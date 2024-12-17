import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
  res.redirect("/api/auth/user");
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

router.get("/auth/user", (req, res) => {
  // If user is authenticated by passport, req.user is set.
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

export default router;
