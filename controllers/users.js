// Include User Model
var User = require('../models/users');
// Include Student Model
var Student = require('../models/student');
// Include Instructor Model
var Instructor= require('../models/instructor');


// GET register
exports.registerGet = (req, res, next) => {
    res.render('users/register', {
      title:'Register an Elearn Account',
    })
  }

// POST register
exports.registerPost = function(req, res, next) {
    // Get form values
    const {first_name} = req.body;
    const {last_name} = req.body;
    const {street_address} = req.body;
    const {city} = req.body;
    const {state} = req.body;
    const {zip} = req.body;
    const {email} = req.body;
    const {username} = req.body;
    const {password} = req.body;
    const {password2} = req.body;
    const {type} = req.body;
  
    // Validating the form values
    req.checkBody('first_name', 'First name field is required').notEmpty();
    req.checkBody('last_name', 'Last name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Email must be a valid email address').isEmail();
    req.checkBody('username', 'Username field is required').notEmpty();
    req.checkBody('password', 'Password field is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  
    // handling errors
    const errors = req.validationErrors();
    if(errors){
      res.render('users/register', {
        title:'Register an Elearn Account',
        errors,
      })
    } else {
      const newUser = new User({
        email,
        username,
        password,
        type
      });
    
      if(type === 'student') {
        console.log('Registering Student...');
        let newStudent = new Student({
          first_name,
          last_name,
          address: [{
            street_address,
            city,
            state,
            zip
          }],
          email,
          username
        });
        // save the student
        User.createUser(newUser, function(err, user){
          if(err) throw err;
          console.log('User saved');
        });
        User.createStudent(newStudent, function(err, user){
          if(err) throw err;
          console.log('Student saved');
        });
  
      } else {
        console.log('Registering Instructor');
        let newInstructor = new Instructor({
          first_name,
          last_name,
          address: [{
            street_address,
            city,
            state,
            zip
          }],
          email,
          username
        });
        // save the instructor
        User.createUser(newUser, function(err, user){
          if(err) throw err;
          console.log('User saved');
        });
        User.createInstructor(newInstructor, function(err, user){
          if(err) throw err;
          console.log('Instructor saved');
        });
      }
    }
    
          // Flash success
    req.flash('success_msg', 'Congratulations!!! You have successfully signed up')
    res.redirect('/');
  }