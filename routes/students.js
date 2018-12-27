const express = require('express');
const router = express.Router();

const TheClass = require('../models/class');
const Student = require('../models/student');
const User = require('../models/users')

router.get('/classes', (req, res, next) => {
    Student.getStudentByUsername(req.user.username, (err, student) => {
        if(err) throw err;
        res.render('students/classes', {title: `${student.first_name}'s Classes` ,student,})
    });
})

module.exports = router;