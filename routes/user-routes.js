const db = require("../models");
module.exports = function(app) {
  /** Register Get */
  app.get("/register", async (req, res) => {
    res.render("register");
  });

  /** Login Get */
  app.get("/login", async (req, res) => {
    res.render("login");
  });

  /** Register Post */
  app.post("/register", async (req, res) => {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    })
      .then(user => {
        res.json(user);
        // console.log(user);
      })
      .catch(err => {
        res.json(err);
      });
  });
};
