const express = require('express');
const router = express.Router();
const setup = require('../../models/setup');
const Student = require('../../models/student');
const Teacher = require('../../models/teacher');
const ObjectId = require("mongodb").ObjectId;
const handleError = require('../../utils/errorHandler');
const Grade = require('../../models/setup').grades;
const Subject = require('../../models/setup').subjects;
const Class = require('../../models/setup').Class;

function getCurrentSemesterAndYear() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
  
    let currentSemester;
    if (currentMonth < 5) {
      currentSemester = "Spring";
    } else if (currentMonth < 8) {
      currentSemester = "Summer";
    } else {
      currentSemester = "Fall";
    }
  
    return { currentSemester, currentYear };
}
function isPastSemester(semester, year) {
    const { currentSemester, currentYear } = getCurrentSemesterAndYear();
  
    if (year < currentYear) {
      return true;
    } else if (year === currentYear) {
      const semesterOrder = { "Spring": 1, "Summer": 2, "Fall": 3 };
      return semesterOrder[semester] < semesterOrder[currentSemester];
    }
    return false;
}

router.post('/student', async (req, res) => {
    try {
        const existingName = req.body.name;
        const existingStudent = await Student.findOne({ name: existingName });
        if (existingStudent) {
            return res.status(400).json({ message: 'student already exists' });
        }
        const newStudent = new Student(req.body);
        await newStudent.save().catch((err) => console.log(err));
        return res.status(200).json(newStudent);
    } catch (error) {
        console.log(error)
    }
})
router.post('/teacher', async (req, res) => {
    try {
        const existingName = req.body.name;
        const existingTeacher = await Teacher.findOne({ name: existingName });
        if (existingTeacher) {
            return res.status(400).json({ message: 'teacher already exists' });
        }
        const newTeacher = new Teacher(req.body);
        await newTeacher.save().catch((err) => console.log(err));
        return res.status(200).json(newTeacher);
    } catch (error) {
        console.log(error)
    }
})
router.post('/subject', async (req, res) => {
  try {
      const existingName = req.body.name;
      const existingSubject = await Subject.findOne({ name: existingName });
      if (existingSubject) {
          return res.status(400).json({ message: 'subject already exists' });
      }
      const newSubject = new Subject(req.body);
      await newSubject.save().catch((err) => console.log(err));
      return res.status(200).json(newSubject);
  } catch (error) {
      console.log(error)
  }
})
router.post('/grade', async (req, res) => {
  try {
      const newGrade = new Grade(req.body);
      await newGrade.save().catch((err) => console.log(err));
      return res.status(200).json(newGrade);
  } catch (error) {
      console.log(error)
  }
})
router.post('/class', async (req, res) => {
  try {
      const newClass = new Class(req.body);
      await newClass.save().catch((err) => console.log(err));
      return res.status(200).json(newClass);
  } catch (error) {
      console.log(error)
  }
})
router.get('/students/{studentId}/gpa/{semester}/{year}', async (req, res) => {
    
})
router.get('/students/{studentId}/gpa', async (req, res) => {
    
})
  
module.exports = router;