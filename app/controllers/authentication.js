const session = require('express-session');
const bcrypt = require('bcrypt');
const student = require('../models/student');

exports.login = function (req, res) {
    student.getPassword(req.body.student_id, function (password) {
        if (password) {
            bcrypt.compare(req.body.password, password.password, function (err, match) {
                if (err) throw err;
                if (match) { // valid credentials
                    req.session.regenerate(function (err) {
                        if (err) throw err;
                        req.session.student_id = req.body.student_id;
                        res.send('Authentication successful');
                    });
                }
                else {
                    res.status(401).send('Unauthorized: Invalid student id or password'); // passwords do not match
                }
            });
        }
        else {
            res.status(401).send('Unauthorized: Invalid student id or password'); // database doesn't find the specified student id
        }
    });
};

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        if (err) throw err;
        res.send('Logged out successfully');
    });
};

exports.authenticate = function (req, res, next) {
    if (typeof req.session.student_id !== 'undefined') {
        next();
    }
    else {
        res.status(401).send('Unauthorized: authentication is required to access protected resources');
    }
};
