const session = require('express-session');
const bcrypt = require('bcrypt');
const student = require('../models/student');

exports.login = function (req, res) {
    // check credentials and regenerate session if matched
};

exports.logout = function (req, res) {
    // destroy session
};

exports.authenticate = function (req, res, next) {
    // check if session is authenticated
};
