const mongoose = require("mongoose")
const Schema = mongoose.Schema

const operationSchema = new Schema({
    day: {
        type: String,
        required: true
    },
    open: {
        type: String,
        required: true
    },
    close: {
        type: String,
        required: true
    }
})

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    distance: {
        type: Number
    },
    estimatedPickupTime: {
        type: Number
    },
    address: {
        type: String,
        required: true
    },
    operationHours: [operationSchema],
    dashPassEnabled: {
        type: Boolean
    },
})

module.exports = mongoose.model('Restaurant', RestaurantSchema)
