const connection = require('../connection/connect');

var db = undefined;

process.on('dbReady', function () {
    db = connection.db; // database instance assigned to global variable db
});

exports.getPassword = function (student_id, callback) {
    db.collection('student').findOne({ student_id: student_id }, { projection: { _id: 0, password: 1} }, function (err, result) {
        if (err) throw err;
        callback(result);
    });
};

exports.getProfile = function (student_id, callback) {
    db.collection('student').findOne({ student_id: student_id }, { projection: { _id: 0, password: 0} }, function (err, result) {
        if (err) throw err;
        callback(result);
    });
};

exports.getSubjectDetails = function (student_id, callback) {
    var result = {};

    db.collection('score').aggregate([
        { $match: { student_id: student_id } },
        { $project: { _id: 0, subject_id: 1} },
        { $lookup: { from: 'subject', localField: 'subject_id', foreignField: 'subject_id', as: 'subject_details' } }, // left outer join
        { $project: { subject_id: 1, subject_details: { $first: '$subject_details' } } }, // first is used for embedded document array, where we need to select the first document from the array
        { $project: { subject_id: 1, subject_details: { $unsetField: { field: '_id', input: '$subject_details' } } } }, // unsetField - for embedded documents, removes the specified field
        { $project: { subject_id: 1, subject_details: { $unsetField: { field: 'subject_id', input: '$subject_details' } } } }
    ]).forEach((doc) => {
        result[doc.subject_id] = doc.subject_details;
    }, (err) => {
        if (err) throw err;
        callback(result);
    });
};

exports.getAssessment = function (student_id, assessment, callback) {
    db.collection('score').aggregate([
        { $match: { student_id: student_id } },
        { $project: { _id: 0, subject_id: 1, score: { $filter: { input: '$score', as: 'score', cond: { $eq: [ '$$score.assessment', assessment ] } } } } }, // select only those embedded documents which satisfy the equality condition
        { $project: { subject_id: 1, score: { $first: '$score' } } } // selects the first score from score array
    ]).toArray(function (err, result) {
        if (err) throw err;
        callback(result);
    });
};

exports.getGrades = function (student_id, callback) {
    db.collection('score').aggregate([
        { $match: { student_id: student_id } },
        { $project: { _id: 0, subject_id: 1, score: 1, total: { $sum: '$score.marks' } } }, // sum of student marks in a subject
        { $project: { subject_id: 1, score: 1, total: 1,
            percentage: { $multiply: [ { $divide: ['$total', { $cond: { if: { $in: ['tee', '$score.assessment'] }, then: 100, else: 50 } } ] }, 100 ] } // total / 100 * 100, total / 50 * 100
        } }
    ]).toArray(function (err, result) {
        if (err) throw err;
        callback(result);
    });
};
