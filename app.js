var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/campfire");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/campgrounds", function(req, res) {
	// get all campgrounds from db
	Campground.find({}, function(err, campgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds: campgrounds});
		}
	});
});

app.post("/campgrounds", function(req, res) {
	// get data from form
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	// create a new campground and save to database
	Campground.create(newCampground, function(err, campground) {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

app.listen(3000, function() {
	console.log("CampFire server has begun");
});