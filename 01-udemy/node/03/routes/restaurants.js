const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const resData = require("../util/restaurant-data");

router.get("/restaurants", function (req, res) {
    let order = req.query.order;
    let nextOrder = "desc";

    if (order !== "asc" && order !== "desc") {
        order = "asc";
    }

    if (order === "desc") {
        nextOrder = "asc";
    }

    const restaurants = resData.getStoredRestaurant();

    restaurants.sort(function (resA, resB) {
        if (
            (order === "asc" && resA.name > resB.name) || 
            (order === "desc" && resB.name > resA.name)
        ) {
            return 1;
        }

        return -1;
    });

    res.render("restaurants", {
        numberOfRestaurants: restaurants.length,
        restaurants: restaurants,
        nextOrder: nextOrder,
    });
});

router.get("/restaurants/:id", function (req, res) {
    const restaurantID = req.params.id;
    const restaurants = resData.getStoredRestaurant();

    for (const restaurant of restaurants) {
        if (restaurant.id === restaurantID) {
            return res.render("recommend_detail", { restaurant });
        }
    }

    return res.status(404).render("404");
});

router.get("/recommend", function (req, res) {
    res.render("recommend");
});

router.post("/recommend", function (req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const restaurants = resData.getStoredRestaurant();

    restaurants.push(restaurant);

    resData.storeRestaurants(restaurants);

    res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
    res.render("confirm");
});

module.exports = router;
