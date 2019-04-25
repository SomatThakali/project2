const db = require("../models");
const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { forwardAuthenticated } = require("../config/auth");

module.exports = function(app) {
  app.get("/register", forwardAuthenticated, (req, res) =>
    res.render("register")
  );

  app.get("/dashboards", forwardAuthenticated, (req, res) =>
    res.render("dashboards")
  );
  app.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

  /** Register Post */
  app.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, password2 } = req.body;
    let errors = [];

    if (!firstName || !lastName || !email || !password || !password2) {
      errors.push({ msg: "Please enter all fields" });
    }

    if (password != password2) {
      errors.push({ msg: "Passwords do not match" });
    }

    if (password.length < 6) {
      errors.push({ msg: "Password must be at least 6 characters" });
    }

    if (errors.length > 0) {
      res.render("register", {
        errors,
        firstName,
        lastName,
        email,
        password,
        password2
      });
    } else {
      db.User.findAll({}).then(user => {
        if (user.email) {
          errors.push({ msg: "Email already exists" });
          res.render("register", {
            errors,
            firstName,
            lastName,
            email,
            password,
            password2
          });
        } else {
          bcrypt.hash(password, 10, function(err, hash) {
            db.User.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash
            })
              .then(user => {
                res.redirect("/login");
              })
              .catch(err => {
                res.json(err);
              });
          });
        }
      });
    }
  });

  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/dashboards",
      failureRedirect: "/login"
    })
  );
};
