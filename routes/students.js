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

router.post('/classes/register', (req, res, next) => {
    let info = [];
    info['student_username'] = req.user.username;
    info['class_id'] = req.body.class_id;

    Student.getStudentByUsername(req.user.username, (err, student) => {
        if(err) throw err;
        info['student_id'] = student._id;
        // register the course
        Student.register(info, (err, student) => {
            if(err) throw err;
        });
    });


    req.flash('success_msg', 'You are now registered to teach this class');
    res.redirect('/students/classes');
})

module.exports = router;