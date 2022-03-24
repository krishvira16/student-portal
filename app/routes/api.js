const express = require('express');
const studentController = require('../controllers/student');
const authController = require('../controllers/authentication');

var router = express.Router();

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.all('/secure/*', authController.authenticate);

router.get('/secure/profile', studentController.getProfile);

router.get('/secure/subject-details', studentController.getSubjectDetails);

router.get('/secure/scores/assessment-:assessment', studentController.getAssessment);

router.get('/secure/grades', studentController.getGrades);

module.exports = router;
