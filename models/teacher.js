const mongoose = require("mongoose")
const Schema = mongoose.Schema
const teacherSchema = new Schema({
    name: String,
    subjectsTaught: [String]
})
module.exports = mongoose.model('teacher', teacherSchema)