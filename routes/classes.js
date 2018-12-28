var express = require('express');
var router = express.Router();

const ClassController = require('../controllers/classes');
const Class = require('../models/class');

/* GET Classes page. */
router.get('/', ClassController.getClass);

/* GET Class Details page. */
router.get('/:id/details', ClassController.getClassDetails);

router.get('/:id/lessons', (req, res, next) => {
    Class.getClassById([req.params.id], (err, classname) => {
        if(err) throw err;
        res.render('classes/lessons', {title:'Lessons', class:classname})
    })
});

//Get Lessons Content
router.get('/:id/lessons/:less_id', (req, res, next) => {
    Class.getClassById([req.params.id], (err, classname) => {
        let lesson;
        if(err) throw err;
        for(i=0; i < classname.lessons.length; i++) {
            if(classname.lessons[i].lesson_number == req.params.less_id) {
                lesson = classname.lessons[i]
            }
        }
        res.render('classes/lesson', {title:'Lesson', class:classname, lesson})
    })
});
module.exports = router;
