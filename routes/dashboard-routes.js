let db = require("../models");

module.exports = function(app) {
  app.post("/items", (req, res) => {
    console.log("In item submission");
    // console.log('DEBUG', req.body);
    console.log("DEBUG user session", req.session.passport.user[0].id);

    const newItem = {
      ...req.body,
      UserId: req.session.passport.user[0].id
    };

    console.log("DEBUG new item", newItem);

    db.Item.create(newItem).then(function(err, resp) {
      res.redirect(`/lending/${newItem.UserId}`);
      if (err) {
        console.log(err);
      }
    });
  });

  app.get("/dashboards/:id", (req, res) => {
    let user = req.session.passport.user[0];
    // res.redirect(`/dashboards/${user.id}`);

    const Sequelize = require("sequelize");
    const Op = Sequelize.Op;
    db.Item.findAll({
      where: {
        userId: req.params.id,
        [Op.and]: { isBorrowed: true }
      },
      include: [db.User]
    }).then(function(items) {
      db.Item.findAll({
        where: {
          userId: {
            [Op.ne]: req.params.id
          }
        },
        include: [db.User]
      }).then(function(itemsBrr) {
        res.render("dashboards", {
          itemsBrr: itemsBrr,
          items: items,
          user: user,
          title: "dashboards"
        });
      });
    });
  });

  app.get("/lending/:id", function(req, res) {
    console.log("In item getting");

    let user = req.session.passport.user[0];
    db.Item.findAll({
      where: {
        userId: req.params.id
      },
      include: [db.User]
    }).then(function(items) {
      console.log(items);
      res.render("lending", { items: items, user: user, title: "lending" });
    });
  });

  app.get("/borrowing/:id", function(req, res) {
    const Sequelize = require("sequelize");
    const Op = Sequelize.Op;
    let user = req.session.passport.user[0];
    console.log("In item getting");

    db.Item.findAll({
      where: {
        userId: {
          [Op.ne]: req.params.id
        }
      }
    }).then(function(items) {
      return res.render("borrowing", {
        items: items,
        user: user,
        title: "borrowing"
      });
    });
  });

  app.put("/borrowing/:id", (req, res) => {
    let user = req.session.passport.user[0];
    res.redirect(`/borrowing/${user.id}`);
    let updatedValue = { isBorrowed: true };

    db.Item.update(
      updatedValue,
      {
        where: {
          id: req.params.id
        }
      },
      result => {
        console.log(result);
      }
    );
  });

  app.delete("/lending/:id", (req, res) => {
    let user = req.session.passport.user[0];
    res.redirect(`/lending/${user.id}`);
    db.Item.destroy(
      {
        where: {
          id: req.params.id
        }
      },

      result => {
        console.log(result);
      }
    );
  });

  app.delete("/dashboards/:id", (req, res) => {
    let user = req.session.passport.user[0];
    res.redirect(`/dashboards/${user.id}`);
    db.Item.destroy(
      {
        where: {
          id: req.params.id
        }
      },

      result => {
        console.log(result);
      }
    );
  });
};
