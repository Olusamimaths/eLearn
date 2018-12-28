const express = require('express');
const router = express.Router();

const Class = require('../models/class');
const Instructor = require('../models/instructor');
const User = require('../models/users')

router.get('/classes', (req, res, next) => {
    Instructor.getInstructorByUsername(req.user.username, (err, instructor) => {
        if(err) throw err;
        res.render('instructors/classes', {title:'Your Classes', instructor,})
    });
});

router.post('/classes/register', (req, res, next) => {
    let info = [];
    info['instructor_username'] = req.user.username;
    info['class_id'] = req.body.class_id;
    info['class_title'] = req.body.class_title;
    
    Instructor.register(info, (err, instructor) => {
        if(err) throw err;
    });
    req.flash('success_msg', 'You are now registered to teach this class');
    res.redirect('/instructors/classes');
})

router.get('/classes/:id/lessons/new', (req, res, next) => {
    res.render('instructors/newlesson', {title:'Your Classes', class_id:req.params.id})
});

router.post('/classes/:id/lessons/new', (req, res, next) => {
    // Get the values
    const info = [];
    info['class_id'] = req.params.id;
    info['lesson_number'] = req.body.lesson_number;
    info['lesson_title'] = req.body.lesson_title;
    info['lesson_body'] = req.body.lesson_body;

    Class.addLesson(info, (err, lesson) => {
        console.log('Lesson added...');
        req.flash('success_msg', 'Lesson Added');
        res.redirect('/instructors/classes')
    })
});

module.exports = router;