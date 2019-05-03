const db = require("../models");
const moment = require("moment");

const passport = require("passport");
const { forwardAuthenticated } = require("../config/auth");
module.exports = function(app) {
  app.get("/login", forwardAuthenticated, (req, res) =>
    res.render("login", { title: "login" })
  );

  app.post("/login", function(req, res, next) {
    // generate the authenticate method and pass the req/res

    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/login");
      }
      req.login(user, function(err) {
        if (err) {
          return next(err);
        }
        res.redirect(`dashboards/${user[0].dataValues.id}`);
      });
    })(req, res, next);
  });

  app.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    req.flash("success_msg", "You are logout");
    return res.redirect("/home");
  });
};
