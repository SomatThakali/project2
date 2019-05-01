const db = require("../models");

module.exports = function(app) {
  app.get("/about", (req, res) => res.render("about", { title: "about" }));
};
