const student = require('../models/student');

exports.getProfile = function (req, res) {
    student.getProfile(req.session.student_id, function (profile) {
        res.send(profile);
    });
};

exports.getSubjectDetails = function (req, res) {
    student.getSubjectDetails(req.session.student_id, function (subjectDetails) {
        res.send(subjectDetails);
    });
};

exports.getAssessment = function (req, res) {
    student.getAssessment(req.session.student_id, req.params.assessment, function (scores) {
        res.send(scores);
    });
};

exports.getGrades = function (req, res) {
    student.getGrades(req.session.student_id, function (grades) {
        res.send(grades);
    });
};
