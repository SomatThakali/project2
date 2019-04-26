const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
// const flash = require("connect-flash");
const session = require("express-session");
const app = express();

const PORT = process.env.PORT || 7774;

let db = require("./models");

require("./config/passport")(passport);

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    secret: "cool"
  })
);

app.use((req, res, next) => {
  if (req.isAuthenticated) {
    res.locals.isAuthenticated = req.isAuthenticated();
  }
  next();
});

/** routes */
require("./routes/user-routes.js")(app);
require("./routes/home-routes.js")(app);

db.sequelize.sync().then(function() {
  console.log("started!!!");
  app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });
});
