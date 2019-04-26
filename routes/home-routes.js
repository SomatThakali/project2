const db = require("../models");
module.exports = function(app) {
  app.get("/", async (req, res) => {
    res.render("home", { title: "Home" });
  });
};
