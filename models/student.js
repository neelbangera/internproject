const mongoose = require("mongoose")
const Schema = mongoose.Schema
const studentSchema = new Schema({
    name: String,
    major: String,
    class_enrollment_history: [
        {
            class_id: String,
            semester: String,
            year: Number
        }
    ]
})
module.exports = mongoose.model('student', studentSchema)