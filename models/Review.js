const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    restaurantId: String,
    name: String,
    text: String,
    rating: Number,
    helpfulCount: Number,
    date: String,
    likes: Number,
})

module.exports = mongoose.model('Review', ReviewSchema)
