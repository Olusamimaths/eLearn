const mongoose = require('mongoose')
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