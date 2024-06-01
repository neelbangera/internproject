const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/restaurant');
const ObjectId = require("mongodb").ObjectId;
const Review = require('../../models/Review');
const handleError = require('../../utils/errorHandler');

//post: add new data to the database
//put : update existing data
//delete: remove data from the database
//get: fetch data from the database

router.post('/restaurant', async (req, res) => {
    try {
        const existingAddress = req.body.address;
        const existingRestaurant = await Restaurant.findOne({ address: existingAddress });
        if (existingRestaurant) {
            return res.status(400).json({ message: 'Restaurant at addy already exists' });
        }
        const newRestaurant = new Restaurant(req.body);
        await newRestaurant.save().catch((err) => console.log(err));
        return res.status(200).json(newRestaurant);
    } catch (error) {
        console.log(error)
    }
})

router.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurant.find();
    return res.status(200).json(restaurants);
})

router.post('/review', async (req, res) => {
    try {
        const restaurantStrId = req.body.restaurantId;
        const restaurantObjId = new ObjectId(restaurantStrId);
        const restaurantDoc = await Restaurant.findById(restaurantObjId);
        if (restaurantDoc) {
            const newReview = new Review(req.body);
            await newReview.save().catch((err) => console.log(err));
            return res.status(200).json(newReview);

        } else {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        console.log(error)
        handleError(error, res);
    }
})
router.get('/reviews', async (req, res) => {
    try {
        //$gt greater
        //$gte greater than or equal
        //$lt less than
        //$lte less than or equal
        //$eq equal
        //$ne not equal
        //$in in
        //const reviews = await Review.find({name: {$eq : "Ben Shin"}});
        //const reviews = await Review.find({name: {$ne : "Ben Shin"}});
        //const reviews = await Review.find({rating: {$gte : 3}});
        // const topFoodCritics = ["Ben Shin", "John Doe", "Jane Doe"];
        // const reviews = await Review.find({name: {$in : topFoodCritics}});
        // const reviews = await Review.find().sort({name: -1});
        //method 1
        //const reviews = await Review.find({$and:  [
        //{name: {$eq: "awdjnk"}},
        //{rating: {$gte: 4}}
        //]}).sort({rating: -1});
        //method 2
        const reviews = await Review.find({
            name: { $eq: "awdjnk" },
            rating: { $gte: 4 }
        }).sort({ rating: -1 });



        console.log(JSON.stringify(reviews[0]));
        return res.status(200).json(reviews);
    } catch (error) {
        console.log(error)
        handleError(error, res);
    }
})

router.get('/reviews/average/:restaurantId', async (req, res) => {
    const restaurantId = req.params.restaurantId; //mathced doc with same id
    try {
        const aggregation = await Review.aggregate([
            { $match: { restaurantId: restaurantId } },
            {
                $group: {
                    _id: "$restaurantId",
                    totalReviews: { $sum: 1 },//counts total num docs with correct id
                    averageRating: { $avg: "$rating" },//$rating gets rating from review schema gets average
                    sumRating: { $sum: "$rating" }
                }
            },
            {
                $project: {
                    totalReviews: 1,
                    averageRating: { $round: ["$averageRating", 1] },
                    sumRating: 1
                }
            },
        ]);
        console.log(aggregation);
        return res.status(200).json(aggregation[0]);
    }
    catch (error) {
        console.log(error)
        handleError(error, res);
    }
})

router.put('/restaurant/:id', async (req, res) => {
    const id = req.params.id;
    const updatedRestaurantData = req.body;
    try {
        const restaurantObjId = new ObjectId(id);
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            restaurantObjId,
            updatedRestaurantData,
            { new: true }//gives new doc after finishing
        )
        if (!updatedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' })
        }
        return res.status(200).json(updatedRestaurant);
    }
    catch (error) {
        console.log(error)
        handleError(error, res);
    }

})
router.delete('/restaurant/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const restaurantObjId = new ObjectId(id);
        const deletedRestaurant = await Restaurant.findByIdAndDelete(
            restaurantObjId,
        )
        if (!deletedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found to delete' })
        }
        return res.status(200).json(deletedRestaurant);
    }
    catch (error) {
        console.log(error)
        handleError(error, res);
    }

})

module.exports = router;