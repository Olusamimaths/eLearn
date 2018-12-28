var express = require('express');
var router = express.Router();

const RegisterController = require('../controllers/users')
var User = require('../models/users');
var passport = require('passport');
const bcrypt = require('bcryptjs')
var LocalStrategy = require('passport-local').Strategy;


router.get('/register', RegisterController.registerGet)

/* Register User */
router.post('/register', RegisterController.registerPost);

router.post('/login', (req, res, next) => {  
  // passport.authenticate('local'{failureRedirect:'/', failureFlash:   true}), 
  // passport.use(new LocalStrategy(
  //   function(username, password, done) {
  //     User.getUserByUsername(username, function(err, user){
  //       if(err) throw err;
  //       if(!user) {
  //         return done(null, false, {message: `Unknown user ${username}`});
  //       }
  //       console.log(user)
  //       User.comparePassword(password, user.password, function(err, isMatch){
  //         if(err) return done(err);
  //         if(isMatch) {
  //           console.log('logged in')
  //           req.flash('success_msg', 'You are now logged in');
  //           return done(null, user)
  //         } else {
  //           console.log('Invalid Password');
  //           return done(null, false, {message: 'Invalid Password'})
  //         }
  //       })
  //     })
  //   }
  // ));
    req.flash('success_msg', 'You are now logged in');
    // const userType = req.user.type;
    res.redirect(`/${userType}s/classes`);
});

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  })
})
module.exports = router;
