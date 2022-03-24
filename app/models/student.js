const connection = require('../connection/connect');

var db = undefined;

process.on('dbReady', function () {
    db = connection.db;
});

exports.getPassword = function (student_id, callback) {
    // findOne() password for student_id
};

exports.getProfile = function (student_id, callback) {
    // findOne() student profile for student_id (exclude password from result)
};

exports.getSubjectDetails = function (student_id, callback) {
    // fetch subject details for student_id
};

exports.getAssessment = function (student_id, assessment, callback) {
    // fetch assessment scores for student_id where assessment exists
};

exports.getGrades = function (student_id, callback) {
    // fetch grades for student_id with total marks and percentage
};
