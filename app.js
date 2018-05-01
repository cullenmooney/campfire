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
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Granite Hill",
// 		image: "https://media.roverpass.com/pictures/images/000/019/325/full/granite-hill-campground-_-adventure-golf-gettysburg-pa-1.jpg?1487532072",
// 		description: "Cool campground in Gettysburg, PA"
// 	}, function(err, campground) {
// 		if(err) {
// 			console.log(err);
// 		} else {
// 			console.log(campground);
// 		}
// 	});

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/campgrounds", function(req, res) {
	// get all campgrounds from db
	Campground.find({}, function(err, campgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render("index", {campgrounds: campgrounds});
		}
	});
});

app.post("/campgrounds", function(req, res) {
	// get data from form
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
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

app.get("/campgrounds/:id", function(req, res) {
	// find the campground with provided id
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
		} else {
			// render show show template with that id
			res.render("show", {campground: campground});
		}
	});
});

app.listen(3000, function() {
	console.log("CampFire server has begun");
});