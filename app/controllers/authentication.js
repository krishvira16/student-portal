const session = require('express-session');
const bcrypt = require('bcrypt');
const student = require('../models/student');

exports.login = function (req, res) {
    app.use(session({
        cookie: {
            httpOnly: true,
            maxAge: millisecondsInTwoDays,
            path: '/api'
        },
        name: 'sessionId',
        resave: false,
        rolling: true,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET
    }));
};

exports.logout = function (req, res) {
    app.use(session({
        cookie: {
            httpOnly: true,
            maxAge: millisecondsInTwoDays,
            path: '/api'
        },
        name: 'sessionId',
        resave: false,
        rolling: true,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET
    }));
};

exports.authenticate = function (req, res, next) {
    app.use(session({
        cookie: {
            httpOnly: true,
            maxAge: millisecondsInTwoDays,
            path: '/api'
        },
        name: 'sessionId',
        resave: false,
        rolling: true,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET
    }));
};
