process.on('SIGINT', function() {
    process.exit();
}); // may not be required on POSIX

const express = require('express');
var app = express();
var port = process.env.PORT || 3000;

process.on('dbReady', function() {
    app.listen(port, function (err) {
        if (err) throw err;
        console.log('Your application is running on ' + port + ' port');
    });
});

const session = require('express-session');
var millisecondsInTwoDays = 1000 * 60 * 60 * 24 * 2;
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

app.use(express.json());

app.use(express.static('./public'));

const apiRouter = require('./app/routes/api');
app.use('/api', apiRouter);

app.get('/*', function (req, res) {
    res.sendFile('/src/views/index.html', { root: process.cwd() });
});
