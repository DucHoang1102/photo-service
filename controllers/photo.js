var mongoose      = require('mongoose'),
    Photo         = mongoose.model('Photo'),
    nameGenerator = require('id-random-generator'),
    fs            = require('fs'),
    s3            = require('../aws/config'),
    getUrl        = require('../aws/getSignedUrl'),
    renameObject  = require('../aws/renameObject');

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

        for (let photo of photos) 
            photo.url = getUrl(photo.name);
    

        return res.json({photos: photos});

    }).catch( err => res.json({ errors: err.message }) );
};

exports.new = function (req, res, next) {
    var results = [];
    var exp = ['image/jpeg', 'image/png'];
    
    // Case: only 1 photo
    if (!Array.isArray(req.files.photos))
        req.files.photos = [req.files.photos];

    // Filter photo and rename random photo
    var photos = req.files.photos
        .filter(item => {
            if ( exp.includes(item.mimetype) )
                return true;
        })
        .map(item => {
            if (!req.body['keep-name']) 
                item.name = nameGenerator.generateChar(6) + '.png';

            return item;
        });

    // Case: Photos list empty
    if (photos.length === 0)
        return res.json({ photos: [] });

    // First: Save database -> Second: Upload to s3 AWS
    for (let img of photos) {
        var photo = new Photo();
        photo.name = img.name;
        photo.size = img.size;

        photo
            .save()
            .then(photo => {
                var params = {
                    Bucket: process.env.AWS_BUCKET + '/' + process.env.AWS_FOLDER,
                    Key: photo.name,
                    Body: img.data,
                    ContentType: 'image/png'
                };

                s3.upload(params, (s3Err, data) => {
                    photo.url = getUrl(photo.name);

                    results.push(photo);

                    if (results.length === photos.length)
                        return res.json({ photos: results });

                });
            })
            .catch(err => {
                var error = {
                    'photo': photo.name,
                    'message': err.message
                };

                results.push({ errors: error });

                if (results.length === photos.length)
                    return res.json({ photos: results });
            });
    };
};

exports.details = function (req, res, next) {
    Photo.findOne( {name: req.params.name} ).exec().then(photo => {
        if (!photo) throw new Error('Photo not found');
        
        photo.url = getUrl(photo.name);

        return res.json( { photos: photo } );

    }).catch( err => res.json( { errors: err.message } ));
};

exports.update = function (req, res, next) {
    Photo.findOne( {name: req.params.name} ).exec().then(photo => {
        if (!photo) throw new Error('Photo not found');

        if (typeof req.body.photo.name !== 'undefined') {
            photo.name = req.body.photo.name;
        }

        photo.save().then(photo => {
            var oldName = req.params.name,
                newName = photo.name;

            if (oldName !== newName) {
                renameObject(oldName, newName, (s3Err, data) => {
                    return res.json( { photos: photo } );
                });
            }
            else
                return res.json( { photos: photo } );

        }).catch( err => res.json( { errors: err.message } ));

    }).catch( err => res.json( { errors: err.message } ));
};

exports.delete = function (req, res, next) {
    Photo.findOneAndRemove( {name: req.params.name} ).exec().then(photo => {
        var params = {
            Bucket: process.env.AWS_BUCKET + '/' + process.env.AWS_FOLDER,
            Key: req.params.name
        };

        s3.deleteObject(params, (s3Err, data) => {
            return res.json( { photos: photo } );
        });

    }).catch( err => res.json( { errors: err.message } ));
};
