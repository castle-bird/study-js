const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const ejs = require("ejs");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.render('index');
});

app.get("/restaurants", function (req, res) {
    const filePath = path.join(__dirname, "data", "restaurants.json");

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    res.render('restaurants', {
        numberOfRestaurants: storedRestaurants.length,
        restaurants : storedRestaurants
    });
});

app.get("/recommend", function (req, res) {
    res.render('recommend');
});

app.post("/recommend", function (req, res) {
    const restaurants = req.body;
    const filePath = path.join(__dirname, "data", "restaurants.json");

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    storedRestaurants.push(restaurants);

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

    res.redirect("/confirm");
});

app.get("/confirm", function (req, res) {
    res.render('confirm');
});

app.get("/about", function (req, res) {
    res.render('about');
});

app.listen(3000);
