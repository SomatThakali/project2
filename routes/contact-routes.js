var db = require("../models");
module.exports = function(app) {
  app.get("/contact", (req, res) =>
    res.render("contact", { title: "contact" })
  );
  app.post("/contactSubmission", (req, res) => {
    console.log("In Contact submission");
    var messageCat = req.body.messageCat;
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    db.Contact.create({
      messageCat: messageCat,
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
};
