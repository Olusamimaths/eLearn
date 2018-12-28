const mongoose = require('mongoose')
const Class = require('../models/class');
const bcrypt = require('bcryptjs')

// User Schema
const StudentSchema = mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    address: [{
        street_address:{type: String},
        city:{type: String},
        state:{type: String},
        zip:{type: String}
    }],
    username: {
        type: String
    },
    email: {
        type: String
    },
    classes: [{
        class_id: {type: [mongoose.Schema.Types.ObjectId]},
        class_title: {type: String}
    }]
});

let Student = module.exports = mongoose.model('student', StudentSchema);

module.exports.getStudentByUsername = (username, callback) => {
    const query = {username, }
    Student.findOne(query, callback);
}

module.exports.register = (info, callback) => {

    // define the query
    Class.findById(info['class_id'], (err, theClass) => {
        console.log(theClass)
        Student.findOneAndUpdate(
            {_id: info['student_id']},
            {$push: {"classes": {class_id: theClass._id, class_title: theClass.title}}},
            {safe: true, upsert: true},
            callback
        );
    });
}
