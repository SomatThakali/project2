const db = require("../models");
const moment = require("moment");

const passport = require("passport");
const { forwardAuthenticated } = require("../config/auth");
module.exports = function(app) {
  app.get("/login", forwardAuthenticated, (req, res) =>
    res.render("login", { title: "login" })
  );

  app.post(
    "/login",
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true
    }),
    function(req, res) {
      console.log("user", req.user);
      res.redirect(`dashboards/${req.user[0].dataValues.id}`);
    }
  );

  app.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    req.flash("success_msg", "You are logout");
    return res.redirect("/home");
  });
};
