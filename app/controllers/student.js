const student = require('../models/student');

exports.getProfile = function (req, res) {
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

exports.getSubjectDetails = function (req, res) {
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

exports.getAssessment = function (req, res) {
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

exports.getGrades = function (req, res) {
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
