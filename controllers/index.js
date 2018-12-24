const Class = require('../models/class')

exports.getHome = function(req, res, next) {
    Class.getClasses((err, classes) => {
      res.render('index', {title:'Welcome to Elearn', classes, });
    }, 3)
  }