const db = require("../models");
const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { forwardAuthenticated } = require("../config/auth");

module.exports = function(app) {
  app.get("/register", forwardAuthenticated, (req, res) =>
    res.render("register", { title: "register" })
  );

  app.get("/dashboards", forwardAuthenticated, (req, res) =>
    res.render("dashboards", { title: "Profile" })
  );
  app.get("/login", forwardAuthenticated, (req, res) =>
    res.render("login", { title: "login" })
  );
  app.get("/about", (req, res) => res.render("about", { title: "about" }));
  app.get("/contact", (req, res) =>
    res.render("contact", { title: "contact" })
  );

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
      db.User.findAll({
        where: {
          email
        }
      }).then(user => {
        if (user.length) {
          console.log("user: ", user, email);

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
                res.render("dashboards", { firstName, lastName });
              })
              .catch(err => {
                res.json(err);
              });
          });
        }
      });
    }
  });

  app.post("/login", function(req, res, next) {
    // generate the authenticate method and pass the req/res
    let errors = [];
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
        res.render("dashboards", user[0].dataValues);
      });
    })(req, res, next);
  });

  app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    let errors = [];

    if (!email || !password) {
      error.push({msg: "Please enter your email address and password"});
    }
  })


  app.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    return res.redirect("/home");
  });

  app.post("/contactSubmission", (req, res) => {
    console.log("In Contact submission");
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    db.Contact.create({
      name: name,
      email: email,
      message: message
    }).then(function(err, resp) {
      if (err) {
        console.log(err);
      } else {
        console.log(resp);
      }
    });
  });

  app.get("/api/lending", function(req, res) {
    db.Items.findAll({}).then(function(dbItems) {
      res.json(dbItems);
    });
  });

app.post("/api/lending", function(req,res) {
  db.Items.create(req.body).then(function(dbItems) {
    res.json(dbItems);
  });

app.delete("/api/lending/:id", function(req, res) {
    db.Items.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbItems) {
      res.json(dbItems);
    });
});

app.put("/api/lending", function(req, res) {
  db.Items.update(
    req.body,
    {
      where: {
        id: req.body.id
      }
    }).then(function(dbItems) {
    res.json(dbItems);
  });
});
});
};
