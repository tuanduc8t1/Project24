"use strict";

var express = require("express");

var dotenv = require("dotenv");

var database = require("./config/database");

var systemConfig = require("./config/system");

var methodOverride = require('method-override');

var bodyParser = require('body-parser');

var flash = require('express-flash');

var cookieParser = require('cookie-parser');

var session = require('express-session');

dotenv.config();
database.connect();

var routeAdmin = require("./routes/admin/index.route");

var routeClient = require("./routes/client/index.route");

var app = express();
var port = process.env.PORT; // Flash

app.use(cookieParser('JHSVBDSDSD'));
app.use(session({
  cookie: {
    maxAge: 60000
  }
}));
app.use(flash()); // End Flash

app.set('view engine', 'pug');
app.set('views', "".concat(__dirname, "/views"));
app.use(express["static"]("".concat(__dirname, "/public")));
app.use(methodOverride('_method')); // parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
  extended: false
})); // App Locals Variable

app.locals.prefixAdmin = systemConfig.prefixAdmin; // Routes

routeAdmin(app);
routeClient(app);
app.listen(port, function () {
  console.log("App listening on port ".concat(port));
});
//# sourceMappingURL=index.dev.js.map
