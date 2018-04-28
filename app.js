var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
	{name: "Blackwoods", image: "https://i.pinimg.com/originals/0d/c0/c2/0dc0c258e19e724a469716a0acc0d033.jpg"},
	{name: "Cape Lookout", image: "https://www.jeffreysincich.com/uploads/9/5/8/5/9585103/5385993_orig.jpg?314"},
	{name: "Dog layer", image: "https://www.campsitephotos.com/photo/camp/72617/Elk_Prairie_072.jpg"}
];

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/campgrounds", function(req, res) {
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
	// get data from form
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	// add to campgrounds array
	campgrounds.push(newCampground);
	// redirect to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

app.listen(3000, function() {
	console.log("CampFire server has begun");
});