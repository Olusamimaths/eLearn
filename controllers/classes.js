const Class = require('../models/class')

exports.getClassDetails = function(req, res, next) {
    Class.getClassById([req.params.id], (err, classname) => {
        if(err) throw err;
      res.render('classes/details', {title: `${classname.title} Details`, class: classname });
    })
  }

exports.getClass = function(req, res, next) {
  Class.getClasses((err, classes_) => {
    if(err) throw err;
    res.render('classes/index', {title: 'Elearn Classes', classes_, });
  }, 3)
}