var mongoose = require('mongoose'),
    Photo = mongoose.model('Photo');

exports.index = function (req, res, next) {
    return res.json({
        status: 'Photo Service Api',
        message: 'Welcome'
    });
};

exports.view = function (req, res, next) {
};

exports.new = function (req, res, next) {
};

exports.details = function (req, res, next) {
};

exports.update = function (req, res, next) {
};

exports.delete = function (req, res, next) {
};
