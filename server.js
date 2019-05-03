const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const session = require("express-session");
const multer = require("multer");
const app = express();

const PORT = process.env.PORT || 8080;

let db = require("./models");

require("./config/passport")(passport);

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(passport.initialize());
app.use(
  session({
    secret: "cool"
  })
);

app.use(passport.session());

app.use((req, res, next) => {
  if (req.isAuthenticated) {
    res.locals.isAuthenticated = req.isAuthenticated();
  }
  next();
});

app.use(flash());
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

let storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./public/assets/images");
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now());
  }
});

/** routes */
require("./routes/about")(app);
require("./routes/registration-routes")(app);
require("./routes/home-routes.js")(app);
require("./routes/dashboard-routes.js")(app);
require("./routes/contact-routes")(app);
require("./routes/login-routes")(app);

db.sequelize.sync().then(function() {
  console.log("started!!!");

  app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });
});
