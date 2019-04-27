var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  app.get("/lending", async (req, res) => {
    res.render("lending", {title: "Lending"});
  });

  app.get("/borrowing", (req, res) =>
      db.Items.findAll().then(function(items) {
        // console.log(items);
        res.render("borrowing", {
          name: items[0].dataValues.name,

          name: items[0].name,
          category: items[0].category,
          description: items[0].description,
          daysBorrow: items[0].borrow_days
          // category: items.dataValues.category,
          // description: items.dataValues.description,
          // daysBorrow: items[0].borrow_days
        })
      })
  );
  // GET route for getting all of the posts
  // app.get("/api/items", function(req, res) {
  //   var query = {};
  //   if (req.query.category_id) {
  //     query.CategoryId = req.query.category_id;
  //   }
  //   db.Items.findAll({
  //     where: query,
  //     include: [db.Category]
  //   }).then(function(dbItem) {
  //     res.render("items");
  //   });
  // });

  // Get route for retrieving a single post
//   app.get("/api/items/:id", function(req, res) {
//     db.Item.findOne({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbItem) {
//       console.log(dbItem);
//       res.json(dbItem);
//     });
//   });

  // POST route for saving a new post
  // app.post("/api/items", function(req, res) {
  //   db.Item.create(req.body).then(function(dbItem) {
  //     res.json(dbItem);
  //   });
  // });

  // DELETE route for deleting posts
  // app.delete("/api/items/:id", function(req, res) {
  //   db.Item.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbItem) {
  //     res.json(dbItem);
  //   });
  // });

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
  // });
};
