const mongoose = require("mongoose")
const Schema = mongoose.Schema
const subjectsSchema = new Schema({
    name: String,
    creditHours: Number
})
const classSchema = new Schema({
    subject_id: String,
    teacher_id: String,
    semester: String,
    year: Number,
    student_ids: [String]
})
const gradesSchema = new Schema({ 
    student_id: String,
    subject_id: String,
    grade: String,
    semester: String,
    year: Number
})
const subjects = mongoose.model('subjects', subjectsSchema)
const Class = mongoose.model('class', classSchema)
const grades = mongoose.model('grades', gradesSchema)

module.exports = { subjects, Class, grades }


