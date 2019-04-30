var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  app.get("/lending", async (req, res) => {
    res.render("lending", {title: "Lending"});
  });

  app.delete("/api/lending", async (req, res) => {
    res.render("lending", {title: "Lending"});
  });

  // PUT route for updating posts
  // app.put("/api/items", function(req, res) {
  //   db.Item.update(
  //     req.body,
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     }).then(function(dbItem) {
  //     res.json(dbItem);
  //   });
};
