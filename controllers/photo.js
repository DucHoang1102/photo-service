var mongoose = require('mongoose'),
    Photo = mongoose.model('Photo');

exports.index = function (req, res, next) {
    return res.json({
        status: 'Photo Service Api',
        message: 'Welcome'
    });
};

exports.view = function (req, res, next) {
    var limit  = String(req.body.limit)  || 20; // Why String()? Because case req.body.limit = 0 is Number
    var offset = String(req.body.offset) || 0;
    var query  = req.body.query          || {};
    var sort   = req.body.sort           || {createdAt: 'desc'};
    var select = req.body.select         || '';

    var results = Photo.find(query)
        .select(select)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort(sort)
        .exec();

    Promise.all([results]).then(results => {
        var photos = results[0]
        return res.json({photos: photos});

    }).catch( err => res.json({ errors: err.message }) );
};

exports.new = function (req, res, next) {
    var photo = new Photo(req.body.photo);

    return photo.save().then(results => {
        return res.json( { photos: results } );

    }).catch( err => res.json( { errors: err.message } ));
};

exports.details = function (req, res, next) {
    Photo.findOne( {name: req.params.name} ).exec().then(results => {
        if (!results) throw new Error('Photo not found');

        return res.json( { photos: results } );

    }).catch( err => res.json( { errors: err.message } ));
};

exports.update = function (req, res, next) {
    Photo.findOne( {name: req.params.name} ).exec().then(photo => {
        if (!photo) throw new Error('Photo not found');

        if (typeof req.body.photo.name !== 'undefined') {
            photo.name = req.body.photo.name;
        }

        photo.save().then(photo => {
            return res.json( { photos: photo } );
            
        }).catch( err => res.json( { errors: err.message } ));

    }).catch( err => res.json( { errors: err.message } ));
};

exports.delete = function (req, res, next) {
    Photo.findOneAndRemove( {name: req.params.name} ).exec().then(results => {
        if (!results) throw new Error('Photo not found');

        return res.json( { photos: results } );
        
    }).catch( err => res.json( { errors: err.message } ));
};
