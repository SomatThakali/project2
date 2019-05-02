const db = require("../models");
const moment = require('moment');

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
        res.render("dashboards", {
          firtsName: user[0].dataValues.firstName,
          lastName: user[0].dataValues.lastName,
          email: user[0].dataValues.email,
          street: user[0].dataValues.street,
          city: user[0].dataValues.city,
          state: user[0].dataValues.state,
          zipcode: user[0].dataValues.zipcode,
          createdAt: moment(user[0].dataValues.createdAt).format('MMM Do YYYY')
        })
      });
    })(req, res, next);
  });

  app.get("/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logout");
    req.session.destroy();
    console.log("session end");
    return res.redirect("/home");
  });
};
