var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/campgrounds", function(req, res) {
	var campgrounds = [
		{name: "Blackwoods", image: "https://i.pinimg.com/originals/0d/c0/c2/0dc0c258e19e724a469716a0acc0d033.jpg"},
		{name: "Cape Lookout", image: "https://www.jeffreysincich.com/uploads/9/5/8/5/9585103/5385993_orig.jpg?314"},
		{name: "Dog layer", image: "https://www.campsitephotos.com/photo/camp/72617/Elk_Prairie_072.jpg"}
	];
	res.render("campgrounds", {campgrounds: campgrounds});
})

app.listen(3000, function() {
	console.log("CampFire server has begun");
});