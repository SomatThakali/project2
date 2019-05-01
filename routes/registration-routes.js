const db = require("../models");
const bcrypt = require("bcryptjs");
const { forwardAuthenticated } = require("../config/auth");

module.exports = function(app) {
  app.get("/register", forwardAuthenticated, (req, res) =>
    res.render("register", { title: "register" })
  );

  //   /** Register Post */
  app.post("/register", async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      password,
      password2
    } = req.body;
    console.log("firstName", firstName);
    let errors = [];

    if (
      !firstName ||
      !lastName ||
      !email ||
      !street ||
      !city ||
      !state ||
      !zipcode ||
      !password ||
      !password2
    ) {
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
        street,
        city,
        state,
        zipcode,
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
            street,
            city,
            state,
            zipcode,
            password,
            password2
          });
        } else {
          bcrypt.hash(password, 10, function(err, hash) {
            db.User.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              street: req.body.street,
              city: req.body.city,
              state: req.body.state,
              zipcode: req.body.zipcode,
              password: hash
            });
            res.render("dashboards", {
              firstName,
              lastName,
              email,
              street,
              city,
              state,
              zipcode
            });
          });
        }
      });
    }
  });
};
