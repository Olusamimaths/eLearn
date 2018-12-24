const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// User Schema
const UserSchema = mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
        bcrypt: true
    },
    type: {
        type: String
    }
});

let User = module.exports = mongoose.model('User', UserSchema);

// Get User by Id
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback)
}

// Get User by username
module.exports.getUserByUsername = function(username, callback){
    const query = {username:username};
    User.findOne(query, callback)
}

// Compare password
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
        if(err) throw err;
        callback(null, isMatch)
    })
}

/* STUDENT MIDDLEWARES*/
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
         bcrypt.hash(newUser.password, salt, function(err, hash) {
               newUser.password = hash;
               newUser.save(callback);
        });
    });
}
module.exports.createStudent = async function(newStudent, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newStudent.password, salt, function(err, hash) {
               newStudent.password = hash;
               newStudent.save(callback);
        });
    });
}

/* INSTRUCTOR MIDDLEWARE */
module.exports.createInstructor = function(newInstructor, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newInstructor.password, salt, function(err, hash) {
               newInstructor.password = hash;
               newInstructor.save(callback);
        });
    });
}

// Create Instructor user 
// module.exports.saveInstructor = (newUser, newInstructor, callback) => {
//     bcrypt.hash(newUser.password, 10, (err, hash) => {
//         if(err) throw err;
//         // Set  hash
//         newUser.password = hash;
//         console.log('Instructor is being saved');
//         async.parallel([newUser.save, newInstructor.save], callback)
//     })
// }
// Create Student user 
// module.exports.saveStudent = (newUser, newStudent, callback) => {
//     bcrypt.hash(newUser.password, 10, (err, hash) => {
//         if(err) throw err;
//         // Set  hash
//         newUser.password = hash;
//         console.log('Student is being saved');
//         console.log(newUser);
//         console.log('Student:', newStudent)
//         async.parallel([newUser.save, newStudent.save], callback)
//     })
// }