let db = require("../models");

module.exports = function(app) {
  app.post("/items", (req, res) => {
    console.log("In item submission");
    console.log('DEBUG', req.body);
    console.log('DEBUG user session', req.session.passport.user[0].id);

    const newItem = { 
      ...req.body, 
      UserId: req.session.passport.user[0].id
    }

    console.log('DEBUG new item', newItem);

    db.Item.create(newItem).then(function(err, resp) {
      res.redirect("/lending");
      if (err) {
        console.log(err);
      }
    });
  });

  app.get("/lending", function(req, res) {
    console.log("In item getting");

    db.Item.findAll({}).then(function(items) {
      console.log(items);
      res.render("lending", { items: items });
    });
  });
  app.get("/borrowing", function(req, res) {
    const Sequelize = require("sequelize");
    const op = Sequelize.Op;

    console.log("In item getting");

    db.Item.findAll({
      where: {
        id: {
          [op.gt]: 2
        }
      }
    }).then(function(items) {
      return res.render("borrowing", { items: items });
    });
  });

  app.put("/borrowing/:id", (req, res) => {
    let updatedValue = { isBorrowed: true };

    db.Item.update(
      updatedValue,
      {
        where: {
          id: req.params.id
        }
      },

      res.redirect("/borrowing"),
      result => {
        console.log(result);
      }
    );
  });

  app.delete("/borrowing/:id", (req, res) => {
    db.Item.destroy(
      {
        where: {
          id: req.params.id
        }
      },

      res.redirect("/borrowing"),
      result => {
        console.log(result);
      }
    );
  });

  app.get("/dashboards", function(req, res) {
    res.render("dashboards");
  });
};
