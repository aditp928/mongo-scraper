var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var expressHandleBars = require("express-handlebars");

var scraperRoutes = require("./controllers/scraper.js");

var PORT = process.env.PORT || 8080;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

app.engine("handlebars", expressHandleBars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.Promise = Promise;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongo-scraper";
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

app.use("/", scraperRoutes);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});