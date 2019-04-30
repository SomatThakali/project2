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
  app.get("/borrowing", (req, res) =>
      db.Items.findAll().then(function(items) {
        res.render("borrowing", {
          name: items[0].dataValues.name,
          name: items[0].name,
          category: items[0].category,
          description: items[0].description,
          daysBorrow: items[0].borrow_days
        })
      })
  );

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
